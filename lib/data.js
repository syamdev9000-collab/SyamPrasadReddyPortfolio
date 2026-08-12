export const personalInfo = {
  name: "Syam Prasad Reddy Penumallu",
  shortName: "Syam Reddy",
  tagline: "Senior AI Engineer",
  headline: "Building Enterprise AI Systems That Think, Reason, and Scale",
  subheadline: "Senior AI Engineer specializing in LLMs, multi-agent orchestration, Knowledge Graphs, RAG, and backend systems. I build production-grade AI platforms that automate enterprise workflows, power intelligent assistants, and deliver scalable, reliable solutions.",
  email: "syamreddypenumallu@gmail.com",
  github: "https://github.com/syamdev9000-collab",
  linkedin: "https://www.linkedin.com/in/syam-prasad-reddy-penumallu-a53136255/",
  location: "India",
  available: true,
  roles: [
    "Senior AI Engineer",
    "AI Solutions Architect",
    "LLM & Multi-Agent Systems Engineer",
    "Backend Systems Engineer",
    "Software Development Engineer"
  ],
};

export const stats = [
  { label: "Years of Experience", value: 3, suffix: "+" },
  { label: "AI Projects Shipped", value: 20, suffix: "+" },
  { label: "LLM Applications Built", value: 12, suffix: "+" },
  { label: "Uptime SLA Maintained", value: 99.9, suffix: "%" },
];

export const skills = {
  "AI / ML": [
    { name: "Python", level: 95 },
    { name: "LangChain", level: 92 },
    { name: "OpenAI API", level: 95 },
    { name: "LlamaIndex", level: 88 },
    { name: "Hugging Face", level: 85 },
    { name: "PyTorch", level: 78 },
    { name: "RAG Systems", level: 92 },
    { name: "Vector DBs", level: 88 },
    { name: "Prompt Engineering", level: 95 },
    { name: "Fine-tuning LLMs", level: 80 },
    { name: "CrewAI / AutoGen", level: 85 },
    { name: "Embeddings", level: 90 },
  ],
  Backend: [
    { name: "FastAPI", level: 92 },
    { name: "Node.js", level: 85 },
    { name: "PostgreSQL", level: 88 },
    { name: "Redis", level: 85 },
    { name: "MongoDB", level: 82 },
    { name: "GraphQL", level: 78 },
    { name: "REST APIs", level: 95 },
    { name: "Celery / Workers", level: 82 },
    { name: "Websockets", level: 80 },
    { name: "Microservices", level: 85 },
    { name: "gRPC", level: 72 },
    { name: "Message Queues", level: 82 },
  ],
  Frontend: [
    { name: "React.js", level: 88 },
    { name: "Next.js", level: 85 },
    { name: "TypeScript", level: 82 },
    { name: "Tailwind CSS", level: 90 },
    { name: "Framer Motion", level: 82 },
    { name: "Three.js", level: 70 },
    { name: "Zustand", level: 78 },
    { name: "Shadcn UI", level: 85 },
  ],
  "DevOps / Tools": [
    { name: "Docker", level: 88 },
    { name: "AWS", level: 82 },
    { name: "GCP", level: 78 },
    { name: "Kubernetes", level: 72 },
    { name: "CI/CD", level: 85 },
    { name: "GitHub Actions", level: 88 },
    { name: "Terraform", level: 70 },
    { name: "Pinecone", level: 88 },
    { name: "Weaviate", level: 82 },
    { name: "LangSmith", level: 85 },
  ],
};

