import "./About.css";
import { PageWrapper } from "./PageWrapper.js";

export async function loadAboutPage(darkMode, toggleDarkMode) {
  const base = import.meta.env.BASE_URL;
  const res = await fetch(`${base}components/About.html`);
  const html = await res.text();

  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  const container = wrapper.firstElementChild;

  const badges = wrapper.querySelectorAll(".orbit-badge");
  const desc = wrapper.querySelector("#about-description-text");

  const descriptions = {
    brown:
      "Currently a Junior studying Computer Science but my reach on campus also extends to breakdancing, music and arts!",
    peru: "Born and raised in Peru. Lived there for 18 years and i miss the food every day i'm not there 😭",
    coder:
      "My main focus is on frontend engineering and UIUX design however I have dealt with challenges in many areas, from Deeplearning to Operating systems and networks! CS fascinates me and i'm excited to know more about every aspect of it!",
    uiux: "I love making things not only funcitonal but intuitive and creative looking. Hopefully my portfolio shows this!!!",
    more: "I heard that if you click other objects in my house cool thinks will happen!",
  };

  let angle = 0;
  const total = badges.length;
  const radius = 300;

  const hitboxes = wrapper.querySelectorAll(".orbit-hitbox");

  const isMobile = window.innerWidth <= 768;

  function positionBadges() {
    if (isMobile) return;
    hitboxes.forEach((hitbox, i) => {
      const a = angle + (360 / total) * i;
      const rad = (a * Math.PI) / 180;
      const x = Math.sin(rad) * radius;
      const z = Math.cos(rad) * radius;

      hitbox.style.transform = `
      translate(-50%, -50%)
      translate3d(${x}px, 0px, ${z}px)
    `;

      hitbox.style.zIndex = Math.round(z);
    });
  }

  function animateOrbit() {
    if (!isMobile) {
      angle += 0.1;
      positionBadges();
      requestAnimationFrame(animateOrbit);
    }
  }

  hitboxes.forEach((hitbox) => {
    hitbox.addEventListener("click", () => {
      const badge = hitbox.querySelector(".orbit-badge");
      const key = badge.getAttribute("data-badge");
      desc.innerText = descriptions[key];
    });
  });

  positionBadges();
  animateOrbit();

  return await PageWrapper({
    verticalScrollContent: container,
    darkMode,
    toggleDarkMode,
  });
}
