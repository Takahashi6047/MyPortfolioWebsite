export interface Project {
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  year: string;
  slug?: string; // URL-friendly identifier for routing
}

export const projects: Project[] = [
  {
    title: "Assessment Management System",
    category: "Web Application",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    description: "A comprehensive financial data visualization platform with real-time analytics and predictive modeling.",
    tags: ["Vue.js", "Laravel", "Tailwind", "Postgres"],
    year: "2026",
    slug: "assessment-management-system"
  },
  {
    title: "ArtCoded Portfolio",
    category: "Portfolio",
    image: "/assets/projects/artcoded/hero.png",
    description: "Modern e-commerce solution featuring 3D product previews and AI-driven recommendations.",
    tags: ["React", "Vite", "Tailwind", "Framer Motion"],
    year: "2026",
    slug: "artcoded-portfolio"
  },
  {
    title: "BarnStone Portfolio",
    category: "Portfolio",
    image: "/assets/projects/barnstone/hero.png",
    description: "Advanced threat detection interface for enterprise networks with automated response systems.",
    tags: ["Vue.js", "Python", "WebSockets", "Docker"],
    year: "2026",
    slug: "barnstone-portfolio"
  }
];

