/* =========================================================
   MITAL Akademiya — SOZLAMALAR
   ---------------------------------------------------------
   1) Supabase ulash uchun SUPABASE_URL va SUPABASE_ANON_KEY ni
      to‘ldiring (README.md dagi qo‘llanmaga qarang).
      Bo‘sh qoldirilsa — sayt "lokal rejimda" ishlaydi:
      progress faqat shu qurilmada saqlanadi.
   2) Qolgan sozlamalar kurs qoidalari.
   ========================================================= */
window.MITAL_CONFIG = {
  SUPABASE_URL: "https://nfrkbajzaseaqguxpyea.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_2yAHGskzEznFTPJxtVt0IA_PmCC7xwI",  // publishable (ommaviy) kalit

  // Telefon raqam login sifatida ishlatiladi; Supabase uchun
  // texnik e-pochta shu domen bilan yasaladi (o‘zgartirmang).
  LOGIN_EMAIL_DOMAIN: "mital.academy",

  // Darslar faqat ketma-ket ochiladimi?
  STRICT_ORDER: true,

  // Dars testidan o‘tish uchun minimal to‘g‘ri javoblar ulushi
  LESSON_PASS: 0.66,      // 3 savoldan kamida 2 tasi

  // Yakuniy imtihon
  EXAM: {
    QUESTIONS: 30,        // nechta savol beriladi
    MINUTES: 40,          // vaqt
    PASS_PERCENT: 80,     // o‘tish bali
    COOLDOWN_HOURS: 2     // yiqilgandan keyin qayta topshirish oralig‘i
  },

  // Rahbar bilan aloqa
  CONTACT_TELEGRAM: "https://t.me/Saidbonur_mital"
};
