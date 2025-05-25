const container = document.querySelector(".timelineContainer");
const sections = document.querySelectorAll(".era");
let isScrolling = false;

function getCurrentSectionIndex() {
  let minDistance = Infinity;
  let currentIndex = 0;

  sections.forEach((section, i) => {
    const distance = Math.abs(section.getBoundingClientRect().top);
    if (distance < minDistance) {
      minDistance = distance;
      currentIndex = i;
    }
  });

  return currentIndex;
}

// Scroll one section at a time
function scrollToSection(index) {
  if (index < 0 || index >= sections.length) return;

  isScrolling = true;
  sections[index].scrollIntoView({ behavior: "smooth" });

  //   setTimeout(() => {
  //     isScrolling = false;
  //   }, 10000); // Delay (in ms) to prevent rapid scroll
}

// When the scroll has completely finished, unlock scroll input
container.addEventListener("scrollend", () => {
  isScrolling = false;
});

container.addEventListener(
  "wheel",
  (e) => {
    if (isScrolling) return;

    e.preventDefault(); // Prevent native scroll

    const currentIndex = getCurrentSectionIndex();

    const direction = e.deltaY > 0 ? 1 : -1;

    scrollToSection(currentIndex + direction);
  },
  { passive: false }
); // passive: false is critical here
