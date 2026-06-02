import type { Metadata } from "next";
import { Reveal, StaggerContainer, StaggerItem, GlowOrbs } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight, Brain, DollarSign, Laptop, HeartHandshake, Globe2, Shield, Sparkles,
  GraduationCap, Users, TrendingUp, Briefcase,
} from "lucide-react";
import CareersClient, { type Job } from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers | AI Brigade",
  description:
    "Join AI Brigade — the elite AI execution force building production-grade AI for healthcare and fintech. Explore 42 open roles across engineering, research, product, sales, and operations.",
};

// ─────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────

const jobs: Job[] = [
  // ── Engineering ──────────────────────────────────────────────
  {
    id: "swe-ml-infra",
    title: "Senior ML Infrastructure Engineer",
    category: "engineering",
    location: "Remote (US)",
    type: "Full-time",
    level: "Senior",
    salary: "$175K – $220K",
    description: "Design and scale the MLOps pipelines that push 50+ production models to enterprise clients. You own model serving, feature stores, and drift-monitoring infrastructure.",
    responsibilities: [
      "Architect and maintain model serving infrastructure handling millions of daily predictions",
      "Build and operate feature stores, training pipelines, and experiment tracking systems",
      "Lead drift monitoring, retraining triggers, and model performance alerting",
      "Partner with ML scientists to accelerate path from research to production",
      "Define MLOps standards and best practices across client engagements",
    ],
    requirements: [
      "5+ years backend/infrastructure engineering; 2+ years in ML systems",
      "Expert with Kubernetes, Docker, and major cloud platforms (AWS/GCP/Azure)",
      "Production experience with MLflow, Ray Serve, or similar serving frameworks",
      "Strong Python; familiarity with Go or Rust is a plus",
      "Experience supporting regulated-industry workloads (HIPAA, SOC 2) preferred",
    ],
    tags: ["Python", "Kubernetes", "MLflow", "Terraform", "AWS", "Ray"],
  },
  {
    id: "swe-backend",
    title: "Backend Engineer — AI Platform",
    category: "engineering",
    location: "Remote (US)",
    type: "Full-time",
    level: "Mid-Senior",
    salary: "$155K – $195K",
    description: "Build the core APIs and data pipelines that power our AI platform. Work closely with ML engineers to productionize research-grade models at scale.",
    responsibilities: [
      "Design and build RESTful and GraphQL APIs consumed by enterprise client dashboards",
      "Develop high-throughput data ingestion pipelines from EHR and financial systems",
      "Collaborate with ML engineers on model integration and result serialization",
      "Maintain platform reliability targets (99.99% uptime SLA)",
      "Participate in on-call rotation and incident response",
    ],
    requirements: [
      "4+ years backend engineering in a production SaaS environment",
      "Proficient in Go, Python, or Node.js with strong API design fundamentals",
      "Experience with event-driven architectures (Kafka, Pub/Sub, or SQS)",
      "Solid understanding of SQL and NoSQL database design",
      "Exposure to healthcare or financial data standards (FHIR, FIX) is a plus",
    ],
    tags: ["Go", "PostgreSQL", "Kafka", "Docker", "GCP", "GraphQL"],
  },
  {
    id: "swe-fullstack",
    title: "Full-Stack Engineer — Enterprise Dashboards",
    category: "engineering",
    location: "Remote (US)",
    type: "Full-time",
    level: "Mid",
    salary: "$140K – $175K",
    description: "Craft the analytics and explainability dashboards that enterprise clients rely on daily. Translate complex AI outputs into clear, actionable UIs.",
    responsibilities: [
      "Build performant, accessible React dashboards for clinical and financial AI outputs",
      "Implement data visualizations using D3.js and Recharts",
      "Collaborate with UX designers to translate wireframes into pixel-perfect interfaces",
      "Write integration and unit tests achieving >80% coverage",
      "Optimize front-end bundle size and rendering performance",
    ],
    requirements: [
      "3+ years full-stack experience with React and TypeScript",
      "Strong CSS skills; experience with Tailwind or CSS-in-JS",
      "Comfort with Next.js App Router and server components",
      "Experience building data-heavy dashboards with charting libraries",
      "Eye for design and commitment to accessibility (WCAG 2.1 AA)",
    ],
    tags: ["TypeScript", "React", "Next.js", "TailwindCSS", "D3.js", "Vitest"],
  },
  {
    id: "swe-data",
    title: "Data Engineer — Healthcare Analytics",
    category: "engineering",
    location: "Remote (US)",
    type: "Full-time",
    level: "Senior",
    salary: "$160K – $200K",
    description: "Architect HIPAA-compliant data pipelines for clinical AI systems. Own data quality, lineage, and governance across multiple health system clients.",
    responsibilities: [
      "Design and maintain ELT pipelines processing millions of clinical records daily",
      "Implement data quality checks, schema validation, and anomaly detection",
      "Own data lineage documentation and audit trails for regulatory compliance",
      "Work with clinical informatics teams to map EHR data to ML feature schemas",
      "Optimize query performance in Snowflake and BigQuery for sub-second dashboards",
    ],
    requirements: [
      "5+ years data engineering with large-scale batch and streaming pipelines",
      "Expert-level SQL; experience with dbt for transformation modeling",
      "Production experience with Spark or similar distributed compute frameworks",
      "Familiarity with HL7 FHIR and clinical data standards",
      "HIPAA compliance experience required",
    ],
    tags: ["Spark", "dbt", "Snowflake", "Python", "FHIR", "Airflow"],
  },
  {
    id: "swe-security",
    title: "Security Engineer — AI Systems",
    category: "engineering",
    location: "Remote (US)",
    type: "Full-time",
    level: "Senior",
    salary: "$170K – $210K",
    description: "Own the security posture for AI systems handling sensitive financial and healthcare data. Lead SOC 2 Type II compliance, pen testing, and threat modeling.",
    responsibilities: [
      "Lead annual SOC 2 Type II audits and HIPAA security risk assessments",
      "Conduct internal penetration tests and manage bug bounty program",
      "Build and maintain SIEM alerting, incident response playbooks, and forensics capability",
      "Review infrastructure-as-code changes for security anti-patterns",
      "Train engineering teams on secure coding practices",
    ],
    requirements: [
      "5+ years in security engineering or AppSec roles",
      "Hands-on experience with AWS or GCP security tooling (GuardDuty, Security Hub, etc.)",
      "Formal penetration testing experience or OSCP certification preferred",
      "Strong understanding of zero-trust architecture and IAM best practices",
      "Experience in regulated industries (healthcare or finance) strongly preferred",
    ],
    tags: ["AWS Security", "IAM", "SIEM", "SOC 2", "Zero Trust", "OSCP"],
  },
  {
    id: "swe-mobile",
    title: "iOS / Android Engineer",
    category: "engineering",
    location: "Remote (US)",
    type: "Full-time",
    level: "Mid",
    salary: "$135K – $165K",
    description: "Build mobile interfaces for AI-powered clinical and fintech tools used by frontline workers. Focus on performance and accessibility at scale.",
    responsibilities: [
      "Develop and maintain production iOS and Android applications with 100K+ users",
      "Integrate AI inference APIs with optimized on-device caching and offline support",
      "Implement biometric authentication and device-level encryption for HIPAA compliance",
      "Collaborate with backend engineers on API contract design",
      "Own mobile CI/CD pipelines and App Store deployment processes",
    ],
    requirements: [
      "3+ years native mobile development (Swift or Kotlin)",
      "Experience shipping cross-platform apps with React Native is a plus",
      "Understanding of mobile security best practices and HIPAA requirements",
      "Familiarity with GraphQL client libraries (Apollo, Relay)",
      "Strong debugging skills with profiling tools (Instruments, Android Profiler)",
    ],
    tags: ["Swift", "Kotlin", "React Native", "GraphQL", "HIPAA"],
  },
  {
    id: "swe-devops",
    title: "Platform Engineer / DevOps",
    category: "engineering",
    location: "Remote (US)",
    type: "Full-time",
    level: "Mid-Senior",
    salary: "$145K – $185K",
    description: "Maintain CI/CD pipelines, observability stacks, and infrastructure-as-code for 20+ client deployments. Keep uptime at 99.99% for mission-critical AI services.",
    responsibilities: [
      "Manage multi-tenant Kubernetes clusters across AWS and Azure",
      "Maintain Terraform modules and enforce IaC policies via CI gates",
      "Build and operate observability stack (Prometheus, Grafana, PagerDuty)",
      "Optimize cloud costs across client deployments without sacrificing reliability",
      "Lead incident post-mortems and implement systemic reliability improvements",
    ],
    requirements: [
      "4+ years in DevOps, SRE, or platform engineering",
      "Expert with Terraform and cloud-native IaC patterns",
      "Deep Kubernetes experience including cluster upgrades, RBAC, and network policies",
      "Strong scripting in Bash and Python",
      "Experience with GitOps workflows (ArgoCD, Flux)",
    ],
    tags: ["Terraform", "GitHub Actions", "Prometheus", "Grafana", "Azure", "ArgoCD"],
  },
  {
    id: "swe-embed",
    title: "Embedded AI Engineer",
    category: "engineering",
    location: "Remote (US)",
    type: "Full-time",
    level: "Senior",
    salary: "$165K – $205K",
    description: "Optimize and deploy models to edge devices in clinical and financial environments. Work across the full stack from ONNX quantization to firmware integration.",
    responsibilities: [
      "Port and optimize PyTorch models to ONNX and TensorRT for edge deployment",
      "Develop firmware integrations for clinical device platforms (ARM Cortex-M, NVIDIA Jetson)",
      "Profile and optimize model latency and memory footprint for constrained hardware",
      "Define hardware-in-the-loop testing frameworks for embedded AI systems",
      "Collaborate with ML researchers on quantization-aware training strategies",
    ],
    requirements: [
      "5+ years embedded systems or systems programming experience",
      "Strong C/C++ with experience in low-level optimization",
      "Hands-on experience with TensorRT, ONNX Runtime, or TFLite",
      "Familiarity with CUDA programming and GPU kernel optimization",
      "Experience in medical devices or safety-critical systems is highly valued",
    ],
    tags: ["C++", "ONNX", "TensorRT", "CUDA", "Embedded Linux", "ARM"],
  },
  {
    id: "swe-qa",
    title: "Senior QA Engineer — AI/ML",
    category: "engineering",
    location: "Remote (US)",
    type: "Full-time",
    level: "Senior",
    salary: "$130K – $165K",
    description: "Define testing frameworks for non-deterministic AI systems. Own model evaluation harnesses, regression suites, and automated fairness checks.",
    responsibilities: [
      "Design and implement test strategies for ML models including regression, performance, and bias testing",
      "Build automated evaluation harnesses that run on every model deployment",
      "Define and track model quality metrics with statistical rigor",
      "Collaborate with ML engineers on dataset documentation and validation splits",
      "Maintain test environments that mirror production data distributions",
    ],
    requirements: [
      "4+ years in QA or test engineering; 2+ years testing ML/AI systems",
      "Strong Python with hands-on pytest and testing framework design",
      "Experience with statistical hypothesis testing and A/B evaluation",
      "Familiarity with model fairness toolkits (Fairlearn, AIF360)",
      "Understanding of data versioning and experiment tracking (DVC, MLflow)",
    ],
    tags: ["pytest", "Selenium", "Model Evaluation", "Statistical Testing", "Python", "Fairlearn"],
  },
  {
    id: "swe-tech-lead",
    title: "Engineering Manager — AI Platform",
    category: "engineering",
    location: "Remote (US)",
    type: "Full-time",
    level: "Manager",
    salary: "$210K – $260K",
    description: "Lead a 6–8 person pod building the core AI platform. Balance technical direction with people development. You report to VP Engineering.",
    responsibilities: [
      "Lead technical planning, architecture reviews, and delivery for the AI Platform pod",
      "Conduct weekly 1:1s, quarterly reviews, and career development conversations",
      "Partner with Product and ML Research to sequence roadmap priorities",
      "Establish engineering quality standards, code review culture, and incident processes",
      "Recruit, interview, and onboard new team members",
    ],
    requirements: [
      "3+ years engineering management with teams of 5+ engineers",
      "Strong individual contributor background in backend or ML infrastructure",
      "Track record shipping production services at scale",
      "Experience in a regulated industry (healthcare or finance) is a strong plus",
      "Empathetic, direct communicator with high standards for craft and execution",
    ],
    tags: ["Team Leadership", "System Design", "Roadmapping", "Python", "AWS"],
  },
  {
    id: "swe-architect",
    title: "Principal Engineer — AI Systems",
    category: "engineering",
    location: "Remote (US)",
    type: "Full-time",
    level: "Principal",
    salary: "$230K – $290K",
    description: "Set the technical vision for AI Brigade's platform architecture. Own cross-cutting concerns: scalability, reliability, and AI governance across all client systems.",
    responsibilities: [
      "Define architecture standards and patterns adopted across all engineering pods",
      "Lead design reviews for high-stakes systems touching patient or financial data",
      "Drive technical due diligence for new client engagements and expansions",
      "Mentor senior engineers and propagate engineering excellence",
      "Represent AI Brigade at conferences and in technical content",
    ],
    requirements: [
      "10+ years in software engineering with 3+ years at staff/principal level",
      "Deep expertise in distributed systems, data-intensive applications, and ML systems",
      "Proven track record influencing engineering culture and architecture at scale",
      "Experience designing systems under healthcare or financial regulatory constraints",
      "Excellent technical communication — you make the complex legible",
    ],
    tags: ["System Design", "Distributed Systems", "AI/ML", "Architecture", "Mentoring"],
  },
  {
    id: "swe-intern",
    title: "Software Engineer Intern (Summer 2026)",
    category: "engineering",
    location: "Remote (US)",
    type: "Internship",
    level: "Internship",
    salary: "$45 – $60/hr",
    description: "12-week program contributing real code to production AI systems. Past interns have shipped features used by Fortune 500 clients and received return offers.",
    responsibilities: [
      "Own and ship a scoped feature with full end-to-end ownership",
      "Participate in code reviews, design discussions, and team standups",
      "Present your work to the engineering team at end of internship",
      "Work alongside a dedicated senior engineer mentor",
    ],
    requirements: [
      "Currently pursuing BS/MS in Computer Science or related field",
      "Proficient in Python or TypeScript; familiarity with ML concepts is a plus",
      "Strong problem-solving skills and intellectual curiosity",
      "Available for 12-week program starting June 2026",
    ],
    tags: ["Python", "React", "ML Basics", "Git", "Agile"],
  },

  // ── AI Research ───────────────────────────────────────────────
  {
    id: "res-applied-ml",
    title: "Applied ML Scientist — Fintech",
    category: "research",
    location: "Remote (US)",
    type: "Full-time",
    level: "Senior",
    salary: "$185K – $235K",
    description: "Develop and evaluate ML models for fraud detection, credit risk, and market microstructure. Bridge cutting-edge research and production systems.",
    responsibilities: [
      "Design, train, and evaluate ML models for fraud detection and credit underwriting",
      "Run rigorous A/B experiments measuring business impact (approval rates, loss rates, AUC)",
      "Collaborate with platform engineers to deploy models to production serving infrastructure",
      "Monitor model performance post-deployment and drive retraining cadences",
      "Stay current with academic literature and evaluate applicability to client problems",
    ],
    requirements: [
      "MS or PhD in Statistics, Machine Learning, Mathematics, or related field",
      "3+ years applied ML in production financial services environments",
      "Expert-level Python with PyTorch or XGBoost/LightGBM for tabular data",
      "Strong causal inference and experimental design skills",
      "Experience with feature engineering on transactional and behavioral data",
    ],
    tags: ["PyTorch", "Gradient Boosting", "Causal Inference", "Feature Engineering", "SQL"],
  },
  {
    id: "res-nlp",
    title: "NLP Research Engineer",
    category: "research",
    location: "Remote (US)",
    type: "Full-time",
    level: "Senior",
    salary: "$190K – $240K",
    description: "Build production LLM pipelines for clinical documentation, contract analysis, and regulatory reporting. Fine-tune and evaluate frontier models on proprietary datasets.",
    responsibilities: [
      "Fine-tune and evaluate LLMs on clinical and legal text corpora",
      "Design RAG architectures for document Q&A over regulated-industry knowledge bases",
      "Implement hallucination detection, output grounding, and confidence calibration",
      "Build evaluation harnesses measuring accuracy, latency, and cost",
      "Collaborate with domain experts to create annotation guidelines and gold-standard datasets",
    ],
    requirements: [
      "MS or PhD in NLP, Computational Linguistics, or related field",
      "Hands-on experience fine-tuning transformer models (BERT, T5, LLaMA family)",
      "Production experience with LangChain, LlamaIndex, or custom RAG pipelines",
      "Strong understanding of RLHF, DPO, and instruction tuning techniques",
      "Experience with clinical (ICD, SNOMED) or legal text is highly valued",
    ],
    tags: ["HuggingFace", "LangChain", "RLHF", "FLAN-T5", "RAG", "vLLM"],
  },
  {
    id: "res-cv",
    title: "Computer Vision Engineer",
    category: "research",
    location: "Remote (US)",
    type: "Full-time",
    level: "Senior",
    salary: "$180K – $230K",
    description: "Apply vision models to medical imaging and document intelligence use cases for hospital and insurance clients. Bridge research and regulated deployment.",
    responsibilities: [
      "Develop and validate CNN and Vision Transformer models for medical image classification and segmentation",
      "Build document intelligence pipelines for insurance claims and clinical records",
      "Implement preprocessing, augmentation, and domain adaptation techniques for scarce medical data",
      "Produce model cards and validation reports meeting FDA SaMD guidance",
      "Collaborate with radiologists and clinical SMEs on annotation quality",
    ],
    requirements: [
      "MS or PhD in Computer Vision, Electrical Engineering, or related field",
      "4+ years building vision models with PyTorch or TensorFlow in production",
      "Experience with DICOM data and medical imaging standards",
      "Familiarity with regulatory requirements for AI/ML-based SaMD",
      "Strong publication record or equivalent industry track record",
    ],
    tags: ["PyTorch", "YOLO", "ViT", "DICOM", "OpenCV", "MONAI"],
  },
  {
    id: "res-reinforcement",
    title: "Reinforcement Learning Researcher",
    category: "research",
    location: "Remote (US)",
    type: "Full-time",
    level: "Senior",
    salary: "$195K – $250K",
    description: "Design RL systems for dynamic pricing, treatment planning, and portfolio optimization. Publish, patent, and ship research that creates measurable business value.",
    responsibilities: [
      "Develop multi-agent RL algorithms for sequential decision-making in financial and clinical domains",
      "Build high-fidelity simulation environments for policy training and evaluation",
      "Implement off-policy evaluation methods for safe deployment without online exploration risk",
      "Collaborate with domain experts to formulate reward functions aligned with business objectives",
      "Publish research and represent AI Brigade at top-tier ML venues",
    ],
    requirements: [
      "PhD in Machine Learning, Statistics, Operations Research, or related field",
      "Deep expertise in model-based and model-free RL (PPO, SAC, TD3, DDPG)",
      "Experience with Ray RLlib, Stable Baselines, or custom RL frameworks",
      "Strong mathematical background in optimization, probability, and control theory",
      "Published work at NeurIPS, ICML, ICLR, or equivalent is a strong plus",
    ],
    tags: ["Ray RLlib", "Gymnasium", "Multi-Agent RL", "Simulation", "Python", "JAX"],
  },
  {
    id: "res-mlops-research",
    title: "ML Research Engineer — Model Evaluation",
    category: "research",
    location: "Remote (US)",
    type: "Full-time",
    level: "Mid-Senior",
    salary: "$165K – $210K",
    description: "Own model evaluation methodologies including robustness, fairness, and calibration across production healthcare and financial models.",
    responsibilities: [
      "Design and implement comprehensive model evaluation pipelines across all production models",
      "Define fairness metrics and bias mitigation strategies for clinical and credit models",
      "Build calibration assessment tools and uncertainty quantification frameworks",
      "Develop robustness stress tests simulating distribution shift and adversarial inputs",
      "Author model evaluation documentation for regulatory submissions",
    ],
    requirements: [
      "MS or PhD in Statistics, ML, or related quantitative field",
      "3+ years experience in model evaluation or ML research engineering",
      "Expertise in statistical testing, calibration theory, and fairness metrics",
      "Proficient with Python scientific stack (scikit-learn, scipy, statsmodels)",
      "Experience with MLflow or similar experiment tracking platforms",
    ],
    tags: ["Statistical Testing", "Fairness", "Calibration", "Python", "MLflow", "Evidently AI"],
  },
  {
    id: "res-lead",
    title: "Head of AI Research",
    category: "research",
    location: "Remote (US)",
    type: "Full-time",
    level: "Director",
    salary: "$260K – $320K",
    description: "Lead the applied research roadmap across Fintech and HealthTech verticals. Manage 6 researchers, publish externally, and define our technical differentiation.",
    responsibilities: [
      "Set applied research strategy across NLP, vision, tabular, and RL domains",
      "Lead and grow a team of 6 ML scientists and research engineers",
      "Partner with VP Engineering and CPO to translate research into product roadmap items",
      "Establish external research presence through publications, talks, and open-source",
      "Evaluate and onboard new frontier models and research techniques",
    ],
    requirements: [
      "PhD in Machine Learning or related field plus 5+ years post-PhD research or industry experience",
      "Publication record at venues such as NeurIPS, ICML, ICLR, or AAAI",
      "Prior management or tech lead experience overseeing a research team",
      "Deep applied ML expertise; ability to write and review production code",
      "Exceptional ability to prioritize research with near-term business impact",
    ],
    tags: ["Research Leadership", "Deep Learning", "NLP", "Publication", "Strategy"],
  },
  {
    id: "res-post-doc",
    title: "Research Scientist — Interpretable AI",
    category: "research",
    location: "Remote (US)",
    type: "Full-time",
    level: "Senior",
    salary: "$175K – $220K",
    description: "Develop explainability methods for regulated-industry AI — SHAP, LIME, counterfactuals, and novel attribution techniques for clinical decision support systems.",
    responsibilities: [
      "Research and implement novel explainability methods for complex model architectures",
      "Produce human-readable explanations for clinical and underwriting decision support systems",
      "Conduct user research with clinicians and analysts to validate explanation quality",
      "Build explanation audit trails meeting regulatory requirements",
      "Publish research advancing the state of the art in interpretable ML",
    ],
    requirements: [
      "PhD or equivalent research experience in ML interpretability or XAI",
      "Expert knowledge of SHAP, LIME, integrated gradients, and counterfactual methods",
      "Strong PyTorch and Python skills",
      "Experience working with clinical or financial domain experts",
      "Commitment to responsible AI principles and practical deployment constraints",
    ],
    tags: ["SHAP", "LIME", "Counterfactuals", "Causal ML", "PyTorch", "Captum"],
  },
  {
    id: "res-data-science",
    title: "Senior Data Scientist — Healthcare",
    category: "research",
    location: "Remote (US)",
    type: "Full-time",
    level: "Senior",
    salary: "$160K – $205K",
    description: "Partner with hospital systems to translate clinical questions into ML problems. Own data analysis, feature engineering, and model validation.",
    responsibilities: [
      "Conduct exploratory data analysis on EHR, claims, and clinical trial datasets",
      "Design feature engineering pipelines for clinical prediction models",
      "Validate model performance across patient subgroups and hospital settings",
      "Communicate findings to non-technical clinical and executive stakeholders",
      "Collaborate with data engineers on pipeline productionization",
    ],
    requirements: [
      "MS or PhD in Biostatistics, Epidemiology, Data Science, or related field",
      "4+ years working with clinical or healthcare data",
      "Expert SQL; proficiency in Python (pandas, scikit-learn) and/or R",
      "Experience with EHR data formats (HL7, FHIR, CCDs)",
      "Ability to communicate complex analyses clearly to clinical audiences",
    ],
    tags: ["R", "Python", "Epidemiology", "SQL", "EHR Data", "scikit-learn"],
  },
  {
    id: "res-quant",
    title: "Quantitative Researcher — Markets AI",
    category: "research",
    location: "Remote (US)",
    type: "Full-time",
    level: "Senior",
    salary: "$200K – $260K",
    description: "Develop alpha-generating signals and risk models for fintech clients. Combine classical quant methods with modern ML approaches on proprietary market data.",
    responsibilities: [
      "Research, backtest, and deploy alpha signals for equities, fixed income, and alternative data",
      "Build ML-augmented risk models for credit and market risk management",
      "Design and implement rigorous backtesting frameworks avoiding lookahead and overfitting",
      "Partner with client quant teams on model integration and validation",
      "Stay current with academic and industry literature on ML for finance",
    ],
    requirements: [
      "MS or PhD in Mathematics, Statistics, Financial Engineering, or Physics",
      "3+ years quantitative research in buy-side, sell-side, or fintech",
      "Expert Python with strong time series and statistical modeling skills",
      "Experience with financial data vendors (Bloomberg, Refinitiv, Quandl)",
      "Understanding of market microstructure and factor investing",
    ],
    tags: ["Python", "Time Series", "Backtesting", "Statistics", "Bloomberg API", "Pandas"],
  },

  // ── Product & Design ─────────────────────────────────────────
  {
    id: "pm-senior",
    title: "Senior Product Manager — AI Platform",
    category: "product",
    location: "Remote (US)",
    type: "Full-time",
    level: "Senior",
    salary: "$175K – $215K",
    description: "Own the roadmap for our AI platform used by 20+ enterprise clients. Work at the intersection of client needs, engineering capacity, and AI research output.",
    responsibilities: [
      "Define and maintain the AI platform product roadmap with quarterly OKRs",
      "Conduct discovery interviews with enterprise clients and synthesize insights into requirements",
      "Write detailed PRDs and work closely with engineering during sprint planning",
      "Measure product success through adoption, retention, and NPS metrics",
      "Present roadmap updates to executive stakeholders and major clients",
    ],
    requirements: [
      "5+ years product management in enterprise SaaS; 2+ years in AI/ML products",
      "Strong analytical skills; comfortable with SQL and product analytics tools",
      "Exceptional written communication; you write specs that engineers actually want to build from",
      "Experience managing stakeholder relationships across technical and executive audiences",
      "Background in healthcare or financial services is a strong plus",
    ],
    tags: ["Roadmapping", "Enterprise SaaS", "AI/ML", "Stakeholder Mgmt", "Agile", "SQL"],
  },
  {
    id: "pm-healthtech",
    title: "Product Manager — HealthTech",
    category: "product",
    location: "Remote (US)",
    type: "Full-time",
    level: "Mid-Senior",
    salary: "$155K – $195K",
    description: "Drive product strategy for clinical AI tools. Partner with hospital clients and clinical leads to define requirements for AI-assisted diagnostics and care pathways.",
    responsibilities: [
      "Own the product roadmap for AI-assisted clinical decision support tools",
      "Spend meaningful time in clinical environments observing workflows and interviewing end users",
      "Partner with compliance and engineering on HIPAA-aligned product decisions",
      "Define success metrics and run structured experiments to validate product hypotheses",
      "Support sales and customer success on product demonstrations and client QBRs",
    ],
    requirements: [
      "4+ years product management; healthcare domain experience strongly preferred",
      "Comfort navigating HIPAA, FDA guidance, and clinical workflow constraints",
      "Experience conducting user research with clinicians or other specialized professionals",
      "Ability to translate ambiguous clinical needs into precise engineering requirements",
      "Clinical background (RN, PA, MD) is a significant differentiator",
    ],
    tags: ["HIPAA", "EHR", "Clinical Workflows", "User Research", "Roadmapping", "FDA"],
  },
  {
    id: "des-ux",
    title: "Senior UX Designer — AI Products",
    category: "product",
    location: "Remote (US)",
    type: "Full-time",
    level: "Senior",
    salary: "$145K – $185K",
    description: "Design intuitive interfaces for complex AI systems. Specialize in making model uncertainty, explainability, and confidence scores legible to non-technical users.",
    responsibilities: [
      "Lead end-to-end design for new AI features from discovery through design QA",
      "Conduct moderated usability studies with clinical and financial end users",
      "Build and maintain a shared design system used across all product surfaces",
      "Collaborate with ML scientists to design effective AI explanation UIs",
      "Define and track UX quality metrics (task completion, error rates, SUS scores)",
    ],
    requirements: [
      "5+ years UX design for complex data or enterprise software products",
      "Strong portfolio demonstrating UX process, research synthesis, and high-fidelity outputs",
      "Expert Figma user with experience building and governing design systems",
      "Familiarity with accessibility standards (WCAG 2.1 AA)",
      "Prior experience designing for AI/ML or data-heavy applications is a major plus",
    ],
    tags: ["Figma", "UX Research", "Design Systems", "Accessibility", "Prototyping"],
  },
  {
    id: "des-visual",
    title: "Visual / Motion Designer",
    category: "product",
    location: "Remote (US)",
    type: "Full-time",
    level: "Mid",
    salary: "$110K – $145K",
    description: "Create the visual language for AI Brigade's product suite and marketing presence. Own brand identity, motion design, and presentation assets.",
    responsibilities: [
      "Design product marketing assets including landing pages, case study visuals, and social content",
      "Produce motion graphics and animated explainers for complex AI concepts",
      "Maintain and evolve brand guidelines across digital and print touchpoints",
      "Collaborate with the frontend team on implementing design tokens and visual systems",
      "Create pitch decks, board presentations, and conference materials",
    ],
    requirements: [
      "3+ years visual design in a tech or agency environment",
      "Strong motion design skills using After Effects; Lottie export experience preferred",
      "Expert Figma; proficiency in Illustrator and Photoshop",
      "Portfolio demonstrating strong typography, color theory, and brand design",
      "Interest in data visualization and making technical content visually compelling",
    ],
    tags: ["After Effects", "Figma", "Illustrator", "Motion Graphics", "Brand Design", "Lottie"],
  },
  {
    id: "pm-growth",
    title: "Product Manager — Growth",
    category: "product",
    location: "Remote (US)",
    type: "Full-time",
    level: "Mid-Senior",
    salary: "$150K – $190K",
    description: "Own client activation, expansion, and retention metrics. Run experiments, analyze funnels, and partner with sales to drive NRR above 130%.",
    responsibilities: [
      "Define and own platform activation and expansion metrics (NRR, seat growth, feature adoption)",
      "Design and run A/B experiments measuring impact of onboarding and engagement changes",
      "Build self-serve analytics dashboards helping CSMs identify at-risk and expansion accounts",
      "Partner with sales on in-product upsell and cross-sell triggers",
      "Own product-led growth experimentation roadmap",
    ],
    requirements: [
      "4+ years product management with growth or PLG focus",
      "Strong quantitative skills; comfortable writing SQL and building dashboards in Mixpanel or Amplitude",
      "Experience with B2B SaaS growth metrics (NRR, DAU/MAU, time-to-value)",
      "Ability to work across sales, CS, and engineering to execute cross-functional growth initiatives",
    ],
    tags: ["Growth Metrics", "A/B Testing", "Analytics", "SQL", "Mixpanel", "PLG"],
  },
  {
    id: "pm-director",
    title: "Director of Product",
    category: "product",
    location: "Remote (US)",
    type: "Full-time",
    level: "Director",
    salary: "$240K – $290K",
    description: "Lead the product organization across both business verticals. Build and mentor a team of PMs. Own product vision, strategy, and P&L contribution.",
    responsibilities: [
      "Define multi-year product strategy aligned with company growth objectives",
      "Build, mentor, and performance-manage a team of 4 product managers",
      "Own product P&L contribution including pricing strategy and packaging",
      "Present product vision and roadmap to board, investors, and major enterprise clients",
      "Partner with Head of AI Research and VP Engineering on technical strategy",
    ],
    requirements: [
      "8+ years product management; 3+ years managing PMs",
      "Track record building and scaling enterprise SaaS products from $10M to $100M+ ARR",
      "Deep expertise in at least one of our verticals (healthcare or financial services)",
      "Exceptional leadership presence; you raise the bar of every room you're in",
      "MBA or equivalent strategic business experience is a plus",
    ],
    tags: ["Product Leadership", "Strategy", "Enterprise", "AI/ML", "Team Building", "P&L"],
  },
  {
    id: "des-res",
    title: "UX Research Lead",
    category: "product",
    location: "Remote (US)",
    type: "Full-time",
    level: "Senior",
    salary: "$135K – $170K",
    description: "Build the research practice at AI Brigade. Run interviews, usability studies, and jobs-to-be-done research with clinical and financial end users.",
    responsibilities: [
      "Own the end-to-end research practice including methodology, tooling, and knowledge repository",
      "Plan and conduct generative and evaluative research with clinical, financial, and enterprise users",
      "Synthesize research insights into artifacts that directly shape product decisions",
      "Train PMs and designers on research best practices",
      "Partner with data science on mixed-methods studies combining qual and quant data",
    ],
    requirements: [
      "5+ years UX research in a product organization; preferably enterprise B2B",
      "Expert in qualitative methods: contextual inquiry, moderated usability, diary studies",
      "Experience recruiting and researching with specialized professional populations",
      "Strong written communication; research reports that executives actually read",
      "Familiarity with quantitative methods (surveys, log analysis) to complement qual work",
    ],
    tags: ["User Research", "Usability Testing", "Ethnography", "Synthesis", "Figma", "Dovetail"],
  },

  // ── Business & Sales ─────────────────────────────────────────
  {
    id: "biz-ae",
    title: "Account Executive — Enterprise AI",
    category: "business",
    location: "Remote (US)",
    type: "Full-time",
    level: "Senior",
    salary: "$130K base + $130K OTE",
    description: "Close 6–7 figure AI transformation deals with C-suite buyers at health systems and financial institutions. Full-cycle from discovery to signed contract.",
    responsibilities: [
      "Own a territory of named enterprise accounts in healthcare and financial services",
      "Run discovery, solution design, and executive presentations for complex AI deals",
      "Manage multi-stakeholder sales cycles (CTO, CMO, CFO, Compliance) lasting 3–9 months",
      "Partner with Solutions Engineering on technical evaluations and POCs",
      "Forecast accurately in Salesforce; maintain pipeline hygiene for leadership visibility",
    ],
    requirements: [
      "5+ years enterprise software sales with consistent $1M+ quota attainment",
      "Experience selling into healthcare or financial services required",
      "Consultative selling approach; you diagnose before you prescribe",
      "Ability to navigate procurement, legal, and compliance processes in large institutions",
      "Strong executive presence and written communication skills",
    ],
    tags: ["Enterprise Sales", "SaaS", "Healthcare", "Fintech", "Salesforce", "MEDDIC"],
  },
  {
    id: "biz-csm",
    title: "Customer Success Manager",
    category: "business",
    location: "Remote (US)",
    type: "Full-time",
    level: "Mid-Senior",
    salary: "$110K – $150K + bonus",
    description: "Own onboarding, adoption, and expansion for a portfolio of enterprise clients. Build deep relationships with technical and executive stakeholders to drive 130%+ NRR.",
    responsibilities: [
      "Manage a portfolio of 8–12 enterprise accounts from post-sale through renewal",
      "Run structured onboarding programs ensuring clients reach time-to-value within 60 days",
      "Conduct quarterly business reviews with C-suite stakeholders",
      "Identify and qualify expansion opportunities; partner with AEs to close upsells",
      "Serve as client advocate internally, surfacing product feedback to PM and engineering",
    ],
    requirements: [
      "4+ years customer success in enterprise SaaS; AI/ML product experience preferred",
      "Track record of 120%+ NRR across a managed account portfolio",
      "Ability to engage confidently with both technical (engineers, data scientists) and executive stakeholders",
      "Strong project management skills; you keep complex implementations on track",
      "Experience with Gainsight or ChurnZero for health scoring and escalation management",
    ],
    tags: ["Customer Success", "QBRs", "Churn Prevention", "Enterprise", "AI/ML", "Gainsight"],
  },
  {
    id: "biz-sdr",
    title: "Senior SDR / BDR",
    category: "business",
    location: "Remote (US)",
    type: "Full-time",
    level: "Mid",
    salary: "$75K base + $75K OTE",
    description: "Generate and qualify pipeline for our enterprise AE team. Multi-channel outbound targeting VP+ buyers at health systems and mid-market financial institutions.",
    responsibilities: [
      "Execute high-quality multi-channel outbound sequences to VP/C-suite prospects",
      "Research and personalize messaging for named accounts in healthcare and fintech",
      "Qualify inbound leads and route to the appropriate AE within SLA",
      "Maintain accurate pipeline and activity data in HubSpot",
      "Collaborate with marketing on account-based targeting campaigns",
    ],
    requirements: [
      "2+ years SDR/BDR experience at a B2B SaaS company",
      "Consistent track record of meeting or exceeding monthly meeting quotas",
      "Strong written communication; your cold emails actually get replies",
      "Experience with sequencing tools (Outreach, SalesLoft) and LinkedIn Sales Navigator",
      "Interest in AI/ML technology and ability to articulate value to technical buyers",
    ],
    tags: ["Outbound", "Sequencing", "LinkedIn Sales Navigator", "Gong", "HubSpot", "ABM"],
  },
  {
    id: "biz-marketing",
    title: "Head of Demand Generation",
    category: "business",
    location: "Remote (US)",
    type: "Full-time",
    level: "Manager",
    salary: "$165K – $210K",
    description: "Own pipeline generation across paid, content, events, and partner channels. Build a lean, high-output marketing function from Series A to scale.",
    responsibilities: [
      "Own MQL and pipeline targets; build programs across paid, content, ABM, and events",
      "Lead a team of 3 marketers (content, paid, field) with plans to grow to 6",
      "Partner with AEs and SDRs to ensure campaign–sales alignment",
      "Build and report on full-funnel marketing attribution in HubSpot and Salesforce",
      "Establish AI Brigade's thought leadership through webinars, whitepapers, and conference presence",
    ],
    requirements: [
      "7+ years B2B marketing; 3+ years demand gen leadership in enterprise SaaS",
      "Track record of building pipeline that converts to closed revenue",
      "Strong ABM experience targeting large enterprise accounts",
      "Proficient with HubSpot, Salesforce, and paid channels (LinkedIn, Google)",
      "Excellent analytical skills; you make decisions from data, not intuition",
    ],
    tags: ["Demand Gen", "ABM", "SEO", "Paid Media", "HubSpot", "Salesforce"],
  },
  {
    id: "biz-partnerships",
    title: "Strategic Partnerships Manager",
    category: "business",
    location: "Remote (US)",
    type: "Full-time",
    level: "Senior",
    salary: "$140K – $180K",
    description: "Build and manage alliances with cloud providers (AWS, Azure, GCP), EHR vendors, and system integrators. Drive co-sell and referral revenue.",
    responsibilities: [
      "Identify, structure, and close strategic alliance agreements with cloud and software partners",
      "Manage existing co-sell relationships with AWS, Azure, and GCP marketplace teams",
      "Build joint GTM plans with EHR vendors (Epic, Cerner) and healthcare IT integrators",
      "Track partner-sourced and partner-influenced pipeline in Salesforce",
      "Represent AI Brigade at partner summits and industry conferences",
    ],
    requirements: [
      "5+ years partner management or business development in enterprise SaaS",
      "Existing relationships at AWS, Azure, GCP, or major healthcare IT vendors are highly valued",
      "Experience structuring co-sell, referral, and reseller agreements",
      "Strong financial modeling skills for partnership business case development",
      "Comfort working in healthcare or financial services regulatory environments",
    ],
    tags: ["Partnerships", "Co-Sell", "Contract Negotiation", "AWS", "Healthcare IT", "Salesforce"],
  },
  {
    id: "biz-content",
    title: "Senior Content Strategist",
    category: "business",
    location: "Remote (US)",
    type: "Full-time",
    level: "Senior",
    salary: "$105K – $140K",
    description: "Own AI Brigade's thought leadership content — whitepapers, case studies, webinars, and LinkedIn. Make complex AI concepts compelling to enterprise buyers.",
    responsibilities: [
      "Develop a quarterly content calendar aligned with demand gen campaign themes",
      "Write and edit long-form content: whitepapers, case studies, technical blogs, and guides",
      "Partner with ML scientists and engineers to translate research into accessible narratives",
      "Manage external writers and agencies contributing to the content program",
      "Track content performance metrics and optimize distribution channels",
    ],
    requirements: [
      "5+ years B2B content marketing; experience with technical or AI/ML topics strongly preferred",
      "Exceptional writing and editing skills; portfolio demonstrating long-form B2B content",
      "Strong SEO fundamentals and content distribution strategy",
      "Experience interviewing subject matter experts and writing in their voice",
      "Familiarity with healthcare or financial services audiences is a meaningful advantage",
    ],
    tags: ["Content Marketing", "Technical Writing", "SEO", "AI/ML", "B2B", "HubSpot"],
  },
  {
    id: "biz-solutions",
    title: "Solutions Engineer / Pre-Sales",
    category: "business",
    location: "Remote (US)",
    type: "Full-time",
    level: "Senior",
    salary: "$155K – $195K",
    description: "Partner with AEs on technical evaluations, RFPs, and proof-of-concepts with enterprise prospects. Bridge the gap between sales and delivery.",
    responsibilities: [
      "Lead technical discovery and solution design during enterprise sales cycles",
      "Build and deliver compelling, customized product demonstrations",
      "Manage POC scoping, execution, and success criteria definition with prospects",
      "Author responses to technical sections of RFPs and security questionnaires",
      "Transition won deals to delivery teams through structured knowledge transfer",
    ],
    requirements: [
      "4+ years solutions engineering or technical pre-sales in enterprise SaaS",
      "Ability to write Python scripts and query SQL databases to support live demonstrations",
      "Comfort presenting to CTO, CISO, and data science audiences",
      "Experience with data security and compliance topics (SOC 2, HIPAA, GDPR)",
      "Prior software engineering background is a strong differentiator",
    ],
    tags: ["Pre-Sales", "Python", "Architecture", "Demo Engineering", "Technical Sales", "SOC 2"],
  },
  {
    id: "biz-vp-sales",
    title: "VP of Sales",
    category: "business",
    location: "Remote (US)",
    type: "Full-time",
    level: "VP",
    salary: "$200K base + $200K OTE",
    description: "Build and lead the sales organization from 3 AEs to 15. Own revenue targets, forecasting, and GTM strategy across healthcare and fintech verticals.",
    responsibilities: [
      "Own annual revenue targets and quarterly bookings forecasts reported to the CEO and board",
      "Hire, onboard, and develop a world-class team of 12–15 AEs and SDRs over 18 months",
      "Define territory design, compensation plans, and sales methodology (MEDDIC/MEDDPICC)",
      "Partner with Head of Demand Gen and VP Product on pipeline and roadmap alignment",
      "Represent the company at C-level customer conversations and strategic account negotiations",
    ],
    requirements: [
      "10+ years enterprise software sales; 5+ years sales leadership managing 10+ reps",
      "Track record scaling ARR from $10M to $50M+ in enterprise SaaS",
      "Experience selling into regulated industries (healthcare or financial services required)",
      "Strong analytical approach to forecasting and pipeline management",
      "Genuine passion for AI and ability to articulate technical value to non-technical buyers",
    ],
    tags: ["Sales Leadership", "Forecasting", "Enterprise SaaS", "Hiring", "Salesforce", "MEDDIC"],
  },

  // ── Operations & HR ───────────────────────────────────────────
  {
    id: "ops-hr-manager",
    title: "People Operations Manager",
    category: "operations",
    location: "Remote (US)",
    type: "Full-time",
    level: "Manager",
    salary: "$120K – $155K",
    description: "Own the full employee lifecycle — recruiting operations, onboarding, performance cycles, and culture programs for a remote-first, globally distributed team.",
    responsibilities: [
      "Own end-to-end recruiting operations including ATS management, scheduling, and offer logistics",
      "Design and run structured onboarding programs achieving 90-day productivity targets",
      "Administer semi-annual performance review cycles and calibration processes",
      "Manage benefits administration, leaves of absence, and compliance filings",
      "Drive culture programs including employee engagement surveys and action planning",
    ],
    requirements: [
      "5+ years people operations or HR generalist experience in a fast-growth tech company",
      "Experience owning HRIS platforms (Rippling, Workday, or similar)",
      "Strong working knowledge of US employment law across multiple states",
      "Exceptional organizational skills; you run flawless processes across competing priorities",
      "Remote-first culture experience strongly preferred",
    ],
    tags: ["HRIS", "Onboarding", "Performance Management", "Culture", "Rippling", "US Employment Law"],
  },
  {
    id: "ops-recruiter",
    title: "Technical Recruiter — AI/ML",
    category: "operations",
    location: "Remote (US)",
    type: "Full-time",
    level: "Mid-Senior",
    salary: "$100K – $135K",
    description: "Source and close exceptional ML engineers and researchers. Build talent pipelines through top PhD programs, AI conferences, and open-source communities.",
    responsibilities: [
      "Own full-cycle recruiting for ML scientist, research engineer, and data scientist roles",
      "Build proactive talent pipelines through PhD programs, NeurIPS/ICML networks, and open-source",
      "Partner with hiring managers to develop structured interview processes and leveling guides",
      "Track and report recruiting metrics: time-to-fill, offer acceptance rate, source mix",
      "Represent AI Brigade at university recruiting events and AI conferences",
    ],
    requirements: [
      "3+ years technical recruiting with a focus on ML/AI or data science talent",
      "Strong understanding of ML concepts; you can evaluate a resume without a hiring manager's help",
      "Experience sourcing through academic channels (arXiv authors, lab networks, conference speakers)",
      "Proficient with Greenhouse or Lever ATS and LinkedIn Recruiter",
      "Genuine enthusiasm for AI and ability to sell a compelling employer brand story",
    ],
    tags: ["Technical Recruiting", "Sourcing", "ML Talent", "Greenhouse", "Employer Brand", "LinkedIn Recruiter"],
  },
  {
    id: "ops-finance",
    title: "Senior Financial Analyst",
    category: "operations",
    location: "Remote (US)",
    type: "Full-time",
    level: "Senior",
    salary: "$115K – $150K",
    description: "Own FP&A, unit economics, and financial modeling for AI Brigade. Prepare board materials and support the Series B fundraising process.",
    responsibilities: [
      "Own annual planning and rolling quarterly forecasts across revenue and expense",
      "Build and maintain financial models tracking SaaS unit economics (LTV, CAC, NRR, payback)",
      "Prepare monthly board and investor reporting packages",
      "Partner with sales and CS on quota setting, comp plan modeling, and territory analysis",
      "Support Series B fundraising with financial due diligence and data room preparation",
    ],
    requirements: [
      "4+ years FP&A in a high-growth SaaS company",
      "Expert financial modeling in Excel and Google Sheets",
      "Strong understanding of SaaS metrics and recurring revenue dynamics",
      "Experience preparing board materials and investor presentations",
      "CPA or CFA designation is a plus",
    ],
    tags: ["FP&A", "Excel", "Financial Modeling", "SaaS Metrics", "Board Reporting", "Series B"],
  },
  {
    id: "ops-legal",
    title: "Legal & Compliance Counsel",
    category: "operations",
    location: "Remote (US)",
    type: "Full-time",
    level: "Senior",
    salary: "$185K – $230K",
    description: "Advise on AI-specific legal and regulatory matters — HIPAA, SOC 2, data privacy, and AI governance frameworks. Manage enterprise contract negotiations.",
    responsibilities: [
      "Review and negotiate enterprise MSAs, BAAs, DPAs, and professional services agreements",
      "Advise on HIPAA Privacy and Security Rule compliance for AI-enabled health systems",
      "Monitor evolving AI regulatory landscape (EU AI Act, FDA SaMD guidance, state privacy laws)",
      "Own data governance policies and privacy notices",
      "Partner with engineering on security incident response and breach notification procedures",
    ],
    requirements: [
      "JD with 5+ years in-house or law firm experience in technology transactions or healthcare law",
      "Deep knowledge of HIPAA, HITECH, and state privacy regulations",
      "Experience reviewing and negotiating enterprise software and services agreements",
      "Familiarity with AI governance frameworks and emerging AI regulation",
      "California bar admission preferred; active bar license in any US state required",
    ],
    tags: ["Healthcare Law", "HIPAA", "Data Privacy", "Contract Law", "AI Governance", "GDPR"],
  },
  {
    id: "ops-project",
    title: "Senior Project Manager — AI Delivery",
    category: "operations",
    location: "Remote (US)",
    type: "Full-time",
    level: "Senior",
    salary: "$110K – $145K",
    description: "Orchestrate complex, multi-team AI implementation projects for enterprise clients. Own timelines, risks, and client communication across 3–5 concurrent engagements.",
    responsibilities: [
      "Own project plans, milestones, and weekly status reporting for enterprise AI implementations",
      "Identify, document, and mitigate project risks before they become issues",
      "Facilitate cross-functional stand-ups, sprint reviews, and client steering committees",
      "Manage scope change processes and ensure change orders reflect commercial impact",
      "Contribute to delivery methodology improvements and playbook development",
    ],
    requirements: [
      "5+ years project management for software or data implementations",
      "PMP or equivalent certification preferred",
      "Experience managing technical projects involving ML/AI or data systems",
      "Strong client communication skills; you're the calmest person in a tough conversation",
      "Healthcare or financial services project experience is strongly preferred",
    ],
    tags: ["Project Management", "Agile", "Risk Management", "Client Communication", "JIRA", "PMP"],
  },
  {
    id: "ops-hrbp",
    title: "HR Business Partner",
    category: "operations",
    location: "Remote (US)",
    type: "Full-time",
    level: "Mid-Senior",
    salary: "$105K – $140K",
    description: "Act as strategic HR partner for engineering and research divisions. Own compensation benchmarking, employee relations, and organizational design.",
    responsibilities: [
      "Serve as the primary HR point of contact for 120+ engineers and researchers",
      "Conduct annual compensation benchmarking and equity refresh analysis",
      "Manage employee relations cases with discretion and in compliance with applicable law",
      "Partner with engineering and research leadership on org design and team structuring decisions",
      "Identify and address early signals of employee disengagement or attrition risk",
    ],
    requirements: [
      "5+ years HR business partner experience supporting technical teams",
      "Strong knowledge of US employment law and multi-state HR compliance",
      "Experience with compensation benchmarking tools (Radford, Levels.fyi, Carta Total Comp)",
      "Empathetic, trusted advisor with the confidence to give difficult feedback upward",
      "SHRM-CP or PHR certification is a plus",
    ],
    tags: ["HRBP", "Compensation", "ER", "Org Design", "Workday", "SHRM"],
  },
];

