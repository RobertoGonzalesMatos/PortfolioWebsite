import { loadHomePage } from "./HomePage/Home.js";
import { loadAboutPage } from "./AboutMe.js";
import { loadResponsiveRedesign } from "./CaseStudies/ResponsiveRedesign.js";
import { loadPartiful } from "./CaseStudies/Partiful";
import { loadSideQuests } from "./CaseStudies/SideQuests";
import { loadAccesibleComponent } from "./CaseStudies/AccesibleComponent";
import { PageWrapper } from "./PageWrapper.js";

const DARK_MODE_KEY = "portfolio.darkMode";

function readDarkMode() {
  const raw = localStorage.getItem(DARK_MODE_KEY);
  return raw === "true";
}

function writeDarkMode(value) {
  localStorage.setItem(DARK_MODE_KEY, String(value));
}

function applyBodyTheme(darkMode) {
  const body = document.body;
  if (!body) return;
  body.style.backgroundColor = !darkMode ? "#78aecc" : "#cfebe9";
}

export async function renderAnimatedRoutes() {
  const route = location.pathname.replace("/PortfolioWebsite", "") || "/";
  const wrapper = document.createElement("div");
  wrapper.id = "page-container";

  let darkMode = readDarkMode();
  let currentComponent = null;

  // Apply immediately so refresh / route changes keep theme
  applyBodyTheme(darkMode);

  function toggleDarkMode() {
    darkMode = !darkMode;
    writeDarkMode(darkMode);
    applyBodyTheme(darkMode);

    if (currentComponent?.updateDarkMode) {
      currentComponent.updateDarkMode(darkMode);
    }
  }

  async function rerender() {
    currentComponent = await getPageComponent(route, darkMode, toggleDarkMode);
    wrapper.innerHTML = "";
    wrapper.appendChild(currentComponent.element || currentComponent);
  }

  async function getPageComponent(path, darkMode, toggleDarkMode) {
    switch (path) {
      case "/":
        return await loadHomePage(darkMode, toggleDarkMode);
      case "/About":
        return await loadAboutPage(darkMode, toggleDarkMode);
      case "/Projects/ResponsiveRedesign":
        return await loadResponsiveRedesign(darkMode, toggleDarkMode);
      case "/Projects/Partiful":
        return await loadPartiful(darkMode, toggleDarkMode);
      case "/Projects/SideQuests":
        return await loadSideQuests(darkMode, toggleDarkMode);
      case "/Projects/AccesibleComponent":
        return await loadAccesibleComponent(darkMode, toggleDarkMode);
      default: {
        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.justifyContent = "center";
        container.style.alignItems = "center";
        container.style.flexDirection = "column";
        container.style.minHeight = "80vh";

        const image = document.createElement("img");
        image.src = "/WIP.webp";
        image.alt = "Work in Progress placeholder";
        image.style.width = "100%";
        image.style.borderRadius = "12px";
        image.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
        image.style.marginTop = "100px";

        container.appendChild(image);

        return await PageWrapper({
          verticalScrollContent: container,
          darkMode,
          toggleDarkMode,
        });
      }
    }
  }

  await rerender();
  return wrapper;
}
