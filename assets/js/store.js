/* =========================================================
   MA’LUMOTLAR QATLAMI
   - "cloud": Supabase (agentlar, progress, imtihon, videolar)
   - "local": Supabase sozlanmagan bo‘lsa — shu brauzer xotirasi
   ========================================================= */
(function () {
  "use strict";
  var CFG = window.MITAL_CONFIG || {};
  var LS = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* xotira yopiq */ } },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) { /* */ } }
  };

  function normPhone(p) {
    var d = String(p || "").replace(/\D/g, "");
    if (d.length === 9) d = "998" + d;
    return d;
  }
  function phoneEmail(p) { return normPhone(p) + "@" + (CFG.LOGIN_EMAIL_DOMAIN || "mital.academy"); }
  async function sha256(s) {
    if (window.crypto && crypto.subtle) {
      var buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
      return Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
    }
    return "plain:" + s;
  }
  function uid() { return "u" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
  function nowIso() { return new Date().toISOString(); }

  var Store = {
    mode: "local",
    user: null,          // {id, name, phone, role}
    progress: {},        // lessonId -> {score,total,passed,task_done,attempts,completed_at}
    exams: [],           // [{score,total,percent,passed,created_at,...}]
    videos: {},          // lessonId -> url
    sb: null,
    ready: false,

    cached: false,       // ma'lumotlar telefon keshidan olinganmi

    /* Tez start: tarmoqni kutmasdan keshdan ishga tushadi.
       Keyin refresh() yangi ma'lumotlarni parallel yuklaydi. */
    async init() {
      var hasCloud = CFG.SUPABASE_URL && CFG.SUPABASE_ANON_KEY && window.supabase && window.supabase.createClient;
      this._snapshotDefaults();
      if (hasCloud) {
        this.mode = "cloud";
        this.sb = window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY, {
          auth: { persistSession: true, autoRefreshToken: true }
        });
        var snap = LS.get(SNAP_KEY, null);
        if (snap && snap.url === CFG.SUPABASE_URL && snap.v === SNAP_VER) {
          this.user = snap.user || null;
          this.progress = snap.progress || {};
          this.exams = snap.exams || [];
          this.videos = snap.videos || {};
          this._applyRows(snap.rows || []);
          this.cached = true;
        }
      } else {
        this.mode = "local";
        var sid = LS.get("mital.session", null);
        var users = LS.get("mital.users", []);
        var u = users.find(function (x) { return x.id === sid; });
        if (u) this._setLocalUser(u);
        this.videos = LS.get("mital.videos", {});
        try { await this.loadContent(); } catch (e) { console.warn("Kontent xatosi", e); }
      }
      this.ready = true;
    },

    /* Bulutdan yangi ma'lumot: hammasi BIR VAQTDA (parallel) so'raladi.
       Qaytaradi: ma'lumot o'zgardimi (sahifani qayta chizish kerakmi) */
    async refresh() {
      if (this.mode !== "cloud") return false;
      var before = this._fingerprint();
      var session = null;
      try { var s = await this.sb.auth.getSession(); session = s.data && s.data.session; }
      catch (e) { console.warn("Supabase sessiya xatosi", e); }
      var jobs = [this._fetchContent(), this._loadVideos()];
      if (session) jobs.push(this._loadCloudUser(session.user));
      else { this.user = null; this.progress = {}; this.exams = []; }
      var res = await Promise.allSettled(jobs);
      res.forEach(function (r) { if (r.status === "rejected") console.warn("Yuklash xatosi", r.reason); });
      this._saveSnap();
      return before !== this._fingerprint();
    },

    _fingerprint() {
      try { return JSON.stringify([this.user, this.progress, this.exams, this.videos, this.contentMeta]); } catch (e) { return String(Math.random()); }
    },
    _saveSnap() {
      if (this.mode !== "cloud") return;
      var self = this;
      var rows = CONTENT_KEYS.filter(function (k) { return self.contentMeta[k]; }).map(function (k) { return { key: k, data: clone(getGlobal(k)), updated_at: self.contentMeta[k].updated_at }; });
      LS.set(SNAP_KEY, { v: SNAP_VER, url: CFG.SUPABASE_URL, at: nowIso(), user: this.user, progress: this.progress, exams: this.exams, videos: this.videos, rows: rows });
    },

    /* ---------------- AUTH ---------------- */
    async register(o) {
      var phone = normPhone(o.phone);
      if (!o.name || o.name.trim().length < 3) throw new Error("Ism va familiyani to‘liq kiriting.");
      if (phone.length !== 12) throw new Error("Telefon raqamni to‘g‘ri kiriting: +998 XX XXX XX XX");
      if (!o.password || o.password.length < 6) throw new Error("Parol kamida 6 ta belgidan iborat bo‘lsin.");
      if (this.mode === "cloud") {
        var r = await this.sb.auth.signUp({
          email: phoneEmail(phone), password: o.password,
          options: { data: { full_name: o.name.trim(), phone: phone } }
        });
        if (r.error) throw new Error(this._authErr(r.error));
        if (!r.data.session) {
          var l = await this.sb.auth.signInWithPassword({ email: phoneEmail(phone), password: o.password });
          if (l.error) throw new Error("Ro‘yxatdan o‘tdingiz, lekin kirish amalga oshmadi. Supabase’da “Confirm email” o‘chirilganini tekshiring.");
          await this._loadCloudUser(l.data.user);
        } else {
          await this._loadCloudUser(r.data.user);
        }
        return this.user;
      }
      var users = LS.get("mital.users", []);
      if (users.some(function (x) { return x.phone === phone; })) throw new Error("Bu raqam bilan foydalanuvchi bor. “Kirish” bo‘limidan foydalaning.");
      var u = { id: uid(), name: o.name.trim(), phone: phone, role: users.length === 0 ? "admin" : "agent", pass: await sha256(o.password), created_at: nowIso(), last_seen: nowIso() };
      users.push(u); LS.set("mital.users", users); LS.set("mital.session", u.id);
      this._setLocalUser(u);
      return this.user;
    },

    async login(o) {
      var phone = normPhone(o.phone);
      if (this.mode === "cloud") {
        var r = await this.sb.auth.signInWithPassword({ email: phoneEmail(phone), password: o.password || "" });
        if (r.error) throw new Error(this._authErr(r.error));
        await this._loadCloudUser(r.data.user);
        return this.user;
      }
      var users = LS.get("mital.users", []);
      var h = await sha256(o.password || "");
      var u = users.find(function (x) { return x.phone === phone && x.pass === h; });
      if (!u) throw new Error("Telefon yoki parol noto‘g‘ri.");
      LS.set("mital.session", u.id);
      this._setLocalUser(u);
      return this.user;
    },

    async logout() {
      if (this.mode === "cloud" && this.sb) await this.sb.auth.signOut();
      LS.del("mital.session");
      this.user = null; this.progress = {}; this.exams = [];
      this._saveSnap();
    },

    _authErr(e) {
      var m = (e && e.message || "").toLowerCase();
      if (m.indexOf("invalid login") >= 0) return "Telefon yoki parol noto‘g‘ri.";
      if (m.indexOf("already registered") >= 0 || m.indexOf("already been registered") >= 0) return "Bu raqam bilan foydalanuvchi bor. “Kirish” bo‘limidan foydalaning.";
      if (m.indexOf("password") >= 0) return "Parol talabga javob bermaydi (kamida 6 belgi).";
      return e.message || "Xatolik yuz berdi.";
    },

    _setLocalUser(u) {
      this.user = { id: u.id, name: u.name, phone: u.phone, role: u.role || "agent" };
      this.progress = LS.get("mital.progress." + u.id, {});
      this.exams = LS.get("mital.exams." + u.id, []);
      var users = LS.get("mital.users", []);
      var i = users.findIndex(function (x) { return x.id === u.id; });
      if (i >= 0) { users[i].last_seen = nowIso(); LS.set("mital.users", users); }
    },

    async _loadCloudUser(authUser) {
      var uid0 = authUser.id;
      var all = await Promise.all([
        this.sb.from("profiles").select("*").eq("id", uid0).maybeSingle(),
        this.sb.from("lesson_progress").select("*").eq("user_id", uid0),
        this.sb.from("exam_attempts").select("*").eq("user_id", uid0).order("created_at", { ascending: true })
      ]);
      var p = all[0], pr = all[1], ex = all[2];
      var meta = authUser.user_metadata || {};
      /* Profil yaratilmagan bo'lsa (trigger ishlamagan) - o'zimiz yaratamiz */
      if (!p.error && !p.data) {
        var ins = await this.sb.from("profiles").insert({ id: uid0, full_name: meta.full_name || "", phone: meta.phone || "" }).select("*").maybeSingle();
        if (ins.error) console.warn("Profil yaratilmadi", ins.error); else p = ins;
      }
      var prof = p.data || {};
      this.user = { id: uid0, name: prof.full_name || meta.full_name || "Agent", phone: prof.phone || meta.phone || "", role: prof.role || "agent" };
      var prog = {};
      (pr.data || []).forEach(function (r) { prog[r.lesson_id] = r; });
      if (!pr.error) this.progress = prog;
      if (!ex.error) this.exams = ex.data || [];
      this._saveSnap();
      this.sb.rpc("touch_last_seen").then(function () {}, function () {});
    },

    async _loadVideos() {
      if (this.mode !== "cloud") return;
      var r = await this.sb.from("lesson_videos").select("lesson_id,url");
      if (r.error) return;
      var v = {};
      (r.data || []).forEach(function (x) { if (x.url) v[x.lesson_id] = x.url; });
      this.videos = v;
    },

    /* ---------------- PROGRESS ---------------- */
    async saveLesson(lessonId, d) {
      var prev = this.progress[lessonId] || {};
      var row = {
        lesson_id: lessonId,
        score: d.score, total: d.total,
        passed: !!(prev.passed || d.passed),
        task_done: !!prev.task_done,
        attempts: (prev.attempts || 0) + 1,
        completed_at: prev.completed_at || (d.passed ? nowIso() : null),
        updated_at: nowIso()
      };
      if (prev.passed && prev.score > d.score) { row.score = prev.score; row.total = prev.total; }
      this.progress[lessonId] = row;
      if (this.mode === "cloud") {
        var r = await this.sb.from("lesson_progress").upsert(Object.assign({ user_id: this.user.id }, row), { onConflict: "user_id,lesson_id" });
        if (r.error) throw r.error;
      } else {
        LS.set("mital.progress." + this.user.id, this.progress);
      }
      this._saveSnap();
      return row;
    },

    async saveTask(lessonId, done) {
      var prev = this.progress[lessonId] || { lesson_id: lessonId, attempts: 0, passed: false };
      prev.task_done = !!done; prev.updated_at = nowIso();
      this.progress[lessonId] = prev;
      if (this.mode === "cloud") {
        var r = await this.sb.from("lesson_progress").upsert({ user_id: this.user.id, lesson_id: lessonId, task_done: !!done, updated_at: prev.updated_at }, { onConflict: "user_id,lesson_id" });
        if (r.error) throw r.error;
      } else {
        LS.set("mital.progress." + this.user.id, this.progress);
      }
    },

    async saveExam(att) {
      att.created_at = nowIso();
      this.exams.push(att);
      if (this.mode === "cloud") {
        var r = await this.sb.from("exam_attempts").insert(Object.assign({ user_id: this.user.id }, att));
        if (r.error) throw r.error;
        this._saveSnap();
      } else {
        LS.set("mital.exams." + this.user.id, this.exams);
      }
    },

    /* ---------------- VIDEOS ---------------- */
    async setVideo(lessonId, url) {
      url = (url || "").trim();
      if (url) this.videos[lessonId] = url; else delete this.videos[lessonId];
      if (this.mode === "cloud") {
        var r = url
          ? await this.sb.from("lesson_videos").upsert({ lesson_id: lessonId, url: url, updated_at: nowIso() })
          : await this.sb.from("lesson_videos").delete().eq("lesson_id", lessonId);
        if (r.error) throw r.error;
      } else {
        LS.set("mital.videos", this.videos);
      }
    },

    /* ---------------- RAHBAR ---------------- */
    async listAgents() {
      if (this.mode === "cloud") {
        var all = await Promise.all([
          this.sb.from("profiles").select("*").order("created_at", { ascending: true }),
          this.sb.from("lesson_progress").select("*"),
          this.sb.from("exam_attempts").select("*").order("created_at", { ascending: true })
        ]);
        var p = all[0], lp = all[1], ex = all[2];
        if (p.error) throw p.error;
        return (p.data || []).map(function (u) {
          var prog = {};
          (lp.data || []).filter(function (r) { return r.user_id === u.id; }).forEach(function (r) { prog[r.lesson_id] = r; });
          return {
            id: u.id, name: u.full_name, phone: u.phone, role: u.role,
            created_at: u.created_at, last_seen: u.last_seen,
            progress: prog,
            exams: (ex.data || []).filter(function (r) { return r.user_id === u.id; })
          };
        });
      }
      var users = LS.get("mital.users", []);
      return users.map(function (u) {
        return {
          id: u.id, name: u.name, phone: u.phone, role: u.role,
          created_at: u.created_at, last_seen: u.last_seen,
          progress: LS.get("mital.progress." + u.id, {}),
          exams: LS.get("mital.exams." + u.id, [])
        };
      });
    },

    isAdmin() { return !!(this.user && this.user.role === "admin"); },

    /* ---------------- KONTENT (rahbar tahrirlaydi) ---------------- */
    /* Fayllardagi standart kontent — "asl holatga qaytarish" uchun nusxa */
    defaults: {},
    contentMeta: {},   // key -> {updated_at}

    _snapshotDefaults() {
      var self = this;
      if (this._defaultsTaken) return; this._defaultsTaken = true;
      CONTENT_KEYS.forEach(function (k) { self.defaults[k] = clone(getGlobal(k)); });
    },

    async loadContent() {
      var rows = [];
      if (this.mode === "cloud") { await this._fetchContent(); return; }
      CONTENT_KEYS.forEach(function (k) {
        var d = LS.get("mital.content." + k, null);
        if (d) rows.push({ key: k, data: d.data, updated_at: d.updated_at });
      });
      this._applyRows(rows);
    },

    async _fetchContent() {
      var r = await this.sb.from("site_content").select("key,data,updated_at");
      if (r.error) { console.warn("Kontent yuklanmadi", r.error); return; }
      this._applyRows(r.data || []);
    },

    /* Bazadagi bo'limlarni qo'llaydi; bazada yo'q bo'lsa - fayldagi asl holat */
    _applyRows(rows) {
      var self = this, byKey = {};
      rows.forEach(function (row) { if (CONTENT_KEYS.indexOf(row.key) >= 0 && row.data) byKey[row.key] = row; });
      CONTENT_KEYS.forEach(function (k) {
        var row = byKey[k];
        if (row) {
          var m = self.contentMeta[k];
          if (!m || m.updated_at !== row.updated_at) setGlobal(k, row.data);
          self.contentMeta[k] = { updated_at: row.updated_at };
        } else if (self.contentMeta[k]) {
          setGlobal(k, clone(self.defaults[k]));
          delete self.contentMeta[k];
        }
      });
    },

    async saveContent(key, data, note) {
      var plain = clone(data);
      var at = nowIso();
      if (this.mode === "cloud") {
        var r = await this.sb.from("site_content").upsert({ key: key, data: plain, updated_at: at, updated_by: this.user.id });
        if (r.error) throw r.error;
        await this.sb.from("content_history").insert({ key: key, data: plain, saved_by: this.user.id, note: note || null });
      } else {
        LS.set("mital.content." + key, { data: plain, updated_at: at });
        var h = LS.get("mital.history", []);
        h.unshift({ id: uid(), key: key, data: plain, saved_at: at, note: note || null });
        LS.set("mital.history", h.slice(0, 40));
      }
      setGlobal(key, plain);
      this.contentMeta[key] = { updated_at: at };
      this._saveSnap();
    },

    async history(key) {
      if (this.mode === "cloud") {
        var q = this.sb.from("content_history").select("id,key,saved_at,note").order("saved_at", { ascending: false }).limit(60);
        if (key) q = q.eq("key", key);
        var r = await q; if (r.error) throw r.error;
        return r.data || [];
      }
      return LS.get("mital.history", []).filter(function (x) { return !key || x.key === key; })
        .map(function (x) { return { id: x.id, key: x.key, saved_at: x.saved_at, note: x.note }; });
    },

    async historyData(id) {
      if (this.mode === "cloud") {
        var r = await this.sb.from("content_history").select("*").eq("id", id).maybeSingle();
        if (r.error) throw r.error;
        return r.data;
      }
      return LS.get("mital.history", []).find(function (x) { return x.id === id; });
    },

    async resetContent(key) {
      if (this.mode === "cloud") {
        var r = await this.sb.from("site_content").delete().eq("key", key);
        if (r.error) throw r.error;
      } else {
        LS.del("mital.content." + key);
      }
      setGlobal(key, clone(this.defaults[key]));
      delete this.contentMeta[key];
    },

    exportAll() {
      var out = { app: "MITAL Akademiya", exported_at: nowIso(), content: {} };
      CONTENT_KEYS.forEach(function (k) { out.content[k] = clone(getGlobal(k)); });
      return out;
    },

    /* Rasm yuklash: bulutda — Supabase Storage, lokalda — siqilgan data-URL */
    async uploadMedia(file) {
      if (!file || !/^image\//.test(file.type)) throw new Error("Faqat rasm fayli (JPG, PNG, WEBP).");
      var blob = await shrinkImage(file, 1400, 0.86);
      if (this.mode === "cloud") {
        var ext = blob.type === "image/png" ? "png" : "jpg";
        var path = new Date().toISOString().slice(0, 7) + "/" + uid() + "." + ext;
        var r = await this.sb.storage.from("media").upload(path, blob, { contentType: blob.type, upsert: false });
        if (r.error) throw r.error;
        return this.sb.storage.from("media").getPublicUrl(path).data.publicUrl;
      }
      var small = await shrinkImage(file, 900, 0.8);
      return await blobToDataUrl(small);
    }
  };

  /* ---------- kontent yordamchilari ---------- */
  var SNAP_KEY = "mital.snap", SNAP_VER = 1;
  var CONTENT_KEYS = ["course", "catalog", "scripts", "trainer", "exam", "company", "home", "settings"];
  var GLOBALS = { course: "COURSE", catalog: "CATALOG", scripts: "SCRIPTS", trainer: "TRAINER", exam: "EXAM", company: "COMPANY", home: "HOME" };
  function settingsOf(cfg) {
    return { LESSON_PASS: cfg.LESSON_PASS, STRICT_ORDER: cfg.STRICT_ORDER, CONTACT_TELEGRAM: cfg.CONTACT_TELEGRAM, EXAM: clone(cfg.EXAM || {}) };
  }
  function getGlobal(k) { return k === "settings" ? settingsOf(CFG) : window[GLOBALS[k]]; }
  function setGlobal(k, v) {
    if (k === "settings") {
      ["LESSON_PASS", "STRICT_ORDER", "CONTACT_TELEGRAM"].forEach(function (f) { if (v[f] !== undefined) CFG[f] = v[f]; });
      if (v.EXAM) CFG.EXAM = Object.assign({}, CFG.EXAM, v.EXAM);
      return;
    }
    window[GLOBALS[k]] = v;
  }
  /* Aylanma havolalarsiz (dars.mod va h.k.) chuqur nusxa */
  function clone(v) {
    return v === undefined ? undefined : JSON.parse(JSON.stringify(v, function (k, x) { return (k === "mod" || k === "idx" || k === "gidx") ? undefined : x; }));
  }
  function blobToDataUrl(b) { return new Promise(function (res, rej) { var r = new FileReader(); r.onload = function () { res(r.result); }; r.onerror = rej; r.readAsDataURL(b); }); }
  function shrinkImage(file, max, q) {
    return new Promise(function (res) {
      var img = new Image(), url = URL.createObjectURL(file);
      img.onload = function () {
        var s = Math.min(1, max / Math.max(img.width, img.height));
        if (s === 1 && file.size < 600000) { URL.revokeObjectURL(url); res(file); return; }
        var c = document.createElement("canvas"); c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        var png = file.type === "image/png";
        c.toBlob(function (b) { res(b || file); }, png ? "image/png" : "image/jpeg", q);
      };
      img.onerror = function () { URL.revokeObjectURL(url); res(file); };
      img.src = url;
    });
  }
  Store.CONTENT_KEYS = CONTENT_KEYS;
  Store.clone = clone;

  Store.normPhone = normPhone;
  window.Store = Store;
})();
