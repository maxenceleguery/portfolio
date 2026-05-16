// Centralized portfolio content. Edit here, not in component files.

export interface EducationEntry {
  period: string;
  title: string;
  institution: string;
  description: string;
  link?: string;
}

export interface Experience {
  title: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
  type: "internship" | "research" | "project";
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; level: number }[];
}

export interface Language {
  name: string;
  level: string;
  flag: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  imageVariant?: "cover" | "icon";
  features: string[];
  technologies: string[];
  githubUrl?: string;
  siteUrl?: string;
  category: "graphics" | "ai" | "game" | "web";
  reference?: { title: string; url: string };
}

export interface ProjectCategory {
  id: string;
  label: string;
  icon: string;
}

export interface ContactMethod {
  name: string;
  icon: string;
  url?: string;
  display: string;
  description: string;
  color: string;
}

export const BIRTH_DATE = "2001-09-23";

export const EDUCATION: EducationEntry[] = [
  {
    period: "2021 - 2025",
    title: "Master of Science in Engineering",
    institution: "ENSTA Paris, Palaiseau, France",
    description:
      "Top 10 Graduate school of engineering in France. Specialization in computer science with focus on PyTorch, OpenCV, Machine Learning, and Deep Learning.",
    link: "https://www.ensta-paris.fr/",
  },
  {
    period: "2019 - 2021",
    title: "CPGE PTSI-PT*",
    institution: "Lycée Gustave Eiffel, Bordeaux, France",
    description:
      "Advanced Physics and Mathematics Class. 2 years of intense preparation for application to graduate schools.",
  },
  {
    period: "2016 - 2019",
    title: "Baccalauréat S",
    institution: "Lycée Fernand Daguin, Mérignac, France",
    description:
      "French national academic qualification after secondary education. Graduated with honor.",
  },
];

export const EXPERIENCES: Experience[] = [
  {
    title: "Freelance AI Engineer",
    company: "Podtech",
    companyUrl: "https://podtech.tech/",
    period: "October 2025 - Present",
    location: "Remote (Paris / Tokyo)",
    type: "project",
    description: [
      "Lead engineer on Buddy AI Note — a memo-first daily workspace where users write their daily memo and AI turns it into tasks, calendar events, and email replies",
      "Designed and shipped bidirectional Google / Outlook calendar sync and Gmail / Outlook email triage with AI-generated drafts",
      "Built a long-term AI memory layer (entity graph + observations + per-user distillation) so the assistant learns user preferences across sessions",
      "Architected the BullMQ + Redis background fleet, leader-elected scheduler, and shipped the Next.js web app + Expo mobile app from a shared Supabase + Postgres + RLS data layer",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Expo",
      "React Native",
      "Supabase",
      "PostgreSQL",
      "OpenAI",
      "BullMQ",
      "Docker",
    ],
  },
  {
    title: "Lead Engineer Internship",
    company: "Podtech",
    companyUrl: "https://podtech.tech/",
    period: "April 2025 - September 2025",
    location: "Tokyo, Japan",
    type: "internship",
    description: [
      "Leaded a web application project for recommending the best itinerary for tourists in Japan",
      "Deployed in production using Docker and AWS",
      "Contributed to agentic AI projects",
    ],
    technologies: [
      "Python",
      "Agentic AI",
      "React",
      "NextJS",
      "Docker",
      "AWS",
      "DevOps",
    ],
  },
  {
    title: "Engineer Internship in Deep Learning",
    company: "Visionairy",
    companyUrl: "https://www.visionairy.io/",
    period: "February 2024 - August 2024",
    location: "Paris, France",
    type: "internship",
    description: [
      "Implemented AI solutions for anomaly detection in industrial environments",
      "Deployed machine learning models in production using Docker and Azure",
      "Collaborated with cross-functional teams for smooth integration and continuous improvement of AI systems",
      "Developed robust testing frameworks for ML model validation",
    ],
    technologies: [
      "PyTorch",
      "Python",
      "Computer vision",
      "Docker",
      "Azure",
      "OpenCV",
      "MLOps",
    ],
  },
  {
    title: "Research Internship in Deep Learning",
    company: "U2IS Laboratory, ENSTA Paris",
    companyUrl: "https://u2is.ensta-paris.fr/?lang=en",
    period: "September 2023 - February 2024",
    location: "Palaiseau, France",
    type: "research",
    description: [
      "Conducted research on uncertainty estimation to mitigate overconfident AI model predictions",
      "Collaborated with teacher-researcher, resulting in a paper submitted to CVPR",
      "Contributed to advancing deep learning techniques for robust and reliable AI models",
      "Implemented novel Bayesian neural network architectures",
    ],
    technologies: [
      "PyTorch",
      "Python",
      "Computer vision",
      "Bayesian Networks",
      "Research",
    ],
  },
  {
    title: "Research Internship in General Relativity",
    company: "CPHT, École Polytechnique",
    period: "June 2023 - August 2023",
    location: "Palaiseau, France",
    type: "research",
    description: [
      "Studied quasinormal modes of different space-time geometries",
      "Developed numerical methods for solving differential equations in curved spacetime",
      "Published research on quasinormal modes in curved space-time",
      "Implemented computational physics simulations using Python",
    ],
    technologies: [
      "Python",
      "Mathematical Modeling",
      "Numerical Analysis",
      "Physics",
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: "💻",
    skills: [
      { name: "Python", level: 95 },
      { name: "C/C++", level: 80 },
      { name: "TypeScript", level: 80 },
      { name: "Java", level: 70 },
      { name: "Rust", level: 60 },
    ],
  },
  {
    title: "AI & Machine Learning",
    icon: "🤖",
    skills: [
      { name: "PyTorch", level: 95 },
      { name: "Scikit-Learn", level: 85 },
      { name: "OpenCV", level: 80 },
      { name: "MLFlow", level: 70 },
    ],
  },
  {
    title: "Web Development",
    icon: "🌐",
    skills: [
      { name: "React", level: 75 },
      { name: "Next.js", level: 70 },
      { name: "Node.js", level: 70 },
      { name: "HTML/CSS", level: 60 },
    ],
  },
  {
    title: "Tools & Technologies",
    icon: "🛠️",
    skills: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 90 },
      { name: "Linux", level: 90 },
      { name: "CI/CD", level: 87 },
      { name: "AWS", level: 85 },
      { name: "Azure", level: 80 },
    ],
  },
];

