import { createApp } from "./components/App.js";

async function renderApp() {
  const appRoot = document.getElementById("app");
  if (!appRoot) return;

  appRoot.innerHTML = "";
  const app = await createApp();
  appRoot.appendChild(app);
}

document.addEventListener("DOMContentLoaded", renderApp);
