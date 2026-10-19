/* 8-MODUL — MENTALITET: TOP AGENT */
COURSE.modules.push({
  id: "m8", n: 8, week: 3,
  title: "TOP agent mentaliteti",
  sub: "Formula, 10 qoida, rad javobi bilan ishlash, o‘sish va etika",
  outcomes: [
    "TOP agent formulasini va 10 qoidani bilasiz",
    "Rad javobini statistika sifatida qabul qilasiz",
    "Energiya va o‘z-o‘zini rivojlantirishni boshqarasiz",
    "Kompaniya qadriyatlari va etika chegaralarini bilasiz"
  ],
  lessons: [
    {
      id: "m8l1", title: "TOP agent formulasi va 10 qoida", min: 14, video: "",
      blocks: [
        { t: "p", h: "Natija tasodif emas. U uchta narsaning <b>ko‘paytmasi</b>: bilim, tartib va munosabat. Bittasi nol bo‘lsa — natija ham nol." },
        { t: "ig", k: "formula" },
        { t: "h", h: "TOP agentning 10 qoidasi" },
        { t: "steps", items: [
          ["Mahsulotni 100% bil", "Siz oddiy sotuvchi emas — mutaxassissiz. Mijoz bilimli odamga ishonadi."],
          ["Mijozlaringni yaxshi tani", "Bazang — boyliging. Ism, buyurtma vaqti, muammo — hammasini yozib yur."],
          ["Har kuni reja tuz", "Kimga borasan, kimga qo‘ng‘iroq qilasan, kimga eslatasan."],
          ["Faqat buyurtma olma — SOT", "Kross-sotuv, upsell, katta hajm. Moy + transmissiya = katta chek."],
          ["E’tirozlar bilan ishla", "“Qimmat”, “Keyin”, “O‘ylab ko‘raman” — hammasiga tayyor javob bor."],
          ["Buyurtmalarni nazorat qil", "Yetib bordimi, polkadami, qanday sotilyapti, qachon yana oladi."],
          ["Yangi mijoz izla", "Har hafta kamida 2–3 ta yangi nuqta."],
          ["Eng yaxshilardan o‘rgan", "Qara → Tingla → Yozib ol → Takrorla → Yaxshila → O‘tib ket."],
          ["Raqamlaringni bil", "Oborot, foiz, o‘rtacha chek, qarz — har hafta tekshir."],
          ["O‘zingni kelajak rahbardek tut", "Yordam ber, shikoyat qilma, muammo hal qil. O‘sishni istasang — rahbardek fikrla."]
        ]}
      ],
      keys: [
        "Bilim × Tartib × Munosabat = Natija (bittasi 0 bo‘lsa — hammasi 0).",
        "10 qoida — har kungi ishning chek-listi.",
        "Mutaxassis bo‘ling — mijoz bilimga ishonadi."
      ],
      quiz: [
        { q: "TOP agent formulasida nima uchun ko‘paytirish (×) ishlatilgan?", o: ["Chiroyli ko‘rinishi uchun", "Bitta qism nol bo‘lsa, natija ham nol bo‘ladi", "Qo‘shish qiyin bo‘lgani uchun", "Tasodifan"], a: 1, why: "Masalan, bilim bor, lekin tartib yo‘q — natija bo‘lmaydi." },
        { q: "“Eng yaxshilardan o‘rgan” qoidasidagi birinchi qadam qaysi?", o: ["O‘tib ket", "Qara", "Yaxshila", "Takrorla"], a: 1, why: "Qara → Tingla → Yozib ol → Takrorla → Yaxshila → O‘tib ket." },
        { q: "“Faqat buyurtma olma — SOT” qoidasi nimani anglatadi?", o: ["Mijoz nima desa, shuni yozish", "Kross-sotuv, upsell va hajmni oshirish orqali chekni kattalashtirish", "Narxni tushirish", "Ko‘p gapirish"], a: 1, why: "Faol sotuv — mijozga to‘liq yechim taklif qilish." }
      ]
    },
    {
      id: "m8l2", title: "Rad javobi va psixologik chidamlilik", min: 12, video: "",
      blocks: [
        { t: "p", h: "Savdoda “yo‘q” — kundalik holat. Yangi agentlarning ko‘pchiligi aynan rad javobidan charchab ketadi. TOP agent esa “yo‘q”ni <b>shaxsiy emas, statistik</b> narsa sifatida qabul qiladi." },
        { t: "ig", k: "no-stat" },
        { t: "h", h: "Rad javobidan keyin 4 savol" },
        { t: "ol", items: [
          "Ehtiyojni to‘g‘ri aniqladimmi?",
          "Taklif mijozning turiga va motiviga mos edimi?",
          "E’tirozning asl sababini topdimmi?",
          "Keyingi qadamni belgiladimmi (masalan, 2 haftadan keyin qayta tashrif)?"
        ]},
        { t: "call", k: "ok", title: "Ichki gap", h: "<p>“Bu mijoz menga emas, hozirgi taklifga ‘yo‘q’ dedi. Har bir ‘yo‘q’ meni keyingi ‘ha’ga yaqinlashtiradi.”</p>" },
        { t: "h", h: "Energiyani saqlash" },
        { t: "ul", items: [
          "Kunni eng qiyin (yoki eng muhim) tashrif bilan boshlang — ertalab energiya ko‘p.",
          "Har bir muvaffaqiyatni, hatto kichigini ham, belgilab boring.",
          "Rad javobidan keyin darhol keyingi nuqtaga — “yarani yalashga” vaqt bermang.",
          "Uyqu, ovqat va harakat — sotuvchi uchun ham ish quroli."
        ]}
      ],
      keys: [
        "“Yo‘q” — shaxsiy emas, statistik.",
        "Har raddan keyin 4 savol bilan tahlil qiling.",
        "Energiya — resurs: uni rejalang va saqlang."
      ],
      quiz: [
        { q: "TOP agent rad javobini qanday qabul qiladi?", o: ["Shaxsiy haqorat sifatida", "Statistikaning bir qismi va tahlil uchun signal sifatida", "Ishni tashlash sababi sifatida", "Mijozga g‘azab bilan"], a: 1, why: "Rad — natijaga olib boradigan jarayonning tabiiy qismi." },
        { q: "Rad javobidan keyin birinchi nima qilish kerak?", o: ["Uyga ketish", "Qisqa tahlil (4 savol) va darhol keyingi nuqtaga borish", "Mijoz haqida yomon gapirish", "Kunni tugatish"], a: 1, why: "Tahlil — o‘sish, harakat — energiyani saqlash." },
        { q: "Kunni qaysi tashrif bilan boshlash tavsiya etiladi?", o: ["Eng oson", "Eng qiyin yoki eng muhim", "Hech qanday", "Eng uzoq"], a: 1, why: "Ertalab energiya va diqqat eng yuqori bo‘ladi." }
      ]
    },
    {
      id: "m8l3", title: "O‘z-o‘zini rivojlantirish va mentorlik", min: 10, video: "",
      blocks: [
        { t: "p", h: "Bilim eskiradi: yangi mashinalar, yangi standartlar (API SQ, GF-7), yangi raqobatchilar. TOP agent har kuni ozgina o‘rganadi." },
        { t: "table", head: ["Odat", "Qancha", "Natija"], rows: [
          ["Akademiya darslarini takrorlash", "Kuniga 20 daqiqa", "Bilim yangilanib turadi"],
          ["Skriptlar va trenajor", "Haftasiga 2–3 marta", "E’tirozlarga avtomatik javob"],
          ["Kuchli agent bilan birga tashrif", "Oyiga 1–2 marta", "Real tajriba, yangi usullar"],
          ["Supervayzer bilan tahlil", "Haftasiga 1 marta", "Xatolar tez tuzatiladi"],
          ["Bozor kuzatuvi", "Har tashrifda", "Raqobatchi narx va yangiliklar haqida ma’lumot"]
        ]},
        { t: "call", k: "tip", title: "Mentor", h: "<p>Har bir yangi agentning birinchi oyda mentori bo‘ladi. Undan uyalmay so‘rang — eng tez o‘sish yo‘li <b>boshqalarning tajribasidan</b> o‘rganish.</p>" },
        { t: "task", title: "Amaliy topshiriq", h: "Kuchli agent yoki supervayzer bilan bitta to‘liq kun birga ishlang. Uning 5 ta usulini yozib oling va ertasi kuni o‘zingiz qo‘llang." }
      ],
      keys: [
        "Kuniga 20 daqiqa o‘qish — bilim doim yangi.",
        "Kuchli agent bilan birga tashrif — eng tez o‘qish.",
        "Mentordan so‘rashdan uyalmang."
      ],
      quiz: [
        { q: "Akademiya darslarini qancha vaqt takrorlash tavsiya etiladi?", o: ["Yilda bir marta", "Kuniga 20 daqiqa", "Hech qachon", "Faqat imtihondan oldin"], a: 1, why: "Kichik, lekin muntazam o‘qish eng samarali." },
        { q: "Eng tez o‘sish yo‘li qaysi?", o: ["Hamma narsani yolg‘iz o‘rganish", "Kuchli agentlar va mentor tajribasidan o‘rganish", "Faqat kitob o‘qish", "Xatolarni yashirish"], a: 1, why: "Birovning tajribasi sizni yillab xatodan saqlaydi." },
        { q: "Bozor kuzatuvi qachon qilinadi?", o: ["Har tashrifda", "Faqat yil oxirida", "Faqat rahbar so‘rasa", "Kerak emas"], a: 0, why: "Har bir nuqta — bozor haqida yangi ma’lumot manbai." }
      ]
    },
    {
      id: "m8l4", title: "Karyera, qadriyatlar va etika", min: 12, video: "",
      blocks: [
        { t: "p", h: "MITAL da o‘sish natijaga bog‘liq. Lekin natija <b>halol yo‘l</b> bilan bo‘lishi shart. Qisqa muddatli yolg‘on sotuv uzoq muddatli mijozni o‘ldiradi." },
        { t: "ig", k: "career" },
        { t: "h", h: "Bizning qadriyatlar" },
        { t: "ul", items: [
          "<b>Halollik:</b> mahsulot, kelib chiqishi va shartlar haqida faqat haqiqat.",
          "<b>Mas’uliyat:</b> va’da berdingizmi — bajaring. Bajara olmasangiz — oldindan ayting.",
          "<b>Mijozga foyda:</b> mijozning biznesi o‘ssa — biz ham o‘samiz.",
          "<b>Jamoa:</b> yordam bering, tajriba bilan bo‘lishing, shikoyat emas — yechim olib keling."
        ]},
        { t: "h", h: "Qizil chiziqlar — hech qachon mumkin emas" },
        { t: "cmp",
          bad: ["Mumkin emas", "Mahsulot haqida yolg‘on (masalan, “hammasi nemis”), bajarib bo‘lmaydigan va’da, raqobatchini qoralash, kompaniya pulini yoki tovarini shaxsiy maqsadda ishlatish, qarzni yashirish."],
          good: ["To‘g‘ri yo‘l", "Faktlar bilan solishtirish, aniq va bajariladigan shartlar, muammoni darhol supervayzerga aytish, har bir pul va tovar harakatini hujjatlashtirish."] },
        { t: "call", k: "rule", title: "Yakuniy xulosa", h: "<p>Siz kompaniyaning yuzisiz. Mijoz sizga ishonsa — u MITAL ga ishonadi. <b>Ishonch — eng qimmat mahsulotimiz.</b></p>" },
        { t: "p", h: "Tabriklaymiz! Barcha modullarni tugatgandan so‘ng <b>yakuniy imtihon</b> ochiladi. Muvaffaqiyatli topshirsangiz — MITAL agenti sertifikatini olasiz." }
      ],
      keys: [
        "O‘sish natijaga bog‘liq, natija — halol yo‘l bilan.",
        "Qadriyatlar: halollik, mas’uliyat, mijozga foyda, jamoa.",
        "Ishonch — eng qimmat mahsulotimiz."
      ],
      quiz: [
        { q: "Qaysi harakat “qizil chiziq”?", o: ["Faktlar bilan solishtirish", "Mijozga “hammasi nemis” deb yolg‘on gapirish", "Muammoni supervayzerga aytish", "Har bir to‘lovni hujjatlashtirish"], a: 1, why: "Mahsulot haqida yolg‘on — ishonchni yo‘q qiladi." },
        { q: "Va’dani bajara olmasangiz nima qilish kerak?", o: ["Indamay qolish", "Oldindan mijozga aytib, yangi aniq muddat kelishish", "Mijozni ayblash", "Telefonni o‘chirish"], a: 1, why: "Mas’uliyat — muammoni oldindan va ochiq hal qilish." },
        { q: "MITAL da karyera o‘sishi nimaga bog‘liq?", o: ["Tanishlarga", "Natija va halol ishga", "Ish stajiga, natijadan qat’i nazar", "Omadga"], a: 1, why: "Masalan: 6 oy davomida 100% reja — keyingi bosqich imkoniyati." }
      ]
    }
  ]
});
