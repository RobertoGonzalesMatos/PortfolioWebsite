import "./ProjectCard.css";
export function createProjectCard({ imageUrl, title, date, tags }) {
  const card = document.createElement("div");
  card.className = "ProjectCard fade-in";
  card.innerHTML = `
    <div class="image-card">
      <img src="${imageUrl}" alt="${title}" class="main-image" />
    </div>
    <div class="description fade-in-delay">
      <div class="title-row">
        <h1 class="title-card">${title}</h1>
        <span class="date">${date}</span>
      </div>
      <div class="tags">
        ${tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    card.style.opacity = 1;
    card.style.transform = "translateY(0)";
    const description = card.querySelector(".description");
    if (description) {
      description.style.opacity = 1;
      description.style.transform = "translateY(0)";
    }
  });

  return card;
}
