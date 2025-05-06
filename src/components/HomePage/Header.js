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
  const resume = wrapper.querySelector(".contact");
  const sunMoon = wrapper.querySelector("#sunMoonToggle");
  const scrollToWork = wrapper.querySelector("#scrollToWork");
  const isMobile = window.innerWidth <= 850;
  if (isMobile) {
    const template = wrapper.querySelector("#mobile-context-menu-items");
    if (template) {
      const clone = template.content.cloneNode(true);

      const resumeBtn = clone.querySelector(".contact a");
      resumeBtn?.addEventListener("click", () => {
        window.open("/PortfolioWebsite/resume.pdf", "_blank");
      });

      const sunMoonMobile = clone.querySelector("#sunMoonToggleMobile");
      if (sunMoonMobile) {
        sunMoonMobile.src = `${base}${darkMode ? "Luna.webp" : "Sol.webp"}`;
        sunMoonMobile.addEventListener("click", () => {
          toggleDarkMode();
        });
      }

      mobileMenu.appendChild(clone);
    }
  }

  if (scrollToWork) {
    scrollToWork.addEventListener("click", () => {
      const isHome =
        location.pathname.endsWith("/") ||
        location.pathname.endsWith("/PortfolioWebsite/");

      if (!isHome) {
        window.location.href = "/PortfolioWebsite/#work";
      } else {
        const workSection = document.querySelector(".CardTitle");
        if (workSection) {
          workSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  }

  hamburger?.addEventListener("click", () => {
    mobileMenu?.classList.toggle("open");
  });

  logo?.addEventListener("click", () => {
    window.location.href = "/PortfolioWebsite/";
  });

  resume?.addEventListener("click", () => {
    window.open("/PortfolioWebsite/resume.pdf", "_blank");
  });

  if (sunMoon) {
    sunMoon.src = `${base}${darkMode ? "Luna.webp" : "Sol.webp"}`;
    sunMoon.addEventListener("click", () => {
      toggleDarkMode();
    });
  }

  const container = document.createElement("div");
  container.appendChild(header);
  container.appendChild(mobileMenu);
  return container;
}
