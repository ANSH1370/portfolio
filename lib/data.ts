// ─────────────────────────────────────────────────────────────
// ALL site content lives here. Edit this one file to update
// text, links, projects, experience, and skills site-wide.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Ansh Mangukiya",
  role: "AI Engineer",
  titleLine: "Generative AI · LLM Systems · RAG · Multi-Agent Orchestration",
  email: "anshmangukiya.ai@gmail.com",
  phone: "+91 70692 16178",
  phoneHref: "tel:+917069216178",
  resume: "/api/resume-download",
  tagline: "I engineer production GenAI systems — RAG pipelines, fine-tuned LLMs & multi-agent platforms.",
  description:
    "AI Engineer building production Generative AI — RAG pipelines, LLM fine-tuning, vLLM multi-GPU inference optimization, and LangGraph multi-agent systems.",
  // Live URL (no trailing slash). Used for canonical/OG/sitemap — must be a
  // domain that actually resolves, or link previews break. Swap when a custom
  // domain is purchased and connected in Vercel.
  url: "https://anshmangukiya.vercel.app",
  location: "Surat, India · working worldwide",
  github: "https://github.com/ANSH1370",
  linkedin: "https://www.linkedin.com/in/anshmangukiya",
};

// Big numbers from real work — shown as the impact band under the hero.
export const impact = [
  { value: "80%", label: "faster customer onboarding via LLM-generated ERP→CRM connectors" },
  { value: "150+", label: "tokens/sec throughput on a custom multi-GPU vLLM inference stack" },
  { value: "70%", label: "less engineering support load via a LangGraph conversational agent" },
  { value: "60%", label: "reduction in manual ticket triage with fine-tuned domain models" },
];

export const experience = [
  {
    role: "AI Engineer",
    company: "Commercient LLC",
    companyUrl: "https://www.commercient.com/",
    period: "Jan 2025 — Present",
    mode: "Hybrid",
    bullets: [
      "Architected a no-code ingestion & chatbot platform that lets enterprise customers launch domain-specific GenAI assistants from their own PDFs, web pages, and internal docs.",
      "Engineered a custom multi-GPU LLM inference stack on vLLM — advanced batching, KV-cache optimization — sustaining 150+ tokens/sec under concurrent load.",
      "Designed an LLM-powered SQL view generator that auto-templates ERP-to-CRM data connectors, eliminating 80% of manual integration coding during onboarding.",
      "Built a conversational ERP↔CRM sync agent with LangGraph so non-technical users configure complex integrations in plain English — cutting engineering support load by 70%.",
      "Shipped a customer-facing LLM fine-tuning platform (model distillation + RLHF feedback loops); tuned models reduced manual ticket triage by 60%.",
      "Implemented RAG retrieval pipelines with vector embeddings & semantic search, and bridged .NET enterprise systems with Python AI services via FastAPI microservices — all containerized with Docker + CI/CD on multi-GPU infrastructure.",
    ],
  },
];

