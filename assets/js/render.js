/**
 * render.js
 * ─────────────────────────────────────────────
 * Pure rendering functions. Take translations (t) + PROJECTS (data)
 * and build DOM. No business logic about language switching here —
 * that lives in main.js.
 */

const CATEGORY_CLASS = {
  "ai-engineering": "tag-cyan",
  "computer-vision": "tag-emerald",
  "generative-ai": "tag-violet",
  "llm-agents": "tag-violet",
  "medical-ai": "tag-rose",
  "mlops": "tag-amber",
  "backend": "tag-slate"
};

let activeFilter = "all";
let activeQuery = "";

/* ───────────────────────────── HERO ───────────────────────────── */
function renderHero(t) {
  const badgeWrap = document.getElementById("hero-badges");
  badgeWrap.innerHTML = t.hero.badges
    .map((b) => `<span class="hero-badge">${b}</span>`)
    .join("");

  const statsWrap = document.getElementById("hero-stats");
  statsWrap.innerHTML = t.hero.stats
    .map(
      (s) => `
      <div class="stat">
        <div class="stat-v">${s.value}<span>${s.suffix}</span></div>
        <div class="stat-l">${s.label}</div>
      </div>`
    )
    .join("");
}

/* ───────────────────────────── ABOUT ───────────────────────────── */
function renderAbout(t) {
  const paraWrap = document.getElementById("about-paragraphs");
  paraWrap.innerHTML = t.about.paragraphs.map((p) => `<p>${p}</p>`).join("");

  const expertiseWrap = document.getElementById("about-expertise");
  expertiseWrap.innerHTML = t.about.expertise
    .map(
      (e) => `
      <div class="xcard">
        <div class="xcard-icon">${e.icon}</div>
        <div class="xcard-title">${e.title}</div>
        <div class="xcard-desc">${e.desc}</div>
      </div>`
    )
    .join("");

  const bringWrap = document.getElementById("about-bring");
  bringWrap.innerHTML = t.about.bring.map((b) => `<li>${b}</li>`).join("");
}

/* ───────────────────────────── FILTERS ───────────────────────────── */
function getUsedCategories() {
  const set = new Set();
  PROJECTS.forEach((p) => p.categories.forEach((c) => set.add(c)));
  return Array.from(set);
}

function renderFilters(t) {
  const wrap = document.getElementById("filter-bar");
  const cats = getUsedCategories();
  const all = [{ id: "all", label: t.filters.all }, ...cats.map((c) => ({ id: c, label: t.filters[c] || c }))];

  wrap.innerHTML = all
    .map(
      (c) => `
      <button class="chip ${c.id === activeFilter ? "chip-active" : ""}" data-filter="${c.id}">
        ${c.label}
      </button>`
    )
    .join("");

  wrap.querySelectorAll(".chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.getAttribute("data-filter");
      renderFilters(t);
      renderProjects(t);
    });
  });

  const search = document.getElementById("project-search");
  search.value = activeQuery;
  search.oninput = (e) => {
    activeQuery = e.target.value.trim().toLowerCase();
    renderProjects(t);
  };
}

/* ───────────────────────────── PROJECTS ───────────────────────────── */
function projectMatches(project, content) {
  const matchesFilter = activeFilter === "all" || project.categories.includes(activeFilter);
  if (!matchesFilter) return false;
  if (!activeQuery) return true;

  const haystack = [content.title, ...project.stack, ...project.categories]
    .join(" ")
    .toLowerCase();
  return haystack.includes(activeQuery);
}

function renderProjects(t) {
  const grid = document.getElementById("project-grid");
  const empty = document.getElementById("project-empty");
  const L = t.projects.labels;

  const cards = PROJECTS.map((project) => {
    const content = t.projects.items[project.id];
    if (!content) return null;
    if (!projectMatches(project, content)) return null;

    const statusBadge =
      project.status === "in-progress"
        ? `<span class="badge badge-status">● ${L.inProgress}</span>`
        : "";

    const catBadges = project.categories
      .map((c) => `<span class="badge ${CATEGORY_CLASS[c] || ""}">${t.filters[c] || c}</span>`)
      .join("");

    const metrics = content.metrics
      .map((m) => `<span class="metric-chip">${m}</span>`)
      .join("");

    const stack = project.stack.map((s) => `<span class="tag">${s}</span>`).join("");

    return `
      <article class="pcard ${project.featured ? "feat" : ""}" data-id="${project.id}">
        <div class="card-top">
          <div class="badges">${catBadges}${statusBadge}</div>
          <a href="${project.link}" target="_blank" rel="noopener" class="ext" aria-label="${L.viewProject}">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
          </a>
        </div>

        <h3 class="card-title">${content.title}</h3>

        <div class="story">
          <div class="story-row">
            <span class="story-label">${L.problem}</span>
            <p class="story-text">${content.problem}</p>
          </div>
          <div class="story-row">
            <span class="story-label">${L.solution}</span>
            <p class="story-text">${content.solution}</p>
          </div>
          <div class="story-row">
            <span class="story-label">${L.result}</span>
            <p class="story-text">${content.result}</p>
          </div>
          <div class="story-row story-impact">
            <span class="story-label">${L.impact}</span>
            <p class="story-text">${content.impact}</p>
          </div>
        </div>

        <div class="metric-row">${metrics}</div>

        <div class="card-foot">
          <div class="tags">${stack}</div>
        </div>
      </article>`;
  }).filter(Boolean);

  grid.innerHTML = cards.join("");
  empty.style.display = cards.length === 0 ? "block" : "none";
  empty.textContent = t.filters.noResults;
}

/* ───────────────────────────── SKILLS ───────────────────────────── */
function renderSkills(t) {
  const wrap = document.getElementById("skills-grid");
  wrap.innerHTML = t.skills.groups
    .map(
      (g) => `
      <div class="sgroup">
        <div class="sgroup-title">${g.icon} ${g.title}</div>
        <div class="sitems">
          ${g.items.map((i) => `<span class="sitem">${i}</span>`).join("")}
        </div>
      </div>`
    )
    .join("");
}

/* ───────────────────────────── MASTER RENDER ───────────────────────────── */
function renderAll(t) {
  i18n.applyStatic(t);
  renderHero(t);
  renderAbout(t);
  renderFilters(t);
  renderProjects(t);
  renderSkills(t);
}
