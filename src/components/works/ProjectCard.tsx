
import React from 'react';

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, category, image, description, tags }) => {
  return (
    <div
      className="group relative w-full h-[400px] rounded-2xl overflow-hidden cursor-pointer transform-gpu"
      style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500" />

      {/* Content Container */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        {/* Top Info */}
        <div className="transform translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-white/20 backdrop-blur-md rounded-full border border-white/10">
            {category}
          </span>
        </div>

        {/* Bottom Info */}
        <div className="transform translate-y-[20px] group-hover:translate-y-0 transition-all duration-500 ease-out">
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/80 text-sm mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs text-white/70 bg-black/30 px-2 py-1 rounded backdrop-blur-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hover Border/Glow Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-2xl transition-colors duration-500 pointer-events-none" />
    </div>
  );
};