export type Project = {
  title: string;
  summary: string;
  problem: string;
  stack: string[];
  link: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "CareerMatch AI",
    summary: "AI-powered resume-to-company recommendation engine.",
    problem:
      "Job seekers waste hours guessing which companies fit their profile. CareerMatch parses resumes, embeds candidate skills, and matches them against company requirements to rank the best-fit employers.",
    stack: ["Python", "NLP", "Embeddings", "scikit-learn"],
    link: "https://github.com/ANSH1370/CareerMatch-AI",
    featured: true,
  },
  {
    title: "NLP Studio",
    summary: "Full-stack NLP platform: sentiment, NER & POS tagging in one tool.",
    problem:
      "Teams shouldn't need three tools for basic text intelligence. NLP Studio combines ML-based sentiment analysis with spaCy-powered entity recognition and POS tagging behind a single interface.",
    stack: ["Python", "spaCy", "Machine Learning", "Full-stack"],
    link: "https://github.com/ANSH1370/NLP-Studio",
    featured: true,
  },
  {
    title: "SmartPhone Price Intelligence",
    summary: "ML platform predicting phone prices from specs, with automated data collection.",
    problem:
      "Pricing a device competitively requires market-wide data. This pipeline scrapes Smartprix listings, runs EDA + preprocessing, trains regression models, and serves predictions through a Streamlit app.",
    stack: ["Python", "Regression", "Web Scraping", "Streamlit"],
    link: "https://github.com/ANSH1370/SmartPhone-Price-Intelligence",
    featured: true,
  },
  {
    title: "JobFit ATS Resume Parser",
    summary: "ATS-style resume parser that scores resumes against job descriptions.",
    problem:
      "Most resumes die in ATS filters. JobFit extracts structured data from resumes and scores them against a target job description — the same logic recruiters' software uses.",
    stack: ["Python", "NLP", "Parsing"],
    link: "https://github.com/ANSH1370/JobFit_ATS_Resume_Parser",
  },
  {
    title: "ContextFlow",
    summary: "LSTM language model for next-word prediction.",
    problem:
      "A from-scratch LSTM-based NLP system that learns contextual word dependencies from text corpora — the foundation of autocomplete and writing assistants.",
    stack: ["Python", "TensorFlow/Keras", "LSTM"],
    link: "https://github.com/ANSH1370/ContextFlow-LSTM-Language-Model-for-Next-Word-Prediction",
  },
  {
    title: "AthletiX Hub",
    summary: "E-commerce platform with an integrated Dialogflow chatbot.",
    problem:
      "Full-stack fitness supplement store — Flask backend, MySQL, and a conversational Dialogflow chatbot handling customer queries. Proof of shipping AI inside a real product.",
    stack: ["Flask", "MySQL", "Dialogflow", "Full-stack"],
    link: "https://github.com/ANSH1370/AthletiX-Hub",
  },
];

// Categorized to mirror how engineers actually scan a stack.
export const skillGroups = [
  {
    title: "GenAI & LLMs",
    items: [
      "RAG",
      "Fine-Tuning & Distillation",
      "RLHF",
      "Prompt Engineering",
      "Multi-Agent Systems",
      "AI Agent Orchestration",
      "Inference Optimization",
      "LLM Evaluation",
    ],
  },
  {
    title: "Frameworks & Libraries",
    items: [
      "vLLM",
      "LangChain",
      "LangGraph",
      "CrewAI",
      "Hugging Face Transformers",
      "PyTorch",
      "TensorFlow / Keras",
      "scikit-learn",
      "spaCy",
    ],
  },
  {
    title: "Vector & Retrieval",
    items: ["Pinecone", "ChromaDB", "FAISS", "Embeddings", "Semantic Search", "Chunking & Indexing"],
  },
  {
    title: "Engineering",
    items: [
      "Python",
      "FastAPI",
      "Flask",
      ".NET Core / C#",
      "ASP.NET",
      "REST API Design",
      "Microservices",
      "System Design",
      "Next.js / React",
    ],
  },
  {
    title: "Cloud & MLOps",
    items: [
      "AWS (EC2, S3)",
      "Docker",
      "Kubernetes",
      "CI/CD Pipelines",
      "MLOps",
      "Multi-GPU Deployment & Orchestration",
    ],
  },
  {
    title: "Data",
    items: [
      "PostgreSQL",
      "MySQL",
      "SQL Optimization",
      "ETL & Data Pipelines",
      "Data Warehousing",
      "Power BI",
      "Tableau",
      "Streamlit",
    ],
  },
];

export const certifications = [
  {
    title: "Industrial Artificial Intelligence with Cloud Computing",
    issuer: "Microsoft",
    link: "https://drive.google.com/file/d/1AAZEXzG1HZgvsbm7typ9is2hjY4UsTph/view",
  },
  {
    title: "Introduction to NLP",
    issuer: "Infosys",
    link: "https://drive.google.com/file/d/1RiMhqD9MuXtSCdQ9CidhhZ8-g_AwMu3j/view",
  },
  {
    title: "Sequences, Time Series and Prediction",
    issuer: "Coursera · DeepLearning.AI",
    link: "https://drive.google.com/file/d/1nj_e9En4-5hPt3GPhzi3lqFel8nzSade/view",
  },
];

