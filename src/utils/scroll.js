import { animate, inView } from "motion";

// ── CONSTANTS ────────────────────────────────────────────────────────────────

const DURATION   = 0.7;
const EASE       = [0.22, 1, 0.36, 1];
const OFFSET     = 60;
const THRESHOLD  = 0.2;
const SCALE_FROM = 0.92;

// ── SECTION ITEM ANIMATIONS ──────────────────────────────────────────────────

const items = document.querySelectorAll(".item");

// Set initial hidden state
items.forEach((el) => {
  const isLeft = el.classList.contains("order-1");
  el.style.opacity = "0";
  el.style.transform = `translateX(${isLeft ? -OFFSET : OFFSET}px) scale(${SCALE_FROM})`;
});

// Animate in and out on scroll
items.forEach((el) => {
  const isLeft = el.classList.contains("order-1");
  const fromX  = isLeft ? -OFFSET : OFFSET;

  inView(
    el,
    () => {
      animate(
        el,
        { opacity: 1, transform: "translateX(0px) scale(1)" },
        { duration: DURATION, easing: EASE }
      );

      return () => {
        animate(
          el,
          { opacity: 0, transform: `translateX(${fromX}px) scale(${SCALE_FROM})` },
          { duration: DURATION * 0.6, easing: "ease-in" }
        );
      };
    },
    { amount: THRESHOLD }
  );
});