export const projects = [
  {
    id: 1,
    title: "Autonomous AI Agent Platform",
    subtitle: "Multi-agent orchestration at production scale",
    description:
      "Built a multi-agent orchestration platform where specialized AI agents collaborate to complete complex, multi-step tasks. Agents can search the web, write code, analyze data, and communicate with each other — all with human-in-the-loop oversight.",
    problem: "Enterprises needed AI automation beyond single-prompt responses",
    solution: "Multi-agent architecture with task decomposition and orchestration",
    impact: "Reduced manual workflow time by 70% for 500+ enterprise users",
    tech: ["Python", "LangChain", "CrewAI", "FastAPI", "Redis", "PostgreSQL", "Docker"],
    color: "from-indigo-500/20 to-violet-500/20",
    accent: "#6366f1",
    github: "https://github.com/syamreddy",
    demo: "#",
    featured: true,
    metrics: ["70% time saved", "500+ users", "99.9% uptime"],
  },
  {
    id: 2,
    title: "Intelligent RAG Document Engine",
    subtitle: "Semantic search over 10M+ enterprise documents",
    description:
      "Engineered a production-grade Retrieval-Augmented Generation system that enables natural language querying over massive document corpora. Features hybrid search, re-ranking, and citation-aware responses with hallucination detection.",
    problem: "Finding insights in millions of documents was impossible at scale",
    solution: "Hybrid vector + keyword search with LLM-powered synthesis",
    impact: "Query latency under 800ms on 10M+ document corpus",
    tech: ["Python", "LlamaIndex", "Pinecone", "OpenAI", "FastAPI", "React"],
    color: "from-violet-500/20 to-cyan-500/20",
    accent: "#8b5cf6",
    github: "https://github.com/syamreddy",
    demo: "#",
    featured: true,
    metrics: ["10M+ docs", "<800ms p99", "94% accuracy"],
  },
  {
    id: 3,
    title: "AI-Powered API Gateway",
    subtitle: "Smart routing, caching & rate limiting with ML",
    description:
      "Designed and shipped a next-generation API gateway that uses ML models for intelligent request routing, semantic response caching, and anomaly detection. Learns traffic patterns to auto-scale and prevent abuse.",
    problem: "Traditional API gateways wasted compute on duplicate LLM calls",
    solution: "Semantic caching layer + ML-based routing reduced costs by 60%",
    impact: "Saved $40K/month in LLM API costs for a mid-size SaaS",
    tech: ["Go", "Python", "Redis", "Kubernetes", "Prometheus", "Grafana"],
    color: "from-cyan-500/20 to-indigo-500/20",
    accent: "#06b6d4",
    github: "https://github.com/syamreddy",
    demo: "#",
    featured: true,
    metrics: ["60% cost reduction", "$40K/mo saved", "2M req/day"],
  },
  {
    id: 4,
    title: "Real-Time AI Analytics Dashboard",
    subtitle: "Streaming ML insights at millisecond latency",
    description:
      "Full-stack analytics platform with real-time ML inference on streaming data. Features anomaly detection, predictive forecasting, and natural language report generation — all updating live as data flows in.",
    problem: "Business teams needed instant ML insights without engineering bottlenecks",
    solution: "Streaming ML pipeline with WebSocket frontend and NL report generation",
    impact: "Teams reduced time-to-insight from hours to seconds",
    tech: ["Python", "Kafka", "FastAPI", "WebSockets", "Next.js", "D3.js", "OpenAI"],
    color: "from-indigo-500/20 to-pink-500/20",
    accent: "#a855f7",
    github: "https://github.com/syamreddy",
    demo: "#",
    featured: false,
    metrics: ["<100ms latency", "1M events/day", "10 sec reports"],
  },
  {
    id: 5,
    title: "LLM Fine-Tuning Infrastructure",
    subtitle: "Custom model training pipeline for domain tasks",
    description:
      "Built end-to-end fine-tuning infrastructure for training domain-specific LLMs. Includes dataset curation, PEFT/LoRA training, evaluation harness, and one-click deployment to inference endpoints.",
    problem: "Generic LLMs underperform on specialized enterprise domains",
    solution: "Automated LoRA fine-tuning pipeline with quality evaluation gates",
    impact: "Domain accuracy improved from 62% → 89% vs GPT-4",
    tech: ["Python", "PyTorch", "PEFT", "Hugging Face", "AWS SageMaker", "MLflow"],
    color: "from-pink-500/20 to-violet-500/20",
    accent: "#ec4899",
    github: "https://github.com/syamreddy",
    demo: "#",
    featured: false,
    metrics: ["89% domain accuracy", "+27pts vs GPT-4", "2hr train time"],
  },
];