export const education = {
  degree: "B.E. Computer Science",
  school: "Sarvajanik College of Engineering & Technology, Surat",
  period: "2021 — 2025",
  gpa: "CGPA 9.78 / 10",
};

export const about = {
  intro: [
    "I'm Ansh. I work as an AI Engineer at Commercient, where I build the systems behind GenAI products — chatbot platforms, fine-tuning pipelines, and the inference infrastructure that keeps them running.",
    "One thing production has taught me: the model is usually the least important part. Good ingestion, clean chunking, proper indexing, and honest evaluation matter more than whatever model topped this week's benchmark.",
  ],
  journey: [
    {
      icon: "book" as const,
      period: "2021",
      title: "Where it started",
      text: "First year of computer science at Sarvajanik College, Surat. My GitHub still has the tic-tac-toe games I built while learning Java — I keep them public as a reminder that everyone starts somewhere.",
    },
    {
      icon: "code" as const,
      period: "2021 — 2024",
      title: "Learning by shipping",
      text: "A recommendation engine that matches resumes to companies. An NLP platform. A price-prediction pipeline that scraped its own training data. A chatbot inside a real e-commerce store. None of them stopped at the notebook — each one had to become something a person could actually click.",
    },
    {
      icon: "rocket" as const,
      period: "Jan 2025 — Present",
      title: "The jump to production",
      text: "Joined Commercient as an AI Engineer while still finishing my degree, then graduated with a 9.78/10 CGPA. The first lesson production taught me: a demo only has to work once. A product has to work every time.",
    },
    {
      icon: "bolt" as const,
      period: "Today",
      title: "Making AI hold up, at Commercient",
      current: true,
      text: "Still at Commercient — shipping 150+ tokens/sec from a multi-GPU vLLM stack, cutting manual integration coding by 80%, and engineering support load by 70%. None of it came from a bigger model — it came from better retrieval, cleaner pipelines, and honest evaluation. That's the part of this field I like most.",
    },
  ],
  stats: [
    { value: "1+", label: "year building production GenAI systems" },
    { value: "10+", label: "AI/ML projects shipped" },
    { value: "5+", label: "GenAI systems running in production" },
  ],
};

export const faq: { q: string[]; a: string }[] = [
  {
    q: ["work", "do you do", "focus", "build", "specialize"],
    a: "Ansh works on production Generative AI: RAG pipelines, LLM fine-tuning and distillation, multi-GPU vLLM inference optimization, and LangGraph multi-agent systems. See the Experience section for the details.",
  },
  {
    q: ["contact", "email", "reach", "talk", "connect", "touch"],
    a: "Scroll to the Connect section and use the form — it goes straight to Ansh's inbox. He typically replies within 24 hours.",
  },
  {
    q: ["experience", "background", "who", "about"],
    a: "Ansh is an AI Engineer at Commercient LLC building production GenAI: RAG pipelines, a multi-GPU vLLM inference stack (150+ tokens/sec), LangGraph agents, and LLM fine-tuning platforms. Plus 10+ personal ML/NLP projects — see Experience and Projects.",
  },
  {
    q: ["project", "github", "portfolio"],
    a: "Check the Projects section — highlights include CareerMatch AI (resume-to-company matching), NLP Studio, and a price-prediction pipeline. All code is on GitHub: github.com/ANSH1370.",
  },
  {
    q: ["skill", "stack", "tech", "tool"],
    a: "Core stack: Python, vLLM, LangChain/LangGraph, Hugging Face, PyTorch, Pinecone/ChromaDB/FAISS, FastAPI, .NET, AWS, Docker, Kubernetes. The Toolbox section has the full categorized list.",
  },
];
