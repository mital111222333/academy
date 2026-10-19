/* =========================================================
   SKRIPTLAR KUTUBXONASI va E’TIROZLAR TRENAJORI
   lines: ["a", agent] | ["c", mijoz] | ["n", izoh]
   ========================================================= */
window.SCRIPTS = [
  {
    id: "first-visit", tag: "Yangi mijoz", title: "Birinchi tashrif (STO / shoxobcha)",
    goal: "Ishonch qozonish, ehtiyojni bilish va sinov partiyasiga kelishish.",
    lines: [
      ["a", "Assalomu alaykum! Men ___, MITAL kompaniyasidanman. Motor va transmissiya moylari distribyutorimiz. 2 daqiqa vaqtingiz bormi?"],
      ["c", "Ha, gapiring."],
      ["a", "Rahmat. Avval sizni tushunmoqchiman: kuniga nechta mashinaga xizmat qilasiz va qaysi moylar ko‘proq ketyapti?"],
      ["c", "15–20 ta, asosan 5W-30 va 10W-40. Cobalt, Gentra ko‘p."],
      ["a", "Hozirgi yetkazib beruvchida nima yoqmaydi — narxmi, kechikishmi, sifatmi?"],
      ["c", "Ba’zan kechikadi, mijozlar yozda moy kamayadi deyishadi."],
      ["a", "Tushundim. Unda sizga S-Force 5W-30 Classic mos keladi: HC-sintetik, issiqda kam bug‘lanadi, bochkada ham bor. Yetkazib berishni esa haftaning aniq kunida qilamiz."],
      ["a", "Keling, avval ozroq olib sinab ko‘raylik. Ustalaringiz va mijozlar fikrini 2 haftadan keyin birga eshitamiz. 2 karobka qulaymi yoki bitta bochka?"],
      ["n", "Taklifdan keyin jim turing va javobni kuting."]
    ],
    tips: ["Taqdimotdan oldin kamida 2 ta savol bering.", "Faqat 1–2 mahsulot taklif qiling — aniqlangan ehtiyojga mosini.", "Doimo aniq keyingi qadam bilan tugating."]
  },
  {
    id: "call", tag: "Telefon", title: "Uchrashuv belgilash qo‘ng‘irog‘i",
    goal: "Telefonda sotmaslik — faqat uchrashuvni “sotish”.",
    lines: [
      ["a", "Assalomu alaykum, [Ism] aka! Men [Ism], MITAL kompaniyasidanman. Motor moylari distribyutorimiz."],
      ["a", "Moy almashtirish shoxobchangiz foydasini oshirish bo‘yicha 2 daqiqa gaplashsak bo‘ladimi?"],
      ["c", "Bizda yetkazib beruvchi bor."],
      ["a", "Juda yaxshi, demak siz bu ishni bilasiz. Men almashtirishni taklif qilmayman — faqat 10 daqiqada assortimentingizga qo‘shimcha foyda bera oladigan 2 ta pozitsiyani ko‘rsatmoqchiman."],
      ["a", "Bugun soat 15:00 da yoki ertaga ertalab 10:00 da — qaysi biri qulay?"],
      ["n", "Muqobil tanlov bilan aniq vaqt so‘rang — “qachon bo‘sh bo‘lasiz?” demang."]
    ],
    tips: ["Qo‘ng‘iroq 2 daqiqadan oshmasin.", "Narx haqida telefonda gapirmang — uchrashuvga olib boring.", "Kelishilgan vaqtni darhol SMS bilan tasdiqlang."]
  },
  {
    id: "price", tag: "E’tiroz", hot: true, title: "“Qimmat”",
    goal: "Narxdan qiymatga o‘tish: litr emas, natijani solishtirish.",
    lines: [
      ["c", "Qimmat ekan."],
      ["a", "Tushunaman, narx muhim. Qaysi moy bilan solishtiryapsiz?"],
      ["c", "Hozirgi moyim arzonroq."],
      ["a", "To‘g‘ri, kanistraning narxi farq qiladi. Keling, natijani solishtiraylik: bu moy issiqda kam bug‘lanadi va butun oraliqda xususiyatini saqlaydi. Mijozingiz shikoyat qilmaydi va qaytib keladi."],
      ["a", "Sizga bitta qaytgan doimiy mijoz kanistradagi farqdan qimmatroq emasmi?"],
      ["c", "Ha, shunday."],
      ["a", "Unda kichik partiyadan boshlaylik — natijani o‘zingiz ko‘rasiz."]
    ],
    tips: ["Hech qachon darhol chegirma bermang.", "“Nima bilan solishtiryapsiz?” — eng kuchli savol.", "Do‘kon uchun — marja va aylanma, usta uchun — shikoyatsiz ish, avtopark uchun — xarajat."]
  },
  {
    id: "supplier", tag: "E’tiroz", title: "“Bizda yetkazib beruvchi bor”",
    goal: "Almashtirish emas — qo‘shimcha variant sifatida eshikni ochish.",
    lines: [
      ["c", "Bizda yetkazib beruvchi bor, rahmat."],
      ["a", "Yaxshi, demak sizda ishonchli ta’minot bor. Bitta savol: biror marta kerakli moy tugab qolgan yoki kechikkan paytlar bo‘lganmi?"],
      ["c", "Bo‘ladi, albatta."],
      ["a", "Ana shunday paytlar uchun ikkinchi ishonchli manba foydali. Men hozirgi yetkazib beruvchingizni almashtirishni taklif qilmayman — faqat bitta pozitsiyadan sinab ko‘ring. Masalan, Tracker va Onix uchun dexos1 Gen 3 talabidagi DX1 — buni boshqalarda topish qiyin."]
    ],
    tips: ["Raqobatchini hech qachon yomonlamang.", "Raqobatchida yo‘q yoki kam bo‘lgan pozitsiyani toping.", "Kichik sinov — xavfsiz “ha”."]
  },
  {
    id: "no-demand", tag: "E’tiroz", title: "“Mijozlar so‘ramaydi”",
    goal: "Talabni yaratish: usta tavsiyasi + polkada ko‘rinish.",
    lines: [
      ["c", "Bu brendni mijozlar so‘ramaydi."],
      ["a", "To‘g‘ri, mijoz ko‘pincha o‘zi bilgan brendni so‘raydi. Lekin moy almashtirishda kim maslahat beradi — usta, to‘g‘rimi?"],
      ["c", "Ha, ko‘pincha usta aytadi."],
      ["a", "Demak, usta ishongan moy sotiladi. Men ustalaringizga 15 daqiqalik qisqa taqdimot qilaman, polkaga moy tanlash jadvalini qo‘yaman. Shunda mijoz so‘rashi shart emas — usta tavsiya qiladi."]
    ],
    tips: ["Talab — usta, polka va POS orqali yaratiladi.", "Birinchi partiyani kichik qiling va sotuvni birga kuzating."]
  },
  {
    id: "think", tag: "E’tiroz", title: "“O‘ylab ko‘raman” / “Keyin”",
    goal: "Asl sababni topish va aniq sana belgilash.",
    lines: [
      ["c", "Yaxshi, o‘ylab ko‘raman."],
      ["a", "Albatta. Qaror qilishingizga yordam berish uchun so‘rasam: nimani o‘ylab ko‘rmoqchisiz — narxnimi, sifatnimi yoki to‘lov shartlarinimi?"],
      ["c", "Aslida, hozir polkada joy kam."],
      ["a", "Tushunarli. Unda sotilmay turgan pozitsiyalaringiz o‘rniga faqat 2 ta tez ketadigan SKU qo‘yaylik — joy ham, foyda ham bo‘ladi. Payshanba 10:00 da kelib polkani birga ko‘rsak bo‘ladimi?"]
    ],
    tips: ["“O‘ylab ko‘raman” ortida doim aniq sabab bor.", "Hech qachon sanasiz ketmang."]
  },
  {
    id: "close", tag: "Yopish", title: "Yopish texnikalari",
    goal: "Buyurtmani tabiiy ravishda rasmiylashtirish.",
    lines: [
      ["a", "Demak, sizga Cobalt va Gentra uchun 5W-30, yetkazish payshanba, to‘lov 14 kun ichida. To‘g‘rimi?"],
      ["c", "Ha, to‘g‘ri."],
      ["a", "4 litrlikdan 3 karobka olasizmi yoki 5 litrlikdan 2 karobka?"],
      ["c", "4 litrlikdan."],
      ["a", "Yaxshi, rasmiylashtiraman. Payshanba kuni ertalab yetkazib berishganda o‘zim ham qo‘ng‘iroq qilaman."],
      ["n", "Xulosa yopish → muqobil tanlov → keyingi qadam."]
    ],
    tips: ["Kichik “ha”lar yig‘ing.", "Taklifdan keyin jim turing.", "Kelishuvni ovoz chiqarib takrorlang."]
  },
  {
    id: "upsell", tag: "Upsell", title: "Zamonaviy moyga o‘tkazish",
    goal: "Mijozni mashinasiga to‘g‘riroq va yuqoriroq darajadagi moyga o‘tkazish.",
    lines: [
      ["a", "Sizga Tracker, Onix kabi yangi mashinalar ham keladimi?"],
      ["c", "Ha, ko‘paymoqda."],
      ["a", "Ularga hozir qaysi moy quyyapsiz?"],
      ["c", "Oddiy 5W-30."],
      ["a", "Bu turbo dvigatellar GM dexos1 Gen 3 talabini qo‘yadi — past aylanishdagi muddatidan oldin alangalanishdan (LSPI) himoya uchun. X-Force 5W-30 DX1 aynan shu talab uchun yaratilgan. Mijozga “zavod talabiga mos moy” deb tushuntirsangiz, u rozi bo‘ladi, sizning chekingiz esa oshadi."]
    ],
    tips: ["Upsell — mijozga to‘g‘riroq yechim, “tiqishtirish” emas.", "Doim mashina talabiga tayaning."]
  },
  {
    id: "debt", tag: "Debitorka", title: "To‘lovni eslatish",
    goal: "Muloyim, lekin aniq: summa, sana, kelishuv.",
    lines: [
      ["a", "Assalomu alaykum, Bobur aka! Sizga qulay bo‘lishi uchun eslatib qo‘yay: 12-sanadagi yetkazish bo‘yicha 4 200 000 so‘m to‘lov muddati bugun."],
      ["c", "Hozir biroz qiyinroq..."],
      ["a", "Tushunaman. Bugun qancha qismini to‘lash imkoni bor? Qolganini qaysi aniq sanada yopamiz?"],
      ["c", "Bugun yarmini, qolganini payshanba."],
      ["a", "Kelishdik: bugun 2 100 000, payshanba qolgan 2 100 000. Payshanba ertalab xabar beraman. Rahmat!"],
      ["n", "Kelishuvni shu kuniyoq yozma (xabar) tasdiqlang."]
    ],
    tips: ["Eslatma — xizmat ohangida.", "Har doim “qancha va qachon?”.", "Va’da 2 marta buzilsa — supervayzerga."]
  },
  {
    id: "hard", tag: "Qiyin mijoz", title: "Jahldor / shikoyat qiluvchi mijoz",
    goal: "Hissiyotni tinchlantirish va muammoni hal qilish.",
    lines: [
      ["c", "Sizlar doim kechikasizlar! Yana tovar kelmadi!"],
      ["a", "Kechirasiz, bu haqiqatan noqulay — mijozlaringiz kutib qolgan bo‘lsa, sizni tushunaman."],
      ["a", "Aniqlashtirib olay: qaysi buyurtma va qachon kelishi kerak edi?"],
      ["c", "Dushanbadagi buyurtma, hali yo‘q."],
      ["a", "Hozir omborga qo‘ng‘iroq qilib, aniq vaqtni bilaman va 15 daqiqada sizga aytaman. Keyingi buyurtmalarda esa yetkazishdan bir kun oldin o‘zim tasdiqlab turaman."],
      ["n", "Avval hissiyot (tan olish), keyin fakt (aniqlash), keyin harakat (aniq va’da)."]
    ],
    tips: ["Bahslashmang va o‘zingizni oqlamang.", "Faqat bajara oladigan va’da bering.", "Va’dani bajarib, natijani xabar qiling."]
  },
  {
    id: "lost", tag: "Qayta faollashtirish", title: "Yo‘qolgan mijozni qaytarish",
    goal: "Nega ketganini bilish va qayta boshlash.",
    lines: [
      ["a", "Assalomu alaykum, Sardor aka! Anchadan beri buyurtma bo‘lmadi — biror narsa yoqmadimi? Ochiq aytsangiz, men uchun juda muhim."],
      ["c", "Oxirgi marta kechikishgan edi, boshqasidan ola boshladik."],
      ["a", "Rahmat, ochiq aytganingiz uchun. Bu bizning xatomiz. Hozir yetkazish jadvalini o‘zgartirdik — har seshanba va juma. Bitta sinov buyurtmasi bilan qayta boshlab ko‘ramizmi? Kechiksa — men shaxsan javob beraman."]
    ],
    tips: ["Sababni bilmasdan taklif qilmang.", "Xatoni tan olish — ishonchni qaytaradi.", "Kichik sinov buyurtmasi bilan qayta boshlang."]
  }
];

