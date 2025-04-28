import { createApp } from "./components/App.js";

export async function renderApp() {
  const appRoot = document.getElementById("app");
  if (!appRoot) return;

  appRoot.innerHTML = "";
  const app = await createApp();
  appRoot.appendChild(app);
}

document.addEventListener("DOMContentLoaded", renderApp);

// ✅ Go back and forward with browser buttons
window.addEventListener("popstate", renderApp);

// ✅ Intercept in-app link clicks to behave like SPA
document.addEventListener("click", (e) => {
  const anchor = e.target.closest("a");
  if (anchor && anchor.href.startsWith(location.origin)) {
    e.preventDefault();
    history.pushState({}, "", anchor.href); // update the URL
    renderApp(); // re-render with new route
  }
});
