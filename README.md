# 🧠 Borel Goudjou — AI Engineer Portfolio (v2)

> **Live →** [bore237.github.io](https://bore237.github.io)

AI Engineer généraliste, spécialisé en Computer Vision, agents LLM, MLOps et IA médicale.
Portfolio bilingue FR/EN, architecture modulaire, filtrage dynamique par domaine.

---

## 🏗️ Architecture

```
portfolio/
├── index.html                 → structure seule, aucun texte en dur
├── photo.jpg                 -> My picture
├── favicon.svg                → mark "neural node" cyan/violet
├── _config.yml                → config GitHub Pages / Jekyll
├── locales/
│   ├── fr.json                → tout le texte FR (UI + contenu projets)
│   └── en.json                → tout le texte EN (miroir exact de fr.json)
└── assets/
    ├── css/
    │   └── style.css          → design system complet (tokens, composants)
    └── js/
        ├── i18n.js            → moteur de traduction (fetch JSON, data-i18n)
        ├── projects-data.js   → données non-traduisibles (liens, stack, catégories)
        ├── render.js          → construit le DOM (hero, about, projets, filtres)
        └── main.js            → bootstrap, toggle de langue, init
```

**Pourquoi cette séparation ?**
Le contenu (locales/*.json) ne touche jamais à la logique (render.js) ni au design
(style.css). Pour changer un mot, on édite un JSON — jamais le HTML ou le JS.
Pour ajouter un projet, on ajoute une entrée dans `projects-data.js` (liens, stack,
catégories) **et** son contenu narratif dans les deux fichiers `locales/*.json`.

---

## 🌍 Système bilingue

- Français par défaut, peu importe la langue du navigateur.
- Bouton `FR / EN` en haut à droite — bascule instantanée, sans rechargement.
- Le choix de langue est mémorisé (localStorage) pour la prochaine visite.
- Toutes les sections sont traduisibles : nav, hero, profil, projets, stack, contact.
- Ajouter une langue = créer `locales/xx.json` + l'ajouter à `SUPPORTED` dans `i18n.js`.

---

## 🏷️ Système de tags & filtrage

7 catégories compréhensibles par un recruteur, chacune avec sa couleur :

| Catégorie | Couleur |
|---|---|
| AI Engineering | Cyan |
| Computer Vision | Émeraude |
| Generative AI | Violet |
| LLM & Agents | Violet |
| Medical AI | Rose |
| MLOps | Ambre |
| Backend & Déploiement | Bleu ardoise |

Le filtrage est dynamique : clic sur un tag **ou** recherche texte (titre, stack,
catégorie) — les deux se combinent. Géré entièrement par `render.js`, aucune
dépendance externe.

---

## 📖 Format narratif des projets

Chaque projet suit la même structure, lisible par un recruteur en 15 secondes :

**Titre** → **Problème** (le besoin réel) → **Solution** (l'architecture conçue)
→ **Résultat** (ce qui a été livré) → **Impact** (pourquoi ça compte) → **Stack**

---

## 🚀 Déploiement GitHub Pages

```bash
# 1. Cloner ce dépôt dans username.github.io (ou un repo dédié)
git clone https://github.com/Bore237/Bore237.github.io.git

# 2. Activer GitHub Pages
#    Settings → Pages → Source: Deploy from a branch → main / (root)

# 3. Ajouter votre photo
#    Dans index.html, remplacer :
#      <span class="av-initials">BG</span>
#    par :
#      <img src="photo.jpg" alt="Borel Goudjou"
#           style="width:100%;height:100%;object-fit:cover;border-radius:50%;">
```

### Tester en local
Les fichiers JSON sont chargés via `fetch()`, ce qui nécessite un serveur local
(le `file://` direct bloque les requêtes par CORS) :

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

---

## ✅ Vérifications effectuées

- JSON `fr.json` / `en.json` validés syntaxiquement.
- JS validé (`node --check`) sur les 4 fichiers.
- Rendu testé en navigateur headless (Playwright) : chargement, bascule de
  langue, persistance après rechargement, filtres, recherche — sans erreur
  console liée au code (seules les polices Google Fonts échouent dans
  l'environnement de test sandboxé, sans accès internet sortant ; elles se
  chargeront normalement une fois le site en ligne).
- Responsive vérifié à 1440px et 390px (mobile).

---

## Contact

📧 [goudjouborel@gmail.com](mailto:goudjouborel@gmail.com)
🐙 [github.com/Bore237](https://github.com/Bore237)
💼 [linkedin.com/in/borel-g-724522262](https://www.linkedin.com/in/borel-g-724522262/)

---

*© 2026 Goudjou Borel — MIT License*
