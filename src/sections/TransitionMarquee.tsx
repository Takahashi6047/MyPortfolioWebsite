import { useEffect, useRef } from "react";
import { useTheme } from "../global/overlay/themeOverlay/RippleContext";


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


        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 1000 : 2000;


        const xCoords = new Float32Array(particleCount);
        const radii = new Float32Array(particleCount);
        const phases = new Float32Array(particleCount);
        const speedOffsets = new Float32Array(particleCount);
        const baseSizes = new Float32Array(particleCount);
        const baseOpacities = new Float32Array(particleCount);


        const drawBuffer: RenderParticle[] = new Array(particleCount);
        for (let i = 0; i < particleCount; i++) {
            drawBuffer[i] = { x: 0, y: 0, size: 0, alpha: 0, color: "", z: 0 };
        }


        const initParticles = (width: number) => {
            for (let i = 0; i < particleCount; i++) {
                xCoords[i] = Math.random() * width;

                const r = Math.random();
                radii[i] = (r * r) * 60 + 10;

                phases[i] = Math.random() * Math.PI * 2;
                speedOffsets[i] = Math.random() * 0.5 + 0.5;
                const sizeScale = isMobile ? 0.5 : 1.0;
                baseSizes[i] = (Math.random() * 2.0 + 0.5) * sizeScale;
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
            time += 0.02;

            const width = canvas.width;
            const height = canvas.height;
            const centerY = height / 2;

            ctx.clearRect(0, 0, width, height);


            const baseColor = isArtMode ? "#FFFFFF" : "#000000";
            const accentColor = isArtMode ? "#EAB308" : "#3B82F6";
            const splitIndex = Math.floor(particleCount * 0.85);

            const perspectiveStrength = 400;

            const drawHarmonics = () => {

                ctx.beginPath();
                ctx.strokeStyle = accentColor;
                ctx.lineWidth = 1.5;
                ctx.globalAlpha = 0.5;

                for (let x = 0; x <= width; x += 10) {
                    const rotAngle = (x * 0.005) + time;
                    const waveAmplitude = isMobile ? 25 : 40;
                    const spineY = Math.sin(x * 0.003 + time * 0.5) * waveAmplitude;

                    const radius = 50;
                    const rotY = Math.sin(rotAngle) * radius;
                    const rotZ = Math.cos(rotAngle) * radius;


                    const scale = perspectiveStrength / (perspectiveStrength + rotZ);
                    const screenY = centerY + spineY + (rotY * scale);

                    if (x === 0) ctx.moveTo(x, screenY);
                    else ctx.lineTo(x, screenY);
                }
                ctx.stroke();


                ctx.beginPath();
                ctx.strokeStyle = baseColor;
                ctx.lineWidth = 0.5;
                ctx.globalAlpha = 0.15;

                for (let x = 0; x <= width; x += 10) {
                    const rotAngle = (x * 0.005) + time + Math.PI;
                    const waveAmplitude = isMobile ? 25 : 40;
                    const spineY = Math.sin(x * 0.003 + time * 0.5) * waveAmplitude;

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
                xCoords[i] += 0.2 * speedOffsets[i];
                if (xCoords[i] > width) xCoords[i] = -50;


                const rotAngle = (xCoords[i] * 0.005) + time + phases[i];


                const waveAmplitude = isMobile ? 25 : 40;
                const spineY = Math.sin(xCoords[i] * 0.003 + time * 0.5) * waveAmplitude;

                const yRel = Math.sin(rotAngle) * radii[i];
                const zRel = Math.cos(rotAngle) * radii[i];


                const scale = perspectiveStrength / (perspectiveStrength + zRel);

                const screenX = xCoords[i];
                const screenY = centerY + spineY + (yRel * scale);


                const depthAlpha = 1 - ((zRel + 70) / 140) * 0.8;

                drawBuffer[i].x = screenX;
                drawBuffer[i].y = screenY;
                drawBuffer[i].z = zRel;
                drawBuffer[i].size = baseSizes[i] * scale;
                drawBuffer[i].alpha = baseOpacities[i] * depthAlpha;
                drawBuffer[i].color = (i >= splitIndex) ? accentColor : baseColor;
            }


            drawBuffer.sort((a, b) => b.z - a.z);



            const lineConnectDist = 60;

            ctx.lineWidth = 0.5;


            for (let i = 0; i < particleCount; i++) {
                const p = drawBuffer[i];
                if (p.alpha < 0.05) continue;


                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();


                if (i % 8 === 0 && p.z > -20) {

                    for (let j = 1; j < 6; j++) {
                        if (i + j >= particleCount) break;
                        const p2 = drawBuffer[i + j];

                        const dx = p.x - p2.x;
                        const dy = p.y - p2.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist < lineConnectDist) {
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
            className={`relative w-full h-[200px] sm:h-[280px] md:h-[350px] overflow-hidden transition-colors duration-700 border-t border-b
            ${isArtMode ? 'bg-[#0a0a0a] border-white/5' : 'bg-white border-black/5'}`}
        >
            <canvas ref={canvasRef} className="absolute inset-0" />


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
