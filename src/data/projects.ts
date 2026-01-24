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
    image: "assets/projects/assesync/dashboard.png",
    description: "A comprehensive assessment management system for educational institutions, streamlining test creation, grading workflows, and student performance analytics.",
    tags: ["Vue.js", "Laravel", "Tailwind", "Postgres"],
    year: "2026",
  },
  {
    title: "ArtCoded Portfolio",
    category: "Portfolio",
    image: "/assets/projects/artcoded/hero.png",
    description: "A creative portfolio showcasing the intersection of development and artistry, featuring dynamic dual-theme switching, particle animations, and immersive visual experiences.",
    tags: ["React", "Vite", "Tailwind", "Framer Motion"],
    year: "2026",
  },
  {
    title: "BarnStone Portfolio",
    category: "Portfolio",
    image: "/assets/projects/barnstone/hero.png",
    description: "A professional portfolio website with modern design aesthetics, smooth animations, and responsive layouts built for optimal user experience.",
    tags: ["React", "Vite", "Tailwind", "Framer Motion"],
    year: "2026",
  }
];

