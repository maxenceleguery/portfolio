// Centralized portfolio content. Edit here, not in component files.
// The previous version of this file (skill levels, older wording) is kept in
// archive/v1/lib/data.ts.

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

export interface Language {
  name: string;
  level: string;
}

export type MissionScreen =
  | { kind: "phones"; video?: { src: string; poster: string }; stills: { src: string; alt: string }[] }
  | { kind: "stills"; stills: { src: string; alt: string }[] }
  | { kind: "video"; src: string; poster: string; alt: string }
  | { kind: "cutforge"; poster: string };

export interface Mission {
  id: string;
  name: string;
  short?: string; // label on the bridge hologram
  kicker: string;
  status: "live" | "launching";
  statusLabel: string;
  year: string;
  role: string;
  summary: string;
  figures?: { value: string; label: string }[];
  notes: string[];
  stack: string[];
  links: { label: string; href: string }[];
  reference?: { title: string; url: string };
  screen: MissionScreen;
}

export interface ArchivedProject {
  id: string;
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  githubUrl?: string;
  siteUrl?: string;
  reference?: { title: string; url: string };
}

export interface TerminalLine {
  kind: "cmd" | "out" | "code";
  text: string;
}

export interface Terminal {
  title: string;
  tool: string;
  lines: TerminalLine[];
}

export const BIRTH_DATE = "2001-09-23";

export const EMAIL = "maxence.leguery@gmail.com";
export const LINKEDIN = "https://www.linkedin.com/in/maxence-leguery/";
export const GITHUB = "https://github.com/maxenceleguery";

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
    title: "Freelance CTO",
    company: "Podtech",
    companyUrl: "https://podtech.tech/",
    period: "October 2025 - Present",
    location: "Remote (Paris / Tokyo)",
    type: "project",
    description: [
      "Own architecture, infrastructure and delivery for Podtech's products; lead engineer on Buddy AI Note, a memo-first daily workspace where users write their daily memo and AI turns it into tasks, calendar events, and email replies",
      "Designed and shipped bidirectional Google / Outlook calendar sync and Gmail / Outlook email triage with AI-generated drafts",
      "Built a long-term AI memory layer (entity graph + observations + per-user distillation) so the assistant learns user preferences across sessions",
      "Architected the BullMQ + Redis background fleet, leader-elected scheduler, and shipped the Next.js web app + Expo mobile app from a shared Supabase + Postgres + RLS data layer",
      "Run the company's cloud in Terraform across GCP, AWS and Azure, with keyless CI deploys and self-hosted secrets management",
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
      "Terraform",
      "GCP",
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
      "Led a web application project for recommending the best itinerary for tourists in Japan",
      "Deployed in production using Docker and AWS",
      "Contributed to agentic AI projects",
    ],
    technologies: ["Python", "Agentic AI", "React", "NextJS", "Docker", "AWS", "DevOps"],
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
    technologies: ["PyTorch", "Python", "Computer vision", "Docker", "Azure", "OpenCV", "MLOps"],
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
    technologies: ["PyTorch", "Python", "Computer vision", "Bayesian Networks", "Research"],
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
    technologies: ["Python", "Mathematical Modeling", "Numerical Analysis", "Physics"],
  },
];

export const LANGUAGES: Language[] = [
  { name: "French", level: "Native" },
  { name: "English", level: "Fluent" },
  { name: "Spanish", level: "Intermediate" },
  { name: "Japanese", level: "Basic" },
];

// No country segment: apps.apple.com redirects each visitor to their own storefront.
const RELEVE_APP_STORE = "https://apps.apple.com/app/releve-chasse-aux-routes/id6814241105";

