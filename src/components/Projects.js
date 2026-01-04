import "./Projects.css";
import { PageWrapper } from "./PageWrapper.js";
import { createProjectCard } from "./Helpers/ProjectCard.js";

export async function loadProjectsPage(darkMode, toggleDarkMode) {
  const base = import.meta.env.BASE_URL;

  // ---------------------------
  // Load Projects HTML
  // ---------------------------
  const res = await fetch(`${base}components/Projects.html`);
  const html = await res.text();

  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  const projectContent = wrapper.firstElementChild;

  // ---------------------------
  // Wrap in VerticalScroll container
  // ---------------------------
  const res2 = await fetch(`${base}components/HomePage/VerticalScroll.html`);
  const html2 = await res2.text();
  const wrapper2 = document.createElement("div");
  wrapper2.innerHTML = html2;

  const scrollContainer = wrapper2.firstElementChild;
  const scrollContent = scrollContainer.querySelector("#scroll-content");
  if (scrollContent) scrollContent.appendChild(projectContent);

  // ---------------------------
  // Project data (most recent first)
  // ---------------------------
  const projectData = [
    {
      imageUrl: "/PortfolioWebsite/sidequest.gif",
      title: "SideQuests",
      date: "Nov 2024 – Feb 2025",
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
    {
      imageUrl: "/PortfolioWebsite/componentImage.png",
      title: "Accessible Dropdown",
      date: "July 2023",
      tags: ["Accessibility", "React", "TypeScript", "CSS"],
      path: "/Projects/AccesibleComponent",
    },
    {
      imageUrl: "/PortfolioWebsite/mamisincancer.png",
      title: "MamisinCancer Redesign",
      date: "May – June 2023",
      tags: ["UX Design", "TypeScript", "React", "Figma"],
      path: "/Projects/ResponsiveRedesign",
    },
  ];

  // ---------------------------
  // Targets
  // ---------------------------
  const chipTarget = projectContent.querySelector("#filter-chips");
  const searchInput = projectContent.querySelector("#project-search");
  const listTarget = projectContent.querySelector("#projects-list");

  if (!chipTarget) console.warn("Missing #filter-chips in Projects.html");
  if (!searchInput) console.warn("Missing #project-search in Projects.html");
  if (!listTarget) console.warn("Missing #projects-list in Projects.html");

  // ---------------------------
  // Build filter chips
  // ---------------------------
  const allTags = Array.from(
    new Set(projectData.flatMap((p) => p.tags || []))
  ).sort((a, b) => a.localeCompare(b));

  let activeTag = "All";
  let searchQuery = "";

  function makeChip(label, isActive) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `filter-chip${isActive ? " active" : ""}`;
    btn.textContent = label;
    btn.dataset.tag = label;
    btn.setAttribute("aria-pressed", String(isActive));

    const activate = () => {
      activeTag = label;
      renderChips();
      renderProjects();
    };

    btn.addEventListener("click", activate);
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate();
      }
    });

    return btn;
  }

  function renderChips() {
    if (!chipTarget) return;
    chipTarget.innerHTML = "";

    chipTarget.appendChild(makeChip("All", activeTag === "All"));
    allTags.forEach((tag) =>
      chipTarget.appendChild(makeChip(tag, activeTag === tag))
    );
  }

  // ---------------------------
  // Render projects
  // ---------------------------
  function matchesSearch(project) {
    if (!searchQuery) return true;
    const haystack = [project.title, project.date, ...(project.tags || [])]
      .join(" ")
      .toLowerCase();
    return haystack.includes(searchQuery);
  }

  function matchesTag(project) {
    if (activeTag === "All") return true;
    return (project.tags || []).includes(activeTag);
  }

  function renderProjects() {
    if (!listTarget) return;
    listTarget.innerHTML = "";

    projectData
      .filter(matchesTag)
      .filter(matchesSearch)
      .forEach((data) => {
        const card = createProjectCard(data);
        card.classList.add("hub-card");
        card.style.transition = "transform 0.25s ease";

        card.addEventListener("mouseenter", () => {
          card.style.transform = "scale(1.015)";
        });

        card.addEventListener("mouseleave", () => {
          card.style.transform = "scale(1)";
        });

        listTarget.appendChild(card);
      });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = (e.target.value || "").trim().toLowerCase();
      renderProjects();
    });
  }

  // Initial render
  renderChips();
  renderProjects();

  // ---------------------------
  // Return wrapped page
  // ---------------------------
  return await PageWrapper({
    verticalScrollContent: scrollContainer,
    darkMode,
    toggleDarkMode,
  });
}
