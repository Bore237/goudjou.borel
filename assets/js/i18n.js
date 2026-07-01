/**
 * i18n.js
 * ─────────────────────────────────────────────
 * Minimal i18n engine. No framework dependency.
 *
 * Usage:
 *   i18n.load('fr').then(t => { ...render with t... })
 *   i18n.applyStatic(t)   → fills every [data-i18n="dot.path"] element
 *   i18n.t(t, 'a.b.c')    → safe dotted-path lookup
 */

const i18n = (() => {
  const SUPPORTED = ["fr", "en"];
  const STORAGE_KEY = "bg_portfolio_lang";
  let current = null;
  let cache = {};

  function detectInitialLang() {
    // French is the default language regardless of browser locale.
    // We only switch away from it if the visitor explicitly chose
    // a language before (stored from a previous visit).
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;
    return "fr";
  }

  async function load(lang) {
    if (!SUPPORTED.includes(lang)) lang = "fr";
    if (cache[lang]) {
      current = lang;
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
      return cache[lang];
    }
    const res = await fetch(`locales/${lang}.json`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Could not load locale: ${lang}`);
    const data = await res.json();
    cache[lang] = data;
    current = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    return data;
  }

  function t(translations, path) {
    return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), translations);
  }

  function applyStatic(translations) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const path = el.getAttribute("data-i18n");
      const val = t(translations, path);
      if (val !== null && typeof val === "string") el.textContent = val;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const path = el.getAttribute("data-i18n-placeholder");
      const val = t(translations, path);
      if (val !== null && typeof val === "string") el.setAttribute("placeholder", val);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const path = el.getAttribute("data-i18n-aria");
      const val = t(translations, path);
      if (val !== null && typeof val === "string") el.setAttribute("aria-label", val);
    });

    // <title> and meta description / OG tags
    if (translations.meta) {
      document.title = translations.meta.title;
      const setMeta = (selector, content) => {
        const el = document.querySelector(selector);
        if (el && content) el.setAttribute("content", content);
      };
      setMeta('meta[name="description"]', translations.meta.description);
      setMeta('meta[property="og:title"]', translations.meta.ogTitle);
      setMeta('meta[property="og:description"]', translations.meta.ogDescription);
    }
  }

  function getCurrent() {
    return current;
  }

  function other() {
    return current === "fr" ? "en" : "fr";
  }

  return { load, t, applyStatic, getCurrent, other, detectInitialLang, SUPPORTED };
})();
