/* 1-MODUL — MITAL VA BOZOR */
COURSE.modules.push({
  id: "m1", n: 1, week: 1,
  title: "MITAL va bozor",
  sub: "Kompaniya, brendlar portfeli va agentning o‘rni",
  outcomes: [
    "MITAL kim ekanini va qaysi brendlarni sotishini 1 daqiqada tushuntira olasiz",
    "MITANOL, Golden Booster va Liman Oil farqini bilasiz",
    "O‘zbekiston moy bozori va asosiy savdo kanallarini tushunasiz",
    "Agentning kunlik me’yori va KPI larini bilasiz"
  ],
  lessons: [
    /* ---------------------------------------------------- */
    {
      id: "m1l1", title: "MITAL kim va biz nima qilamiz", min: 10, video: "",
      blocks: [
        { t: "p", h: "MITAL — <b>moylash materiallari distribyutori</b>. Biz zavodlardan sifatli motor va transmissiya moylarini olib kelamiz va ularni O‘zbekiston bo‘ylab STO, moy almashtirish shoxobchalari, avtodo‘konlar va avtoparklarga yetkazib beramiz." },
        { t: "p", h: "Distribyutor — bu oddiy “sotuvchi” emas. Biz zavod va oxirgi iste’molchi (haydovchi) o‘rtasidagi <em>ko‘prik</em>miz: mahsulotni omborda saqlaymiz, nuqtalarga yetkazamiz, ularni o‘qitamiz, to‘lovni nazorat qilamiz va talabni o‘stiramiz." },
        { t: "ig", k: "chain" },
        { t: "h", h: "Agent — kompaniyaning yuzi" },
        { t: "p", h: "Mijoz MITAL ni ko‘pincha <b>siz orqali</b> taniydi. Siz qanday kiyingansiz, qanday gapirasiz, va’dangizni bajarasizmi — mijoz uchun bu butun kompaniya haqidagi fikr." },
        { t: "ul", items: [
          "<b>Sotuv:</b> yangi nuqtalarni ochish va mavjudlarida buyurtmani o‘stirish.",
          "<b>Maslahat:</b> mijozga to‘g‘ri moyni tanlashda yordam berish.",
          "<b>Nazorat:</b> to‘lov muddatlari, qoldiqlar va polkadagi mahsulot.",
          "<b>Axborot:</b> bozor, raqobatchilar va mijoz fikrini kompaniyaga yetkazish."
        ]},
        { t: "call", k: "rule", title: "Asosiy qoida", h: "<p>Biz mijozga moy emas, <b>foyda</b> sotamiz: sifatli mahsulot → qaytib keladigan xaridor → nuqtaning barqaror daromadi.</p>" },
        { t: "h", h: "1 daqiqalik taqdimot (elevator pitch)" },
        { t: "p", h: "Har bir agent kompaniyani qisqa va ishonchli tanishtira olishi kerak. Shu matnni yod oling va o‘zingizga moslang:" },
        { t: "dialog", lines: [
          ["a", "Assalomu alaykum! Men ___, MITAL kompaniyasidanman. Biz motor va transmissiya moylari distribyutorimiz: Germaniyaning MITANOL, Koreyaning Golden Booster va Turkiyaning Liman Oil brendlari. Sizga mijozlaringiz qaytib keladigan sifatli moy va o‘z vaqtida yetkazib berishni taklif qilaman."],
          ["n", "15 soniya — kim, nima, mijozga qanday foyda. Keyin darhol savol bering: “Hozir qaysi moylar ko‘proq ketyapti?”"]
        ]},
        { t: "task", title: "Amaliy topshiriq", h: "1 daqiqalik taqdimotni ovoz chiqarib 5 marta ayting va telefoningizga yozib oling. Eng yaxshisini supervayzerga yuboring." }
      ],
      keys: [
        "MITAL — distribyutor: zavod va haydovchi orasidagi ko‘prik.",
        "Agentning 4 vazifasi: sotuv, maslahat, nazorat, axborot.",
        "Biz moy emas, nuqtaning barqaror foydasini sotamiz."
      ],
      quiz: [
        { q: "MITAL kompaniyasining bozordagi asosiy roli qanday?", o: ["Moy ishlab chiqaruvchi zavod", "Moylash materiallari distribyutori", "Faqat chakana do‘kon", "Avtoservis tarmog‘i"], a: 1, why: "MITAL zavodlardan mahsulot olib, uni nuqtalarga yetkazadi va savdoni rivojlantiradi — bu distribyutor." },
        { q: "Quyidagilardan qaysi biri agentning vazifasiga KIRMAYDI?", o: ["To‘lov muddatlarini nazorat qilish", "Mijozga moy tanlashda maslahat berish", "Zavodda moy formulasini o‘zgartirish", "Bozor haqida ma’lumot yig‘ish"], a: 2, why: "Formula — ishlab chiqaruvchining ishi. Agent sotadi, maslahat beradi, nazorat qiladi va axborot yig‘adi." },
        { q: "Taqdimotdan keyin darhol nima qilish kerak?", o: ["Narxlar ro‘yxatini berib ketish", "Mijozga savol berib, ehtiyojini aniqlash", "Raqobatchilarni tanqid qilish", "Buyurtmani talab qilish"], a: 1, why: "Qisqa taqdimotdan so‘ng savol — suhbatni mijozning ehtiyojiga buradi." }
      ]
    },
    /* ---------------------------------------------------- */
    {
      id: "m1l2", title: "Brendlar portfeli: MITANOL, Golden Booster, Liman Oil", min: 14, video: "",
      blocks: [
        { t: "p", h: "MITAL portfelida uch brend bor. Har birining o‘z o‘rni, o‘z xaridori va o‘z argumenti bor. Agent ularni <b>aralashtirmasligi</b> va har bir mijozga mosini taklif qila olishi kerak." },
        { t: "ig", k: "portfolio" },
        { t: "h", h: "MITANOL — Germaniya" },
        { t: "p", h: "MITANOL — nemis <b>MITAN</b> zavodining brendi. Zavod tarixi 1921-yilda Germaniyada boshlangan. Kanistrada “Made in Germany” yozuvi bor. Liniyalar:" },
        { t: "ul", items: [
          "<b>X-Force</b> — eng yuqori daraja: HC-sintetik, eng yangi standartlar (API SP/SQ, ILSAC GF-7A, GM dexos1 Gen 3).",
          "<b>M-Force / S-Force</b> — yarim sintetik va HC-sintetik, universal yengil avtomobillar uchun.",
          "<b>Turbo</b> — yuk mashinalari va tijorat texnikasining dizel dvigatellari uchun (API CK-4, CI-4).",
          "<b>ATF / Syngear</b> — avtomat, CVT, DCT va mexanik uzatmalar qutilari uchun."
        ]},
        { t: "h", h: "Golden Booster — Janubiy Koreya" },
        { t: "p", h: "Koreyada ishlab chiqarilgan moylar. <b>RED</b> seriyasi — eng yangi API SQ standarti (LSPI himoyasi, turbo va GDI dvigatellar). <b>PURPLE</b> seriyasi — API SN, ishonchli kundalik himoya. Koreya va Xitoy avtomobillari egalariga juda tushunarli argument." },
        { t: "h", h: "Liman Oil — Turkiya" },
        { t: "p", h: "Turkiyada ishlab chiqarilgan, ISO 9001/14001/45001 sertifikatli zavod. 5W-30 (to‘liq sintetik, API SP, Yevropa dopusklari) va 10W-40 (yarim sintetik) liniyalari, ATF Dexron VI. Narx va sifat muvozanatini qidirgan mijoz uchun." },
        { t: "call", k: "warn", title: "Hech qachon bunday demang", h: "<p>“Bizning hamma moylarimiz nemis” — bu <b>noto‘g‘ri</b>. Golden Booster — Koreya, Liman Oil — Turkiya mahsuloti. Mijoz kanistrani ko‘rib yolg‘onni darhol aniqlaydi va siz ishonchni yo‘qotasiz. Har brendning kelib chiqishini to‘g‘ri ayting — bu ham kuchli argument.</p>" },
        { t: "table", head: ["Brend", "Kelib chiqishi", "Kimga taklif qilamiz", "Asosiy argument"], rows: [
          ["MITANOL", "Germaniya", "Sifatni qadrlaydigan STO, Yevropa/GM/yangi avtomobillar, yuk avtoparklari", "Nemis sifati, OEM dopusklar, keng liniya (yengil, yuk, transmissiya)"],
          ["Golden Booster", "Janubiy Koreya", "Koreya, Yaponiya, Xitoy avtomobillari egalari; zamonaviy turbo dvigatellar", "API SQ (RED), LSPI himoyasi, ISO sertifikatlari"],
          ["Liman Oil", "Turkiya", "Narx/sifat muvozanati muhim bo‘lgan do‘kon va shoxobchalar", "API SP, Yevropa dopusklari, ishonchli zavod sertifikatlari"]
        ]},
        { t: "task", title: "Amaliy topshiriq", h: "Ombordan har uch brenddan bittadan kanistrani olib, yorlig‘ini o‘qing: kelib chiqishi, SAE, API/ACEA, dopusklar. Har biri haqida 2 jumlalik tavsif yozing." }
      ],
      keys: [
        "Uch brend: MITANOL (Germaniya), Golden Booster (Koreya), Liman Oil (Turkiya).",
        "Har bir brendning kelib chiqishini aniq va to‘g‘ri ayting.",
        "Mijozga brendni uning avtomobillari va ehtiyojiga qarab tanlang."
      ],
      quiz: [
        { q: "Golden Booster moylari qayerda ishlab chiqariladi?", o: ["Germaniya", "Turkiya", "Janubiy Koreya", "O‘zbekiston"], a: 2, why: "Golden Booster — Janubiy Koreya mahsuloti." },
        { q: "Mijoz: “Hamma moylaringiz Germaniyanikimi?” To‘g‘ri javob qaysi?", o: ["Ha, hammasi nemis", "MITANOL — Germaniya, Golden Booster — Koreya, Liman Oil — Turkiya. Sizga qaysi biri mosligini aytib beraman", "Bilmayman, ombordan so‘rayman", "Bu muhim emas"], a: 1, why: "Halollik — ishonchning asosi. Kelib chiqishini to‘g‘ri aytish va darhol mos variant taklif qilish kerak." },
        { q: "Yuk mashinalari dizel dvigatellari uchun MITANOL ning qaysi liniyasi mo‘ljallangan?", o: ["X-Force", "Turbo", "ATF", "S-Force"], a: 1, why: "Turbo liniyasi (API CK-4/CI-4, ACEA E) tijorat dizel texnikasi uchun." }
      ]
    },
    /* ---------------------------------------------------- */
    {
      id: "m1l3", title: "O‘zbekiston moy bozori va savdo kanallari", min: 12, video: "",
      blocks: [
        { t: "p", h: "Yaxshi agent bozorni xuddi o‘z hududidek biladi: qanday mashinalar yuradi, ular qayerda moy almashtiradi va kim qaror qabul qiladi." },
        { t: "h", h: "Avtopark xususiyatlari" },
        { t: "ul", items: [
          "<b>Chevrolet (UzAuto) ustunligi:</b> Cobalt, Nexia, Gentra, Spark, Damas, Lacetti, shuningdek yangi turbo modellar (Tracker, Onix, Malibu).",
          "<b>Xitoy va Koreya brendlari tez o‘syapti:</b> BYD, Chery, Haval, Kia, Hyundai — zamonaviy turbo va GDI dvigatellar.",
          "<b>Gaz ballonli mashinalar ko‘p</b> (metan/propan): dvigatel issiqroq ishlaydi, moy tezroq eskiradi.",
          "<b>Iqlim:</b> yozda +40 °C dan yuqori, qishda −15 °C gacha, ko‘p chang — moy uchun og‘ir sharoit.",
          "<b>Taksi va yetkazib berish xizmatlari:</b> katta yurish (probeg) — moy almashtirish tez-tez."
        ]},
        { t: "call", k: "tip", title: "Bu sotuvda nimani beradi?", h: "<p>Issiq iqlim + gaz + katta yurish = sifatli moyga <b>haqiqiy ehtiyoj</b>. Arzon moy tez eskirib, dvigatelni yeyadi. Shuni mijozga raqamlar va misollar bilan tushuntiring.</p>" },
        { t: "h", h: "Savdo kanallari — kimga sotamiz" },
        { t: "ig", k: "channels" },
        { t: "p", h: "Har bir kanalning o‘z “tili” bor: STO ustasi texnik argumentni, do‘kon egasi marja va aylanmani, avtopark rahbari esa xarajat va ishonchlilikni eshitishni xohlaydi. Bularni 3-modulda chuqur o‘rganamiz." },
        { t: "task", title: "Amaliy topshiriq", h: "O‘z hududingizda 10 ta nuqtani aylanib chiqing (STO, shoxobcha, do‘kon). Har biri uchun yozing: nuqta turi, qaysi brendlar polkada, qaysi mashinalar ko‘p keladi." }
      ],
      keys: [
        "Bozorda Chevrolet ustun, Xitoy/Koreya brendlari tez o‘smoqda.",
        "Issiq iqlim, gaz va katta yurish — sifatli moy uchun eng kuchli argument.",
        "Kanallar: STO, moy almashtirish shoxobchasi, avtodo‘kon, ulgurji, avtopark."
      ],
      quiz: [
        { q: "Nima uchun O‘zbekistonda sifatli moyga ehtiyoj yuqori?", o: ["Yo‘llar yaxshi bo‘lgani uchun", "Issiq iqlim, gaz ballonli dvigatellar va katta yurish tufayli", "Mashinalar kam yurgani uchun", "Benzin arzon bo‘lgani uchun"], a: 1, why: "Yuqori harorat, gaz yoqilg‘isi va katta probeg moyni tez eskirtiradi." },
        { q: "Avtodo‘kon egasi uchun eng muhim argument qaysi?", o: ["Moyning kimyoviy formulasi", "Marja (foyda) va mahsulotning tez aylanishi", "Zavodning tarixi", "Kanistraning rangi"], a: 1, why: "Do‘kon egasi biznesmen: u foyda va aylanma tilida o‘ylaydi." },
        { q: "Gaz ballonli (metan/propan) dvigatellarda moy bilan nima bo‘ladi?", o: ["Umuman o‘zgarmaydi", "Dvigatel issiqroq ishlaydi va moy tezroq eskiradi", "Moy kerak bo‘lmaydi", "Moy quyuqlashib qoladi va almashtirilmaydi"], a: 1, why: "Gaz yoqilg‘isida yonish harorati yuqori — moy tezroq oksidlanadi." }
      ]
    },
    /* ---------------------------------------------------- */
    {
      id: "m1l4", title: "Agentning ish modeli, me’yorlar va KPI", min: 12, video: "",
      blocks: [
        { t: "p", h: "MITAL agenti tizim bo‘yicha ishlaydi. “Kayfiyatga qarab” emas — <b>reja, me’yor va raqamlar</b> bo‘yicha. Quyidagi ko‘rsatkichlar har kuni tekshiriladi." },
        { t: "ig", k: "kpi-day" },
        { t: "h", h: "6 asosiy KPI" },
        { t: "table", head: ["KPI", "Nima o‘lchanadi", "Me’yor"], rows: [
          ["Oborot", "Oylik sotuv hajmi (so‘m / litr)", "Oylik reja 100%"],
          ["Kontaktlar", "Kunlik qo‘ng‘iroq va uchrashuvlar", "15–20 ta / kun"],
          ["Tashriflar", "Nuqtalarga jismoniy tashrif", "8–12 ta / kun"],
          ["Buyurtmalar", "Rasmiylashtirilgan buyurtmalar", "3–5 ta / kun"],
          ["Yangi mijozlar", "Birinchi buyurtma bergan yangi nuqtalar", "2–3 ta / hafta"],
          ["Debitorka", "Muddati o‘tgan qarz ulushi", "0% ga intilish"]
        ]},
        { t: "call", k: "rule", title: "Esda tuting", h: "<p>Rejasiz ish — pulsiz ish. Har bir kun reja bilan boshlanadi va CRM hisoboti bilan tugaydi.</p>" },
        { t: "h", h: "Karyera yo‘li" },
        { t: "p", h: "MITAL da o‘sish natijaga bog‘liq. 6 oy davomida rejani 100% bajargan agent keyingi bosqichga chiqish imkoniyatiga ega bo‘ladi." },
        { t: "ig", k: "career" },
        { t: "task", title: "Amaliy topshiriq", h: "Supervayzer bilan o‘zingizning oylik rejangizni aniqlang va uni haftalik va kunlik me’yorlarga bo‘lib yozing." }
      ],
      keys: [
        "Kunlik me’yor: 15–20 kontakt, 8–12 tashrif, 3–5 buyurtma.",
        "Haftada 2–3 ta yangi mijoz — bazani o‘stirishning asosi.",
        "O‘sish natijaga bog‘liq: 6 oy × 100% reja = keyingi bosqich."
      ],
      quiz: [
        { q: "Agentning kunlik tashriflar me’yori qancha?", o: ["2–3 ta", "8–12 ta", "25–30 ta", "Me’yor yo‘q"], a: 1, why: "Kunlik me’yor: 8–12 ta tashrif." },
        { q: "Haftasiga nechta yangi mijoz ochish kerak?", o: ["0–1 ta", "2–3 ta", "10 ta", "Faqat oyiga bitta"], a: 1, why: "Haftada 2–3 ta yangi nuqta — baza muntazam o‘sib boradi." },
        { q: "Kun qaysi harakat bilan tugashi kerak?", o: ["Oxirgi tashrif bilan", "CRM ga kunlik hisobot kiritish bilan", "Uyga qaytish bilan", "Ertangi kunni o‘ylamaslik bilan"], a: 1, why: "Hisobot — ertangi rejaning asosi va rahbar uchun shaffoflik." }
      ]
    }
  ]
});