// ─────────────────────────────────────────────────────────
// Static data for server-rendered sections
// ─────────────────────────────────────────────────────────
const perks = [
  { icon: DollarSign,     color: "#00D4FF", title: "Top-of-Market Comp",   desc: "90th-percentile salaries + meaningful equity from day one." },
  { icon: Laptop,         color: "#9B4DFF", title: "Remote-First",          desc: "Work from anywhere in the US. Async by default." },
  { icon: HeartHandshake, color: "#00D4FF", title: "100% Benefits",         desc: "Medical, dental, vision — 100% covered for you and family." },
  { icon: Brain,          color: "#9B4DFF", title: "$3K Learning Stipend",  desc: "Courses, conferences, compute credits — annually." },
  { icon: Globe2,         color: "#00D4FF", title: "Real Impact",           desc: "Your code ships to Fortune 500 clients in weeks, not quarters." },
  { icon: Shield,         color: "#9B4DFF", title: "401k + 4% Match",       desc: "Vesting from day one. We invest in your future." },
];

const steps = [
  { n:"01", title:"Application Review",      body:"We read every application. You hear back within 3 business days.",         time:"≤ 3 days" },
  { n:"02", title:"Recruiter Screen",        body:"30-minute call on role fit, comp, and timeline. No pressure.",             time:"30 min"   },
  { n:"03", title:"Technical / Work Sample", body:"Focused take-home or live session. We pay $200 for take-home work.",       time:"2–3 hrs"  },
  { n:"04", title:"Team Interviews",         body:"3 conversations: technical depth, collaboration, values. Zero gotchas.",   time:"3–4 hrs"  },
  { n:"05", title:"Offer",                   body:"Decision within 48 hours. Full comp + equity breakdown. No surprises.",    time:"48 hrs"   },
];

