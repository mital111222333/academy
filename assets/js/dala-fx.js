/* =========================================================
   Dala — jonli effektlar (bosh sahifa)
   - "Miya" yulduz turkumi: canvas'da tirik zarrachalar
     (yig'ilish, 3D tebranish, miltillash, sichqoncha/barmoqqa javob)
   - Hero foni bo'ylab suzuvchi zarrachalar
   - Bo'limlarning ohista paydo bo'lishi
   ========================================================= */
(function () {
  "use strict";
  var RM = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var MOBILE = Math.min(screen.width, screen.height) < 700;
  var PALETTE = ["#8052ff", "#a98bff", "#ffb829", "#ffd36b", "#2fd3b5", "#ff4fd8", "#4f8bff", "#ff7a59"];
  var shapeP = null;

  // constellation.svg'dagi uchburchaklarni nuqtalarga aylantiramiz
  function loadShape() {
    if (shapeP) return shapeP;
    shapeP = fetch("assets/img/constellation.svg").then(function (r) { return r.text(); }).then(function (txt) {
      var re = /points="([^"]+)"\s+stroke="([^"]+)"[^>]*opacity="([\d.]+)"/g, m, out = [];
      while ((m = re.exec(txt))) {
        var p = m[1].trim().split(/\s+/).map(function (s) { return s.split(",").map(Number); });
        if (p.length < 3) continue;
        var cx = (p[0][0] + p[1][0] + p[2][0]) / 3, cy = (p[0][1] + p[1][1] + p[2][1]) / 3;
        out.push({ x: cx / 600 - 0.5, y: cy / 600 - 0.5, s: Math.hypot(p[0][0] - cx, p[0][1] - cy) / 600,
          rot: Math.atan2(p[0][1] - cy, p[0][0] - cx), c: m[2], o: +m[3] });
      }
      return out.length ? out : procedural();
    }).catch(procedural);
    return shapeP;
  }
  function procedural() {
    var out = [];
    for (var i = 0; i < 520; i++) {
      var a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random()) * 0.36;
      out.push({ x: Math.cos(a) * r * 1.15, y: Math.sin(a) * r * 0.85 - 0.02, s: 0.008 + Math.random() * 0.01,
        rot: Math.random() * 6.28, c: PALETTE[i % PALETTE.length], o: 0.55 + Math.random() * 0.4 });
    }
    return out;
  }

  function tri(ctx, x, y, s, rot) {
    ctx.moveTo(x + Math.cos(rot) * s, y + Math.sin(rot) * s);
    ctx.lineTo(x + Math.cos(rot + 2.094) * s, y + Math.sin(rot + 2.094) * s);
    ctx.lineTo(x + Math.cos(rot + 4.189) * s, y + Math.sin(rot + 4.189) * s);
    ctx.closePath();
  }
  function ease(t) { return 1 - Math.pow(1 - t, 3); }

  // Umumiy sikl: ko'rinmasa yoki tab yashirin bo'lsa to'xtaydi
  function loop(cv, draw, cleanup) {
    var raf = 0, visible = true;
    function frame(now) {
      raf = 0;
      if (!cv.isConnected) { io.disconnect(); document.removeEventListener("visibilitychange", wake); if (cleanup) cleanup(); return; }
      draw(now);
      if (visible && !RM && !document.hidden) raf = requestAnimationFrame(frame);
    }
    function wake() { if (visible && !raf && !document.hidden) raf = requestAnimationFrame(frame); }
    var io = new IntersectionObserver(function (en) { visible = en[0].isIntersecting; wake(); });
    io.observe(cv);
    document.addEventListener("visibilitychange", wake);
    raf = requestAnimationFrame(frame);
    return wake;
  }

  function fit(cv, ctx, box, st) {
    function size() {
      var r = box.getBoundingClientRect();
      st.W = r.width; st.H = r.height;
      cv.width = Math.round(st.W * DPR); cv.height = Math.round(st.H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      if (st.wake) st.wake();
    }
    size();
    var ro = window.ResizeObserver ? new ResizeObserver(size) : null;
    if (ro) ro.observe(box);
    return function () { if (ro) ro.disconnect(); };
  }

  /* ---------- Miya ---------- */
  function Brain(host, pts) {
    var cv = document.createElement("canvas");
    cv.className = "fx-brain"; cv.setAttribute("aria-hidden", "true");
    host.appendChild(cv); host.classList.add("fx-on");
    var ctx = cv.getContext("2d"), st = { W: 0, H: 0 }, t0 = performance.now();
    var ptr = { x: 0, y: 0, tx: 0, ty: 0, px: -9, py: -9 };
    var P = pts.map(function (p) {
      var r2 = Math.min(1, (p.x * p.x + p.y * p.y) / 0.16), a = Math.random() * 6.28, d = 0.6 + Math.random() * 0.7;
      return {
        x: p.x, y: p.y, z: (Math.random() < 0.5 ? -1 : 1) * Math.sqrt(1 - r2) * 0.32 * Math.random(),
        s: p.s, rot: p.rot, c: p.c, o: p.o,
        sx: Math.cos(a) * d, sy: Math.sin(a) * d,
        ph: Math.random() * 6.28, sp: 0.4 + Math.random() * 0.9, spin: (Math.random() - 0.5) * 0.8,
        delay: Math.random() * 0.5, ox: 0, oy: 0
      };
    });
    P.sort(function (a, b) { return a.z - b.z; });
    var unfit = fit(cv, ctx, host, st);

    function move(e) {
      var r = cv.getBoundingClientRect(), pt = e.touches ? e.touches[0] : e;
      if (!pt || !r.width) return;
      ptr.px = (pt.clientX - r.left) / r.width - 0.5;
      ptr.py = (pt.clientY - r.top) / r.height - 0.5;
      ptr.tx = Math.max(-1, Math.min(1, ptr.px * 2)); ptr.ty = Math.max(-1, Math.min(1, ptr.py * 2));
    }
    function leave() { ptr.tx = 0; ptr.ty = 0; ptr.px = ptr.py = -9; }
    addEventListener("pointermove", move, { passive: true });
    addEventListener("touchmove", move, { passive: true });
    addEventListener("touchend", leave);
    document.documentElement.addEventListener("pointerleave", leave);

    st.wake = loop(cv, function (now) {
      var t = (now - t0) / 1000, W = st.W, H = st.H, k = Math.min(W, H) * 1.35, cx = W / 2, cy = H / 2;
      ptr.x += (ptr.tx - ptr.x) * 0.05; ptr.y += (ptr.ty - ptr.y) * 0.05;
      var ay = RM ? 0 : Math.sin(t * 0.25) * 0.45 + ptr.x * 0.35;
      var ax = RM ? 0 : Math.sin(t * 0.18) * 0.12 - ptr.y * 0.25;
      var cyA = Math.cos(ay), syA = Math.sin(ay), cxA = Math.cos(ax), sxA = Math.sin(ax);
      var breathe = RM ? 1 : 1 + Math.sin(t * 0.9) * 0.015, wob = RM ? 0 : 0.006;
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1.2; ctx.lineJoin = "round";
      for (var i = 0; i < P.length; i++) {
        var p = P[i];
        var a = RM ? 1 : ease(Math.min(1, Math.max(0, (t - p.delay) / 1.8)));
        var bx = p.x + Math.sin(t * p.sp + p.ph) * wob, by = p.y + Math.cos(t * p.sp * 0.8 + p.ph) * wob;
        var x1 = bx * cyA + p.z * syA, z1 = -bx * syA + p.z * cyA;
        var y1 = by * cxA - z1 * sxA, z2 = by * sxA + z1 * cxA;
        var persp = 1 / (1 + z2 * 0.9);
        var x = x1 * persp * breathe * a + p.sx * (1 - a), y = y1 * persp * breathe * a + p.sy * (1 - a);
        var dx = x - ptr.px, dy = y - ptr.py, d2 = dx * dx + dy * dy, push = d2 < 0.012 ? (0.012 - d2) / 0.012 : 0;
        var inv = push ? push * 0.06 / Math.sqrt(d2 + 1e-6) : 0;
        p.ox += (dx * inv - p.ox) * 0.08; p.oy += (dy * inv - p.oy) * 0.08;
        var tw = RM ? 1 : 0.55 + 0.45 * Math.sin(t * (1.2 + p.sp) + p.ph * 3);
        ctx.globalAlpha = Math.max(0, Math.min(1, p.o * tw * a * (0.65 + persp * 0.35)));
        ctx.strokeStyle = p.c;
        ctx.beginPath();
        tri(ctx, cx + (x + p.ox) * k, cy + (y + p.oy) * k, p.s * k * persp * (1 + push * 0.8), p.rot + (RM ? 0 : t * p.spin));
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }, function () {
      unfit();
      removeEventListener("pointermove", move); removeEventListener("touchmove", move); removeEventListener("touchend", leave);
      document.documentElement.removeEventListener("pointerleave", leave);
    });
  }

  /* ---------- Fonda suzuvchi zarrachalar ---------- */
  function Dust(hero) {
    var cv = document.createElement("canvas");
    cv.className = "fx-dust"; cv.setAttribute("aria-hidden", "true");
    hero.insertBefore(cv, hero.firstChild);
    var ctx = cv.getContext("2d"), st = { W: 0, H: 0 }, last = performance.now(), D = [];
    for (var i = 0, N = MOBILE ? 34 : 70; i < N; i++) D.push({
      x: Math.random(), y: Math.random(), s: 2 + Math.random() * 4, r: Math.random() * 6.28,
      vx: (Math.random() - 0.5) * 0.012, vy: -0.006 - Math.random() * 0.014, vr: (Math.random() - 0.5) * 0.6,
      c: PALETTE[i % PALETTE.length], o: 0.18 + Math.random() * 0.4, ph: Math.random() * 6.28
    });
    var unfit = fit(cv, ctx, hero, st);
    st.wake = loop(cv, function (now) {
      var dt = Math.min(0.05, (now - last) / 1000), W = st.W, H = st.H; last = now;
      ctx.clearRect(0, 0, W, H); ctx.lineWidth = 1;
      for (var i = 0; i < D.length; i++) {
        var p = D[i];
        p.x += p.vx * dt; p.y += p.vy * dt; p.r += p.vr * dt;
        if (p.y < -0.03) { p.y = 1.03; p.x = Math.random(); }
        if (p.x < -0.03) p.x = 1.03; else if (p.x > 1.03) p.x = -0.03;
        ctx.globalAlpha = p.o * (0.6 + 0.4 * Math.sin(now / 900 + p.ph));
        ctx.strokeStyle = p.c; ctx.beginPath(); tri(ctx, p.x * W, p.y * H, p.s, p.r); ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }, unfit);
  }

  /* ---------- Bo'limlar paydo bo'lishi ---------- */
  var rvIO = ("IntersectionObserver" in window) && !RM ? new IntersectionObserver(function (en) {
    en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("fx-in"); rvIO.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px" }) : null;

  function scan() {
    var app = document.getElementById("app"); if (!app) return;
    var hero = app.querySelector(".hero:not([data-fx])");
    if (hero) {
      hero.setAttribute("data-fx", "1");
      var art = hero.querySelector(".hero__art");
      if (art && !art.querySelector("img")) loadShape().then(function (pts) { if (art.isConnected) Brain(art, pts); });
      Dust(hero);
      if (!RM) hero.classList.add("fx-intro");
    }
    if (rvIO && app.querySelector(".hero")) {
      app.querySelectorAll(".section .sechead:not([data-rv]), .section .grid > *:not([data-rv])").forEach(function (el, i) {
        el.setAttribute("data-rv", "1");
        if (el.getBoundingClientRect().top < innerHeight * 0.92) return;
        el.classList.add("fx-rv"); el.style.transitionDelay = (i % 4) * 70 + "ms";
        rvIO.observe(el);
      });
    }
  }

  function start() {
    var app = document.getElementById("app"); if (!app) return;
    new MutationObserver(scan).observe(app, { childList: true });
    scan();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
