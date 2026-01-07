import { useEffect, useRef, useCallback } from 'react';

type ParticleType = 'shape' | 'ambient';
type AmbientState = 'drifting' | 'magnetized' | 'landing' | 'hidden';

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

    // Ambient particle properties
    state: AmbientState;
    hiddenUntil: number; // Timestamp for respawn

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
    const isDarkModeRef = useRef(false);
    const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Dynamic landing distance based on shape thickness
    const landingDistanceRef = useRef(20);

    const PARTICLE_SIZE = 1.2;
    const EXCLUSION_RADIUS = 150;

    const initParticles = useCallback((width: number, height: number) => {
        const particles: Particle[] = [];
        const newAttractors: Attractor[] = [];

        const centerX = width / 2;
        const centerY = height / 2;
        const size = Math.min(width, height) * 0.35;
        const strokeWidth = size * 0.18;

        // Set the collision boundary to be slightly outside the visual stroke
        landingDistanceRef.current = strokeWidth * 0.6;

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
                state: 'drifting', // N/A for shape
                hiddenUntil: 0,
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
                    state: 'drifting',
                    hiddenUntil: 0,
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
                    state: 'drifting',
                    hiddenUntil: 0,
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

        // --- 2. AMBIENT PARTICLES (Unified) ---
        const particleCount = Math.floor((width * height) / 2500);

        for (let i = 0; i < particleCount; i++) {
            let x = 0, y = 0;
            let safe = false;
            let attempts = 0;

            while (!safe && attempts < 50) {
                x = Math.random() * width;
                y = Math.random() * height;
                safe = true;

                for (const attr of newAttractors) {
                    const { dist } = getDistanceToLineSegment(x, y, attr.x1, attr.y1, attr.x2, attr.y2);
                    if (dist < EXCLUSION_RADIUS + 20) {
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
                    alpha: Math.random() * 0.5 + 0.4,
                    type: 'ambient',
                    state: 'drifting',
                    hiddenUntil: 0,
                    targetX: 0,
                    targetY: 0,
                    phase: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 4,
                    orbitRadius: Math.random() * 1.5 + 0.5,
                });
            }
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

        // Reset if dimension changes significantly
        if (Math.abs(dimensionsRef.current.width - rect.width) < 1 &&
            Math.abs(dimensionsRef.current.height - rect.height) < 1) {
            return true;
        }

        const dpr = window.devicePixelRatio || 1;
        const width = rect.width;
        const height = rect.height;

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
        const now = Date.now();
        timeRef.current += 0.016;

        const mouse = mouseRef.current;
        const isMouseInCanvas = mouse.x > 0 && mouse.x < width && mouse.y > 0 && mouse.y < height;
        const time = timeRef.current;

        const EXCLUSION_RADIUS = 150;
        const LANDING_DIST = landingDistanceRef.current;

        // Colors
        const isDark = isDarkModeRef.current;
        const baseR = isDark ? 255 : 0;
        const baseG = isDark ? 255 : 0;
        const baseB = isDark ? 255 : 0;

        const targetR = 59;
        const targetG = 130;
        const targetB = 246;

        particlesRef.current.forEach((particle) => {
            // Rotation / Twinkle
            const rotationAngle = time * particle.rotationSpeed + particle.phase;
            const orbitX = Math.cos(rotationAngle) * particle.orbitRadius;
            const orbitY = Math.sin(rotationAngle) * particle.orbitRadius;

            // Reset style settings
            ctx.shadowBlur = 0;

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
                ctx.fillStyle = `rgba(59, 130, 246, ${finalAlpha})`;
                ctx.fill();
                return;
            }

            // ---------------- AMBIENT PARTICLES ----------------
            if (particle.type === 'ambient') {
                // 1. HIDDEN / RESPAWNING
                if (particle.state === 'hidden') {
                    if (now > particle.hiddenUntil) {
                        // Respawn logic
                        let safe = false;
                        let attempts = 0;
                        while (!safe && attempts < 10) {
                            particle.x = Math.random() * width;
                            particle.y = Math.random() * height;

                            let minDist = 10000;
                            for (const attr of attractorsRef.current) {
                                const { dist } = getDistanceToLineSegment(particle.x, particle.y, attr.x1, attr.y1, attr.x2, attr.y2);
                                if (dist < minDist) minDist = dist;
                            }

                            if (minDist > EXCLUSION_RADIUS + 50) safe = true;
                            attempts++;
                        }
                        // Reset State
                        particle.vx = (Math.random() - 0.5) * 0.1;
                        particle.vy = (Math.random() - 0.5) * 0.1;
                        particle.alpha = 0;
                        particle.state = 'drifting';
                    }
                    return;
                }

                // Calculate distance to nearest attraction point
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

                // 2. DRIFTING STATE
                if (particle.state === 'drifting') {
                    // Standard motion
                    particle.vx += (Math.random() - 0.5) * 0.01;
                    particle.vy += (Math.random() - 0.5) * 0.01;

                    // Repulsion
                    if (minKeepDist < EXCLUSION_RADIUS) {
                        const force = (EXCLUSION_RADIUS - minKeepDist) / EXCLUSION_RADIUS;
                        particle.vx -= targetVecX * force * 0.1;
                        particle.vy -= targetVecY * force * 0.1;

                        if (Math.random() < 0.02) {
                            particle.state = 'magnetized';
                            particle.vx *= 0.1;
                            particle.vy *= 0.1;
                        }
                    }

                    if (Math.random() < 0.001) {
                        particle.state = 'magnetized';
                    }

                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    particle.vx *= 0.95;
                    particle.vy *= 0.95;

                    if (particle.alpha < 0.5) particle.alpha += 0.01;

                }
                // 3. MAGNETIZED STATE
                else if (particle.state === 'magnetized') {
                    if (minKeepDist > 0) {
                        const speedFactor = 0.0001 + (3000 / (minKeepDist + 20)) * 0.0001;
                        particle.vx += targetVecX * speedFactor;
                        particle.vy += targetVecY * speedFactor;
                    }

                    particle.x += particle.vx;
                    particle.y += particle.vy;

                    particle.vx *= 0.98;
                    particle.vy *= 0.98;

                    if (minKeepDist < LANDING_DIST) {
                        particle.state = 'landing';
                        particle.vx = 0;
                        particle.vy = 0;
                    }
                }
                // 4. LANDING STATE
                else if (particle.state === 'landing') {
                    particle.alpha -= 0.05;
                    if (particle.alpha <= 0) {
                        particle.state = 'hidden';
                        particle.hiddenUntil = now + 1000;
                    }
                }

                // Screen wrapping
                if (particle.state === 'drifting') {
                    if (particle.x < 0) particle.x = width;
                    if (particle.x > width) particle.x = 0;
                    if (particle.y < 0) particle.y = height;
                    if (particle.y > height) particle.y = 0;
                }

                // Render with colors
                const alphaPulse = Math.sin(time * 2 + particle.phase) * 0.1;
                const currentAlpha = Math.min(1, Math.max(0, particle.alpha));
                const finalAlpha = Math.max(0, currentAlpha + alphaPulse);

                let r = baseR, g = baseG, b = baseB;
                let shadowBlur = 0;

                if (particle.state === 'magnetized' || particle.state === 'landing') {
                    const distMax = 300;
                    const factor = Math.max(0, Math.min(1, 1 - (minKeepDist - LANDING_DIST) / (distMax - LANDING_DIST)));

                    r = baseR + (targetR - baseR) * factor;
                    g = baseG + (targetG - baseG) * factor;
                    b = baseB + (targetB - baseB) * factor;

                    if (factor > 0.5) {
                        shadowBlur = 10 * factor;
                    }
                }

                ctx.beginPath();
                ctx.arc(particle.x + orbitX, particle.y + orbitY, particle.size, 0, Math.PI * 2);

                if (shadowBlur > 0) {
                    ctx.shadowBlur = shadowBlur;
                    ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
                }

                ctx.fillStyle = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${finalAlpha})`;
                ctx.fill();
            }
        });

        animationRef.current = requestAnimationFrame(animate);
    }, [setupCanvas]);


    useEffect(() => {
        // Dark mode observer
        const checkDarkMode = () => {
            isDarkModeRef.current = document.documentElement.classList.contains('dark');
        };
        checkDarkMode();
        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    checkDarkMode();
                }
            });
        });
        mutationObserver.observe(document.documentElement, { attributes: true });

        if (!isVisible) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        // RESIZE OBSERVER with Debounce
        const handleResize = () => {
            if (resizeTimeoutRef.current) {
                clearTimeout(resizeTimeoutRef.current);
            }
            // Wait for layout to settle (e.g. mobile view transition)
            resizeTimeoutRef.current = setTimeout(() => {
                setupCanvas();
            }, 200);
        };

        const resizeObserver = new ResizeObserver(handleResize);
        // Observe the parent, not window, to catch container layout changes
        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement);
        }

        // Initial setup
        const initTimer = setTimeout(() => {
            setupCanvas();
            animationRef.current = requestAnimationFrame(animate);
        }, 800);

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

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            mutationObserver.disconnect();
            resizeObserver.disconnect();
            clearTimeout(initTimer);
            if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);

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
