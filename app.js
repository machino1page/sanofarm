function getStoreId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("store") || "car";
}

function setTheme(color, font) {
  const r = document.documentElement;
  if (!color) return;
  if (color.main) r.style.setProperty("--c-main", color.main);
  if (color.sub) r.style.setProperty("--c-sub", color.sub);
  if (color.bg) r.style.setProperty("--c-bg", color.bg);
  if (font) r.style.setProperty("--f-main", font);
}

function setUI(ui) {
  const r = document.documentElement;
  if (!ui) return;
  if (ui.radius) r.style.setProperty("--radius", ui.radius);
  if (ui.shadow) r.style.setProperty("--shadow", ui.shadow);
  if (ui.pad) r.style.setProperty("--pad", ui.pad);
  if (ui.gap) r.style.setProperty("--gap", ui.gap);
}

function setThemeClass(theme) {
  if (!theme) return;
  document.body.dataset.theme = theme;
}

function setImgStyle(img) {
  if (!img || !img.style) return;
  document.body.dataset.imgStyle = img.style;
}

function setAnim(on) {
  document.body.dataset.anim = on ? "on" : "off";
}

function fillText(data) {
  document.querySelectorAll("[data-f]").forEach((el) => {
    const key = el.getAttribute("data-f");
    if (data[key] != null) el.textContent = data[key];
  });
}

function fillImg(img) {
  if (!img) return;
  document.querySelectorAll("[data-img]").forEach((el) => {
    const key = el.getAttribute("data-img");
    if (img[key]) el.src = img[key];
  });
}

function fillSvc(list) {
  const box = document.querySelector('[data-list="svc"]');
  if (!box || !Array.isArray(list)) return;
  box.innerHTML = "";
  list.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    const h = document.createElement("h3");
    h.textContent = item.title || "";
    const p = document.createElement("p");
    p.textContent = item.text || "";
    card.appendChild(h);
    card.appendChild(p);
    box.appendChild(card);
  });
}

function fillPlan(list) {
  const body = document.querySelector('[data-list="plan"]');
  if (!body || !Array.isArray(list)) return;
  body.innerHTML = "";
  list.forEach((item) => {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    const tdPrice = document.createElement("td");
    tdName.textContent = item.name || "";
    tdPrice.textContent = item.price || "";
    tr.appendChild(tdName);
    tr.appendChild(tdPrice);
    body.appendChild(tr);
  });
}

async function loadStore() {
  const id = getStoreId();
  const url = `data/${id}.json`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("load error");
    const store = await res.json();

    setTheme(store.color, store.font);
    setUI(store.ui);
    setThemeClass(store.theme);
    setImgStyle(store.img);
    setAnim(store.anim);

    fillText(store);
    fillImg(store.img);
    fillSvc(store.svc);
    fillPlan(store.plan);
  } catch (e) {
    console.error(e);
  }
}

document.addEventListener("DOMContentLoaded", loadStore);

