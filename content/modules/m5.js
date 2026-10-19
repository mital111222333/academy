/* 5-MODUL — NUQTANI RIVOJLANTIRISH (YANGI BOB)
   Assortiment matritsasi, merchandising, buyurtma hajmi, kross-sotuv */
COURSE.modules.push({
  id: "m5", n: 5, week: 2, isNew: true,
  title: "Nuqtani rivojlantirish",
  sub: "Assortiment, merchandising, to‘g‘ri buyurtma hajmi va katta chek",
  outcomes: [
    "Har bir mijoz turi uchun majburiy assortiment (SKU matritsasi) tuzasiz",
    "Polkani savdo qiladigan qilib joylashtirasiz",
    "Buyurtma hajmini formula bilan hisoblaysiz — na ortiqcha, na kam",
    "Kross-sotuv va upsell bilan chekni oshirasiz"
  ],
  lessons: [
    {
      id: "m5l1", title: "Assortiment matritsasi (SKU)", min: 14, video: "",
      blocks: [
        { t: "p", h: "Bitta nuqtaga bitta mahsulot sotish — boshlanish. Haqiqiy daromad nuqtada <b>to‘g‘ri assortiment</b> bo‘lganda keladi. SKU — bu bitta aniq pozitsiya (masalan: “X-Force 5W-30 DX1, 4 L”)." },
        { t: "h", h: "Nega bu muhim" },
        { t: "ul", items: [
          "Xaridor kerakli moyni topmasa — boshqa brendni oladi yoki boshqa joyga ketadi.",
          "Har bir qo‘shimcha SKU — nuqta uchun qo‘shimcha savdo va siz uchun qo‘shimcha oborot.",
          "Keng assortiment nuqtani bizga “bog‘laydi”: yetkazib beruvchini almashtirish qiyinlashadi."
        ]},
        { t: "ig", k: "assort-matrix" },
        { t: "call", k: "rule", title: "Majburiy assortiment qoidasi", h: "<p>Har bir faol nuqtada kamida <b>“oltin 6”</b> bo‘lsin: ikkita 5W-30, bitta 10W-40, bitta zamonaviy (0W-20 yoki SQ), bitta ATF va bitta yuk/transmissiya pozitsiyasi — nuqta turiga qarab.</p>" },
        { t: "h", h: "ABC tahlil — nimaga e’tibor berish" },
        { t: "table", head: ["Guruh", "Ulushi", "Agent nima qiladi"], rows: [
          ["A — yetakchilar", "Sotuvning ~80% ini beradigan ~20% pozitsiya", "Hech qachon tugamasligi kerak. Har tashrifda qoldiqni tekshiring"],
          ["B — o‘rtacha", "Barqaror, lekin kichikroq hajm", "Muntazam to‘ldiring, polkada ko‘rinsin"],
          ["C — sekin", "Kam sotiladigan pozitsiyalar", "Kichik hajmda saqlang, sababini o‘rganing yoki o‘rnini almashtiring"]
        ]},
        { t: "task", title: "Amaliy topshiriq", h: "3 ta faol mijozingiz uchun hozirgi assortimentni yozing va “oltin 6” bilan solishtiring. Har biriga qo‘shiladigan 1–2 SKU ni rejalashtiring." }
      ],
      keys: [
        "SKU — aniq pozitsiya; assortiment kengligi = barqaror daromad.",
        "“Oltin 6”: nuqta turiga mos majburiy pozitsiyalar to‘plami.",
        "A guruh pozitsiyalari hech qachon tugamasligi kerak."
      ],
      quiz: [
        { q: "SKU nima?", o: ["Kompaniya nomi", "Bitta aniq tovar pozitsiyasi (mahsulot + hajm)", "Ombor manzili", "To‘lov turi"], a: 1, why: "Masalan: X-Force 5W-30 DX1, 4 L — bitta SKU." },
        { q: "ABC tahlilida A guruh pozitsiyalari bilan nima qilinadi?", o: ["Polkadan olib tashlanadi", "Hech qachon tugamasligi nazorat qilinadi", "Faqat yilda bir marta buyurtma qilinadi", "Chegirma bilan sotib yuboriladi"], a: 1, why: "A guruh — asosiy daromad manbai; uning tugashi to‘g‘ridan-to‘g‘ri zarar." },
        { q: "Nima uchun keng assortiment nuqtani yetkazib beruvchiga “bog‘laydi”?", o: ["Shartnoma majburlaydi", "Ko‘p pozitsiyani bitta joydan olish qulay va almashtirish qiyin", "Narx qimmatlashadi", "Bog‘lamaydi"], a: 1, why: "Qulaylik va keng tanlov — sodiqlikning eng kuchli sababi." }
      ]
    },
    {
      id: "m5l2", title: "Merchandising: sotadigan polka", min: 12, video: "",
      blocks: [
        { t: "p", h: "Xaridor ko‘rmagan mahsulotni sotib olmaydi. Polka — <b>jim sotuvchi</b>. Uni to‘g‘ri joylashtirish sotuvni hech qanday chegirmasiz oshiradi." },
        { t: "ig", k: "shelf" },
        { t: "h", h: "Polka qoidalari" },
        { t: "steps", items: [
          ["Ko‘z darajasi — “oltin polka”", "Eng ko‘p sotiladigan (A guruh) va eng foydali pozitsiyalar xaridor ko‘zi darajasida (taxminan 120–160 sm)."],
          ["Brend bloki", "Bitta brendni bir joyga yig‘ing — vertikal blok uzoqdan ko‘rinadi va brendni kuchli ko‘rsatadi."],
          ["Yuzi oldinga", "Kanistralar yorlig‘i bilan xaridorga qarasin, qatorlar to‘g‘ri tursin."],
          ["Narx tegi", "Har bir pozitsiya ostida aniq narx. Narxsiz mahsulot so‘ralmaydi."],
          ["FIFO", "Avval kelgan — avval sotiladi. Eski partiyalar oldinga, yangilari orqaga."],
          ["Toza va to‘liq", "Chang, bo‘sh joy va yiqilgan kanistralar — sotuv dushmani."]
        ]},
        { t: "call", k: "tip", title: "POS materiallar", h: "<p>Plakat, stiker, voblerlar va moy tanlash jadvali usta va xaridorga yordam beradi. Ruxsat bilan va <b>tartibli</b> joylashtiring — har tashrifda holatini tekshiring.</p>" },
        { t: "cmp",
          bad: ["Yomon polka", "Kanistralar pastki qatorda, aralash, changli, narxsiz, yorlig‘i devorga qaragan."],
          good: ["Yaxshi polka", "Ko‘z darajasida brend bloki, yorliqlar oldinga, narx teglari, FIFO, toza va to‘liq."] },
        { t: "task", title: "Amaliy topshiriq", h: "Bitta mijozingiz polkasini “oldin” va “keyin” suratga oling. Qoidalar bo‘yicha qayta joylashtiring va supervayzerga yuboring." }
      ],
      keys: [
        "Polka — jim sotuvchi: ko‘rinmagan mahsulot sotilmaydi.",
        "Ko‘z darajasi, brend bloki, yuzi oldinga, narx tegi, FIFO, tozalik.",
        "Har tashrifda polkani tekshiring va tartibga keltiring."
      ],
      quiz: [
        { q: "Eng ko‘p sotiladigan pozitsiyalar polkaning qayerida turishi kerak?", o: ["Eng pastki qatorda", "Ko‘z darajasida", "Omborda", "Eshik orqasida"], a: 1, why: "Ko‘z darajasi — “oltin polka”, u eng ko‘p ko‘riladi." },
        { q: "FIFO qoidasi nimani anglatadi?", o: ["Avval kelgan tovar avval sotiladi", "Faqat yangi tovarni sotish", "Narxni har kuni o‘zgartirish", "Tovarni yashirib qo‘yish"], a: 0, why: "First In, First Out — eski partiyalar oldinga qo‘yiladi." },
        { q: "Narx tegi yo‘q mahsulot bilan nima bo‘ladi?", o: ["Tezroq sotiladi", "Kamroq so‘raladi va sotiladi", "Hech narsa o‘zgarmaydi", "Qimmatroq sotiladi"], a: 1, why: "Xaridor narxni so‘rashdan tortinadi — ko‘pincha boshqa mahsulotni oladi." }
      ]
    },
    {
      id: "m5l3", title: "Buyurtma hajmini to‘g‘ri hisoblash", min: 14, video: "",
      blocks: [
        { t: "p", h: "Ortiqcha buyurtma — mijozning puli muzlaydi va keyingi safar u “hali bor” deydi. Kam buyurtma — tovar tugaydi va xaridor raqobatchini oladi. To‘g‘ri hajmni <b>formula</b> bilan hisoblang." },
        { t: "call", k: "rule", title: "Formula", h: "<p><b>Buyurtma = (O‘rtacha haftalik sotuv × Keyingi yetkazishgacha hafta) + Xavfsizlik zaxirasi − Hozirgi qoldiq</b></p><p>Xavfsizlik zaxirasi — odatda bir haftalik sotuvning yarmi.</p>" },
        { t: "ig", k: "order-calc" },
        { t: "h", h: "Misol" },
        { t: "p", h: "Nuqta haftasiga 12 ta X-Force 5W-30 sotadi. Keyingi yetkazish 2 haftadan keyin. Xavfsizlik zaxirasi: 6 ta. Polkada 8 ta qolgan. Buyurtma = 12 × 2 + 6 − 8 = <b>22 ta</b>." },
        { t: "call", k: "tip", title: "Mavsumni hisobga oling", h: "<p>Bahor va kuzda (mavsum almashinuvi) moy almashtirish ko‘payadi. Yozda gazli va taksi mashinalarida almashtirish tezlashadi. Mavsum oldidan zaxirani oshirishni taklif qiling.</p>" },
        { t: "task", title: "Amaliy topshiriq", h: "2 ta mijoz uchun oxirgi 4 haftalik sotuvni aniqlang va kalkulyatordan foydalanib keyingi buyurtmani hisoblang." }
      ],
      keys: [
        "Ortiqcha ham, kam ham buyurtma — yo‘qotish.",
        "Buyurtma = haftalik sotuv × haftalar + zaxira − qoldiq.",
        "Mavsum va mijoz sharoitini hisobga oling."
      ],
      quiz: [
        { q: "Haftalik sotuv 10 ta, yetkazishgacha 2 hafta, zaxira 5 ta, qoldiq 7 ta. Buyurtma qancha?", o: ["10 ta", "18 ta", "25 ta", "32 ta"], a: 1, why: "10 × 2 + 5 − 7 = 18." },
        { q: "Ortiqcha buyurtmaning mijoz uchun xavfi nima?", o: ["Hech qanday xavf yo‘q", "Pul muzlaydi va keyingi buyurtma kechikadi", "Tovar tezroq sotiladi", "Narx tushadi"], a: 1, why: "Mijozning aylanma mablag‘i tovarga “qamaladi”." },
        { q: "Xavfsizlik zaxirasi nima uchun kerak?", o: ["Kutilmagan talab yoki yetkazish kechikishida tovar tugab qolmasligi uchun", "Omborni to‘ldirish uchun", "Rejani sun’iy bajarish uchun", "Kerak emas"], a: 0, why: "Zaxira — talab va yetkazishdagi tebranishlardan himoya." }
      ]
    },
    {
      id: "m5l4", title: "Kross-sotuv, upsell va mijozni o‘stirish", min: 14, video: "",
      blocks: [
        { t: "p", h: "Faqat buyurtma olmang — <b>soting</b>. Bitta mijozdan oborotni oshirishning eng tez yo‘li — chekni kattalashtirish." },
        { t: "ig", k: "cross" },
        { t: "h", h: "Uch usul" },
        { t: "table", head: ["Usul", "Ma’nosi", "Misol"], rows: [
          ["Kross-sotuv", "Asosiy mahsulotga qo‘shimcha", "Motor moyi oladigan STO ga ATF va Syngear 75W-90 ni ham taklif qilish"],
          ["Upsell", "Yuqoriroq darajaga o‘tkazish", "Mineral/yarim sintetik o‘rniga zamonaviy mashinalar uchun HC-sintetik X-Force yoki RED SQ"],
          ["Hajmni oshirish", "Ko‘proq yoki katta qadoq", "Avtopark yoki band STO ga 4–5 L o‘rniga 20 L yoki 208 L bochka"]
        ]},
        { t: "dialog", lines: [
          ["a", "Siz Tracker va Onix larga qaysi moy quyyapsiz?"],
          ["c", "Oddiy 5W-30."],
          ["a", "Bu mashinalarning turbo dvigateli GM dexos1 Gen 3 talab qiladi. X-Force 5W-30 DX1 aynan shu talabga javob beradi va LSPI dan himoya qiladi. Shu mashinalar egalariga “zavod talabiga mos moy” deb taklif qilsangiz, ular rozi bo‘ladi, sizning chekingiz esa oshadi."],
          ["n", "Upsell — qimmatroqni “tiqishtirish” emas. Bu mijozning mashinasiga to‘g‘riroq yechim."]
        ]},
        { t: "h", h: "Mijozni o‘stirish zinapoyasi" },
        { t: "ig", k: "growth-ladder" },
        { t: "call", k: "warn", title: "Halollik", h: "<p>Mijozga keragi bo‘lmagan narsani sotmang. Bir marta aldangan mijoz hech qachon qaytmaydi va boshqalarga ham aytadi.</p>" },
        { t: "task", title: "Amaliy topshiriq", h: "Har bir faol mijozingiz uchun bitta kross-sotuv va bitta upsell imkoniyatini toping. Shu hafta kamida 3 tasini taklif qiling va natijani yozing." }
      ],
      keys: [
        "Kross-sotuv — qo‘shimcha, upsell — yuqoriroq daraja, hajm — kattaroq qadoq.",
        "Upsell — mashinaga to‘g‘riroq yechim, “tiqishtirish” emas.",
        "Mijozni zinapoya bo‘yicha o‘stiring: sinov → doimiy → keng → hamkor."
      ],
      quiz: [
        { q: "Motor moyi oladigan STO ga ATF taklif qilish — bu…", o: ["Upsell", "Kross-sotuv", "Chegirma", "Debitorka"], a: 1, why: "Asosiy mahsulotga boshqa toifadagi qo‘shimcha — kross-sotuv." },
        { q: "Turbo Chevrolet uchun oddiy 5W-30 o‘rniga DX1 (dexos1 Gen 3) taklif qilish — bu…", o: ["Kross-sotuv", "Upsell — to‘g‘riroq va yuqoriroq darajadagi yechim", "Hajmni oshirish", "Xato"], a: 1, why: "Mijozni mashinaga mosroq, yuqoriroq darajadagi mahsulotga o‘tkazish — upsell." },
        { q: "Avtoparkka 20 L kanistra yoki 208 L bochka taklif qilish — bu…", o: ["Hajmni oshirish", "Kross-sotuv", "Merchandising", "FIFO"], a: 0, why: "Katta qadoq — hajmni oshirish usuli." }
      ]
    }
  ]
});
