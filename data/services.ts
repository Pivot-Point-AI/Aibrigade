import { Service } from "@/types";

export const services: Service[] = [
  {
    id: "svc-001",
    title: "AI in Fintech",
    slug: "ai-fintech",
    category: "Financial Intelligence",
    icon: "TrendingUp",
    color: "cyan",
    shortDescription:
      "From real-time fraud detection to autonomous underwriting — we build AI systems that handle the complexity of modern financial services.",
    longDescription:
      "Financial institutions are sitting on oceans of data with immense predictive potential. We translate that potential into production-grade AI systems that operate with the speed, accuracy, and regulatory rigor the industry demands. Our Fintech AI practice covers the full spectrum — from intelligent risk models to conversational banking agents.",
    features: [
      "Credit Risk & Underwriting AI",
      "Real-Time Fraud Detection Systems",
      "Regulatory Compliance Automation (AML, KYC)",
      "Portfolio Optimization Engines",
      "Algorithmic Trading & Signal Generation",
      "Personalized Wealth Advisory AI",
      "Document Intelligence & OCR",
      "Anomaly Detection & Monitoring",
    ],
    useCases: [
      "Lending platforms reducing default rates with neural risk models",
      "Payment processors eliminating fraud with graph neural networks",
      "Wealth managers scaling personalized advice with LLMs",
      "Banks automating BSA/AML suspicious activity detection",
    ],
    techHighlights: ["TensorFlow / PyTorch", "Apache Kafka", "AWS SageMaker", "Graph Neural Networks", "LLMs & RAG"],
    industrySpotlight: {
      industry: "Finance",
      focus: "Autonomous Audits & Fraud Detection",
      metric: "88% of firms report revenue gain",
    },
  },
  {
    id: "svc-002",
    title: "AI in Healthcare",
    slug: "ai-healthcare",
    category: "Clinical & Life Sciences AI",
    icon: "Activity",
    color: "violet",
    shortDescription:
      "HIPAA-compliant AI solutions that improve patient outcomes, reduce clinical burden, and unlock value from healthcare data.",
    longDescription:
      "Healthcare generates the most complex, highest-stakes data of any industry. Our HealthTech AI practice builds systems that clinicians and operators trust — interpretable, auditable, and designed around clinical workflows. We bring deep experience with EHR integrations, regulatory considerations, and the sensitivity that healthcare AI demands.",
    features: [
      "Predictive Patient Risk Stratification",
      "Ambient Clinical Documentation (Speech AI + LLM)",
      "Diagnostic Support Systems",
      "Drug Discovery & Molecular AI",
      "Population Health Analytics",
      "Remote Patient Monitoring AI",
      "Revenue Cycle Intelligence",
      "SDOH-Informed Care Models",
    ],
    useCases: [
      "Hospital networks reducing readmissions with predictive discharge planning",
      "Medical groups eliminating documentation burden with ambient AI",
      "Biotech companies accelerating drug discovery with molecular AI",
      "Payers building intelligent prior authorization systems",
    ],
    techHighlights: ["HL7 FHIR", "Epic / Cerner APIs", "Azure Health Data", "NLP & Medical LLMs", "HIPAA Compliance"],
    industrySpotlight: {
      industry: "Healthcare",
      focus: "Diagnostics & Drug Discovery",
      metric: "$150B in annual savings (US)",
    },
  },
  {
    id: "svc-003",
    title: "Custom AI Development",
    slug: "custom-ai-development",
    category: "Bespoke AI Engineering",
    icon: "Cpu",
    color: "cyan",
    shortDescription:
      "End-to-end AI product development — from discovery and data strategy through model engineering, MLOps, and production deployment.",
    longDescription:
      "Off-the-shelf AI rarely fits the complexity of real business problems. We partner with you from first principles: understanding your data landscape, defining the right problem, selecting the optimal architecture, and building production systems that scale. Our engineering team operates at the frontier of applied ML — bringing research-grade methods to business impact.",
    features: [
      "AI Strategy & Feasibility Assessment",
      "Data Pipeline Architecture & Engineering",
      "Custom Model Training & Fine-Tuning",
      "LLM Application Development & RAG",
      "MLOps & Model Lifecycle Management",
      "Explainable AI & Interpretability",
      "Performance Monitoring & Drift Detection",
      "Model Security & Adversarial Robustness",
    ],
    useCases: [
      "Startups building AI-native products from the ground up",
      "Enterprises replacing rule-based systems with learned models",
      "Research teams needing production engineering for experimental models",
      "Companies fine-tuning foundation models on proprietary data",
    ],
    techHighlights: ["PyTorch / JAX", "Hugging Face", "MLflow / W&B", "Kubernetes / KubeFlow", "Vector Databases"],
    industrySpotlight: {
      industry: "Retail",
      focus: "Agentic Shopping & Personalization",
      metric: "58% active deployment rate",
    },
  },

  {
    id: "svc-004",
    title: "Automation & Integrations",
    slug: "automation-integrations",
    category: "Intelligent Process Automation",
    icon: "Workflow",
    color: "gold",
    shortDescription:
      "AI-powered automation that eliminates manual workflows, integrates disparate systems, and surfaces intelligence across your operational stack.",
    longDescription:
      "The gap between AI models and operational impact is often integration and automation. We bridge that gap — connecting AI intelligence to the systems your team already uses, building pipelines that run autonomously, and ensuring that insights reach the right people at the right time. From intelligent document processing to multi-system orchestration.",
    features: [
      "Intelligent Document Processing (IDP)",
      "AI Agent & Multi-Agent Orchestration",
      "API Integration & Middleware Engineering",
      "Robotic Process Automation + AI",
      "Workflow Orchestration (Temporal / Airflow)",
      "Event-Driven Architecture Design",
      "Data Mesh & Pipeline Engineering",
      "Human-in-the-Loop Workflow Design",
    ],
    useCases: [
      "Financial institutions automating loan origination workflows",
      "Healthcare systems integrating AI insights into clinical workflows",
      "Operations teams replacing manual data entry with intelligent extraction",
      "Companies building AI agents that act across multiple systems",
    ],
    techHighlights: ["Apache Airflow", "Temporal.io", "LangChain / Autogen", "Zapier / Make (Advanced)", "n8n / Prefect"],
    industrySpotlight: {
      industry: "Manufacturing",
      focus: "Smart Maintenance Prediction",
      metric: "Significant reduction in downtime",
    },
  },
  {
    id: "svc-005",
    title: "AI in Retail",
    slug: "retail",
    category: "Retail & Commerce Intelligence",
    icon: "ShoppingBag",
    color: "violet",
    shortDescription:
      "From hyper-personalized shopping experiences to intelligent supply chain optimization — we build AI systems that drive conversion, loyalty, and operational efficiency across the retail value chain.",
    longDescription:
      "Modern retail is a data-rich, margin-thin battlefield where AI separates market leaders from laggards. We design and deploy production-grade AI systems tailored to the unique dynamics of retail — from demand volatility to omnichannel complexity. Our Retail AI practice spans the full customer and operational lifecycle: attracting buyers, personalizing journeys, optimizing inventory, and streamlining fulfillment — all grounded in real commercial outcomes.",
    features: [
      "Personalization & Recommendation Engines",
      "Demand Forecasting & Inventory Optimization",
      "Dynamic Pricing & Markdown Optimization",
      "AI-Powered Visual Search & Discovery",
      "Customer Lifetime Value (CLV) Modeling",
      "Churn Prediction & Retention AI",
      "Agentic Shopping Assistants & Chatbots",
      "Supply Chain & Logistics Intelligence",
    ],
    useCases: [
      "E-commerce platforms increasing AOV with real-time recommendation engines",
      "Brick-and-mortar retailers reducing overstock with AI-driven demand forecasting",
      "Fashion brands enabling visual search and style-matching at scale",
      "Loyalty programs using CLV models to prioritize high-value customer retention",
    ],
    techHighlights: [
      "Collaborative Filtering & Deep Learning",
      "Time-Series Forecasting (Prophet / N-BEATS)",
      "LLMs & Conversational AI",
      "Computer Vision & Embedding Models",
      "Real-Time Personalization APIs",
    ],
    industrySpotlight: {
      industry: "Retail & E-Commerce",
      focus: "Personalization, Forecasting & Agentic Commerce",
      metric: "Up to 30% increase in conversion rates",
    },
  },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
