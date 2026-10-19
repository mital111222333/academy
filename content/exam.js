/* =========================================================
   YAKUNIY IMTIHON — savollar bazasi
   ---------------------------------------------------------
   Imtihonda shu bazadan har bir moduldan "take" ta savol
   tasodifiy tanlanadi (jami config.js → EXAM.QUESTIONS).
   Variantlar har safar aralashtiriladi.
   m — modul, q — savol, o — variantlar, a — to‘g‘ri javob indeksi
   ========================================================= */
window.EXAM = {
  take: { m1: 3, m2: 6, m3: 4, m4: 5, m5: 4, m6: 3, m7: 3, m8: 2 },
  pool: [
    /* ---------- 1-modul ---------- */
    { m: "m1", q: "Mijoz so‘raydi: “MITAL o‘zi moy ishlab chiqaradimi?” To‘g‘ri javob:", o: ["Ha, O‘zbekistonda zavodimiz bor", "Yo‘q, MITAL — distribyutor: MITANOL (Germaniya), Golden Booster (Koreya) va Liman Oil (Turkiya) mahsulotlarini yetkazib beradi", "Ha, Germaniyada", "Bilmayman"], a: 1, why: "MITAL — distribyutor, ishlab chiqaruvchi emas." },
    { m: "m1", q: "Liman Oil mahsulotlari qayerda ishlab chiqariladi?", o: ["Germaniya", "Janubiy Koreya", "Turkiya", "Xitoy"], a: 2, why: "Liman Oil — Turkiya, ISO sertifikatli zavod." },
    { m: "m1", q: "Agentning kunlik me’yori qaysi qatorda to‘g‘ri berilgan?", o: ["5 kontakt / 2 tashrif / 1 buyurtma", "15–20 kontakt / 8–12 tashrif / 3–5 buyurtma", "50 kontakt / 30 tashrif / 20 buyurtma", "Me’yor yo‘q"], a: 1, why: "15–20 / 8–12 / 3–5 — kunlik standart." },
    { m: "m1", q: "Nima uchun O‘zbekistonda sifatli moy uchun argument kuchli?", o: ["Yo‘llar tekis", "Issiq iqlim, gaz ballonli dvigatellar va katta yurish moyni tez eskirtiradi", "Benzin arzon", "Mashinalar kam"], a: 1, why: "Og‘ir ekspluatatsiya sharoiti — sifatga haqiqiy ehtiyoj." },
    { m: "m1", q: "MITANOL brendi qaysi zavodga tegishli va tarixi qachon boshlangan?", o: ["MITAN, Germaniya, 1921", "MITAL, O‘zbekiston, 2024", "Liman, Turkiya, 1985", "Golden Booster, Koreya, 1921"], a: 0, why: "MITANOL — nemis MITAN zavodi brendi, 1921-yildan." },

    /* ---------- 2-modul ---------- */
    { m: "m2", q: "“10W-40” va “5W-40” ning asosiy farqi nimada?", o: ["Issiqdagi yopishqoqlikda", "Sovuqdagi (qishki) xususiyatda: 5W sovuqda tezroq tarqaladi", "Rangida", "Narxida"], a: 1, why: "Ikkinchi raqam bir xil (40), farq qishki ko‘rsatkichda." },
    { m: "m2", q: "API sinfidagi “C” harfi nimani bildiradi (masalan, CK-4)?", o: ["Benzin dvigatellari", "Dizel (tijorat) dvigatellari", "Variator", "Mototsikl"], a: 1, why: "S — benzin, C — dizel." },
    { m: "m2", q: "Qaysi standart eng yangi?", o: ["API SN", "API SL", "API SQ", "API SJ"], a: 2, why: "API SQ — 2025-yilda kiritilgan." },
    { m: "m2", q: "Sajevoy filtrli (DPF) Mercedes dizeli uchun qaysi talab muhim?", o: ["MB 229.51 / 229.52 (low SAPS)", "MB 229.1", "Dexron VI", "GL-5"], a: 0, why: "229.51/229.52 — kam kulli moy, DPF ni himoya qiladi." },
    { m: "m2", q: "Chevrolet Tracker 1.2 turbo uchun eng to‘g‘ri tavsiya:", o: ["Turbo 15W-40 Classic", "X-Force 5W-30 DX1 — GM dexos1 Gen 3", "Syngear 75W-90", "X-Force 10W-60"], a: 1, why: "GM turbo dvigatellari dexos1 Gen 3 talab qiladi." },
    { m: "m2", q: "Mijozda Nissan variatori (CVT) bor. Qaysi mahsulot?", o: ["ATF Dexron VI", "ATF DCT", "ATF CVT", "Syngear 75W-90"], a: 2, why: "Variatorga faqat maxsus CVT suyuqligi." },
    { m: "m2", q: "VW DSG 0AM (quruq mufta) qutisiga ATF DCT quyish mumkinmi?", o: ["Ha, albatta", "Yo‘q — ATF DCT faqat ho‘l muftali DCT uchun", "Faqat yozda", "Faqat yarmi"], a: 1, why: "Ishlab chiqaruvchi quruq muftali DSG uchun mo‘ljallanmaganini aytgan." },
    { m: "m2", q: "LSPI nima?", o: ["Moy brendi", "Turbo GDI dvigatellarda past aylanishda muddatidan oldin alangalanish", "Moy filtri turi", "Transmissiya turi"], a: 1, why: "LSPI porshen va shatunlarni shikastlashi mumkin; SP/SQ moylar himoya qiladi." },
    { m: "m2", q: "Moy tanlash algoritmining to‘g‘ri tartibi qaysi?", o: ["Narx → brend → rang", "Mashina va dvigatel → ishlab chiqaruvchi talabi → mos standart → sharoit", "Sharoit → narx → mashina", "Faqat yopishqoqlik"], a: 1, why: "Avval mashina, keyin talab, keyin mos mahsulot va sharoit." },
    { m: "m2", q: "HC-sintetik moy qaysi baza guruhiga kiradi?", o: ["I", "II", "III", "IV (PAO)"], a: 2, why: "Gidrokreking — III guruh." },
    { m: "m2", q: "Mexanik quti va gipoid ko‘prik uchun bitta moy kerak. Qaysi biri?", o: ["Syngear 75W-90 (GL-4/GL-5, MT-1)", "ATF CVT", "X-Force 0W-20", "ATF DCT"], a: 0, why: "Syngear 75W-90 butun uzatish tizimi uchun universal." },

    /* ---------- 3-modul ---------- */
    { m: "m3", q: "STO ustasi uchun eng kuchli argument qaysi?", o: ["Kanistraning rangi", "Mijozlar shikoyat qilmaydi — usta obro‘si saqlanadi", "Kompaniya ofisi katta", "Reklama ko‘p"], a: 1, why: "Usta o‘z obro‘si uchun ishlaydi." },
    { m: "m3", q: "“Hisobchi” turidagi mijozga qanday gapirish kerak?", o: ["Hissiy hikoyalar bilan", "Raqamlar, jadvallar, standartlar va sertifikatlar bilan", "Shoshiltirib", "Umuman gapirmaslik"], a: 1, why: "Hisobchi faktlar va raqamlarga ishonadi." },
    { m: "m3", q: "X → A → F formulasida “F” nima?", o: ["Formula", "Foyda — mijoz biznesiga natija", "Filtr", "Faktura"], a: 1, why: "Xususiyat → Afzallik → Foyda." },
    { m: "m3", q: "Mijoz pasportida qaysi ma’lumot eng muhim?", o: ["Mijozning tug‘ilgan joyi", "Odatdagi buyurtma kuni, hajmi, tez sotiladigan pozitsiyalar va to‘lov odati", "Do‘kon devorining rangi", "Ob-havo"], a: 1, why: "Bu ma’lumotlar rejalash va taklif uchun asos." },
    { m: "m3", q: "Avtopark rahbari bilan suhbatda asosiy mavzu:", o: ["Kanistra dizayni", "Xarajatni kamaytirish va mashinalarning to‘xtamasligi", "Kompaniya tarixi", "Reklama"], a: 1, why: "Avtopark — xarajat va ishonchlilik tilida." },
    { m: "m3", q: "Nuqtada qarorga kim ta’sir qiladi?", o: ["Faqat ega", "Ega, usta va sotuvchi — uchalasi ham", "Faqat sotuvchi", "Hech kim"], a: 1, why: "Har biri qarorning bir qismini belgilaydi." },

    /* ---------- 4-modul ---------- */
    { m: "m4", q: "Tashrifda taqdimot qachon qilinadi?", o: ["Salomlashishdan oldin", "Ehtiyoj aniqlangandan keyin", "Hech qachon", "Tashrif oxirida, xayrlashganda"], a: 1, why: "Ehtiyojsiz taqdimot — nishonsiz o‘q." },
    { m: "m4", q: "Qaysi savol ochiq?", o: ["Moy kerakmi?", "Buyurtma berasizmi?", "Qaysi moylar sizda eng tez sotiladi?", "5W-30 bormi?"], a: 2, why: "Ochiq savol mijozni gapirtiradi." },
    { m: "m4", q: "Mijoz “Qimmat” dedi. Birinchi qadam:", o: ["Chegirma berish", "Qo‘shilib, nima bilan solishtirayotganini aniqlash", "Raqobatchini yomonlash", "Ketish"], a: 1, why: "Avval sababni aniqlang." },
    { m: "m4", q: "Telefon qo‘ng‘irog‘ining maqsadi:", o: ["Telefonda katta buyurtma olish", "Uchrashuv belgilash", "Narxlarni o‘qib berish", "Raqobatchini bilish"], a: 1, why: "Telefonda uchrashuvni sotasiz." },
    { m: "m4", q: "“4 litrlikdan 2 karobka yoki 5 litrlikdan bitta?” — bu qaysi usul?", o: ["Muqobil tanlov", "Jimlik", "Bosim", "Kross-sotuv"], a: 0, why: "Ikkala variant ham “ha” bo‘ladi." },
    { m: "m4", q: "Qaysi biri tashrifning to‘g‘ri natijasi EMAS?", o: ["Buyurtma", "Sinov partiyasi", "Aniq sana bilan keyingi uchrashuv", "“Keyin gaplashamiz” deb ketish"], a: 3, why: "Aniq keyingi qadam bo‘lmasa — natija yo‘q." },
    { m: "m4", q: "Yetkazishdan 1 hafta keyin nima tekshiriladi?", o: ["Hech narsa", "Mahsulot polkadami, narx tegi bormi, usta va sotuvchi bilishadimi", "Faqat ob-havo", "Faqat qarz"], a: 1, why: "Polkada bo‘lmagan mahsulot sotilmaydi." },

    /* ---------- 5-modul ---------- */
    { m: "m5", q: "Haftalik sotuv 12 ta, keyingi yetkazishgacha 2 hafta, zaxira 6 ta, qoldiq 8 ta. Buyurtma:", o: ["14 ta", "22 ta", "30 ta", "18 ta"], a: 1, why: "12 × 2 + 6 − 8 = 22." },
    { m: "m5", q: "Eng ko‘p sotiladigan pozitsiyalar polkaning qayerida bo‘lishi kerak?", o: ["Eng pastda", "Ko‘z darajasida", "Omborda", "Kassa orqasida"], a: 1, why: "Ko‘z darajasi — “oltin polka”." },
    { m: "m5", q: "Motor moyi oladigan STO ga Syngear 75W-90 taklif qilish — bu…", o: ["Upsell", "Kross-sotuv", "Debitorka", "FIFO"], a: 1, why: "Boshqa toifadagi qo‘shimcha mahsulot." },
    { m: "m5", q: "ABC tahlilida A guruh — bu…", o: ["Eng kam sotiladigan pozitsiyalar", "Sotuvning asosiy qismini beradigan yetakchi pozitsiyalar", "Yangi pozitsiyalar", "Muddati o‘tgan tovarlar"], a: 1, why: "A — yetakchilar, ular hech qachon tugamasligi kerak." },
    { m: "m5", q: "FIFO qoidasi nima?", o: ["Avval kelgan tovar avval sotiladi", "Yangi tovar oldinga qo‘yiladi", "Narx har kuni o‘zgaradi", "Tovar omborda qoladi"], a: 0, why: "Eski partiyalar oldinga — muddat va sifat nazorati." },
    { m: "m5", q: "Ortiqcha buyurtmaning mijoz uchun asosiy xavfi:", o: ["Xavf yo‘q", "Pul tovarga muzlaydi, keyingi buyurtma kechikadi", "Tovar tez sotiladi", "Narx tushadi"], a: 1, why: "Aylanma mablag‘ “qamaladi”." },

    /* ---------- 6-modul ---------- */
    { m: "m6", q: "Debitorka haqidagi asosiy qoida qaysi?", o: ["Qarz — normal, kutish kerak", "To‘lanmagan sotuv — sotuv emas", "Qarzni agent o‘zi to‘laydi", "Qarz haqida gapirmaslik kerak"], a: 1, why: "Agent ishi pul kassaga kelganda tugaydi." },
    { m: "m6", q: "Mijoz to‘lov va’dasini ikki marta buzdi. Nima qilinadi?", o: ["Yangi katta partiya beriladi", "Yangi yetkazish to‘xtatiladi va supervayzerga xabar beriladi", "Hech narsa", "Qarz kechiriladi"], a: 1, why: "Bu eskalatsiya bosqichi." },
    { m: "m6", q: "“Pul yo‘q” javobiga eng yaxshi reaksiya:", o: ["“Bugun qancha qila olasiz? Qolgani uchun aniq sana belgilaylik”", "“Mayli, qachon bo‘lsa”", "Qo‘pol gapirish", "Boshqa mijozlar oldida uyaltirish"], a: 0, why: "Qisman to‘lov + aniq sana." },
    { m: "m6", q: "To‘lov muddatidan 2 kun oldin (D−2) nima qilinadi?", o: ["Yetkazish to‘xtatiladi", "Muloyim eslatma: summa va sana", "Sudga murojaat", "Hech narsa"], a: 1, why: "Oldindan eslatma — o‘z vaqtida to‘lovga yordam." },
    { m: "m6", q: "Yangi mijozga birinchi yetkazish qanday qilinadi?", o: ["Katta hajmda, uzoq qarzga", "Kichik hajmda yoki oldindan to‘lov bilan — ishonch to‘lov intizomi bilan o‘sadi", "Shartsiz", "Faqat og‘zaki kelishuv bilan"], a: 1, why: "Xavf bosqichma-bosqich boshqariladi." },

    /* ---------- 7-modul ---------- */
    { m: "m7", q: "A guruh mijozlariga tashrif chastotasi:", o: ["Oyiga 1 marta", "Haftasiga 1–2 marta", "Yilda 1 marta", "Faqat chaqirsa"], a: 1, why: "Eng muhim mijozlar — eng ko‘p e’tibor." },
    { m: "m7", q: "Sifatli CRM yozuvida albatta nima bo‘ladi?", o: ["Ob-havo", "Natija, raqamlar va sanasi bilan keyingi qadam", "Agent kayfiyati", "Faqat “bordim”"], a: 1, why: "Keyingi qadam ish uzluksizligini ta’minlaydi." },
    { m: "m7", q: "Ko‘p tashrif, lekin buyurtma kam. Muammo qayerda?", o: ["Kontaktlar sonida", "Tashrifdan buyurtmaga konversiyada — ehtiyojni aniqlash va yopishda", "Omborda", "Mashinada"], a: 1, why: "Ko‘nikmani Trenajor va rol o‘yinlarida mashq qiling." },
    { m: "m7", q: "Kunlik hisobot qachon kiritiladi?", o: ["Har kuni 17:30 da", "Hafta oxirida", "Oy oxirida", "Rahbar so‘raganda"], a: 0, why: "Kiritilmagan tashrif — bo‘lmagan tashrif." },
    { m: "m7", q: "Hududni kunlarga bo‘lishning asosiy foydasi:", o: ["Kamroq yo‘l, mijoz sizni aniq kunda kutadi", "Ko‘proq benzin", "Hech qanday", "Faqat rahbar uchun qulay"], a: 0, why: "Marshrut tartibi vaqt va intizomni beradi." },

    /* ---------- 8-modul ---------- */
    { m: "m8", q: "TOP agent formulasi qaysi?", o: ["Bilim + Omad", "Bilim × Tartib × Munosabat = Natija", "Narx × Chegirma", "Tanish × Vaqt"], a: 1, why: "Ko‘paytma: bittasi nol bo‘lsa — natija nol." },
    { m: "m8", q: "Rad javobidan keyin TOP agent nima qiladi?", o: ["Ishni tashlaydi", "Qisqa tahlil qiladi va darhol keyingi nuqtaga boradi", "Mijozni yomonlaydi", "Kunni tugatadi"], a: 1, why: "“Yo‘q” — statistika, tahlil — o‘sish." },
    { m: "m8", q: "Qaysi biri “qizil chiziq” (mumkin emas)?", o: ["Faktlar bilan solishtirish", "Mahsulot kelib chiqishi haqida yolg‘on gapirish", "Muammoni supervayzerga aytish", "Har bir to‘lovni hujjatlashtirish"], a: 1, why: "Yolg‘on ishonchni butunlay yo‘q qiladi." },
    { m: "m8", q: "Va’dani bajara olmasangiz:", o: ["Indamaysiz", "Oldindan aytib, yangi aniq muddat kelishasiz", "Mijozni ayblaysiz", "Telefonni o‘chirasiz"], a: 1, why: "Mas’uliyat — ochiqlik va oldindan ogohlantirish." }
  ]
};
