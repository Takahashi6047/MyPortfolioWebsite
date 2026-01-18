import { useEffect, useRef } from "react";
import { useTheme } from "../global/overlay/themeOverlay/RippleContext";

// Define a reusable object structure for sorting
// Keeping it outside component to avoid reallocation if possible, or just define interface
interface RenderParticle {
    x: number;
    y: number;
    size: number;
    alpha: number;
    color: string;
    z: number;
}

export function TransitionMarquee() {
    const { theme } = useTheme();
    const isArtMode = theme === 'dark';
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        // Configuration
        const particleCount = 2000;

        // Physics/State Arrays
        const xCoords = new Float32Array(particleCount);
        const radii = new Float32Array(particleCount); // Distance from center spine
        const phases = new Float32Array(particleCount); // Angle offset
        const speedOffsets = new Float32Array(particleCount);
        const baseSizes = new Float32Array(particleCount);
        const baseOpacities = new Float32Array(particleCount);

        // Pre-allocate render buffer to avoid GC pressure
        const drawBuffer: RenderParticle[] = new Array(particleCount);
        for (let i = 0; i < particleCount; i++) {
            drawBuffer[i] = { x: 0, y: 0, size: 0, alpha: 0, color: "", z: 0 };
        }

        // Initialize
        const initParticles = (width: number) => {
            for (let i = 0; i < particleCount; i++) {
                xCoords[i] = Math.random() * width;

                // Volume Distribution: Mix of core (dense) and outer shell (volume)
                // Using a power curve to put more particles in the "cloud" body
                const r = Math.random();
                radii[i] = (r * r) * 60 + 10; // Min radius 10, max 70

                phases[i] = Math.random() * Math.PI * 2;
                speedOffsets[i] = Math.random() * 0.5 + 0.5;
                baseSizes[i] = Math.random() * 2.0 + 0.5;
                baseOpacities[i] = Math.random() * 0.5 + 0.5;
            }
        };

        const resize = () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
            initParticles(canvas.width);
        };

        window.addEventListener("resize", resize);
        resize();

        const render = () => {
            time += 0.02; // Rotation speed

            const width = canvas.width;
            const height = canvas.height;
            const centerY = height / 2;

            ctx.clearRect(0, 0, width, height);

            // Theme Constants
            const baseColor = isArtMode ? "#FFFFFF" : "#000000";
            const accentColor = isArtMode ? "#EAB308" : "#3B82F6";
            const splitIndex = Math.floor(particleCount * 0.85);

            // 1. Update & Project (3D -> 2D)
            const perspectiveStrength = 400; // Lower = stronger FOV

            // Draw Harmonic Lines (Continuous "Data Cables")
            const drawHarmonics = () => {
                // Line 1: Accent Color (The main data thread)
                ctx.beginPath();
                ctx.strokeStyle = accentColor;
                ctx.lineWidth = 1.5;
                ctx.globalAlpha = 0.5;

                for (let x = 0; x <= width; x += 10) {
                    // Match particle rotation logic:
                    // rotAngle = (x * 0.005) + time + phase
                    const rotAngle = (x * 0.005) + time;
                    const spineY = Math.sin(x * 0.003 + time * 0.5) * 40;

                    const radius = 50; // Slightly tighter than max particle radius (70)
                    const rotY = Math.sin(rotAngle) * radius;
                    const rotZ = Math.cos(rotAngle) * radius;

                    // Apply same perspective
                    const scale = perspectiveStrength / (perspectiveStrength + rotZ);
                    const screenY = centerY + spineY + (rotY * scale);

                    if (x === 0) ctx.moveTo(x, screenY);
                    else ctx.lineTo(x, screenY);
                }
                ctx.stroke();

                // Line 2: Base Color (The supporting structure, out of phase)
                ctx.beginPath();
                ctx.strokeStyle = baseColor;
                ctx.lineWidth = 0.5;
                ctx.globalAlpha = 0.15;

                for (let x = 0; x <= width; x += 10) {
                    const rotAngle = (x * 0.005) + time + Math.PI; // 180 degrees out of phase
                    const spineY = Math.sin(x * 0.003 + time * 0.5) * 40;

                    const radius = 50;
                    const rotY = Math.sin(rotAngle) * radius;
                    const rotZ = Math.cos(rotAngle) * radius;
                    const scale = perspectiveStrength / (perspectiveStrength + rotZ);
                    const screenY = centerY + spineY + (rotY * scale);

                    if (x === 0) ctx.moveTo(x, screenY);
                    else ctx.lineTo(x, screenY);
                }
                ctx.stroke();
                ctx.globalAlpha = 1.0;
            };

            drawHarmonics();

            for (let i = 0; i < particleCount; i++) {
                // Move X
                xCoords[i] += 0.2 * speedOffsets[i];
                if (xCoords[i] > width) xCoords[i] = -50;

                // Current 3D Rotation state
                // "Tube" rotation: changes with X and Time
                const rotAngle = (xCoords[i] * 0.005) + time + phases[i];

                // 3D Coordinates relative to Spine
                // Spine adds the wavey "snake" shape
                const spineY = Math.sin(xCoords[i] * 0.003 + time * 0.5) * 40;

                const yRel = Math.sin(rotAngle) * radii[i];
                const zRel = Math.cos(rotAngle) * radii[i]; // Z Depth (-radius to +radius)

                // Perspective Scale
                // Simple camera projection: scale = focal_length / (focal_length + z)
                // We shift Z so it's always positive-ish relative to camera for math stability? 
                // Actually standard is fine: zRel is +/- 70. Cam is at -400. Dist = 400+zRel.
                const scale = perspectiveStrength / (perspectiveStrength + zRel);

                const screenX = xCoords[i];
                const screenY = centerY + spineY + (yRel * scale);

                // Visuals
                // Fade distant particles
                // zRel maps -70 (close) to +70 (far) - Wait, standard RH coord: -Z is far?
                // usage here: zRel positive is "behind" usually in this cos logic? 
                // Let's assume zRel > 0 is FAR.
                // Opacity mapping: Close=1, Far=0.2
                const depthAlpha = 1 - ((zRel + 70) / 140) * 0.8;

                drawBuffer[i].x = screenX;
                drawBuffer[i].y = screenY;
                drawBuffer[i].z = zRel; // Sort key
                drawBuffer[i].size = baseSizes[i] * scale;
                drawBuffer[i].alpha = baseOpacities[i] * depthAlpha;
                drawBuffer[i].color = (i >= splitIndex) ? accentColor : baseColor;
            }

            // 2. Sort by Depth (Painter's Algorithm)
            // Draw furthest (High Z) first, Closest (Low Z) last.
            // Assuming zRel > 0 is "back/far" (cos theta varies). 
            drawBuffer.sort((a, b) => b.z - a.z);

            // 3. Draw
            // We use the sorted buffer to find "nearby" particles efficiently without N^2 loop
            // Since they are sorted by Z, neighbors in the array are roughly likely to be valid connect targets?
            // Actually no, sorting by Z doesn't mean spatial proximity in X/Y.
            // But we can just check immediate neighbors in the unsorted array? No, simpler:
            // Let's just do a localized n^2 check for a SUBSET of particles to act as "nodes".
            // Drawing 2500*2500 checks is too slow.
            // Fast approach: Only connect every 10th particle to its neighbors in the array index (random but stable connections)

            const lineConnectDist = 60;

            ctx.lineWidth = 0.5;

            // Loop through buffer
            for (let i = 0; i < particleCount; i++) {
                const p = drawBuffer[i];
                if (p.alpha < 0.05) continue;

                // Draw Particle
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // Draw Lines (Selective)
                // Only act as a source node if index % 8 == 0 (optimization)
                // And only start drawing lines for particles in the "front" half of Z (p.z > -10) to avoid background stutter
                if (i % 8 === 0 && p.z > -20) {
                    // Check next few particles in the raw array (random neighbors)
                    // Note: 'i' here is index in SORTED buffer.
                    // Connecting to sorted neighbors creates a "depth-based" webbing which is actually cool visually
                    // It connects layers of depth rather than just XY neighbors.

                    for (let j = 1; j < 6; j++) {
                        if (i + j >= particleCount) break;
                        const p2 = drawBuffer[i + j];

                        const dx = p.x - p2.x;
                        const dy = p.y - p2.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist < lineConnectDist) {
                            // Opacity based on distance AND depth
                            const lineAlpha = (1 - dist / lineConnectDist) * p.alpha * 0.4;

                            if (lineAlpha > 0.02) {
                                ctx.globalAlpha = lineAlpha;
                                ctx.strokeStyle = p.color;
                                ctx.beginPath();
                                ctx.moveTo(p.x, p.y);
                                ctx.lineTo(p2.x, p2.y);
                                ctx.stroke();
                            }
                        }
                    }
                }
            }

            ctx.globalAlpha = 1.0;
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isArtMode]);

    return (
        <section
            id="transition-marquee"
            ref={containerRef}
            className={`relative w-full h-[350px] overflow-hidden transition-colors duration-700 border-t border-b
            ${isArtMode ? 'bg-[#0a0a0a] border-white/5' : 'bg-white border-black/5'}`}
        >
            <canvas ref={canvasRef} className="absolute inset-0" />

            {/* Label with Backdrop for Contrast */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className={`
                    px-4 py-2 rounded-full border backdrop-blur-sm
                    flex items-center gap-3
                    transition-colors duration-500
                    ${isArtMode
                        ? 'bg-black/40 border-white/10 text-white'
                        : 'bg-white/40 border-black/10 text-black'}
                `}>
                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isArtMode ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]'}`} />
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-medium opacity-90">
                        DATA_STREAM
                    </span>
                </div>
            </div>
        </section>
    );
}
