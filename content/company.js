/* =========================================================
   KOMPANIYA HAQIDA
   ---------------------------------------------------------
   "todo: true" — keyin to‘ldiriladigan joy (saytda punktir
   ramka bilan ko‘rinadi). Ma’lumot tayyor bo‘lganda matnni
   yozing va todo ni olib tashlang.
   ========================================================= */
window.COMPANY = {
  intro: "MITAL — O‘zbekistondagi moylash materiallari distribyutori. Biz Germaniya, Janubiy Koreya va Turkiyaning sifatli moylarini STO, moy almashtirish shoxobchalari, avtodo‘konlar va avtoparklarga yetkazib beramiz.",
  mission: { todo: true, title: "Missiyamiz", text: "Bu yerga kompaniya missiyasi yoziladi (1–2 jumla)." },
  facts: [
    { k: "2024", v: "MITAL O‘zbekiston bozorida ish boshladi" },
    { k: "3", v: "Brend portfelda: MITANOL, Golden Booster, Liman Oil" },
    { k: "25+", v: "Mahsulot pozitsiyasi: motor va transmissiya moylari" },
    { k: "…", v: "Mijozlar soni — to‘ldiriladi", todo: true }
  ],
  timeline: [
    { y: "1921", t: "MITAN zavodi asos solindi", d: "Germaniyada MITAN moy zavodi faoliyatini boshladi. Uning brendi — MITANOL." },
    { y: "1985", t: "Xalqaro kengayish", d: "MITAN mahsulotlari Yevropa bozorlariga chiqdi; mahsulotlar API va ACEA standartlariga muvofiq ishlab chiqariladi." },
    { y: "2024", t: "MITAL O‘zbekistonda", d: "MITAL kompaniyasi tashkil topdi va MITANOL mahsulotlarini O‘zbekiston bozoriga olib kirdi." },
    { y: "2025", t: "Portfel kengaydi", d: "Golden Booster (Koreya) va Liman Oil (Turkiya) brendlari qo‘shildi.", todo: true, note: "Sana va tafsilotlarni tekshiring" },
    { y: "2026", t: "MITAL Akademiya", d: "Agentlar uchun onlayn o‘quv tizimi ishga tushirildi." }
  ],
  placeholders: [
    { title: "Ombor va logistika", text: "Ombor manzili, yetkazib berish kunlari va hududlari." },
    { title: "Jamoa", text: "Rahbariyat, supervayzerlar, agentlar soni." },
    { title: "Hamkorlar va yutuqlar", text: "Yirik mijozlar, avtoparklar, sertifikatlar." }
  ]
};