/* E’tirozlar trenajori: har bir kartada mijoz gapi va 3 javob varianti.
   best — eng yaxshi javob indeksi. */
window.TRAINER = [
  { say: "Qimmat ekan.", ctx: "Moy almashtirish shoxobchasi egasi, birinchi tashrif.",
    o: ["Mayli, 10% chegirma qilib beraman.", "Tushunaman. Qaysi moy bilan solishtiryapsiz? Keling, natijani solishtiraylik.", "Arzon moy — yomon moy, bilasizmi."],
    best: 1, why: "Avval sababni aniqlang va qiymatga o‘ting. Darhol chegirma — qiymatni pasaytiradi, raqobatchini yomonlash — ishonchni." },
  { say: "Bizda yetkazib beruvchi bor.", ctx: "Avtodo‘kon, polkada raqobatchi brendlar.",
    o: ["Ular yomon, bizniki yaxshiroq.", "Unda kerak emas ekan, uzr.", "Ajoyib. Almashtirishni emas, bitta pozitsiyadan sinab ko‘rishni taklif qilaman — masalan, boshqalarda yo‘q dexos1 Gen 3 moyi."],
    best: 2, why: "Qo‘shimcha variant va kichik sinov — xavfsiz “ha”." },
  { say: "Mijozlar bu brendni so‘ramaydi.", ctx: "Avtodo‘kon egasi.",
    o: ["Usta tavsiya qilsa, mijoz oladi. Ustalaringizga qisqa taqdimot qilib, polkaga tanlash jadvalini qo‘yaman.", "Reklama ko‘paysa so‘rashadi.", "Unda boshqa do‘konga boraman."],
    best: 0, why: "Talab usta va polka orqali yaratiladi." },
  { say: "O‘ylab ko‘raman.", ctx: "STO egasi, taqdimotdan keyin.",
    o: ["Yaxshi, xayr.", "Albatta. Nimani o‘ylab ko‘rmoqchisiz — narxnimi, sifatnimi yoki shartlarnimi?", "O‘ylashga vaqt yo‘q, hozir oling!"],
    best: 1, why: "Asl sababni topish — keyingi qadamning kaliti." },
  { say: "Pul yo‘q hozir.", ctx: "Doimiy mijoz, to‘lov kuni.",
    o: ["Tushunaman. Bugun qancha qismini qila olasiz? Qolgani uchun aniq sanani belgilaylik.", "Mayli, qachon bo‘lsa to‘laysiz.", "Unda tovaringizni olib ketaman."],
    best: 0, why: "Qisman to‘lov + aniq sana — jarayonni oldinga suradi va munosabatni saqlaydi." },
  { say: "Keyin keling, hozir band.", ctx: "Ish qizg‘in paytdagi STO.",
    o: ["Mayli, keyinroq kelaman.", "2 daqiqa, iltimos, juda muhim!", "Tushunaman. Payshanba 10:00 yoki 15:00 — qaysi biri qulay?"],
    best: 2, why: "Aniq vaqt bilan muqobil tanlov — keyingi uchrashuvni kafolatlaydi." },
  { say: "Bu moy soxta emasmi? Hozir bozorda soxtasi ko‘p.", ctx: "Ehtiyotkor turdagi mijoz.",
    o: ["Yo‘q, bizda hammasi original, ishoning.", "Juda to‘g‘ri savol. Biz rasmiy distribyutormiz: partiya hujjatlari va sertifikatlarni ko‘rsataman, kanistradagi lot raqamini ham tekshirish mumkin.", "Soxta bo‘lsa pulingizni qaytaraman."],
    best: 1, why: "Ehtiyotkor mijozga faktlar va hujjatlar kerak, so‘z emas." },
  { say: "HC-sintetik — bu soxta sintetika-ku.", ctx: "Texnikani biladigan usta.",
    o: ["Ha, aslida mineral.", "Bu chuqur gidrokreking qilingan III guruh baza moyi: issiq va eskirishga chidamli. Shuning uchun zamonaviy dvigatellar talablariga javob beradi.", "Farqi yo‘q, hammasi bir xil."],
    best: 1, why: "Ustaga texnik jihatdan aniq va halol javob kerak." },
  { say: "Hammasi nemis moyimi?", ctx: "Yangi mijoz, kanistralarni ko‘ryapti.",
    o: ["Ha, hammasi Germaniyaniki.", "MITANOL — Germaniya, Golden Booster — Koreya, Liman Oil — Turkiya. Mashinalaringizga qarab mosini tanlaymiz.", "Bilmayman, ombordan so‘rayman."],
    best: 1, why: "Kelib chiqishi haqida faqat haqiqat. Yolg‘on bir marta ochilsa — ishonch yo‘qoladi." },
  { say: "Avtomatimga oddiy ATF quysam bo‘ladimi? Menda variator.", ctx: "Haydovchi do‘konda.",
    o: ["Ha, farqi yo‘q.", "Variator (CVT) uchun maxsus suyuqlik kerak — ATF CVT. Oddiy ATF variatorni buzishi mumkin.", "Yarmini ATF, yarmini CVT quying."],
    best: 1, why: "ATF, CVT va DCT — har xil suyuqliklar, ularni almashtirib bo‘lmaydi." },
  { say: "Raqobatchingiz 5% arzonroq berayapti.", ctx: "Ulgurji xaridor.",
    o: ["Unda biz 10% arzon beramiz.", "Ular yomon sifat beradi.", "Tushunaman. Narxdan tashqari nimalar muhim: yetkazish tezligi, assortiment kengligi, to‘lov shartlari? Keling, umumiy foydani solishtiraylik."],
    best: 2, why: "Umumiy qiymatni (servis, assortiment, shartlar) ko‘rsating; narx urushi hech kimga foyda bermaydi." },
  { say: "Oxirgi marta tovar kechikdi, endi ishonmayman.", ctx: "Yo‘qolgan mijoz.",
    o: ["Bu ombor xatosi, men aybdor emasman.", "Haqsiz, bu bizning xatomiz. Endi yetkazish jadvali aniq. Sinov buyurtmasi bilan qayta boshlaylik — kechiksa, men shaxsan javob beraman.", "Boshqa kompaniyalarda ham kechikadi."],
    best: 1, why: "Xatoni tan olish va aniq kafolat — ishonchni qaytaradi." },
  { say: "Bizga faqat eng arzoni kerak.", ctx: "Kichik shoxobcha.",
    o: ["Arzon moy yo‘q bizda, xayr.", "Tushunaman. Sizning mijozlaringiz qaysi mashinalarda? Shunga qarab narx/sifat muvozanati eng yaxshi variantni tanlaymiz — masalan, Liman Oil 10W-40.", "Arzon moy dvigatelni buzadi, olmang."],
    best: 1, why: "Ehtiyojni aniqlang va portfeldagi mos segmentni taklif qiling." },
  { say: "Ustamiz boshqa moyni yaxshi ko‘radi.", ctx: "STO egasi.",
    o: ["Ustangiz bilan 10 daqiqa gaplashsam bo‘ladimi? Uning fikrini eshitib, namunani berib ketaman.", "Ustangiz noto‘g‘ri o‘ylaydi.", "Unda ustani almashtiring."],
    best: 0, why: "Ustani ittifoqchi qiling — u eng kuchli tavsiyachi." }
];
