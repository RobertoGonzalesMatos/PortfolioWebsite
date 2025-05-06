import "./Partiful.css";
import { PageWrapper } from "../PageWrapper.js";

class Carousel {
  currentIndex;
  images;
  totalImages;
  container;

  constructor(container) {
    this.container = container;
    this.currentIndex = 0;
    this.images = container.querySelectorAll(".carousel-image");
    this.totalImages = this.images.length;

    const leftBtn = container.querySelector(".carousel-btn.left");
    const rightBtn = container.querySelector(".carousel-btn.right");

    if (leftBtn && rightBtn) {
      leftBtn.addEventListener("click", () => this.prevSlide());
      rightBtn.addEventListener("click", () => this.nextSlide());
      this.updateCarousel();
    } else {
      console.warn("🚨 Carousel buttons not found in DOM for one container.");
    }
  }

  updateCarousel() {
    this.images.forEach((img, index) => {
      img.classList.remove("active", "prev", "next", "out");
      if (index === this.currentIndex) {
        img.classList.add("active");
      } else if (
        index ===
        (this.currentIndex - 1 + this.totalImages) % this.totalImages
      ) {
        img.classList.add("prev");
      } else if (index === (this.currentIndex + 1) % this.totalImages) {
        img.classList.add("next");
      } else {
        img.classList.add("out");
      }
    });
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.totalImages;
    this.updateCarousel();
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.totalImages) % this.totalImages;
    this.updateCarousel();
  }
}

export async function loadPartiful(darkMode, toggleDarkMode) {
  const base = import.meta.env.BASE_URL;
  const res = await fetch(`${base}components/Projects/Partiful.html`);
  const html = await res.text();
  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  const projectContent = wrapper.firstElementChild;

  const res2 = await fetch(`${base}components/HomePage/VerticalScroll.html`);
  const html2 = await res2.text();
  const wrapper2 = document.createElement("div");
  wrapper2.innerHTML = html2;

  const scrollContainer = wrapper2.firstElementChild;
  const scrollContent = scrollContainer.querySelector("#scroll-content");
  scrollContent.appendChild(projectContent);

  const parallax = projectContent.querySelector("#parallax-image");
  const mainContent = projectContent.querySelector(".case-study-page");
  const caseContent = mainContent?.querySelector(".case-content");
  if (parallax && caseContent) {
    const updateParallax = () => {
      const scrollTop = scrollContainer.scrollTop;

      const contentHeight = mainContent.offsetHeight;
      const viewportHeight = scrollContainer.clientHeight;
      const scrollableHeight = Math.max(contentHeight - viewportHeight, 1);

      const imageHeight = parallax.offsetHeight;

      const maxTranslate = imageHeight - contentHeight;
      const progress = Math.min(scrollTop / scrollableHeight, 1);
      const translateY = -progress * maxTranslate;

      parallax.style.transform = `translateY(${translateY}px)`;
    };

    const syncAndUpdate = () => {
      requestAnimationFrame(updateParallax);
    };

    scrollContainer.addEventListener("scroll", syncAndUpdate);
    window.addEventListener("resize", syncAndUpdate);
    new ResizeObserver(syncAndUpdate).observe(caseContent);
  }
  projectContent.querySelectorAll('.sidebar a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const targetId = this.getAttribute("href").slice(1);
      const target = projectContent.querySelector(`#${targetId}`);

      if (target) {
        const offsetPadding = 80;
        const scrollOffset =
          target.getBoundingClientRect().top -
          scrollContainer.getBoundingClientRect().top +
          scrollContainer.scrollTop -
          offsetPadding;

        scrollContainer.scrollTo({
          top: scrollOffset,
          behavior: "smooth",
        });

        history.replaceState(null, "", `#${targetId}`);
      }
    });
  });
  const allCarousels = projectContent.querySelectorAll(".carousel-container");
  allCarousels.forEach((container) => {
    new Carousel(container);
  });
  return await PageWrapper({
    verticalScrollContent: scrollContainer,
    darkMode,
    toggleDarkMode,
  });
}
