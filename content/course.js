/* =========================================================
   KURS TUZILMASI
   ---------------------------------------------------------
   Har bir modul alohida faylda: content/modules/m1.js ... m8.js
   Darsga YouTube video qo‘shish: dars ichida  video: "https://youtu.be/XXXX"
   (yoki Rahbar paneli → Videolar bo‘limidan, Supabase ulangan bo‘lsa).

   Blok turlari (dars ichida "blocks" ro‘yxati):
     { t:"p", h:"matn (HTML mumkin: <b>, <em>)" }
     { t:"h", h:"Bo‘lim sarlavhasi" }
     { t:"ul", items:["...", "..."] }   { t:"ol", items:[...] }
     { t:"call", k:"tip|warn|rule|ok", title:"...", h:"..." }
     { t:"steps", items:[["Sarlavha","izoh"], ...] }
     { t:"table", head:["A","B"], rows:[["..",".."]] }
     { t:"dialog", lines:[["a","Agent gapi"],["c","Mijoz gapi"],["n","Izoh"]] }
     { t:"cmp", bad:["Noto‘g‘ri","..."], good:["To‘g‘ri","..."] }
     { t:"ig", k:"infografika-nomi" }   (assets/js/infographics.js)
     { t:"task", title:"Amaliy topshiriq", h:"..." }
   Test: quiz:[{ q:"savol", o:["A","B","C","D"], a:0, why:"izoh" }]
     a — to‘g‘ri javob indeksi (0 dan boshlanadi)
   ========================================================= */
window.COURSE = {
  title: "MITAL Akademiya",
  days: 21,
  weeks: [
    { n: 1, code: "BAZA",    title: "Bilim",    sub: "Kompaniya, bozor va moy texnikasi",              days: "1–7 kun" },
    { n: 2, code: "SAVDO",   title: "Savdo",    sub: "B2B mijozlar, skriptlar, assortiment",           days: "8–14 kun" },
    { n: 3, code: "NAZORAT", title: "Nazorat",  sub: "Debitorka, reja/CRM, TOP agent mentaliteti",     days: "15–21 kun" }
  ],
  /* Agent darajalari — API sinflari kabi: kurs bo‘ylab o‘sadi */
  levels: [
    { code: "SJ", min: 0,   name: "Yangi agent" },
    { code: "SL", min: 20,  name: "O‘rganuvchi" },
    { code: "SM", min: 40,  name: "Amaliyotchi" },
    { code: "SN", min: 60,  name: "Ishonchli agent" },
    { code: "SP", min: 85,  name: "Imtihonga tayyor" },
    { code: "SQ", min: 101, name: "Sertifikatlangan MITAL agenti" }
  ],
  modules: []
};
