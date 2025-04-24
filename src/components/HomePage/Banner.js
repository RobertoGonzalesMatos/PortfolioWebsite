// ✅ Banner.js (cleaned to use HTML and CSS for layout)
import "./styles/Banner.css";

export async function Banner() {
  const base = import.meta.env.BASE_URL;
  const res = await fetch(`${base}components/HomePage/Banner.html`);
  const html = await res.text();

  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  const banner = wrapper.firstElementChild;

  const rowTop = banner.querySelector("#row-top");
  const rowCenter = banner.querySelector("#row-center");
  const rowBottom = banner.querySelector("#row-bottom");
  const rotatingBlock = banner.querySelector("#rotatingBlock");

  if (!rowTop || !rowCenter || !rowBottom || !rotatingBlock) {
    throw new Error("Missing one or more required banner elements");
  }

  // Animate full rows (no staggered letters)
  animateFullRow(rowTop, "Hi! I'm Roberto");
  animateFullRow(rowCenter, "a Software Engineer");
  animateFullRow(rowBottom, "and UIUX Designer.");

  // Animate activities
  const activities = [
    "I breakdance!",
    "I love to play music",
    "Learning to cook",
    "I'm a black belt",
  ];
  let currentActivity = 0;

  renderActivity();
  setInterval(() => {
    const current = rotatingBlock.querySelector(".blockPanel");
    if (current) {
      current.classList.remove("panelSlideIn");
      current.classList.add("panelSlideOut");
      setTimeout(() => {
        currentActivity = (currentActivity + 1) % activities.length;
        renderActivity();
      }, 400);
    }
  }, 2500);

  function renderActivity() {
    rotatingBlock.innerHTML = `<div class="blockPanel panelSlideIn">${activities[currentActivity]}</div>`;
  }

  return banner;
}

function animateFullRow(container, text) {
  container.textContent = text;
  container.style.opacity = 0;
  container.style.transform = "translateY(30px)";
  setTimeout(() => {
    container.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    container.style.opacity = 1;
    container.style.transform = "translateY(0)";
  }, 100);
}
