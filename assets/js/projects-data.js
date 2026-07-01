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
    link: "https://github.com/Bore237/AI-Clinical-Imaging-Assistant",
    year: "2026",
    status: "in-progress",
    featured: true,
    categories: ["medical-imaging", "computer-vision", "multimodal-ai",  "llm-agents", "mlops"],
    stack: ["PyTorch", "YOLO", "LangGraph", "FastMCP", "Weights & Biases", "Docker", "GitHub Actions", "PostgreSQL"]
  },
  {
    id: "medsam",
    link: "https://github.com/Bore237/MedSAM-PromptEng-vs-3DUNet",
    year: "2025",
    status: "shipped",
    featured: true,
    categories: ["medical-imaging", "computer-vision", "foundation-models", "image-segmentation"],
    stack: ["PyTorch", "MedSAM/SAM", "3D/2D U-Net", "MONAI", "Pydicom", "Streamlit", "nibabel"]
  },
  {
    id: "agents",
    link: "https://github.com/Bore237/applied-ai-agents",
    year: "2026",
    status: "shipped",
    featured: true,
    categories: ["ai-engineering", "llm-agents", "RAG", "agentic-ai"],
    stack: ["LangGraph", "LangChain", "FastMCP", "SQLite",  "Multi-Agent Systems", "Human-in-the-Loop", "Pydantic v2"]
  },
  {
    id: "survival",
    link: "https://github.com/Bore237/Breast-Cancer-Survival-ML",
    year: "2025",
    status: "shipped",
    featured: false,
    categories: ["medical-ai",  "machine-learning", "survival-analysis", "data-science"],
    stack: ["pandas", "scikit-learn", "scikit-survival", "ColumnTransformer", "GridSearchCV", "Random Survival Forest", "Gradient Boosting Survival", "Cox PH"]
  },
  {
    id: "foodclf",
    link: "https://github.com/Bore237/fastapi-pytorch-kenyan-food-classifier",
    year: "2025",
    status: "shipped",
    featured: false,
    categories: ["computer-vision", "deep-learning", "backend", "mlops"],
    stack: ["PyTorch", "FastAPI", "Grad-CAM", "Weights & Biases", "ONNX Runtime", "uvicorn"]
  },
  {
    id: "cvjourney",
    link: "https://github.com/Bore237/computer-vision-journey",
    year: "2024",
    status: "shipped",
    featured: false,
    categories: ["computer-vision", "image-processing", "object-detection", "geometric-vision"],
    stack: ["OpenCV", "MediaPipe",  "Feature Matching", "YOLO",  "Homography", "Image Registration", "Tracker", "ONNX-Runtime"]
  }
];
