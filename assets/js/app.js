/* =========================================================
   MITAL Akademiya — ilova (hash router, sahifalar)
   ========================================================= */
(function () {
  "use strict";
  var CFG = window.MITAL_CONFIG || {};
  var C, CAT, EX, HOME;
  var $app = document.getElementById("app");

  /* ---------------- Yordamchilar ---------------- */
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pad(n) { return String(n).padStart(2, "0"); }
  function fmtDate(iso) { if (!iso) return "—"; var d = new Date(iso); return pad(d.getDate()) + "." + pad(d.getMonth() + 1) + "." + d.getFullYear(); }
  function fmtAgo(iso) {
    if (!iso) return "—";
    var m = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
    if (m < 2) return "hozir"; if (m < 60) return m + " daq. oldin";
    var h = Math.round(m / 60); if (h < 24) return h + " soat oldin";
    var d = Math.round(h / 24); return d + " kun oldin";
  }
  function fmtPhone(p) { p = String(p || ""); return p.length === 12 ? "+" + p.slice(0, 3) + " " + p.slice(3, 5) + " " + p.slice(5, 8) + " " + p.slice(8, 10) + " " + p.slice(10) : p; }
  function initials(n) { return String(n || "?").trim().split(/\s+/).slice(0, 2).map(function (x) { return x[0]; }).join("").toUpperCase(); }
  function toast(msg) { var t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove("show"); }, 2600); }
  function go(h) { if (location.hash === h) route(); else location.hash = h; }

  var modal = {
    open: function (html, cls) {
      var m = $("#modal"), b = $("#modalBox");
      b.className = "modal__box " + (cls || "");
      b.innerHTML = '<button class="iconbtn modal__x" data-close aria-label="Yopish">✕</button>' + html;
      m.classList.add("open"); m.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      setTimeout(function () { var f = b.querySelector("input,button:not([data-close])"); if (f) f.focus(); }, 50);
    },
    close: function () { var m = $("#modal"); m.classList.remove("open"); m.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
  };
  document.addEventListener("click", function (e) { if (e.target.closest("[data-close]")) modal.close(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") modal.close(); });

  /* ---------------- Kurs indekslari ---------------- */
  var LESSONS, LBYID, MBYID, PBYID;
  /* Kontent o‘zgargach (rahbar tahrirlaganda) indekslarni qayta quradi */
  function reindex() {
    C = window.COURSE; CAT = window.CATALOG; EX = window.EXAM; HOME = window.HOME || {};
    C.modules = C.modules || []; C.weeks = C.weeks || []; C.levels = C.levels || [];
    LESSONS = []; LBYID = {}; MBYID = {}; PBYID = {};
    C.modules.forEach(function (m, mi) {
      m.n = mi + 1; m.lessons = m.lessons || [];
      MBYID[m.id] = m;
      m.lessons.forEach(function (l, i) { l.mod = m; l.idx = i; l.gidx = LESSONS.length; l.blocks = l.blocks || []; l.quiz = l.quiz || []; l.keys = l.keys || []; LESSONS.push(l); LBYID[l.id] = l; });
    });
    (CAT.products || []).forEach(function (p) { PBYID[p.id] = p; });
  }
  function M(id) { return MBYID[id] || { n: "?", title: "(o‘chirilgan modul)", id: id }; }
  function imgSrc(v) { if (!v) return ""; return /^(https?:|data:|\/|assets\/)/.test(v) ? v : "assets/img/products/" + v; }
  var EDIT = false;
  try { EDIT = sessionStorage.getItem("mital.edit") === "1"; } catch (e) { /* */ }
  function editing() { return EDIT && Store.isAdmin(); }
  /* Tahrirlash tugmasi (faqat tahrirlash rejimida chiqadi) */
  function eb(action, label, cls) { return editing() ? '<button type="button" class="ebtn ' + (cls || "") + '" data-cms="' + esc(action) + '">' + (label || "✏️ Tahrirlash") + '</button>' : ""; }

  function passed(id) { var p = Store.progress[id]; return !!(p && p.passed); }
  function unlocked(l) {
    if (Store.isAdmin() || CFG.STRICT_ORDER === false) return true;
    if (l.gidx === 0) return true;
    return passed(LESSONS[l.gidx - 1].id);
  }
  function stats(prog) {
    prog = prog || Store.progress;
    var done = LESSONS.filter(function (l) { return prog[l.id] && prog[l.id].passed; }).length;
    var tasks = LESSONS.filter(function (l) { return prog[l.id] && prog[l.id].task_done; }).length;
    var sc = 0, tot = 0;
    Object.keys(prog).forEach(function (k) { var p = prog[k]; if (p.total) { sc += p.score || 0; tot += p.total; } });
    return { done: done, total: LESSONS.length, pct: LESSONS.length ? Math.round(done / LESSONS.length * 100) : 0, tasks: tasks, quizPct: tot ? Math.round(sc / tot * 100) : null };
  }
  function modStats(m, prog) {
    prog = prog || Store.progress;
    var d = m.lessons.filter(function (l) { return prog[l.id] && prog[l.id].passed; }).length;
    return { done: d, total: m.lessons.length, pct: m.lessons.length ? Math.round(d / m.lessons.length * 100) : 0 };
  }
  function bestExam(exams) { exams = exams || Store.exams; var b = null; exams.forEach(function (e) { if (!b || e.percent > b.percent) b = e; }); return b; }
  function examPassed(exams) { return (exams || Store.exams).some(function (e) { return e.passed; }); }
  function level(pct, exPassed) {
    var L = C.levels, cur = L[0];
    if (exPassed) return L[L.length - 1];
    L.forEach(function (x) { if (pct >= x.min && x.min <= 100) cur = x; });
    return cur;
  }
  function nextLesson() { return LESSONS.find(function (l) { return !passed(l.id); }); }

  /* ---------------- Vizual komponentlar ---------------- */
  function donut(code, sub, size, dark) {
    size = size || 168;
    var id = "dp" + Math.random().toString(36).slice(2, 7);
    var ring = dark ? "#F3F1EC" : "var(--ink)";
    var txt = dark ? "#0E1730" : "var(--paper)";
    return '<svg class="donut" style="width:' + size + 'px;height:' + size + 'px" viewBox="0 0 200 200" role="img" aria-label="Daraja: ' + esc(code) + '">' +
      '<defs><path id="' + id + 't" d="M 30 100 A 70 70 0 0 1 170 100"/><path id="' + id + 'b" d="M 26 100 A 74 74 0 0 0 174 100"/></defs>' +
      '<circle cx="100" cy="100" r="96" fill="' + ring + '"/>' +
      '<circle cx="100" cy="100" r="58" fill="var(--gold)"/>' +
      '<line x1="12" y1="100" x2="188" y2="100" stroke="' + ring + '" stroke-width="0"/>' +
      '<rect x="4" y="94" width="192" height="12" fill="var(--gold)"/>' +
      '<text font-family="JetBrains Mono, monospace" font-weight="700" font-size="15" letter-spacing="2.5" fill="' + txt + '"><textPath href="#' + id + 't" startOffset="50%" text-anchor="middle">MITAL · AKADEMIYA</textPath></text>' +
      '<text font-family="JetBrains Mono, monospace" font-weight="700" font-size="13" letter-spacing="2" fill="' + txt + '"><textPath href="#' + id + 'b" startOffset="50%" text-anchor="middle" dominant-baseline="hanging">' + esc(sub || "API AGENT") + '</textPath></text>' +
      '<text x="100" y="115" text-anchor="middle" font-family="Inter, sans-serif" font-weight="700" font-size="40" fill="#1A1300">' + esc(code) + '</text>' +
      '</svg>';
  }
  function dip(pct) {
    return '<div class="dip" aria-label="Progress ' + pct + '%"><div class="dip__bar"><div class="dip__zone"></div><div class="dip__fill" style="height:' + Math.max(3, pct) + '%"></div></div>' +
      '<div class="dip__marks"><span>MAX</span><span>' + pct + '%</span><span>MIN</span></div></div>';
  }
  function hbar(pct, cls) { return '<div class="hbar ' + (cls || "") + '"><i style="width:' + pct + '%"></i></div>'; }
  function ytId(url) {
    if (!url) return null;
    var m = String(url).match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([A-Za-z0-9_-]{11})/);
    return m ? m[1] : (/^[A-Za-z0-9_-]{11}$/.test(url) ? url : null);
  }
  function videoUrl(l) { return l.video || Store.videos[l.id] || ""; }
  var ICON = {
    road: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c3 4.2 6 7.2 6 10.6A6 6 0 0 1 6 12.6C6 9.2 9 6.2 12 2z"/><path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5"/></svg>',
    cat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 6V4h5v2"/><path d="M5 6h11l3 4v10H5z"/><path d="M9 13h6"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/></svg>',
    train: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    lock: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    play: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9l5 3-5 3z" fill="currentColor"/></svg>'
  };

  /* ---------------- Navigatsiya ---------------- */
  function renderChrome(path) {
    var admin = Store.isAdmin();
    var nav = [["#/yol", "Mening yo‘lim"], ["#/katalog", "Katalog"], ["#/skriptlar", "Skriptlar"], ["#/trenajor", "Trenajor"], ["#/imtihon", "Imtihon"], ["#/kompaniya", "Kompaniya"]];
    if (admin) nav.push(["#/rahbar", "Rahbar"]);
    $("#topnav").innerHTML = nav.map(function (n) { return '<a href="' + n[0] + '" class="' + (path.indexOf(n[0].slice(1)) === 0 ? "on" : "") + '">' + n[1] + '</a>'; }).join("");
    var tabs = [["#/yol", "Yo‘l", ICON.road, ["/yol", "/modul", "/dars", "/imtihon", "/sertifikat"]], ["#/katalog", "Katalog", ICON.cat, ["/katalog"]], ["#/skriptlar", "Skriptlar", ICON.chat, ["/skriptlar"]], ["#/trenajor", "Trenajor", ICON.train, ["/trenajor"]], [admin ? "#/rahbar" : "#/profil", admin ? "Rahbar" : "Profil", ICON.user, ["/profil", "/rahbar", "/kompaniya", "/kirish"]]];
    $("#tabbar").innerHTML = tabs.map(function (t) {
      var on = t[3].some(function (p) { return path.indexOf(p) === 0; });
      return '<a href="' + t[0] + '" class="' + (on ? "on" : "") + '">' + t[2] + '<span>' + t[1] + '</span></a>';
    }).join("");
    var editBtn = Store.isAdmin()
      ? '<button type="button" class="btn btn--sm ' + (EDIT ? "btn--gold" : "btn--ghost") + '" id="editToggle" title="Tahrirlash rejimi" aria-pressed="' + EDIT + '">✏️<span class="hide-sm"> ' + (EDIT ? "Tahrirlash: ON" : "Tahrirlash") + '</span></button>'
      : "";
    $("#userChip").innerHTML = editBtn + (Store.user
      ? '<a class="userchip" href="#/profil" title="Profil"><span class="avatar">' + esc(initials(Store.user.name)) + '</span><span>' + esc(Store.user.name.split(" ")[0]) + '</span></a>'
      : '<a class="btn btn--sm btn--gold" href="#/kirish">Kirish</a>');
    var et = $("#editToggle");
    if (et) et.onclick = function () {
      EDIT = !EDIT;
      try { sessionStorage.setItem("mital.edit", EDIT ? "1" : "0"); } catch (e) { /* */ }
      document.body.classList.toggle("is-editing", EDIT);
      toast(EDIT ? "Tahrirlash rejimi yoqildi — ✏️ tugmalarini bosing" : "Tahrirlash rejimi o‘chirildi");
      route();
    };
    document.body.classList.toggle("is-editing", editing());
  }

  var routes = [];
  function on(re, fn, opts) { routes.push({ re: re, fn: fn, auth: opts && opts.auth, admin: opts && opts.admin }); }
  var leaveGuard = null;
  async function route(keepScroll) {
    if (leaveGuard && !leaveGuard()) return;
    leaveGuard = null;
    window.onbeforeunload = null;
    var path = (location.hash || "#/").slice(1) || "/";
    var y = window.scrollY;
    renderChrome(path);
    for (var i = 0; i < routes.length; i++) {
      var r = routes[i], m = path.match(r.re);
      if (m) {
        if (r.auth && !Store.user) { sessionStorage.setItem("mital.after", location.hash); go("#/kirish"); return; }
        if (r.admin && !Store.isAdmin()) { $app.innerHTML = page('<div class="empty"><h2 class="display h3">Faqat rahbar uchun</h2><p>Bu bo‘lim faqat rahbar hisobida ochiladi.</p></div>'); return; }
        try { await r.fn.apply(null, m.slice(1)); }
        catch (e) { console.error(e); $app.innerHTML = page('<div class="empty"><h2 class="display h3">Xatolik</h2><p>' + esc(e.message || e) + '</p></div>'); }
        $app.focus({ preventScroll: true });
        window.scrollTo(0, keepScroll === true ? y : 0);
        return;
      }
    }
    go("#/");
  }
  window.addEventListener("hashchange", function () { route(); });
  function page(inner, cls) { return '<div class="page ' + (cls || "") + '"><div class="wrap">' + inner + '</div></div>'; }
  function footer() {
    return '<footer class="footer"><div class="wrap"><span><b>MITAL Akademiya</b> · ' + esc(HOME.footer || "") + '</span><span><a href="#/kompaniya">Kompaniya</a> · <a href="' + esc(CFG.CONTACT_TELEGRAM || "#") + '" target="_blank" rel="noopener">Telegram orqali aloqa</a></span></div></footer>';
  }
  function localBanner() {
    return Store.mode === "local" ? '<div class="banner"><span>⚠️</span><div><b>Lokal rejim.</b> Progress va tahrirlar faqat shu qurilmada saqlanmoqda. Agentlar ko‘rishi uchun Supabase ulang (README.md).</div></div>' : "";
  }
  function editBar(inner) { return editing() ? '<div class="editbar"><span class="editbar__l">✏️ Tahrirlash</span>' + inner + '</div>' : ""; }

  /* =========================================================
     BOSH SAHIFA
     ========================================================= */
  on(/^\/$/, function () {
    var H = HOME;
    var nMod = C.modules.length, nLes = LESSONS.length;
    var nQ = LESSONS.reduce(function (s, l) { return s + (l.quiz ? l.quiz.length : 0); }, 0) + ((EX && EX.pool) || []).length;
    var cta = Store.user ? '<a class="btn btn--gold" href="#/yol">Davom etish <span class="arr">→</span></a>' : '<a class="btn btn--gold" href="#/kirish">O‘qishni boshlash <span class="arr">→</span></a>';
    var lastWeek = C.weeks.length ? C.weeks[C.weeks.length - 1].n : null;
    $app.innerHTML =
      '<section class="hero blueprint"><div class="wrap hero__in">' +
        '<div>' + editBar(eb("home", "✏️ Bosh sahifa matnlari") + eb("structure", "📚 Kurs tuzilmasi") + eb("settings", "⚙️ Sozlamalar")) +
          '<span class="eyebrow">' + esc(H.eyebrow) + '</span>' +
          '<h1 class="display h1 hero__title">' + esc(H.title1) + '<br><span class="stroke">' + esc(H.title2) + '</span><br><span class="gold">' + esc(H.title3) + '</span></h1>' +
          '<p class="lead">' + esc(H.lead) + '</p>' +
          '<div class="hero__cta">' + cta + '<a class="btn btn--ghost" href="#/katalog">Mahsulotlar katalogi</a></div>' +
          '<div class="hero__meta"><div><b>' + nMod + '</b><span>modul</span></div><div><b>' + nLes + '</b><span>dars</span></div><div><b>' + nQ + '+</b><span>savol</span></div><div><b>' + (C.days || 21) + '</b><span>kun</span></div></div>' +
        '</div>' +
        '<div class="hero__art">' + (H.heroImage ? '<img src="' + esc(imgSrc(H.heroImage)) + '" alt="" style="border-radius:20px;width:100%">' : heroArt()) + '</div>' +
      '</div></section>' +

      '<section class="section"><div class="wrap"><div class="sechead"><span class="eyebrow">Kurs maqsadi</span><h2 class="display h2">' + esc(H.outcomesTitle) + '</h2></div>' +
        '<div class="grid g3">' + (H.outcomes || []).map(function (o, i) { return '<div class="card card--flat"><div class="mono" style="color:var(--gold-ink);font-weight:700">' + pad(i + 1) + '</div><h3 style="font:800 15px/1.1 var(--f-display);text-transform:uppercase;margin:8px 0 6px">' + esc(o.t) + '</h3><p class="muted small" style="margin:0">' + esc(o.d) + '</p></div>'; }).join("") + '</div>' +
      '</div></section>' +

      '<section class="section" style="background:var(--paper-2)"><div class="wrap"><div class="sechead"><span class="eyebrow">Dastur</span><h2 class="display h2">' + (C.days || 21) + ' kunlik yo‘l</h2><p class="lead">' + C.weeks.length + ' bosqich. Har bir modul oldingisiga tayanadi.</p></div>' +
        '<div class="road">' + C.weeks.map(function (w) {
          var mods = C.modules.filter(function (m) { return m.week === w.n; });
          return '<div class="road__wk"><span class="spec spec--gold road__days">' + esc(w.days) + '</span><span class="eyebrow">' + w.n + '-hafta · ' + esc(w.code) + '</span><h3>' + esc(w.title) + '</h3><p class="muted small" style="margin:0">' + esc(w.sub) + '</p><ol>' +
            mods.map(function (m) { return '<li><b>' + pad(m.n) + '</b><span>' + esc(m.title) + (m.isNew ? '<span class="badge-new">YANGI</span>' : '') + '</span></li>'; }).join("") +
            (w.n === lastWeek ? '<li><b>★</b><span><strong>Yakuniy imtihon va sertifikat</strong></span></li>' : '') + '</ol></div>';
        }).join("") + '</div>' +
      '</div></section>' +

      '<section class="section"><div class="wrap"><div class="sechead"><span class="eyebrow">Muvaffaqiyat formulasi</span><h2 class="display h2">' + esc(H.formulaTitle) + '</h2><p class="lead">' + esc(H.formulaText) + '</p></div>' +
        '<div class="formula"><span class="f">Bilim</span><span class="op">×</span><span class="f">Tartib</span><span class="op">×</span><span class="f">Munosabat</span><span class="op">=</span><span class="f f--res">Natija</span></div>' +
      '</div></section>' +

      '<section class="section" style="background:var(--paper-2)"><div class="wrap"><div class="sechead"><span class="eyebrow">Ichida nima bor</span><h2 class="display h2">' + esc(H.insideTitle) + '</h2></div>' +
        '<div class="grid g3">' + (H.inside || []).map(function (o) { return '<div class="card card--flat"><h3 style="font:800 17px/1.08 var(--f-display);text-transform:uppercase;margin-bottom:8px">' + esc(o.t) + '</h3><p class="muted small" style="margin:0">' + esc(o.d) + '</p></div>'; }).join("") + '</div>' +
      '</div></section>' +

      '<section class="section"><div class="wrap"><div class="grid g2" style="align-items:center">' +
        '<div><span class="eyebrow">Agent darajasi</span><h2 class="display h2" style="margin:12px 0">' + esc(H.levelsTitle) + '</h2><p class="lead">' + esc(H.levelsText) + '</p></div>' +
        '<div class="ladder">' + C.levels.map(function (lv, i) { return '<div class="ladder__r' + (i === C.levels.length - 1 ? ' now' : '') + '"><b>' + esc(lv.code) + '</b><span>' + esc(lv.name) + '</span><small>' + (lv.min > 100 ? "imtihon" : lv.min + "%") + '</small></div>'; }).join("") + '</div>' +
      '</div></div></section>' +

      '<section class="section" style="padding-top:0"><div class="wrap"><div class="card" style="background:#0E1730;color:#F3F1EC;border:0;display:grid;gap:18px;padding:30px">' +
        '<h2 class="display h2">' + esc(H.ctaTitle) + '</h2><p style="color:rgba(243,241,236,.8);margin:0;max-width:56ch">' + esc(H.ctaText) + '</p><div>' + cta + '</div>' +
      '</div></div></section>' + footer();
  });

  function heroArt() {
    return '<svg viewBox="0 0 400 400" aria-hidden="true">' +
      '<defs><path id="hrT" d="M 70 200 A 130 130 0 0 1 330 200"/><path id="hrB" d="M 64 200 A 136 136 0 0 0 336 200"/></defs>' +
      '<circle cx="200" cy="200" r="188" fill="none" stroke="var(--line)" stroke-dasharray="3 7"/>' +
      '<circle cx="200" cy="200" r="168" fill="#0E1730"/>' +
      '<circle cx="200" cy="200" r="104" fill="var(--gold)"/>' +
      '<rect x="32" y="190" width="336" height="20" fill="var(--gold)"/>' +
      '<text font-family="JetBrains Mono, monospace" font-weight="700" font-size="20" letter-spacing="4" fill="#F3F1EC"><textPath href="#hrT" startOffset="50%" text-anchor="middle">MITAL · AKADEMIYA</textPath></text>' +
      '<text font-family="JetBrains Mono, monospace" font-weight="700" font-size="17" letter-spacing="3" fill="#F3F1EC"><textPath href="#hrB" startOffset="50%" text-anchor="middle" dominant-baseline="hanging">SERTIFIKATLANGAN AGENT</textPath></text>' +
      '<text x="200" y="228" text-anchor="middle" font-family="Inter, sans-serif" font-weight="700" font-size="78" fill="#1A1300">SQ</text>' +
      '<g font-family="JetBrains Mono, monospace" font-size="12" font-weight="700" fill="var(--ink-3)"><text x="8" y="28">SAE 5W-30</text><text x="300" y="28">API SQ</text><text x="8" y="390">ACEA A3/B4</text><text x="296" y="390">dexos1 G3</text></g>' +
      '</svg>';
  }

  /* =========================================================
     KIRISH / RO‘YXATDAN O‘TISH
     ========================================================= */
  on(/^\/kirish$/, function () {
    if (Store.user) { go("#/yol"); return; }
    var mode = "login";
    function draw() {
      $app.innerHTML = page('<div class="auth">' +
        '<div class="center" style="margin-bottom:22px">' + donut("SJ", "YANGI AGENT", 120) + '<h1 class="display h3" style="margin-top:14px">' + (mode === "login" ? "Xush kelibsiz" : "Ro‘yxatdan o‘tish") + '</h1><p class="muted small">Telefon raqam va parol bilan kiring</p></div>' +
        '<div class="card"><div class="seg" role="tablist"><button type="button" data-m="login" class="' + (mode === "login" ? "on" : "") + '">Kirish</button><button type="button" data-m="reg" class="' + (mode === "reg" ? "on" : "") + '">Ro‘yxatdan o‘tish</button></div>' +
        '<form id="authForm" class="stack" novalidate>' +
          (mode === "reg" ? '<div class="field"><label for="fName">Ism va familiya</label><input class="input" id="fName" autocomplete="name" placeholder="Masalan: Aziz Karimov" required></div>' : '') +
          '<div class="field"><label for="fPhone">Telefon raqam</label><input class="input" id="fPhone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+998 90 123 45 67" required></div>' +
          '<div class="field"><label for="fPass">Parol</label><input class="input" id="fPass" type="password" autocomplete="' + (mode === "reg" ? "new-password" : "current-password") + '" placeholder="Kamida 6 ta belgi" required></div>' +
          '<div class="err" id="fErr" role="alert"></div>' +
          '<button class="btn btn--gold btn--block" type="submit">' + (mode === "login" ? "Kirish" : "Ro‘yxatdan o‘tish") + ' <span class="arr">→</span></button>' +
        '</form>' +
        '<p class="tiny center" style="margin:16px 0 0">Parolni unutdingizmi? Rahbaringizga <a href="' + esc(CFG.CONTACT_TELEGRAM || "#") + '" target="_blank" rel="noopener">Telegram</a> orqali yozing.</p>' +
        '</div>' + (Store.mode === "local" ? '<p class="tiny center" style="margin-top:14px">Lokal rejim: ma’lumotlar faqat shu qurilmada. Birinchi ro‘yxatdan o‘tgan foydalanuvchi — rahbar.</p>' : '') +
        '</div>');
      $$(".seg button").forEach(function (b) { b.onclick = function () { mode = b.dataset.m; draw(); }; });
      $("#authForm").onsubmit = async function (e) {
        e.preventDefault();
        var btn = this.querySelector("button[type=submit]"); btn.disabled = true;
        $("#fErr").textContent = "";
        try {
          if (mode === "reg") await Store.register({ name: $("#fName").value, phone: $("#fPhone").value, password: $("#fPass").value });
          else await Store.login({ phone: $("#fPhone").value, password: $("#fPass").value });
          toast("Xush kelibsiz, " + Store.user.name.split(" ")[0] + "!");
          var after = sessionStorage.getItem("mital.after"); sessionStorage.removeItem("mital.after");
          go(after || (Store.isAdmin() && mode === "login" ? "#/rahbar" : "#/yol"));
        } catch (err) { $("#fErr").textContent = err.message || String(err); btn.disabled = false; }
      };
    }
    draw();
  });

  /* =========================================================
     MENING YO‘LIM (dashboard)
     ========================================================= */
  on(/^\/yol$/, function () {
    var st = stats(), ex = examPassed(), lv = level(st.pct, ex), nx = nextLesson(), be = bestExam();
    var nextCard = nx
      ? '<a class="card next" href="#/dars/' + nx.id + '" style="text-decoration:none"><span class="eyebrow">Keyingi dars · ' + nx.mod.n + '-modul</span><h3>' + esc(nx.title) + '</h3><p class="muted" style="margin:0">' + esc(nx.mod.title) + ' · ' + nx.min + ' daqiqa</p><span class="btn btn--gold" style="justify-self:start">' + (st.done ? "Davom etish" : "Boshlash") + ' <span class="arr">→</span></span><div class="next__bg">' + ICON.road + '</div></a>'
      : '<a class="card next" href="' + (ex ? "#/sertifikat" : "#/imtihon") + '" style="text-decoration:none"><span class="eyebrow">Barcha darslar tugadi</span><h3>' + (ex ? "Sertifikatingiz tayyor" : "Yakuniy imtihonga tayyorsiz") + '</h3><span class="btn btn--gold" style="justify-self:start">' + (ex ? "Sertifikatni ochish" : "Imtihonni boshlash") + ' <span class="arr">→</span></span></a>';
    var weeks = C.weeks.map(function (w) {
      var mods = C.modules.filter(function (m) { return m.week === w.n; });
      return '<div class="wk-title"><span class="spec spec--gold">' + esc(w.days) + '</span><h3>' + w.n + '-hafta · ' + esc(w.title) + '</h3><span class="muted small">' + esc(w.sub) + '</span>' + eb("module-new:" + w.n, "+ Modul qo‘shish", "ebtn--sm") + '</div><div class="modlist">' +
        mods.map(function (m) {
          var ms = modStats(m), lock = m.lessons.length ? !unlocked(m.lessons[0]) : false;
          return '<a class="mod ' + (ms.done === ms.total ? "done" : "") + (lock ? " locked" : "") + '" href="#/modul/' + m.id + '"><span class="mod__n">' + (lock ? ICON.lock : m.n) + '</span><span><span class="mod__t">' + esc(m.title) + (m.isNew ? '<span class="badge-new">YANGI</span>' : '') + '</span><span class="mod__s" style="display:block">' + esc(m.sub) + '</span></span><span class="mono small" style="color:var(--ink-3)">' + ms.done + '/' + ms.total + '</span><span class="mod__p">' + hbar(ms.pct) + '<span>' + ms.pct + '%</span></span></a>';
        }).join("") + '</div>';
    }).join("");
    var examLocked = st.done < st.total && !Store.isAdmin();
    var examCard = '<div class="card" style="margin-top:22px;display:flex;gap:18px;align-items:center;flex-wrap:wrap">' + donut(ex ? "SQ" : "★", "YAKUNIY IMTIHON", 96) +
      '<div class="grow"><h3 style="font:800 17px/1.08 var(--f-display);text-transform:uppercase">Yakuniy imtihon</h3><p class="muted small" style="margin:6px 0 0">' + CFG.EXAM.QUESTIONS + ' savol · ' + CFG.EXAM.MINUTES + ' daqiqa · o‘tish bali ' + CFG.EXAM.PASS_PERCENT + '%' + (be ? ' · eng yaxshi natija: <b>' + be.percent + '%</b>' : '') + '</p></div>' +
      (examLocked ? '<span class="spec">' + ICON.lock + ' Barcha darslardan keyin</span>' : '<a class="btn ' + (ex ? "btn--ghost" : "btn--gold") + '" href="' + (ex ? "#/sertifikat" : "#/imtihon") + '">' + (ex ? "Sertifikat" : "Boshlash") + '</a>') + '</div>';

    var orphan = C.modules.filter(function (m) { return !C.weeks.some(function (w) { return w.n === m.week; }); });
    if (orphan.length) weeks += '<div class="wk-title"><h3>Haftaga biriktirilmagan</h3></div><div class="modlist">' + orphan.map(function (m) { return '<a class="mod" href="#/modul/' + m.id + '"><span class="mod__n">' + m.n + '</span><span class="mod__t">' + esc(m.title) + '</span></a>'; }).join("") + '</div>';
    $app.innerHTML = page(localBanner() + editBar(eb("structure", "📚 Kurs tuzilmasi (haftalar, modullar, darajalar)") + eb("exam", "📝 Imtihon savollari") + eb("settings", "⚙️ Sozlamalar")) +
      '<div class="dash">' +
        '<div class="card" style="display:grid;gap:20px">' +
          '<div class="dash__hello">' + donut(lv.code, lv.name.toUpperCase(), 150) +
            '<div class="grow" style="min-width:200px"><span class="eyebrow">Mening yo‘lim</span><h1 style="margin:10px 0 6px">Salom, ' + esc(Store.user.name.split(" ")[0]) + '!</h1><p class="muted" style="margin:0">Darajangiz: <b>API ' + lv.code + '</b> — ' + lv.name + '</p></div>' + dip(st.pct) +
          '</div>' +
          '<div class="grid g4"><div class="stat"><b>' + st.done + '/' + st.total + '</b><span>dars o‘tildi</span></div><div class="stat"><b>' + (st.quizPct == null ? "—" : st.quizPct + "%") + '</b><span>testlar o‘rtachasi</span></div><div class="stat"><b>' + st.tasks + '</b><span>amaliy topshiriq</span></div><div class="stat"><b>' + (be ? be.percent + "%" : "—") + '</b><span>imtihon</span></div></div>' +
        '</div>' + nextCard +
      '</div>' + weeks + examCard) + footer();
  }, { auth: true });

  /* =========================================================
     MODUL
     ========================================================= */
  on(/^\/modul\/([\w-]+)$/, function (id) {
    var m = MBYID[id]; if (!m) { go("#/yol"); return; }
    var ms = modStats(m);
    var curId = (m.lessons.find(function (l) { return !passed(l.id); }) || {}).id;
    var pm = C.modules[m.n - 2], nm = C.modules[m.n];
    $app.innerHTML = page(
      '<nav class="crumbs"><a href="#/yol">Mening yo‘lim</a><span>/</span><span>' + m.n + '-modul</span></nav>' +
      editBar(eb("module:" + m.id, "✏️ Modulni tahrirlash") + eb("lesson-new:" + m.id, "+ Dars qo‘shish") + eb("module-del:" + m.id, "🗑 Modulni o‘chirish", "ebtn--danger")) +
      '<header class="modhead"><div class="modhead__n">' + pad(m.n) + '</div><span class="eyebrow">' + m.n + '-modul · ' + m.week + '-hafta' + (m.isNew ? ' · YANGI BOB' : '') + '</span><h1>' + esc(m.title) + '</h1><p>' + esc(m.sub) + '</p>' +
        '<ul class="outcomes">' + (m.outcomes || []).map(function (o) { return '<li>' + esc(o) + '</li>'; }).join("") + '</ul>' +
        '<div style="display:flex;gap:12px;align-items:center;position:relative"><div style="flex:1">' + hbar(ms.pct) + '</div><span class="mono">' + ms.done + '/' + ms.total + '</span></div></header>' +
      '<div class="lessons">' + m.lessons.map(function (l, i) {
        var ok = passed(l.id), lock = !unlocked(l);
        return '<a class="les ' + (ok ? "done" : "") + (l.id === curId && !lock ? " cur" : "") + (lock ? " locked" : "") + '" href="#/dars/' + l.id + '"><span class="les__ic">' + (ok ? "✓" : (lock ? ICON.lock : i + 1)) + '</span><span class="les__t">' + esc(l.title) + '</span><span class="les__m">' + l.min + ' daq' + (videoUrl(l) ? ' · video' : '') + '</span></a>';
      }).join("") + (m.lessons.length ? '' : '<div class="empty">Bu modulda hali dars yo‘q.</div>') + '</div>' +
      '<div class="lesson__nav">' + (pm ? '<a class="btn btn--ghost" href="#/modul/' + pm.id + '">← ' + pm.n + '-modul</a>' : '<span></span>') + (nm ? '<a class="btn btn--ghost" href="#/modul/' + nm.id + '">' + nm.n + '-modul →</a>' : '') + '</div>'
    ) + footer();
  }, { auth: true });

  /* =========================================================
     DARS
     ========================================================= */
  function renderBlocks(l) {
    var sec = 0;
    return l.blocks.map(function (b) {
      switch (b.t) {
        case "p": return '<p>' + b.h + '</p>';
        case "h": sec++; return '<h2><span class="sec">§ ' + l.mod.n + '.' + (l.idx + 1) + '.' + sec + '</span>' + b.h + '</h2>';
        case "ul": return '<ul>' + (b.items || []).map(function (x) { return '<li>' + x + '</li>'; }).join("") + '</ul>';
        case "ol": return '<ol>' + (b.items || []).map(function (x) { return '<li>' + x + '</li>'; }).join("") + '</ol>';
        case "call": return '<div class="block callout callout--' + (b.k || "tip") + '"><div class="callout__t">' + esc(b.title || "") + '</div>' + (String(b.h || "").indexOf("<p") === 0 ? b.h : '<p>' + (b.h || "") + '</p>') + '</div>';
        case "steps": return '<ol class="block steps">' + (b.items || []).map(function (s) { return '<li><div><b>' + s[0] + '</b><span>' + s[1] + '</span></div></li>'; }).join("") + '</ol>';
        case "table": return '<div class="block tbl-wrap"><table class="tbl"><thead><tr>' + (b.head || []).map(function (h) { return '<th>' + h + '</th>'; }).join("") + '</tr></thead><tbody>' + (b.rows || []).map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join("") + '</tr>'; }).join("") + '</tbody></table></div>';
        case "dialog": return '<div class="block">' + dialogHtml(b.lines || []) + '</div>';
        case "cmp": return '<div class="block compare"><div class="bad"><h4>✕ ' + (b.bad || [])[0] + '</h4><p>' + ((b.bad || [])[1] || '') + '</p></div><div class="good"><h4>✓ ' + (b.good || [])[0] + '</h4><p>' + ((b.good || [])[1] || '') + '</p></div></div>';
        case "ig": return '<div class="block">' + IG.html(b.k) + '</div>';
        case "img": return b.src ? '<figure class="block media"><img src="' + esc(imgSrc(b.src)) + '" alt="' + esc(b.alt || b.caption || "") + '" loading="lazy">' + (b.caption ? '<figcaption>' + esc(b.caption) + '</figcaption>' : '') + '</figure>' : "";
        case "yt": var yv = ytId(b.url); return yv ? '<figure class="block media"><div class="video" style="margin:0"><iframe src="https://www.youtube-nocookie.com/embed/' + yv + '?rel=0" title="' + esc(b.caption || "Video") + '" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"></iframe></div>' + (b.caption ? '<figcaption>' + esc(b.caption) + '</figcaption>' : '') + '</figure>' : "";
        case "link": return b.url ? '<p class="block"><a class="btn btn--ghost" href="' + esc(b.url) + '" target="_blank" rel="noopener">🔗 ' + esc(b.text || b.url) + '</a></p>' : "";
        case "task":
          var done = Store.progress[l.id] && Store.progress[l.id].task_done;
          return '<div class="task"><span class="eyebrow">Dalada bajariladi</span><h3 style="margin-top:8px">' + esc(b.title || "Amaliy topshiriq") + '</h3><p style="margin:0">' + b.h + '</p><label><input type="checkbox" id="taskChk" ' + (done ? "checked" : "") + '> Bajardim</label></div>';
        default: return "";
      }
    }).join("");
  }
  function dialogHtml(lines) {
    var who = { a: "Agent", c: "Mijoz", n: "Izoh" };
    return '<div class="dialog">' + lines.map(function (x) { return '<div class="dialog__l dialog__l--' + x[0] + '"><span class="dialog__who">' + who[x[0]] + '</span><div class="dialog__b">' + esc(x[1]) + '</div></div>'; }).join("") + '</div>';
  }

  function quizWidget(root, questions, onDone, opts) {
    opts = opts || {};
    var order = questions.map(function (q) { return shuffle(q.o.map(function (_, i) { return i; })); });
    var sel = questions.map(function () { return -1; });
    var checked = false;
    function draw() {
      root.innerHTML = '<div class="quiz__head"><h3>' + (opts.title || "Dars testi") + '</h3><span class="spec">' + questions.length + ' savol · o‘tish: ' + Math.ceil(questions.length * CFG.LESSON_PASS) + '/' + questions.length + '</span></div>' +
        '<div class="quiz__body">' + questions.map(function (q, qi) {
          return '<div class="q"><div class="q__t"><i>' + pad(qi + 1) + '</i><span>' + esc(q.q) + '</span></div><div class="opts' + (checked ? " locked" : "") + '" role="radiogroup">' +
            order[qi].map(function (oi, k) {
              var cls = "";
              if (checked) { if (oi === q.a) cls = "ok"; else if (sel[qi] === oi) cls = "no"; }
              else if (sel[qi] === oi) cls = "sel";
              return '<button type="button" class="opt ' + cls + '" data-q="' + qi + '" data-o="' + oi + '" role="radio" aria-checked="' + (sel[qi] === oi) + '"' + (checked ? " disabled" : "") + '><span class="opt__k">' + "ABCD"[k] + '</span><span>' + esc(q.o[oi]) + '</span></button>';
            }).join("") + '</div>' + (checked && q.why ? '<div class="why">' + esc(q.why) + '</div>' : '') + '</div>';
        }).join("") + '</div>' +
        '<div class="quiz__foot"><span class="small muted" id="qInfo">' + (checked ? "" : "Javoblar: " + sel.filter(function (x) { return x >= 0; }).length + "/" + questions.length) + '</span>' +
        (checked ? '<button type="button" class="btn btn--ghost" id="qRetry">Qayta topshirish</button>' : '<button type="button" class="btn btn--gold" id="qCheck"' + (sel.some(function (x) { return x < 0; }) ? " disabled" : "") + '>Tekshirish</button>') + '</div>';
      $$(".opt", root).forEach(function (b) { b.onclick = function () { if (checked) return; sel[+b.dataset.q] = +b.dataset.o; draw(); }; });
      var ck = $("#qCheck", root);
      if (ck) ck.onclick = async function () {
        checked = true;
        var score = questions.reduce(function (s, q, i) { return s + (sel[i] === q.a ? 1 : 0); }, 0);
        draw();
        await onDone(score, questions.length);
      };
      var rt = $("#qRetry", root);
      if (rt) rt.onclick = function () { checked = false; sel = questions.map(function () { return -1; }); order = questions.map(function (q) { return shuffle(q.o.map(function (_, i) { return i; })); }); draw(); };
    }
    draw();
  }

  on(/^\/dars\/([\w-]+)$/, function (id) {
    var l = LBYID[id]; if (!l) { go("#/yol"); return; }
    if (!unlocked(l)) { toast("Avval oldingi darsni tugating"); var nl = nextLesson(); go(nl ? "#/dars/" + nl.id : "#/yol"); return; }
    var m = l.mod, prev = LESSONS[l.gidx - 1], next = LESSONS[l.gidx + 1];
    var vid = ytId(videoUrl(l));
    var videoHtml = vid
      ? '<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/' + vid + '?rel=0" title="' + esc(l.title) + '" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"></iframe></div>'
      : '<div class="video video--empty">' + ICON.play + '<span>Bu dars uchun video tez orada qo‘shiladi.' + (Store.isAdmin() ? ' <button type="button" class="linkbtn" data-cms="lesson:' + l.id + '">Video qo‘shish →</button>' : '') + '</span></div>';
    $app.innerHTML = page(
      '<div class="lesson">' +
        '<aside class="lesson__side"><div class="side__mod">' + m.n + '-modul · ' + esc(m.title) + '</div><nav class="side__list">' +
          m.lessons.map(function (x, i) { return '<a href="#/dars/' + x.id + '" class="' + (x.id === l.id ? "on " : "") + (passed(x.id) ? "done " : "") + (!unlocked(x) ? "locked" : "") + '"><i>' + (passed(x.id) ? "✓" : m.n + "." + (i + 1)) + '</i><span>' + esc(x.title) + '</span></a>'; }).join("") +
        '</nav><div style="margin-top:16px"><a class="small" href="#/modul/' + m.id + '">← Modul sahifasi</a></div></aside>' +
        '<article class="lesson__main">' +
          '<nav class="crumbs"><a href="#/yol">Yo‘l</a><span>/</span><a href="#/modul/' + m.id + '">' + m.n + '-modul</a><span>/</span><span>' + (l.idx + 1) + '-dars</span></nav>' +
          editBar(eb("lesson:" + l.id, "✏️ Darsni tahrirlash") + eb("lesson-new:" + m.id, "+ Yangi dars") + eb("lesson-del:" + l.id, "🗑 Darsni o‘chirish", "ebtn--danger")) +
          '<header class="lesson__head"><span class="eyebrow">' + m.n + '-modul · ' + (l.idx + 1) + '-dars / ' + m.lessons.length + '</span><h1>' + esc(l.title) + '</h1>' +
          '<div class="lesson__meta"><span class="spec">' + l.min + ' daqiqa</span><span class="spec">' + (l.quiz || []).length + ' ta test savoli</span>' + (passed(l.id) ? '<span class="spec spec--green">✓ O‘tildi</span>' : '') + '</div></header>' +
          videoHtml +
          '<div class="prose">' + renderBlocks(l) + '</div>' +
          '<section class="keys"><h3>Asosiy xulosalar</h3><ul>' + (l.keys || []).map(function (k) { return '<li>' + esc(k) + '</li>'; }).join("") + '</ul></section>' +
          '<section class="quiz" id="quiz"></section>' +
          '<div class="lesson__nav">' + (prev ? '<a class="btn btn--ghost" href="#/dars/' + prev.id + '">← Oldingi</a>' : '<span></span>') +
            '<a class="btn btn--gold" id="nextBtn" href="' + (next ? "#/dars/" + next.id : "#/imtihon") + '"' + (passed(l.id) ? '' : ' aria-disabled="true" style="opacity:.45;pointer-events:none"') + '>' + (next ? (next.mod !== m ? (m.n + 1) + "-modulga o‘tish" : "Keyingi dars") : "Yakuniy imtihon") + ' <span class="arr">→</span></a></div>' +
        '</article>' +
      '</div>') + footer();
    IG.mount($app);
    var chk = $("#taskChk");
    if (chk) chk.onchange = async function () { try { await Store.saveTask(l.id, chk.checked); toast(chk.checked ? "Topshiriq bajarildi deb belgilandi" : "Belgi olib tashlandi"); } catch (e) { toast("Saqlanmadi: " + e.message); } };
    function unlockNext() { var nb = $("#nextBtn"); nb.removeAttribute("aria-disabled"); nb.style.opacity = ""; nb.style.pointerEvents = ""; renderChrome(location.hash.slice(1)); }
    if (!l.quiz.length) {
      $("#quiz").innerHTML = '<div class="quiz__foot"><span class="small muted">Bu darsda test yo‘q.</span>' + (passed(l.id) ? '<span class="spec spec--green">✓ O‘tildi</span>' : '<button type="button" class="btn btn--gold" id="markDone">Darsni tugatdim ✓</button>') + '</div>';
      var md = $("#markDone");
      if (md) md.onclick = async function () { try { await Store.saveLesson(l.id, { score: 0, total: 0, passed: true }); toast("Dars o‘tildi"); unlockNext(); md.outerHTML = '<span class="spec spec--green">✓ O‘tildi</span>'; } catch (e) { toast("Saqlanmadi: " + e.message); } };
      return;
    }
    quizWidget($("#quiz"), l.quiz || [], async function (score, total) {
      var ok = score / total >= CFG.LESSON_PASS;
      try { await Store.saveLesson(l.id, { score: score, total: total, passed: ok }); } catch (e) { toast("Saqlanmadi: " + e.message); }
      var info = $("#qInfo");
      if (info) info.innerHTML = ok ? '<b style="color:var(--green)">✓ ' + score + '/' + total + ' — dars o‘tildi!</b>' : '<b style="color:var(--red)">' + score + '/' + total + ' — yana bir bor urinib ko‘ring</b>';
      if (ok) { var nb = $("#nextBtn"); nb.removeAttribute("aria-disabled"); nb.style.opacity = ""; nb.style.pointerEvents = ""; toast("Ajoyib! Dars o‘tildi"); renderChrome(location.hash.slice(1)); }
    });
  }, { auth: true });

  /* =========================================================
     KATALOG + MOY TANLASH
     ========================================================= */
  var catState = { cat: "", brand: "", q: "" };
  on(/^\/katalog(?:\/(tanlash))?$/, function (tab) {
    var isPicker = tab === "tanlash";
    var head = '<div class="sechead"><span class="eyebrow">Kutubxona</span><h1 class="display h2">' + (isPicker ? "Moy tanlash" : "Mahsulotlar katalogi") + '</h1><p class="lead">' + (isPicker ? "3 ta savolga javob bering — mos mahsulotlarni ko‘rsatamiz. Yakuniy qaror har doim mashina qo‘llanmasidagi talab asosida." : "Xususiyatlar, standartlar, kimga mos va mijozga nima deyish kerak. Narxlar — joriy prays-listda.") + '</p></div>' + (isPicker ? '' : editBar(eb("product-new", "+ Yangi mahsulot") + eb("catalog-meta", "🏷 Brendlar va toifalar"))) +
      '<div class="tabs"><button type="button" class="' + (!isPicker ? "on" : "") + '" data-go="#/katalog">Katalog</button><button type="button" class="' + (isPicker ? "on" : "") + '" data-go="#/katalog/tanlash">Moy tanlash vositasi</button></div>';
    if (isPicker) { $app.innerHTML = page(head + '<div class="grid g2" style="align-items:start"><div class="card picker" id="picker"></div><div><div class="eyebrow" style="margin-bottom:12px">Tavsiyalar</div><div class="picker__res" id="pickRes"><div class="empty">Savollarga javob bering</div></div></div></div>') + footer(); bindTabs(); drawPicker(); return; }

    $app.innerHTML = page(head +
      '<div class="row" style="margin-bottom:12px"><input class="input grow" id="catQ" type="search" placeholder="Qidirish: 5W-30, dexos, Dexron, MB 229.5…" value="' + esc(catState.q) + '" aria-label="Qidirish" style="max-width:520px"></div>' +
      '<div class="filters" id="catF"></div><div class="filters" id="catB" style="margin-top:8px"></div>' +
      '<p class="tiny" id="catCount" style="margin:14px 0"></p><div class="pgrid" id="catGrid"></div>') + footer();
    bindTabs();
    function drawFilters() {
      var cats = [["", "Hammasi"]].concat(Object.keys(CAT.cats).map(function (k) { return [k, CAT.cats[k]]; }));
      $("#catF").innerHTML = cats.map(function (c) { var n = CAT.products.filter(function (p) { return !c[0] || p.cat === c[0]; }).length; return '<button type="button" class="chip ' + (catState.cat === c[0] ? "on" : "") + '" data-c="' + c[0] + '">' + c[1] + '<small>' + n + '</small></button>'; }).join("");
      var brands = [["", "Barcha brendlar"]].concat(Object.keys(CAT.brands).map(function (k) { return [k, CAT.brands[k].name + " · " + CAT.brands[k].origin]; }));
      $("#catB").innerHTML = brands.map(function (b) { return '<button type="button" class="chip ' + (catState.brand === b[0] ? "on" : "") + '" data-b="' + b[0] + '">' + b[1] + '</button>'; }).join("");
      $$("#catF .chip").forEach(function (b) { b.onclick = function () { catState.cat = b.dataset.c; drawFilters(); drawGrid(); }; });
      $$("#catB .chip").forEach(function (b) { b.onclick = function () { catState.brand = b.dataset.b; drawFilters(); drawGrid(); }; });
    }
    function drawGrid() {
      var q = catState.q.toLowerCase().trim();
      var list = CAT.products.filter(function (p) {
        if (catState.cat && p.cat !== catState.cat) return false;
        if (catState.brand && p.brand !== catState.brand) return false;
        if (!q) return true;
        return [p.name, p.sae, p.base, p.short].concat(p.specs, p.oem, p.forWhom).join(" ").toLowerCase().indexOf(q) >= 0;
      });
      $("#catCount").textContent = list.length + " ta mahsulot";
      $("#catGrid").innerHTML = list.length ? list.map(prodCard).join("") : '<div class="empty">Hech narsa topilmadi</div>';
      $$("#catGrid .prod").forEach(function (b) { b.onclick = function () { openProduct(b.dataset.id); }; });
    }
    $("#catQ").oninput = function (e) { catState.q = e.target.value; drawGrid(); };
    drawFilters(); drawGrid();
  });
  function bindTabs() { $$("[data-go]").forEach(function (b) { b.onclick = function () { go(b.dataset.go); }; }); }
  function brandSpec(p) { var b = CAT.brands[p.brand]; return '<span class="spec ' + (p.brand === "MITANOL" ? "spec--gold" : "") + '">' + b.name + ' · ' + b.flag + '</span>'; }
  function prodCard(p) {
    return '<button type="button" class="prod" data-id="' + p.id + '"><div class="prod__img"><img src="' + esc(imgSrc(p.img)) + '" alt="' + esc(p.name) + '" loading="lazy" width="900" height="900"><span class="prod__brand">' + brandSpec(p) + '</span></div>' +
      '<div class="prod__b"><div class="prod__name">' + esc(p.name) + '</div><div class="specs">' + [p.sae].concat(p.specs.slice(0, 2)).map(function (s) { return '<span class="spec">' + esc(s) + '</span>'; }).join("") + '</div><div class="prod__sub">' + esc(p.short) + '</div></div></button>';
  }
  function openProduct(id) {
    var p = PBYID[id], b = CAT.brands[p.brand];
    modal.open('<div class="pmodal"><div class="pmodal__img"><img src="' + esc(imgSrc(p.img)) + '" alt="' + esc(p.name) + '"></div><div class="pmodal__b">' +
      '<div class="row">' + brandSpec(p) + '<span class="spec">' + esc(CAT.cats[p.cat] || p.cat) + '</span>' + eb("product:" + p.id, "✏️ Tahrirlash", "ebtn--sm") + '</div>' +
      '<h2>' + esc(p.name) + '</h2><p class="muted" style="margin:0">' + esc(p.short) + '</p>' +
      '<dl class="kv"><div><dt>Yopishqoqlik</dt><dd><b>' + esc(p.sae) + '</b></dd></div><div><dt>Baza</dt><dd>' + esc(p.base) + '</dd></div><div><dt>Standartlar</dt><dd>' + p.specs.map(esc).join(" · ") + '</dd></div><div><dt>Qadoq</dt><dd>' + p.volumes.join(" · ") + '</dd></div><div><dt>Kelib chiqishi</dt><dd>' + b.origin + ' · ' + b.note + '</dd></div></dl>' +
      '<div class="say"><b>Mijozga nima deyish kerak</b>' + esc(p.say) + '</div>' +
      '<div><h4>Afzalliklari</h4><ul class="ticklist">' + p.benefits.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul></div>' +
      '<div><h4>Kimga taklif qilamiz</h4><ul class="ticklist">' + p.forWhom.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul></div>' +
      '<div><h4>Mos emas</h4><ul class="ticklist ticklist--no">' + p.notFor.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul></div>' +
      (p.oem.length ? '<div><h4>Tavsiyalar / talablarga javob beradi*</h4><div class="specs">' + p.oem.map(function (x) { return '<span class="spec">' + esc(x) + '</span>'; }).join("") + '</div><p class="tiny" style="margin-top:8px">* Ishlab chiqaruvchi hujjatidagi ro‘yxat. Har doim avtomobil qo‘llanmasidagi talab bilan solishtiring.</p></div>' : '') +
      '</div></div>');
  }
  function drawPicker() {
    var ans = {};
    function draw() {
      var qs = PICKER.questions.filter(function (q) { return !q.showIf || q.showIf.indexOf(ans.type) >= 0; });
      $("#picker").innerHTML = qs.map(function (q, i) {
        return '<div class="picker__q"><b>' + (i + 1) + '. ' + q.title + '</b><div class="picker__opts">' + q.opts.filter(function (o) {
          if (q.id !== "origin") return true;
          var truck = o[0].indexOf("truck") === 0;
          return ans.type === "yuk" ? truck : !truck;
        }).map(function (o) { return '<button type="button" class="chip ' + (ans[q.id] === o[0] ? "on" : "") + '" data-q="' + q.id + '" data-v="' + o[0] + '">' + o[1] + '</button>'; }).join("") + '</div></div>';
      }).join("") + '<button type="button" class="linkbtn small" id="pReset" style="justify-self:start">Qaytadan</button>';
      $$("#picker .chip").forEach(function (b) { b.onclick = function () { ans[b.dataset.q] = b.dataset.v; if (b.dataset.q === "type") { delete ans.origin; delete ans.age; } draw(); }; });
      $("#pReset").onclick = function () { ans = {}; draw(); };
      var need = qs.every(function (q) { return ans[q.id]; });
      var res = $("#pickRes");
      if (!need) { res.innerHTML = '<div class="empty">Barcha savollarga javob bering</div>'; return; }
      var rec = PICKER.recommend(ans);
      res.innerHTML = rec.map(function (r, i) { var p = PBYID[r.id]; return '<button type="button" class="rec ' + (i === 0 ? "rec--top" : "") + '" data-id="' + p.id + '"><img src="' + esc(imgSrc(p.img)) + '" alt=""><span><span class="rec__n">' + (i === 0 ? "★ " : "") + esc(p.name) + '</span><span class="rec__w" style="display:block">' + esc(r.why) + '</span></span></button>'; }).join("") +
        '<div class="callout callout--warn"><div class="callout__t">Esda tuting</div><p>Bu — yo‘naltiruvchi tavsiya. Yakuniy tanlov avtomobil qo‘llanmasidagi yopishqoqlik va dopusk asosida qilinadi.</p></div>';
      $$("#pickRes .rec").forEach(function (b) { b.onclick = function () { openProduct(b.dataset.id); }; });
    }
    draw();
  }

  /* =========================================================
     SKRIPTLAR
     ========================================================= */
  on(/^\/skriptlar(?:\/([\w-]+))?$/, function (sid) {
    var S = window.SCRIPTS || [], cur = S.find(function (s) { return s.id === sid; }) || S[0];
    if (!cur) { $app.innerHTML = page(editBar(eb("script-new", "+ Yangi skript")) + '<div class="empty">Skriptlar yo‘q</div>') + footer(); return; }
    $app.innerHTML = page('<div class="sechead"><span class="eyebrow">Kutubxona</span><h1 class="display h2">Jonli skriptlar</h1><p class="lead">Har bir skriptni yod oling, amalda qo‘llang va o‘zingizga moslang. Mashq uchun — <a href="#/trenajor">Trenajor</a>.</p></div>' + editBar(eb("script:" + cur.id, "✏️ Shu skriptni tahrirlash") + eb("script-new", "+ Yangi skript") + eb("script-del:" + cur.id, "🗑 O‘chirish", "ebtn--danger")) +
      '<div class="lib"><nav class="lib__nav" aria-label="Skriptlar">' + S.map(function (s) { return '<a class="chip ' + (s.id === cur.id ? "on" : "") + '" href="#/skriptlar/' + s.id + '">' + esc(s.title) + (s.hot ? ' 🔥' : '') + '</a>'; }).join("") + '</nav>' +
      '<article class="card"><div class="row"><span class="spec spec--gold">' + esc(cur.tag) + '</span></div><h2 class="display h3" style="margin:12px 0 6px">' + esc(cur.title) + '</h2><p class="muted"><b>Maqsad:</b> ' + esc(cur.goal) + '</p>' + dialogHtml(cur.lines) +
      '<div class="callout callout--tip" style="margin-top:18px"><div class="callout__t">Maslahatlar</div><ul style="margin:0;padding-left:1.1em">' + cur.tips.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("") + '</ul></div></article></div>') + footer();
  });

  /* =========================================================
     TRENAJOR
     ========================================================= */
  on(/^\/trenajor$/, function () {
    var deck = shuffle(window.TRAINER || []), i = 0, score = 0, answered = false, order = [];
    function draw() {
      if (i >= deck.length) {
        var pct = Math.round(score / deck.length * 100);
        $("#tr").innerHTML = '<div class="tcard"><div class="tcard__client"><span class="eyebrow">Natija</span><q>' + score + ' / ' + deck.length + '</q><div class="tcard__ctx">' + (pct >= 85 ? "Zo‘r! Siz e’tirozlarga tayyorsiz." : pct >= 60 ? "Yaxshi. Xato qilgan kartalarni qayta ko‘rib chiqing." : "Skriptlarni qayta o‘qing va yana urinib ko‘ring.") + '</div></div><div class="tcard__b"><button class="btn btn--gold" id="trAgain">Qayta boshlash</button><a class="btn btn--ghost" href="#/skriptlar">Skriptlarni o‘qish</a></div></div>';
        $("#trAgain").onclick = function () { deck = shuffle(window.TRAINER); i = 0; score = 0; answered = false; draw(); };
        return;
      }
      var c = deck[i];
      if (!answered) order = shuffle(c.o.map(function (_, k) { return k; }));
      $("#tr").innerHTML = '<div class="row" style="justify-content:space-between;margin-bottom:12px"><span class="mono small">' + (i + 1) + ' / ' + deck.length + '</span><span class="spec spec--green">✓ ' + score + '</span></div>' + hbar(Math.round(i / deck.length * 100)) +
        '<div class="tcard" style="margin-top:14px"><div class="tcard__client"><span class="eyebrow">Mijoz aytadi</span><q>' + esc(c.say) + '</q><div class="tcard__ctx">' + esc(c.ctx) + '</div></div><div class="tcard__b"><b class="small">Eng yaxshi javobni tanlang:</b><div class="opts' + (answered ? " locked" : "") + '">' +
        order.map(function (oi, k) {
          var cls = answered ? (oi === c.best ? "ok" : (oi === answered.pick ? "no" : "")) : "";
          return '<button type="button" class="opt ' + cls + '" data-o="' + oi + '"' + (answered ? " disabled" : "") + '><span class="opt__k">' + "ABC"[k] + '</span><span>' + esc(c.o[oi]) + '</span></button>';
        }).join("") + '</div>' + (answered ? '<div class="why">' + esc(c.why) + '</div><button type="button" class="btn btn--gold" id="trNext">' + (i + 1 < deck.length ? "Keyingi karta →" : "Natijani ko‘rish") + '</button>' : '') + '</div></div>';
      $$("#tr .opt").forEach(function (b) { b.onclick = function () { if (answered) return; var pick = +b.dataset.o; answered = { pick: pick }; if (pick === c.best) score++; draw(); }; });
      var nb = $("#trNext"); if (nb) nb.onclick = function () { i++; answered = false; draw(); };
    }
    $app.innerHTML = page('<div class="trainer"><div class="sechead"><span class="eyebrow">Mashq</span><h1 class="display h2">E’tirozlar trenajori</h1><p class="lead">Mijoz e’tiroziga eng yaxshi javobni tanlang. Har bir javobdan keyin izoh — nima uchun aynan shunday.</p></div>' + editBar(eb("trainer", "✏️ Trenajor kartalari")) + '<div id="tr"></div></div>') + footer();
    draw();
  });

  /* =========================================================
     IMTIHON
     ========================================================= */
  on(/^\/imtihon$/, function () {
    var st = stats(), E = CFG.EXAM;
    var last = Store.exams[Store.exams.length - 1];
    var waitMs = last && !last.passed ? (new Date(last.created_at).getTime() + E.COOLDOWN_HOURS * 3600000 - Date.now()) : 0;
    var locked = st.done < st.total && !Store.isAdmin();
    var ex = examPassed();
    var rules = ['<li><b>' + E.QUESTIONS + ' savol</b> — barcha modullardan, har safar boshqacha</li>', '<li><b>' + E.MINUTES + ' daqiqa</b> — vaqt tugasa, javoblar avtomatik topshiriladi</li>', '<li><b>' + E.PASS_PERCENT + '%</b> — o‘tish bali</li>', '<li>Yiqilsangiz, <b>' + E.COOLDOWN_HOURS + ' soat</b>dan keyin qayta topshirish mumkin</li>', '<li>Imtihon davomida sahifani yangilamang</li>'];
    var hist = Store.exams.length ? '<h3 style="font:800 15px/1.08 var(--f-display);text-transform:uppercase;margin:26px 0 12px">Urinishlar</h3><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Sana</th><th>Natija</th><th>Vaqt</th><th>Holat</th></tr></thead><tbody>' + Store.exams.slice().reverse().map(function (e) { return '<tr><td>' + fmtDate(e.created_at) + '</td><td>' + e.score + '/' + e.total + ' · <b>' + e.percent + '%</b></td><td>' + Math.round((e.duration_sec || 0) / 60) + ' daq</td><td>' + (e.passed ? '<span class="status status--ok">O‘tdi</span>' : '<span class="status status--idle">O‘tmadi</span>') + '</td></tr>'; }).join("") + '</tbody></table></div>' : "";
    var action;
    if (locked) action = '<div class="callout callout--rule"><div class="callout__t">Hali ochilmagan</div><p>Imtihon barcha ' + st.total + ' ta dars o‘tilgandan keyin ochiladi. Hozir: <b>' + st.done + '/' + st.total + '</b>.</p></div><a class="btn btn--gold" href="#/yol">Darslarga qaytish</a>';
    else if (waitMs > 0) action = '<div class="callout callout--warn"><div class="callout__t">Qayta topshirish</div><p>Keyingi urinish ' + Math.ceil(waitMs / 60000) + ' daqiqadan keyin ochiladi. Bu vaqtda xato qilgan mavzularingizni takrorlang.</p></div>';
    else action = '<button class="btn btn--gold" id="exStart">' + (ex ? "Yana topshirish" : "Imtihonni boshlash") + ' <span class="arr">→</span></button>' + (ex ? ' <a class="btn btn--ghost" href="#/sertifikat">Sertifikat</a>' : '');
    $app.innerHTML = page('<div style="max-width:760px;margin:0 auto"><div class="center" style="margin-bottom:22px">' + donut(ex ? "SQ" : "SP", "YAKUNIY IMTIHON", 140) + '</div><div class="sechead center" style="align-items:center"><span class="eyebrow">Yakuniy imtihon</span><h1 class="display h2">MITAL agenti bo‘lish uchun</h1></div>' + editBar(eb("exam", "✏️ Imtihon savollari va qoidalari")) +
      '<div class="card"><ul class="outcomes" style="color:var(--ink)">' + rules.join("") + '</ul><div class="row" style="margin-top:20px">' + action + '</div></div>' + hist + '</div>') + footer();
    var b = $("#exStart"); if (b) b.onclick = startExam;
  }, { auth: true });

  function buildExam() {
    var E = CFG.EXAM, take = EX.take || {}, qs = [];
    var pool = (EX.pool || []).filter(function (q) { return MBYID[q.m]; });
    Object.keys(take).forEach(function (m) { qs = qs.concat(shuffle(pool.filter(function (q) { return q.m === m; })).slice(0, take[m])); });
    if (qs.length < E.QUESTIONS) { var rest = shuffle(pool.filter(function (q) { return qs.indexOf(q) < 0; })); qs = qs.concat(rest.slice(0, E.QUESTIONS - qs.length)); }
    qs = shuffle(qs).slice(0, E.QUESTIONS);
    return qs.map(function (q) { return { q: q, order: shuffle(q.o.map(function (_, i) { return i; })), sel: -1 }; });
  }
  function startExam() {
    var E = CFG.EXAM, items = buildExam();
    if (!items.length) { toast("Imtihon savollari hali qo‘shilmagan"); return; }
    var cur = 0, t0 = Date.now(), endAt = t0 + E.MINUTES * 60000, timer, finished = false;
    leaveGuard = function () {
      if (finished) return true;
      var ok = confirm("Imtihonni tark etsangiz, natija saqlanmaydi. Chiqasizmi?");
      if (ok) { finished = true; clearInterval(timer); }
      else history.replaceState(null, "", "#/imtihon");
      return ok;
    };
    window.onbeforeunload = function () { return finished ? undefined : "Imtihon davom etmoqda"; };
    function draw() {
      var it = items[cur], q = it.q, mod = M(q.m);
      $app.innerHTML = '<div class="page"><div class="exam-top"><div class="wrap exam-top__in"><span class="mono small grow">Savol <b>' + (cur + 1) + '</b> / ' + items.length + '</span><span class="small muted">Javob: ' + items.filter(function (x) { return x.sel >= 0; }).length + '</span><span class="timer" id="exTimer">--:--</span></div><div class="wrap" style="margin-top:10px">' + hbar(Math.round((cur + 1) / items.length * 100), "hbar--blue") + '</div></div>' +
        '<div class="wrap" style="max-width:760px"><div class="card"><span class="spec">' + mod.n + '-modul · ' + esc(mod.title) + '</span><h2 style="font:700 21px/1.35 var(--f-body);margin:14px 0 16px">' + esc(q.q) + '</h2><div class="opts">' +
          it.order.map(function (oi, k) { return '<button type="button" class="opt ' + (it.sel === oi ? "sel" : "") + '" data-o="' + oi + '"><span class="opt__k">' + "ABCD"[k] + '</span><span>' + esc(q.o[oi]) + '</span></button>'; }).join("") +
        '</div><div class="lesson__nav" style="margin-top:20px"><button class="btn btn--ghost" id="exPrev"' + (cur === 0 ? " disabled" : "") + '>← Oldingi</button>' + (cur < items.length - 1 ? '<button class="btn btn--blue" id="exNext">Keyingi →</button>' : '<button class="btn btn--gold" id="exFinish">Yakunlash</button>') + '</div></div>' +
        '<div class="qnav" aria-label="Savollar">' + items.map(function (x, i) { return '<button type="button" class="' + (x.sel >= 0 ? "ans " : "") + (i === cur ? "on" : "") + '" data-i="' + i + '">' + (i + 1) + '</button>'; }).join("") + '</div>' +
        '<p class="tiny" style="margin-top:14px">Javobsiz savollar noto‘g‘ri hisoblanadi. Istalgan savolga qaytishingiz mumkin.</p></div></div>';
      $$(".opt").forEach(function (b) { b.onclick = function () { it.sel = +b.dataset.o; draw(); }; });
      $$(".qnav button").forEach(function (b) { b.onclick = function () { cur = +b.dataset.i; draw(); }; });
      var p = $("#exPrev"); if (p) p.onclick = function () { cur--; draw(); };
      var n = $("#exNext"); if (n) n.onclick = function () { cur++; draw(); };
      var f = $("#exFinish"); if (f) f.onclick = function () {
        var left = items.filter(function (x) { return x.sel < 0; }).length;
        if (left && !confirm(left + " ta savolga javob berilmagan. Baribir yakunlaysizmi?")) return;
        finish();
      };
      tick();
    }
    function tick() {
      var ms = endAt - Date.now(), el = $("#exTimer");
      if (ms <= 0) { finish(true); return; }
      if (el) { var s = Math.ceil(ms / 1000); el.textContent = pad(Math.floor(s / 60)) + ":" + pad(s % 60); el.classList.toggle("low", ms < 5 * 60000); }
    }
    async function finish(timeout) {
      if (finished) return; finished = true; clearInterval(timer); window.onbeforeunload = null; leaveGuard = null;
      var score = 0, byMod = {}, wrong = [];
      items.forEach(function (x) {
        var ok = x.sel === x.q.a; if (ok) score++;
        byMod[x.q.m] = byMod[x.q.m] || { ok: 0, total: 0 }; byMod[x.q.m].total++; if (ok) byMod[x.q.m].ok++;
        if (!ok) wrong.push({ m: x.q.m, q: x.q.q, pick: x.sel >= 0 ? x.q.o[x.sel] : null, right: x.q.o[x.q.a] });
      });
      var pct = Math.round(score / items.length * 100), pass = pct >= E.PASS_PERCENT;
      var att = { score: score, total: items.length, percent: pct, passed: pass, duration_sec: Math.round((Date.now() - t0) / 1000), by_module: byMod, wrong: wrong };
      try { await Store.saveExam(att); } catch (e) { toast("Natija saqlanmadi: " + e.message); }
      renderChrome("/imtihon");
      $app.innerHTML = page('<div style="max-width:820px;margin:0 auto">' + (timeout ? '<div class="banner">⏱ Vaqt tugadi — javoblar avtomatik topshirildi.</div>' : '') +
        '<div class="result-hero ' + (pass ? "pass" : "fail") + '"><span class="eyebrow">' + (pass ? "Tabriklaymiz! Imtihondan o‘tdingiz" : "Bu safar o‘tmadi") + '</span><b>' + pct + '%</b><p style="margin:0">' + score + ' / ' + items.length + ' to‘g‘ri javob · o‘tish bali ' + E.PASS_PERCENT + '%</p>' +
        '<div class="row" style="justify-content:center;margin-top:18px">' + (pass ? '<a class="btn btn--gold" href="#/sertifikat">Sertifikatni olish →</a>' : '<a class="btn btn--gold" href="#/yol">Mavzularni takrorlash</a>') + '</div></div>' +
        '<h3 style="font:800 17px/1.08 var(--f-display);text-transform:uppercase;margin:28px 0 12px">Modullar bo‘yicha</h3><div class="grid g2">' +
          Object.keys(byMod).sort().map(function (m) { var r = byMod[m], p = Math.round(r.ok / r.total * 100); return '<div class="card card--flat"><div class="row" style="justify-content:space-between"><b>' + M(m).n + '. ' + esc(M(m).title) + '</b><span class="mono">' + r.ok + '/' + r.total + '</span></div><div style="margin-top:10px">' + hbar(p, p < 60 ? "" : "hbar--blue") + '</div></div>'; }).join("") +
        '</div>' + (wrong.length ? '<h3 style="font:800 17px/1.08 var(--f-display);text-transform:uppercase;margin:28px 0 12px">Xatolar tahlili</h3><div class="stack">' + wrong.map(function (w) { return '<div class="card card--flat"><span class="spec">' + M(w.m).n + '-modul</span><p style="font-weight:700;margin:10px 0 6px">' + esc(w.q) + '</p><p class="small" style="margin:0;color:var(--red)">Sizning javobingiz: ' + esc(w.pick || "javob berilmagan") + '</p><p class="small" style="margin:4px 0 0;color:var(--green)">To‘g‘ri javob: ' + esc(w.right) + '</p></div>'; }).join("") + '</div>' : '') +
        '</div>') + footer();
      window.scrollTo(0, 0);
    }
    timer = setInterval(tick, 1000);
    draw();
  }

  /* =========================================================
     SERTIFIKAT
     ========================================================= */
  on(/^\/sertifikat$/, function () {
    var be = bestExam(), ok = examPassed();
    if (!ok) { $app.innerHTML = page('<div class="empty"><h2 class="display h3">Sertifikat hali yo‘q</h2><p>Yakuniy imtihondan ' + CFG.EXAM.PASS_PERCENT + '% va undan yuqori natija bilan o‘ting.</p><a class="btn btn--gold" href="#/imtihon">Imtihonga o‘tish</a></div>'); return; }
    var passEx = Store.exams.filter(function (e) { return e.passed; }).sort(function (a, b) { return b.percent - a.percent; })[0] || be;
    $app.innerHTML = page('<div class="cert-wrap"><div class="sechead"><span class="eyebrow">Tabriklaymiz</span><h1 class="display h2">Sizning sertifikatingiz</h1></div><canvas id="cert" width="1600" height="1130" aria-label="Sertifikat"></canvas><div class="row" style="margin-top:18px"><button class="btn btn--gold" id="certDl">PNG yuklab olish</button><a class="btn btn--ghost" href="#/yol">Mening yo‘lim</a></div></div>') + footer();
    var draw = function () { drawCert($("#cert"), Store.user, passEx); };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw); else draw();
    $("#certDl").onclick = function () { var a = document.createElement("a"); a.download = "MITAL-sertifikat-" + Store.user.name.replace(/\s+/g, "-") + ".png"; a.href = $("#cert").toDataURL("image/png"); a.click(); };
  }, { auth: true });

  function drawCert(cv, user, ex) {
    var x = cv.getContext("2d"), W = cv.width, H = cv.height;
    x.fillStyle = "#F3F1EC"; x.fillRect(0, 0, W, H);
    x.strokeStyle = "#E3DED2"; x.lineWidth = 1;
    for (var i = 0; i < W; i += 40) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, H); x.stroke(); }
    for (var j = 0; j < H; j += 40) { x.beginPath(); x.moveTo(0, j); x.lineTo(W, j); x.stroke(); }
    x.fillStyle = "#0E1730"; x.fillRect(0, 0, W, 26); x.fillRect(0, H - 26, W, 26);
    x.fillStyle = "#F2B705"; x.fillRect(0, 26, W, 8); x.fillRect(0, H - 34, W, 8);
    x.strokeStyle = "#0E1730"; x.lineWidth = 3; x.strokeRect(60, 80, W - 120, H - 160);
    x.fillStyle = "#0E1730"; x.font = "700 26px 'JetBrains Mono', monospace"; x.textAlign = "left";
    x.fillText("MITAL · AKADEMIYA", 110, 150);
    x.textAlign = "right"; x.fillText("№ " + certId(user, ex), W - 110, 150);
    x.textAlign = "left";
    x.font = "700 96px Inter, sans-serif"; x.fillText("SERTIFIKAT", 106, 300);
    x.font = "500 30px Inter, sans-serif"; x.fillStyle = "#48526E"; x.fillText("Ushbu sertifikat shuni tasdiqlaydiki", 110, 400);
    x.fillStyle = "#0E1730"; var nsz = 62; x.font = "700 " + nsz + "px Inter, sans-serif"; while (x.measureText(String(user.name).toUpperCase()).width > 880 && nsz > 30) { nsz -= 2; x.font = "700 " + nsz + "px Inter, sans-serif"; }
    x.fillText(String(user.name).toUpperCase(), 104, 505);
    x.fillStyle = "#F2B705"; x.fillRect(110, 528, 760, 8);
    x.fillStyle = "#48526E"; x.font = "500 30px Inter, sans-serif";
    wrap(x, "MITAL Akademiyaning 21 kunlik «MITAL Online Sales Academy» kursini to‘liq o‘tdi va yakuniy imtihonni muvaffaqiyatli topshirdi. Endi u — sertifikatlangan MITAL agenti.", 110, 600, 900, 44);
    var y = 820;
    [["NATIJA", ex.percent + "%"], ["SANA", fmtDate(ex.created_at)], ["DARAJA", "API SQ"]].forEach(function (k, i) {
      var bx = 110 + i * 330;
      x.fillStyle = "#7C849A"; x.font = "700 20px 'JetBrains Mono', monospace"; x.fillText(k[0], bx, y);
      x.fillStyle = "#0E1730"; x.font = "700 40px Inter, sans-serif"; x.fillText(k[1], bx, y + 58);
    });
    x.strokeStyle = "#0E1730"; x.lineWidth = 2; x.beginPath(); x.moveTo(110, 1000); x.lineTo(560, 1000); x.stroke();
    x.fillStyle = "#7C849A"; x.font = "600 20px 'JetBrains Mono', monospace"; x.fillText("RAHBAR IMZOSI", 110, 1030);
    /* API donut */
    var cx = 1270, cy = 560, R = 230;
    x.fillStyle = "#0E1730"; x.beginPath(); x.arc(cx, cy, R, 0, Math.PI * 2); x.fill();
    x.fillStyle = "#F2B705"; x.beginPath(); x.arc(cx, cy, R * .6, 0, Math.PI * 2); x.fill();
    x.fillRect(cx - R - 6, cy - 16, R * 2 + 12, 32);
    x.fillStyle = "#1A1300"; x.textAlign = "center"; x.font = "700 108px Inter, sans-serif"; x.fillText("SQ", cx, cy + 40);
    arcText(x, "MITAL · AKADEMIYA", cx, cy, R * .8, true);
    arcText(x, "SERTIFIKATLANGAN AGENT", cx, cy, R * .8, false);
    x.textAlign = "left";
  }
  function wrap(x, t, X, Y, w, lh) { var words = t.split(" "), line = ""; words.forEach(function (wd) { var test = line + wd + " "; if (x.measureText(test).width > w && line) { x.fillText(line, X, Y); line = wd + " "; Y += lh; } else line = test; }); x.fillText(line, X, Y); }
  function arcText(x, t, cx, cy, r, top) {
    x.save(); x.fillStyle = "#F3F1EC"; x.font = "700 30px 'JetBrains Mono', monospace"; x.textAlign = "center"; x.textBaseline = "middle";
    var chars = t.split(""), step = (top ? 0.105 : 0.085), start = (top ? -Math.PI / 2 : Math.PI / 2) - (top ? 1 : -1) * step * (chars.length - 1) / 2;
    chars.forEach(function (ch, i) {
      var a = start + (top ? 1 : -1) * step * i;
      x.save(); x.translate(cx + r * Math.cos(a), cy + r * Math.sin(a)); x.rotate(a + (top ? Math.PI / 2 : -Math.PI / 2)); x.fillText(ch, 0, 0); x.restore();
    });
    x.restore();
  }
  function certId(u, ex) { var s = (u.id || "") + (ex.created_at || ""), h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return "MA-" + new Date(ex.created_at || Date.now()).getFullYear() + "-" + h.toString(36).toUpperCase().slice(0, 6); }

  /* =========================================================
     KOMPANIYA
     ========================================================= */
  on(/^\/kompaniya$/, function () {
    var K = window.COMPANY;
    function ph(t, d) { return '<div class="placeholder"><b>To‘ldiriladi · ' + esc(t) + '</b>' + esc(d) + '</div>'; }
    $app.innerHTML = page('<div class="sechead"><span class="eyebrow">Kompaniya</span><h1 class="display h2">MITAL haqida</h1><p class="lead">' + esc(K.intro) + '</p></div>' + editBar(eb("company", "✏️ Kompaniya sahifasini tahrirlash") + eb("catalog-meta", "🏷 Brendlar")) +
      '<div class="grid g4" style="margin-bottom:26px">' + K.facts.map(function (f) { return '<div class="kpi" style="' + (f.todo ? "border-style:dashed" : "") + '"><b>' + esc(f.k) + '</b><span>' + esc(f.v) + '</span></div>'; }).join("") + '</div>' +
      (K.mission.todo ? ph(K.mission.title, K.mission.text) : '<div class="card"><h3>' + esc(K.mission.title) + '</h3><p>' + esc(K.mission.text) + '</p></div>') +
      '<h2 class="display h3" style="margin:36px 0 16px">Brendlarimiz</h2><div class="grid g3">' + Object.keys(CAT.brands).map(function (k) { var b = CAT.brands[k], n = CAT.products.filter(function (p) { return p.brand === k; }).length; return '<div class="brandcard"><span class="brandcard__flag">' + b.origin + '</span><h3>' + b.name + '</h3><p class="muted small" style="margin:0">' + b.note + ' · ' + n + ' ta mahsulot</p><a class="small" href="#/katalog" data-brand="' + k + '">Katalogda ko‘rish →</a></div>'; }).join("") + '</div>' +
      '<h2 class="display h3" style="margin:36px 0 16px">Tarix</h2><div class="timeline">' + K.timeline.map(function (t) { return '<div class="tl' + (t.todo ? " todo" : "") + '"><div class="tl__y">' + esc(t.y) + '</div><b>' + esc(t.t) + '</b><p class="muted" style="margin:4px 0 0">' + esc(t.d) + '</p>' + (t.note ? '<p class="tiny" style="margin:4px 0 0">⚠ ' + esc(t.note) + '</p>' : '') + '</div>'; }).join("") + '</div>' +
      '<h2 class="display h3" style="margin:36px 0 16px">Tez orada</h2><div class="grid g3">' + K.placeholders.map(function (p) { return ph(p.title, p.text); }).join("") + '</div>') + footer();
    $$("[data-brand]").forEach(function (a) { a.onclick = function () { catState.brand = a.dataset.brand; catState.cat = ""; }; });
  });

  /* =========================================================
     PROFIL
     ========================================================= */
  on(/^\/profil$/, function () {
    if (!Store.user) { go("#/kirish"); return; }
    var st = stats(), lv = level(st.pct, examPassed());
    $app.innerHTML = page('<div style="max-width:620px;margin:0 auto"><div class="card" style="display:flex;gap:20px;align-items:center;flex-wrap:wrap">' + donut(lv.code, lv.name.toUpperCase(), 120) + '<div class="grow"><h1 class="display h3">' + esc(Store.user.name) + '</h1><p class="muted" style="margin:6px 0 0">' + esc(fmtPhone(Store.user.phone)) + ' · ' + (Store.isAdmin() ? "Rahbar" : "Agent") + '</p></div></div>' +
      '<div class="stack" style="margin-top:16px"><a class="btn btn--ghost btn--block" href="#/yol">Mening yo‘lim</a>' + (Store.isAdmin() ? '<a class="btn btn--ghost btn--block" href="#/rahbar">Rahbar paneli</a>' : '') + '<a class="btn btn--ghost btn--block" href="#/imtihon">Imtihon</a><a class="btn btn--ghost btn--block" href="#/kompaniya">Kompaniya haqida</a><a class="btn btn--ghost btn--block" href="' + esc(CFG.CONTACT_TELEGRAM || "#") + '" target="_blank" rel="noopener">Rahbarga yozish (Telegram)</a><button class="btn btn--block" id="logout">Chiqish</button></div>' +
      '<p class="tiny center" style="margin-top:18px">Rejim: ' + (Store.mode === "cloud" ? "Supabase (bulut)" : "lokal (shu qurilma)") + '</p></div>') + footer();
    $("#logout").onclick = async function () { await Store.logout(); toast("Hisobdan chiqdingiz"); go("#/"); };
  });

  /* =========================================================
     RAHBAR PANELI
     ========================================================= */
  on(/^\/rahbar(?:\/(agentlar|savollar|videolar|kontent))?$/, async function (tab) {
    tab = tab || "agentlar";
    $app.innerHTML = page('<div class="empty">Yuklanmoqda…</div>');
    var agents = (await Store.listAgents()).filter(function (a) { return a.role !== "admin"; });
    var rows = agents.map(function (a) {
      var s = stats(a.progress), be = bestExam(a.exams), ex = examPassed(a.exams);
      var cur = LESSONS.find(function (l) { return !(a.progress[l.id] && a.progress[l.id].passed); });
      var lastAct = a.last_seen || a.created_at;
      Object.keys(a.progress).forEach(function (k) { var u = a.progress[k].updated_at; if (u && (!lastAct || u > lastAct)) lastAct = u; });
      var days = lastAct ? (Date.now() - new Date(lastAct).getTime()) / 86400000 : 99;
      var status = ex ? ["ok", "Sertifikat"] : s.done === 0 ? ["new", "Boshlamagan"] : days > 3 ? ["idle", days > 30 ? "Faol emas" : Math.floor(days) + " kun nofaol"] : ["run", "O‘qiyapti"];
      return { a: a, s: s, be: be, ex: ex, cur: cur, last: lastAct, status: status };
    });
    var tot = rows.length, cert = rows.filter(function (r) { return r.ex; }).length;
    var avg = tot ? Math.round(rows.reduce(function (s, r) { return s + r.s.pct; }, 0) / tot) : 0;
    var idle = rows.filter(function (r) { return r.status[0] === "idle"; }).length;
    var head = '<div class="sechead"><span class="eyebrow">Rahbar paneli</span><h1 class="display h2">Jamoa progressi</h1></div>' + localBanner() +
      '<div class="kpis" style="margin-bottom:22px"><div class="kpi"><b>' + tot + '</b><span>agent</span></div><div class="kpi"><b>' + avg + '%</b><span>o‘rtacha progress</span></div><div class="kpi"><b>' + cert + '</b><span>sertifikat olgan</span></div><div class="kpi"><b style="color:' + (idle ? "var(--red)" : "inherit") + '">' + idle + '</b><span>3+ kun nofaol</span></div></div>' +
      '<div class="tabs">' + [["agentlar", "Agentlar"], ["savollar", "Qiyin savollar"], ["videolar", "Videolar"], ["kontent", "Kontent va tarix"]].map(function (t) { return '<button type="button" class="' + (tab === t[0] ? "on" : "") + '" data-go="#/rahbar/' + t[0] + '">' + t[1] + '</button>'; }).join("") + '</div>';
    var body = "";
    if (tab === "agentlar") {
      body = rows.length ? '<div class="row" style="justify-content:flex-end;margin-bottom:10px"><button class="btn btn--sm btn--ghost" id="csv">CSV yuklab olish</button></div><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Agent</th><th>Progress</th><th>Joriy dars</th><th>Testlar</th><th>Topshiriq</th><th>Imtihon</th><th>Faollik</th><th>Holat</th></tr></thead><tbody>' +
        rows.map(function (r, i) {
          return '<tr class="click" data-i="' + i + '"><td>' + esc(r.a.name) + '<div class="tiny">' + esc(fmtPhone(r.a.phone)) + '</div></td><td><span class="mini">' + hbar(r.s.pct) + '<span class="mono small">' + r.s.done + '/' + r.s.total + '</span></span></td><td class="small">' + (r.cur ? r.cur.mod.n + '.' + (r.cur.idx + 1) + ' ' + esc(r.cur.title) : '—') + '</td><td>' + (r.s.quizPct == null ? "—" : r.s.quizPct + "%") + '</td><td>' + r.s.tasks + '</td><td>' + (r.be ? r.be.percent + '%' + (r.ex ? ' ✓' : '') : '—') + '</td><td class="small">' + fmtAgo(r.last) + '</td><td><span class="status status--' + r.status[0] + '">' + r.status[1] + '</span></td></tr>';
        }).join("") + '</tbody></table></div>'
        : '<div class="empty"><h3 class="display h3">Hali agentlar yo‘q</h3><p>Agentlarga sayt havolasini yuboring — ular telefon raqami bilan ro‘yxatdan o‘tadi va shu yerda ko‘rinadi.</p></div>';
    } else if (tab === "savollar") {
      var cnt = {}, modAgg = {};
      rows.forEach(function (r) { r.a.exams.forEach(function (e) {
        (e.wrong || []).forEach(function (w) { var k = w.q; cnt[k] = cnt[k] || { q: w.q, m: w.m, n: 0, right: w.right }; cnt[k].n++; });
        Object.keys(e.by_module || {}).forEach(function (m) { modAgg[m] = modAgg[m] || { ok: 0, total: 0 }; modAgg[m].ok += e.by_module[m].ok; modAgg[m].total += e.by_module[m].total; });
      }); });
      var lessonAgg = LESSONS.map(function (l) { var a = 0, n = 0; rows.forEach(function (r) { var p = r.a.progress[l.id]; if (p && p.attempts) { a += p.attempts; n++; } }); return { l: l, avg: n ? a / n : 0, n: n }; }).filter(function (x) { return x.n; }).sort(function (a, b) { return b.avg - a.avg; }).slice(0, 8);
      var top = Object.keys(cnt).map(function (k) { return cnt[k]; }).sort(function (a, b) { return b.n - a.n; }).slice(0, 12);
      body = '<div class="grid g2" style="align-items:start"><div><h3 style="font:800 15px/1.08 var(--f-display);text-transform:uppercase;margin-bottom:12px">Imtihon: modullar bo‘yicha</h3>' +
        (Object.keys(modAgg).length ? '<div class="stack">' + C.modules.filter(function (m) { return modAgg[m.id]; }).map(function (m) { var r = modAgg[m.id], p = Math.round(r.ok / r.total * 100); return '<div><div class="row" style="justify-content:space-between"><span class="small"><b>' + m.n + '.</b> ' + esc(m.title) + '</span><span class="mono small">' + p + '%</span></div>' + hbar(p, p >= 80 ? "hbar--blue" : "") + '</div>'; }).join("") + '</div>' : '<p class="muted">Hali imtihon topshirilmagan.</p>') +
        '<h3 style="font:800 15px/1.08 var(--f-display);text-transform:uppercase;margin:26px 0 12px">Ko‘p qayta topshirilgan darslar</h3>' + (lessonAgg.length ? '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Dars</th><th>O‘rtacha urinish</th></tr></thead><tbody>' + lessonAgg.map(function (x) { return '<tr><td class="small">' + x.l.mod.n + '.' + (x.l.idx + 1) + ' ' + esc(x.l.title) + '</td><td>' + x.avg.toFixed(1) + '</td></tr>'; }).join("") + '</tbody></table></div>' : '<p class="muted">Ma’lumot yo‘q.</p>') +
        '</div><div><h3 style="font:800 15px/1.08 var(--f-display);text-transform:uppercase;margin-bottom:12px">Eng ko‘p xato qilingan savollar</h3>' +
        (top.length ? '<div class="stack">' + top.map(function (t) { return '<div class="card card--flat"><div class="row" style="justify-content:space-between"><span class="spec">' + M(t.m).n + '-modul</span><span class="status status--idle">' + t.n + ' xato</span></div><p style="font-weight:600;margin:10px 0 4px">' + esc(t.q) + '</p><p class="small" style="margin:0;color:var(--green)">✓ ' + esc(t.right) + '</p></div>'; }).join("") + '</div>' : '<p class="muted">Hali ma’lumot yo‘q.</p>') + '</div></div>';
    } else if (tab === "kontent") {
      body = '<div id="cmsPanel"></div>';
    } else {
      body = '<div class="callout callout--tip" style="margin-bottom:16px"><div class="callout__t">Qanday ishlaydi</div><p>YouTube havolasini qo‘ying (masalan, https://youtu.be/XXXXXXXXXXX) va “Saqlash” ni bosing. Video darhol dars sahifasida chiqadi.' + (Store.mode === "local" ? ' <b>Lokal rejimda</b> video faqat shu qurilmada saqlanadi — doimiy qilish uchun havolani content/modules/mN.js faylidagi <code>video: ""</code> maydoniga yozing.' : '') + '</p></div>' +
        C.modules.map(function (m) {
          return '<h3 style="font:800 13px/1.08 var(--f-display);text-transform:uppercase;margin:22px 0 6px">' + m.n + '. ' + esc(m.title) + '</h3><div class="card card--flat" style="padding:4px 16px">' + m.lessons.map(function (l) {
            var v = videoUrl(l);
            return '<div class="vrow"><span class="small"><b>' + m.n + '.' + (l.idx + 1) + '</b> ' + esc(l.title) + '</span><input class="input input--sm" data-lid="' + l.id + '" placeholder="https://youtu.be/..." value="' + esc(v) + '" aria-label="Video havolasi: ' + esc(l.title) + '"><div class="row" style="gap:6px"><button class="btn btn--sm btn--gold" data-save="' + l.id + '">Saqlash</button>' + (v ? '<a class="btn btn--sm btn--ghost" href="#/dars/' + l.id + '">Ko‘rish</a>' : '') + '</div></div>';
          }).join("") + '</div>';
        }).join("");
    }
    $app.innerHTML = page(head + body) + footer();
    bindTabs();
    if (tab === "kontent" && window.CMS) CMS.panel($("#cmsPanel"));
    $$("tr.click").forEach(function (tr) { tr.onclick = function () { agentModal(rows[+tr.dataset.i]); }; });
    var csv = $("#csv"); if (csv) csv.onclick = function () { exportCsv(rows); };
    $$("[data-save]").forEach(function (b) {
      b.onclick = async function () {
        var id = b.dataset.save, inp = $('[data-lid="' + id + '"]'), v = inp.value.trim();
        if (v && !ytId(v)) { toast("YouTube havolasi noto‘g‘ri"); inp.focus(); return; }
        b.disabled = true;
        try { LBYID[id].video = v; if (!v && Store.videos[id]) await Store.setVideo(id, ""); await Store.saveContent("course", C, "Video: " + LBYID[id].title); reindex(); toast(v ? "Video saqlandi" : "Video olib tashlandi"); } catch (e) { toast("Saqlanmadi: " + e.message); }
        b.disabled = false;
      };
    });
  }, { auth: true, admin: true });

  function agentModal(r) {
    var a = r.a;
    modal.open('<div style="padding:24px"><div class="row" style="gap:16px;padding-right:44px">' + donut(level(r.s.pct, r.ex).code, "AGENT", 90) + '<div><h2 class="display h3">' + esc(a.name) + '</h2><p class="muted small" style="margin:4px 0 0">' + esc(fmtPhone(a.phone)) + ' · ro‘yxatdan o‘tgan: ' + fmtDate(a.created_at) + ' · faollik: ' + fmtAgo(r.last) + '</p></div></div>' +
      '<div class="kpis" style="margin:18px 0"><div class="kpi"><b>' + r.s.pct + '%</b><span>progress</span></div><div class="kpi"><b>' + (r.s.quizPct == null ? "—" : r.s.quizPct + "%") + '</b><span>testlar</span></div><div class="kpi"><b>' + r.s.tasks + '</b><span>topshiriqlar</span></div><div class="kpi"><b>' + (r.be ? r.be.percent + "%" : "—") + '</b><span>imtihon</span></div></div>' +
      C.modules.map(function (m) {
        var ms = modStats(m, a.progress);
        return '<details class="more" style="padding:10px 0;border-bottom:1px solid var(--line-2)"><summary><span style="display:inline-flex;gap:12px;align-items:center;width:calc(100% - 20px)"><b style="min-width:24px">' + m.n + '</b><span class="grow small" style="color:var(--ink)">' + esc(m.title) + '</span><span class="mini" style="min-width:140px">' + hbar(ms.pct) + '<span class="mono small">' + ms.done + '/' + ms.total + '</span></span></span></summary><div class="tbl-wrap" style="margin-top:10px"><table class="tbl"><thead><tr><th>Dars</th><th>Test</th><th>Urinish</th><th>Topshiriq</th><th>Sana</th></tr></thead><tbody>' +
          m.lessons.map(function (l) { var p = a.progress[l.id] || {}; return '<tr><td class="small">' + m.n + '.' + (l.idx + 1) + ' ' + esc(l.title) + '</td><td>' + (p.total ? p.score + '/' + p.total + (p.passed ? ' ✓' : '') : '—') + '</td><td>' + (p.attempts || 0) + '</td><td>' + (p.task_done ? '✓' : '—') + '</td><td class="small">' + fmtDate(p.completed_at) + '</td></tr>'; }).join("") +
          '</tbody></table></div></details>';
      }).join("") +
      (a.exams.length ? '<h3 style="font:800 13px/1.08 var(--f-display);text-transform:uppercase;margin:22px 0 10px">Imtihon urinishlari</h3><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Sana</th><th>Natija</th><th>Vaqt</th><th>Zaif modul</th></tr></thead><tbody>' + a.exams.slice().reverse().map(function (e) {
        var weak = Object.keys(e.by_module || {}).map(function (m) { return [m, e.by_module[m].ok / e.by_module[m].total]; }).sort(function (x, y) { return x[1] - y[1]; })[0];
        return '<tr><td>' + fmtDate(e.created_at) + '</td><td><b>' + e.percent + '%</b> ' + (e.passed ? '✓' : '') + '</td><td>' + Math.round((e.duration_sec || 0) / 60) + ' daq</td><td class="small">' + (weak ? M(weak[0]).n + '. ' + esc(M(weak[0]).title) : '—') + '</td></tr>';
      }).join("") + '</tbody></table></div>' : '') + '</div>');
  }
  function exportCsv(rows) {
    var head = ["Ism", "Telefon", "Ro'yxatdan o'tgan", "Darslar", "Progress %", "Testlar %", "Topshiriqlar", "Imtihon %", "Sertifikat", "Oxirgi faollik"];
    var lines = [head].concat(rows.map(function (r) { return [r.a.name, fmtPhone(r.a.phone), fmtDate(r.a.created_at), r.s.done + "/" + r.s.total, r.s.pct, r.s.quizPct == null ? "" : r.s.quizPct, r.s.tasks, r.be ? r.be.percent : "", r.ex ? "ha" : "yo'q", fmtDate(r.last)]; }));
    var csv = "﻿" + lines.map(function (l) { return l.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(";"); }).join("\n");
    var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" })); a.download = "mital-agentlar-" + fmtDate(new Date().toISOString()) + ".csv"; a.click();
  }

  /* ---------------- Mavzu (kun/tun) ---------------- */
  (function theme() {
    var saved = null; try { saved = localStorage.getItem("mital.theme"); } catch (e) { /* */ }
    if (saved) document.documentElement.setAttribute("data-theme", saved);
    $("#themeBtn").onclick = function () {
      var cur = document.documentElement.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      var nx = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", nx);
      try { localStorage.setItem("mital.theme", nx); } catch (e) { /* */ }
    };
  })();

  /* ---------------- Ishga tushirish ---------------- */
  /* Tahrirlovchi (cms.js) uchun ichki API */
  window.APP = {
    reindex: reindex, route: route, toast: toast, modal: modal, esc: esc, go: go, imgSrc: imgSrc, ytId: ytId,
    lessons: function () { return LESSONS; }, lesson: function (id) { return LBYID[id]; }, module: function (id) { return MBYID[id]; }
  };
  /* Tez start: keshdan darhol chizamiz, yangi ma'lumotni fonda olamiz */
  function safeToRerender() {
    return !leaveGuard && !document.querySelector(".sheet") && !document.querySelector("#modal.open") &&
      !document.querySelector(".opt.sel, .opt.ok, .opt.no") && !(document.activeElement && /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName));
  }
  async function boot() {
    try { await Store.init(); } catch (e) { console.error(e); }
    if (Store.mode === "cloud" && !Store.cached) {
      $app.innerHTML = '<div class="page"><div class="wrap"><div class="empty">Yuklanmoqda…</div></div></div>';
      try { await Store.refresh(); } catch (e) { console.error(e); }
    }
    reindex(); route();
    if (Store.mode === "cloud" && Store.cached) {
      Store.refresh().then(function (changed) {
        if (changed && safeToRerender()) { reindex(); route(true); }
      }, function (e) { console.error(e); });
    }
  }
  boot();
})();
