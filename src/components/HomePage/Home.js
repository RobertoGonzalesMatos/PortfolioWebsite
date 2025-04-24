import { PageWrapper } from "../PageWrapper.js";
import { RoomScene } from "./RoomScene.js";
import { Banner } from "./Banner.js";
import { createProjectCard } from "../Helpers/ProjectCard.js";
import "./styles/Home.css";

export async function loadHomePage(darkMode, toggleDarkMode) {
  const base = import.meta.env.BASE_URL;
  const res = await fetch(`${base}components/HomePage/Home.html`);
  const html = await res.text();

  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  const container = wrapper.firstElementChild;

  const skyImage = container.querySelector(".sky");
  if (skyImage) {
    console.log("A");
    skyImage.classList.toggle("dark-mode", darkMode);
  }

  const bannerEl = await Banner();
  const bannerTarget = container.querySelector("#banner");
  if (bannerTarget) bannerTarget.replaceWith(bannerEl);

  const roomEl = await RoomScene(darkMode);
  const roomTarget = container.querySelector("#roomScene");
  if (roomTarget) roomTarget.replaceWith(roomEl);

  const projectData = [
    {
      imageUrl: "/PortfolioWebsite/3dgame.webp",
      title: "Good Morning Café NFT",
      date: "May–June 2023",
      tags: ["Product Design", "UX Research", "Figma"],
    },
    {
      imageUrl: "/PortfolioWebsite/meiklejohn.webp",
      title: "AI Music Tool",
      date: "July 2023",
      tags: ["ML", "Music", "React"],
    },
    {
      imageUrl: "/PortfolioWebsite/sidequest.gif",
      title: "Portfolio Website",
      date: "2024",
      tags: ["Frontend", "Vite", "Vanilla JS"],
    },
    {
      imageUrl: "/PortfolioWebsite/PartifulRedesign.png",
      title: "Visual Novel Engine",
      date: "March 2024",
      tags: ["Game Dev", "JS", "Narrative"],
    },
  ];

  const cardTarget = container.querySelector("#projects-wrapper");
  if (cardTarget) {
    cardTarget.style.display = "grid";
    cardTarget.style.gridTemplateColumns = "1fr 1fr";
    cardTarget.style.gridTemplateRows = "1fr 1fr";
    cardTarget.style.columnGap = "4rem";
    cardTarget.style.rowGap = "2rem";
    cardTarget.style.justifyContent = "space-evenly";
    cardTarget.style.alignItems = "center";
    // cardTarget.style.margin = "0 auto";
    cardTarget.style.width = "fit-content";

    projectData.forEach((data) => {
      const card = createProjectCard(data);
      card.style.transition = "transform 0.3s ease";
      card.addEventListener("mouseenter", () => {
        card.style.transform = "scale(1.03)";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "scale(1)";
      });
      cardTarget.appendChild(card);
    });
  }

  return await PageWrapper({
    verticalScrollContent: container,
    darkMode,
    toggleDarkMode,
  });
}