export const experience = [
  {
    id: 1,
    role: "Senior AI Engineer",
    company: "Beacon.li",
    type: "Full-time",
    duration: "2026 Apr — Present",
    location: "Remote",
    logo: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M2 4l3 12h14l3-12-6 7-4-5-4 5-6-7z" />
      <circle cx="12" cy="19" r="1" fill="#6366f1" />
    </svg>
    ,
    accent: "#6366f1",
    description:
      "Leading AI product development — architecting LLM-powered features, multi-agent systems, and intelligent backend infrastructure that powers thousands of daily active users.",
    achievements: [
      "Architected and developed an enterprise AI agent platform supporting multi-step autonomous workflows and tool orchestration.",
      "Designed multi-level AI orchestrators to coordinate specialized agents, enabling complex end-to-end enterprise automation.",
      "Built Knowledge Graph-powered reasoning systems to improve contextual understanding, entity relationships, and AI response accuracy.",
      "Developed scalable RAG pipelines integrating vector databases, enterprise search, and structured knowledge sources.",
      "Designed AI copilots and intelligent automation solutions for enterprise platforms including HR, operations, and business workflows.",
      "Collaborated directly with enterprise clients to gather requirements, design AI solutions, conduct technical demos, and drive successful production deployments.",
      "Led architecture discussions, mentored engineers, established AI engineering standards, and guided best practices for scalable AI development."
    ],
    tech: ["Python", "LangChain", "FastAPI", "PostgreSQL", "Redis", "AWS", "Docker"],
  },
  {
    id: 2,
    role: "Software Development Engineer I",
    company: "Beacon.li",
    type: "Full-time",
    duration: "2024 Aug — 2026 Apr",
    location: "Hyderabad",
    logo: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
    ,
    accent: "#8b5cf6",
    description:
      "Joined as an early-career engineer and quickly took ownership of backend services and API development. Shipped critical features that scaled from zero to production.",
    achievements: [
      "Designed and developed AI agents for Darwinbox, greytHR, and Keka, enabling users to resolve HR queries through conversational AI and significantly reducing support tickets.",
      "Built enterprise search and analytics capabilities using DataSearches, allowing users to retrieve HR, payroll, leave, and organizational insights in seconds.",
      "Developed backend APIs, agent orchestration workflows, and automation services using Node.js and JavaScript for enterprise-scale applications.",
      "Implemented AI-powered Leave Policy Creation and Analysis agents capable of extracting, validating, and configuring HR policies from documents.",
      "Integrated LLM-based features with enterprise systems, improving user productivity through intelligent search, recommendations, and workflow automation.",
      "Collaborated with cross-functional teams to deliver production-ready AI solutions and integrations for multiple enterprise HR platforms."
    ],
    tech: ["Node.js", "PostgreSQL", "Redis", "Docker", "AWS", "React"],
  },
  {
    id: 3,
    role: "B.Tech in ECE",
    company: "University",
    type: "Education",
    duration: "2019 — 2023",
    location: "On-campus",
    logo: "U",
    accent: "#06b6d4",
    description:
      "Electronics and Communication Engineering — the foundation that shaped my analytical thinking and systems-level perspective. Where hardware intuition met software ambition.",
    achievements: [
      "Graduated with distinction; final-year project on ML-based signal classification achieved 94% accuracy",
      "Built IoT + ML project that won Best Innovation Award at the university tech fest",
      "Led the coding club, organizing hackathons that attracted 500+ participants",
      "Self-taught Python, ML fundamentals, and web development during academic years",
    ],
    tech: ["Python", "MATLAB", "C++", "TensorFlow", "IoT", "Signal Processing"],
  },
];

