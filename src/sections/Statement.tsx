import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useTheme } from '../global/overlay/themeOverlay/RippleContext';
import { useCursor } from '../global/cursor';
import Matter from 'matter-js';

export function Statement() {
    const { theme } = useTheme();
    const isArtMode = theme === 'dark';
    const containerRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const { setCursorText, setCursorVariant } = useCursor();
    
    const [physicsStarted, setPhysicsStarted] = useState(false);
    
    const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
    const engineRef = useRef<Matter.Engine | null>(null);
    const bodiesRef = useRef<Matter.Body[]>([]);
    const initialPositionsRef = useRef<{ x: number; y: number; w: number; h: number }[]>([]);
    const mousePositionRef = useRef({ x: 0, y: 0 });
    const animFrameRef = useRef<number>(0);

    const isLightParams = !isArtMode;

    // Scroll progress for the pinned section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Debug scroll and trigger physics
    useMotionValueEvent(scrollYProgress, "change", (v) => {
        console.log("Scroll progress:", v);
        
        // Start physics at 5% scroll
        if (v > 0.05 && !physicsStarted && !engineRef.current) {
            console.log("Initializing physics...");
            initPhysics();
        }

        if (!engineRef.current) return;

        // Gravity increases with scroll
        const gravityStrength = Math.max(0, (v - 0.05) / 0.3) * 2;
        engineRef.current.gravity.y = Math.min(gravityStrength, 2);

        // Make bodies dynamic once gravity kicks in
        if (v > 0.1 && bodiesRef.current.length > 0) {
            bodiesRef.current.forEach((body) => {
                if (body.isStatic) {
                    console.log("Making body dynamic");
                    Matter.Body.setStatic(body, false);
                    Matter.Body.applyForce(body, body.position, {
                        x: (Math.random() - 0.5) * 0.005,
                        y: 0
                    });
                }
            });
        }
    });

    // Track mouse for repulsion
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!stickyRef.current) return;
            const rect = stickyRef.current.getBoundingClientRect();
            mousePositionRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Initialize physics
    const initPhysics = () => {
        if (physicsStarted || !stickyRef.current || !textContainerRef.current) {
            console.log("Cannot init physics:", { physicsStarted, stickyRef: !!stickyRef.current, textContainerRef: !!textContainerRef.current });
            return;
        }
        
        console.log("Physics initializing...");
        setPhysicsStarted(true);

        const engine = Matter.Engine.create();
        engine.gravity.y = 0;
        engineRef.current = engine;

        const stickyRect = stickyRef.current.getBoundingClientRect();
        const width = stickyRect.width;
        const height = stickyRect.height;
        
        console.log("Container size:", width, height);

        // Walls
        const ground = Matter.Bodies.rectangle(width / 2, height + 30, width + 200, 60, { isStatic: true });
        const leftWall = Matter.Bodies.rectangle(-30, height / 2, 60, height * 2, { isStatic: true });
        const rightWall = Matter.Bodies.rectangle(width + 30, height / 2, 60, height * 2, { isStatic: true });
        Matter.Composite.add(engine.world, [ground, leftWall, rightWall]);

        // Get letter positions BEFORE any style changes
        const positions: { x: number; y: number; w: number; h: number }[] = [];
        lettersRef.current.forEach((el) => {
            if (!el) return;
            const r = el.getBoundingClientRect();
            positions.push({
                x: r.left - stickyRect.left + r.width / 2,
                y: r.top - stickyRect.top + r.height / 2,
                w: r.width,
                h: r.height
            });
        });
        initialPositionsRef.current = positions;
        
        console.log("Letter count:", positions.length);

        // Create bodies for ALL letters first
        const bodies: Matter.Body[] = [];
        positions.forEach((p, i) => {
            const body = Matter.Bodies.rectangle(p.x, p.y, p.w, p.h, {
                restitution: 0.4,
                friction: 0.3,
                frictionAir: 0.01,
                isStatic: true
            });
            (body as any).idx = i;
            bodies.push(body);
        });
        Matter.Composite.add(engine.world, bodies);
        bodiesRef.current = bodies;
        
        console.log("Bodies created:", bodies.length);

        // NOW switch all letters to absolute positioning
        // This must happen AFTER we've captured all positions
        lettersRef.current.forEach((el, i) => {
            if (el && positions[i]) {
                const p = positions[i];
                // Set fixed dimensions
                el.style.width = `${p.w}px`;
                el.style.height = `${p.h}px`;
                // Switch to absolute - positioned relative to stickyRef
                el.style.position = 'fixed';
                el.style.left = `${stickyRect.left}px`;
                el.style.top = `${stickyRect.top}px`;
                el.style.margin = '0';
                el.style.transform = `translate3d(${p.x - p.w / 2}px, ${p.y - p.h / 2}px, 0)`;
                el.style.zIndex = '100';
            }
        });

        // Physics loop
        const loop = () => {
            if (!engineRef.current) return;
            
            Matter.Engine.update(engine, 1000 / 60);

            // Cursor repulsion
            const mouse = mousePositionRef.current;
            bodies.forEach((body) => {
                if (body.isStatic) return;
                const dx = body.position.x - mouse.x;
                const dy = body.position.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150 && dist > 0) {
                    const force = (1 - dist / 150) * 0.008;
                    Matter.Body.applyForce(body, body.position, {
                        x: (dx / dist) * force,
                        y: (dy / dist) * force
                    });
                }
            });

            // Sync DOM - use the current stickyRef position for fixed elements
            const currentStickyRect = stickyRef.current?.getBoundingClientRect();
            if (!currentStickyRect) return;
            
            bodies.forEach((body) => {
                const i = (body as any).idx;
                const el = lettersRef.current[i];
                const p = initialPositionsRef.current[i];
                if (el && p) {
                    el.style.left = `${currentStickyRect.left}px`;
                    el.style.top = `${currentStickyRect.top}px`;
                    el.style.transform = `translate3d(${body.position.x - p.w / 2}px, ${body.position.y - p.h / 2}px, 0) rotate(${body.angle}rad)`;
                }
            });

            animFrameRef.current = requestAnimationFrame(loop);
        };
        loop();
        console.log("Physics loop started");
    };

    // Cleanup
    useEffect(() => {
        return () => {
            cancelAnimationFrame(animFrameRef.current);
            if (engineRef.current) {
                Matter.World.clear(engineRef.current.world, false);
                Matter.Engine.clear(engineRef.current);
                engineRef.current = null;
            }
            setPhysicsStarted(false);
            bodiesRef.current = [];
            lettersRef.current.forEach(el => {
                if (el) {
                    el.style.transform = '';
                    el.style.position = '';
                    el.style.left = '';
                    el.style.top = '';
                    el.style.width = '';
                    el.style.height = '';
                    el.style.margin = '';
                    el.style.zIndex = '';
                }
            });
        };
    }, [theme]);

    // Text segments - each line is a separate segment for proper line breaks
    const lines = isArtMode
        ? [
            [{ text: "DESIGN", type: 'highlight' }],
            [{ text: "IS NOT JUST", type: 'muted' }],
            [{ text: "VISUALS, BUT A", type: 'muted' }],
            [{ text: "VESSEL", type: 'highlight' }, { text: " FOR HUMAN", type: 'muted' }],
            [{ text: "CONNECTION.", type: 'highlight' }],
        ]
        : [
            [{ text: "CODE", type: 'highlight' }],
            [{ text: "IS NOT JUST", type: 'muted' }],
            [{ text: "SYNTAX, BUT THE", type: 'muted' }, { text: " A", type: 'highlight' }],
            [{ text: "RCHITECTURE", type: 'highlight' }, { text: " OF", type: 'muted' }],
            [{ text: "INNOVATION.", type: 'highlight' }],
        ];

    return (
        <section
            ref={containerRef}
            className="relative z-20"
            style={{ height: '250vh' }}
        >
            <div 
                ref={stickyRef}
                className={`sticky top-0 h-screen flex flex-col justify-start pt-[12vh] px-6 md:px-12 lg:px-20 overflow-hidden transition-colors duration-1000
                ${isArtMode ? 'bg-[#0a0a0a] text-white' : 'bg-neutral-50 text-neutral-900'}`}
            >
                {/* Background Texture */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
                    <div className={`absolute inset-0 bg-[url("https://grainy-gradients.vercel.app/noise.svg")] ${isLightParams && 'invert'} mix-blend-overlay`} />
                </div>

                {/* Top UI */}
                <div className="absolute top-8 w-full left-0 flex justify-between px-6 md:px-12 lg:px-20 z-30 pointer-events-none">
                    <div className={`flex items-center gap-4 text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase opacity-50 
                         ${isArtMode ? 'text-white' : 'text-neutral-900'}`}>
                        <span>[ 002 ]</span>
                        <span className="hidden md:inline-block">[ STATEMENT ]</span>
                    </div>

                    <motion.div 
                        className={`px-4 py-2 border rounded-full text-[10px] font-mono uppercase tracking-widest pointer-events-auto
                        ${isArtMode ? 'border-white/20 text-white' : 'border-black/20 text-black'}`}
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
                    >
                        SCROLL TO DROP
                    </motion.div>

                    <div className={`text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase opacity-50
                        ${isArtMode ? 'text-white' : 'text-neutral-900'}`}>
                        {isArtMode ? 'DSGN / ART' : 'DEV / ENG'}
                    </div>
                </div>

                {/* Main content */}
                <div className="w-full relative z-10">
                    <div className="mb-4 md:mb-6 select-none pointer-events-none">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className={`block text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase opacity-70
                            ${isArtMode ? 'text-amber-500' : 'text-blue-600'}`}
                        >
                            /// THE PHILOSOPHY
                        </motion.span>
                    </div>

                    {/* Letters container - LEFT ALIGNED */}
                    <div
                        ref={textContainerRef}
                        className="relative"
                        style={{ minHeight: '60vh' }}
                        onMouseEnter={() => {
                            setCursorText("PUSH");
                            setCursorVariant("text");
                        }}
                        onMouseLeave={() => {
                            setCursorText("");
                            setCursorVariant("default");
                        }}
                    >
                        {/* Render lines */}
                        <div 
                            className="font-black uppercase"
                            style={{
                                fontFamily: '"Inter", sans-serif',
                                fontSize: 'clamp(2.5rem, 8vw, 8rem)',
                                lineHeight: 1,
                                letterSpacing: '-0.04em',
                            }}
                        >
                            {(() => {
                                let letterIndex = 0;
                                return lines.map((line, lineIdx) => (
                                    <div key={lineIdx} className="block whitespace-nowrap">
                                        {line.map((segment, segIdx) => (
                                            <span key={segIdx}>
                                                {segment.text.split('').map((char, charIdx) => {
                                                    if (char === ' ') {
                                                        return <span key={`${segIdx}-${charIdx}`} style={{ display: 'inline', letterSpacing: '0.15em' }}>&nbsp;</span>;
                                                    }
                                                    
                                                    const idx = letterIndex++;
                                                    const isHighlight = segment.type === 'highlight';
                                                    const colorClass = isHighlight 
                                                        ? (isArtMode ? 'text-white' : 'text-neutral-900')
                                                        : (isArtMode ? 'text-neutral-500' : 'text-neutral-400');
                                                    
                                                    return (
                                                        <span
                                                            key={`${segIdx}-${charIdx}`}
                                                            ref={el => { lettersRef.current[idx] = el; }}
                                                            className={`inline-block select-none ${colorClass}`}
                                                            style={{ 
                                                                opacity: isHighlight ? 1 : 0.35,
                                                                fontStyle: !isHighlight ? 'italic' : 'normal',
                                                                marginRight: '-0.02em',
                                                            }}
                                                        >
                                                            {char}
                                                        </span>
                                                    );
                                                })}
                                            </span>
                                        ))}
                                    </div>
                                ));
                            })()}
                        </div>
                    </div>
                </div>

                {/* Bottom text */}
                <div className="absolute bottom-12 left-6 md:left-12 lg:left-20 text-[10px] font-mono tracking-widest opacity-30 select-none">
                    {physicsStarted ? "MOVE CURSOR TO PUSH" : "SCROLL TO REVEAL"}
                </div>
            </div>
        </section>
    );
}
