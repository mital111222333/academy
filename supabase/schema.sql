-- =========================================================
-- MITAL Akademiya — Supabase sxemasi
-- Supabase → SQL Editor → New query → shu faylni to‘liq qo‘ying → Run
-- Qayta ishga tushirsa ham xavfsiz (idempotent).
-- =========================================================

-- 1) Profillar ------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text not null default '',
  phone       text not null default '',
  role        text not null default 'agent' check (role in ('agent', 'admin')),
  created_at  timestamptz not null default now(),
  last_seen   timestamptz
);

-- Rahbarmi? (RLS ichida rekursiyasiz ishlatish uchun security definer)
create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- Yangi foydalanuvchi ro‘yxatdan o‘tganda profil avtomatik yaratiladi
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'phone', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Oxirgi faollikni yangilash (agent o‘z rolini o‘zgartira olmasligi uchun
-- profiles jadvaliga to‘g‘ridan-to‘g‘ri UPDATE ruxsati berilmaydi)
create or replace function public.touch_last_seen()
returns void
language sql security definer set search_path = public
as $$
  update public.profiles set last_seen = now() where id = auth.uid();
$$;

-- 2) Dars progressi ---------------------------------------------
create table if not exists public.lesson_progress (
  user_id       uuid not null references public.profiles (id) on delete cascade,
  lesson_id     text not null,
  score         int,
  total         int,
  passed        boolean not null default false,
  task_done     boolean not null default false,
  attempts      int not null default 0,
  completed_at  timestamptz,
  updated_at    timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

-- 3) Imtihon urinishlari ----------------------------------------
create table if not exists public.exam_attempts (
  id            bigint generated always as identity primary key,
  user_id       uuid not null references public.profiles (id) on delete cascade,
  score         int not null,
  total         int not null,
  percent       int not null,
  passed        boolean not null,
  duration_sec  int,
  by_module     jsonb,
  wrong         jsonb,
  created_at    timestamptz not null default now()
);
create index if not exists exam_attempts_user_idx on public.exam_attempts (user_id, created_at);

-- 4) Dars videolari (rahbar paneli orqali) ----------------------
create table if not exists public.lesson_videos (
  lesson_id   text primary key,
  url         text not null,
  updated_at  timestamptz not null default now()
);

-- =========================================================
-- RLS (qatorlar darajasidagi xavfsizlik)
-- =========================================================
alter table public.profiles        enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.exam_attempts   enable row level security;
alter table public.lesson_videos   enable row level security;

-- profiles: o‘zini ko‘radi, rahbar hammani ko‘radi
drop policy if exists "profiles_select" on public.profiles;
create policy "profiles_select" on public.profiles
  for select to authenticated
  using (id = auth.uid() or public.is_admin());

-- profiles: trigger ishlamasa, sayt o‘z profilini yaratadi (faqat "agent" roli bilan)
drop policy if exists "profiles_insert_self" on public.profiles;
create policy "profiles_insert_self" on public.profiles
  for insert to authenticated
  with check (id = auth.uid() and role = 'agent');

-- lesson_progress: o‘zinikini o‘qiydi/yozadi, rahbar hammasini o‘qiydi
drop policy if exists "progress_select" on public.lesson_progress;
create policy "progress_select" on public.lesson_progress
  for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "progress_insert" on public.lesson_progress;
create policy "progress_insert" on public.lesson_progress
  for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists "progress_update" on public.lesson_progress;
create policy "progress_update" on public.lesson_progress
  for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- exam_attempts: o‘zinikini qo‘shadi/o‘qiydi, rahbar hammasini o‘qiydi
drop policy if exists "exam_select" on public.exam_attempts;
create policy "exam_select" on public.exam_attempts
  for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "exam_insert" on public.exam_attempts;
create policy "exam_insert" on public.exam_attempts
  for insert to authenticated
  with check (user_id = auth.uid());

-- lesson_videos: hamma kirgan foydalanuvchi o‘qiydi, faqat rahbar yozadi
drop policy if exists "videos_select" on public.lesson_videos;
create policy "videos_select" on public.lesson_videos
  for select to anon, authenticated
  using (true);

drop policy if exists "videos_write" on public.lesson_videos;
create policy "videos_write" on public.lesson_videos
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Funksiyalarga ruxsat
grant execute on function public.touch_last_seen() to authenticated;
grant execute on function public.is_admin() to authenticated;

-- =========================================================
-- 5) SAYT KONTENTI (rahbar saytning o‘zidan tahrirlaydi)
--    key: course | catalog | scripts | trainer | exam | company | home | settings
-- =========================================================
create table if not exists public.site_content (
  key         text primary key,
  data        jsonb not null,
  updated_at  timestamptz not null default now(),
  updated_by  uuid references public.profiles (id) on delete set null
);

-- Har bir saqlash tarixga yoziladi — istalgan versiyani tiklash mumkin
create table if not exists public.content_history (
  id          bigint generated always as identity primary key,
  key         text not null,
  data        jsonb not null,
  saved_at    timestamptz not null default now(),
  saved_by    uuid references public.profiles (id) on delete set null,
  note        text
);
create index if not exists content_history_key_idx on public.content_history (key, saved_at desc);

alter table public.site_content    enable row level security;
alter table public.content_history enable row level security;

drop policy if exists "content_read" on public.site_content;
create policy "content_read" on public.site_content
  for select to anon, authenticated using (true);

drop policy if exists "content_write" on public.site_content;
create policy "content_write" on public.site_content
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "history_admin" on public.content_history;
create policy "history_admin" on public.content_history
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- =========================================================
-- 6) RASMLAR OMBORI (Storage bucket "media", ommaviy o‘qish)
-- =========================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

drop policy if exists "media_read" on storage.objects;
create policy "media_read" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'media');

drop policy if exists "media_insert" on storage.objects;
create policy "media_insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "media_update" on storage.objects;
create policy "media_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'media' and public.is_admin());

drop policy if exists "media_delete" on storage.objects;
create policy "media_delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'media' and public.is_admin());

-- =========================================================
-- RAHBARNI BELGILASH (bir marta):
-- Avval saytda o‘z telefon raqamingiz bilan ro‘yxatdan o‘ting,
-- keyin quyidagi qatorni raqamingiz bilan ishga tushiring:
--
--   update public.profiles set role = 'admin' where phone = '998901234567';
-- =========================================================
