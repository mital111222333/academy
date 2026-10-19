/* 3-MODUL — B2B MIJOZLAR */
COURSE.modules.push({
  id: "m3", n: 3, week: 2,
  title: "B2B mijozlar",
  sub: "STO, do‘kon, shoxobcha va avtopark: kim qaror qiladi va nima istaydi",
  outcomes: [
    "6 turdagi B2B mijozning motivlarini bilasiz",
    "Qaror qabul qiluvchini topa olasiz va 4 xil xaridor turiga moslashasiz",
    "Har bir nuqta uchun mijoz pasportini to‘ldirasiz",
    "Xususiyat → Afzallik → Foyda formulasida gapirasiz"
  ],
  lessons: [
    {
      id: "m3l1", title: "Mijoz turlari va ularning motivlari", min: 12, video: "",
      blocks: [
        { t: "p", h: "B2B — biznesga sotish. Bizning mijozimiz moyni o‘zi uchun emas, <b>qayta sotish yoki xizmat ko‘rsatish</b> uchun oladi. Demak, uning asosiy savoli: “Bu menga qancha foyda keltiradi va muammo tug‘dirmaydimi?”" },
        { t: "ig", k: "clients" },
        { t: "call", k: "tip", title: "Bir gap bilan", h: "<p>Usta — <b>sifat va obro‘</b>, do‘kon — <b>marja va aylanma</b>, avtopark — <b>xarajat va ishonchlilik</b>, ulgurji — <b>hajm va shartlar</b>.</p>" },
        { t: "task", title: "Amaliy topshiriq", h: "O‘z bazangizdagi 10 ta nuqtani mijoz turlariga ajrating. Har biri uchun “asosiy motiv”ni bitta so‘z bilan yozing." }
      ],
      keys: [
        "B2B mijoz moyni qayta sotish yoki xizmat uchun oladi — u foyda haqida o‘ylaydi.",
        "Har bir mijoz turining o‘z motivi va o‘z argumenti bor.",
        "Taklifni mijoz turiga qarab tuzing."
      ],
      quiz: [
        { q: "Taksopark (avtopark) rahbari uchun eng muhim narsa nima?", o: ["Kanistraning dizayni", "Xarajatni kamaytirish va texnikaning ishonchli ishlashi", "Reklama plakati", "Brendning yoshi"], a: 1, why: "Avtopark uchun mashinaning to‘xtab qolishi — eng katta zarar." },
        { q: "STO ustasini nima ko‘proq qiziqtiradi?", o: ["Moy sifati va o‘z obro‘si (mijoz shikoyat qilmasligi)", "Faqat eng arzon narx", "Ombor hajmi", "Kompaniya ofisining joylashuvi"], a: 0, why: "Usta mijozga moy quyadi — sifat uning obro‘siga ta’sir qiladi." },
        { q: "Ulgurji xaridor bilan suhbatda asosiy mavzu qaysi?", o: ["Moyning rangi", "Hajm, narx shartlari, to‘lov muddati va yetkazib berish", "Dvigatel konstruksiyasi", "Kompaniya tarixi"], a: 1, why: "Ulgurji biznes hajm va shartlar bilan ishlaydi." }
      ]
    },
    {
      id: "m3l2", title: "Qaror qabul qiluvchi va xaridor psixologiyasi", min: 14, video: "",
      blocks: [
        { t: "p", h: "Nuqtada odatda bir necha kishi bor: <b>ega</b>, <b>usta</b>, <b>kassir/sotuvchi</b>. Ularning har biri qarorga ta’sir qiladi, lekin pulni bitta odam to‘laydi. Kim qaror qilishini birinchi tashrifdayoq aniqlang." },
        { t: "table", head: ["Kim", "Roli", "Siz bilan nima qilishi kerak"], rows: [
          ["Ega (direktor)", "Pul va shartlar bo‘yicha yakuniy qaror", "Foyda, marja, to‘lov shartlari haqida gapiring"],
          ["Usta (master)", "Qaysi moyni tavsiya qilishini belgilaydi", "Texnik argument, namunalar, o‘qitish"],
          ["Sotuvchi/kassir", "Polkadan qaysi moyni berishini belgilaydi", "Mahsulotni tushuntiring, savollariga javob bering, hurmat qiling"]
        ]},
        { t: "call", k: "rule", title: "Qoida", h: "<p>Ustani <b>dushman emas, ittifoqchi</b> qiling. Usta “bu moy yaxshi” desa — ega rozi bo‘ladi va xaridor ham oladi.</p>" },
        { t: "h", h: "4 xil xaridor turi" },
        { t: "p", h: "Odamlar har xil qaror qiladi. Mijozning turini tez aniqlab, gapirish uslubingizni moslang:" },
        { t: "ig", k: "buyer-types" },
        { t: "cmp",
          bad: ["Xato", "“Hisobchi” turidagi mijozga hissiy hikoyalar va “hamma oladi” degan gaplar."],
          good: ["To‘g‘ri", "“Hisobchi”ga raqamlar: marja, almashtirish oralig‘i, standartlar jadvali, sertifikatlar."] }
      ],
      keys: [
        "Ega, usta va sotuvchi — uchalasi ham qarorga ta’sir qiladi.",
        "Ustani ittifoqchi qiling — u eng kuchli tavsiyachi.",
        "4 tur: Lider, Do‘stona, Hisobchi, Ehtiyotkor — uslubni moslang."
      ],
      quiz: [
        { q: "Nuqtada qaysi moyni tavsiya qilishni ko‘pincha kim belgilaydi?", o: ["Qorovul", "Usta", "Qo‘shni do‘kon", "Yetkazib beruvchi haydovchi"], a: 1, why: "Usta mijozga maslahat beradi va moyni quyadi." },
        { q: "“Lider” turidagi mijoz bilan qanday gaplashish kerak?", o: ["Uzoq va batafsil hikoya qilish", "Qisqa, aniq, natija va foyda haqida", "Faqat do‘stona suhbat", "Qaror qilishiga ko‘p vaqt berish"], a: 1, why: "Lider vaqtini qadrlaydi va natijani eshitishni xohlaydi." },
        { q: "“Ehtiyotkor” mijozga eng kerakli narsa nima?", o: ["Kafolatlar, sinov partiyasi va boshqa mijozlar tajribasi", "Bosim va shoshilish", "Faqat chegirma", "Raqobatchini tanqid qilish"], a: 0, why: "Ehtiyotkor xavfdan qo‘rqadi — xavfni kamaytiring." }
      ]
    },
    {
      id: "m3l3", title: "Nuqtani o‘rganish va mijoz pasporti", min: 12, video: "",
      blocks: [
        { t: "p", h: "TOP agentning boyligi — uning <b>mijozlar bazasi</b>. Har bir nuqta haqida ma’lumotni yozib boring: bu sizga to‘g‘ri vaqtda to‘g‘ri taklif qilish imkonini beradi." },
        { t: "p", h: "Esda qoladigan misol: <em>“Alisher aka — har chorshanba 5W-30 oladi, Cobalt mijozlari ko‘p, to‘lovni juma kuni qiladi.”</em>" },
        { t: "ig", k: "passport" },
        { t: "h", h: "Birinchi tashrifda nimani kuzatish kerak" },
        { t: "ul", items: [
          "Polkada qaysi brendlar va qaysi yopishqoqliklar bor? Qaysi biri ko‘p (tez sotiladi)?",
          "Qanday mashinalar xizmatga keladi? (Chevrolet, Koreya, Yevropa, yuk)",
          "Kunda nechta mashinaga moy almashtiriladi?",
          "Hozirgi yetkazib beruvchida nima yoqmaydi? (narx, kechikish, sifat, munosabat)",
          "Qarorni kim qiladi va qachon buyurtma beradi?"
        ]},
        { t: "call", k: "tip", title: "Maslahat", h: "<p>Ma’lumotni tashrifdan keyin <b>darhol</b> CRM ga yozing. 3 ta tashrifdan keyin hammasi aralashib ketadi.</p>" },
        { t: "task", title: "Amaliy topshiriq", h: "3 ta mijoz uchun to‘liq pasportni to‘ldiring (shablon yuqorida). Supervayzerga ko‘rsating." }
      ],
      keys: [
        "Mijoz bazasi — agentning eng katta boyligi.",
        "Pasport: kim, nima oladi, qachon, qanday mashinalar, muammolari, to‘lov odati.",
        "Ma’lumotni tashrifdan keyin darhol yozing."
      ],
      quiz: [
        { q: "Mijoz pasportida quyidagilardan qaysi biri eng foydali?", o: ["Mijozning sevimli futbol jamoasi", "Odatdagi buyurtma kuni, hajmi va qaysi moylar tez sotilishi", "Do‘kon devorining rangi", "Mijozning siyosiy qarashlari"], a: 1, why: "Buyurtma odati va tez sotiladigan pozitsiyalar — rejalash va taklif uchun asos." },
        { q: "Ma’lumotni qachon CRM ga kiritish kerak?", o: ["Oy oxirida", "Tashrifdan keyin darhol", "Faqat buyurtma bo‘lsa", "Hech qachon, yodda saqlash kifoya"], a: 1, why: "Darhol yozilmagan ma’lumot yo‘qoladi yoki aralashadi." },
        { q: "Birinchi tashrifda polkaga qarash nima uchun kerak?", o: ["Vaqt o‘tkazish uchun", "Raqobatchilar, tez sotiladigan yopishqoqliklar va bo‘sh joyni ko‘rish uchun", "Polkani tozalash uchun", "Kerak emas"], a: 1, why: "Polka — nuqtaning “rentgeni”: nima sotilyapti va qayerda imkoniyat bor." }
      ]
    },
    {
      id: "m3l4", title: "Qiymat taklifi: Xususiyat → Afzallik → Foyda", min: 12, video: "",
      blocks: [
        { t: "p", h: "Mijoz xususiyatni emas, <b>o‘ziga foydasini</b> sotib oladi. “API SP” — xususiyat. “Turbo dvigatelni LSPI dan himoya qiladi” — afzallik. “Mijozlaringiz shikoyat qilmaydi va qaytib keladi” — <b>foyda</b>." },
        { t: "ig", k: "fab" },
        { t: "table", head: ["Xususiyat", "Afzallik", "Mijozga foyda"], rows: [
          ["X-Force 5W-30 DX1: GM dexos1 Gen 3", "Chevrolet turbo dvigatellari talabiga javob beradi", "Usta: “Tracker egalariga ishonch bilan quyaman”, shikoyat yo‘q"],
          ["HC-sintetik baza", "Issiqda kam eskiradi, kam bug‘lanadi", "Yozda ham moy kam kamayadi — mijoz mamnun"],
          ["Golden Booster RED: API SQ", "Eng yangi standart, LSPI himoyasi", "Zamonaviy Koreya/Xitoy mashinalariga “eng yangi standart” — kuchli sotuv argumenti"],
          ["Turbo 15W-40 Advance LA: DPF ga mos, uzoq oraliq", "Kamroq almashtirish, filtr himoyasi", "Avtopark xarajati kamayadi, mashina kam to‘xtaydi"],
          ["Keng liniya (motor + transmissiya)", "Bitta yetkazib beruvchidan hammasi", "Do‘kon vaqt va pul tejaydi, buyurtma qulay"]
        ]},
        { t: "call", k: "rule", title: "“Va bu sizga…” usuli", h: "<p>Har bir xususiyatdan keyin <b>“va bu sizga …”</b> deb davom eting. Shunda gapingiz avtomatik ravishda foydaga aylanadi.</p>" },
        { t: "task", title: "Amaliy topshiriq", h: "Portfelimizdan 5 ta mahsulot uchun X→A→F zanjirini yozing: biri STO uchun, biri do‘kon uchun, biri avtopark uchun." }
      ],
      keys: [
        "Mijoz xususiyatni emas, foydani sotib oladi.",
        "X → A → F: nima? → nima beradi? → sizga nima foyda?",
        "“Va bu sizga…” iborasi xususiyatni foydaga aylantiradi."
      ],
      quiz: [
        { q: "Quyidagilardan qaysi biri “foyda”?", o: ["API SP standarti", "HC-sintetik baza", "Mijozlaringiz shikoyat qilmaydi va qaytib keladi", "4 litrli kanistra"], a: 2, why: "Foyda — mijozning o‘z biznesi uchun natija." },
        { q: "“Va bu sizga…” iborasi nima uchun ishlatiladi?", o: ["Suhbatni tugatish uchun", "Xususiyatni mijoz foydasiga aylantirish uchun", "Narxni aytish uchun", "Raqobatchini eslatish uchun"], a: 1, why: "U texnik faktni mijoz uchun ahamiyatli natijaga bog‘laydi." },
        { q: "Avtopark rahbari uchun to‘g‘ri foyda qaysi?", o: ["Kanistra chiroyli", "Almashtirish kamroq — xarajat kam, mashina kam to‘xtaydi", "Zavod 1921-yilda ochilgan", "Rangi oltin"], a: 1, why: "Avtopark xarajat va ishonchlilik tilida o‘ylaydi." }
      ]
    }
  ]
});
