import { loadHomePage } from "./HomePage/Home.js";
import { loadAboutPage } from "./AboutMe.js";
import { loadResponsiveRedesign } from "./CaseStudies/ResponsiveRedesign.js";
import { loadPartiful } from "./CaseStudies/Partiful";
import { loadSideQuests } from "./CaseStudies/SideQuests";
import { loadAccesibleComponent } from "./CaseStudies/AccesibleComponent";

export async function renderAnimatedRoutes() {
  const route = location.pathname.replace("/PortfolioWebsite", "") || "/";
  const wrapper = document.createElement("div");
  wrapper.id = "page-container";

  let darkMode = false;
  let currentComponent = null;

  function toggleDarkMode() {
    darkMode = !darkMode;
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
      default:
        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.justifyContent = "center";
        container.style.alignItems = "center";
        container.style.flexDirection = "column";
        container.style.minHeight = "80vh";

        const image = document.createElement("img");
        image.src = "/WIP.webp";
        image.alt = "Work in Progress";
        image.style.width = "100%";
        image.style.borderRadius = "12px";
        image.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
        container.appendChild(image);
        return container;
    }
  }

  await rerender();
  return wrapper;
}
