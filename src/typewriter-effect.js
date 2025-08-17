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
  // Tweak these to your taste. They map to your :root size scale.
  const VAR_MIN = "--size-2xl"; // ~1.5rem in your scale
  const VAR_MAX = "--size-9xl"; // ~6rem (bigger hero)
  const GROW_BACK = true;       // let text grow back toward max after shrinking
  const PAD_PX = 8;             // leave a little horizontal breathing room

  // Typing timings
  const typeSpeed = 90;      // ms/char
  const deleteSpeed = 45;    // ms/char
  const betweenWords = 1100; // pause at full word

  // ====== UTIL: read CSS custom property and convert to px ======
  function cssVarToPx(varName, fallbackPx) {
    const root = document.documentElement;
    const computed = getComputedStyle(root).getPropertyValue(varName).trim();
    if (!computed) return fallbackPx;

    // root font-size (for rem → px)
    const rootFont = parseFloat(getComputedStyle(root).fontSize) || 16;

    // handle values like "3.75rem", "60px", "4.5", etc.
    if (computed.endsWith("rem")) {
      return parseFloat(computed) * rootFont;
    } else if (computed.endsWith("px")) {
      return parseFloat(computed);
    } else if (!Number.isNaN(parseFloat(computed))) {
      // bare number -> assume rem to stay consistent with your scale
      return parseFloat(computed) * rootFont;
    }
    return fallbackPx;
  }

  const MIN_PX = cssVarToPx(VAR_MIN, 24); // sensible fallback
  const MAX_PX = cssVarToPx(VAR_MAX, 72);

  // ====== FIT HELPER: adjust font size live while typing ======
  function fitWhileTyping(el, container) {
    if (!el || !container) return;

    // guarantee we start big (so the hero looks bold), then only shrink if needed
    if (!el.style.fontSize) el.style.fontSize = MAX_PX + "px";

    const current = parseFloat(getComputedStyle(el).fontSize) || MAX_PX;
    const box = container.clientWidth - PAD_PX;
    const text = el.scrollWidth;

    if (!box || !text) return;

    if (text > box && current > MIN_PX) {
      // shrink proportionally to fit in one step (avoid visible stutter)
      const ratio = box / text;
      const target = Math.max(MIN_PX, Math.floor(current * ratio));
      if (target < current) el.style.fontSize = target + "px";
    } else if (GROW_BACK && text < box * 0.9 && current < MAX_PX) {
      // gently grow back toward max if there's plenty of room
      const step = Math.min(MAX_PX, Math.ceil(current + 2));
      el.style.fontSize = step + "px";
    }
  }

  // ====== TYPEWRITER ======
  let i = 0; // phrase index
  let j = 0; // char index
  let typing = true;

  // make sure we start at max size for a bold hero look
  el.style.fontSize = MAX_PX + "px";

  function tick() {
    const word = phrases[i];

    if (typing) {
      el.textContent = word.slice(0, j + 1);
      fitWhileTyping(el, title);
      j++;
      if (j === word.length) {
        typing = false;
        return setTimeout(tick, betweenWords);
      }
      return setTimeout(tick, typeSpeed);
    } else {
      el.textContent = word.slice(0, j - 1);
      fitWhileTyping(el, title);
      j--;
      if (j === 0) {
        typing = true;
        i = (i + 1) % phrases.length;
        // reset to max at the start of each phrase for consistent big feel
        el.style.fontSize = MAX_PX + "px";
      }
      return setTimeout(tick, deleteSpeed);
    }
  }

  tick();
});
