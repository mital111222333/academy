/* =========================================================
   MAHSULOTLAR KATALOGI
   ---------------------------------------------------------
   Narxlar ko‘rsatilmaydi (ular o‘zgaradi).
   Yangi mahsulot qo‘shish: products ro‘yxatiga yangi obyekt qo‘shing,
   rasmni assets/img/products/ ga joylang.

   cat: "motor-yengil" | "motor-yuk" | "transmissiya"
   base: "HC-sintetik" | "Sintetik" | "Yarim sintetik" | "To‘liq sintetik"
   oem: ishlab chiqaruvchi hujjatidagi "Tavsiyalar / talablarga javob beradi"
        ro‘yxati (rasmiy dopusk bilan aralashtirmang).
   ========================================================= */
window.CATALOG = {
  brands: {
    MITANOL: { name: "MITANOL", origin: "Germaniya", flag: "DE", note: "MITAN zavodi, 1921-yildan" },
    GB:      { name: "Golden Booster", origin: "Janubiy Koreya", flag: "KR", note: "ISO 9001 / 14001" },
    LIMAN:   { name: "Liman Oil", origin: "Turkiya", flag: "TR", note: "ISO 9001 / 14001 / 45001" }
  },
  cats: {
    "motor-yengil": "Yengil avto motor moylari",
    "motor-yuk": "Yuk / dizel texnika",
    "transmissiya": "Transmissiya"
  },
  products: [
    /* ================= MITANOL — YENGIL ================= */
    {
      id: "xf-0w20", brand: "MITANOL", line: "X-Force", cat: "motor-yengil",
      name: "X-Force 0W-20 Advance", sae: "0W-20", base: "HC-sintetik",
      img: "x-force-0w-20-advance.jpg", volumes: ["4 L", "5 L"],
      specs: ["API SQ (RC)", "API SP (RC)", "ILSAC GF-7A", "ILSAC GF-5/GF-6A"],
      oem: ["GM dexos1™ Gen 3", "Ford WSS-M2C947-A/B1", "Ford WSS-M2C962-A", "Fiat 9.55535-GSX/-CR1", "Chrysler MS-6395", "GM 6094M", "Toyota, Lexus, Honda, Hyundai, KIA, Nissan, Mazda, Subaru, Suzuki, Daihatsu, Isuzu (zarur hollarda)"],
      short: "Zamonaviy benzinli dvigatellar uchun past ishqalanishli HC-sintetik moy — ishlab chiqaruvchi 0W-20 talab qilgan joyda.",
      benefits: ["Sovuq startda eng tez moylash", "Yoqilg‘i tejamkorligi (RC, GF-7A)", "Kuyindi va qora loydan himoya, dvigatel tozaligi", "Eng yangi API SQ talablariga javob beradi"],
      forWhom: ["Toyota, Lexus, Honda, Hyundai, Kia — 0W-20 talab qilinadigan modellar", "Gibrid va yangi avlod benzinli dvigatellar"],
      notFor: ["Dizel dvigatellar uchun mos emas", "Qo‘llanmada 0W-20 ko‘rsatilmagan eski dvigatellar"],
      say: "Mashinangiz qo‘llanmasida 0W-20 yozilgan bo‘lsa — bu aynan shu dvigatel uchun. Eng yangi API SQ standarti, sovuqda ham, issiqda ham himoya va yoqilg‘i tejamkorligi."
    },
    {
      id: "xf-5w30-dx1", brand: "MITANOL", line: "X-Force", cat: "motor-yengil",
      name: "X-Force 5W-30 DX1", sae: "5W-30", base: "HC-sintetik",
      img: "x-force-5w-30-dx1.jpg", volumes: ["4 L", "5 L"],
      specs: ["API SQ", "API SP (RC)", "ILSAC GF-7A", "ILSAC GF-5/GF-6A"],
      oem: ["GM dexos1™ Gen 3", "GM 6094M", "Chrysler MS-6395", "Fiat 9.55535-CR1", "Ford WSS-M2C929-A", "Ford WSS-M2C946-A/-B1", "Ford WSS-M2C961-A", "VWC 53034", "Honda, Kia, Lexus, Mazda, Nissan, Subaru, Suzuki, Toyota, Daihatsu, Isuzu"],
      short: "GM dexos1 Gen 3 talabi uchun ishlab chiqilgan yuqori samarali moy. Turbo va GDI dvigatellarni LSPI dan himoya qiladi.",
      benefits: ["LSPI (past aylanishda muddatidan oldin alangalanish) xavfini kamaytiradi", "Turbo va to‘g‘ridan-to‘g‘ri purkashli dvigatellar uchun", "Benzin, etanol (E85 gacha), propan va tabiiy gaz dvigatellarida yil davomida", "Eski ILSAC/API darajalariga ham mos (GF-5, SN, SN Plus)"],
      forWhom: ["Chevrolet Tracker, Onix, Malibu va boshqa GM turbo dvigatellari", "Gaz ballonli (metan/propan) benzinli avtomobillar", "Zamonaviy Koreya, Yaponiya va Xitoy benzinli avtomobillari"],
      notFor: ["Dizel dvigatellar uchun mos emas"],
      say: "Yangi Chevrolet turbo dvigatellari GM dexos1 Gen 3 talab qiladi — DX1 aynan shu talab uchun yaratilgan. Gazda yuradigan mashinalarga ham rasman tavsiya etiladi."
    },
    {
      id: "xf-5w40", brand: "MITANOL", line: "X-Force", cat: "motor-yengil",
      name: "X-Force 5W-40 Advance", sae: "5W-40", base: "HC-sintetik",
      img: "x-force-5w-40-advance.jpg", volumes: ["4 L", "5 L"],
      specs: ["ACEA A3/B4", "API SN/CF"],
      oem: ["BMW Longlife-01", "MB 229.3", "VW 502 00 / 505 00", "Renault RN 0700 / RN 0710", "PSA B71 2296", "Opel GM-LL-B-025", "Porsche A40", "Fiat 9.55535-M2"],
      short: "Talabchan benzin va dizel yengil avtomobillar uchun HC-sintetik 5W-40. Uzaytirilgan oraliqda ham yuqori himoya.",
      benefits: ["Yeyilishga qarshi kuchaytirilgan himoya", "Uzaytirilgan almashtirish oralig‘ida ham dvigatel tozaligi", "Past sovuq yopishqoqlik + ishonchli issiq plyonka", "Turbo va to‘g‘ridan-to‘g‘ri purkashli dvigatellarga mos"],
      forWhom: ["Mercedes-Benz, BMW, VW, Audi, Opel, Renault, Peugeot — benzin va dizel (DPF siz)", "Issiq iqlimda og‘ir yuklamada ishlaydigan yengil avtomobillar"],
      notFor: ["Low SAPS (ACEA C) talab qilinadigan DPF li dizellar uchun asosiy tanlov emas"],
      say: "Yevropa avtomobillari uchun: MB 229.3, VW 502/505, BMW LL-01 talablariga javob beradi. Issiqda ham moy plyonkasi ishonchli."
    },
    {
      id: "mf-10w40", brand: "MITANOL", line: "M-Force", cat: "motor-yengil",
      name: "M-Force 10W-40 Advance", sae: "10W-40", base: "Yarim sintetik",
      img: "m-force-10w-40-advance.jpg", volumes: ["5 L"],
      specs: ["ACEA A3/B4", "API SN/CF"],
      oem: ["MB 229.3", "VW 502 00 / 505 00"],
      short: "Yarim sintetik yuqori samarali 10W-40: barqaror yopishqoqlik, kam bug‘lanish, toza porshenlar.",
      benefits: ["Butun xizmat muddati davomida yopishqoqlik saqlanadi", "Kuyindi, lak va loy hosil bo‘lishini oldini oladi", "Kam bug‘lanish — moy kam kamayadi", "Turbo va katalizatorli versiyalarga mos"],
      forWhom: ["Katta yurgan (probegi ko‘p) benzin va dizel yengil avtomobillar", "Damas, Nexia, Lacetti kabi mashinalar — qo‘llanma 10W-40 ga ruxsat bersa"],
      notFor: ["0W-20 / 5W-30 talab qilinadigan zamonaviy dvigatellar"],
      say: "Probegi katta mashinalar uchun ideal: moy kam kamayadi, dvigatel toza qoladi, issiqda ham ishonchli."
    },
    {
      id: "sf-5w30", brand: "MITANOL", line: "S-Force", cat: "motor-yengil",
      name: "S-Force 5W-30 Classic", sae: "5W-30", base: "HC-sintetik",
      img: "s-force-5w-30-classic.jpg", volumes: ["4 L", "5 L", "208 L"],
      specs: ["ACEA A3/B4", "API SL/CF"],
      oem: ["MB 229.1", "VW 501 01 / 505 00"],
      short: "Universal HC-sintetik 5W-30: ajoyib sovuq start, yeyilish, korroziya va ko‘pikdan himoya.",
      benefits: ["Sovuq startda optimal moylash", "Yeyilish va korroziyadan kuchli himoya", "Yuqori va barqaror yopishqoqlik indeksi", "208 L bochkada ham bor — STO va avtoparklar uchun qulay"],
      forWhom: ["Chevrolet Cobalt, Nexia, Gentra, Spark kabi ommabop mashinalar (qo‘llanmaga ko‘ra)", "Benzin va dizel yengil avtomobillar, furgonlar, turbo versiyalar"],
      notFor: ["API SP/SQ yoki dexos1 Gen 3 talab qilinadigan yangi turbo GDI dvigatellar — ularga X-Force DX1"],
      say: "Ommabop mashinalar uchun ishonchli universal 5W-30. Bochkada ham olsangiz bo‘ladi — har bir quyishda tejaysiz."
    },
    {
      id: "sf-10w40", brand: "MITANOL", line: "S-Force", cat: "motor-yengil",
      name: "S-Force 10W-40 Classic", sae: "10W-40", base: "Yarim sintetik",
      img: "s-force-10w-40-classic.jpg", volumes: ["4 L", "5 L", "208 L"],
      specs: ["ACEA A3/B4", "API SL/CF"],
      oem: ["MB 229.1", "VW 505 00", "PSA B71 2296", "Renault RN 0700"],
      short: "Yarim sintetik 10W-40: kuyindi va loydan himoya, barqaror yopishqoqlik, turbo va turbosiz dvigatellar uchun.",
      benefits: ["Butun oraliq davomida barqaror yopishqoqlik", "Porshen va halqalar tozaligi", "Kam bug‘lanish", "208 L bochka varianti"],
      forWhom: ["Katta yurgan benzin va dizel avtomobillar", "Moy almashtirish shoxobchalari (bochkadan quyish)"],
      notFor: ["Past yopishqoqlik talab qilinadigan zamonaviy dvigatellar"],
      say: "Probegi katta mashinalar uchun ishonchli 10W-40. Bochkada olish — shoxobcha uchun eng foydali variant."
    },
    {
      id: "xf-10w60", brand: "MITANOL", line: "X-Force", cat: "motor-yengil",
      name: "X-Force 10W-60 Classic", sae: "10W-60", base: "HC-sintetik",
      img: "x-force-10w-60-classic.jpg", volumes: ["5 L"],
      specs: ["ACEA A3/B4", "API SN/CF"],
      oem: [],
      short: "Yuqori yuklamalar uchun qalin plyonkali HC-sintetik 10W-60: sport, yo‘ltanlamas va 4 taktli mototsikllar.",
      benefits: ["Juda yuqori haroratda ham qalin moy plyonkasi", "Turbo dizel va katalizatorli versiyalarga mos", "4 taktli mototsikllar va yo‘ltanlamaslar uchun ham"],
      forWhom: ["Sport rejimida yuradigan va 10W-60 talab qilinadigan dvigatellar", "Yo‘ltanlamaslar (og‘ir sharoit), 4T mototsikllar"],
      notFor: ["Oddiy shahar avtomobillari — 10W-60 qo‘llanmada bo‘lmasa"],
      say: "Faqat qo‘llanmada 10W-60 bo‘lsa yoki texnika juda og‘ir sharoitda ishlasa. Oddiy mashinaga “qalinroq yaxshi” deb tavsiya qilmang."
    },
    /* ================= MITANOL — YUK / DIZEL ================= */
    {
      id: "turbo-10w40-la", brand: "MITANOL", line: "Turbo", cat: "motor-yuk",
      name: "Turbo 10W-40 Advance LA", sae: "10W-40", base: "HC-sintetik",
      img: "turbo-10w-40-advance-la.jpg", volumes: ["20 L"],
      specs: ["ACEA E7/E8/E11", "API CK-4", "Low SAPS"],
      oem: ["CAT ECF-3", "Cummins CES 20086", "DAF HP-2", "Deutz DQC IV-18 LA", "JASO DH-2", "John Deere JDQ-78X", "MAN M 3775 / M 3575 / M 3271-1 / M 3477", "Mack EOS-4.5", "MB 228.51", "MTU Type 3.1", "Renault Truck RXD/RGD", "Scania LA", "Volvo VDS-4.5", "Volvo CNG"],
      short: "Euro V–VI tijorat dizellari uchun kam kulli (Low SAPS) HC-sintetik moy: DPF/SCR tizimlarini himoya qiladi.",
      benefits: ["Chiqindi gazlarni qayta ishlash tizimlarini uzoq vaqt saqlaydi", "Ajoyib oksidlanish va yuqori harorat barqarorligi", "Juda past haroratda ham ishonchli start", "Yoqilg‘i va moy sarfini kamaytiradi"],
      forWhom: ["Euro V / Euro VI yuk mashinalari (MAN, Mercedes, Volvo, Scania, DAF)", "Zamonaviy avtobuslar va maxsus texnika"],
      notFor: ["Benzinli yengil avtomobillar"],
      say: "Euro V–VI yuk mashinangizning sajevoy filtri va SCR tizimi qimmat. Bu Low SAPS moy ularni himoya qiladi va oraliqni uzaytiradi."
    },
    {
      id: "turbo-10w40", brand: "MITANOL", line: "Turbo", cat: "motor-yuk",
      name: "Turbo 10W-40 Advance", sae: "10W-40", base: "Yarim sintetik",
      img: "turbo-10w-40-advance.jpg", volumes: ["20 L"],
      specs: ["ACEA E7", "ACEA A3/B4", "API CI-4 / SL"],
      oem: ["Allison C4", "Caterpillar ECF-1a / ECF-2", "Cummins CES 20077 / 20078", "DAF", "Deutz DQC III-05", "Global DHD-1", "JASO DH-1", "Mack EO-M Plus / EO-N", "MAN M 3275", "Renault Truck RLD / RLD-2", "Voith A", "Volvo VDS-3"],
      short: "Aralash avtopark uchun universal moy: yuk dizellari va benzin/dizel yengil avtomobillar — bitta moy.",
      benefits: ["Bitta moy bilan butun park — chalkashlik yo‘q, ombor tejaladi", "Yuqori bosim va yeyilishdan himoya", "Uzoq almashtirish oralig‘i", "Yil davomida, muammosiz sovuq start"],
      forWhom: ["Aralash avtoparklar (yuk + yengil)", "Qurilish va tijorat texnikasi, turbo va turbosiz"],
      notFor: ["DPF li Euro VI dizellar — ularga LA versiyasi"],
      say: "Parkingizda yuk ham, yengil ham bo‘lsa — bitta moy. Ombor oddiy, xato quyish xavfi yo‘q."
    },
    {
      id: "turbo-15w40-la", brand: "MITANOL", line: "Turbo", cat: "motor-yuk",
      name: "Turbo 15W-40 Advance LA", sae: "15W-40", base: "Yarim sintetik",
      img: "turbo-15w-40-advance-la.jpg", volumes: ["20 L"],
      specs: ["ACEA E6/E7/E9", "API CK-4/SN", "Global DHD-1", "JASO DH-2"],
      oem: ["Caterpillar ECF-3 / ECF-2 / ECF-1", "Cummins CES 20081", "Deutz DQC III-10 LA", "DDC 93K218", "Ford WSS-M2C171-F1", "MAN M 3575 / M 3275", "Mack EO-O Premium Plus", "MB 228.51 / 228.31", "MTU Type 2.1", "Renault VI RLD-3", "Volvo VDS-4"],
      short: "Euro IV–VI tijorat dizellari uchun barcha mavsum moyi; DPF bilan va DPF siz dvigatellarga mos.",
      benefits: ["Turbo va zaryadlangan havoni sovutishli dvigatellardagi og‘ir yuklamaga chidamli", "DPF bilan ham, DPF siz ham", "Aralash park: dizel va benzin", "Uzaytirilgan almashtirish oralig‘i uchun"],
      forWhom: ["Euro IV, V, VI yuk mashinalari", "Tijorat va yengil dizellar, aralash flot"],
      notFor: ["0W/5W talab qilinadigan zamonaviy yengil avtomobillar"],
      say: "Yuk parki uchun CK-4 darajasidagi universal 15W-40: sajevoy filtrli va filtrsiz mashinalarga birdek mos."
    },
    {
      id: "turbo-15w40", brand: "MITANOL", line: "Turbo", cat: "motor-yuk",
      name: "Turbo 15W-40 Classic", sae: "15W-40", base: "Ko‘p navli (multigrade)",
      img: "turbo-15w-40-classic.jpg", volumes: ["20 L"],
      specs: ["ACEA E7", "ACEA A3/B4", "API CI-4 / SL"],
      oem: ["MB 229.1", "MB 228.3", "Cummins CES 20076 / 20077 / 20078", "MAN M 3275-1", "Mack EO-N / EO-M Plus", "Renault Truck RLD / RLD-2", "Caterpillar ECF-1a / ECF-2", "MTU Type 2", "JASO DH-1", "Volvo VDS-3"],
      short: "Kuchli yuklangan dizel va benzin dvigatellari uchun ko‘p navli 15W-40 — klassik yuk texnikasi uchun.",
      benefits: ["Qirqilishga chidamli qo‘shimchalar — 15W-40 butun oraliqda saqlanadi", "Yuqori ish haroratida to‘liq moylash", "Uzaytirilgan oraliq uchun mos"],
      forWhom: ["Euro II–III va klassik yuk mashinalari, traktor va maxsus texnika", "Tijorat va yengil dizellar"],
      notFor: ["DPF/SCR li Euro VI dizellar — ularga LA versiyalari"],
      say: "Klassik yuk texnikasi uchun ishonchli 15W-40, CI-4 darajasi. Narx va sifatning to‘g‘ri muvozanati."
    },
    /* ================= MITANOL — TRANSMISSIYA ================= */
    {
      id: "atf-dex6", brand: "MITANOL", line: "ATF", cat: "transmissiya",
      name: "ATF Dexron VI", sae: "ATF", base: "HC-sintetik",
      img: "atf-dexron-vi.jpg", volumes: ["5 L", "20 L"],
      specs: ["DEXRON® VI"],
      oem: ["DEXRON® III G/H, II D/E (orqaga mos)", "Aisin Warner AW-1 / JWS 3324", "Toyota WS", "Hyundai/Kia SP-IV / SPH-IV", "Mercon LV", "MB 236.12 / 236.14 / 236.41", "Honda/Acura DW-1", "Nissan Matic-S", "Mitsubishi ATF-J3 / Dia-Queen ATF-PA", "Mazda FW 6A EL / FZ", "VW/Audi G 055 540 / G 060 162", "ZF Lifeguardfluid 5/6", "BMW 83 22 2 163 514"],
      short: "Avtomat uzatmalar qutisi uchun HC-sintetik ATF: oddiy ATF ga nisbatan ikki baravar uzoq xizmat.",
      benefits: ["Juda yuqori yopishqoqlik indeksi", "Past haroratda ham yumshoq almashinish", "Ko‘pik yo‘q, yuqori issiqlik va oksidlanish barqarorligi", "Gidrokuchaytirgich va gidravlik tizimlarda ham"],
      forWhom: ["Klassik (gidromexanik) avtomat qutilar", "2006-yildan keyingi Hydramatic qutili GM avtomobillari", "Rul gidrokuchaytirgichi"],
      notFor: ["CVT (variator) va DCT (robot) qutilar"],
      say: "Klassik avtomat quti uchun: Dexron VI va Toyota WS, Hyundai SP-IV kabi ko‘plab talablar. Lekin variator va robotga emas!"
    },
    {
      id: "atf-dct", brand: "MITANOL", line: "ATF", cat: "transmissiya",
      name: "ATF DCT", sae: "DCT", base: "HC-sintetik",
      img: "atf-dct.jpg", volumes: ["1 L"],
      specs: ["API GL-4"],
      oem: ["VW / Audi / Skoda / Seat DSG (ho‘l mufta) G 052 182 / G 052 529 / G 055 529", "BMW DCTF-1 / DCTF-2", "Ford WSS-M2C936-A", "Hyundai/Kia DCT", "MB 236.21 / 236.22", "Porsche PDK", "Renault EDC", "Volvo Powershift", "Chery 7DCT300 / 7DCT380", "Great Wall 7DCT450", "Mitsubishi SSTF-1", "Nissan GR6"],
      short: "Ikki muftali (ho‘l mufta) robot uzatmalar qutisi uchun universal HC-sintetik moy.",
      benefits: ["Yuqori va past haroratda barqaror ishqalanish koeffitsienti", "Ajoyib yeyilish himoyasi", "Yuqori qarish va oksidlanish barqarorligi"],
      forWhom: ["Ho‘l ikki muftali DCT/DSG qutilar (VW, BMW, Hyundai, Chery, Haval va b.)"],
      notFor: ["Quruq muftali DSG (0AM, 02M, 02Q, 02S)", "Bosqichli avtomat va CVT", "Boshqa tishli moylar bilan aralashtirmang"],
      say: "Robot qutingiz ho‘l muftalimi? Unda ATF DCT. Quruq muftali DSG ga emas — avval quti turini aniqlaymiz."
    },
    {
      id: "atf-cvt", brand: "MITANOL", line: "ATF", cat: "transmissiya",
      name: "ATF CVT", sae: "CVT", base: "HC-sintetik",
      img: "atf-cvt.jpg", volumes: ["1 L"],
      specs: ["CVT fluid", "JASO M358"],
      oem: ["Nissan NS-1 / NS-2 / NS-3", "Toyota CVTF TC / FE", "Honda HCF-2 / HMMF", "Hyundai/Kia SP-III / CVT-J1", "Mitsubishi CVT J1 / J4", "Subaru Lineartronic CVTF / CVTF II / iCVT", "Suzuki CVTF TC / CVT Green", "GM DEX-CVT", "Ford CVT23 / CVT30", "Daihatsu Amix CVT", "VW G 052 180 / 052 516"],
      short: "Po‘lat kamar yoki zanjirli variatorlar (CVT) uchun universal HC-sintetik suyuqlik.",
      benefits: ["Metall–metall ishqalanishida ajoyib moment uzatish", "Silliq, tebranishsiz harakat", "Maksimal xizmat muddati uchun yeyilish himoyasi"],
      forWhom: ["Nissan, Toyota, Honda, Subaru, Mitsubishi, Hyundai/Kia CVT variatorlari"],
      notFor: ["Gibrid CVT (Honda/Ford)", "DCT/DSG", "Bosqichli avtomat quti", "Boshqa moylar bilan aralashtirmang"],
      say: "Variator uchun maxsus suyuqlik: kamar sirpanmaydi, harakat silliq. Oddiy ATF ni variatorga quyib bo‘lmaydi."
    },
    {
      id: "syngear-75w90", brand: "MITANOL", line: "Syngear", cat: "transmissiya",
      name: "Syngear 75W-90", sae: "75W-90", base: "To‘liq sintetik",
      img: "syngear-75w-90.jpg", volumes: ["1 L"],
      specs: ["API GL-4 / GL-5", "MT-1", "MIL-L-2105 D/E"],
      oem: ["ZF TE-ML 02B, 05B, 07A, 12B, 16F, 17B, 19C, 21B", "MB 235.8 / 235.11", "MAN 342 Type S1/S2", "Volvo 97312 / 97315", "Scania STO 1:0", "VW 501 50", "BMW OSP / SAF-XO", "DAF, Iveco, Mack GO-J, Renault Truck"],
      short: "Mexanik qutilar va gipoid ko‘priklar uchun to‘liq sintetik tishli moy — butun uzatish tizimi uchun bitta moy.",
      benefits: ["Sovuqda ajoyib xususiyatlar va shovqinni kamaytirish", "Juda yuqori termal va kesish barqarorligi", "Kuchli korroziya himoyasi", "Uzaytirilgan almashtirish oralig‘i, quti resursi uzayadi"],
      forWhom: ["Yengil va tijorat avtomobillarining mexanik qutilari", "Gipoid ko‘priklar va uzatmalar qutisi (Total Drive Line)"],
      notFor: ["Avtomat, CVT va DCT qutilar"],
      say: "Mexanik quti va ko‘prik uchun bitta moy: GL-4 ham, GL-5 ham. Avtoparklar va STO uchun qulay."
    },
    /* ================= GOLDEN BOOSTER (KOREYA) ================= */
    {
      id: "gb-red-5w30", brand: "GB", line: "RED", cat: "motor-yengil",
      name: "Golden Booster RED 5W-30 SQ", sae: "5W-30", base: "Sintetik",
      img: "golden-booster-red-5w-30-sq.jpg", volumes: ["4 L"],
      specs: ["API SQ", "ACEA A3/B4", "ACEA A5/B5"],
      oem: ["MB 229.3 / 229.5", "BMW Longlife-01", "VW 502 00 / 505 00", "Toyota, Lexus, Honda, Nissan, Mitsubishi, Mazda, Subaru, Suzuki, Hyundai, Kia, Opel, Volvo, Chery, Geely, BYD, Haval"],
      short: "Eng yangi API SQ standartidagi premium sintetik moy: LSPI himoyasi, turbo va GDI dvigatellar uchun.",
      benefits: ["LSPI dan ishonchli himoya", "Kuchaytirilgan himoya qatlami — detallar kam yeyiladi", "Shovqinsiz va silliq ishlash", "ISO 9001:2015, ISO 14001:2015"],
      forWhom: ["Zamonaviy Koreya, Yaponiya va Xitoy avtomobillari (Kia, Hyundai, BYD, Chery, Haval, Geely)", "Turbo va GDI benzinli dvigatellar"],
      notFor: ["0W-20 talab qilinadigan dvigatellar — ularga X-Force 0W-20"],
      say: "Eng yangi API SQ standarti — 2025-yilgi talab. Turbo dvigatelli Koreya va Xitoy mashinalari uchun eng zamonaviy himoya."
    },
    {
      id: "gb-red-10w40", brand: "GB", line: "RED", cat: "motor-yengil",
      name: "Golden Booster RED 10W-40 SQ", sae: "10W-40", base: "Yuqori unumdorlik",
      img: "golden-booster-red-10w-40-sq.jpg", volumes: ["4 L"],
      specs: ["API SQ / CF", "ILSAC GF-7", "ACEA A3/B3, A3/B4"],
      oem: ["MB 229.1", "Renault RN 0700", "VW 501 01 / 502 00 / 505 00", "Toyota, Lexus, Honda, Nissan, Mitsubishi, Mazda, Subaru, Suzuki, Hyundai, Kia, KGM (SsangYong), Opel, Volvo"],
      short: "API SQ/CF darajasidagi 10W-40: turbo va atmosfera benzin va dizel dvigatellari uchun kompleks himoya.",
      benefits: ["Oksidlanishga yuqori barqarorlik — uzoq xizmat", "LSPI kompleks himoyasi", "Yeyilish, zang va korroziyadan ishonchli to‘siq"],
      forWhom: ["10W-40 ishlatiladigan benzin va dizel avtomobillar", "Probegi katta, lekin yangi standartdagi moy xohlaydigan mijozlar"],
      notFor: ["0W-20 / 5W-30 talab qilinadigan zamonaviy dvigatellar"],
      say: "10W-40 ni xohlaydigan mijozga eng yangi API SQ darajasi — bozordagi oddiy 10W-40 lardan bir qadam yuqori."
    },
    {
      id: "gb-purple-5w30", brand: "GB", line: "PURPLE", cat: "motor-yengil",
      name: "Golden Booster PURPLE 5W-30 SN", sae: "5W-30", base: "Sintetik",
      img: "golden-booster-purple-5w-30-sn.jpg", volumes: ["4 L"],
      specs: ["API SN / CF", "ACEA A3/B3, A3/B4"],
      oem: ["MB 229.3", "BMW Longlife-01", "VW 502 00 / 505 00", "Toyota, Lexus, Honda, Nissan, Mitsubishi, Mazda, Subaru, Suzuki, Hyundai, Kia, KGM, Opel, Volvo, BYD, Chery, Geely, Haval"],
      short: "API SN sintetik 5W-30: oksidlanish, yeyilish va korroziyadan ishonchli kundalik himoya.",
      benefits: ["Yuqori haroratda ham eskirmaydi", "Mustahkam himoya qatlami — kam ishqalanish", "Dvigatel ichki qismlari tozaligi"],
      forWhom: ["Zamonaviy benzin va dizel avtomobillar, API SN darajasi yetarli bo‘lgan dvigatellar", "Kundalik shahar haydovchilari"],
      notFor: ["API SP/SQ yoki dexos1 Gen 3 talab qilinadigan yangi turbo GDI dvigatellar"],
      say: "Kundalik foydalanish uchun ishonchli sintetik 5W-30, Koreya sifati va ISO sertifikatlari."
    },
    {
      id: "gb-purple-10w40", brand: "GB", line: "PURPLE", cat: "motor-yengil",
      name: "Golden Booster PURPLE 10W-40 SN", sae: "10W-40", base: "Yarim sintetik / sintetik",
      img: "golden-booster-purple-10w-40-sn.jpg", volumes: ["4 L"],
      specs: ["API SN / CF", "ACEA A3/B3, A3/B4"],
      oem: ["MB 229.1", "Renault RN 0700", "VW 501 01 / 502 00 / 505 00", "Toyota, Lexus, Honda, Nissan, Mitsubishi, Mazda, Subaru, Suzuki, Hyundai, Kia, KGM, Opel, Volvo"],
      short: "API SN/CF 10W-40: turbo va atmosfera benzin va dizel dvigatellari uchun barqaror himoya.",
      benefits: ["Ajoyib oksidlanish barqarorligi — quyulmaydi", "Harakatlanuvchi qismlarni yeyilishdan himoya", "Zang va nagar hosil bo‘lishining oldini oladi"],
      forWhom: ["Probegi katta benzin va dizel avtomobillar", "10W-40 ishlatadigan servis va do‘konlar"],
      notFor: ["Past yopishqoqlik talab qilinadigan zamonaviy dvigatellar"],
      say: "10W-40 uchun ishonchli kundalik tanlov: issiqda quyulmaydi, dvigatelni toza saqlaydi."
    },
    {
      id: "gb-atf-lv", brand: "GB", line: "ATF", cat: "transmissiya",
      name: "Golden Booster ATF Multi LV", sae: "ATF LV", base: "To‘liq sintetik",
      img: "golden-booster-atf-multi-lv.jpg", volumes: ["4 L"],
      specs: ["100% Fully Synthetic", "Low Viscosity"],
      oem: ["Toyota / Lexus WS", "Nissan / Infiniti Matic S, Matic W", "Honda / Acura DW-1", "Hyundai / KIA SP-IV, SP-IV-RR, SP-IV M1, SPH-IV", "Mitsubishi Dia Queen ATF-MA1, SP-IV", "Mazda ATF FZ", "GM DEXRON VI", "Ford MERCON LV", "MB 236.12 / 236.14 / 236.15", "BMW ATF 3+"],
      short: "Zamonaviy 4–8 bosqichli avtomat qutilar uchun past yopishqoqlikdagi 100% sintetik ATF.",
      benefits: ["Past yopishqoqlik — qutidagi qarshilik kam, yoqilg‘i tejaladi", "Har qanday haroratda silliq almashinish", "4, 5, 6, 7 va 8 bosqichli qutilarga mos", "SUV va yengil tijorat transporti uchun ham"],
      forWhom: ["Toyota WS, Hyundai/Kia SP-IV, Nissan Matic S, Honda DW-1 talab qilinadigan avtomatlar", "Zamonaviy SUV va krossoverlar"],
      notFor: ["CVT va DCT qutilar"],
      say: "Koreya va Yaponiya avtomatlari uchun bitta universal ATF: Toyota WS, SP-IV, Matic S — hammasi bir kanistrada."
    },
    /* ================= LIMAN OIL (TURKIYA) ================= */
    {
      id: "liman-5w30-green", brand: "LIMAN", line: "GREEN", cat: "motor-yengil",
      name: "Liman Oil 5W-30 GREEN", sae: "5W-30", base: "To‘liq sintetik",
      img: "liman-5w-30-green.jpg", volumes: ["4 L"],
      specs: ["API SP"],
      oem: ["BMW Longlife-04", "MB 226.52 / 229.31 / 229.51 / 229.52", "VW 502 00 / 505 00 / 505 01 (<2017)", "Opel GM-LL-A-025 / GM-LL-B-025, OV 040 1547 D30/G30", "Ford WSS-M2C917-A", "Fiat 9.55535-S1 / S3", "Renault RN 0700 / RN 0710 / RN17", "PSA B71 2290", "Chrysler MS 11106", "Hyundai / Kia (SFU)"],
      short: "To‘liq sintetik 5W-30, API SP: Yevropa low SAPS talablari (MB 229.51/229.52, BMW LL-04) — DPF li dizellar uchun ham.",
      benefits: ["Yevropa avtozavodlarining keng talablar ro‘yxati", "Sajevoy filtr va katalizatorga mos (LL-04, 229.51/52)", "Zavod: ISO 9001, 14001, 45001"],
      forWhom: ["Yevropa avtomobillari: MB, BMW, VW, Opel, Renault, Peugeot — benzin va DPF li dizel", "Narx/sifat muvozanatini qidirgan mijozlar"],
      notFor: ["0W-20 talab qilinadigan dvigatellar"],
      say: "Yevropa mashinalari, jumladan sajevoy filtrli dizellar uchun: MB 229.51 va BMW LL-04 talablari. Turkiyada ISO sertifikatli zavodda ishlab chiqarilgan."
    },
    {
      id: "liman-10w40-green", brand: "LIMAN", line: "GREEN / GRASS", cat: "motor-yengil",
      name: "Liman Oil 10W-40 GREEN", sae: "10W-40", base: "Yarim sintetik",
      img: "liman-10w-40-green.jpg", volumes: ["4 L"],
      specs: ["API SN / SF", "ACEA A3/B4"],
      oem: ["MB 228.5 / 229.1 / 229.3", "VW 500 00 / 501 01 / 502 00 / 505 00", "Renault RN 0700 / 0710", "AvtoVAZ (Lada)", "Toyota, Lexus, Kia, Hyundai, BMW, Nissan, Mazda, Subaru, Audi (SFU)"],
      short: "Yarim sintetik 10W-40: ommabop va katta yurgan avtomobillar uchun ishonchli kundalik moy.",
      benefits: ["Keng mashinalar doirasiga mos", "API SN va ACEA A3/B4 darajasi", "Zavod sertifikatlari: ISO 9001, 14001, 45001"],
      forWhom: ["Probegi katta benzin va dizel avtomobillar", "Lada, Chevrolet va boshqa ommabop modellar (qo‘llanmaga ko‘ra)"],
      notFor: ["Past yopishqoqlik talab qilinadigan zamonaviy dvigatellar"],
      say: "Ommabop mashinalar uchun ishonchli 10W-40 — narx va sifat muvozanati."
    },
    {
      id: "liman-5w30-desert", brand: "LIMAN", line: "DESERT", cat: "motor-yengil",
      name: "Liman Oil 5W-30", sae: "5W-30", base: "To‘liq sintetik",
      img: "liman-5w-30-desert.jpg", volumes: ["4 L"],
      specs: ["API SP"],
      oem: ["BMW Longlife-04", "MB 226.52 / 229.31 / 229.51 / 229.52", "VW 502 00 / 505 00 / 505 01 (<2017)", "Opel GM-LL-A-025 / GM-LL-B-025", "Ford WSS-M2C917-A", "Fiat 9.55535-S1 / S3", "Renault RN 0700 / RN 0710 / RN17", "PSA B71 2290", "Chrysler MS 11106", "Hyundai / Kia (SFU)"],
      short: "To‘liq sintetik 5W-30, API SP — Yevropa low SAPS talablari bilan (ikkinchi dizayn liniyasi).",
      benefits: ["API SP darajasi", "Low SAPS talablari: MB 229.51/229.52, BMW LL-04", "ISO sertifikatli Turkiya zavodi"],
      forWhom: ["Yevropa benzin va DPF li dizel avtomobillari", "Zamonaviy yengil avtomobillar (qo‘llanmaga ko‘ra)"],
      notFor: ["0W-20 talab qilinadigan dvigatellar"],
      say: "API SP va Yevropa talablari bilan to‘liq sintetik 5W-30 — keng mashinalar doirasi uchun."
    },
    {
      id: "liman-10w40-desert", brand: "LIMAN", line: "DESERT", cat: "motor-yengil",
      name: "Liman Oil 10W-40", sae: "10W-40", base: "Yarim sintetik",
      img: "liman-10w-40-desert.jpg", volumes: ["4 L"],
      specs: ["API SN / SF", "ACEA A3/B4"],
      oem: ["MB 228.5 / 229.1 / 229.3", "VW 500 00 / 501 01 / 502 00 / 505 00", "Renault RN 0700 / 0710", "AvtoVAZ (Lada)", "Toyota, Lexus, Kia, Hyundai, BMW, Nissan, Mazda, Subaru, Audi (SFU)"],
      short: "Yarim sintetik 10W-40 (DESERT liniyasi) — issiq iqlim va katta yurish uchun kundalik moy.",
      benefits: ["API SN, ACEA A3/B4", "Keng mos keluvchi avtomobillar ro‘yxati", "ISO sertifikatli zavod"],
      forWhom: ["Katta yurgan benzin va dizel avtomobillar", "Moy almashtirish shoxobchalari va do‘konlar"],
      notFor: ["Past yopishqoqlik talab qilinadigan zamonaviy dvigatellar"],
      say: "Issiq iqlim va katta yurish uchun ishonchli 10W-40."
    },
    {
      id: "liman-atf-dex6", brand: "LIMAN", line: "ATF", cat: "transmissiya",
      name: "Liman Oil ATF Dexron VI", sae: "ATF", base: "To‘liq sintetik",
      img: "liman-atf-dexron-vi.jpg", volumes: ["5 L"],
      specs: ["DEXRON® VI", "JWS 3309", "JASO M315 1A"],
      oem: ["GM DEXRON VI, IIIH/IIIG/IIE/IID", "Ford MERCON LV", "Toyota T-IV / WS (JWS 3324)", "Hyundai/Kia SP-II / SP-III / SP-IV / SPH-IV", "Honda DW-1 / Z-1", "Nissan Matic D/J/K/S/W", "Mitsubishi ATF-J2/J3, SP-II/III", "Mazda FZ / M-III", "MB 236.5–236.12, 236.41", "VW/Audi G 060 162 / G 052 162 / G 055 540", "ZF TE-ML 11A/11B", "Volvo 1161521 / 1161540 / 1161640"],
      short: "To‘liq sintetik avtomat quti suyuqligi: juda keng avtozavodlar talablari ro‘yxati.",
      benefits: ["Keng OEM talablari — bitta mahsulot ko‘p mashinaga", "To‘liq sintetik baza", "ISO sertifikatli zavod"],
      forWhom: ["Klassik avtomat qutilar (GM, Toyota, Hyundai/Kia, Nissan, Honda va b.)"],
      notFor: ["CVT va DCT qutilar"],
      say: "Avtomat quti uchun universal to‘liq sintetik ATF — Toyota, Hyundai, Nissan, GM talablari bir kanistrada."
    }
  ]
};

