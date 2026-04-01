const header = document.querySelector("header");
const navbar = document.querySelector(".navbar");
const scroller = document.body;

let lastY = scroller.scrollTop;

scroller.addEventListener("scroll", () => {
  const currentY = scroller.scrollTop;
  const goingDown = currentY > lastY;
  const pastThreshold = currentY > 80;

  if (header) {
    header.style.transform = goingDown && pastThreshold
      ? "translateY(-100%)"
      : "translateY(0%)";
  }

  if (navbar) {
    navbar.style.height = pastThreshold ? "48px" : "64px";
  }

  lastY = currentY;
}, { passive: true });