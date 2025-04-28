import "./About.css";
import { PageWrapper } from "./PageWrapper.js";

export async function loadAboutPage(darkMode, toggleDarkMode) {
  const base = import.meta.env.BASE_URL;
  const res = await fetch(`${base}components/About.html`);
  const html = await res.text();

  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  const container = wrapper.firstElementChild;

  setupParallax(container);

  return await PageWrapper({
    verticalScrollContent: container,
    darkMode,
    toggleDarkMode,
  });
}

function setupParallax(container) {
  container.addEventListener("mousemove", (e) => {
    const layers = container.querySelectorAll(".parallax-layer");
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2;
    const y = (e.clientY / innerHeight - 0.5) * 2;

    layers.forEach((layer) => {
      const depth = parseFloat(layer.getAttribute("data-depth"));
      const moveX = x * depth * 30;
      const moveY = y * depth * 30;
      layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });
}
