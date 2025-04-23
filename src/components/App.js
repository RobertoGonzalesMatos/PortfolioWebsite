import { renderAnimatedRoutes } from "./AnimatedRouts.js";
import "./App.css";

export async function createApp() {
  const container = document.createElement("div");
  container.className = "app-container";

  const root = document.getElementById("app");
  if (root) {
    root.classList.add("backgroundDark");
  }

  const page = await renderAnimatedRoutes();
  container.appendChild(page);

  return container;
}
