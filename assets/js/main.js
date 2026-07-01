/**
 * main.js
 * ─────────────────────────────────────────────
 * Bootstraps the app: loads the initial language, renders the page,
 * wires the FR/EN toggle and the mobile nav.
 */

document.addEventListener("DOMContentLoaded", async () => {
  const initialLang = i18n.detectInitialLang();
  const t = await i18n.load(initialLang);
  renderAll(t);
  setupLangToggle();
  setupYear();
});

function setupLangToggle() {
  const btn = document.getElementById("lang-toggle");
  const update = () => {
    btn.textContent = i18n.other().toUpperCase();
  };
  update();

  btn.addEventListener("click", async () => {
    const next = i18n.other();
    const t = await i18n.load(next);
    renderAll(t);
    update();
  });
}

function setupYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}
