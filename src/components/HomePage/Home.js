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

  const projectData = {
    imageUrl: "your-image.png",
    title: "Good Morning Café NFT",
    date: "May–June 2023",
    tags: ["Product Design", "UX Research", "Figma"],
  };

  const card1 = createProjectCard(projectData);
  const cardTarget = container.querySelector("#projects-wrapper");
  if (cardTarget) cardTarget.appendChild(card1);

  return await PageWrapper({
    verticalScrollContent: container,
    darkMode,
    toggleDarkMode,
  });
}
