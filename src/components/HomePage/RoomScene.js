export async function RoomScene(lightMode) {
  const base = import.meta.env.BASE_URL;
  const res = await fetch(`${base}components/HomePage/RoomScene.html`);
  const html = await res.text();

  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;

  const container = wrapper.firstElementChild;
  const highlight = container.querySelector(".roomHighlight");
  const svg = container.querySelector("svg");

  const areas = [
    {
      points: "110,575 75,450 79,310 100,310 215,453 255,470 257,519",
      route: "/Music",
      highlight: "Music",
    },
    {
      points: "105,339 120,240 280,240 365,300 175,367",
      route: "/Misc",
      highlight: "Misc",
    },
    {
      points: "118,216 300,120 385,183 200,250",
      route: "/DanceSports",
      highlight: "Dance",
    },
    {
      points:
        "420,510 415,405 435,295 585,307 585,397 720,425 755,460 750,575 660,607",
      route: "/Code",
      highlight: "Code",
    },
    {
      points: "400,175 398,50 565,115 565,240",
      route: "/About",
      highlight: "AboutMe",
    },
  ];

  areas.forEach(({ points, route, highlight: name }) => {
    const polygon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );
    polygon.setAttribute("points", points);
    polygon.classList.add("clickable-polygon");

    polygon.addEventListener("mouseenter", () => {
      highlight.style.display = "block";
      highlight.src = `/PortfolioWebsite/Highlights/${name}Highlight.webp`;
    });

    polygon.addEventListener("mouseleave", () => {
      highlight.style.display = "none";
      highlight.src = "";
    });

    polygon.addEventListener("click", () => {
      history.pushState({}, "", `/PortfolioWebsite${route}`);
      import("/src/main.js").then(({ renderApp }) => {
        renderApp();
      });
    });

    svg.appendChild(polygon);
  });

  return container;
}