// ─────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────
export default function CareersPage() {
  return (
    <>
      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-36 pb-28">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{background:"radial-gradient(ellipse 80% 60% at 50% -10%,rgba(0,212,255,0.18),transparent)"}}/>
          <div className="absolute inset-0" style={{background:"radial-gradient(ellipse 50% 50% at 80% 50%,rgba(155,77,255,0.14),transparent)"}}/>
          <div className="absolute inset-0 opacity-[0.35]" style={{
            backgroundImage:"linear-gradient(rgba(0,212,255,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.07) 1px,transparent 1px)",
            backgroundSize:"56px 56px",
          }}/>
          <GlowOrbs/>
        </div>

        <div className="container-custom relative">
          <Reveal>
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-10"
              style={{border:"1px solid rgba(0,212,255,0.35)",background:"rgba(0,212,255,0.08)",boxShadow:"0 0 24px rgba(0,212,255,0.15)"}}>
              <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" style={{boxShadow:"0 0 8px #00D4FF"}}/>
              <span className="text-[11px] font-mono font-700 tracking-[0.3em] uppercase text-[#00D4FF]">
                Now Hiring — {jobs.length} Open Roles
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-700 text-white leading-[1.04] mb-6 max-w-4xl"
              style={{fontSize:"clamp(2.6rem,6vw,5rem)",letterSpacing:"-0.02em"}}>
              Build AI that{" "}
              <span style={{
                background:"linear-gradient(135deg,#00D4FF 0%,#9B4DFF 50%,#C084FC 100%)",
                backgroundSize:"200% auto",
                WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
                animation:"gradient-shift 6s linear infinite",
              }}>
                matters
              </span>
              <br/>at AI Brigade
            </h1>

            <p className="text-[rgba(232,243,255,0.82)] leading-relaxed mb-10 max-w-2xl"
              style={{fontSize:"clamp(1.05rem,2vw,1.25rem)"}}>
              We don&apos;t do demos. We ship production AI to hospitals and financial institutions
              used by millions. Come do the most meaningful work of your career.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <Button variant="primary" size="lg" href="#open-roles" iconRight={<ArrowRight className="w-4 h-4"/>}>
                See Open Roles
              </Button>
              <Button variant="outline" size="lg" href="/contact">
                Reach Out Directly
              </Button>
            </div>

            {/* Stats strip */}
            <div className="flex flex-wrap gap-0 rounded-2xl overflow-hidden"
              style={{border:"1px solid rgba(255,255,255,0.08)",background:"rgba(13,18,40,0.7)",backdropFilter:"blur(12px)"}}>
              {[
                {v:"250+",       l:"Engineers"},
                {v:"Remote-First",l:"US-Wide"},
                {v:"Top-1%",     l:"Comp & Equity"},
                {v:"3 Days",     l:"Max Response"},
                {v:"$200",       l:"Paid Take-Home"},
              ].map(({v,l},i)=>(
                <div key={l} className="flex-1 min-w-[120px] px-6 py-5 relative"
                  style={{borderLeft:i>0?"1px solid rgba(255,255,255,0.07)":"none"}}>
                  <p className="font-display font-800 text-white text-xl leading-none mb-1"
                    style={{textShadow:"0 0 20px rgba(0,212,255,0.3)"}}>{v}</p>
                  <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-[rgba(232,243,255,0.38)]">{l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WHAT WE OFFER
      ══════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px" style={{background:"linear-gradient(90deg,transparent,rgba(155,77,255,0.35),transparent)"}}/>
        <div className="absolute inset-0" style={{background:"rgba(155,77,255,0.018)"}}/>

        <div className="container-custom relative">
          <Reveal className="mb-14">
            <p className="text-[11px] font-mono font-700 tracking-[0.32em] uppercase text-[rgba(232,243,255,0.5)] mb-4">
              What We Offer
            </p>
            <h2 className="font-display font-700 text-white leading-tight"
              style={{fontSize:"clamp(1.8rem,3.8vw,3rem)"}}>
              Grow with{" "}
              <span style={{background:"linear-gradient(135deg,#9B4DFF,#C084FC)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
                AI Brigade
              </span>
            </h2>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: GraduationCap, color: "#00D4FF", title: "Paid Internships",         desc: "Earn while you learn on real production systems alongside senior engineers." },
              { icon: Users,         color: "#9B4DFF", title: "Mentorship & Training",    desc: "Dedicated mentors and structured learning paths from day one." },
              { icon: TrendingUp,    color: "#00D4FF", title: "Career Growth",            desc: "Clear levelling frameworks with fast-track opportunities for high performers." },
              { icon: Briefcase,     color: "#9B4DFF", title: "Professional Environment", desc: "A culture of craft, accountability, and deep technical excellence." },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <StaggerItem key={p.title}>
                  <div className="group relative rounded-2xl p-7 h-full overflow-hidden transition-all duration-300 hover:-translate-y-1"
                    style={{
                      border:`1px solid ${p.color}20`,
                      background:"rgba(11,15,30,0.9)",
                      boxShadow:"0 4px 24px rgba(0,0,0,0.3)",
                    }}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                      style={{background:`radial-gradient(ellipse 80% 60% at 0% 0%,${p.color}0C,transparent)`}}/>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                      style={{background:`${p.color}15`,border:`1px solid ${p.color}35`,color:p.color,boxShadow:`0 0 20px ${p.color}18`}}>
                      <Icon className="w-5 h-5"/>
                    </div>
                    <h3 className="font-display font-700 text-white text-lg mb-2">{p.title}</h3>
                    <p className="text-[rgba(232,243,255,0.65)] text-sm leading-relaxed">{p.desc}</p>
                    <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{background:`linear-gradient(90deg,transparent,${p.color},transparent)`}}/>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PERKS
      ══════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px" style={{background:"linear-gradient(90deg,transparent,rgba(155,77,255,0.4),transparent)"}}/>
        <div className="absolute inset-0" style={{background:"rgba(155,77,255,0.025)"}}/>

        <div className="container-custom relative">
          <Reveal className="mb-14">
            <p className="text-[11px] font-mono font-700 tracking-[0.32em] uppercase text-[rgba(232,243,255,0.5)] mb-4">
              Why AI Brigade
            </p>
            <h2 className="font-display font-700 text-white leading-tight"
              style={{fontSize:"clamp(1.8rem,3.8vw,3rem)"}}>
              Benefits built for{" "}
              <span style={{background:"linear-gradient(135deg,#00D4FF,#C084FC)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
                exceptional people
              </span>
            </h2>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {perks.map((p) => {
              const Icon = p.icon;
              return (
                <StaggerItem key={p.title}>
                  <div className="group relative rounded-2xl p-7 h-full overflow-hidden transition-all duration-300 hover:-translate-y-1"
                    style={{
                      border:`1px solid ${p.color}20`,
                      background:"rgba(11,15,30,0.9)",
                      boxShadow:"0 4px 24px rgba(0,0,0,0.3)",
                    }}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                      style={{background:`radial-gradient(ellipse 80% 60% at 0% 0%,${p.color}0C,transparent)`}}/>
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                      style={{background:`${p.color}15`,border:`1px solid ${p.color}35`,color:p.color,boxShadow:`0 0 20px ${p.color}18`}}>
                      <Icon className="w-5 h-5"/>
                    </div>
                    <h3 className="font-display font-700 text-white text-lg mb-2">{p.title}</h3>
                    <p className="text-[rgba(232,243,255,0.65)] text-sm leading-relaxed">{p.desc}</p>
                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{background:`linear-gradient(90deg,transparent,${p.color},transparent)`}}/>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          HIRING PROCESS
      ══════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px" style={{background:"linear-gradient(90deg,transparent,rgba(0,212,255,0.25),transparent)"}}/>

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left copy */}
            <Reveal>
              <p className="text-[11px] font-mono font-700 tracking-[0.32em] uppercase text-[rgba(232,243,255,0.5)] mb-4">
                Hiring Process
              </p>
              <h2 className="font-display font-700 text-white leading-tight mb-6"
                style={{fontSize:"clamp(1.8rem,3.8vw,3rem)"}}>
                Transparent.<br/>
                <span style={{background:"linear-gradient(135deg,#00D4FF,#9B4DFF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
                  No black holes.
                </span>
              </h2>
              <p className="text-[rgba(232,243,255,0.65)] text-base leading-relaxed mb-8">
                We believe your time is valuable. Every applicant gets a response.
                Every take-home is compensated. Decisions happen fast.
              </p>
              {/* Quote card */}
              <div className="rounded-2xl p-6" style={{background:"rgba(0,212,255,0.07)",border:"1px solid rgba(0,212,255,0.2)"}}>
                <p className="text-[rgba(232,243,255,0.8)] text-sm leading-relaxed italic mb-3">
                  &ldquo;Best interview process I&apos;ve been through. Response same day,
                  no trick questions, full comp transparency upfront.&rdquo;
                </p>
                <p className="text-[11px] font-mono text-[rgba(232,243,255,0.4)] tracking-wider">
                  — Senior ML Engineer, hired 2024
                </p>
              </div>
            </Reveal>

            {/* Right steps */}
            <div className="relative">
              <div className="absolute left-6 top-6 bottom-6 w-px"
                style={{background:"linear-gradient(to bottom,rgba(0,212,255,0.5),rgba(155,77,255,0.5))"}}/>
              <div className="space-y-4">
                {steps.map((s,i)=>(
                  <Reveal key={s.n} delay={i*0.07}>
                    <div className="relative pl-16">
                      {/* Step circle */}
                      <div className="absolute left-4 top-4 w-4 h-4 rounded-full -translate-x-1/2 flex items-center justify-center"
                        style={{
                          background:i%2===0?"rgba(0,212,255,0.2)":"rgba(155,77,255,0.2)",
                          border:`1.5px solid ${i%2===0?"rgba(0,212,255,0.8)":"rgba(155,77,255,0.8)"}`,
                          boxShadow:`0 0 12px ${i%2===0?"rgba(0,212,255,0.5)":"rgba(155,77,255,0.5)"}`,
                        }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{background:i%2===0?"#00D4FF":"#C084FC"}}/>
                      </div>
                      <div className="rounded-xl p-5"
                        style={{border:"1px solid rgba(255,255,255,0.08)",background:"rgba(11,15,30,0.9)"}}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2.5">
                            <span className="text-[10px] font-mono font-700 px-2 py-0.5 rounded-md"
                              style={{
                                background:i%2===0?"rgba(0,212,255,0.12)":"rgba(155,77,255,0.12)",
                                color:i%2===0?"#00D4FF":"#C084FC",
                              }}>{s.n}</span>
                            <span className="font-display font-700 text-white text-sm">{s.title}</span>
                          </div>
                          <span className="text-[10px] font-mono text-[rgba(232,243,255,0.35)] flex-shrink-0 ml-4">{s.time}</span>
                        </div>
                        <p className="text-[rgba(232,243,255,0.62)] text-xs leading-relaxed">{s.body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          INTERACTIVE JOB BOARD (client component)
      ══════════════════════════════════════════════ */}
      <section className="relative py-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-px" style={{background:"linear-gradient(90deg,transparent,rgba(0,212,255,0.4),transparent)"}}/>
          <div className="absolute inset-0" style={{background:"radial-gradient(ellipse 60% 40% at 50% 0%,rgba(0,212,255,0.07),transparent)"}}/>
          <div className="absolute inset-0 opacity-25" style={{
            backgroundImage:"linear-gradient(rgba(0,212,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.05) 1px,transparent 1px)",
            backgroundSize:"48px 48px",
          }}/>
        </div>

        <div className="container-custom relative">
          <Reveal>
            {/* Section label */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full"
                style={{background:"rgba(0,212,255,0.08)",border:"1px solid rgba(0,212,255,0.3)",boxShadow:"0 0 20px rgba(0,212,255,0.1)"}}>
                <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" style={{boxShadow:"0 0 8px #00D4FF"}}/>
                <span className="text-[11px] font-mono font-700 tracking-[0.28em] uppercase text-[#00D4FF]">
                  Open Positions
                </span>
              </div>
              <div className="flex-1 h-px" style={{background:"linear-gradient(90deg,rgba(0,212,255,0.4),transparent)"}}/>
            </div>

            {/* Headline */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
              <div>
                <h2 className="font-display font-700 text-white leading-[1.05] mb-3"
                  style={{fontSize:"clamp(2rem,4.5vw,3.5rem)",letterSpacing:"-0.02em"}}>
                  {jobs.length} open roles across{" "}
                  <span style={{
                    background:"linear-gradient(135deg,#00D4FF 0%,#9B4DFF 60%,#C084FC 100%)",
                    backgroundSize:"200% auto",
                    WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
                    animation:"gradient-shift 6s linear infinite",
                  }}>
                    5 disciplines
                  </span>
                </h2>
                <p className="text-[rgba(232,243,255,0.6)] text-base leading-relaxed max-w-xl">
                  Filter by team, search by skill or level, then click any role to read the full description and apply in minutes.
                </p>
              </div>

              {/* Category count pills */}
              <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end shrink-0">
                {[
                  {label:"Engineering",  color:"#00D4FF", count:12},
                  {label:"AI Research",  color:"#9B4DFF", count:9 },
                  {label:"Product",      color:"#00D4FF", count:7 },
                  {label:"Business",     color:"#C084FC", count:8 },
                  {label:"Operations",   color:"#9B4DFF", count:6 },
                ].map(c=>(
                  <div key={c.label} className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-700 tracking-[0.18em] uppercase"
                      style={{color:"rgba(232,243,255,0.45)"}}>
                      {c.label}
                    </span>
                    <span className="text-[11px] font-mono font-700 px-2 py-0.5 rounded-md min-w-[28px] text-center"
                      style={{background:`${c.color}15`,border:`1px solid ${c.color}30`,color:c.color}}>
                      {c.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Job board */}
        <CareersClient jobs={jobs} />
      </section>

      {/* ══════════════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        {/* Rich background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{background:"radial-gradient(ellipse 80% 80% at 50% 100%,rgba(155,77,255,0.18),transparent)"}}/>
          <div className="absolute inset-0" style={{background:"radial-gradient(ellipse 50% 50% at 20% 50%,rgba(0,212,255,0.07),transparent)"}}/>
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage:"linear-gradient(rgba(155,77,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(155,77,255,0.08) 1px,transparent 1px)",
            backgroundSize:"48px 48px",
          }}/>
          <div className="absolute inset-x-0 top-0 h-px" style={{background:"linear-gradient(90deg,transparent,rgba(155,77,255,0.5),rgba(0,212,255,0.3),transparent)"}}/>
        </div>

        <div className="container-custom relative">
          <Reveal>
            {/* Two-column layout */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* Left — copy */}
              <div>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
                  style={{background:"rgba(155,77,255,0.1)",border:"1px solid rgba(155,77,255,0.35)",boxShadow:"0 0 24px rgba(155,77,255,0.15)"}}>
                  <Sparkles className="w-3.5 h-3.5 text-[#C084FC]"/>
                  <span className="text-[11px] font-mono font-700 tracking-[0.25em] uppercase text-[#C084FC]">
                    Don&apos;t see the right role?
                  </span>
                </div>

                <h2 className="font-display font-700 text-white leading-[1.05] mb-6"
                  style={{fontSize:"clamp(2rem,4.5vw,3.6rem)",letterSpacing:"-0.02em"}}>
                  We hire for{" "}
                  <span style={{
                    background:"linear-gradient(135deg,#00D4FF,#9B4DFF,#C084FC)",
                    backgroundSize:"200% auto",
                    WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
                    animation:"gradient-shift 6s linear infinite",
                  }}>talent</span>,<br/>
                  not just openings
                </h2>

                <p className="text-[rgba(232,243,255,0.68)] text-lg leading-relaxed mb-10 max-w-lg">
                  Exceptional people always have a home here. If you raise our bar,
                  we&apos;ll create the right role for you. Reach out directly.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" size="lg" href="mailto:careers@aibrigade.ai" iconRight={<ArrowRight className="w-4 h-4"/>}>
                    Send Us Your Resume
                  </Button>
                  <Button variant="outline" size="lg" href="/about">
                    Our Mission
                  </Button>
                </div>
              </div>

              {/* Right — trust card */}
              <div className="rounded-2xl overflow-hidden"
                style={{
                  background:"rgba(10,13,26,0.95)",
                  border:"1px solid rgba(255,255,255,0.09)",
                  boxShadow:"0 0 0 1px rgba(255,255,255,0.03),0 32px 80px rgba(0,0,0,0.5)",
                }}>
                {/* Card header */}
                <div className="px-7 py-5 border-b border-[rgba(255,255,255,0.07)]"
                  style={{background:"linear-gradient(90deg,rgba(155,77,255,0.08),transparent)"}}>
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#C084FC]" style={{boxShadow:"0 0 8px #C084FC"}}/>
                    <span className="text-[11px] font-mono font-700 tracking-[0.25em] uppercase text-[rgba(232,243,255,0.5)]">
                      What candidates say
                    </span>
                  </div>
                </div>

                {/* Testimonials */}
                <div className="divide-y divide-[rgba(255,255,255,0.06)]">
                  {[
                    { quote:"Best interview process I've been through. Response same day, full comp transparency upfront.", name:"Senior ML Engineer", year:"Hired 2024", color:"#00D4FF" },
                    { quote:"They created a role specifically for my background in clinical AI. I've never seen a company do that.", name:"Healthcare AI Researcher", year:"Hired 2024", color:"#C084FC" },
                    { quote:"Shipped code that went to production at a major hospital system within my first 30 days.", name:"Backend Engineer", year:"Hired 2023", color:"#00D4FF" },
                  ].map((t,i)=>(
                    <div key={i} className="px-7 py-6">
                      <p className="text-[rgba(232,243,255,0.75)] text-sm leading-relaxed mb-4 italic">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-display font-700 text-sm"
                          style={{background:`${t.color}15`,border:`1px solid ${t.color}30`,color:t.color}}>
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white text-xs font-600">{t.name}</p>
                          <p className="text-[rgba(232,243,255,0.35)] text-[10px] font-mono">{t.year}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
