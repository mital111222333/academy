/* 4-MODUL — SAVDO TEXNIKASI VA SKRIPTLAR */
COURSE.modules.push({
  id: "m4", n: 4, week: 2,
  title: "Savdo texnikasi va skriptlar",
  sub: "Tashrifning 7 qadami, savollar, e’tirozlar, yopish va follow-up",
  outcomes: [
    "Har bir tashrifni 7 qadamli standart bo‘yicha o‘tkazasiz",
    "To‘g‘ri savollar bilan ehtiyojni aniqlaysiz",
    "Asosiy e’tirozlarga tayyor javoblaringiz bor",
    "Kelishuvni yopasiz va keyingi qadamni belgilaysiz"
  ],
  lessons: [
    {
      id: "m4l1", title: "Tashrifning 7 qadami", min: 14, video: "",
      blocks: [
        { t: "p", h: "TOP agentlar improvizatsiya qilmaydi — ular <b>tizim</b> bilan ishlaydi. Har bir tashrif bir xil 7 qadamdan iborat. Bu qadamlar sizni yo‘qotib qo‘ymaydi va natijani bashorat qilinadigan qiladi." },
        { t: "ig", k: "visit7" },
        { t: "steps", items: [
          ["Tayyorgarlik", "Mijoz pasportini o‘qing: oxirgi buyurtma, qarz, qoldiq, bugungi maqsad (masalan: yangi SKU kiritish)."],
          ["Salomlashish va aloqa", "Ism bilan murojaat, tabassum, qisqa samimiy gap. Birinchi 30 soniya — kayfiyat."],
          ["Polka va qoldiqni tekshirish", "Nima tugayapti, nima turib qolgan, narx teglari, mahsulot joylashuvi."],
          ["Ehtiyojni aniqlash", "Savollar: qaysi mashinalar ko‘p, nima tez ketyapti, nima muammo?"],
          ["Taqdimot", "Faqat aniqlangan ehtiyojga mos 1–2 mahsulot, X→A→F formulasida."],
          ["E’tirozlar bilan ishlash", "Tinglash → qo‘shilish → aniqlash → argument → tekshirish."],
          ["Kelishuv va keyingi qadam", "Buyurtma, yetkazish sanasi, to‘lov sanasi, keyingi tashrif — hammasi aniq."]
        ]},
        { t: "call", k: "rule", title: "Oltin qoida", h: "<p>Har bir tashrif <b>aniq natija</b> bilan tugaydi: buyurtma, sinov partiyasi, to‘lov yoki belgilangan keyingi uchrashuv. “Keyin gaplashamiz” — natija emas.</p>" },
        { t: "task", title: "Amaliy topshiriq", h: "Ertangi 5 ta tashrif uchun har biriga bitta aniq maqsad yozing (masalan: “Cobalt servisiga S-Force 5W-30 sinov partiyasi”)." }
      ],
      keys: [
        "7 qadam: tayyorgarlik → aloqa → polka → ehtiyoj → taqdimot → e’tiroz → kelishuv.",
        "Taqdimot faqat aniqlangan ehtiyojga mos bo‘ladi.",
        "Har bir tashrif aniq natija bilan tugaydi."
      ],
      quiz: [
        { q: "Tashrifning birinchi qadami qaysi?", o: ["Narx aytish", "Tayyorgarlik: mijoz pasportini o‘qish va maqsad qo‘yish", "Buyurtma so‘rash", "Katalog berish"], a: 1, why: "Tayyorgarliksiz tashrif — tasodifiy tashrif." },
        { q: "Taqdimotni qachon qilish kerak?", o: ["Salomlashishdan oldin", "Ehtiyoj aniqlangandan keyin", "Hech qachon", "Faqat mijoz so‘rasa"], a: 1, why: "Ehtiyojni bilmay taqdimot qilish — “nishonsiz otish”." },
        { q: "Qaysi biri tashrifning to‘g‘ri yakuni EMAS?", o: ["Buyurtma rasmiylashtirildi", "Sinov partiyasiga kelishildi", "“Keyin gaplashamiz” deb ketish", "Aniq sana bilan keyingi uchrashuv belgilandi"], a: 2, why: "Aniq keyingi qadam bo‘lmasa, tashrif natijasiz." }
      ]
    },
    {
      id: "m4l2", title: "Savol berish san’ati", min: 12, video: "",
      blocks: [
        { t: "p", h: "Kim savol bersa — suhbatni o‘sha boshqaradi. Yomon agent gapiradi, yaxshi agent <b>so‘raydi va tinglaydi</b>. Ideal nisbat: mijoz 60–70% gapiradi." },
        { t: "h", h: "Ochiq va yopiq savollar" },
        { t: "cmp",
          bad: ["Yopiq (ha/yo‘q)", "“Moy kerakmi?” — “Yo‘q.” Suhbat tugadi."],
          good: ["Ochiq", "“Hozir qaysi moylar eng ko‘p ketyapti?” — mijoz gapira boshlaydi, siz ma’lumot olasiz."] },
        { t: "h", h: "4 bosqichli savollar (SPIN)" },
        { t: "ig", k: "spin" },
        { t: "dialog", lines: [
          ["a", "Kuniga taxminan nechta mashinaga moy almashtirasiz?"],
          ["c", "15–20 ta, ko‘pi Cobalt va Nexia."],
          ["a", "Yozda mijozlar moy kamayib ketayotganidan shikoyat qilishadimi?"],
          ["c", "Ha, ba’zilari gazda yuradi, moy tez qorayadi deyishadi."],
          ["a", "Bu sizning obro‘ingizga ta’sir qilyaptimi? Mijozlar boshqa servisga ketib qolmayaptimi?"],
          ["c", "Ba’zan ketishadi, albatta..."],
          ["a", "Agar issiqda kam bug‘lanadigan va gazli dvigatelga mos moy bo‘lsa, bu sizga qanchalik foydali bo‘lardi?"],
          ["n", "Mijozning o‘zi muammoni va yechimning qadrini aytdi. Endi taqdimot juda oson."]
        ]},
        { t: "call", k: "tip", title: "Faol tinglash", h: "<p>Mijoz gapini qisqa takrorlang: “Demak, sizda Cobalt ko‘p va yozda moy tez qorayadi, to‘g‘rimi?” Bu mijozga eshitilganini his qildiradi va xatoni oldini oladi.</p>" }
      ],
      keys: [
        "Savol bergan suhbatni boshqaradi; mijoz 60–70% gapirsin.",
        "Ochiq savollar ma’lumot beradi, yopiqlar — suhbatni tugatadi.",
        "SPIN: Vaziyat → Muammo → Oqibat → Yechim qadri."
      ],
      quiz: [
        { q: "Qaysi savol ochiq savol?", o: ["Moy kerakmi?", "Sizga 5W-30 kerakmi?", "Qaysi mashinalar sizga ko‘proq keladi?", "Buyurtma berasizmi?"], a: 2, why: "Ochiq savolga “ha/yo‘q” bilan javob berib bo‘lmaydi." },
        { q: "SPIN dagi “Oqibat” savolining maqsadi nima?", o: ["Narxni bilish", "Muammoning mijoz biznesiga ta’sirini his qildirish", "Suhbatni tugatish", "Raqobatchini bilish"], a: 1, why: "Oqibat savoli muammoni mijoz uchun muhim qiladi." },
        { q: "Faol tinglash qanday ko‘rinadi?", o: ["Mijozni bo‘lib, o‘z fikringizni aytish", "Telefonga qarab turish", "Mijoz gapini qisqa takrorlab, tasdiqlatish", "Darhol narx aytish"], a: 2, why: "Takrorlash tushunganingizni ko‘rsatadi va ishonch hosil qiladi." }
      ]
    },
    {
      id: "m4l3", title: "E’tirozlar bilan ishlash", min: 16, video: "",
      blocks: [
        { t: "p", h: "E’tiroz — rad javobi emas, <b>qiziqish belgisi</b>. Qiziqmagan odam e’tiroz bildirmaydi, shunchaki “kerak emas” deydi. TOP agent e’tirozdan qo‘rqmaydi: har biriga tayyor javobi bor." },
        { t: "ig", k: "objection-algo" },
        { t: "h", h: "Eng ko‘p uchraydigan e’tirozlar" },
        { t: "table", head: ["E’tiroz", "Asl ma’nosi", "Javob yo‘nalishi"], rows: [
          ["“Qimmat”", "Qiymatini tushunmadim", "Litr emas, natijani solishtiring: oraliq, shikoyat yo‘qligi, marja. “Nima bilan solishtiryapsiz?”"],
          ["“Bizda yetkazib beruvchi bor”", "O‘zgartirish xavfli", "Almashtirishni emas, qo‘shimcha variantni taklif qiling: “Bitta pozitsiyadan sinab ko‘ring”"],
          ["“Mijozlar so‘ramaydi”", "Bu brend notanish", "Usta tavsiyasi + polkada ko‘rinish + sinov; “Usta tavsiya qilsa, mijoz oladi”"],
          ["“O‘ylab ko‘raman”", "Ishonch yetmayapti yoki boshqa sabab bor", "“Nimani o‘ylab ko‘rmoqchisiz — narxnimi, sifatnimi?” Aniq sababni toping"],
          ["“Pul yo‘q”", "Hozir budjet yoki to‘lov muammosi", "Kichik sinov partiyasi, qulay assortiment, to‘lov muddatini kompaniya qoidasi doirasida muhokama qilish"],
          ["“Keyin keling”", "Hozir vaqt yo‘q yoki qiziqmayapti", "Aniq vaqt belgilang: “Payshanba 10:00 yoki 15:00 — qaysi biri qulay?”"]
        ]},
        { t: "dialog", lines: [
          ["c", "Qimmat ekan."],
          ["a", "Tushunaman, narx muhim. Qaysi moy bilan solishtiryapsiz?"],
          ["c", "Hozirgi moyim litriga arzonroq."],
          ["a", "To‘g‘ri, kanistraning narxi farq qiladi. Lekin bu moy issiqda kam bug‘lanadi va almashtirish oralig‘ida o‘z xususiyatini saqlaydi — mijozingiz shikoyat qilmaydi, qaytib keladi. Sizga bitta qaytgan mijoz bir necha litr farqdan qimmatroq emasmi?"],
          ["c", "Ha, bunisi to‘g‘ri."],
          ["a", "Unda 2 ta karobka bilan sinab ko‘raylik. Ikki haftadan keyin ustalaringiz fikrini birga eshitamiz."]
        ]},
        { t: "call", k: "warn", title: "Mumkin emas", h: "<p>Mijoz bilan bahslashish, uni “bilmaydi” deb qoralash yoki raqobatchini yomonlash. Siz bahsni yutishingiz mumkin, lekin mijozni yo‘qotasiz.</p>" },
        { t: "p", h: "Barcha e’tirozlar va to‘liq javoblar <b>“Skriptlar”</b> kutubxonasida, ularni mashq qilish esa <b>“Trenajor”</b> bo‘limida." }
      ],
      keys: [
        "E’tiroz — qiziqish belgisi, rad javobi emas.",
        "Algoritm: Tinglang → Qo‘shiling → Aniqlang → Argument → Tekshiring.",
        "Hech qachon bahslashmang va raqobatchini yomonlamang."
      ],
      quiz: [
        { q: "Mijoz “Qimmat” desa, birinchi nima qilish kerak?", o: ["Darhol chegirma berish", "Qo‘shilib, nima bilan solishtirayotganini aniqlash", "Ketib qolish", "Raqobatchini yomonlash"], a: 1, why: "Avval sababni aniqlang — keyin qiymatni ko‘rsating." },
        { q: "“Bizda yetkazib beruvchi bor” e’tiroziga eng yaxshi yondashuv qaysi?", o: ["Hozirgi yetkazib beruvchini tanqid qilish", "Almashtirishni emas, bitta pozitsiyadan sinovni taklif qilish", "Bosim o‘tkazish", "Rozi bo‘lib ketish va qaytmaslik"], a: 1, why: "Kichik sinov xavfni kamaytiradi va eshikni ochadi." },
        { q: "“O‘ylab ko‘raman” deganda agent nima qilishi kerak?", o: ["“Yaxshi, xayr” deb ketish", "Nimani o‘ylab ko‘rmoqchiligini aniqlash va asl sababni topish", "Narxni ikki baravar tushirish", "Uzoq ma’ruza o‘qish"], a: 1, why: "“O‘ylab ko‘raman” ortida ko‘pincha aytilmagan aniq sabab turadi." }
      ]
    },
    {
      id: "m4l4", title: "Yopish texnikalari va follow-up", min: 14, video: "",
      blocks: [
        { t: "p", h: "Ko‘p agentlar yaxshi gaplashadi, lekin <b>buyurtma so‘rashga qo‘rqadi</b>. Yopish — tabiiy qadam: siz mijozga yechim berdingiz, endi uni rasmiylashtirasiz." },
        { t: "h", h: "5 ta ishlaydigan yopish usuli" },
        { t: "table", head: ["Usul", "Misol"], rows: [
          ["Muqobil tanlov", "“4 litrlikdan 2 karobka olasizmi yoki 5 litrlikdan bitta?”"],
          ["Sinov partiyasi", "“Avval ozroq olib sinab ko‘raylik. Yoqsa, ko‘paytirasiz. Qancha olish qulay?”"],
          ["Xulosa", "“Demak, sizga Cobalt uchun 5W-30, yetkazish payshanba, to‘lov 14 kunda. Rasmiylashtiraymi?”"],
          ["Keyingi qadam", "“Ustalaringizga 15 daqiqalik qisqa taqdimot qilsam bo‘ladimi? Ertaga 10:00 qulaymi?”"],
          ["Jimlik", "Taklifni aytib, <b>jim turing</b>. Birinchi gapirgan kishi yon beradi."]
        ]},
        { t: "call", k: "tip", title: "Kichik “ha”lar", h: "<p>Suhbat davomida mijozdan kichik roziliklar oling: “Issiqda moy tez qorayishi muammo, to‘g‘rimi?” — “Ha”. Bir nechta “ha”dan keyin katta “ha” oson keladi.</p>" },
        { t: "h", h: "Follow-up: sotuvdan keyingi ish" },
        { t: "steps", items: [
          ["Yetkazish kuni", "Mahsulot yetib keldimi, hammasi to‘g‘rimi — qo‘ng‘iroq yoki xabar."],
          ["1 hafta", "Polkaga qo‘yildimi, narx tegi bormi, usta va sotuvchi mahsulotni bilishadimi?"],
          ["2–3 hafta", "Qanday sotilyapti, mijozlar fikri, qayta buyurtma vaqti."],
          ["Muntazam", "Haftalik/ikki haftalik tashrif jadvali bo‘yicha."]
        ]},
        { t: "h", h: "Telefon orqali uchrashuv belgilash" },
        { t: "dialog", lines: [
          ["a", "Assalomu alaykum, [Ism] aka! Men [Ism], MITAL kompaniyasidanman. Motor moylari distribyutorimiz."],
          ["a", "Moy almashtirish shoxobchangiz foydasini oshirish bo‘yicha 2 daqiqa gaplashsak bo‘ladimi?"],
          ["a", "Biz ustalar shikoyatsiz quyadigan va mijozni qaytaradigan moylar bilan ishlaymiz, assortimentni ham to‘g‘ri tuzishga yordam beramiz."],
          ["a", "Bugun soat 15:00 da yoki ertaga ertalab o‘tib ko‘rsatsam bo‘ladimi? Qaysi vaqt qulay?"],
          ["n", "Telefonda sotmang — telefonda faqat uchrashuvni soting."]
        ]},
        { t: "task", title: "Amaliy topshiriq", h: "Supervayzer bilan rol o‘yini: u mijoz, siz agent. 7 qadamni to‘liq o‘ting va 3 xil yopish usulini sinab ko‘ring." }
      ],
      keys: [
        "Yopish — tabiiy qadam. Buyurtma so‘rashdan qo‘rqmang.",
        "Muqobil tanlov, sinov, xulosa, keyingi qadam, jimlik — 5 usul.",
        "Follow-up sotuvni qayta buyurtmaga aylantiradi."
      ],
      quiz: [
        { q: "“4 litrlikdan 2 karobka yoki 5 litrlikdan bitta?” — bu qaysi yopish usuli?", o: ["Jimlik", "Muqobil tanlov", "Ultimatum", "Xulosa"], a: 1, why: "Ikki variant beriladi — har ikkisi ham “ha”." },
        { q: "Telefon qo‘ng‘irog‘ining asosiy maqsadi nima?", o: ["Telefonda katta buyurtma olish", "Uchrashuv belgilash", "Narxlar ro‘yxatini o‘qib berish", "Raqobatchi haqida so‘rash"], a: 1, why: "Telefonda uchrashuvni sotasiz, mahsulotni — tashrifda." },
        { q: "Yetkazishdan 1 hafta keyin nimani tekshirish kerak?", o: ["Hech narsani", "Mahsulot polkadami, narx tegi bormi, usta va sotuvchi bilishadimi", "Faqat qarzni", "Raqobatchining narxini"], a: 1, why: "Polkada bo‘lmagan mahsulot sotilmaydi — qayta buyurtma ham bo‘lmaydi." }
      ]
    }
  ]
});
