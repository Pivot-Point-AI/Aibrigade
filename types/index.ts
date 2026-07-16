// Project / Case Study
export interface Project {
  id: string;
  slug: string;
  title: string;
  industry: "fintech" | "healthtech" | "ai-platform";
  category: string;
  client: string;
  year: number;
  duration: string;
  featured: boolean;
  thumbnail: string;
  tags: string[];
  problem: string;
  solution: string;
  techStack: string[];
  outcomes: Outcome[];
  testimonial?: Testimonial;
}

export interface Outcome {
  metric: string;
  value: string;
  description: string;
}

// Testimonial
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
  industry: string;
}

/** Market context shown inside the same practice-area card (landing + services) */
export interface IndustrySpotlight {
  industry: string;
  focus: string;
  metric: string;
}

// Service
export interface Service {
  id: string;
  title: string;
  slug: string;
  category: string;
  icon: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  useCases: string[];
  techHighlights: string[];
  color: "cyan" | "violet" | "gold";
  industrySpotlight: IndustrySpotlight;
}

// Team Member
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  linkedin?: string;
  twitter?: string;
}

// Navigation
export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

// Form
export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  industry: string;
  message: string;
  budget?: string;
}

// API Response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Blog
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  coverImage?: string;
  author: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}