export const MISSIONS: Mission[] = [
  {
    id: "releve",
    name: "Relevé",
    kicker: "A road-collecting game for France",
    status: "live",
    statusLabel: "App Store, Play in review",
    year: "2026",
    role: "Solo: product, design, mobile, backend, ops",
    summary:
      "Every street, track and trail you actually travel goes into your notebook. You finish a commune street by street, hunt the rare roads, and watch France fill in. I built it alone, from the map-matching backend to the store listing.",
    figures: [
      { value: "34.6M", label: "road segments in the catalog" },
      { value: "2.76M km", label: "of French roads indexed" },
      { value: "0", label: "GPS traces kept after matching" },
    ],
    notes: [
      "OpenStreetMap cut into ~100 m segments with stable keys (way id + ordinal), imported with GDAL into PostGIS and assigned to their commune.",
      "Traces are map-matched on a self-hosted Valhalla. Low-confidence matches and anything above 200 km/h are dropped, so trains and planes don't count.",
      "The phone buffers background location in SQLite and flushes in batches. The server keeps segment IDs only, never the raw trace.",
      "Load-tested against the live France catalog before launch. Replacing a 15 s poll cut player data use from ~265 MB/h to ~65 MB/h.",
    ],
    stack: ["Expo", "React Native", "MapLibre", "SQLite", "Bun", "PostGIS", "Valhalla", "Supabase Auth", "Docker", "nginx"],
    links: [
      { label: "releve.maxenceleguery.net", href: "https://releve.maxenceleguery.net" },
      ...(RELEVE_APP_STORE ? [{ label: "App Store", href: RELEVE_APP_STORE }] : []),
      { label: "Google Play (in review)", href: "https://play.google.com/store/apps/details?id=net.maxenceleguery.releve" },
    ],
    screen: {
      kind: "phones",
      video: { src: "/media/releve-drive.mp4", poster: "/media/releve-drive-poster.jpg" },
      stills: [
        { src: "/media/releve-02-record-france.webp", alt: "Relevé progress across France" },
        { src: "/media/releve-04-badges.webp", alt: "Relevé badges screen" },
      ],
    },
  },
  {
    id: "adenor",
    name: "Adenor",
    kicker: "A merchant's trading game in the browser",
    status: "live",
    statusLabel: "Live",
    year: "2026",
    role: "Solo: game design, full stack, hosting",
    summary:
      "Buy low, sell far, know first. No pay-to-win. Players move goods between markets across a living world, racing on information and price arbitrage, and climb a shared leaderboard.",
    notes: [
      "Market and price simulation with arbitrage opportunities across a world map.",
      "Accounts, inventory and progression in Supabase Postgres, guarded by row-level security. Trades go through database functions, not client writes.",
      "Server-rendered Next.js (App Router) with guides, a blog and a changelog written for search.",
      "Public leaderboard and PostHog product analytics, proxied through the game's own domain.",
      "Self-hosted: Docker behind nginx on a VPS, TLS from certbot, started by systemd.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "PostHog", "Tailwind", "Docker"],
    links: [{ label: "adenor.app", href: "https://adenor.app" }],
    screen: {
      kind: "stills",
      stills: [
        { src: "/media/adenor-world.webp", alt: "Adenor world map with trade routes" },
        { src: "/media/adenor-market.webp", alt: "Adenor market ledger" },
      ],
    },
  },
  {
    id: "cutforge",
    name: "Cutforge",
    kicker: "A video editor that runs in the browser, sold as an SDK",
    status: "live",
    statusLabel: "Live",
    year: "2026",
    role: "Solo: engine, product, licensing",
    summary:
      "Decode, compositing and export all run on the user's machine through a WebGPU compositor, WebCodecs and a Rust/WASM core. No render servers, nothing uploaded. Teams embed it in their own products; the screen here runs the real package in demo mode.",
    notes: [
      "Multi-track timeline: trims, splits, transitions, keyframed effects, text overlays.",
      "WebGPU compositor on an OffscreenCanvas worker, with a WebGL2 fallback.",
      "WebCodecs decode and encode with mp4/webm muxing: exports faster than realtime, no server.",
      "Rust to WASM engine: timeline scheduler, audio resampler, peak summaries, color path.",
      "OPFS-backed media streaming and an AudioWorklet + SharedArrayBuffer mixer.",
      "Ships as @cutforge/editor, a license-gated embeddable SDK.",
    ],
    stack: ["TypeScript", "React", "Rust", "WebAssembly", "WebGPU", "WebCodecs", "Vite", "Web Audio"],
    links: [{ label: "cutforge.dev", href: "https://cutforge.dev" }],
    screen: { kind: "cutforge", poster: "/media/cutforge-og.webp" },
  },
  {
    id: "buddy",
    name: "Buddy AI Note",
    short: "Buddy",
    kicker: "A memo-first daily workspace, built as Podtech's CTO",
    status: "live",
    statusLabel: "Live",
    year: "2025",
    role: "CTO at Podtech: architecture, infrastructure, delivery",
    summary:
      "You write your daily memo; AI turns it into tasks, calendar events and email replies, with optional Gmail / Outlook and Google / Outlook calendar enrichment. Web and mobile, multilingual, with a long-term memory that learns your preferences over time.",
    notes: [
      "Bidirectional Google / Outlook calendar sync. AI proposes events, you approve in one tap.",
      "Email triage with Gmail / Outlook: AI classifies threads, drafts replies, and surfaces them inside the memo.",
      "AI agent with 13 tools, plus a typed entity-graph memory that distills observations into long-term preferences.",
      "BullMQ + Redis worker fleet with a leader-elected scheduler. Web (Next.js 16), mobile (Expo) and a browser extension share one Supabase + Postgres + RLS backend.",
      "GCP in Terraform: Cloud Run services, a GPU VM for a self-hosted LLM, an embeddings service, Memorystore and HTTPS load balancing. CI deploys through keyless Workload Identity; secrets live in a self-hosted Infisical.",
    ],
    stack: ["Next.js", "Expo", "TypeScript", "Supabase", "PostgreSQL", "OpenAI", "BullMQ", "Redis", "Terraform", "GCP"],
    links: [{ label: "cal.podtech-ai.com", href: "https://cal.podtech-ai.com" }],
    screen: {
      kind: "phones",
      stills: [
        { src: "/media/buddy-buddy_daily_note.webp", alt: "Buddy daily memo" },
        { src: "/media/buddy-briefing_view_1.webp", alt: "Buddy AI briefing" },
        { src: "/media/buddy-chat_view.webp", alt: "Buddy chat with the assistant" },
      ],
    },
  },
  {
    id: "blackhole",
    name: "Black hole simulator",
    short: "Black hole",
    kicker: "A general-relativistic ray tracer in one shader",
    status: "live",
    statusLabel: "Live",
    year: "2026",
    role: "Solo, grown out of my GR research",
    summary:
      "A real-time, physically accurate black hole running entirely in the browser. It integrates null geodesics through curved spacetime on the GPU to render gravitational lensing, a Doppler-beamed accretion disk, the photon ring and the shadow, for the Schwarzschild, Kerr and Taub-NUT metrics. The hero of this page is a capture of it.",
    notes: [
      "Hamiltonian geodesic ray tracing in a single WebGL2 fragment shader: one engine, three spacetimes (Schwarzschild / Kerr / Taub-NUT).",
      "Relativistic accretion disk with blackbody temperature, Doppler beaming and gravitational redshift; photon-ring demagnification for a clean shadow.",
      "HDR render pipeline: bloom, ACES tonemapping and box-filtered supersampling (SSAA).",
      "Quasinormal-mode explorer: Leaver's continued fraction evaluated in a shader, with click-to-snap root finding and ringdown sonification.",
    ],
    stack: ["WebGL2", "GLSL", "JavaScript", "General Relativity", "Numerical Analysis", "Computer Graphics"],
    links: [{ label: "blackhole.maxenceleguery.net", href: "https://blackhole.maxenceleguery.net" }],
    reference: {
      title: "Quasinormal modes in curved spacetimes (ENSTA research report)",
      url: "https://bibnum.ensta.fr/9537/",
    },
    screen: {
      kind: "stills",
      stills: [
        { src: "/media/blackhole-qnm.webp", alt: "Quasinormal-mode explorer: continued-fraction landscape" },
        { src: "/media/blackhole-poster.jpg", alt: "Kerr black hole with accretion disk" },
      ],
    },
  },
  {
    id: "pathtracer",
    name: "CUDA path tracer",
    short: "Path tracer",
    kicker: "A GPU path tracer written from scratch in C++ and CUDA",
    status: "live",
    statusLabel: "Operational",
    year: "2023",
    role: "Solo: renderer, BVH, materials, tooling",
    summary:
      "Started in 2023 as a raytracer during my studies, rebuilt clean-room as a CUDA path tracer: multiple importance sampling over a two-level BVH, physically based materials and a real lens model. No third-party code in the compute core; libpng and SDL2 are the only dependencies. Every image on this screen came out of it, on a laptop RTX 3060.",
    figures: [
      { value: "1.44 G", label: "path samples per second, showcase scene" },
      { value: "3.1×", label: "megakernel over a wavefront split, measured" },
      { value: "211 s", label: "for the helmet at 1024 samples per pixel" },
    ],
    notes: [
      "Binned-SAH two-level BVH (TLAS/BLAS instancing) over a structure-of-arrays scene; megakernel path tracing with multiple importance sampling.",
      "Materials: diffuse, metal, glossy, dielectric and rough dielectric, thin film, anisotropic, clearcoat, Beer-Lambert coloured glass, multi-scatter compensation, spectral dispersion.",
      "Importance-sampled environment lighting, participating media (height fog, noise clouds by delta tracking) and a physical lens: thin-lens depth of field, polygonal bokeh, chromatic aberration.",
      "glTF loader with its own baseline-JPEG decoder: the helmet on screen is fully textured, emissive HUD included.",
      "Built test-first: each feature lands behind a failing test and a byte-identical 'feature off' check. A wavefront rewrite lost to the megakernel on measurement, so it's documented, not shipped.",
    ],
    stack: ["C++20", "CUDA", "BVH", "Monte Carlo", "glTF", "libpng", "SDL2"],
    links: [{ label: "v1 source on GitHub", href: "https://github.com/maxenceleguery/3d-render-engine" }],
    screen: {
      kind: "video",
      src: "/media/pathtracer-helmet-turntable.mp4",
      poster: "/media/pathtracer-helmet-turntable-poster.webp",
      alt: "Path-traced DamagedHelmet glTF model turning 360 degrees, glowing HUD included",
    },
  },
];

export const ARCHIVE: ArchivedProject[] = [
  {
    id: "parts_selection",
    title: "Parts selection application",
    description:
      "Leverage specialized large language models to instantly recommend optimal parts from vast component databases. Our AI agent understands your requirements and finds the perfect match.",
    features: [
      "Simply describe what you need in natural language. Our AI understands context and asks clarifying questions.",
      "Advanced algorithms search through multiple databases simultaneously, finding parts that match your exact specifications.",
      "Get recommendations in seconds, not hours. Our AI processes your requirements and delivers results instantly.",
      "Browse instantly though Monotaro, Castorama or SMC catalogs.",
    ],
    technologies: ["Python Smolagents", "Agentic AI", "NextJS", "React", "Docker", "AWS"],
    siteUrl: "https://parts.podtech-ai.com/",
  },
  {
    id: "tabichan",
    title: "Tabichan, an AI-driven travel planner",
    description:
      "Tabichan brings your travel ideas to life. Easily find the best travel experiences by chatting with Tabichan.",
    features: [
      "Simply ask Tabichan where you want to go, what you want to do, or even just how you're feeling.",
      "Tabichan instantly suggests unique tourist spots you've never seen before, tailored to your preferences.",
      "Choose your favorite plan, book, and enjoy the best trip ever!",
    ],
    technologies: ["Python Smolagents", "Agentic AI", "NextJS", "React", "Docker", "AWS"],
    siteUrl: "https://podtech-ai.com",
  },
  {
    id: "raytracer",
    title: "C++ raytracer engine, first version",
    description:
      "A realistic 3D renderer with raytracing built from scratch using C++. Features CUDA acceleration for massive performance improvements and real-time rendering capabilities.",
    features: [
      "Render triangles and polygons with triangle decomposition",
      "Bounding Volume Hierarchy (BVH) optimization",
      "Advanced material system with light emission, color, glossiness, transparency",
      "Dynamic camera with adaptable parameters (FOV, image size)",
      "SDL2 live screen with keyboard camera control",
      "PNG export functionality",
      "OBJ file format support",
    ],
    technologies: ["C++", "CUDA", "SDL2", "OpenGL", "Linear Algebra", "Computer Graphics"],
    githubUrl: "https://github.com/maxenceleguery/3d-render-engine",
  },
  {
    id: "fixmatch",
    title: "FixMatch algorithm implementation",
    description:
      "Implementation of the FixMatch semi-supervised learning algorithm for training ML models with limited labeled data by leveraging pseudolabeling on unlabeled examples.",
    features: [
      "Semi-supervised learning implementation",
      "Pseudolabeling for data augmentation",
      "Consistency regularization techniques",
      "State-of-the-art performance on benchmark datasets",
      "Comprehensive evaluation metrics",
    ],
    technologies: ["Python", "PyTorch", "Machine Learning", "Semi-Supervised Learning", "Data Augmentation"],
    githubUrl: "https://github.com/maxenceleguery/ENSTA_courses/tree/master/MI201",
    reference: { title: "FixMatch: Simplifying Semi-Supervised Learning", url: "https://arxiv.org/abs/2001.07685" },
  },
  {
    id: "tetris",
    title: "3D Tetris game",
    description:
      "A modern 3D interpretation of the classic Tetris game, featuring enhanced graphics, smooth animations, and immersive gameplay mechanics.",
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
];

export const FLIGHT_RULES: { title: string; body: string }[] = [
  {
    title: "Infrastructure is code",
    body: "Every resource lives in Terraform with remote, locked state. Nothing gets clicked into existence in a console.",
  },
  {
    title: "No long-lived keys",
    body: "CI reaches the cloud with short-lived OIDC tokens through Workload Identity Federation. No service-account JSON in repos or CI secrets.",
  },
  {
    title: "Least privilege",
    body: "One service account per workload, scoped to exactly what it touches.",
  },
  {
    title: "Secrets in a vault",
    body: "App secrets live in a self-hosted Infisical and are injected at runtime, not passed around as .env files.",
  },
  {
    title: "Private by default",
    body: "Only the load balancer faces the internet. Instances egress through Cloud NAT; containers bind to 127.0.0.1 behind nginx.",
  },
  {
    title: "Managed TLS, real health checks",
    body: "Certificates renew themselves, and an unhealthy instance leaves the pool before users notice it.",
  },
  {
    title: "Scans in the pipeline",
    body: "Dependency audits, mobile security scans and SonarQube run in CI against a baseline, so new issues stand out.",
  },
  {
    title: "Right-size it",
    body: "When the load allows, one well-run VPS beats a cloud bill. Adenor, Relevé and this site share one box: Docker, nginx, certbot, systemd.",
  },
];

export const CLOUDS: { name: string; use: string }[] = [
  { name: "GCP", use: "Cloud Run, Compute Engine with GPUs, Memorystore, Artifact Registry, Cloud DNS, Cloud Storage, HTTPS load balancing" },
  { name: "AWS", use: "Production deploys for Podtech's travel planner, Route 53" },
  { name: "Azure", use: "Model serving at Visionairy, speech-to-text for Buddy" },
  { name: "OVH", use: "A bare VPS running my own products" },
];

export const STACK: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "TypeScript", "C/C++", "Rust", "Java", "GLSL", "SQL"] },
  { group: "Machine learning", items: ["PyTorch", "scikit-learn", "OpenCV", "MLflow", "CUDA", "LLM agents", "Embeddings"] },
  { group: "Product", items: ["Next.js", "React", "React Native + Expo", "Supabase", "PostgreSQL", "PostGIS", "Redis + BullMQ", "WebGPU", "WebCodecs", "WebAssembly"] },
  { group: "Infrastructure", items: ["Terraform", "Docker", "GitHub Actions", "GCP", "AWS", "Azure", "nginx", "Linux", "NixOS"] },
  { group: "Tooling", items: ["uv", "bun", "cargo", "wasm-pack", "Vite", "Vitest", "SonarQube", "git"] },
];