export const LANGUAGES: Language[] = [
  { name: "French", level: "Native", flag: "🇫🇷" },
  { name: "English", level: "Fluent", flag: "🇺🇸" },
  { name: "Spanish", level: "Intermediate", flag: "🇪🇸" },
  { name: "Japanese", level: "Basic", flag: "🇯🇵" },
];

export const ADDITIONAL_SKILLS: string[] = [
  "Machine Learning",
  "Deep Learning",
  "Computer Vision",
  "Large Language Models",
  "AI Engineering",
  "Software Architecture",
  "Research",
  "Problem Solving",
];

export const PROJECTS: Project[] = [
  {
    id: "buddy",
    title: "Buddy AI Note",
    description:
      "A memo-first daily workspace. You write your daily memo; AI turns it into tasks, calendar events, and email replies — with optional Gmail / Outlook and Google / Outlook calendar enrichment. Web + mobile, multilingual, with a long-term AI memory layer that learns your preferences over time.",
    image: "/buddy_card.png",
    imageVariant: "icon",
    category: "ai",
    features: [
      "Daily memo as the single workspace: agenda, action items, voice memos, and email drafts in one place",
      "Bidirectional Google / Outlook calendar sync; AI proposes events, you approve in one tap",
      "Email triage with Gmail / Outlook: AI classifies threads, drafts replies, and surfaces them inside the memo",
      "Voice memo capture with on-device VAD, transcription, summary, and shareable meeting minutes",
      "AI agent (13 tools) plus a typed entity-graph memory that distills observations into long-term preferences",
      "Web (Next.js 16) and mobile (Expo / React Native) sharing one Supabase + Postgres + RLS backend",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Expo",
      "React Native",
      "Supabase",
      "PostgreSQL",
      "OpenAI",
      "BullMQ",
      "Tailwind",
    ],
    siteUrl: "https://cal.podtech-ai.com",
  },
  {
    id: "parts_selection",
    title: "Parts selection application",
    description:
      "Leverage specialized large language models to instantly recommend optimal parts from vast component databases. Our AI agent understands your requirements and finds the perfect match.",
    image: "/parts_selection.png",
    category: "web",
    features: [
      "Simply describe what you need in natural language. Our AI understands context and asks clarifying questions.",
      "Advanced algorithms search through multiple databases simultaneously, finding parts that match your exact specifications.",
      "Get recommendations in seconds, not hours. Our AI processes your requirements and delivers results instantly.",
      "Browse instantly though Monotaro, Castorama or SMC catalogs.",
    ],
    technologies: [
      "Python Smolagents",
      "Agentic AI",
      "NextJS",
      "React",
      "Docker",
      "AWS",
    ],
    siteUrl: "https://parts.podtech-ai.com/",
  },
  {
    id: "tabichan",
    title: "Tabichan, an AI-Driven Travel Planner",
    description:
      "Tabichan brings your travel ideas to life. Easily find the best travel experiences by chatting with Tabichan.",
    image: "/tabichan.webp",
    category: "web",
    features: [
      "Simply ask Tabichan where you want to go, what you want to do, or even just how you're feeling.",
      "Tabichan instantly suggests unique tourist spots you've never seen before, tailored to your preferences.",
      "Choose your favorite plan, book, and enjoy the best trip ever!",
    ],
    technologies: [
      "Python Smolagents",
      "Agentic AI",
      "NextJS",
      "React",
      "Docker",
      "AWS",
    ],
    siteUrl: "https://podtech-ai.com",
  },
  {
    id: "tetris",
    title: "3D Tetris Game",
    description:
      "A modern 3D interpretation of the classic Tetris game, featuring enhanced graphics, smooth animations, and immersive gameplay mechanics.",
    image: "/tetris_preview.png",
    category: "game",
    features: [
      "3D block mechanics and physics",
      "Smooth rotation and movement animations",
      "Multiple camera angles",
      "Score tracking and level progression",
      "Modern OpenGL rendering pipeline",
    ],
    technologies: ["C++", "OpenGL", "GLFW", "Game Development", "3D Graphics"],
    githubUrl: "https://github.com/maxenceleguery/tetris",
  },
  {
    id: "fixmatch",
    title: "FixMatch Algorithm Implementation",
    description:
      "Implementation of the FixMatch semi-supervised learning algorithm for training ML models with limited labeled data by leveraging pseudolabeling on unlabeled examples.",
    image: "/fixmatch-pseudolabel.png",
    category: "ai",
    features: [
      "Semi-supervised learning implementation",
      "Pseudolabeling for data augmentation",
      "Consistency regularization techniques",
      "State-of-the-art performance on benchmark datasets",
      "Comprehensive evaluation metrics",
    ],
    technologies: [
      "Python",
      "PyTorch",
      "Machine Learning",
      "Semi-Supervised Learning",
      "Data Augmentation",
    ],
    githubUrl: "https://github.com/maxenceleguery/ENSTA_courses/tree/master/MI201",
    reference: {
      title: "FixMatch: Simplifying Semi-Supervised Learning",
      url: "https://arxiv.org/abs/2001.07685",
    },
  },
  {
    id: "raytracer",
    title: "C++ Raytracer Engine",
    description:
      "A realistic 3D renderer with raytracing built from scratch using C++. Features CUDA acceleration for massive performance improvements and real-time rendering capabilities.",
    image: "/raytracer_card.webp",
    category: "graphics",
    features: [
      "Render triangles and polygons with triangle decomposition",
      "Bounding Volume Hierarchy (BVH) optimization",
      "Advanced material system with light emission, color, glossiness, transparency",
      "Dynamic camera with adaptable parameters (FOV, image size)",
      "SDL2 live screen with keyboard camera control",
      "PNG export functionality",
      "OBJ file format support",
    ],
    technologies: [
      "C++",
      "CUDA",
      "SDL2",
      "OpenGL",
      "Linear Algebra",
      "Computer Graphics",
    ],
    githubUrl: "https://github.com/maxenceleguery/3d-render-engine",
  },
];

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  { id: "all", label: "All Projects", icon: "🚀" },
  { id: "graphics", label: "Graphics", icon: "🎨" },
  { id: "ai", label: "AI & ML", icon: "🤖" },
  { id: "game", label: "Games", icon: "🎮" },
  { id: "web", label: "Web", icon: "🌐" },
];

export const CONTACT_METHODS: ContactMethod[] = [
  {
    name: "LinkedIn",
    icon: "/linkedin_logo.webp",
    url: "https://www.linkedin.com/in/maxence-leguery/",
    display: "maxence-leguery",
    description: "Connect with me professionally",
    color: "from-blue-600 to-blue-700",
  },
  {
    name: "GitHub",
    icon: "/github_logo.png",
    url: "https://github.com/maxenceleguery",
    display: "maxenceleguery",
    description: "Check out my GitHub repositories",
    color: "from-gray-700 to-gray-800",
  },
  {
    name: "Email",
    icon: "/mail_logo.png",
    url: "mailto:maxence.leguery@ensta-paris.fr",
    display: "maxence.leguery@ensta-paris.fr",
    description: "Send me a direct message",
    color: "from-red-500 to-red-600",
  },
];
