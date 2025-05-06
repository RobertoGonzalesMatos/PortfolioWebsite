import "./SideQuests.css";
import { PageWrapper } from "../PageWrapper.js";

export async function loadSideQuests(darkMode, toggleDarkMode) {
  const base = import.meta.env.BASE_URL;

  const res = await fetch(`${base}components/Projects/SideQuests.html`);
  const html = await res.text();
  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  const projectContent = wrapper.firstElementChild;

  const res2 = await fetch(`${base}components/HomePage/VerticalScroll.html`);
  const html2 = await res2.text();
  const wrapper2 = document.createElement("div");
  wrapper2.innerHTML = html2;

  const scrollContainer = wrapper2.firstElementChild;
  const scrollContent = scrollContainer.querySelector("#scroll-content");
  scrollContent.appendChild(projectContent);

  const parallax = projectContent.querySelector("#parallax-image");
  const mainContent = projectContent.querySelector(".case-study-page");
  const caseContent = mainContent?.querySelector(".case-content");
  if (parallax && caseContent) {
    const updateParallax = () => {
      const scrollTop = scrollContainer.scrollTop;

      const contentHeight = mainContent.offsetHeight;
      const viewportHeight = scrollContainer.clientHeight;
      const scrollableHeight = Math.max(contentHeight - viewportHeight, 1);

      const imageHeight = parallax.offsetHeight;

      const maxTranslate = imageHeight - contentHeight;
      const progress = Math.min(scrollTop / scrollableHeight, 1);
      const translateY = -progress * maxTranslate;

      parallax.style.transform = `translateY(${translateY}px)`;
    };

    const syncAndUpdate = () => {
      requestAnimationFrame(updateParallax);
    };

    scrollContainer.addEventListener("scroll", syncAndUpdate);
    window.addEventListener("resize", syncAndUpdate);
    new ResizeObserver(syncAndUpdate).observe(caseContent);
  }
  projectContent.querySelectorAll('.sidebar a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const targetId = this.getAttribute("href").slice(1);
      const target = projectContent.querySelector(`#${targetId}`);

      if (target) {
        const offsetPadding = 80;
        const scrollOffset =
          target.getBoundingClientRect().top -
          scrollContainer.getBoundingClientRect().top +
          scrollContainer.scrollTop -
          offsetPadding;

        scrollContainer.scrollTo({
          top: scrollOffset,
          behavior: "smooth",
        });

        history.replaceState(null, "", `#${targetId}`);
      }
    });
  });

  return await PageWrapper({
    verticalScrollContent: scrollContainer,
    darkMode,
    toggleDarkMode,
  });
}
