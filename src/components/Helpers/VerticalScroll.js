import "./ScrollComponents.css";
export async function loadVerticalScroll(content) {
  const base = import.meta.env.BASE_URL;
  const res = await fetch(`${base}components/HomePage/VerticalScroll.html`);
  const html = await res.text();

  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;

  const container = wrapper.firstElementChild;
  const contentWrapper = container.querySelector("#scroll-content");

  if (Array.isArray(content)) {
    content.forEach((el) => contentWrapper.appendChild(el));
  } else {
    contentWrapper.appendChild(content);
  }

  return container;
}
