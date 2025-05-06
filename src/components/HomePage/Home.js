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
  window.addEventListener("load", () => {
    if (location.hash === "#work") {
      const workSection = document.querySelector(".CardTitle");
      if (workSection) {
        workSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
  const projectData = [
    {
      imageUrl: "/PortfolioWebsite/mamisincancer.png",
      title: "MamisinCancer Redesign",
      date: "May–June 2023",
      tags: ["UX Design", "TypeScript", "React", "Figma"],
      path: "/Projects/ResponsiveRedesign",
    },
    {
      imageUrl: "/PortfolioWebsite/componentImage.png",
      title: "Accessible Dropdown",
      date: "July 2023",
      tags: ["Accesibility", "React", "TypeScript", "CSS"],
      path: "/Projects/AccesibleComponent",
    },
    {
      imageUrl: "/PortfolioWebsite/sidequest.gif",
      title: "SideQuests",
      date: "Nov 2024 - Feb 2025",
      tags: ["FullStack", "React", "AI", "Figma", "CSS"],
      path: "/Projects/SideQuests",
    },
    {
      imageUrl: "/PortfolioWebsite/PartifulRedesign.png",
      title: "Partiful Casual Events",
      date: "March 2024",
      tags: ["UX Design", "Figma", "Product Design"],
      path: "/Projects/Partiful",
    },
  ];

  const cardTarget = container.querySelector("#projects-wrapper");
  if (cardTarget) {
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
