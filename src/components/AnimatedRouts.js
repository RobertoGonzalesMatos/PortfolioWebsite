import { loadHomePage } from "./HomePage/Home.js";

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
        console.log("hi");
        return await loadHomePage(darkMode, toggleDarkMode);
      default:
        const notFound = document.createElement("h2");
        notFound.textContent = "404 - Page Not Found";
        return notFound;
    }
  }

  await rerender();
  return wrapper;
}
