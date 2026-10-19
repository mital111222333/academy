/* 6-MODUL — DEBITORKA */
COURSE.modules.push({
  id: "m6", n: 6, week: 3,
  title: "Debitorka",
  sub: "Qarzni oldini olish, nazorat qilish va undirish",
  outcomes: [
    "Nima uchun “to‘lanmagan sotuv — sotuv emas” ekanini tushunasiz",
    "Kredit limiti va hujjatlar bilan qarzni oldini olasiz",
    "Qarz yoshini svetofor bo‘yicha nazorat qilasiz",
    "Muloyim, lekin qat’iy undirish skriptlarini qo‘llaysiz"
  ],
  lessons: [
    {
      id: "m6l1", title: "Debitorka nima va nega u muhim", min: 10, video: "",
      blocks: [
        { t: "p", h: "<b>Debitorka</b> — mijozning kompaniyaga to‘lanmagan qarzi. Tovar berildi, lekin pul hali kelmadi. Bu oddiy holat — lekin nazoratsiz qolsa, kompaniya uchun eng katta xavf." },
        { t: "call", k: "rule", title: "Asosiy qoida", h: "<p><b>To‘lanmagan sotuv — sotuv emas, sovg‘a.</b> Agentning ishi pul kassaga kelganda tugaydi.</p>" },
        { t: "ig", k: "debt-cycle" },
        { t: "h", h: "Qarz nimaga olib keladi" },
        { t: "ul", items: [
          "Kompaniyaning aylanma mablag‘i kamayadi — yangi tovar olib kelish qiyinlashadi.",
          "Mijoz katta qarz bilan sizdan “qochadi” va raqobatchidan ola boshlaydi.",
          "Muddati o‘tgan qarz agentning KPI va bonusiga bevosita ta’sir qiladi.",
          "Qancha uzoq kutsangiz, undirish shunchalik qiyin bo‘ladi."
        ]},
        { t: "call", k: "tip", title: "Paradoks", h: "<p>Qarzni o‘z vaqtida yig‘ish <b>munosabatni yaxshilaydi</b>: mijoz qarzsiz bo‘lsa, u bemalol yangi buyurtma beradi va sizni ko‘rganda xursand bo‘ladi.</p>" }
      ],
      keys: [
        "Debitorka — to‘lanmagan qarz; nazoratsiz bo‘lsa — eng katta xavf.",
        "To‘lanmagan sotuv — sotuv emas.",
        "Qarzsiz mijoz — yangi buyurtmaga tayyor mijoz."
      ],
      quiz: [
        { q: "Debitorka nima?", o: ["Ombordagi tovar", "Mijozning kompaniyaga to‘lanmagan qarzi", "Agent maoshi", "Yetkazish xarajati"], a: 1, why: "Tovar berilgan, pul hali olinmagan — bu debitorka." },
        { q: "Agentning ishi qachon tugaydi?", o: ["Buyurtma olinganda", "Tovar yetkazilganda", "Pul to‘liq kassaga kelganda", "Shartnoma imzolanganda"], a: 2, why: "To‘lovsiz sotuv kompaniyaga foyda bermaydi." },
        { q: "Katta qarzi bor mijoz ko‘pincha nima qiladi?", o: ["Ko‘proq buyurtma beradi", "Agentdan qochadi va raqobatchidan ola boshlaydi", "Darhol to‘laydi", "Hech narsa o‘zgarmaydi"], a: 1, why: "Qarz noqulaylik tug‘diradi — mijoz aloqadan qochadi." }
      ]
    },
    {
      id: "m6l2", title: "Qarzni oldini olish: limit, shartlar, hujjatlar", min: 12, video: "",
      blocks: [
        { t: "p", h: "Eng yaxshi undirish — <b>muammoli qarzni umuman yuzaga keltirmaslik</b>. Buning uchun qoidalar sotuvdan oldin kelishiladi." },
        { t: "steps", items: [
          ["Shartlarni oldindan kelishing", "To‘lov muddati (masalan, 7 / 14 kun) va usuli birinchi buyurtmadan oldin aniq aytiladi va yoziladi."],
          ["Kredit limiti", "Har bir mijoz uchun maksimal qarz summasi. Limit to‘lsa — yangi yetkazish faqat to‘lovdan keyin."],
          ["Yangi mijoz — kichik boshlash", "Birinchi buyurtmalar kichik hajmda yoki oldindan to‘lov bilan. Ishonch to‘lov intizomi bilan o‘sadi."],
          ["Hujjatlar", "Har bir yetkazishga imzolangan nakladnoy. Muntazam ravishda solishtirma dalolatnoma (akt sverka)."],
          ["To‘lov kalendari", "Har bir qarzning to‘lov sanasi CRM da va sizning kundaligingizda."]
        ]},
        { t: "call", k: "warn", title: "Xavf belgilari", h: "<p>To‘lovni bir necha marta “ertaga” deb kechiktirish, qo‘ng‘iroqlarga javob bermaslik, egasi doim “yo‘q”, nuqtada tovar kamayib ketishi, keskin katta buyurtma so‘rash. Bunday holatda <b>yangi yetkazishni to‘xtatib</b>, supervayzerga xabar bering.</p>" },
        { t: "p", h: "Kredit limiti va to‘lov muddatlarini <b>kompaniya belgilaydi</b>. Agent o‘zboshimchalik bilan muddat yoki limitni o‘zgartirmaydi — bu supervayzer bilan kelishiladi." }
      ],
      keys: [
        "Shartlar sotuvdan oldin kelishiladi va yoziladi.",
        "Kredit limiti va imzolangan nakladnoy — himoyangiz.",
        "Xavf belgilarini ko‘rsangiz — yetkazishni to‘xtatib, supervayzerga ayting."
      ],
      quiz: [
        { q: "Kredit limiti to‘lgan mijozga nima qilinadi?", o: ["Yana tovar beriladi", "Yangi yetkazish faqat to‘lovdan keyin", "Limit o‘zboshimchalik bilan oshiriladi", "Mijoz bazadan o‘chiriladi"], a: 1, why: "Limit — qarz o‘sib ketmasligi uchun chegara." },
        { q: "Yangi mijoz bilan ishni qanday boshlash to‘g‘ri?", o: ["Darhol katta qarzga tovar berish", "Kichik hajm yoki oldindan to‘lov bilan, ishonch to‘lov intizomi bilan o‘sadi", "Hech qanday shartsiz", "Faqat og‘zaki kelishuv bilan"], a: 1, why: "Xavfni kamaytirish uchun ishonch bosqichma-bosqich quriladi." },
        { q: "Qaysi biri xavf belgisi?", o: ["Mijoz o‘z vaqtida to‘laydi", "To‘lovni bir necha marta “ertaga” deb kechiktirish va qo‘ng‘iroqqa javob bermaslik", "Mijoz akt sverkani imzolaydi", "Mijoz yangi SKU so‘raydi"], a: 1, why: "Takroriy kechiktirish va aloqadan qochish — jiddiy ogohlantirish." }
      ]
    },
    {
      id: "m6l3", title: "Qarz svetofori va eslatma kalendari", min: 12, video: "",
      blocks: [
        { t: "p", h: "Har bir qarzning “yoshi” bor — to‘lov muddatidan necha kun o‘tgani. Yosh qanchalik katta bo‘lsa, undirish shunchalik qiyin. Shuning uchun qarzlarni <b>svetofor</b> bo‘yicha nazorat qilamiz." },
        { t: "ig", k: "aging" },
        { t: "h", h: "Eslatma kalendari" },
        { t: "ig", k: "reminders" },
        { t: "call", k: "tip", title: "Muhim", h: "<p>Eslatma — bu bosim emas, <b>xizmat</b>. “Sizga qulay bo‘lishi uchun eslatib qo‘yay…” degan ohangda gapiring.</p>" },
        { t: "task", title: "Amaliy topshiriq", h: "O‘z mijozlaringiz qarzini svetofor bo‘yicha 4 guruhga ajrating. Sariq va qizil guruh uchun shu hafta harakat rejasini yozing." }
      ],
      keys: [
        "Qarz yoshi: yashil (muddatida) → sariq → to‘q sariq → qizil.",
        "Eslatma kalendari: D−2, D0, D+3, D+7, D+15.",
        "Eslatma — xizmat ohangida, lekin har doim aniq sana bilan."
      ],
      quiz: [
        { q: "To‘lov muddatidan 2 kun oldin nima qilinadi?", o: ["Hech narsa", "Muloyim eslatma: summa va sana", "Yetkazishni to‘xtatish", "Sudga murojaat"], a: 1, why: "Oldindan eslatma to‘lovni o‘z vaqtida qilishga yordam beradi." },
        { q: "Qarz muddati 15 kundan oshsa, qaysi zona?", o: ["Yashil", "Sariq", "Qizil — supervayzer bilan eskalatsiya", "Muammo yo‘q"], a: 2, why: "Uzoq muddatli qarz — yuqori xavf, rahbariyat ishtiroki kerak." },
        { q: "Eslatma qanday ohangda bo‘lishi kerak?", o: ["Qo‘pol va tahdidli", "Xizmat ohangida, muloyim, lekin aniq sana bilan", "Umuman eslatmaslik", "Boshqa mijozlar oldida"], a: 1, why: "Hurmat munosabatni saqlaydi, aniqlik esa natija beradi." }
      ]
    },
    {
      id: "m6l4", title: "Undirish skriptlari va eskalatsiya", min: 14, video: "",
      blocks: [
        { t: "p", h: "Qarz haqida gapirish noqulay tuyulishi mumkin. Lekin bu — oddiy biznes jarayoni. Tayyor skript bilan bu gap oson va professional chiqadi." },
        { t: "dialog", lines: [
          ["a", "Assalomu alaykum, Bobur aka! Ishlaringiz yaxshimi? Sizga qulay bo‘lishi uchun eslatib qo‘yay: 12-sanadagi yetkazish bo‘yicha 4 200 000 so‘m to‘lov muddati bugun."],
          ["c", "Ha, bilaman, hozir biroz qiyinroq..."],
          ["a", "Tushunaman. Bugun qancha qismini to‘lash imkoni bor? Qolganini qaysi aniq sanada yopamiz?"],
          ["c", "Bugun yarmini beraman, qolganini payshanba."],
          ["a", "Kelishdik: bugun 2 100 000, payshanba qolgan 2 100 000. Payshanba ertalab o‘zim xabar beraman. Rahmat!"],
          ["n", "Formula: muloyim salom → aniq summa va sana → “qancha va qachon?” → kelishuvni takrorlash → nazorat."]
        ]},
        { t: "h", h: "Qiyin holatlar" },
        { t: "table", head: ["Mijoz gapi", "Agent javobi"], rows: [
          ["“Pul yo‘q”", "“Tushunaman. Bugun qancha qila olasiz? Qolgani uchun aniq sanani belgilaylik.” — qisman to‘lov + sana."],
          ["“Tovar sotilmayapti”", "“Keling, polkani birga ko‘raylik.” — merchandising yordami, lekin to‘lov sanasi saqlanadi."],
          ["“Ega yo‘q”", "“Qachon bo‘ladi? Shu vaqtga keyin kelaman / qo‘ng‘iroq qilaman.” — egasi bilan to‘g‘ridan-to‘g‘ri gaplashing."],
          ["“Keyingi tovar bilan birga to‘layman”", "“Yangi yetkazish eski qarz yopilgandan keyin bo‘ladi — bu kompaniya qoidasi.”"]
        ]},
        { t: "h", h: "Eskalatsiya — qachon va qanday" },
        { t: "steps", items: [
          ["Va’da 2 marta buzildi", "Yangi yetkazish to‘xtatiladi, supervayzerga yoziladi."],
          ["Qarz 15 kundan oshdi", "Supervayzer bilan birga tashrif, akt sverka imzolatiladi."],
          ["30 kundan oshdi / aloqa yo‘q", "Rahbariyat qaror qiladi: rasmiy talabnoma va keyingi choralar."]
        ]},
        { t: "call", k: "warn", title: "Mumkin emas", h: "<p>Mijozni boshqalar oldida uyaltirish, qo‘rqitish, yoki qarzni o‘z hisobingizdan “yopib qo‘yish”. Har qanday kelishuvni yozma (xabar orqali) tasdiqlang.</p>" },
        { t: "task", title: "Amaliy topshiriq", h: "Rol o‘yini: supervayzer “pul yo‘q” deydigan mijoz. Skript bo‘yicha qisman to‘lov va aniq sanaga kelishing." }
      ],
      keys: [
        "Skript: salom → summa va sana → “qancha va qachon?” → takrorlash → nazorat.",
        "Qisman to‘lov + aniq sana — “pul yo‘q” ga eng yaxshi javob.",
        "Va’da 2 marta buzilsa yoki 15+ kun — eskalatsiya."
      ],
      quiz: [
        { q: "Mijoz “Pul yo‘q” desa, eng yaxshi javob qaysi?", o: ["“Unda keyin kelaman” deb ketish", "“Bugun qancha qila olasiz? Qolgani uchun aniq sanani belgilaylik”", "Qo‘pol gapirish", "Qarzni kechirish"], a: 1, why: "Qisman to‘lov va aniq sana — jarayonni oldinga suradi." },
        { q: "Mijoz to‘lov va’dasini 2 marta buzdi. Nima qilinadi?", o: ["Yana katta tovar beriladi", "Yangi yetkazish to‘xtatiladi va supervayzerga xabar beriladi", "Hech narsa", "Agent o‘zi to‘lab qo‘yadi"], a: 1, why: "Bu eskalatsiya bosqichi — rahbar ishtiroki kerak." },
        { q: "Kelishilgan to‘lov rejasini qanday mustahkamlash kerak?", o: ["Faqat og‘zaki", "Yozma (xabar orqali) tasdiqlab, belgilangan kuni nazorat qilish", "Unutish", "Boshqa agentga topshirish"], a: 1, why: "Yozma tasdiq tushunmovchilikning oldini oladi." }
      ]
    }
  ]
});
