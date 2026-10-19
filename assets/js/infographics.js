/* =========================================================
   INFOGRAFIKALAR
   Darsda { t:"ig", k:"nomi" } blokidan chaqiriladi.
   IG.html(k) — HTML qaytaradi; IG.mount(root) — interaktivlik.
   ========================================================= */
(function () {
  "use strict";

  function box(title, inner, note) {
    return '<figure class="ig"><figcaption class="ig__t"><span>' + title + '</span></figcaption>' + inner +
      (note ? '<div class="ig__note">' + note + '</div>' : '') + '</figure>';
  }
  function flow(items, hl) {
    return '<div class="flow" style="--n:' + items.length + '">' + items.map(function (s, i) {
      return '<div class="flow__s' + (hl === i ? ' hl' : '') + '"><i>' + String(i + 1).padStart(2, "0") + '</i><b>' + s[0] + '</b><span>' + s[1] + '</span></div>';
    }).join("") + '</div>';
  }
  function matrix(items, cls) {
    return '<div class="matrix ' + (cls || "") + '">' + items.map(function (m) {
      return '<div class="mx"><div class="mx__h"><span class="mx__ic" aria-hidden="true">' + m.ic + '</span><b>' + m.t + '</b></div><dl>' +
        m.rows.map(function (r) { return '<dt>' + r[0] + '</dt><dd>' + r[1] + '</dd>'; }).join("") + '</dl></div>';
    }).join("") + '</div>';
  }

  var R = {};

  /* ---------- 1-modul ---------- */
  R["chain"] = function () {
    return box("Qiymat zanjiri: moy qanday yo‘l bosadi", flow([
      ["Zavod", "MITAN (Germaniya), Golden Booster (Koreya), Liman (Turkiya)"],
      ["MITAL", "Import, ombor, logistika, o‘qitish, kredit nazorati"],
      ["Agent", "Nuqtani ochadi, assortiment tuzadi, buyurtma va to‘lovni boshqaradi"],
      ["Nuqta", "STO, shoxobcha, do‘kon, avtopark"],
      ["Haydovchi", "Sifatli moy → mamnun → qaytib keladi"]
    ], 2), "Agent — zanjirning markazi: aynan siz nuqtani kompaniya bilan bog‘laysiz.");
  };
  R["portfolio"] = function () {
    var b = [
      { c: "#0B3A9E", f: "Germaniya", n: "MITANOL", d: "Premium. Yengil, yuk va transmissiya — eng keng liniya, OEM talablari.", l: ["X-Force", "M/S-Force", "Turbo", "ATF / Syngear"] },
      { c: "#B3122E", f: "Janubiy Koreya", n: "Golden Booster", d: "Zamonaviy standartlar: RED — API SQ, PURPLE — API SN. Koreya/Xitoy avtolari uchun.", l: ["RED SQ", "PURPLE SN", "ATF Multi LV"] },
      { c: "#2E7D32", f: "Turkiya", n: "Liman Oil", d: "Narx/sifat muvozanati. API SP, Yevropa low SAPS talablari.", l: ["5W-30 SP", "10W-40", "ATF Dexron VI"] }
    ];
    return box("Brendlar portfeli", '<div class="matrix matrix--3">' + b.map(function (x) {
      return '<div class="mx" style="border-top:5px solid ' + x.c + '"><div class="brandcard__flag">' + x.f + '</div><b style="font:800 20px/1.08 var(--f-display);text-transform:uppercase">' + x.n + '</b><div class="small muted">' + x.d + '</div><div class="specs">' + x.l.map(function (s) { return '<span class="spec">' + s + '</span>'; }).join("") + '</div></div>';
    }).join("") + '</div>');
  };
  R["channels"] = function () {
    return box("Savdo kanallari", matrix([
      { ic: "🔧", t: "STO / servis", rows: [["Qaror qiladi", "Ega + usta"], ["Istaydi", "Sifat, shikoyatsiz ish, o‘qitish"], ["Hajm", "O‘rta–katta, bochka ham"]] },
      { ic: "🛢", t: "Moy almashtirish shoxobchasi", rows: [["Qaror qiladi", "Ega"], ["Istaydi", "Tez aylanma, mashhur yopishqoqliklar"], ["Hajm", "Katta, muntazam"]] },
      { ic: "🏪", t: "Avtodo‘kon", rows: [["Qaror qiladi", "Ega / sotuvchi"], ["Istaydi", "Marja, polkada ko‘rinish, keng assortiment"], ["Hajm", "O‘rta, ko‘p SKU"]] },
      { ic: "📦", t: "Ulgurji (optovik)", rows: [["Qaror qiladi", "Ega"], ["Istaydi", "Narx shartlari, hajm, to‘lov muddati"], ["Hajm", "Juda katta"]] },
      { ic: "🚚", t: "Avtopark / taksopark", rows: [["Qaror qiladi", "Rahbar / mexanik"], ["Istaydi", "Xarajat, ishonchlilik, uzoq oraliq"], ["Hajm", "Katta, 20 L / 208 L"]] },
      { ic: "🏢", t: "Korporativ / tender", rows: [["Qaror qiladi", "Ta’minot bo‘limi"], ["Istaydi", "Hujjatlar, sertifikatlar, shartnoma"], ["Hajm", "Katta, rejali"]] }
    ], "matrix--3"));
  };
  R["kpi-day"] = function () {
    var k = [["15–20", "kontakt / kun"], ["8–12", "tashrif / kun"], ["3–5", "buyurtma / kun"], ["2–3", "yangi mijoz / hafta"]];
    return box("Kunlik me’yor", '<div class="calc__out">' + k.map(function (x, i) { return '<div' + (i === 2 ? ' class="hl"' : '') + '><b>' + x[0] + '</b><span>' + x[1] + '</span></div>'; }).join("") + '</div>', "Rejasiz ish — pulsiz ish.");
  };
  R["career"] = function () {
    var s = [["Agent", "Boshlang‘ich: o‘rganish va amaliyot"], ["TOP agent", "6 oy davomida rejani 100% bajarish"], ["Supervayzer", "Jamoani boshqarish va o‘qitish"], ["Regional menejer", "Hududni boshqarish"], ["ROP", "Butun savdo bo‘limi rahbari"]];
    return box("Karyera yo‘li", '<div class="ladder">' + s.map(function (x, i) {
      return '<div class="ladder__r' + (i === 1 ? ' now' : '') + '" style="margin-left:' + (i * 4) + '%"><b>0' + (i + 1) + '</b><span><strong>' + x[0] + '</strong><br><small>' + x[1] + '</small></span><span></span></div>';
    }).join("") + '</div>', "Hammasi natijangizga bog‘liq.");
  };

  /* ---------- 2-modul ---------- */
  R["oil-jobs"] = function () {
    var j = [["🛡", "Moylash", "Detallar orasida plyonka — ishqalanish va yeyilish kamayadi"], ["❄", "Sovutish", "Porshen va podshipniklardan issiqlikni olib ketadi"], ["🧽", "Tozalash", "Kuyindi va qurumni ushlab, filtrga olib boradi"], ["🧲", "Himoya", "Korroziya va kislotalardan himoya"], ["🔒", "Germetiklash", "Porshen halqalari va silindr orasini zichlaydi"], ["⛽", "Tejash", "Ishqalanish kam — yoqilg‘i kam sarflanadi"]];
    return box("Moyning 6 vazifasi", '<div class="matrix matrix--3">' + j.map(function (x) {
      return '<div class="mx"><div class="mx__h"><span class="mx__ic">' + x[0] + '</span><b>' + x[1] + '</b></div><div class="small muted">' + x[2] + '</div></div>';
    }).join("") + '</div>');
  };
  R["composition"] = function () {
    var parts = [["Baza moy", 80, "var(--gold)"], ["Yuvuvchi va dispersant", 8, "var(--blue)"], ["Yeyilishga qarshi", 4, "#5B7FD6"], ["Yopishqoqlik modifikatori", 5, "#8EA6E6"], ["Boshqalar", 3, "var(--ink-3)"]];
    var bar = '<div style="display:flex;height:46px;border-radius:10px;overflow:hidden;border:1px solid var(--line)">' + parts.map(function (p) {
      return '<div title="' + p[0] + '" style="width:' + p[1] + '%;background:' + p[2] + '"></div>';
    }).join("") + '</div>';
    var leg = '<div class="row" style="margin-top:12px;gap:8px 16px">' + parts.map(function (p) {
      return '<span class="small" style="display:inline-flex;gap:6px;align-items:center"><i style="width:12px;height:12px;border-radius:3px;background:' + p[2] + '"></i>' + p[0] + ' <b class="mono">~' + p[1] + '%</b></span>';
    }).join("") + '</div>';
    return box("Moy tarkibi (taxminiy ulushlar)", bar + leg, "Ulushlar moy turiga qarab farq qiladi: qo‘shimchalar odatda 10–30%.");
  };
  R["basestock"] = function () {
    var g = [["I", "Mineral", "Oddiy tozalash", 30], ["II", "Mineral (gidrotozalangan)", "Tozaroq", 45], ["III", "HC-sintetik", "Gidrokreking — X-Force, S-Force", 75], ["IV", "PAO sintetik", "Kimyoviy sintez", 90], ["V", "Boshqa sintetikalar", "Efirlar va b.", 95]];
    return box("API baza moy guruhlari — barqarorlik va tozalik", '<div class="ladder">' + g.map(function (x) {
      return '<div class="ladder__r' + (x[0] === "III" ? ' now' : '') + '"><b>' + x[0] + '</b><span><strong>' + x[1] + '</strong> <small>· ' + x[2] + '</small><span class="hbar" style="display:block;margin-top:6px;height:6px"><i style="width:' + x[3] + '%"></i></span></span><span></span></div>';
    }).join("") + '</div>', "Guruh qanchalik yuqori — moy shunchalik barqaror, kam bug‘lanadi va uzoq xizmat qiladi.");
  };
  R["sae"] = function () {
    return box("SAE dekoder — bosing va o‘rganing",
      '<div class="sae" data-ig="sae">' +
        '<div class="sae__sel" role="group" aria-label="Yopishqoqlikni tanlang">' +
          ["0W-20", "5W-30", "5W-40", "10W-40", "15W-40"].map(function (v, i) { return '<button type="button" class="chip' + (i === 1 ? ' on' : '') + '" data-v="' + v + '">' + v + '</button>'; }).join("") +
        '</div>' +
        '<div class="sae__code"><button type="button" class="sae__part on" data-p="w">5W</button><span class="sae__dash">–</span><button type="button" class="sae__part" data-p="h">30</button></div>' +
        '<div class="sae__exp" aria-live="polite"></div>' +
        '<div class="thermo"></div>' +
        '<div class="thermo__axis"><span>−40 °C</span><span>−20</span><span>0</span><span>+20</span><span>+50 °C</span></div>' +
        '<label class="small muted" style="display:grid;gap:6px">Havo harorati: <b class="mono" data-temp>−15 °C</b><input class="range" type="range" min="-40" max="50" value="-15" data-range></label>' +
      '</div>',
      "Diagramma: har bir qishki sinf qaysi minimal haroratgacha ishonchli ishga tushirishni ta’minlashini ko‘rsatadi (taxminiy, SAE J300).");
  };
  R["api-ladder"] = function () {
    var s = [["SJ", "1996", "Eskirgan"], ["SL", "2001", "Eski dvigatellar"], ["SM", "2004", "Eski"], ["SN", "2010", "Kundalik standart · PURPLE SN"], ["SP", "2020", "LSPI himoyasi · X-Force, Liman 5W-30"], ["SQ", "2025", "Eng yangi · RED SQ, X-Force DX1 / 0W-20"]];
    var d = [["CF", "1994", "Klassik dizel"], ["CI-4", "2002", "Turbo 15W-40 Classic, Turbo 10W-40"], ["CK-4", "2016", "Euro V–VI · Turbo LA liniyasi"]];
    function rows(a, nowIdx) { return a.map(function (x, i) { return '<div class="ladder__r' + (i >= nowIdx ? ' now' : (i < 2 ? ' old' : '')) + '"><b>' + x[0] + '</b><span>' + x[2] + '</span><small>' + x[1] + '</small></div>'; }).join(""); }
    return box("API zinapoyasi: benzin (S) va dizel (C)",
      '<div class="grid g2"><div><div class="eyebrow" style="margin-bottom:10px">Benzin — S</div><div class="ladder">' + rows(s, 4) + '</div></div>' +
      '<div><div class="eyebrow" style="margin-bottom:10px">Dizel — C</div><div class="ladder">' + rows(d, 2) + '</div></div></div>',
      "Yangi standart odatda eskilarini qoplaydi (masalan, SP moyi SN talab qilingan joyda ishlatilishi mumkin). Istisno — dizel FA-4.");
  };
  R["acea"] = function () {
    return box("ACEA sinflari", matrix([
      { ic: "A/B", t: "A/B — oddiy kulli", rows: [["Kimga", "Benzin (A) va dizel (B) yengil avtomobillar"], ["Misol", "A3/B4 — X-Force 5W-40, M-Force, S-Force"], ["E’tibor", "DPF li dizellar uchun emas"]] },
      { ic: "C", t: "C — low SAPS", rows: [["Kimga", "Sajevoy filtr (DPF) va katalizatorli avtomobillar"], ["Misol", "MB 229.51/52, BMW LL-04 — Liman 5W-30"], ["E’tibor", "Kul, fosfor, oltingugurt kam"]] },
      { ic: "E", t: "E — yuk texnikasi", rows: [["Kimga", "Og‘ir dizel: yuk, avtobus, maxsus texnika"], ["Misol", "E7/E11 — Turbo LA liniyasi"], ["E’tibor", "E6/E9/E11 — DPF ga mos"]] }
    ], "matrix--3"));
  };
  R["trans"] = function () {
    return box("Uzatmalar qutisi turlari va suyuqliklar", matrix([
      { ic: "A", t: "Avtomat (AKPP)", rows: [["Belgisi", "Gidrotransformator, planetar uzatmalar"], ["Suyuqlik", "ATF: Dexron VI, Toyota WS, SP-IV"], ["Mahsulot", "MITANOL / Liman ATF Dexron VI, GB ATF Multi LV"]] },
      { ic: "V", t: "Variator (CVT)", rows: [["Belgisi", "Po‘lat kamar/zanjir, “pog‘onasiz”"], ["Suyuqlik", "Maxsus CVT fluid"], ["Mahsulot", "MITANOL ATF CVT"]] },
      { ic: "R", t: "Robot (DCT/DSG)", rows: [["Belgisi", "Ikki mufta, ho‘l yoki quruq"], ["Suyuqlik", "DCT fluid (ho‘l mufta uchun)"], ["Mahsulot", "MITANOL ATF DCT"]] },
      { ic: "M", t: "Mexanik + ko‘prik", rows: [["Belgisi", "Sinxronizatorlar, gipoid ko‘prik"], ["Suyuqlik", "Tishli moy GL-4 / GL-5"], ["Mahsulot", "MITANOL Syngear 75W-90"]] }
    ]));
  };
  R["select-algo"] = function () {
    return box("Moy tanlash algoritmi", flow([
      ["Mashina", "Marka, model, yil, dvigatel, yoqilg‘i, turbo, yurish"],
      ["Talab", "Qo‘llanmadagi dopusk va SAE (dexos1, VW 502, MB 229.5…)"],
      ["Mahsulot", "Talabga javob beradigan va standarti yetarli moy"],
      ["Sharoit", "Gaz, taksi, issiqlik, chang → oraliqni qisqartirish"]
    ], 2), "Katalogdagi “Moy tanlash” vositasi shu algoritm asosida ishlaydi.");
  };

  /* ---------- 3-modul ---------- */
  R["clients"] = function () {
    return box("Mijoz turlari: motiv va argument", matrix([
      { ic: "🔧", t: "STO ustasi", rows: [["Motiv", "Obro‘, shikoyatsiz ish"], ["Argument", "Standartlar, OEM talablar, o‘qitish, namuna"]] },
      { ic: "🛢", t: "Shoxobcha egasi", rows: [["Motiv", "Aylanma, tezlik"], ["Argument", "Mashhur yopishqoqliklar, bochka, barqaror yetkazish"]] },
      { ic: "🏪", t: "Do‘kon egasi", rows: [["Motiv", "Marja, polka"], ["Argument", "Assortiment matritsasi, POS, tez sotiladigan SKU"]] },
      { ic: "📦", t: "Ulgurji", rows: [["Motiv", "Hajm, shartlar"], ["Argument", "Ombor barqarorligi, to‘lov shartlari, keng portfel"]] },
      { ic: "🚚", t: "Avtopark", rows: [["Motiv", "Xarajat, to‘xtamaslik"], ["Argument", "Uzoq oraliq, bitta moy park uchun, Low SAPS"]] },
      { ic: "🏢", t: "Korporativ", rows: [["Motiv", "Hujjat, xavfsizlik"], ["Argument", "Sertifikatlar, shartnoma, aniq yetkazish"]] }
    ], "matrix--3"));
  };
  R["buyer-types"] = function () {
    return box("4 xil xaridor turi", matrix([
      { ic: "⚡", t: "Lider", rows: [["Belgisi", "Tez, qat’iy, vaqtini qadrlaydi"], ["Qanday gapirish", "Qisqa, natija va foyda, tanlov bering"]] },
      { ic: "🤝", t: "Do‘stona", rows: [["Belgisi", "Suhbatni yaxshi ko‘radi, munosabat muhim"], ["Qanday gapirish", "Samimiy aloqa, boshqa mijozlar tajribasi"]] },
      { ic: "📊", t: "Hisobchi", rows: [["Belgisi", "Savollari ko‘p, raqam so‘raydi"], ["Qanday gapirish", "Jadvallar, standartlar, sertifikatlar, hisob-kitob"]] },
      { ic: "🛡", t: "Ehtiyotkor", rows: [["Belgisi", "Xavfdan qo‘rqadi, sekin qaror qiladi"], ["Qanday gapirish", "Kafolat, sinov partiyasi, bosqichma-bosqich"]] }
    ]));
  };
  R["passport"] = function () {
    var f = [["Nuqta", "Avto-Servis “Sergeli”, STO"], ["Kontakt", "Bobur aka (ega), usta Akmal"], ["Mashinalar", "Cobalt, Gentra, Tracker ko‘p"], ["Hajm", "~15 mashina/kun"], ["Buyurtma odati", "Har chorshanba, 4–6 karobka"], ["Tez sotiladi", "5W-30, 10W-40"], ["Raqobatchi", "2 ta brend polkada"], ["To‘lov", "14 kun, juma kuni to‘laydi"], ["Muammo / ehtiyoj", "Yozda moy tez kamayadi; Tracker uchun dexos1 kerak"], ["Keyingi qadam", "Seshanba 11:00 — DX1 namunasi"]];
    return box("Mijoz pasporti — namuna", '<dl class="kv">' + f.map(function (x) { return '<div><dt>' + x[0] + '</dt><dd>' + x[1] + '</dd></div>'; }).join("") + '</dl>');
  };
  R["fab"] = function () {
    return box("Xususiyat → Afzallik → Foyda", flow([
      ["Xususiyat", "“API SQ, LSPI himoyasi”"],
      ["Afzallik", "“Turbo dvigatel porshenlari shikastlanmaydi”"],
      ["Foyda", "“Mijozlaringiz shikoyat qilmaydi va qaytib keladi”"]
    ], 2));
  };

  /* ---------- 4-modul ---------- */
  R["visit7"] = function () {
    var s = [["Tayyorgarlik", "Pasport, maqsad"], ["Aloqa", "Ism, tabassum, 30 soniya"], ["Polka", "Qoldiq, narx, joylashuv"], ["Ehtiyoj", "Ochiq savollar"], ["Taqdimot", "1–2 mahsulot, X→A→F"], ["E’tiroz", "Tingla → aniqla → javob"], ["Kelishuv", "Buyurtma + keyingi qadam"]];
    return box("Tashrifning 7 qadami", '<div class="funnel">' + s.map(function (x, i) {
      return '<div class="funnel__r"><div class="funnel__bar" style="width:' + (100 - i * 7) + '%"><b>' + (i + 1) + '</b><span><strong>' + x[0] + '</strong><em>' + x[1] + '</em></span></div></div>';
    }).join("") + '</div>');
  };
  R["spin"] = function () {
    return box("SPIN savollari", flow([
      ["Vaziyat", "“Kuniga nechta mashinaga xizmat qilasiz?”"],
      ["Muammo", "“Mijozlar moy kamayishidan shikoyat qiladimi?”"],
      ["Oqibat", "“Bu mijozlar ketishiga olib keladimi?”"],
      ["Yechim qadri", "“Bunday moy sizga qanchalik foydali bo‘lardi?”"]
    ], 3));
  };
  R["objection-algo"] = function () {
    return box("E’tiroz bilan ishlash algoritmi", flow([
      ["Tingla", "Bo‘lmang, oxirigacha eshiting"],
      ["Qo‘shil", "“Tushunaman…” — bahslashmang"],
      ["Aniqla", "“Nima bilan solishtiryapsiz?”"],
      ["Argument", "X→A→F, fakt, misol"],
      ["Tekshir", "“Bu savolingizga javob berdimi?”"]
    ], 2));
  };

  /* ---------- 5-modul ---------- */
  R["assort-matrix"] = function () {
    var head = ["Pozitsiya", "STO", "Shoxobcha", "Do‘kon", "Avtopark"];
    var rows = [
      ["5W-30 zamonaviy (DX1 / RED SQ)", "●", "●", "●", "○"],
      ["5W-30 universal (S-Force / Liman)", "●", "●", "●", "○"],
      ["10W-40 (M-Force / S-Force / Liman)", "●", "●", "●", "○"],
      ["0W-20 (X-Force)", "○", "○", "●", "—"],
      ["5W-40 Yevropa (X-Force)", "●", "○", "●", "—"],
      ["ATF Dexron VI / Multi LV", "●", "○", "●", "○"],
      ["ATF CVT / DCT", "○", "—", "●", "—"],
      ["Syngear 75W-90", "●", "○", "●", "●"],
      ["Turbo dizel (20 L)", "○", "—", "○", "●"],
      ["Bochka 208 L", "○", "●", "—", "●"]
    ];
    return box("Assortiment matritsasi: ● majburiy · ○ tavsiya", '<div class="tbl-wrap"><table class="tbl"><thead><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join("") + '</tr></thead><tbody>' +
      rows.map(function (r) { return '<tr>' + r.map(function (c, i) { return '<td' + (i ? ' style="text-align:center;color:' + (c === "●" ? "var(--gold-ink)" : "var(--ink-3)") + ';font-size:18px"' : '') + '>' + c + '</td>'; }).join("") + '</tr>'; }).join("") + '</tbody></table></div>');
  };
  R["shelf"] = function () {
    var svg = '<svg viewBox="0 0 640 330" role="img" aria-label="Polka sxemasi">' +
      '<rect x="20" y="10" width="600" height="300" rx="10" fill="none" stroke="var(--line)" stroke-width="2"/>' +
      [70, 150, 230].map(function (y) { return '<rect x="20" y="' + (y + 54) + '" width="600" height="8" fill="var(--line)"/>'; }).join("") +
      '<rect x="24" y="94" width="592" height="70" rx="6" fill="var(--gold-soft)"/>' +
      can(40, 14, "#0B3A9E", 7, "Qo‘shimcha / C") +
      can(40, 96, "#0B3A9E", 3, "") + can(220, 96, "#B3122E", 3, "") + can(400, 96, "#2E7D32", 3, "") +
      can(40, 176, "#0B3A9E", 7, "Katta qadoq, 20 L") +
      '<text x="600" y="134" text-anchor="end" font-size="13" font-weight="700" fill="var(--gold-ink)">KO‘Z DARAJASI · A GURUH</text>' +
      '<text x="32" y="300" font-size="12" fill="var(--ink-3)">Pastki qator: og‘ir va katta qadoqlar</text>' +
      '</svg>';
    function can(x, y, c, n, label) {
      var s = "";
      for (var i = 0; i < n; i++) {
        var cx = x + i * 52;
        s += '<g><rect x="' + cx + '" y="' + (y + 8) + '" width="40" height="50" rx="5" fill="' + c + '"/><rect x="' + (cx + 6) + '" y="' + (y + 22) + '" width="28" height="18" rx="2" fill="#fff" opacity=".85"/><rect x="' + (cx + 4) + '" y="' + (y + 2) + '" width="12" height="8" rx="2" fill="#222"/></g>';
      }
      if (label) s += '<text x="' + (x + n * 52 + 6) + '" y="' + (y + 38) + '" font-size="12" fill="var(--ink-3)">' + label + '</text>';
      return s;
    }
    return box("Sotadigan polka: brend bloklari va “oltin” qator", svg, "Ko‘z darajasi (~120–160 sm) — eng ko‘p sotiladigan va eng foydali pozitsiyalar. Har bir brend — vertikal blok.");
  };
  R["order-calc"] = function () {
    return box("Buyurtma kalkulyatori",
      '<div class="calc" data-ig="order">' +
        row("Haftalik o‘rtacha sotuv", "dona / hafta", "w", 12) +
        row("Keyingi yetkazishgacha", "hafta", "n", 2) +
        row("Xavfsizlik zaxirasi", "dona (odatda haftalikning yarmi)", "s", 6) +
        row("Hozirgi qoldiq", "dona", "q", 8) +
        '<div class="calc__out"><div class="hl"><b data-out="res">22</b><span>buyurtma, dona</span></div><div><b data-out="cov">—</b><span>yetadi, hafta</span></div></div>' +
      '</div>');
    function row(l, s, k, v) { return '<div class="calc__row"><label for="oc-' + k + '">' + l + '<small>' + s + '</small></label><input class="input input--sm" id="oc-' + k + '" type="number" min="0" inputmode="numeric" value="' + v + '" data-k="' + k + '"></div>'; }
  };
  R["cross"] = function () {
    return box("Katta chek formulasi", '<div class="formula" style="justify-content:center">' +
      '<span class="f" style="font-size:clamp(18px,3.4vw,26px)">Motor moyi</span><span class="op">+</span>' +
      '<span class="f" style="font-size:clamp(18px,3.4vw,26px)">ATF / CVT</span><span class="op">+</span>' +
      '<span class="f" style="font-size:clamp(18px,3.4vw,26px)">Syngear</span><span class="op">=</span>' +
      '<span class="f f--res" style="font-size:clamp(18px,3.4vw,26px)">Katta chek</span></div>');
  };
  R["growth-ladder"] = function () {
    return box("Mijozni o‘stirish zinapoyasi", flow([
      ["Sinov", "Birinchi kichik buyurtma"],
      ["Doimiy", "Muntazam buyurtma, 2–3 SKU"],
      ["Keng", "“Oltin 6” va transmissiya"],
      ["Hamkor", "Asosiy yetkazib beruvchi, POS, o‘qitish"]
    ], 3));
  };

  /* ---------- 6-modul ---------- */
  R["debt-cycle"] = function () {
    return box("Pul aylanishi", flow([
      ["Buyurtma", "Shartlar kelishildi"],
      ["Yetkazish", "Imzolangan nakladnoy"],
      ["Sotuv", "Tovar polkada aylanadi"],
      ["To‘lov", "Muddatida — kassaga"],
      ["Yangi buyurtma", "Qarzsiz mijoz — yangi buyurtma"]
    ], 3), "Zanjirda bitta bo‘g‘in uzilsa (to‘lov), butun aylanma to‘xtaydi.");
  };
  R["aging"] = function () {
    var z = [["#1F9D55", "Muddatida", "Normal. Eslatma kalendari bo‘yicha ishlang."], ["#E0B000", "1–7 kun", "Har kuni muloyim eslatma, aniq sana kelishing."], ["#F07B1D", "8–15 kun", "Yangi yetkazish to‘xtatiladi, shaxsan tashrif, qisman to‘lov."], ["#D21F3C", "15+ kun", "Supervayzer bilan eskalatsiya, akt sverka, rahbariyat qarori."]];
    return box("Qarz svetofori", '<div class="lights">' + z.map(function (x) {
      return '<div class="light"><i style="background:' + x[0] + '"></i><b>' + x[1] + '</b><span>' + x[2] + '</span></div>';
    }).join("") + '</div>');
  };
  R["reminders"] = function () {
    return box("Eslatma kalendari", flow([
      ["D−2", "Muloyim eslatma: summa va sana"],
      ["D0", "To‘lov kuni: qo‘ng‘iroq yoki tashrif"],
      ["D+3", "“Qancha va qachon?” — qisman to‘lov"],
      ["D+7", "Yetkazish to‘xtatiladi, shaxsan tashrif"],
      ["D+15", "Supervayzer bilan eskalatsiya"]
    ], 1));
  };

  /* ---------- 7-modul ---------- */
  R["day"] = function () {
    var s = [["08:30", "Kunlik reja", "Kimlarga, qayerga, qanday maqsad bilan"], ["09:00", "Qo‘ng‘iroqlar", "Uchrashuvlarni tasdiqlash, eslatmalar"], ["10:00", "Tashriflar", "15–20 kontakt, 8–12 tashrif, marshrut bo‘yicha"], ["17:30", "Hisobot", "CRM: natija, raqamlar, keyingi qadam"], ["18:00", "O‘qish", "20 daqiqa Akademiya yoki trenajor"]];
    return box("Ideal kun", '<div class="ladder">' + s.map(function (x, i) {
      return '<div class="ladder__r' + (i === 2 ? ' now' : '') + '" style="grid-template-columns:72px 1fr"><b style="font-size:20px">' + x[0] + '</b><span><strong>' + x[1] + '</strong><br><small>' + x[2] + '</small></span></div>';
    }).join("") + '</div>');
  };
  R["route"] = function () {
    var d = ["Dush", "Sesh", "Chor", "Pay", "Jum"];
    var z = ["Shimoliy zona", "Sharqiy zona", "Markaz", "Janubiy zona", "G‘arbiy zona + A mijozlar"];
    return box("Haftalik marshrut", '<div class="flow" style="--n:5">' + d.map(function (x, i) {
      return '<div class="flow__s' + (i === 2 ? ' hl' : '') + '"><i>' + x + '</i><b>' + z[i] + '</b><span>8–12 tashrif + 2–3 yangi nuqta</span></div>';
    }).join("") + '</div>');
  };
  R["kpi-calc"] = function () {
    return box("Savdo voronkasi kalkulyatori",
      '<div class="calc" data-ig="kpi">' +
        row("Kunlik kontaktlar", "qo‘ng‘iroq + uchrashuv", "c", 18) +
        row("Tashrifga aylanishi", "%", "v", 55) +
        row("Buyurtmaga aylanishi", "%", "o", 40) +
        row("O‘rtacha chek", "ming so‘m", "a", 900) +
        row("Ish kunlari", "oyiga", "d", 24) +
        '<div class="calc__out"><div><b data-out="visits">—</b><span>tashrif / kun</span></div><div><b data-out="orders">—</b><span>buyurtma / kun</span></div><div><b data-out="month">—</b><span>buyurtma / oy</span></div><div class="hl"><b data-out="turn">—</b><span>oborot / oy, mln so‘m</span></div></div>' +
      '</div>', "O‘z raqamlaringizni kiriting. Qaysi bosqichni 10% yaxshilasangiz oborot qanchaga o‘sishini sinab ko‘ring.");
    function row(l, s, k, v) { return '<div class="calc__row"><label for="kc-' + k + '">' + l + '<small>' + s + '</small></label><input class="input input--sm" id="kc-' + k + '" type="number" min="0" inputmode="numeric" value="' + v + '" data-k="' + k + '"></div>'; }
  };

  /* ---------- 8-modul ---------- */
  R["formula"] = function () {
    return box("TOP agent formulasi", '<div class="formula" style="justify-content:center"><span class="f">Bilim</span><span class="op">×</span><span class="f">Tartib</span><span class="op">×</span><span class="f">Munosabat</span><span class="op">=</span><span class="f f--res">Natija</span></div>', "Ko‘paytma: bitta omil nol bo‘lsa — natija ham nol.");
  };
  R["no-stat"] = function () {
    var dots = "";
    for (var i = 0; i < 30; i++) {
      var yes = (i % 10 === 9);
      dots += '<span title="' + (yes ? "Ha" : "Yo‘q") + '" style="width:30px;height:30px;border-radius:8px;display:grid;place-items:center;font:700 11px var(--f-mono);' + (yes ? 'background:var(--gold);color:#1A1300' : 'background:var(--paper-2);color:var(--ink-3)') + '">' + (yes ? "HA" : "yo‘q") + '</span>';
    }
    return box("Har bir “yo‘q” — “ha”ga bir qadam", '<div style="display:flex;flex-wrap:wrap;gap:6px">' + dots + '</div>', "Misol: 10 ta yangi kontaktdan 1 tasi mijozga aylansa, sizga har “yo‘q” ham ish beradi. Konversiyangizni bilib, “yo‘q”larni xotirjam qabul qiling.");
  };

  /* ================= INTERAKTIVLIK ================= */
  var SAE = {
    w: { "0W": [-35, "Juda sovuqda ham tez tarqaladi: −35 °C gacha ishonchli start."], "5W": [-30, "Qishda −30 °C gacha ishonchli start — O‘zbekiston uchun universal."], "10W": [-25, "−25 °C gacha. O‘zbekiston qishi uchun yetarli."], "15W": [-20, "−20 °C gacha. Ko‘pincha yuk dizellari uchun."] },
    h: { "20": "Ish haroratida (100 °C) yupqaroq plyonka — yoqilg‘i tejamkorligi. Faqat ishlab chiqaruvchi 20 ni talab qilgan zamonaviy dvigatellar uchun.", "30": "Eng ommabop: zamonaviy dvigatellarda himoya va tejamkorlik muvozanati.", "40": "Issiqda qalinroq plyonka: og‘ir yuklama, issiq iqlim, katta yurish." }
  };
  function mountSae(el) {
    var cur = "5W-30", part = "w";
    var temp = -15;
    function render() {
      var w = cur.split("-")[0], h = cur.split("-")[1];
      el.querySelector('[data-p="w"]').textContent = w;
      el.querySelector('[data-p="h"]').textContent = h;
      el.querySelectorAll(".sae__part").forEach(function (b) { b.classList.toggle("on", b.dataset.p === part); });
      var exp = el.querySelector(".sae__exp");
      if (part === "w") exp.innerHTML = "<b>" + w + "</b> — qishki ko‘rsatkich (W = Winter). " + SAE.w[w][1];
      else exp.innerHTML = "<b>" + h + "</b> — ish haroratidagi yopishqoqlik. " + SAE.h[h];
      var th = el.querySelector(".thermo");
      var pct = function (t) { return ((t + 40) / 90) * 100; };
      th.innerHTML = Object.keys(SAE.w).map(function (k) {
        var min = SAE.w[k][0];
        var ok = temp >= min;
        return '<div class="thermo__row" style="' + (k === w ? '' : 'opacity:.55') + '"><span>' + k + '</span><div class="thermo__track"><div class="thermo__ok" style="left:' + pct(min) + '%;right:0"></div><div class="thermo__now" style="left:' + pct(temp) + '%"></div></div></div>';
      }).join("");
      el.querySelector("[data-temp]").textContent = (temp > 0 ? "+" : "") + temp + " °C" + (temp < SAE.w[w][0] ? " — " + w + " uchun juda sovuq!" : "");
    }
    el.querySelectorAll(".sae__sel .chip").forEach(function (b) {
      b.addEventListener("click", function () {
        el.querySelectorAll(".sae__sel .chip").forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on"); cur = b.dataset.v; render();
      });
    });
    el.querySelectorAll(".sae__part").forEach(function (b) { b.addEventListener("click", function () { part = b.dataset.p; render(); }); });
    el.querySelector("[data-range]").addEventListener("input", function (e) { temp = +e.target.value; render(); });
    render();
  }
  function num(el, k) { var v = parseFloat(el.querySelector('[data-k="' + k + '"]').value); return isNaN(v) ? 0 : v; }
  function mountOrder(el) {
    function calc() {
      var w = num(el, "w"), n = num(el, "n"), s = num(el, "s"), q = num(el, "q");
      var res = Math.max(0, Math.round(w * n + s - q));
      el.querySelector('[data-out="res"]').textContent = res;
      el.querySelector('[data-out="cov"]').textContent = w > 0 ? ((res + q) / w).toFixed(1) : "—";
    }
    el.addEventListener("input", calc); calc();
  }
  function mountKpi(el) {
    function calc() {
      var c = num(el, "c"), v = num(el, "v") / 100, o = num(el, "o") / 100, a = num(el, "a"), d = num(el, "d");
      var visits = c * v, orders = visits * o, month = orders * d, turn = month * a / 1000;
      el.querySelector('[data-out="visits"]').textContent = visits.toFixed(1);
      el.querySelector('[data-out="orders"]').textContent = orders.toFixed(1);
      el.querySelector('[data-out="month"]').textContent = Math.round(month);
      el.querySelector('[data-out="turn"]').textContent = turn.toFixed(1);
    }
    el.addEventListener("input", calc); calc();
  }

  window.IG = {
    has: function (k) { return !!R[k]; },
    keys: function () { return Object.keys(R); },
    title: function (k) { var m = R[k] ? R[k]().match(/<figcaption class="ig__t"><span>([^<]*)/) : null; return m ? m[1] : k; },
    html: function (k) { return R[k] ? R[k]() : '<div class="placeholder"><b>Infografika</b>' + k + '</div>'; },
    mount: function (root) {
      root.querySelectorAll('[data-ig="sae"]').forEach(mountSae);
      root.querySelectorAll('[data-ig="order"]').forEach(mountOrder);
      root.querySelectorAll('[data-ig="kpi"]').forEach(mountKpi);
    }
  };
})();
