import { useEffect, useRef, useCallback } from 'react';

type ParticleType = 'shape' | 'background' | 'flow';

interface Particle {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
    type: ParticleType;
    targetX: number;
    targetY: number;
    // Twinkling/rotation properties
    phase: number;           // Unique phase offset
    rotationSpeed: number;   // How fast it rotates
    orbitRadius: number;     // Tiny orbit radius for twinkling effect
}

interface Attractor {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

interface ParticleBackgroundProps {
    isVisible: boolean;
}

// Helper to calculate squared distance from point to line segment
function getDistanceToLineSegment(x: number, y: number, x1: number, y1: number, x2: number, y2: number) {
    const A = x - x1;
    const B = y - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    if (lenSq !== 0) // in case of 0 length line
        param = dot / lenSq;

    let xx, yy;

    if (param < 0) {
        xx = x1;
        yy = y1;
    }
    else if (param > 1) {
        xx = x2;
        yy = y2;
    }
    else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }

    const dx = x - xx;
    const dy = y - yy;
    return { dist: Math.sqrt(dx * dx + dy * dy), dx, dy };
}

export function ParticleBackground({ isVisible }: ParticleBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const attractorsRef = useRef<Attractor[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const animationRef = useRef<number>(0);
    const dimensionsRef = useRef({ width: 0, height: 0 });
    const timeRef = useRef(0);

    const PARTICLE_SIZE = 1.2;
    // Larger gap to create the distinct "empty space" halo
    const EXCLUSION_RADIUS = 150;

    const initParticles = useCallback((width: number, height: number) => {
        const particles: Particle[] = [];
        const newAttractors: Attractor[] = [];

        const centerX = width / 2;
        const centerY = height / 2;
        const size = Math.min(width, height) * 0.35;
        const strokeWidth = size * 0.18;

        // --- 1. SHAPE GENERATION ---
        const addShapeParticle = (targetX: number, targetY: number, perpX: number, perpY: number, isEdge: boolean) => {
            let offset: number;
            if (isEdge) {
                offset = (Math.random() > 0.5 ? 1 : -1) * (strokeWidth * 0.4 + Math.random() * strokeWidth * 0.1);
            } else {
                offset = (Math.random() - 0.5) * strokeWidth * 0.6;
            }

            const finalX = targetX + perpX * offset;
            const finalY = targetY + perpY * offset;

            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                baseX: finalX,
                baseY: finalY,
                vx: 0,
                vy: 0,
                size: PARTICLE_SIZE,
                alpha: isEdge ? Math.random() * 0.3 + 0.6 : Math.random() * 0.2 + 0.3,
                type: 'shape',
                targetX: finalX,
                targetY: finalY,
                phase: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 5,
                orbitRadius: Math.random() * 2 + 0.8,
            });
        };

        const addThickLine = (x1: number, y1: number, x2: number, y2: number, edgeCount: number, innerCount: number) => {
            newAttractors.push({ x1, y1, x2, y2 });

            const dx = x2 - x1;
            const dy = y2 - y1;
            const len = Math.sqrt(dx * dx + dy * dy);
            const perpX = -dy / len;
            const perpY = dx / len;

            for (let i = 0; i < edgeCount; i++) {
                const t = Math.random();
                addShapeParticle(x1 + dx * t, y1 + dy * t, perpX, perpY, true);
            }
            for (let i = 0; i < innerCount; i++) {
                const t = Math.random();
                addShapeParticle(x1 + dx * t, y1 + dy * t, perpX, perpY, false);
            }
        };

        const addRoundedCorner = (cx: number, cy: number, startAngle: number, endAngle: number, edgeCount: number, innerCount: number) => {
            const radius = strokeWidth * 0.5;
            for (let i = 0; i < edgeCount; i++) {
                const angle = startAngle + Math.random() * (endAngle - startAngle);
                const r = radius * 0.85 + Math.random() * radius * 0.15;
                const tx = cx + Math.cos(angle) * r;
                const ty = cy + Math.sin(angle) * r;
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    baseX: tx,
                    baseY: ty,
                    vx: 0, vy: 0,
                    size: PARTICLE_SIZE,
                    alpha: Math.random() * 0.3 + 0.6,
                    type: 'shape',
                    targetX: tx, targetY: ty,
                    phase: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 5,
                    orbitRadius: Math.random() * 2 + 0.8,
                });
            }
            for (let i = 0; i < innerCount; i++) {
                const angle = startAngle + Math.random() * (endAngle - startAngle);
                const r = Math.random() * radius * 0.7;
                const tx = cx + Math.cos(angle) * r;
                const ty = cy + Math.sin(angle) * r;
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    baseX: tx,
                    baseY: ty,
                    vx: 0, vy: 0,
                    size: PARTICLE_SIZE,
                    alpha: Math.random() * 0.2 + 0.3,
                    type: 'shape',
                    targetX: tx, targetY: ty,
                    phase: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 5,
                    orbitRadius: Math.random() * 2 + 0.8,
                });
            }
        };

        const spacing = size * 0.55;
        const bracketHeight = size * 0.5;
        const bracketWidth = size * 0.35;
        const leftCenterX = centerX - spacing;
        const leftTipX = leftCenterX - bracketWidth;
        const leftBackX = leftCenterX + bracketWidth * 0.3;

        addThickLine(leftBackX, centerY - bracketHeight, leftTipX, centerY, 100, 30);
        addThickLine(leftTipX, centerY, leftBackX, centerY + bracketHeight, 100, 30);
        addRoundedCorner(leftTipX, centerY, Math.PI * 0.5, Math.PI * 1.5, 30, 10);
        addRoundedCorner(leftBackX, centerY - bracketHeight, -Math.PI * 0.5, Math.PI * 0.5, 20, 8);
        addRoundedCorner(leftBackX, centerY + bracketHeight, -Math.PI * 0.5, Math.PI * 0.5, 20, 8);

        const slashWidth = size * 0.12;
        const slashHeight = size * 0.55;
        addThickLine(centerX + slashWidth, centerY - slashHeight, centerX - slashWidth, centerY + slashHeight, 80, 25);
        addRoundedCorner(centerX + slashWidth, centerY - slashHeight, 0, Math.PI * 2, 18, 6);
        addRoundedCorner(centerX - slashWidth, centerY + slashHeight, 0, Math.PI * 2, 18, 6);

        const rightCenterX = centerX + spacing;
        const rightTipX = rightCenterX + bracketWidth;
        const rightBackX = rightCenterX - bracketWidth * 0.3;

        addThickLine(rightBackX, centerY - bracketHeight, rightTipX, centerY, 100, 30);
        addThickLine(rightTipX, centerY, rightBackX, centerY + bracketHeight, 100, 30);
        addRoundedCorner(rightTipX, centerY, -Math.PI * 0.5, Math.PI * 0.5, 30, 10);
        addRoundedCorner(rightBackX, centerY - bracketHeight, Math.PI * 0.5, Math.PI * 1.5, 20, 8);
        addRoundedCorner(rightBackX, centerY + bracketHeight, Math.PI * 0.5, Math.PI * 1.5, 20, 8);

        attractorsRef.current = newAttractors;

        // --- 2. BACKGROUND PARTICLES (Static/Drifting) ---
        // Calculate total layout area to distribute background particles
        const particleCount = Math.floor((width * height) / 3000);

        for (let i = 0; i < particleCount; i++) {
            let x = 0, y = 0;
            let safe = false;
            let attempts = 0;

            // Ensure they start OUTSIDE the exclusion zone
            while (!safe && attempts < 50) {
                x = Math.random() * width;
                y = Math.random() * height;
                safe = true;

                for (const attr of newAttractors) {
                    const { dist } = getDistanceToLineSegment(x, y, attr.x1, attr.y1, attr.x2, attr.y2);
                    if (dist < EXCLUSION_RADIUS + 20) { // Add buffer
                        safe = false;
                        break;
                    }
                }
                attempts++;
            }

            if (safe) {
                particles.push({
                    x,
                    y,
                    baseX: x,
                    baseY: y,
                    vx: (Math.random() - 0.5) * 0.1,
                    vy: (Math.random() - 0.5) * 0.1,
                    size: PARTICLE_SIZE,
                    // High visibility background
                    alpha: Math.random() * 0.5 + 0.4,
                    type: 'background',
                    targetX: 0,
                    targetY: 0,
                    phase: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 4,
                    orbitRadius: Math.random() * 1.5 + 0.5,
                });
            }
        }

        // --- 3. FLOW PARTICLES (Magnet Illusion) ---
        const flowCount = Math.floor(particleCount * 0.4); // Plenty of flow particles

        for (let i = 0; i < flowCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                baseX: 0,
                baseY: 0,
                vx: 0,
                vy: 0,
                size: PARTICLE_SIZE * 0.8,
                alpha: 0,
                type: 'flow',
                targetX: 0,
                targetY: 0,
                phase: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 6,
                orbitRadius: Math.random() * 1 + 0.5,
            });
        }

        return particles;
    }, []);

    const setupCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return false;

        const parent = canvas.parentElement;
        if (!parent) return false;

        const rect = parent.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return false;

        const dpr = window.devicePixelRatio || 1;
        const width = rect.width;
        const height = rect.height;

        if (dimensionsRef.current.width === width && dimensionsRef.current.height === height) {
            return true;
        }

        dimensionsRef.current = { width, height };

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.scale(dpr, dpr);
        }

        particlesRef.current = initParticles(width, height);
        return true;
    }, [initParticles]);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { width, height } = dimensionsRef.current;
        if (width === 0 || height === 0) {
            if (setupCanvas()) {
                animationRef.current = requestAnimationFrame(animate);
            }
            return;
        }

        ctx.clearRect(0, 0, width, height);
        timeRef.current += 0.016;

        const mouse = mouseRef.current;
        const isMouseInCanvas = mouse.x > 0 && mouse.x < width && mouse.y > 0 && mouse.y < height;
        const time = timeRef.current;

        const EXCLUSION_RADIUS = 150; // Keep visually consistent with init

        particlesRef.current.forEach((particle) => {
            // Rotation / Twinkle
            const rotationAngle = time * particle.rotationSpeed + particle.phase;
            const orbitX = Math.cos(rotationAngle) * particle.orbitRadius;
            const orbitY = Math.sin(rotationAngle) * particle.orbitRadius;

            // ---------------- SHAPE PARTICLES ----------------
            if (particle.type === 'shape') {
                if (isMouseInCanvas) {
                    const targetDx = (particle.targetX + orbitX) - particle.x;
                    const targetDy = (particle.targetY + orbitY) - particle.y;
                    particle.x += targetDx * 0.08;
                    particle.y += targetDy * 0.08;
                } else {
                    particle.x = particle.baseX + orbitX;
                    particle.y = particle.baseY + orbitY;
                }

                const alphaPulse = Math.sin(time * 3 + particle.phase * 2) * 0.15;
                const finalAlpha = Math.max(0.1, particle.alpha + alphaPulse);

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(59, 130, 246, ${finalAlpha})`; // Blueish for shape
                ctx.fill();
                return;
            }

            // Calculate distance to nearest shape segment
            let minKeepDist = 100000;
            let targetVecX = 0;
            let targetVecY = 0;

            for (const attr of attractorsRef.current) {
                const { dist, dx, dy } = getDistanceToLineSegment(particle.x, particle.y, attr.x1, attr.y1, attr.x2, attr.y2);
                if (dist < minKeepDist) {
                    minKeepDist = dist;
                    targetVecX = -dx;
                    targetVecY = -dy;
                }
            }

            // ---------------- BACKGROUND PARTICLES ----------------
            if (particle.type === 'background') {
                // Standard random drift
                particle.vx += (Math.random() - 0.5) * 0.01;
                particle.vy += (Math.random() - 0.5) * 0.01;

                // Repulsion from the exclusion zone - stronger repulsion
                if (minKeepDist < EXCLUSION_RADIUS) {
                    const force = (EXCLUSION_RADIUS - minKeepDist) / EXCLUSION_RADIUS;
                    // Strong push away
                    particle.vx -= targetVecX * force * 0.1;
                    particle.vy -= targetVecY * force * 0.1;
                }

                // Apply and damp
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vx *= 0.95;
                particle.vy *= 0.95;

                // Wrap around screen edges
                if (particle.x < 0) particle.x = width;
                if (particle.x > width) particle.x = 0;
                if (particle.y < 0) particle.y = height;
                if (particle.y > height) particle.y = 0;

                const alphaPulse = Math.sin(time * 2 + particle.phase) * 0.1;
                const finalAlpha = Math.max(0.05, particle.alpha + alphaPulse);

                ctx.beginPath();
                ctx.arc(particle.x + orbitX, particle.y + orbitY, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 0, 0, ${finalAlpha})`;
                ctx.fill();
                return;
            }

            // ---------------- FLOW PARTICLES ----------------
            if (particle.type === 'flow') {
                // SPAWN LOGIC: If invisible/reset, spawn AT THE EDGE of the exclusion zone
                if (particle.alpha <= 0.01) {
                    let safe = false;
                    let attempts = 0;
                    while (!safe && attempts < 10) {
                        // Spawn exactly on a ring roughly at EXCLUSION_RADIUS + padding
                        const angle = Math.random() * Math.PI * 2;
                        // Spawn just outside the empty zone
                        const r = EXCLUSION_RADIUS + 10 + Math.random() * 40;

                        // Note: Ideally we want ring around shape center. 
                        // Since shape is roughly centered...
                        const cx = width / 2;
                        const cy = height / 2;

                        particle.x = cx + Math.cos(angle) * r;
                        particle.y = cy + Math.sin(angle) * r;

                        // Check closest attractor to confirm we are in the "sweet spot"
                        let minDist = 10000;
                        for (const attr of attractorsRef.current) {
                            const { dist } = getDistanceToLineSegment(particle.x, particle.y, attr.x1, attr.y1, attr.x2, attr.y2);
                            if (dist < minDist) minDist = dist;
                        }

                        // If we are too close (inside shape), retry. If too far, retry.
                        // We want strictly falling from the gap edge.
                        if (minDist > EXCLUSION_RADIUS && minDist < EXCLUSION_RADIUS + 100) safe = true;
                        attempts++;
                    }
                    particle.vx = 0;
                    particle.vy = 0;
                    particle.alpha = 0.02;
                }

                // Attraction logic - Accelerate INWARD
                // We know where the nearest shape part is (targetVec)
                if (minKeepDist > 0) {
                    const force = 3.0; // Constant pull
                    particle.vx += targetVecX * 0.001 * force;
                    particle.vy += targetVecY * 0.001 * force;
                }

                // Move
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Fade in as it accelerates
                if (particle.alpha < 0.3) particle.alpha += 0.01;

                // "Landing" logic - if it hits the shape
                if (minKeepDist < 6) {
                    particle.vx = 0;
                    particle.vy = 0;
                    particle.alpha = 0; // Reset
                }

                // Render Flow
                ctx.beginPath();
                ctx.arc(particle.x + orbitX, particle.y + orbitY, particle.size * 0.8, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 0, 0, ${particle.alpha})`;
                ctx.fill();
            }

        });

        animationRef.current = requestAnimationFrame(animate);
    }, [setupCanvas]);


    useEffect(() => {
        if (!isVisible) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        // Delay initial setup to allow container animation to complete
        const initTimer = setTimeout(() => {
            setupCanvas();
            animationRef.current = requestAnimationFrame(animate);
        }, 800);

        const handleResize = () => {
            setupCanvas();
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        window.addEventListener('resize', handleResize);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            clearTimeout(initTimer);
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isVisible, setupCanvas, animate]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'
                }`}
            style={{ background: 'transparent' }}
        />
    );
}
