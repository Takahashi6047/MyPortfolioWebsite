import { projects } from '../../data/projects';

export function StickyWorksOverlay() {
  const lastProject = projects[projects.length - 1];
  const titleWords = lastProject.title.split(' ');

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-10 overflow-hidden">
      <div className="w-full h-full bg-background flex relative">
        {/* Grid background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          {/* Faded edges */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
        </div>

        {/* Left Column - Project Info */}
        <div className="w-1/2 h-screen flex flex-col justify-center px-12 md:px-20 py-20 bg-transparent relative z-10">
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-accent/30 blur-[80px]" />
          </div>

          <div className="max-w-xl ml-auto mr-8">
            <span className="text-sm font-bold tracking-widest text-foreground/50 uppercase mb-12 block font-sans">
              Selected Works
            </span>
            <div className="text-xl font-mono mb-4 text-foreground/80">
              0{projects.length} / 0{projects.length}
            </div>
            <h1 className="text-6xl xl:text-7xl font-bold tracking-tight font-sans leading-[1.1] mb-6">
              {titleWords.map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h1>
            <div className="flex items-center gap-4 mb-8 text-foreground/60 text-lg uppercase tracking-widest border-b border-foreground/10 pb-4 font-sans">
              <span>{lastProject.category}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
              <span>{lastProject.year}</span>
            </div>
            <p className="text-xl text-foreground/80 font-light leading-relaxed mb-8 font-sans">
              {lastProject.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {lastProject.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-2 text-sm bg-accent/50 text-foreground/90 rounded-full font-sans border border-transparent"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Project Image */}
        <div className="w-1/2 h-screen flex items-center justify-center p-20 relative z-10">
          <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={lastProject.image}
              alt={lastProject.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
