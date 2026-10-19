/* 7-MODUL — REJA, MARSHRUT VA CRM */
COURSE.modules.push({
  id: "m7", n: 7, week: 3,
  title: "Reja, marshrut va CRM",
  sub: "Ideal kun, hudud va tashrif chastotasi, hisobot va raqamlar",
  outcomes: [
    "Kuningizni ideal jadval bo‘yicha rejalashtirasiz",
    "Hududni bo‘lib, mijozlarni A/B/C chastotasi bo‘yicha aylanasiz",
    "CRM ga sifatli yozuv kiritasiz",
    "O‘z KPI va daromadingizni hisoblay olasiz"
  ],
  lessons: [
    {
      id: "m7l1", title: "Ideal kun jadvali", min: 10, video: "",
      blocks: [
        { t: "p", h: "Agentning eng qimmat resursi — <b>vaqt</b>. Kunning birinchi va oxirgi soati butun kun natijasini belgilaydi: ertalab — reja, kechqurun — hisobot." },
        { t: "ig", k: "day" },
        { t: "call", k: "rule", title: "Kunlik me’yor", h: "<p>✅ 15–20 ta kontakt &nbsp;|&nbsp; ✅ 8–12 ta tashrif &nbsp;|&nbsp; ✅ 3–5 ta buyurtma. <b>Rejasiz ish — pulsiz ish.</b></p>" },
        { t: "h", h: "Vaqt o‘g‘rilari" },
        { t: "ul", items: [
          "Rejasiz chiqish va “qayerga borsam ekan?” deb o‘ylash.",
          "Bir nuqtada uzoq choy va bo‘sh suhbat.",
          "Shahar bo‘ylab tartibsiz yurish (bir tomondan ikkinchi tomonga).",
          "Telefonda ijtimoiy tarmoqlar.",
          "Hisobotni ertaga qoldirish."
        ]},
        { t: "task", title: "Amaliy topshiriq", h: "3 kun davomida haqiqiy vaqtingizni yozib boring (har soatda nima qildingiz). Ideal jadval bilan solishtirib, 2 ta “vaqt o‘g‘ri”sini toping." }
      ],
      keys: [
        "08:30 reja → 09:00 qo‘ng‘iroqlar → 10:00–17:00 tashriflar → 17:30 hisobot → 18:00 o‘qish.",
        "Kunlik me’yor: 15–20 / 8–12 / 3–5.",
        "Vaqt o‘g‘rilarini aniqlab, yo‘q qiling."
      ],
      quiz: [
        { q: "Ish kuni qaysi harakat bilan boshlanadi?", o: ["Birinchi tashrif", "Kunlik reja tuzish", "Hisobot", "Tushlik"], a: 1, why: "08:30 — kimlarga, qayerga, nima maqsadda boriladi." },
        { q: "Kunlik buyurtmalar me’yori qancha?", o: ["1 ta", "3–5 ta", "15–20 ta", "Me’yor yo‘q"], a: 1, why: "3–5 ta buyurtma — kunlik me’yor." },
        { q: "Quyidagilardan qaysi biri “vaqt o‘g‘ri”si?", o: ["Kunlik reja", "Marshrut bo‘yicha yurish", "Shahar bo‘ylab tartibsiz yurish", "CRM hisobot"], a: 2, why: "Tartibsiz yurish yo‘lda soatlab vaqt yeydi." }
      ]
    },
    {
      id: "m7l2", title: "Marshrut va tashrif chastotasi", min: 12, video: "",
      blocks: [
        { t: "p", h: "Hududni kunlar bo‘yicha bo‘ling: har kuni bitta zona. Shunda yo‘lga kam vaqt ketadi, mijozlar esa sizni <b>aniq kunda</b> kutadi." },
        { t: "ig", k: "route" },
        { t: "h", h: "Mijozlarni A/B/C bo‘yicha aylanish" },
        { t: "table", head: ["Guruh", "Kimlar", "Tashrif chastotasi"], rows: [
          ["A", "Eng katta oborot beradigan mijozlar", "Haftasiga 1–2 marta"],
          ["B", "O‘rtacha, barqaror mijozlar", "Haftasiga 1 marta"],
          ["C", "Kichik yoki yangi mijozlar", "Ikki haftada 1 marta + telefon"],
          ["Potensial", "Hali ishlamaydigan nuqtalar", "Har kuni marshrutga 2–3 ta qo‘shing"]
        ]},
        { t: "call", k: "tip", title: "Maslahat", h: "<p>Har kunlik marshrutga kamida <b>2–3 ta yangi nuqta</b> qo‘shing. Shu tarzda haftasiga 2–3 ta yangi mijoz me’yori tabiiy ravishda bajariladi.</p>" },
        { t: "task", title: "Amaliy topshiriq", h: "Hududingiz xaritasini 5 ish kuniga bo‘ling. Har kun uchun mijozlar ro‘yxati va 2–3 ta potensial nuqtani yozing." }
      ],
      keys: [
        "Hudud kunlarga bo‘linadi: har kuni bitta zona.",
        "A — haftasiga 1–2, B — 1, C — ikki haftada 1 marta.",
        "Har kuni 2–3 ta yangi nuqta — baza o‘sishining kaliti."
      ],
      quiz: [
        { q: "A guruh mijozlariga qanchalik tez-tez tashrif buyuriladi?", o: ["Oyiga bir marta", "Haftasiga 1–2 marta", "Yilda bir marta", "Faqat qo‘ng‘iroq qilsa"], a: 1, why: "Eng katta mijozlar eng ko‘p e’tiborni talab qiladi." },
        { q: "Hududni kunlarga bo‘lishning asosiy foydasi nima?", o: ["Kam yurish, mijoz sizni aniq kunda kutadi", "Ko‘proq benzin sarflash", "Hech qanday foyda yo‘q", "Faqat rahbar uchun"], a: 0, why: "Marshrut tartibi vaqtni tejaydi va intizom yaratadi." },
        { q: "Kunlik marshrutga nechta potensial nuqta qo‘shish tavsiya etiladi?", o: ["0", "2–3 ta", "20 ta", "Faqat juma kuni"], a: 1, why: "Kuniga 2–3 ta — haftalik yangi mijozlar me’yorini ta’minlaydi." }
      ]
    },
    {
      id: "m7l3", title: "CRM va hisobot", min: 12, video: "",
      blocks: [
        { t: "p", h: "CRM — sizning “ikkinchi xotirangiz”. U sizga keyingi qadamni eslatadi, rahbarga esa ishingizni ko‘rsatadi. Yaxshi yozuv — bu <b>keyingi tashrifga tayyor reja</b>." },
        { t: "cmp",
          bad: ["Yomon yozuv", "“Bordim. Gaplashdik.”"],
          good: ["Yaxshi yozuv", "“Avto-Servis Sergeli, Bobur aka (ega). 2 ta karobka S-Force 5W-30 buyurtma, yetkazish payshanba. Qarz 4,2 mln — to‘lov payshanba. Ustalar Tracker uchun DX1 so‘rashdi → keyingi tashrifda namuna olib boraman (seshanba 11:00).”"] },
        { t: "h", h: "Har yozuvda bo‘lishi shart" },
        { t: "ol", items: [
          "<b>Kim:</b> nuqta va kontakt shaxs.",
          "<b>Natija:</b> buyurtma / sinov / rad / uchrashuv.",
          "<b>Raqamlar:</b> hajm, summa, qoldiq, qarz.",
          "<b>Mijoz gapi:</b> muhim e’tiroz yoki so‘rov.",
          "<b>Keyingi qadam:</b> nima qilinadi va qachon (sana, vaqt)."
        ]},
        { t: "call", k: "rule", title: "Qoida", h: "<p>Har kuni 17:30 da hisobot. CRM ga kiritilmagan tashrif — <b>bo‘lmagan tashrif</b>.</p>" }
      ],
      keys: [
        "CRM — ikkinchi xotira va rahbar uchun shaffoflik.",
        "Yozuv: kim, natija, raqamlar, mijoz gapi, keyingi qadam.",
        "Kiritilmagan tashrif — bo‘lmagan tashrif."
      ],
      quiz: [
        { q: "Sifatli CRM yozuvida albatta nima bo‘lishi kerak?", o: ["Ob-havo", "Keyingi qadam va uning sanasi", "Mijozning yoshi", "Agentning kayfiyati"], a: 1, why: "Keyingi qadam — ish davomiyligini ta’minlaydi." },
        { q: "“Bordim, gaplashdik” — bu qanday yozuv?", o: ["Ideal", "Yomon — natija, raqamlar va keyingi qadam yo‘q", "Yetarli", "Juda batafsil"], a: 1, why: "Bunday yozuvdan hech qanday foydali ma’lumot olib bo‘lmaydi." },
        { q: "Kunlik hisobot qachon kiritiladi?", o: ["Hafta oxirida", "Har kuni 17:30 da", "Oy oxirida", "Rahbar so‘raganda"], a: 1, why: "Kunlik intizom — ma’lumotlar to‘liq va aniq bo‘ladi." }
      ]
    },
    {
      id: "m7l4", title: "Raqamlaringni bil: KPI va daromad", min: 12, video: "",
      blocks: [
        { t: "p", h: "TOP agent o‘z raqamlarini biladi: necha kontakt → nechta tashrif → nechta buyurtma → qancha oborot. Bu <b>savdo voronkasi</b>. Uni bilsangiz, natijani boshqarasiz." },
        { t: "ig", k: "kpi-calc" },
        { t: "h", h: "Voronkani qanday yaxshilash mumkin" },
        { t: "table", head: ["Muammo", "Belgisi", "Yechim"], rows: [
          ["Kam kontakt", "Kuniga 10 dan kam", "Kunni erta boshlang, potensial nuqtalarni ko‘paytiring"],
          ["Tashrifdan buyurtmaga past konversiya", "Ko‘p tashrif, kam buyurtma", "Ehtiyojni aniqlash va yopish ko‘nikmasini mashq qiling (Trenajor)"],
          ["Kichik chek", "Buyurtmalar ko‘p, oborot kam", "Kross-sotuv, upsell, assortiment kengaytirish (5-modul)"],
          ["Qayta buyurtma yo‘q", "Mijozlar bir marta oladi", "Follow-up va merchandisingni kuchaytiring"]
        ]},
        { t: "call", k: "tip", title: "Haftalik o‘z-o‘zini tekshirish", h: "<p>Har juma: oborot, rejaning foizi, yangi mijozlar, o‘rtacha chek, muddati o‘tgan qarz. Qaysi ko‘rsatkich eng zaif — keyingi haftaning asosiy maqsadi shu bo‘ladi.</p>" },
        { t: "task", title: "Amaliy topshiriq", h: "Kalkulyatorga o‘z haqiqiy raqamlaringizni kiriting. Qaysi bosqichda yo‘qotish eng katta ekanini aniqlang va supervayzer bilan muhokama qiling." }
      ],
      keys: [
        "Voronka: kontakt → tashrif → buyurtma → oborot.",
        "Eng zaif bosqichni toping — u keyingi haftaning maqsadi.",
        "Har juma o‘z raqamlaringizni tekshiring."
      ],
      quiz: [
        { q: "Ko‘p tashrif, lekin kam buyurtma — qaysi bosqichda muammo?", o: ["Kontaktlar soni", "Tashrifdan buyurtmaga konversiya", "Ombor", "Yetkazish"], a: 1, why: "Ehtiyojni aniqlash va yopish ko‘nikmasi yetishmayapti." },
        { q: "Buyurtmalar ko‘p, oborot kam. Eng to‘g‘ri yechim qaysi?", o: ["Kamroq ishlash", "Kross-sotuv, upsell va assortimentni kengaytirish", "Narxni tushirish", "Mijozlarni kamaytirish"], a: 1, why: "Muammo — kichik chek. Uni oshirish kerak." },
        { q: "Haftalik o‘z-o‘zini tekshirish qachon qilinadi?", o: ["Har juma", "Yilda bir marta", "Faqat yiqilganda", "Hech qachon"], a: 0, why: "Juma — haftani yakunlash va keyingisini rejalash kuni." }
      ]
    }
  ]
});
