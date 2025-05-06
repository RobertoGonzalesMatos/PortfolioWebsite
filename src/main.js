import { createApp } from "./components/App.js";

export async function renderApp() {
  const appRoot = document.getElementById("app");
  if (!appRoot) return;

  appRoot.innerHTML = "";
  const app = await createApp();
  appRoot.appendChild(app);
}

document.addEventListener("DOMContentLoaded", renderApp);

window.addEventListener("popstate", renderApp);

document.addEventListener("click", (e) => {
  const anchor = e.target.closest("a");
  if (anchor && anchor.href.startsWith(location.origin)) {
    e.preventDefault();
    history.pushState({}, "", anchor.href);
    renderApp();
  }
});
