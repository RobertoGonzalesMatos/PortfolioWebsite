import "./About.css";
import { PageWrapper } from "./PageWrapper.js";

export async function loadAboutPage(darkMode, toggleDarkMode) {
  const base = import.meta.env.BASE_URL;
  const res = await fetch(`${base}components/About.html`);
  const html = await res.text();

  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  const container = wrapper.firstElementChild;
  container.updateDarkMode = (isDark) => {
    const ground = container.querySelector(".ground");
    if (ground) {
      ground.classList.toggle("dark", !isDark);
      ground.classList.toggle("light", isDark);
    }

    const sky = container.querySelector(".sky");
    if (sky) {
      sky.classList.toggle("dark-mode", isDark);
    }
  };

  // --- Keep the sky illusion like Home ---
  const skyImage = container.querySelector(".sky");
  if (skyImage) {
    skyImage.classList.toggle("dark-mode", darkMode);
  }

  // --- Ground color requirement ---
  const ground = container.querySelector(".ground");
  if (ground) {
    ground.classList.toggle("dark", !darkMode);
    ground.classList.toggle("light", darkMode);
  }

  // --- Professional, immediate About interactions (no orbit) ---
  const descTitle = container.querySelector("#about-description-title");
  const descText = container.querySelector("#about-description-text");
  const chips = Array.from(container.querySelectorAll(".about-chip"));

  const descriptions = {
    overview: {
      title: "Overview",
      text:
        "I’m a software engineer with a background in Computer Science from Brown University. " +
        "I’m most interested in the intersection of engineering and design—building interfaces that feel calm, fast, and intentional.",
    },
    brown: {
      title: "Brown",
      text:
        "I’m currently studying Computer Science at Brown University. " +
        "I care a lot about craft: readable code, thoughtful UX, and systems that scale without feeling complicated.",
    },
    peru: {
      title: "Peru",
      text:
        "Born and raised in Peru. I lived there for 18 years—and yes, I miss the food every single day 😭. " +
        "That background is a big part of how I think about community, warmth, and human-centered design.",
    },
    compsci: {
      title: "CompSci",
      text:
        "I’m strongest in frontend engineering, but I’ve also worked across deep learning, operating systems, and networks. " +
        "I love understanding how systems work end-to-end—then translating that into clean, approachable interfaces.",
    },
    uiux: {
      title: "UI/UX",
      text:
        "I like building things that are not only functional, but intuitive and visually clear. " +
        "I treat UI as a product: hierarchy, accessibility, performance, and polish all matter.",
    },
    more: {
      title: "More",
      text:
        "Outside of work and classes, I’m into breakdancing, music, and creative projects. " +
        "Those influences show up in how I design: rhythm, contrast, and story—even in technical work.",
    },
  };

  function setActiveChip(key) {
    const data = descriptions[key] || descriptions.overview;

    if (descTitle) descTitle.textContent = data.title;
    if (descText) descText.textContent = data.text;

    chips.forEach((c) => {
      const isActive = c.dataset.key === key;
      c.classList.toggle("active", isActive);
      c.setAttribute("aria-pressed", String(isActive));
    });
  }

  // Click + keyboard accessibility
  chips.forEach((chip) => {
    chip.addEventListener("click", () => setActiveChip(chip.dataset.key));
    chip.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setActiveChip(chip.dataset.key);
      }
    });
  });

  // Default selection
  setActiveChip("overview");

  return await PageWrapper({
    verticalScrollContent: container,
    darkMode,
    toggleDarkMode,
  });
}
