/**
 * projects-data.js
 * ─────────────────────────────────────────────
 * Language-agnostic project metadata.
 * Narrative content (title, problem, solution, result, impact, metrics)
 * lives in /locales/fr.json and /locales/en.json under projects.items.<id>
 * and is merged with this data at render time by render.js.
 *
 * categories[] values must match keys in locales/*.json → "filters"
 */

const PROJECTS = [
  {
    id: "osteoscan",
    link: "https://github.com/Bore237",
    year: "2026",
    status: "in-progress",
    featured: true,
    categories: ["medical-ai", "computer-vision", "llm-agents", "mlops"],
    stack: ["YOLO", "LangGraph", "FastMCP", "Weights & Biases", "GitHub Actions", "SQLite"]
  },
  {
    id: "medsam",
    link: "https://github.com/Bore237/MedSAM-PromptEng-vs-3DUNet",
    year: "2025",
    status: "shipped",
    featured: true,
    categories: ["computer-vision", "medical-ai"],
    stack: ["PyTorch", "MedSAM", "3D U-Net", "NIfTI", "Streamlit", "nibabel"]
  },
  {
    id: "agents",
    link: "https://github.com/Bore237",
    year: "2026",
    status: "shipped",
    featured: true,
    categories: ["ai-engineering", "llm-agents", "backend"],
    stack: ["LangGraph", "LangChain", "FastMCP", "Groq", "Gemini 2.5", "Pydantic v2"]
  },
  {
    id: "survival",
    link: "https://github.com/Bore237/Breast-Cancer-Survival-ML",
    year: "2025",
    status: "shipped",
    featured: false,
    categories: ["medical-ai", "ai-engineering"],
    stack: ["scikit-survival", "lifelines", "MICE", "GridSearchCV", "pandas"]
  },
  {
    id: "foodclf",
    link: "https://github.com/Bore237/fastapi-pytorch-kenyan-food-classifier",
    year: "2025",
    status: "shipped",
    featured: false,
    categories: ["computer-vision", "backend", "mlops"],
    stack: ["PyTorch 2.0", "FastAPI", "Grad-CAM", "AMP", "uvicorn"]
  },
  {
    id: "cvjourney",
    link: "https://github.com/Bore237",
    year: "2024",
    status: "shipped",
    featured: false,
    categories: ["computer-vision"],
    stack: ["OpenCV", "MediaPipe", "NumPy", "Kalman Filter", "CSRT"]
  }
];
