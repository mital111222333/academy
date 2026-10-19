/* =========================================================
   MITAL Akademiya — TAHRIRLOVCHI (faqat rahbar uchun)
   Saytning istalgan qismini qo‘shish / o‘zgartirish / o‘chirish:
   darslar, bloklar, rasmlar, havolalar, testlar, katalog,
   skriptlar, trenajor, imtihon, kompaniya, bosh sahifa, sozlamalar.
   ========================================================= */
(function () {
  "use strict";
  var CFG = window.MITAL_CONFIG;

  /* ---------------- yordamchilar ---------------- */
  function A() { return window.APP; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function el(tag, attrs, kids) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (k === "class") e.className = v;
      else if (k === "html") e.innerHTML = v;
      else if (k === "text") e.textContent = v;
      else if (k.slice(0, 2) === "on") e.addEventListener(k.slice(2), v);
      else if (v !== undefined && v !== null && v !== false) e.setAttribute(k, v === true ? "" : v);
    });
    (kids || []).forEach(function (c) { if (c != null) e.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return e;
  }
  function clone(v) { return Store.clone(v); }
  function newId(p) { return p + "-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function toast(m) { A().toast(m); }
  function snip(s, n) { s = String(s || "").replace(/<[^>]+>/g, "").trim(); n = n || 60; return s.length > n ? s.slice(0, n) + "…" : s; }
  function move(arr, i, d) { var j = i + d; if (j < 0 || j >= arr.length) return; var t = arr[i]; arr[i] = arr[j]; arr[j] = t; }

  /* =========================================================
     FORMA DVIGATELI
     def: { k, t, label, help, opts, cols, fields, title, add, ... }
     ========================================================= */
  function fieldWrap(def, control) {
    return el("div", { class: "f" + (def.wide ? " f--wide" : "") }, [
      def.label ? el("label", { class: "f__l", text: def.label }) : null,
      control,
      def.help ? el("div", { class: "f__h", html: def.help }) : null
    ]);
  }

  function renderField(obj, def, ctx) {
    var t = def.t || "text", v = obj[def.k];
    switch (t) {
      case "text": case "url": case "number": {
        var inp = el("input", { class: "input input--sm", type: t === "number" ? "number" : (t === "url" ? "url" : "text"), value: v == null ? "" : v, placeholder: def.ph || "", step: def.step || null, min: def.min, max: def.max });
        inp.addEventListener("input", function () { obj[def.k] = t === "number" ? (inp.value === "" ? null : +inp.value) : inp.value; ctx.dirty(); if (def.onInput) def.onInput(obj, inp.value); });
        return fieldWrap(def, inp);
      }
      case "textarea": case "html": {
        var ta = el("textarea", { class: "input input--sm", rows: def.rows || (t === "html" ? 4 : 3), placeholder: def.ph || "" });
        ta.value = v == null ? "" : v;
        ta.addEventListener("input", function () { obj[def.k] = ta.value; ctx.dirty(); });
        var box = ta;
        if (t === "html") {
          var tb = el("div", { class: "tb" }, [
            tbBtn("B", "Qalin", function () { wrapSel(ta, "<b>", "</b>"); }),
            tbBtn("Belgi", "Sariq bilan belgilash", function () { wrapSel(ta, "<em>", "</em>"); }),
            tbBtn("🔗", "Havola", function () { var u = prompt("Havola (https://...)"); if (u) wrapSel(ta, '<a href="' + u.replace(/"/g, "") + '" target="_blank" rel="noopener">', "</a>"); }),
            tbBtn("↵", "Yangi qator", function () { wrapSel(ta, "<br>", ""); })
          ]);
          box = el("div", {}, [tb, ta]);
        }
        return fieldWrap(def, box);
      }
      case "bool": {
        var cb = el("input", { type: "checkbox" }); cb.checked = !!v;
        cb.addEventListener("change", function () { obj[def.k] = cb.checked; ctx.dirty(); });
        return el("label", { class: "f f--check" }, [cb, el("span", { text: def.label })]);
      }
      case "select": {
        var opts = typeof def.opts === "function" ? def.opts(obj) : def.opts;
        var sel = el("select", { class: "input input--sm" }, opts.map(function (o) {
          var op = el("option", { value: String(o[0]), text: o[1] }); if (String(o[0]) === String(v)) op.selected = true; return op;
        }));
        sel.addEventListener("change", function () { var raw = sel.value; obj[def.k] = def.num ? +raw : raw; ctx.dirty(); if (def.onChange) def.onChange(obj, ctx); });
        return fieldWrap(def, sel);
      }
      case "lines": {
        var tl = el("textarea", { class: "input input--sm", rows: def.rows || 4, placeholder: def.ph || "Har bir qatorga bittadan" });
        tl.value = (v || []).join("\n");
        tl.addEventListener("input", function () { obj[def.k] = tl.value.split("\n").map(function (x) { return x.trim(); }).filter(Boolean); ctx.dirty(); });
        if (def.onBlur) tl.addEventListener("change", function () { def.onBlur(obj, ctx); });
        return fieldWrap(Object.assign({ help: "Har bir qatorga bittadan." }, def), tl);
      }
      case "tuple": {
        if (!Array.isArray(obj[def.k])) obj[def.k] = def.labels.map(function () { return ""; });
        var arr = obj[def.k];
        return fieldWrap(def, el("div", { class: "f__grid" }, def.labels.map(function (lb, i) {
          var ti = el("textarea", { class: "input input--sm", rows: i === 0 ? 1 : 2, placeholder: lb }); ti.value = arr[i] || "";
          ti.addEventListener("input", function () { arr[i] = ti.value; ctx.dirty(); });
          return ti;
        })));
      }
      case "pairs": return fieldWrap(def, pairsEditor(obj, def, ctx));
      case "table": return tableEditor(obj, ctx);
      case "image": return fieldWrap(def, imageEditor(obj, def, ctx));
      case "list": return fieldWrap(def, listEditor(obj, def, ctx));
      case "blocks": return fieldWrap(def, blocksEditor(obj, def, ctx));
      case "custom": return def.render(obj, ctx);
      case "note": return el("div", { class: "callout callout--tip", html: '<p>' + def.html + '</p>' });
      default: return el("div", { text: "?" + t });
    }
  }
  function tbBtn(lbl, title, fn) { return el("button", { type: "button", class: "tb__b", title: title, onclick: function (e) { e.preventDefault(); fn(); } }, [lbl]); }
  function wrapSel(ta, a, b) {
    var s = ta.selectionStart, e = ta.selectionEnd, v = ta.value;
    ta.value = v.slice(0, s) + a + v.slice(s, e) + b + v.slice(e);
    ta.focus(); ta.selectionStart = s + a.length; ta.selectionEnd = e + a.length;
    ta.dispatchEvent(new Event("input"));
  }
  function renderFields(obj, fields, ctx) {
    return el("div", { class: "fgrid" }, fields.map(function (d) { return renderField(obj, d, ctx); }));
  }

  /* --- juftliklar ro‘yxati: [["a","b"], ...] --- */
  function pairsEditor(obj, def, ctx) {
    if (!Array.isArray(obj[def.k])) obj[def.k] = [];
    var arr = obj[def.k], wrap = el("div", { class: "pairs" });
    function draw() {
      wrap.innerHTML = "";
      arr.forEach(function (row, i) {
        var cells = def.cols.map(function (c, ci) {
          c = typeof c === "string" ? { label: c } : c;
          if (c.opts) {
            var s = el("select", { class: "input input--sm" }, c.opts.map(function (o) { var op = el("option", { value: o[0], text: o[1] }); if (row[ci] === o[0]) op.selected = true; return op; }));
            s.addEventListener("change", function () { row[ci] = s.value; ctx.dirty(); });
            return s;
          }
          var ta = el("textarea", { class: "input input--sm", rows: ci === def.cols.length - 1 ? 2 : 1, placeholder: c.label }); ta.value = row[ci] || "";
          ta.addEventListener("input", function () { row[ci] = ta.value; ctx.dirty(); });
          return ta;
        });
        wrap.appendChild(el("div", { class: "pairs__r" + (def.cols.length === 2 && def.cols[0].opts ? " pairs__r--sel" : "") }, cells.concat([rowBtns(arr, i, draw, ctx)])));
      });
      wrap.appendChild(el("button", { type: "button", class: "btn btn--sm btn--ghost", onclick: function () { arr.push(def.cols.map(function (c) { return c.opts ? c.opts[0][0] : ""; })); ctx.dirty(); draw(); } }, ["+ Qator qo‘shish"]));
    }
    draw();
    return wrap;
  }
  function rowBtns(arr, i, redraw, ctx) {
    return el("div", { class: "rowbtns" }, [
      el("button", { type: "button", class: "ib", title: "Yuqoriga", onclick: function () { move(arr, i, -1); ctx.dirty(); redraw(); } }, ["↑"]),
      el("button", { type: "button", class: "ib", title: "Pastga", onclick: function () { move(arr, i, 1); ctx.dirty(); redraw(); } }, ["↓"]),
      el("button", { type: "button", class: "ib ib--del", title: "O‘chirish", onclick: function () { arr.splice(i, 1); ctx.dirty(); redraw(); } }, ["✕"])
    ]);
  }

  /* --- jadval: head [] + rows [[]] --- */
  function tableEditor(obj, ctx) {
    obj.head = obj.head || ["Ustun 1", "Ustun 2"]; obj.rows = obj.rows || [];
    var h = el("input", { class: "input input--sm", value: obj.head.join(" | ") });
    h.addEventListener("input", function () { obj.head = h.value.split("|").map(function (x) { return x.trim(); }); ctx.dirty(); });
    var r = el("textarea", { class: "input input--sm", rows: 6 });
    r.value = obj.rows.map(function (row) { return row.join(" | "); }).join("\n");
    r.addEventListener("input", function () { obj.rows = r.value.split("\n").filter(function (x) { return x.trim(); }).map(function (x) { return x.split("|").map(function (c) { return c.trim(); }); }); ctx.dirty(); });
    return el("div", { class: "fgrid" }, [
      fieldWrap({ label: "Ustun sarlavhalari", help: "Ustunlarni <b>|</b> belgisi bilan ajrating." }, h),
      fieldWrap({ label: "Qatorlar", help: "Har bir qator — yangi satrda, kataklar <b>|</b> bilan ajratiladi." }, r)
    ]);
  }

  /* --- rasm: yuklash yoki havola --- */
  function imageEditor(obj, def, ctx) {
    var prev = el("div", { class: "imgprev" });
    var url = el("input", { class: "input input--sm", placeholder: "Rasm havolasi yoki fayl nomi", value: obj[def.k] || "" });
    var file = el("input", { type: "file", accept: "image/*", class: "hide" });
    function show() { var v = obj[def.k]; prev.innerHTML = v ? '<img src="' + esc(A().imgSrc(v)) + '" alt="">' : '<span>Rasm yo‘q</span>'; }
    url.addEventListener("input", function () { obj[def.k] = url.value.trim(); ctx.dirty(); show(); });
    file.addEventListener("change", async function () {
      var f = file.files[0]; if (!f) return;
      up.disabled = true; up.textContent = "Yuklanmoqda…";
      try { var u = await Store.uploadMedia(f); obj[def.k] = u; url.value = u.indexOf("data:") === 0 ? "(shu qurilmaga saqlangan rasm)" : u; ctx.dirty(); show(); toast("Rasm yuklandi"); }
      catch (e) { toast("Rasm yuklanmadi: " + (e.message || e)); }
      up.disabled = false; up.textContent = "📷 Rasm yuklash"; file.value = "";
    });
    var up = el("button", { type: "button", class: "btn btn--sm btn--gold", onclick: function () { file.click(); } }, ["📷 Rasm yuklash"]);
    var rm = el("button", { type: "button", class: "btn btn--sm btn--ghost", onclick: function () { obj[def.k] = ""; url.value = ""; ctx.dirty(); show(); } }, ["Olib tashlash"]);
    if ((obj[def.k] || "").indexOf("data:") === 0) url.value = "(shu qurilmaga saqlangan rasm)";
    show();
    return el("div", { class: "imged" }, [prev, el("div", { class: "fgrid" }, [el("div", { class: "row" }, [up, rm, file]), url])]);
  }

  /* --- obyektlar ro‘yxati (yig‘iladigan kartalar) --- */
  function listEditor(obj, def, ctx) {
    if (!Array.isArray(obj[def.k])) obj[def.k] = [];
    var arr = obj[def.k], wrap = el("div", { class: "lst" });
    var openSet = {};
    function draw() {
      wrap.innerHTML = "";
      if (!arr.length) wrap.appendChild(el("div", { class: "tiny", text: "Hozircha bo‘sh." }));
      arr.forEach(function (it, i) {
        var title = def.title ? def.title(it, i) : ("#" + (i + 1));
        var body = el("div", { class: "lst__b" });
        var isOpen = openSet[i] || def.open;
        var head = el("div", { class: "lst__h" }, [
          el("button", { type: "button", class: "lst__t", onclick: function () { openSet[i] = !openSet[i]; draw(); } }, [el("span", { class: "lst__n", text: String(i + 1) }), el("span", { html: def.htmlTitle ? title : esc(title) }), el("span", { class: "lst__chev", text: isOpen ? "▾" : "▸" })]),
          def.extra ? def.extra(it, i) : null,
          el("div", { class: "rowbtns" }, [
            el("button", { type: "button", class: "ib", title: "Yuqoriga", onclick: function () { move(arr, i, -1); var o = openSet[i]; openSet[i] = openSet[i - 1]; openSet[i - 1] = o; ctx.dirty(); draw(); } }, ["↑"]),
            el("button", { type: "button", class: "ib", title: "Pastga", onclick: function () { move(arr, i, 1); var o = openSet[i]; openSet[i] = openSet[i + 1]; openSet[i + 1] = o; ctx.dirty(); draw(); } }, ["↓"]),
            def.noDup ? null : el("button", { type: "button", class: "ib", title: "Nusxa olish", onclick: function () { var c = clone(it); if (def.onDup) def.onDup(c); arr.splice(i + 1, 0, c); ctx.dirty(); draw(); } }, ["⧉"]),
            el("button", { type: "button", class: "ib ib--del", title: "O‘chirish", onclick: function () { if (!confirm((def.confirmDel || "O‘chirilsinmi?") + "\n\n" + snip(title, 80))) return; arr.splice(i, 1); openSet = {}; ctx.dirty(); draw(); } }, ["✕"])
          ])
        ]);
        if (isOpen) {
          var flds = typeof def.fields === "function" ? def.fields(it) : def.fields;
          var sub = { dirty: ctx.dirty, redraw: draw };
          body.appendChild(renderFields(it, flds, sub));
        }
        wrap.appendChild(el("div", { class: "lst__it" + (isOpen ? " open" : "") }, [head, isOpen ? body : null]));
      });
      var addBtns = def.addMenu ? def.addMenu(function (item) { arr.push(item); openSet[arr.length - 1] = true; ctx.dirty(); draw(); })
        : el("button", { type: "button", class: "btn btn--sm btn--ghost", onclick: function () { arr.push(def.add ? def.add() : {}); openSet[arr.length - 1] = true; ctx.dirty(); draw(); } }, [def.addLabel || "+ Qo‘shish"]);
      wrap.appendChild(addBtns);
    }
    draw();
    return wrap;
  }

  /* --- dars bloklari --- */
  var BLOCKS = {
    p:      { n: "Matn (paragraf)", f: [{ k: "h", t: "html", label: "Matn", rows: 5 }], d: function () { return { t: "p", h: "" }; } },
    h:      { n: "Bo‘lim sarlavhasi", f: [{ k: "h", t: "text", label: "Sarlavha" }], d: function () { return { t: "h", h: "Yangi bo‘lim" }; } },
    ul:     { n: "Ro‘yxat (nuqtali)", f: [{ k: "items", t: "lines", label: "Bandlar", rows: 5 }], d: function () { return { t: "ul", items: [] }; } },
    ol:     { n: "Ro‘yxat (raqamli)", f: [{ k: "items", t: "lines", label: "Bandlar", rows: 5 }], d: function () { return { t: "ol", items: [] }; } },
    call:   { n: "Ajratilgan blok (qoida / maslahat)", f: [
      { k: "k", t: "select", label: "Turi", opts: [["tip", "Maslahat (ko‘k)"], ["rule", "Qoida (oltin)"], ["warn", "Ogohlantirish (qizil)"], ["ok", "Ijobiy (yashil)"]] },
      { k: "title", t: "text", label: "Sarlavha" }, { k: "h", t: "html", label: "Matn" }], d: function () { return { t: "call", k: "tip", title: "Maslahat", h: "" }; } },
    img:    { n: "📷 Rasm", f: [{ k: "src", t: "image", label: "Rasm" }, { k: "caption", t: "text", label: "Izoh (rasm ostida)" }, { k: "alt", t: "text", label: "Tavsif (ko‘rmaydiganlar uchun)" }], d: function () { return { t: "img", src: "", caption: "" }; } },
    yt:     { n: "▶️ Video (YouTube)", f: [{ k: "url", t: "url", label: "YouTube havolasi", ph: "https://youtu.be/..." }, { k: "caption", t: "text", label: "Izoh" }], d: function () { return { t: "yt", url: "", caption: "" }; } },
    link:   { n: "🔗 Havola (tugma)", f: [{ k: "text", t: "text", label: "Tugma matni" }, { k: "url", t: "url", label: "Havola", ph: "https://..." }], d: function () { return { t: "link", text: "Batafsil", url: "" }; } },
    steps:  { n: "Qadamlar", f: [{ k: "items", t: "pairs", label: "Qadamlar", cols: ["Sarlavha", "Izoh"] }], d: function () { return { t: "steps", items: [["", ""]] }; } },
    table:  { n: "Jadval", f: [{ t: "table" }], d: function () { return { t: "table", head: ["Ustun 1", "Ustun 2"], rows: [] }; } },
    dialog: { n: "Dialog (agent ↔ mijoz)", f: [{ k: "lines", t: "pairs", label: "Gaplar", cols: [{ label: "Kim", opts: [["a", "Agent"], ["c", "Mijoz"], ["n", "Izoh"]] }, "Matn"] }], d: function () { return { t: "dialog", lines: [["a", ""], ["c", ""]] }; } },
    cmp:    { n: "Noto‘g‘ri / To‘g‘ri", f: [{ k: "bad", t: "tuple", label: "Noto‘g‘ri", labels: ["Sarlavha", "Matn"] }, { k: "good", t: "tuple", label: "To‘g‘ri", labels: ["Sarlavha", "Matn"] }], d: function () { return { t: "cmp", bad: ["Noto‘g‘ri", ""], good: ["To‘g‘ri", ""] }; } },
    ig:     { n: "📊 Infografika", f: [{ t: "custom", render: igPicker }], d: function () { return { t: "ig", k: "formula" }; } },
    task:   { n: "Amaliy topshiriq", f: [{ k: "title", t: "text", label: "Sarlavha" }, { k: "h", t: "html", label: "Topshiriq matni" }], d: function () { return { t: "task", title: "Amaliy topshiriq", h: "" }; } }
  };
  function igPicker(obj, ctx) {
    var prev = el("div", { class: "igprev" });
    var sel = el("select", { class: "input input--sm" }, IG.keys().map(function (k) { var o = el("option", { value: k, text: IG.title(k) }); if (k === obj.k) o.selected = true; return o; }));
    function show() { prev.innerHTML = IG.html(obj.k); IG.mount(prev); }
    sel.addEventListener("change", function () { obj.k = sel.value; ctx.dirty(); show(); });
    show();
    return el("div", { class: "fgrid" }, [fieldWrap({ label: "Infografika turi" }, sel), prev]);
  }
  function blockTitle(b) {
    var d = BLOCKS[b.t]; var n = d ? d.n : b.t;
    var s = b.h || b.title || b.caption || b.text || (b.items && (Array.isArray(b.items[0]) ? b.items[0][0] : b.items[0])) || (b.lines && b.lines[0] && b.lines[0][1]) || (b.t === "ig" ? IG.title(b.k) : "") || (b.head && b.head.join(" · ")) || "";
    return "<b>" + esc(n) + "</b> <span class='muted'>" + esc(snip(s, 50)) + "</span>";
  }
  function blocksEditor(obj, def, ctx) {
    return listEditor(obj, {
      k: def.k, htmlTitle: true, title: function (b) { return blockTitle(b); }, confirmDel: "Blok o‘chirilsinmi?",
      fields: function (b) { return (BLOCKS[b.t] || { f: [] }).f; },
      addMenu: function (push) {
        var s = el("select", { class: "input input--sm", style: "max-width:320px" }, [el("option", { value: "", text: "+ Blok qo‘shish…" })].concat(Object.keys(BLOCKS).map(function (k) { return el("option", { value: k, text: BLOCKS[k].n }); })));
        s.addEventListener("change", function () { if (!s.value) return; push(BLOCKS[s.value].d()); });
        return s;
      }
    }, ctx);
  }

  /* =========================================================
     TAHRIRLASH OYNASI (sheet)
     ========================================================= */
  var sheet = null;
  function openSheet(o) {
    closeSheet(true);
    var dirty = false;
    var ctx = { dirty: function () { if (!dirty) { dirty = true; saveBtn.classList.add("pulse"); } } };
    var saveBtn = el("button", { type: "button", class: "btn btn--gold" }, ["💾 Saqlash"]);
    var cancel = el("button", { type: "button", class: "btn btn--ghost", onclick: function () { if (dirty && !confirm("O‘zgarishlar saqlanmaydi. Yopilsinmi?")) return; closeSheet(); } }, ["Bekor qilish"]);
    var del = o.onDelete ? el("button", { type: "button", class: "btn btn--ghost ebtn--danger", onclick: async function () { if (!confirm(o.deleteConfirm || "Butunlay o‘chirilsinmi? (Tarixdan tiklash mumkin)")) return; try { await o.onDelete(); closeSheet(); } catch (e) { toast("Xato: " + (e.message || e)); } } }, ["🗑 O‘chirish"]) : null;
    var body = el("div", { class: "sheet__b" }, [renderFields(o.data, o.fields, ctx)]);
    saveBtn.addEventListener("click", async function () {
      if (o.validate) { var err = o.validate(o.data); if (err) { toast(err); return; } }
      saveBtn.disabled = true; saveBtn.textContent = "Saqlanmoqda…";
      try { await o.onSave(o.data); dirty = false; closeSheet(); toast("Saqlandi ✓" + (Store.mode === "local" ? " (shu qurilmada)" : "")); }
      catch (e) { console.error(e); toast("Saqlanmadi: " + (e.message || e)); saveBtn.disabled = false; saveBtn.textContent = "💾 Saqlash"; }
    });
    sheet = el("div", { class: "sheet", role: "dialog", "aria-modal": "true", "aria-label": o.title }, [
      el("div", { class: "sheet__back", onclick: function () { cancel.click(); } }),
      el("div", { class: "sheet__box" }, [
        el("div", { class: "sheet__h" }, [el("div", {}, [el("span", { class: "eyebrow", text: o.kicker || "Tahrirlash" }), el("h2", { text: o.title })]), el("button", { type: "button", class: "iconbtn", "aria-label": "Yopish", onclick: function () { cancel.click(); } }, ["✕"])]),
        Store.mode === "local" ? el("div", { class: "banner", style: "margin:0 20px", html: "⚠️ <div><b>Lokal rejim:</b> o‘zgarishlar faqat shu brauzerda saqlanadi. Agentlar ko‘rishi uchun Supabase ulang.</div>" }) : null,
        body,
        el("div", { class: "sheet__f" }, [del, el("span", { class: "grow" }), cancel, saveBtn])
      ])
    ]);
    document.body.appendChild(sheet);
    document.body.style.overflow = "hidden";
    sheet._esc = function (e) { if (e.key === "Escape") cancel.click(); };
    document.addEventListener("keydown", sheet._esc);
    setTimeout(function () { var f = body.querySelector("input,textarea,select"); if (f) f.focus(); }, 60);
  }
  function closeSheet() {
    if (!sheet) return;
    document.removeEventListener("keydown", sheet._esc);
    sheet.remove(); sheet = null; document.body.style.overflow = "";
  }

  async function saveKey(key, note) {
    var map = { course: window.COURSE, catalog: window.CATALOG, scripts: window.SCRIPTS, trainer: window.TRAINER, exam: window.EXAM, company: window.COMPANY, home: window.HOME };
    await Store.saveContent(key, map[key], note);
    A().reindex();
  }
  function refresh() { A().route(true); }

  /* =========================================================
     MAYDONLAR TO‘PLAMLARI
     ========================================================= */
  function weekOpts() { return (window.COURSE.weeks || []).map(function (w) { return [w.n, w.n + "-hafta · " + w.title]; }); }
  function modOpts() { return (window.COURSE.modules || []).map(function (m, i) { return [m.id, (i + 1) + ". " + m.title]; }); }

  function quizFields(it) {
    return [
      { k: "q", t: "textarea", label: "Savol", rows: 2 },
      { k: "o", t: "lines", label: "Javob variantlari", rows: 4, onBlur: function (o, c) { c.redraw(); } },
      { k: "a", t: "select", num: true, label: "To‘g‘ri javob", opts: function (o) { return (o.o || []).map(function (x, i) { return [i, "ABCDEFG"[i] + ") " + snip(x, 60)]; }); } },
      { k: "why", t: "textarea", label: "Izoh (javobdan keyin ko‘rsatiladi)", rows: 2 }
    ];
  }
  function newQuiz() { return { q: "Yangi savol", o: ["Variant A", "Variant B", "Variant C"], a: 0, why: "" }; }
  function quizList(k, label) {
    return { k: k, t: "list", label: label || "Test savollari", title: function (q) { return snip(q.q, 70); }, fields: quizFields, add: newQuiz, addLabel: "+ Savol qo‘shish", confirmDel: "Savol o‘chirilsinmi?" };
  }

  var LESSON_FIELDS = [
    { k: "title", t: "text", label: "Dars nomi" },
    { k: "min", t: "number", label: "Davomiyligi (daqiqa)", min: 1 },
    { k: "video", t: "url", label: "Asosiy video (YouTube havolasi)", ph: "https://youtu.be/...", help: "Bo‘sh qoldirilsa, “video tez orada” yozuvi chiqadi." },
    { k: "blocks", t: "blocks", label: "Dars mazmuni (bloklar)", help: "Bloklarni ↑ ↓ bilan joyini o‘zgartiring, ⧉ — nusxa, ✕ — o‘chirish." },
    { k: "keys", t: "lines", label: "Asosiy xulosalar", rows: 3 },
    quizList("quiz", "Dars testi")
  ];
  function newLesson() {
    return { id: newId("l"), title: "Yangi dars", min: 10, video: "", blocks: [{ t: "p", h: "Dars matni…" }], keys: [], quiz: [newQuiz()] };
  }
  function newModule(week) { return { id: newId("m"), week: week || 1, title: "Yangi modul", sub: "", outcomes: [], lessons: [] }; }

  var MODULE_FIELDS = [
    { k: "title", t: "text", label: "Modul nomi" },
    { k: "sub", t: "text", label: "Qisqa tavsif" },
    { k: "week", t: "select", num: true, label: "Hafta", opts: weekOpts },
    { k: "isNew", t: "bool", label: "“YANGI” belgisini ko‘rsatish" },
    { k: "outcomes", t: "lines", label: "Modul natijalari (siz… qila olasiz)", rows: 4 },
    { k: "lessons", t: "list", label: "Darslar (tartib, nom, o‘chirish)", help: "Dars mazmunini tahrirlash uchun dars sahifasidagi ✏️ tugmasini bosing.", title: function (l) { return l.title; },
      fields: [{ k: "title", t: "text", label: "Dars nomi" }, { k: "min", t: "number", label: "Daqiqa" }], add: newLesson, addLabel: "+ Dars qo‘shish", confirmDel: "Dars o‘chirilsinmi? (Agentlarning shu dars bo‘yicha natijasi hisobga olinmay qoladi)",
      onDup: function (c) { c.id = newId("l"); c.title += " (nusxa)"; } }
  ];

  var PRODUCT_FIELDS = [
    { k: "name", t: "text", label: "Nomi" },
    { k: "brand", t: "select", label: "Brend", opts: function () { return Object.keys(window.CATALOG.brands || {}).map(function (k) { return [k, window.CATALOG.brands[k].name]; }); } },
    { k: "cat", t: "select", label: "Toifa", opts: function () { return Object.keys(window.CATALOG.cats || {}).map(function (k) { return [k, window.CATALOG.cats[k]]; }); } },
    { k: "line", t: "text", label: "Liniya (seriya)" },
    { k: "img", t: "image", label: "Rasm" },
    { k: "sae", t: "text", label: "Yopishqoqlik / turi (masalan 5W-30, ATF)" },
    { k: "base", t: "text", label: "Baza (HC-sintetik, yarim sintetik…)" },
    { k: "short", t: "textarea", label: "Qisqa tavsif", rows: 2 },
    { k: "specs", t: "lines", label: "Standartlar (API, ACEA…)", rows: 3 },
    { k: "volumes", t: "lines", label: "Qadoqlar (4 L, 5 L…)", rows: 2 },
    { k: "benefits", t: "lines", label: "Afzalliklari", rows: 4 },
    { k: "forWhom", t: "lines", label: "Kimga taklif qilamiz", rows: 3 },
    { k: "notFor", t: "lines", label: "Mos emas", rows: 2 },
    { k: "oem", t: "lines", label: "OEM tavsiyalar / talablar", rows: 4 },
    { k: "say", t: "textarea", label: "Mijozga nima deyish kerak", rows: 3 }
  ];
  function newProduct() { var b = Object.keys(window.CATALOG.brands || {})[0] || "", c = Object.keys(window.CATALOG.cats || {})[0] || ""; return { id: newId("p"), brand: b, cat: c, line: "", name: "Yangi mahsulot", sae: "", base: "", img: "", volumes: [], specs: [], oem: [], short: "", benefits: [], forWhom: [], notFor: [], say: "" }; }

  var SCRIPT_FIELDS = [
    { k: "title", t: "text", label: "Nomi" },
    { k: "tag", t: "text", label: "Teg (masalan: E’tiroz, Telefon)" },
    { k: "hot", t: "bool", label: "🔥 belgisi (muhim)" },
    { k: "goal", t: "textarea", label: "Maqsad", rows: 2 },
    { k: "lines", t: "pairs", label: "Dialog", cols: [{ label: "Kim", opts: [["a", "Agent"], ["c", "Mijoz"], ["n", "Izoh"]] }, "Matn"] },
    { k: "tips", t: "lines", label: "Maslahatlar", rows: 3 }
  ];
  function newScript() { return { id: newId("s"), tag: "Yangi", title: "Yangi skript", goal: "", lines: [["a", ""], ["c", ""]], tips: [] }; }

  var TRAINER_FIELDS = [
    { k: "say", t: "textarea", label: "Mijoz gapi", rows: 2 },
    { k: "ctx", t: "text", label: "Vaziyat (kim, qayerda)" },
    { k: "o", t: "lines", label: "Javob variantlari", rows: 3, onBlur: function (o, c) { c.redraw(); } },
    { k: "best", t: "select", num: true, label: "Eng yaxshi javob", opts: function (o) { return (o.o || []).map(function (x, i) { return [i, "ABCDEF"[i] + ") " + snip(x, 60)]; }); } },
    { k: "why", t: "textarea", label: "Izoh", rows: 2 }
  ];

  var HOME_FIELDS = [
    { k: "eyebrow", t: "text", label: "Yuqori kichik yozuv" },
    { k: "title1", t: "text", label: "Sarlavha — 1-qator" },
    { k: "title2", t: "text", label: "Sarlavha — 2-qator (kontur)" },
    { k: "title3", t: "text", label: "Sarlavha — 3-qator (oltin)" },
    { k: "lead", t: "textarea", label: "Kirish matni", rows: 3 },
    { k: "heroImage", t: "image", label: "O‘ng tomondagi rasm (bo‘sh — standart belgi)" },
    { k: "outcomesTitle", t: "text", label: "“Kurs oxirida” sarlavhasi" },
    { k: "outcomes", t: "list", label: "Kurs natijalari", title: function (o) { return o.t; }, fields: [{ k: "t", t: "text", label: "Sarlavha" }, { k: "d", t: "textarea", label: "Matn", rows: 2 }], add: function () { return { t: "Yangi", d: "" }; } },
    { k: "formulaTitle", t: "text", label: "Formula bo‘limi sarlavhasi" },
    { k: "formulaText", t: "textarea", label: "Formula bo‘limi matni", rows: 2 },
    { k: "insideTitle", t: "text", label: "“Ichida nima bor” sarlavhasi" },
    { k: "inside", t: "list", label: "“Ichida nima bor” kartalari", title: function (o) { return o.t; }, fields: [{ k: "t", t: "text", label: "Sarlavha" }, { k: "d", t: "textarea", label: "Matn", rows: 2 }], add: function () { return { t: "Yangi", d: "" }; } },
    { k: "levelsTitle", t: "text", label: "Darajalar bo‘limi sarlavhasi" },
    { k: "levelsText", t: "textarea", label: "Darajalar bo‘limi matni", rows: 3 },
    { k: "ctaTitle", t: "text", label: "Pastki chaqiruv sarlavhasi" },
    { k: "ctaText", t: "textarea", label: "Pastki chaqiruv matni", rows: 2 },
    { k: "footer", t: "text", label: "Pastki qism (footer) matni" }
  ];

  var COMPANY_FIELDS = [
    { k: "intro", t: "textarea", label: "Kirish matni", rows: 3 },
    { k: "mission", t: "custom", render: function (o, ctx) { o.mission = o.mission || { title: "Missiyamiz", text: "" }; return el("div", { class: "subcard" }, [el("div", { class: "f__l", text: "Missiya" }), renderFields(o.mission, [{ k: "title", t: "text", label: "Sarlavha" }, { k: "text", t: "textarea", label: "Matn" }, { k: "todo", t: "bool", label: "Hali to‘ldirilmagan (punktir ramka)" }], ctx)]); } },
    { k: "facts", t: "list", label: "Raqamlar (kartochkalar)", title: function (f) { return f.k + " — " + f.v; }, fields: [{ k: "k", t: "text", label: "Raqam / qisqa" }, { k: "v", t: "text", label: "Izoh" }, { k: "todo", t: "bool", label: "To‘ldiriladi (punktir)" }], add: function () { return { k: "0", v: "" }; } },
    { k: "timeline", t: "list", label: "Tarix (yillar)", title: function (t) { return t.y + " — " + t.t; }, fields: [{ k: "y", t: "text", label: "Yil" }, { k: "t", t: "text", label: "Sarlavha" }, { k: "d", t: "textarea", label: "Matn" }, { k: "note", t: "text", label: "Eslatma (⚠)" }, { k: "todo", t: "bool", label: "Tekshirilmagan / to‘ldiriladi" }], add: function () { return { y: String(new Date().getFullYear()), t: "", d: "" }; } },
    { k: "placeholders", t: "list", label: "“Tez orada” bloklari", title: function (p) { return p.title; }, fields: [{ k: "title", t: "text", label: "Sarlavha" }, { k: "text", t: "textarea", label: "Matn" }], add: function () { return { title: "", text: "" }; } }
  ];

  /* =========================================================
     AMALLAR (data-cms="amal:id")
     ========================================================= */
  function findLesson(id) {
    var C = window.COURSE;
    for (var i = 0; i < C.modules.length; i++) { var m = C.modules[i]; for (var j = 0; j < m.lessons.length; j++) if (m.lessons[j].id === id) return { m: m, i: j, l: m.lessons[j] }; }
    return null;
  }
  function findModule(id) { var C = window.COURSE; for (var i = 0; i < C.modules.length; i++) if (C.modules[i].id === id) return { i: i, m: C.modules[i] }; return null; }

  var ACTIONS = {
    lesson: function (id) {
      var f = findLesson(id); if (!f) return;
      var data = clone(f.l);
      openSheet({ kicker: f.m.title, title: "Darsni tahrirlash", data: data, fields: LESSON_FIELDS,
        onSave: async function (d) { f.m.lessons[f.i] = Object.assign(d, { id: f.l.id }); await saveKey("course", "Dars: " + d.title); refresh(); },
        onDelete: async function () { f.m.lessons.splice(f.i, 1); await saveKey("course", "Dars o‘chirildi: " + f.l.title); A().go("#/modul/" + f.m.id); } });
    },
    "lesson-new": function (mid) {
      var fm = findModule(mid); if (!fm) return;
      var data = newLesson();
      openSheet({ kicker: fm.m.title, title: "Yangi dars", data: data, fields: LESSON_FIELDS,
        onSave: async function (d) { fm.m.lessons.push(d); await saveKey("course", "Yangi dars: " + d.title); A().go("#/dars/" + d.id); } });
    },
    "lesson-del": async function (id) {
      var f = findLesson(id); if (!f || !confirm("“" + f.l.title + "” darsi o‘chirilsinmi?\n(Kontent tarixidan tiklash mumkin)")) return;
      f.m.lessons.splice(f.i, 1); await saveKey("course", "Dars o‘chirildi: " + f.l.title); toast("Dars o‘chirildi"); A().go("#/modul/" + f.m.id);
    },
    module: function (id) {
      var fm = findModule(id); if (!fm) return;
      var data = clone(fm.m);
      openSheet({ kicker: "Modul", title: fm.m.title, data: data, fields: MODULE_FIELDS,
        onSave: async function (d) { window.COURSE.modules[fm.i] = Object.assign(d, { id: fm.m.id }); await saveKey("course", "Modul: " + d.title); refresh(); },
        onDelete: async function () { window.COURSE.modules.splice(fm.i, 1); await saveKey("course", "Modul o‘chirildi: " + fm.m.title); A().go("#/yol"); },
        deleteConfirm: "Modul va undagi BARCHA darslar o‘chirilsinmi? (Tarixdan tiklash mumkin)" });
    },
    "module-new": function (week) {
      var data = newModule(+week || 1);
      openSheet({ kicker: "Kurs", title: "Yangi modul", data: data, fields: MODULE_FIELDS,
        onSave: async function (d) { window.COURSE.modules.push(d); await saveKey("course", "Yangi modul: " + d.title); A().go("#/modul/" + d.id); } });
    },
    "module-del": async function (id) {
      var fm = findModule(id); if (!fm || !confirm("“" + fm.m.title + "” moduli va undagi " + fm.m.lessons.length + " ta dars o‘chirilsinmi?\n(Kontent tarixidan tiklash mumkin)")) return;
      window.COURSE.modules.splice(fm.i, 1); await saveKey("course", "Modul o‘chirildi: " + fm.m.title); toast("Modul o‘chirildi"); A().go("#/yol");
    },
    structure: function () {
      var C = window.COURSE;
      var data = { days: C.days, weeks: clone(C.weeks), modules: clone(C.modules), levels: clone(C.levels) };
      openSheet({ kicker: "Kurs", title: "Kurs tuzilmasi", data: data, fields: [
        { k: "days", t: "number", label: "Kurs davomiyligi (kun)" },
        { k: "weeks", t: "list", label: "Haftalar (bosqichlar)", title: function (w) { return w.n + "-hafta · " + w.title; }, fields: [{ k: "n", t: "number", label: "Raqami" }, { k: "code", t: "text", label: "Kod (BAZA, SAVDO…)" }, { k: "title", t: "text", label: "Nomi" }, { k: "sub", t: "text", label: "Tavsif" }, { k: "days", t: "text", label: "Kunlar (1–7 kun)" }], add: function () { return { n: (data.weeks.length + 1), code: "", title: "Yangi bosqich", sub: "", days: "" }; } },
        { k: "modules", t: "list", label: "Modullar (tartib = kursdagi tartib)", htmlTitle: true, help: "Modul ichidagi darslarni modul sahifasida tahrirlang.", title: function (m) { return esc(m.title) + " <span class='muted'>· " + (m.lessons || []).length + " dars</span>"; }, fields: [{ k: "title", t: "text", label: "Nomi" }, { k: "sub", t: "text", label: "Tavsif" }, { k: "week", t: "select", num: true, label: "Hafta", opts: function () { return data.weeks.map(function (w) { return [w.n, w.n + "-hafta · " + w.title]; }); } }, { k: "isNew", t: "bool", label: "“YANGI” belgisi" }], add: function () { return newModule(1); }, confirmDel: "Modul va undagi barcha darslar o‘chirilsinmi?", onDup: function (c) { c.id = newId("m"); c.title += " (nusxa)"; (c.lessons || []).forEach(function (l) { l.id = newId("l"); }); } },
        { k: "levels", t: "list", label: "Agent darajalari", title: function (l) { return l.code + " — " + l.name; }, fields: [{ k: "code", t: "text", label: "Kod (SJ, SN…)" }, { k: "name", t: "text", label: "Nomi" }, { k: "min", t: "number", label: "Minimal progress % (101 = imtihondan keyin)" }], add: function () { return { code: "", name: "", min: 0 }; } }
      ], onSave: async function (d) { C.days = d.days; C.weeks = d.weeks; C.modules = d.modules; C.levels = d.levels; await saveKey("course", "Kurs tuzilmasi"); refresh(); } });
    },
    product: function (id) {
      var P = window.CATALOG.products, i = P.findIndex(function (p) { return p.id === id; }); if (i < 0) return;
      A().modal.close();
      openSheet({ kicker: "Katalog", title: P[i].name, data: clone(P[i]), fields: PRODUCT_FIELDS,
        onSave: async function (d) { P[i] = Object.assign(d, { id: id }); await saveKey("catalog", "Mahsulot: " + d.name); refresh(); },
        onDelete: async function () { var n = P[i].name; P.splice(i, 1); await saveKey("catalog", "Mahsulot o‘chirildi: " + n); refresh(); } });
    },
    "product-new": function () {
      openSheet({ kicker: "Katalog", title: "Yangi mahsulot", data: newProduct(), fields: PRODUCT_FIELDS,
        onSave: async function (d) { window.CATALOG.products.unshift(d); await saveKey("catalog", "Yangi mahsulot: " + d.name); refresh(); } });
    },
    "catalog-meta": function () {
      var CAT = window.CATALOG;
      var data = {
        brands: Object.keys(CAT.brands || {}).map(function (k) { return Object.assign({ key: k }, CAT.brands[k]); }),
        cats: Object.keys(CAT.cats || {}).map(function (k) { return { key: k, name: CAT.cats[k] }; }),
        products: clone(CAT.products)
      };
      openSheet({ kicker: "Katalog", title: "Brendlar, toifalar va tartib", data: data, fields: [
        { k: "brands", t: "list", label: "Brendlar", title: function (b) { return b.name + " · " + b.origin; }, fields: [{ k: "key", t: "text", label: "Kod (o‘zgartirmang, agar mahsulotlar bog‘langan bo‘lsa)" }, { k: "name", t: "text", label: "Nomi" }, { k: "origin", t: "text", label: "Mamlakat" }, { k: "flag", t: "text", label: "Qisqa kod (DE, KR, TR)" }, { k: "note", t: "text", label: "Izoh" }], add: function () { return { key: "B" + Date.now().toString(36).toUpperCase(), name: "Yangi brend", origin: "", flag: "", note: "" }; }, noDup: true },
        { k: "cats", t: "list", label: "Toifalar", title: function (c) { return c.name; }, fields: [{ k: "key", t: "text", label: "Kod" }, { k: "name", t: "text", label: "Nomi" }], add: function () { return { key: "cat-" + Date.now().toString(36), name: "Yangi toifa" }; }, noDup: true },
        { k: "products", t: "list", label: "Mahsulotlar tartibi (va to‘liq tahrirlash)", title: function (p) { return p.name; }, fields: PRODUCT_FIELDS, add: newProduct, onDup: function (c) { c.id = newId("p"); c.name += " (nusxa)"; } }
      ], validate: function (d) {
        var keys = d.brands.map(function (b) { return b.key; }); if (new Set(keys).size !== keys.length) return "Brend kodlari takrorlanmasin";
        var bad = d.products.filter(function (p) { return keys.indexOf(p.brand) < 0; }); if (bad.length) return "“" + bad[0].name + "” mahsulotining brendi topilmadi";
      }, onSave: async function (d) {
        var b = {}; d.brands.forEach(function (x) { var k = x.key; var o = Object.assign({}, x); delete o.key; b[k] = o; });
        var c = {}; d.cats.forEach(function (x) { c[x.key] = x.name; });
        CAT.brands = b; CAT.cats = c; CAT.products = d.products;
        await saveKey("catalog", "Brendlar / toifalar / tartib"); refresh();
      } });
    },
    script: function (id) {
      var S = window.SCRIPTS, i = S.findIndex(function (s) { return s.id === id; }); if (i < 0) return;
      openSheet({ kicker: "Skriptlar", title: S[i].title, data: clone(S[i]), fields: SCRIPT_FIELDS,
        onSave: async function (d) { S[i] = Object.assign(d, { id: id }); await saveKey("scripts", "Skript: " + d.title); refresh(); },
        onDelete: async function () { var t = S[i].title; S.splice(i, 1); await saveKey("scripts", "Skript o‘chirildi: " + t); A().go("#/skriptlar"); } });
    },
    "script-new": function () {
      openSheet({ kicker: "Skriptlar", title: "Yangi skript", data: newScript(), fields: SCRIPT_FIELDS,
        onSave: async function (d) { window.SCRIPTS = window.SCRIPTS || []; window.SCRIPTS.push(d); await saveKey("scripts", "Yangi skript: " + d.title); A().go("#/skriptlar/" + d.id); } });
    },
    "script-del": async function (id) {
      var S = window.SCRIPTS, i = S.findIndex(function (s) { return s.id === id; }); if (i < 0 || !confirm("“" + S[i].title + "” skripti o‘chirilsinmi?")) return;
      var t = S[i].title; S.splice(i, 1); await saveKey("scripts", "Skript o‘chirildi: " + t); A().go("#/skriptlar");
    },
    "scripts-all": function () {
      var data = { list: clone(window.SCRIPTS || []) };
      openSheet({ kicker: "Skriptlar", title: "Barcha skriptlar (tartib)", data: data, fields: [{ k: "list", t: "list", label: "Skriptlar", title: function (s) { return s.title; }, fields: SCRIPT_FIELDS, add: newScript, onDup: function (c) { c.id = newId("s"); c.title += " (nusxa)"; } }],
        onSave: async function (d) { window.SCRIPTS = d.list; await saveKey("scripts", "Skriptlar tartibi"); refresh(); } });
    },
    trainer: function () {
      var data = { list: clone(window.TRAINER || []) };
      openSheet({ kicker: "Trenajor", title: "E’tirozlar trenajori kartalari", data: data, fields: [{ k: "list", t: "list", label: "Kartalar", title: function (c) { return "«" + snip(c.say, 60) + "»"; }, fields: TRAINER_FIELDS, add: function () { return { say: "Yangi e’tiroz", ctx: "", o: ["Javob A", "Javob B", "Javob C"], best: 0, why: "" }; }, addLabel: "+ Karta qo‘shish" }],
        onSave: async function (d) { window.TRAINER = d.list; await saveKey("trainer", "Trenajor kartalari"); refresh(); } });
    },
    exam: function () {
      var EX = window.EXAM, mods = window.COURSE.modules;
      var data = { take: Object.assign({}, EX.take || {}), pool: clone(EX.pool || []), rules: clone(CFG.EXAM) };
      mods.forEach(function (m) { if (data.take[m.id] == null) data.take[m.id] = 0; });
      openSheet({ kicker: "Imtihon", title: "Yakuniy imtihon", data: data, fields: [
        { t: "custom", render: function (o, ctx) {
          return el("div", { class: "subcard" }, [el("div", { class: "f__l", text: "Imtihon qoidalari" }), renderFields(o.rules, [
            { k: "QUESTIONS", t: "number", label: "Savollar soni", min: 1 }, { k: "MINUTES", t: "number", label: "Vaqt (daqiqa)", min: 1 },
            { k: "PASS_PERCENT", t: "number", label: "O‘tish bali (%)", min: 1, max: 100 }, { k: "COOLDOWN_HOURS", t: "number", label: "Qayta topshirish oralig‘i (soat)", min: 0 }
          ], ctx)]);
        } },
        { t: "custom", render: function (o, ctx) {
          return el("div", { class: "subcard" }, [el("div", { class: "f__l", text: "Har bir moduldan nechta savol tushadi" }), el("div", { class: "fgrid fgrid--2" }, mods.map(function (m, i) {
            var cnt = o.pool.filter(function (q) { return q.m === m.id; }).length;
            return renderField(o.take, { k: m.id, t: "number", min: 0, label: (i + 1) + ". " + m.title + " (bazada " + cnt + ")" }, ctx);
          }))]);
        } },
        { k: "pool", t: "list", label: "Savollar bazasi", htmlTitle: true, title: function (q) { var m = mods.find(function (x) { return x.id === q.m; }); return (m ? "<b>" + (mods.indexOf(m) + 1) + "-m</b> " : "<b>?</b> ") + esc(snip(q.q, 70)); },
          fields: function () { return [{ k: "m", t: "select", label: "Modul", opts: modOpts }].concat(quizFields()); },
          add: function () { return Object.assign({ m: (mods[0] || {}).id }, newQuiz()); }, addLabel: "+ Savol qo‘shish", confirmDel: "Savol o‘chirilsinmi?" }
      ], onSave: async function (d) {
        EX.take = d.take; EX.pool = d.pool; await saveKey("exam", "Imtihon savollari");
        var s = { LESSON_PASS: CFG.LESSON_PASS, STRICT_ORDER: CFG.STRICT_ORDER, CONTACT_TELEGRAM: CFG.CONTACT_TELEGRAM, EXAM: d.rules };
        await Store.saveContent("settings", s, "Imtihon qoidalari"); refresh();
      } });
    },
    company: function () {
      openSheet({ kicker: "Kompaniya", title: "Kompaniya sahifasi", data: clone(window.COMPANY), fields: COMPANY_FIELDS,
        onSave: async function (d) { window.COMPANY = d; await saveKey("company", "Kompaniya sahifasi"); refresh(); } });
    },
    home: function () {
      openSheet({ kicker: "Bosh sahifa", title: "Bosh sahifa matnlari", data: clone(window.HOME), fields: HOME_FIELDS,
        onSave: async function (d) { window.HOME = d; await saveKey("home", "Bosh sahifa"); refresh(); } });
    },
    settings: function () {
      var data = { passPct: Math.round((CFG.LESSON_PASS || 0.66) * 100), STRICT_ORDER: CFG.STRICT_ORDER !== false, CONTACT_TELEGRAM: CFG.CONTACT_TELEGRAM || "", EXAM: clone(CFG.EXAM) };
      openSheet({ kicker: "Sozlamalar", title: "Kurs sozlamalari", data: data, fields: [
        { k: "passPct", t: "number", label: "Dars testidan o‘tish uchun minimal % (66 = 3 tadan 2 ta)", min: 1, max: 100 },
        { k: "STRICT_ORDER", t: "bool", label: "Darslar faqat ketma-ket ochiladi" },
        { k: "CONTACT_TELEGRAM", t: "url", label: "Telegram havolasi (aloqa)" },
        { t: "custom", render: function (o, ctx) { return el("div", { class: "subcard" }, [el("div", { class: "f__l", text: "Yakuniy imtihon" }), renderFields(o.EXAM, [{ k: "QUESTIONS", t: "number", label: "Savollar soni" }, { k: "MINUTES", t: "number", label: "Vaqt (daqiqa)" }, { k: "PASS_PERCENT", t: "number", label: "O‘tish bali (%)" }, { k: "COOLDOWN_HOURS", t: "number", label: "Qayta topshirish oralig‘i (soat)" }], ctx)]); } }
      ], onSave: async function (d) {
        await Store.saveContent("settings", { LESSON_PASS: Math.max(0.01, Math.min(1, (d.passPct || 66) / 100 - 0.001)), STRICT_ORDER: d.STRICT_ORDER, CONTACT_TELEGRAM: d.CONTACT_TELEGRAM, EXAM: d.EXAM }, "Sozlamalar");
        A().reindex(); refresh();
      } });
    }
  };

  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-cms]"); if (!b || !Store.isAdmin()) return;
    e.preventDefault(); e.stopPropagation();
    var v = b.getAttribute("data-cms"), i = v.indexOf(":"), act = i < 0 ? v : v.slice(0, i), arg = i < 0 ? "" : v.slice(i + 1);
    if (ACTIONS[act]) { try { ACTIONS[act](arg); } catch (err) { console.error(err); toast("Xato: " + err.message); } }
  }, true);

  /* =========================================================
     RAHBAR → KONTENT VA TARIX paneli
     ========================================================= */
  var KEY_NAMES = { course: "Kurs (modullar, darslar, testlar)", catalog: "Katalog", scripts: "Skriptlar", trainer: "Trenajor", exam: "Imtihon savollari", company: "Kompaniya", home: "Bosh sahifa", settings: "Sozlamalar" };
  function fmt(iso) { if (!iso) return "—"; var d = new Date(iso); function p(n) { return String(n).padStart(2, "0"); } return p(d.getDate()) + "." + p(d.getMonth() + 1) + "." + d.getFullYear() + " " + p(d.getHours()) + ":" + p(d.getMinutes()); }

  async function panel(root) {
    var editors = [["home", "🏠 Bosh sahifa"], ["structure", "📚 Kurs tuzilmasi"], ["module-new:1", "➕ Yangi modul"], ["exam", "📝 Imtihon"], ["catalog-meta", "🏷 Katalog: brendlar, tartib"], ["product-new", "➕ Yangi mahsulot"], ["scripts-all", "💬 Skriptlar"], ["trainer", "🎯 Trenajor"], ["company", "🏢 Kompaniya"], ["settings", "⚙️ Sozlamalar"]];
    root.innerHTML =
      '<div class="callout callout--rule" style="margin-bottom:18px"><div class="callout__t">Qanday tahrirlanadi</div><p>Yuqoridagi <b>✏️ Tahrirlash</b> tugmasini yoqing — saytning har bir sahifasida tahrirlash tugmalari paydo bo‘ladi (darslar, modullar, mahsulotlar, skriptlar…). Yoki quyidagi bo‘limlardan birini oching.' + (Store.mode === "local" ? ' <b>Hozir lokal rejim:</b> o‘zgarishlar faqat shu brauzerda saqlanadi — agentlar ko‘rishi uchun Supabase ulang.' : ' O‘zgarishlar saqlangan zahoti barcha agentlarga ko‘rinadi.') + '</p></div>' +
      '<div class="grid g3" style="margin-bottom:26px">' + editors.map(function (e) { return '<button type="button" class="card card--flat cmscard" data-cms="' + e[0] + '">' + e[1] + '</button>'; }).join("") + '</div>' +
      '<h3 class="display h3" style="margin:10px 0 12px">Zaxira nusxa</h3>' +
      '<div class="row" style="margin-bottom:26px"><button type="button" class="btn btn--gold" id="cmsExport">⬇️ Barcha kontentni yuklab olish (JSON)</button><label class="btn btn--ghost" style="cursor:pointer">⬆️ Zaxiradan tiklash<input type="file" accept=".json,application/json" id="cmsImport" class="hide"></label></div>' +
      '<h3 class="display h3" style="margin:10px 0 12px">Bo‘limlar holati</h3><div class="tbl-wrap" style="margin-bottom:26px"><table class="tbl"><thead><tr><th>Bo‘lim</th><th>Oxirgi o‘zgarish</th><th></th></tr></thead><tbody>' +
        Store.CONTENT_KEYS.map(function (k) { var m = Store.contentMeta[k]; return '<tr><td>' + KEY_NAMES[k] + '</td><td class="small">' + (m ? fmt(m.updated_at) : '<span class="muted">asl holat (fayllardan)</span>') + '</td><td>' + (m ? '<button type="button" class="btn btn--sm btn--ghost" data-reset="' + k + '">Asl holatga qaytarish</button>' : '') + '</td></tr>'; }).join("") +
      '</tbody></table></div>' +
      '<h3 class="display h3" style="margin:10px 0 12px">O‘zgarishlar tarixi</h3><div id="cmsHist"><div class="empty">Yuklanmoqda…</div></div>';

    root.querySelector("#cmsExport").onclick = function () {
      var blob = new Blob([JSON.stringify(Store.exportAll(), null, 2)], { type: "application/json" });
      var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "mital-akademiya-zaxira-" + new Date().toISOString().slice(0, 10) + ".json"; a.click();
    };
    root.querySelector("#cmsImport").onchange = async function (e) {
      var f = e.target.files[0]; if (!f) return;
      try {
        var j = JSON.parse(await f.text()); var c = j.content || j;
        var keys = Store.CONTENT_KEYS.filter(function (k) { return c[k]; });
        if (!keys.length) throw new Error("Faylda kontent topilmadi");
        if (!confirm("Zaxiradan tiklansinmi? Quyidagi bo‘limlar almashtiriladi:\n" + keys.map(function (k) { return "• " + KEY_NAMES[k]; }).join("\n"))) return;
        for (var i = 0; i < keys.length; i++) await Store.saveContent(keys[i], c[keys[i]], "Zaxiradan tiklandi");
        A().reindex(); toast("Zaxiradan tiklandi ✓"); refresh();
      } catch (err) { toast("Tiklanmadi: " + err.message); }
      e.target.value = "";
    };
    root.querySelectorAll("[data-reset]").forEach(function (b) {
      b.onclick = async function () {
        var k = b.dataset.reset;
        if (!confirm("“" + KEY_NAMES[k] + "” asl holatiga (fayllardagi variant) qaytarilsinmi?\nJoriy variant tarixda saqlanib qoladi.")) return;
        try { await Store.saveContent(k, Store.CONTENT_KEYS.indexOf(k) >= 0 ? currentOf(k) : null, "Asl holatga qaytarishdan oldingi nusxa"); await Store.resetContent(k); A().reindex(); toast("Asl holatga qaytarildi"); refresh(); }
        catch (err) { toast("Xato: " + err.message); }
      };
    });
    try {
      var h = await Store.history();
      var box = root.querySelector("#cmsHist");
      box.innerHTML = h.length ? '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Vaqt</th><th>Bo‘lim</th><th>Nima o‘zgardi</th><th></th></tr></thead><tbody>' +
        h.map(function (x) { return '<tr><td class="small">' + fmt(x.saved_at) + '</td><td class="small">' + esc(KEY_NAMES[x.key] || x.key) + '</td><td class="small">' + esc(x.note || "—") + '</td><td><button type="button" class="btn btn--sm btn--ghost" data-restore="' + esc(x.id) + '">Shu versiyani tiklash</button></td></tr>'; }).join("") +
        '</tbody></table></div><p class="tiny" style="margin-top:8px">Har bir saqlash shu yerga yoziladi. “Tiklash” bosilganda bo‘lim aynan o‘sha vaqtdagi holatiga qaytadi (joriy holat ham tarixda qoladi).</p>'
        : '<div class="empty">Hali o‘zgarishlar yo‘q.</div>';
      box.querySelectorAll("[data-restore]").forEach(function (b) {
        b.onclick = async function () {
          try {
            var row = await Store.historyData(isNaN(+b.dataset.restore) ? b.dataset.restore : +b.dataset.restore);
            if (!row || !confirm("“" + (KEY_NAMES[row.key] || row.key) + "” " + fmt(row.saved_at) + " holatiga qaytarilsinmi?")) return;
            await Store.saveContent(row.key, row.data, "Tiklandi: " + fmt(row.saved_at));
            A().reindex(); toast("Tiklandi ✓"); refresh();
          } catch (err) { toast("Xato: " + err.message); }
        };
      });
    } catch (err) { root.querySelector("#cmsHist").innerHTML = '<div class="empty">Tarix yuklanmadi: ' + esc(err.message) + '</div>'; }
  }
  function currentOf(k) {
    if (k === "settings") return { LESSON_PASS: CFG.LESSON_PASS, STRICT_ORDER: CFG.STRICT_ORDER, CONTACT_TELEGRAM: CFG.CONTACT_TELEGRAM, EXAM: CFG.EXAM };
    return { course: window.COURSE, catalog: window.CATALOG, scripts: window.SCRIPTS, trainer: window.TRAINER, exam: window.EXAM, company: window.COMPANY, home: window.HOME }[k];
  }

  window.CMS = { panel: panel, open: function (a, arg) { if (ACTIONS[a]) ACTIONS[a](arg); }, BLOCKS: BLOCKS };
})();
