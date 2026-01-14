export interface Project {
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  year: string;
}

export const projects: Project[] = [
  {
    title: "Assessment Management System",
    category: "Web Application",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    description: "A comprehensive financial data visualization platform with real-time analytics and predictive modeling.",
    tags: ["Vue.js", "Laravel", "Tailwind", "Postgres"],
    year: "2024"
  },
  {
    title: "Neon Commerce",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1555421689-492a80695629?q=80&w=2670&auto=format&fit=crop",
    description: "Modern e-commerce solution featuring 3D product previews and AI-driven recommendations.",
    tags: ["Next.js", "Three.js", "Stripe", "Tailwind"],
    year: "2023"
  },
  {
    title: "Cyber Security Hub",
    category: "Enterprise Security",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
    description: "Advanced threat detection interface for enterprise networks with automated response systems.",
    tags: ["Vue.js", "Python", "WebSockets", "Docker"],
    year: "2023"
  },
  {
    title: "Smart City Grid",
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2669&auto=format&fit=crop",
    description: "IoT connectivity platform for managing smart city infrastructure and energy consumption.",
    tags: ["Go", "GraphQL", "PostgreSQL", "Flutter"],
    year: "2022"
  }
];
