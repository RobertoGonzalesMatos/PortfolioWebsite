import { loadVerticalScroll } from "./Helpers/VerticalScroll.js";
import { loadHeader } from "./HomePage/Header.js";
export async function PageWrapper({
  verticalScrollContent,
  darkMode,
  toggleDarkMode,
}) {
  const base = import.meta.env.BASE_URL;
  const res = await fetch(`${base}components/HomePage/PageWrapper.html`);
  const html = await res.text();

  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;

  const transitionBody = wrapper.querySelector(".transition-body");
  setTimeout(() => {
    transitionBody.style.transition = "all 0.2s ease-out";
    transitionBody.style.opacity = 1;
    transitionBody.style.transform = "translateY(0)";
  }, 0);

  const sunMoon = wrapper.querySelector("#sunMoonToggle");
  if (sunMoon) {
    sunMoon.src = `${base}${darkMode ? "Luna.webp" : "Sol.webp"}`;
    sunMoon.addEventListener("click", (e) => {
      // setTimeout(() => sunMoon.classList.remove("rotate-animation"), 600);
      toggleDarkMode();
    });
  }
  const HeaderEl = await loadHeader();
  const HeaderTarget = wrapper.querySelector("#header");
  if (HeaderTarget) HeaderTarget.replaceWith(HeaderEl);

  const scrollContainer = wrapper.querySelector("#bannerContainer");
  if (scrollContainer) {
    const scrollEl = await loadVerticalScroll(verticalScrollContent);
    scrollContainer.appendChild(scrollEl);
  }

  return {
    element: wrapper.firstElementChild,
    updateDarkMode(newDarkMode) {
      // Update icon
      if (sunMoon) {
        sunMoon.src = `${base}${newDarkMode ? "Luna.webp" : "Sol.webp"}`;
      }

      // Update background class
      const root = document.getElementById("app");
      if (root) {
        root.classList.toggle("backgroundDark", !newDarkMode);
      }

      // Update sky background animation
      const sky = document.querySelector(".sky, .day");
      if (sky) {
        sky.classList.toggle("dark-mode", newDarkMode);
      }
    },
  };
}
