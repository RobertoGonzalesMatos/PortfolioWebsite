import "./styles/Header.css";

export async function loadHeader(darkMode, toggleDarkMode) {
  const base = import.meta.env.BASE_URL;
  const res = await fetch(`${base}components/HomePage/Header.html`);
  const html = await res.text();

  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;

  const header = wrapper.querySelector(".header");
  const mobileMenu = wrapper.querySelector("#mobileMenu");
  const hamburger = wrapper.querySelector("#hamburger");
  const logo = wrapper.querySelector(".logo");

  hamburger?.addEventListener("click", () => {
    mobileMenu?.classList.toggle("open");
  });

  logo?.addEventListener("click", () => {
    // Send user to the main page
    window.location.href = "/PortfolioWebsite/";
  });

  // Return header + mobileMenu
  const container = document.createElement("div");
  container.appendChild(header);
  container.appendChild(mobileMenu);

  return container;
}
