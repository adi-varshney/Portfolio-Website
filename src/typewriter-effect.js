// src/utils/typewriter-effect.js
document.addEventListener("DOMContentLoaded", () => {
  // ====== PHRASES ======
  const phrases = [
    "Aspiring Engineer",
    "Computer Scientist",
    "Robotics Programmer",
    "Quantum Computing Enthusiast",
  ];

  // ====== ELEMENTS ======
  const el = document.getElementById("typewriter");
  const title = document.querySelector(".hero__title");

  // ====== CONFIG (CSS variable-based sizing) ======
  const VAR_MIN = "--size-2xl"; // ~1.5rem in your scale
  const VAR_MAX = "--size-9xl"; // used by your largest breakpoint
  const GROW_BACK = true;
  const PAD_PX = 8;             // small breathing room when fitting

  const typeSpeed = 90;
  const deleteSpeed = 45;
  const betweenWords = 1100;

  // ===== UTIL: read CSS custom prop to px =====
  function cssVarToPx(varName, fallbackPx) {
    const root = document.documentElement;
    const val = getComputedStyle(root).getPropertyValue(varName).trim();
    const rootPx = parseFloat(getComputedStyle(root).fontSize) || 16;
    if (!val) return fallbackPx;
    if (val.endsWith("rem")) return parseFloat(val) * rootPx;
    if (val.endsWith("px"))  return parseFloat(val);
    if (!Number.isNaN(parseFloat(val))) return parseFloat(val) * rootPx;
    return fallbackPx;
  }

  const MIN_PX = cssVarToPx(VAR_MIN, 24);
  const MAX_PX = cssVarToPx(VAR_MAX, 72);

  // ===== 1) LOCK HEIGHT so the page never jumps =====
  const longest = phrases.reduce((a, b) => (b.length > a.length ? b : a), "");
  const sizer = document.createElement("span");
  sizer.className = "hero__sizer";
  sizer.textContent = longest;
  title.appendChild(sizer);

  function lockHeight() {
    // measure at the biggest size the header can use
    sizer.style.fontSize = MAX_PX + "px";
    const h = sizer.getBoundingClientRect().height;
    title.style.height = Math.ceil(h) + "px"; // fixed vertical space
  }

  // ===== 2) Fit text horizontally while typing (no wrap) =====
  function fitWhileTyping() {
    if (!el.style.fontSize) el.style.fontSize = MAX_PX + "px";

    const current = parseFloat(getComputedStyle(el).fontSize) || MAX_PX;
    const box = title.clientWidth - PAD_PX;
    const text = el.scrollWidth;

    if (!box || !text) return;

    if (text > box && current > MIN_PX) {
      const ratio = box / text;
      const target = Math.max(MIN_PX, Math.floor(current * ratio));
      if (target < current) el.style.fontSize = target + "px";
    } else if (GROW_BACK && text < box * 0.9 && current < MAX_PX) {
      el.style.fontSize = Math.min(MAX_PX, Math.ceil(current + 2)) + "px";
    }
  }

  // ===== 3) Typewriter =====
  let i = 0; // phrase index
  let j = 0; // character index
  let typing = true;

  function tick() {
    const word = phrases[i];

    if (typing) {
      el.textContent = word.slice(0, j + 1);
      fitWhileTyping();
      j++;
      if (j === word.length) {
        typing = false;
        return setTimeout(tick, betweenWords);
      }
      return setTimeout(tick, typeSpeed);
    } else {
      el.textContent = word.slice(0, j - 1);
      fitWhileTyping();
      j--;
      if (j === 0) {
        typing = true;
        i = (i + 1) % phrases.length;
        el.style.fontSize = MAX_PX + "px"; // start new phrase large; height is locked
      }
      return setTimeout(tick, deleteSpeed);
    }
  }

  // ---- Boot: lock height then start typing
  function boot() {
    lockHeight();
    tick();
  }
  boot();

  // Re-lock height if viewport or fonts change
  if (document.fonts?.ready) {
    document.fonts.ready.then(lockHeight);
  }
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(lockHeight, 120);
  });
});