/* =========================================================
   MOY TANLASH VOSITASI — qoidalar
   Javoblar: type, origin, age
   Natija: tavsiya etilgan mahsulot id lari (birinchisi — asosiy)
   ========================================================= */
window.PICKER = {
  questions: [
    { id: "type", title: "Nima uchun moy kerak?", opts: [
      ["benzin", "Yengil avto — benzin"],
      ["gaz", "Yengil avto — gaz (metan/propan)"],
      ["dizel", "Yengil avto — dizel"],
      ["yuk", "Yuk mashinasi / avtobus (dizel)"],
      ["akpp", "Avtomat quti (AKPP)"],
      ["cvt", "Variator (CVT)"],
      ["dct", "Robot quti (DCT/DSG)"],
      ["mkpp", "Mexanik quti / ko‘prik"]
    ]},
    { id: "origin", title: "Avtomobil / texnika", showIf: ["benzin", "gaz", "dizel", "yuk"], opts: [
      ["gm-new", "Chevrolet/GM — yangi turbo (Tracker, Onix, Malibu)"],
      ["gm-old", "Chevrolet — Cobalt, Nexia, Gentra, Spark, Damas, Lacetti"],
      ["asia", "Koreya / Yaponiya / Xitoy (Kia, Hyundai, Toyota, BYD, Chery...)"],
      ["asia-0w20", "Qo‘llanmada 0W-20 ko‘rsatilgan (Toyota, Hyundai, Kia, gibridlar)"],
      ["euro", "Yevropa (Mercedes, BMW, VW, Audi, Opel)"],
      ["euro-dpf", "Yevropa dizel — sajevoy filtr (DPF) bilan"],
      ["truck-new", "Yuk — Euro V/VI, DPF/SCR"],
      ["truck-old", "Yuk — Euro II–IV, klassik texnika"],
      ["truck-mix", "Aralash avtopark (yuk + yengil)"]
    ]},
    { id: "age", title: "Holati / yurishi", showIf: ["benzin", "gaz", "dizel"], opts: [
      ["new", "Yangi yoki 100 000 km gacha"],
      ["mid", "100 000 – 200 000 km"],
      ["old", "200 000 km dan ko‘p, moy kamayadi"]
    ]}
  ],
  /* qaytaradi: [{id, why}] */
  recommend: function (a) {
    var r = [];
    function add(id, why) { r.push({ id: id, why: why }); }
    var t = a.type, o = a.origin, g = a.age;

    if (t === "akpp") {
      add("atf-dex6", "Klassik avtomat: Dexron VI va ko‘plab OEM talablari");
      add("gb-atf-lv", "Zamonaviy 4–8 bosqichli avtomat: Toyota WS, SP-IV, Matic S");
      add("liman-atf-dex6", "To‘liq sintetik, keng talablar ro‘yxati");
      return r;
    }
    if (t === "cvt") { add("atf-cvt", "Po‘lat kamar/zanjirli variatorlar uchun maxsus suyuqlik (gibrid CVT ga emas)"); return r; }
    if (t === "dct") { add("atf-dct", "Ho‘l ikki muftali DCT/DSG uchun (quruq muftali DSG ga emas!)"); return r; }
    if (t === "mkpp") { add("syngear-75w90", "GL-4/GL-5, MT-1 — mexanik quti va gipoid ko‘priklar"); return r; }

    if (t === "yuk" || (o && o.indexOf("truck") === 0)) {
      if (o === "truck-new") {
        add("turbo-10w40-la", "Euro V/VI: Low SAPS, E11, CK-4 — DPF/SCR himoyasi");
        add("turbo-15w40-la", "CK-4, E9 — DPF bilan va DPF siz dvigatellar");
      } else if (o === "truck-mix") {
        add("turbo-10w40", "Aralash park uchun bitta moy: CI-4/SL, A3/B4");
        add("turbo-15w40-la", "Aralash flot, Euro IV–VI");
      } else {
        add("turbo-15w40", "Klassik yuk texnikasi: CI-4, E7");
        add("turbo-10w40", "Turbo va turbosiz, uzoq oraliq");
      }
      return r;
    }

    if (o === "asia-0w20") {
      add("xf-0w20", "Qo‘llanmadagi 0W-20 talabi uchun, API SQ / GF-7A");
      return r;
    }
    if (o === "euro-dpf") {
      add("liman-5w30-green", "Low SAPS: MB 229.51/229.52, BMW LL-04, VW 505 01");
      add("liman-5w30-desert", "Xuddi shu talablar, ikkinchi liniya");
      return r;
    }
    if (o === "euro") {
      if (t === "dizel") {
        add("xf-5w40", "DPF siz dizel: MB 229.3, VW 505 00, BMW LL-01");
        add("liman-5w30-green", "Agar DPF bo‘lsa — low SAPS talablari");
      } else {
        add("xf-5w40", "MB 229.3, VW 502 00, BMW LL-01, Porsche A40");
        add("gb-red-5w30", "API SQ, MB 229.5, BMW LL-01");
      }
      if (g === "old") add("mf-10w40", "Katta yurish: MB 229.3, VW 502/505, kam bug‘lanish");
      return r;
    }
    if (o === "gm-new") {
      add("xf-5w30-dx1", "GM dexos1 Gen 3 talabi, LSPI himoyasi" + (t === "gaz" ? ", gaz dvigatellari uchun ham tavsiya etilgan" : ""));
      add("gb-red-5w30", "API SQ, turbo GDI himoyasi");
      return r;
    }
    if (o === "gm-old") {
      if (g === "old") {
        add("mf-10w40", "Katta yurish: kam bug‘lanish, toza porshenlar");
        add("sf-10w40", "Yarim sintetik, bochkada ham bor");
        add("liman-10w40-desert", "Narx/sifat muvozanati");
      } else {
        if (t === "gaz") add("xf-5w30-dx1", "Gaz (metan/propan) dvigatellari uchun rasman tavsiya etilgan");
        add("sf-5w30", "Ommabop mashinalar uchun universal 5W-30, 208 L ham bor");
        add("liman-5w30-desert", "API SP, to‘liq sintetik");
        add("gb-purple-5w30", "API SN, kundalik himoya");
        if (g === "mid") add("sf-10w40", "Agar qo‘llanma 10W-40 ga ruxsat bersa va moy kamaya boshlagan bo‘lsa");
      }
      return r;
    }
    if (o === "asia") {
      if (g === "old") {
        add("gb-red-10w40", "10W-40 da eng yangi API SQ darajasi");
        add("gb-purple-10w40", "API SN, barqaror himoya");
        add("mf-10w40", "Kam bug‘lanish, katta yurish uchun");
      } else {
        add("gb-red-5w30", "API SQ, LSPI himoyasi — zamonaviy turbo/GDI");
        add("xf-5w30-dx1", "API SQ/SP, GF-7A" + (t === "gaz" ? ", gaz dvigatellari uchun tavsiya etilgan" : ""));
        add("gb-purple-5w30", "API SN, kundalik himoya");
      }
      return r;
    }
    /* standart */
    add("sf-5w30", "Universal 5W-30");
    add("mf-10w40", "Universal 10W-40");
    return r;
  }
};