export const aiWork = [
  {
    id: 1,
    title: "Multi-Agent Systems",
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#A855F7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 7l1.5 3.5L17 12l-3.5 1.5L12 17l-1.5-3.5L7 12l3.5-1.5L12 7z" fill="#A855F7" fill-opacity="0.15" />


      <circle cx="5" cy="5" r="2" fill="#A855F7" />
      <circle cx="19" cy="5" r="2" fill="#A855F7" />
      <circle cx="5" cy="19" r="2" fill="#A855F7" />
      <circle cx="19" cy="19" r="2" fill="#A855F7" />
      <path d="M6.5 6.5L10.5 10.5" />
      <path d="M17.5 6.5L13.5 10.5" />
      <path d="M6.5 17.5L10.5 13.5" />
      <path d="M17.5 17.5L13.5 13.5" />
    </svg>,
    description:
      "Designing autonomous agent networks where specialized AI models collaborate, delegate subtasks, and self-correct — enabling end-to-end automation of complex workflows.",
    capabilities: [
      "Task decomposition & orchestration",
      "Agent-to-agent communication",
      "Tool use & function calling",
      "Human-in-the-loop checkpoints",
    ],
    accent: "#6366f1",
    gradient: "from-indigo-600 to-violet-600",
  },
  {
    id: 2,
    title: "RAG & Knowledge Systems",
    icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.5 2 2 3.8 2 6V18C2 20.2 6.5 22 12 22C17.5 22 22 20.2 22 18V6C22 3.8 17.5 2 12 2Z" stroke="#F472B6" stroke-width="1.5" stroke-dasharray="2 2" />
      <ellipse cx="12" cy="6" rx="10" ry="4" fill="#EC4899" fill-opacity="0.3" stroke="#F472B6" stroke-width="2" />
      <path d="M2 12C2 14.2 6.5 16 12 16C17.5 16 22 14.2 22 12" stroke="#F472B6" stroke-width="2" />
      <path d="M2 18C2 20.2 6.5 22 12 22C17.5 22 22 20.2 22 18" stroke="#F472B6" stroke-width="2" />
      <circle cx="17" cy="17" r="3" fill="#A855F7" />
      <path d="M19 19L22 22" stroke="#E9D5FF" stroke-width="2" stroke-linecap="round" />
    </svg>
    ,
    description:
      "Building production-grade RAG pipelines that make LLMs grounded, accurate, and explainable — from chunking strategies to hybrid retrieval and re-ranking.",
    capabilities: [
      "Hybrid vector + keyword search",
      "Multi-hop reasoning chains",
      "Hallucination detection & mitigation",
      "Citation-aware response synthesis",
    ],
    accent: "#8b5cf6",
    gradient: "from-violet-600 to-purple-600",
  },
  {
    id: 3,
    title: "LLM Fine-Tuning",
    icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#FBBF24" fill-opacity="0.2" stroke="#FBBF24" stroke-width="2" stroke-linejoin="round" />
      <circle cx="7" cy="19" r="1.5" fill="#FDE68A" />
      <circle cx="17" cy="5" r="1.5" fill="#FDE68A" />
    </svg>
    ,
    description:
      "Training domain-specific models using PEFT/LoRA techniques that outperform GPT-4 on narrow tasks — at a fraction of the inference cost.",
    capabilities: [
      "LoRA / QLoRA fine-tuning",
      "Dataset curation & synthesis",
      "RLHF-style preference optimization",
      "Evaluation harness design",
    ],
    accent: "#06b6d4",
    gradient: "from-cyan-600 to-teal-600",
  },
  {
    id: 4,
    title: "AI Infrastructure & MLOps",
    icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="20" height="7" rx="2" fill="#10B981" fill-opacity="0.2" stroke="#34D399" stroke-width="2" />
      <rect x="2" y="14" width="20" height="7" rx="2" fill="#10B981" fill-opacity="0.2" stroke="#34D399" stroke-width="2" />
      <circle cx="6" cy="6.5" r="1" fill="#6EE7B7" />
      <circle cx="6" cy="17.5" r="1" fill="#6EE7B7" />
      <path d="M10 6.5H18M10 17.5H18" stroke="#34D399" stroke-width="2" stroke-linecap="round" />
    </svg>
    ,
    description:
      "Building the pipes that make AI reliable in production — observability, semantic caching, versioning, rollback, and cost optimization at scale.",
    capabilities: [
      "LLMOps & prompt versioning",
      "Semantic response caching",
      "Token cost optimization",
      "A/B testing for AI features",
    ],
    accent: "#10b981",
    gradient: "from-emerald-600 to-teal-600",
  },
];

