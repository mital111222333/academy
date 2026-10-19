/* 2-MODUL — MOTOR MOY TEXNIKASI */
COURSE.modules.push({
  id: "m2", n: 2, week: 1,
  title: "Motor moy texnikasi",
  sub: "Tarkib, SAE, API/ACEA, dopusklar, transmissiya va to‘g‘ri tanlash",
  outcomes: [
    "Moyning 6 vazifasini va tarkibini oddiy tilda tushuntira olasiz",
    "Mineral, yarim sintetik, HC-sintetik va PAO farqini bilasiz",
    "“5W-30” kabi belgini to‘liq o‘qiy olasiz",
    "API, ILSAC, ACEA va OEM dopusklarini ajrata olasiz",
    "Har qanday mashinaga moyni 4 qadamda to‘g‘ri tanlaysiz"
  ],
  lessons: [
    /* ---------------------------------------------------- */
    {
      id: "m2l1", title: "Moy nima qiladi va nimadan iborat", min: 12, video: "",
      blocks: [
        { t: "p", h: "Motor moyi — dvigatelning “qoni”. U faqat moylamaydi: dvigatelni sovutadi, tozalaydi va himoya qiladi. Mijozga buni tushuntira olgan agent — <b>mutaxassis</b> sifatida qabul qilinadi." },
        { t: "ig", k: "oil-jobs" },
        { t: "h", h: "Moy tarkibi" },
        { t: "p", h: "Har qanday motor moyi ikki qismdan iborat: <b>baza moy</b> (asos) va <b>qo‘shimchalar paketi</b> (присадки). Baza — moyning “tanasi”, qo‘shimchalar — uning “aqli”." },
        { t: "ig", k: "composition" },
        { t: "table", head: ["Qo‘shimcha", "Vazifasi"], rows: [
          ["Detergentlar (yuvuvchi)", "Porshen va halqalarda kuyindi (nagar) hosil bo‘lishiga yo‘l qo‘ymaydi"],
          ["Dispersantlar", "Kir va qurumni mayda holda ushlab, filtrga olib boradi"],
          ["Yeyilishga qarshi (anti-wear)", "Metall yuzalarda himoya qatlami hosil qiladi"],
          ["Antioksidantlar", "Moyning yuqori haroratda eskirishini sekinlashtiradi"],
          ["Yopishqoqlik modifikatorlari", "Moyni issiqda “suyulib” ketishdan saqlaydi"],
          ["Ishqalanish modifikatorlari", "Ishqalanishni kamaytirib, yoqilg‘ini tejaydi"],
          ["Ko‘pikka qarshi", "Havo pufakchalari moy plyonkasini buzishiga yo‘l qo‘ymaydi"]
        ]},
        { t: "call", k: "tip", title: "Mijozga oddiy misol", h: "<p>“Arzon moyda qo‘shimchalar kam yoki sifatsiz — u 2–3 ming km da o‘z xususiyatini yo‘qotadi. Sifatli moyda qo‘shimchalar butun almashtirish oralig‘i davomida ishlaydi.”</p>" },
        { t: "task", title: "Amaliy topshiriq", h: "STO ustasidan eski (ishlatilgan) moy va yangi moyni ko‘rsatishini so‘rang. Rangi, hidi va suyuqligini solishtiring. Ustaning fikrini yozib oling." }
      ],
      keys: [
        "Moyning 6 vazifasi: moylash, sovutish, tozalash, himoya, germetiklash, tejash.",
        "Tarkib: baza moy (~70–90%) + qo‘shimchalar paketi (~10–30%).",
        "Moy sifatini asosan qo‘shimchalar paketi va baza moy sifati belgilaydi."
      ],
      quiz: [
        { q: "Motor moyining vazifasiga qaysi biri KIRMAYDI?", o: ["Dvigatelni sovutish", "Detallarni tozalash", "Yoqilg‘i oktan sonini oshirish", "Korroziyadan himoya"], a: 2, why: "Oktan soni — yoqilg‘ining xususiyati, moyga bog‘liq emas." },
        { q: "Dispersant qo‘shimchalar nima qiladi?", o: ["Moyni bo‘yaydi", "Kir va qurumni mayda holda ushlab, filtrga olib boradi", "Moyni quyuqlashtiradi", "Yoqilg‘ini tozalaydi"], a: 1, why: "Dispersantlar ifloslikni muallaq holda ushlab turadi, u cho‘kma bo‘lib qolmaydi." },
        { q: "Moyning “aqli” deb nimani aytdik?", o: ["Baza moyni", "Qo‘shimchalar paketini", "Kanistrani", "Filtrni"], a: 1, why: "Qo‘shimchalar moyga yuvish, himoya va barqarorlik xususiyatlarini beradi." }
      ]
    },
    /* ---------------------------------------------------- */
    {
      id: "m2l2", title: "Baza moylar: mineral, yarim sintetik, HC-sintetik, PAO", min: 12, video: "",
      blocks: [
        { t: "p", h: "API (Amerika Neft Instituti) baza moylarni 5 guruhga bo‘ladi. Agent uchun eng muhimi — guruh qanchalik yuqori bo‘lsa, moy shunchalik <b>barqaror, toza va uzoq xizmat qiladi</b>." },
        { t: "ig", k: "basestock" },
        { t: "h", h: "“HC-sintetik” nima?" },
        { t: "p", h: "HC (HydroCracking) — neftni yuqori bosim va vodorod bilan chuqur qayta ishlash texnologiyasi. Natijada <b>III guruh</b> baza moyi olinadi: u mineraldan ancha toza va barqaror, xususiyatlari bo‘yicha sintetikaga yaqin. MITANOL X-Force va S-Force liniyalarining aksariyati — <b>HC-sintetik</b>." },
        { t: "cmp",
          bad: ["Noto‘g‘ri tushuntirish", "“HC-sintetik — bu soxta sintetika, shunchaki mineral.”"],
          good: ["To‘g‘ri tushuntirish", "“HC-sintetik — chuqur tozalangan III guruh baza moyi. Issiqqa va eskirishga chidamli, zamonaviy dvigatellar uchun ishlab chiqarilgan.”"] },
        { t: "table", head: ["Tur", "Baza", "Qachon taklif qilamiz"], rows: [
          ["Mineral", "I–II guruh", "Eski, oddiy dvigatellar; arzon variant so‘ralganda (portfelimizda asosiy yo‘nalish emas)"],
          ["Yarim sintetik", "Mineral + sintetik aralashma", "O‘rta yoshdagi va katta yurgan mashinalar, 10W-40 (M-Force, S-Force 10W-40, Liman 10W-40)"],
          ["HC-sintetik", "III guruh", "Zamonaviy yengil avtomobillar, turbo dvigatellar, uzaytirilgan oraliq"],
          ["To‘liq sintetik (PAO va b.)", "IV–V guruh", "Eng yuqori yuklamalar va haroratlar, sport va premium texnika"]
        ]},
        { t: "call", k: "rule", title: "Qoida", h: "<p>Mijozga “sintetik yaxshi, mineral yomon” demang. To‘g‘ri gap: <b>har bir dvigatelga o‘z moyi</b>. Mashinaning yoshi, yurishi va ishlab chiqaruvchi talabiga qarab tanlanadi.</p>" }
      ],
      keys: [
        "Baza moy guruhlari: I–II mineral, III HC-sintetik, IV PAO, V boshqa sintetikalar.",
        "HC-sintetik — chuqur tozalangan III guruh, xususiyatlari sintetikaga yaqin.",
        "Har bir dvigatelga o‘z moyi: yosh, yurish va ishlab chiqaruvchi talabi."
      ],
      quiz: [
        { q: "HC-sintetik moy qaysi baza guruhiga tegishli?", o: ["I guruh", "III guruh", "IV guruh", "Guruhga kirmaydi"], a: 1, why: "Gidrokreking (HC) texnologiyasi III guruh baza moyini beradi." },
        { q: "Yarim sintetik moy nima?", o: ["Faqat PAO", "Mineral va sintetik baza aralashmasi", "Ishlatilgan moy", "Faqat transmissiya moyi"], a: 1, why: "Yarim sintetik — mineral va sintetik komponentlar aralashmasi." },
        { q: "Mijoz: “HC-sintetik soxta sintetika emasmi?” Eng yaxshi javob qaysi?", o: ["Ha, soxta", "Bilmayman", "Bu chuqur tozalangan III guruh baza moyi: issiq va eskirishga chidamli, zamonaviy dvigatellar uchun", "Farqi yo‘q, hammasi bir xil"], a: 2, why: "Halol va texnik jihatdan to‘g‘ri tushuntirish ishonch beradi." }
      ]
    },
    /* ---------------------------------------------------- */
    {
      id: "m2l3", title: "SAE yopishqoqlik: “5W-30” ni o‘qishni o‘rganamiz", min: 14, video: "",
      blocks: [
        { t: "p", h: "SAE belgisi — moyning <b>yopishqoqligi</b> (quyuqligi) haqida. U ikki raqamdan iborat. Quyidagi dekoderda har bir qismini bosing:" },
        { t: "ig", k: "sae" },
        { t: "h", h: "Qisqa qoida" },
        { t: "ul", items: [
          "<b>W dan oldingi raqam</b> (0, 5, 10, 15) — qishki ko‘rsatkich. Qanchalik kichik bo‘lsa, sovuqda moy shunchalik tez dvigatel bo‘ylab tarqaladi.",
          "<b>W</b> — “Winter” (qish). “Weight” emas!",
          "<b>Chiziqdan keyingi raqam</b> (20, 30, 40, 60) — ish haroratidagi (100 °C) yopishqoqlik. Qanchalik katta bo‘lsa, moy plyonkasi issiqda shunchalik qalin.",
          "Ishga tushirishdagi yeyilishning katta qismi aynan <b>sovuq start</b> paytida bo‘ladi — shuning uchun qishki raqam muhim."
        ]},
        { t: "call", k: "warn", title: "Xavfli maslahat", h: "<p>“Eski mashinaga qalinroq moy quying, yaxshi bo‘ladi” — har doim ham to‘g‘ri emas. Ishlab chiqaruvchi tavsiya qilgan yopishqoqlikdan <b>keskin chetga chiqish</b> zamonaviy dvigatellarga zarar beradi. Avval qo‘llanmaga qarang.</p>" },
        { t: "h", h: "O‘zbekiston iqlimi uchun" },
        { t: "p", h: "Qishda −10…−15 °C, yozda +40 °C dan yuqori. Bu harorat oralig‘ida 0W, 5W, 10W qishki ko‘rsatkichli moylar ishonchli ishlaydi. Yozgi raqam esa dvigatel turiga bog‘liq: zamonaviy dvigatellar uchun 20/30, katta yurgan yoki og‘ir ish sharoitidagi mashinalar uchun ko‘pincha 40." }
      ],
      keys: [
        "W — qish. Birinchi raqam — sovuqdagi xususiyat, ikkinchisi — issiqdagi.",
        "Kichik qishki raqam = yengil sovuq start = kamroq yeyilish.",
        "Yopishqoqlik — avvalo ishlab chiqaruvchi talabi, keyin iqlim va holat."
      ],
      quiz: [
        { q: "“5W-30” da “W” harfi nimani bildiradi?", o: ["Weight — og‘irlik", "Winter — qish", "Water — suv", "Wear — yeyilish"], a: 1, why: "W — Winter: qishki (sovuq) xususiyatlarni ko‘rsatadi." },
        { q: "Qaysi moy sovuqda tezroq dvigatel bo‘ylab tarqaladi?", o: ["15W-40", "10W-40", "5W-30", "0W-20"], a: 3, why: "Qishki raqam qanchalik kichik bo‘lsa, sovuq start shunchalik yengil." },
        { q: "“5W-30” va “5W-40” ning farqi nimada?", o: ["Sovuqdagi xususiyatda", "Ish haroratidagi (issiqdagi) yopishqoqlikda", "Rangida", "Farqi yo‘q"], a: 1, why: "Qishki qismi bir xil (5W), 40 issiqda qalinroq plyonka beradi." }
      ]
    },
    /* ---------------------------------------------------- */
    {
      id: "m2l4", title: "Standartlar: API, ILSAC, ACEA va OEM dopusklar", min: 16, video: "",
      blocks: [
        { t: "p", h: "SAE moyning quyuqligini aytadi, <b>standartlar esa sifatini</b>. Kanistradagi “API SP”, “ACEA A3/B4”, “MB 229.3” kabi yozuvlar — moy qanday sinovlardan o‘tganini ko‘rsatadi." },
        { t: "h", h: "API — benzin (S) va dizel (C)" },
        { t: "p", h: "API sinfidagi birinchi harf: <b>S</b> — benzin (Service), <b>C</b> — dizel (Commercial). Ikkinchi harf alifbo bo‘yicha qanchalik oldinda bo‘lsa, standart shunchalik yangi va qat’iy. Yangi standart odatda eskilarining o‘rnini bosadi." },
        { t: "ig", k: "api-ladder" },
        { t: "call", k: "tip", title: "Kuchli argument: LSPI", h: "<p>Zamonaviy turbo va to‘g‘ridan-to‘g‘ri purkashli (GDI) dvigatellarda past aylanishda “muddatidan oldin alangalanish” (<b>LSPI</b>) xavfi bor — bu porshenni sindirishi mumkin. API SN Plus, SP va SQ moylar aynan shundan himoya qiladi. <b>X-Force 5W-30 DX1</b> va <b>Golden Booster RED SQ</b> — shunday moylar.</p>" },
        { t: "h", h: "ILSAC — yoqilg‘i tejamkorligi" },
        { t: "p", h: "ILSAC (GF-5, GF-6A, GF-7A) — asosan Yaponiya, Koreya va Amerika benzinli avtomobillari uchun, yoqilg‘i tejamkorligiga urg‘u beradi. Odatda past yopishqoqlikdagi moylarga (0W-20, 5W-30) beriladi." },
        { t: "h", h: "ACEA — Yevropa standarti" },
        { t: "ig", k: "acea" },
        { t: "h", h: "OEM dopusklar (avtoishlab chiqaruvchi talablari)" },
        { t: "p", h: "Eng yuqori daraja — avtozavodning o‘z talabi: <b>MB 229.3 / 229.5 / 229.51</b> (Mercedes), <b>VW 502 00 / 505 00 / 505 01</b>, <b>BMW Longlife-01 / LL-04</b>, <b>GM dexos1 Gen 3</b>. Agar mashina qo‘llanmasida shunday talab yozilgan bo‘lsa, shu talabga mos moy tanlanadi." },
        { t: "call", k: "rule", title: "Halollik qoidasi", h: "<p>Kanistradagi ro‘yxatda ikki xil yozuv bo‘lishi mumkin: <b>“rasmiy dopusk” (approved)</b> va <b>“talabga javob beradi / tavsiya etiladi” (meets / recommended)</b>. Bularni farqlang va mijozga aniq ayting. Bilmagan narsangizni va’da qilmang.</p>" },
        { t: "task", title: "Amaliy topshiriq", h: "Katalogdan 5 ta moyni tanlab, har biri uchun yozing: API, ILSAC (bo‘lsa), ACEA va kamida 2 ta OEM tavsiyasi. Qaysi mashinalarga mos kelishini xulosa qiling." }
      ],
      keys: [
        "API: S — benzin, C — dizel; harf qanchalik oldinda — standart shunchalik yangi (SQ, CK-4).",
        "ACEA: A/B — oddiy, C — sajevoy filtrli (low SAPS), E — yuk texnikasi.",
        "OEM dopusk — eng yuqori daraja; “approved” va “meets” ni farqlang."
      ],
      quiz: [
        { q: "API sinflaridan qaysi biri eng yangi benzin standarti?", o: ["API SL", "API SN", "API SP", "API SQ"], a: 3, why: "API SQ — 2025-yilda kiritilgan eng yangi benzin standarti." },
        { q: "Sajevoy filtri (DPF) bor dizel avtomobilga qaysi ACEA sinfi mos keladi?", o: ["A3/B4", "C3", "E7", "Farqi yo‘q"], a: 1, why: "C sinflari — kul, fosfor va oltingugurti kam (low SAPS), DPF va katalizatorni himoya qiladi." },
        { q: "LSPI himoyasi qaysi dvigatellar uchun eng muhim?", o: ["Eski karbyuratorli", "Zamonaviy turbo va GDI (to‘g‘ridan-to‘g‘ri purkash) dvigatellar", "Elektromobillar", "Mototsikllar"], a: 1, why: "LSPI aynan kichik hajmli turbo GDI dvigatellarga xos xavf." }
      ]
    },
    /* ---------------------------------------------------- */
    {
      id: "m2l5", title: "Transmissiya moylari: ATF, CVT, DCT va mexanik quti", min: 12, video: "",
      blocks: [
        { t: "p", h: "Transmissiya moyi — alohida dunyo. Bu yerda xato motor moyidagidan ham qimmatga tushadi: noto‘g‘ri suyuqlik avtomat qutini bir necha oyda ishdan chiqarishi mumkin." },
        { t: "ig", k: "trans" },
        { t: "call", k: "warn", title: "Qat’iy qoida", h: "<p>ATF, CVT va DCT suyuqliklarini <b>hech qachon</b> bir-biri bilan almashtirmang va aralashtirmang. Har bir qutining ishqalanish xususiyatlari boshqacha. Shubha bo‘lsa — mashina qo‘llanmasi yoki dilerdan tekshiring.</p>" },
        { t: "table", head: ["Quti turi", "Bizning mahsulot", "E’tibor bering"], rows: [
          ["Klassik avtomat (AKPP)", "MITANOL ATF Dexron VI, Liman ATF Dexron VI, Golden Booster ATF Multi LV", "Dexron VI — Dexron III ning o‘rnini bosadi; Toyota WS, Hyundai SP-IV kabi talablar ro‘yxatini tekshiring"],
          ["Variator (CVT)", "MITANOL ATF CVT", "Gibrid CVT (Honda/Ford), DCT va oddiy avtomatga mos emas"],
          ["Robot, ho‘l ikki muftali (DCT/DSG)", "MITANOL ATF DCT", "Quruq muftali DSG (0AM va b.) uchun emas"],
          ["Mexanik quti va ko‘priklar", "MITANOL Syngear 75W-90", "GL-4/GL-5, MT-1 — sinxronizatorli quti va gipoid ko‘priklar"]
        ]},
        { t: "p", h: "<b>GL-4 va GL-5</b> farqi: GL-5 ko‘priklarning gipoid uzatmalari uchun kuchli bosimga qarshi qo‘shimchalarga ega. Ba’zi eski mexanik qutilar faqat GL-4 talab qiladi. Syngear 75W-90 ikkala talabga ham javob beradi." }
      ],
      keys: [
        "ATF, CVT, DCT — uch xil suyuqlik, ularni almashtirib bo‘lmaydi.",
        "Mexanik quti va ko‘priklar uchun — GL-4/GL-5 (Syngear 75W-90).",
        "Transmissiyada har doim qo‘llanma talabini tekshiring."
      ],
      quiz: [
        { q: "Variatorli (CVT) avtomobilga qaysi suyuqlik kerak?", o: ["ATF Dexron VI", "ATF CVT", "ATF DCT", "Syngear 75W-90"], a: 1, why: "CVT ning metall kamari/zanjiri uchun maxsus ishqalanish xususiyatli suyuqlik kerak." },
        { q: "MITANOL ATF DCT qaysi qutilar uchun MOS EMAS?", o: ["Ho‘l ikki muftali DCT", "Quruq muftali DSG (0AM, 02M va b.)", "BMW DCT", "Hyundai DCT"], a: 1, why: "Ishlab chiqaruvchi quruq muftali DSG qutilari uchun mo‘ljallanmaganini ko‘rsatgan." },
        { q: "Mijoz: “Avtomatimga CVT moyi quysam bo‘ladimi, bir xil-ku?” To‘g‘ri javob:", o: ["Ha, farqi yo‘q", "Yo‘q: avtomat (AKPP), CVT va DCT — har xil suyuqliklar. Qutingiz turiga mosini tanlaymiz", "Faqat yozda", "Faqat yarmini quysa bo‘ladi"], a: 1, why: "Har bir quti turining o‘z suyuqligi bor, almashtirish qutini buzadi." }
      ]
    },
    /* ---------------------------------------------------- */
    {
      id: "m2l6", title: "Moyni to‘g‘ri tanlash: 4 qadamli algoritm", min: 14, video: "",
      blocks: [
        { t: "p", h: "Endi barcha bilimlarni bitta tizimga yig‘amiz. TOP agent “Qaysi moy yaxshi?” degan savolga taxmin bilan emas, <b>algoritm</b> bilan javob beradi." },
        { t: "ig", k: "select-algo" },
        { t: "steps", items: [
          ["Mashina va dvigatelni aniqlang", "Marka, model, yil, dvigatel (benzin/dizel/gaz, turbo bormi), yurish (probeg)."],
          ["Ishlab chiqaruvchi talabini toping", "Qo‘llanmadagi dopusk va yopishqoqlik: masalan, GM dexos1, VW 502 00, 5W-30."],
          ["Mos standartdagi moyni tanlang", "Talabga javob beradigan va API/ACEA bo‘yicha yetarli darajadagi mahsulot."],
          ["Sharoitni hisobga oling", "Gaz, taksi, issiq iqlim, chang → almashtirish oralig‘ini qisqartirish, kerak bo‘lsa barqarorroq moy."]
        ]},
        { t: "h", h: "Tez yo‘naltiruvchi (O‘zbekiston bozori)" },
        { t: "table", head: ["Holat", "Birinchi taklif", "Muqobil"], rows: [
          ["Yangi turbo GM/Chevrolet (Tracker, Onix, Malibu)", "MITANOL X-Force 5W-30 DX1 (dexos1 Gen 3)", "Golden Booster RED 5W-30 SQ"],
          ["Koreya/Xitoy zamonaviy benzin (Kia, Hyundai, BYD, Chery)", "Golden Booster RED 5W-30 SQ", "X-Force 5W-30 DX1"],
          ["0W-20 talab qilinadigan yaponcha/koreyscha", "MITANOL X-Force 0W-20 Advance", "—"],
          ["Yevropa avtomobillari (MB, VW, BMW), benzin/dizel DPF siz", "MITANOL X-Force 5W-40 Advance", "Golden Booster RED 5W-30 SQ"],
          ["Yevropa dizel DPF bilan (low SAPS)", "Liman Oil 5W-30 (MB 229.51/229.52, BMW LL-04)", "—"],
          ["Cobalt, Nexia, Gentra, Lacetti — o‘rta yurish", "S-Force 5W-30 Classic yoki Liman 5W-30", "Golden Booster PURPLE 5W-30 SN"],
          ["Katta yurgan (150 000 km+) yoki Damas", "M-Force 10W-40 Advance / S-Force 10W-40", "Liman 10W-40, PURPLE 10W-40 SN"],
          ["Yuk mashinasi Euro V–VI, DPF/SCR", "Turbo 10W-40 Advance LA yoki Turbo 15W-40 Advance LA", "—"],
          ["Eski yuk texnikasi (Euro II–III), aralash park", "Turbo 15W-40 Classic / Turbo 10W-40 Advance", "—"]
        ]},
        { t: "call", k: "warn", title: "Muhim", h: "<p>Bu jadval — yo‘naltiruvchi, qonun emas. Yakuniy qaror <b>mashina qo‘llanmasidagi talab</b> asosida qilinadi. Katalogdagi “Moy tanlash” vositasidan ham foydalaning.</p>" },
        { t: "task", title: "Amaliy topshiriq", h: "Tanishlaringizning 5 ta mashinasi uchun algoritm bo‘yicha moy tanlang (marka, dvigatel, yurish → talab → mahsulot). Natijani supervayzer bilan tekshiring." }
      ],
      keys: [
        "4 qadam: mashina → ishlab chiqaruvchi talabi → mos standart → sharoit.",
        "GM turbo → DX1 (dexos1 Gen 3); Koreya/Xitoy zamonaviy → RED SQ.",
        "Yakuniy qaror — har doim qo‘llanmadagi talab asosida."
      ],
      quiz: [
        { q: "Moy tanlashning BIRINCHI qadami qaysi?", o: ["Eng qimmatini taklif qilish", "Mashina va dvigatelni aniqlash", "Mijozdan budjetni so‘rash", "Raqobatchi narxini bilish"], a: 1, why: "Avval mashina, dvigatel va yurishni bilmasdan to‘g‘ri tanlab bo‘lmaydi." },
        { q: "Yangi Chevrolet Tracker (turbo) uchun birinchi taklif qaysi?", o: ["Turbo 15W-40 Classic", "X-Force 5W-30 DX1 (GM dexos1 Gen 3)", "Syngear 75W-90", "ATF CVT"], a: 1, why: "DX1 aynan GM dexos1 Gen 3 talabiga javob beradi va LSPI dan himoya qiladi." },
        { q: "Sajevoy filtrli (DPF) Yevropa dizel avtomobiliga qaysi moy mosroq?", o: ["Liman Oil 5W-30 (MB 229.51/229.52, LL-04)", "X-Force 10W-60", "M-Force 10W-40", "Turbo 15W-40 Classic"], a: 0, why: "MB 229.51/229.52 va BMW LL-04 — low SAPS talablari, DPF ni himoya qiladi." }
      ]
    }
  ]
});
