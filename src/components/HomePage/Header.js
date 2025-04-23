import "./styles/Header.css";

export async function loadHeader(darkMode, toggleDarkMode) {
  const base = import.meta.env.BASE_URL;
  const res = await fetch(`${base}components/HomePage/Header.html`);
  const html = await res.text();
  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  const header = wrapper.firstElementChild;
  return await header;
}