export const achievements = [
  {
    id: 1,
    title: "Claude Foundation Certified Architect",
    org: "Anthropic",
    year: "2026",
    description: "Earned the Claude Foundation Certified Architect certification, demonstrating expertise in designing and building AI-powered applications using Claude.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9C6 11.2091 7.79086 13 10 13H14C16.2091 13 18 11.2091 18 9V3H6V9Z" fill="#FBBF24" fill-opacity="0.2" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M6 5H4C2.89543 5 2 5.89543 2 7V8C2 9.10457 2.89543 10 4 10H6" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M18 5H20C21.1046 5 22 5.89543 22 7V8C22 9.10457 21.1046 10 20 10H18" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M12 13V17" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" />
      <path d="M8 21H16" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" />
    </svg>
    ,
  },
  {
    id: 2,
    title: "60% Cost Reduction",
    org: "Production Achievement",
    year: "2024",
    description: "Cut LLM API costs by 60% through semantic caching",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12V18C21 19.6569 16.9706 21 12 21C7.02944 21 3 19.6569 3 18V6C3 4.34315 7.02944 3 12 3C13.2505 3 14.4449 3.08493 15.5 3.23812" stroke="#10B981" stroke-width="2" stroke-linecap="round" />
      <path d="M3 12C3 13.6569 7.02944 15 12 15C13.626 15 15.1386 14.8562 16.4259 14.6062" stroke="#10B981" stroke-width="2" stroke-linecap="round" />
      <path d="M16 7L21 12M21 12H17M21 12V8" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    ,
  },
  {
    id: 3,
    title: "Top 5% GitHub",
    org: "Open Source",
    year: "2024",
    description: "Contributed to 3 major AI open-source repositories",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#FBBF24" fill-opacity="0.2" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  },
  {
    id: 4,
    title: "0→Production in 6 Weeks",
    org: "Startup Milestone",
    year: "2024",
    description: "Shipped the core AI platform from scratch to production",
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="24" height="24">
      <defs>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#60A5FA" />
          <stop offset="100%" stop-color="#1D4ED8" />
        </linearGradient>
        <linearGradient id="finGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#2563EB" />
          <stop offset="100%" stop-color="#1E3A8A" />
        </linearGradient>

        <linearGradient id="flameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FBBF24" />
          <stop offset="100%" stop-color="#F97316" />
        </linearGradient>
      </defs>


      <path fill="url(#finGrad)" d="M16 38c-2 6-10 16-10 16s8-2 14-4c4 2 8 4 8 4s-1-10-1-16z" />

      <path fill="url(#finGrad)" d="M48 38c2 6 10 16 10 16s-8-2-14-4c-4 2-8 4-8 4s1-10 1-16z" />

      <path fill="url(#flameGrad)" d="M26 48s2 12 6 12 6-12 6-12z" />

      <path fill="url(#bodyGrad)" d="M32 4c-12 0-20 16-20 36 0 8 8 12 20 12s20-4 20-12c0-20-8-36-20-36z" />

      <path fill="#93C5FD" d="M32 4c-4 0-8 8-8 16h16c0-8-4-16-8-16z" />
      <circle cx="32" cy="28" r="6" fill="#1E293B" />
      <circle cx="32" cy="28" r="4.5" fill="#38BDF8" />
      <circle cx="30.5" cy="26.5" r="1.5" fill="#FFFFFF" />
    </svg>


    //"🚀",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "AI Work", href: "#ai-work" },
  { label: "Contact", href: "#contact" },
];