export const TERMINALS: Terminal[] = [
  {
    title: "fixmatch/train.py",
    tool: "PyTorch",
    lines: [
      { kind: "code", text: "# keep only the confident pseudo-labels" },
      { kind: "code", text: "@torch.no_grad()" },
      { kind: "code", text: "def pseudo_labels(model, weak, tau=0.95):" },
      { kind: "code", text: "    probs = model(weak).softmax(dim=-1)" },
      { kind: "code", text: "    conf, y = probs.max(dim=-1)" },
      { kind: "code", text: "    return y, conf.ge(tau)" },
    ],
  },
  {
    title: "~/research",
    tool: "uv",
    lines: [
      { kind: "cmd", text: "uv sync --frozen" },
      { kind: "out", text: "Resolved 41 packages in 18ms" },
      { kind: "out", text: "Installed 41 packages in 212ms" },
      { kind: "cmd", text: "uv run pytest -q" },
      { kind: "out", text: "................................ [100%]" },
      { kind: "out", text: "32 passed in 2.41s" },
    ],
  },
  {
    title: "parser/scan.rs",
    tool: "Rust",
    lines: [
      { kind: "code", text: "/// hot loop of a generated JSON parser" },
      { kind: "code", text: "#[inline(always)]" },
      { kind: "code", text: "fn ws(b: &[u8], mut i: usize) -> usize {" },
      { kind: "code", text: "    while i < b.len()" },
      { kind: "code", text: "        && b[i].is_ascii_whitespace() {" },
      { kind: "code", text: "        i += 1;" },
      { kind: "code", text: "    }" },
      { kind: "code", text: "    i" },
      { kind: "code", text: "}" },
    ],
  },
  {
    title: "raytracer/trace.cu",
    tool: "CUDA C++",
    lines: [
      { kind: "code", text: "__global__" },
      { kind: "code", text: "void trace(const Ray* rays, Hit* hits," },
      { kind: "code", text: "           BVH bvh, int n) {" },
      { kind: "code", text: "    int i = blockIdx.x * blockDim.x" },
      { kind: "code", text: "          + threadIdx.x;" },
      { kind: "code", text: "    if (i >= n) return;" },
      { kind: "code", text: "    hits[i] = bvh.closest_hit(rays[i]);" },
      { kind: "code", text: "}" },
    ],
  },
  {
    title: "~/adenor",
    tool: "bun",
    lines: [
      { kind: "cmd", text: "bun install --frozen-lockfile" },
      { kind: "out", text: "Checked 468 installs (no changes)" },
      { kind: "cmd", text: "bun run build" },
      { kind: "out", text: "▲ Next.js 16.2" },
      { kind: "out", text: "✓ Compiled successfully" },
      { kind: "out", text: "✓ Generating static pages (24/24)" },
    ],
  },
  {
    title: "infra/terraform",
    tool: "Terraform",
    lines: [
      { kind: "cmd", text: "terraform plan -out=tfplan" },
      { kind: "out", text: "  + google_compute_instance.llm" },
      { kind: "out", text: "  ~ google_cloud_run_v2_service.web" },
      { kind: "out", text: "Plan: 1 to add, 1 to change, 0 to destroy." },
      { kind: "cmd", text: "terraform apply tfplan" },
      { kind: "out", text: "Apply complete! Resources: 1 added, 1 changed, 0 destroyed." },
    ],
  },
];
