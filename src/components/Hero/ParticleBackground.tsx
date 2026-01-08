import { useEffect, useRef, useCallback } from 'react';

type ParticleType = 'shape' | 'ambient';
type AmbientState = 'drifting' | 'magnetized' | 'landing' | 'hidden';

interface Particle {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    startX: number;
    startY: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
    type: ParticleType;

    state: AmbientState;
    hiddenUntil: number;

    targetX: number;
    targetY: number;


    phase: number;
    rotationSpeed: number;
    orbitRadius: number;

    rippleOffset: number;
    colorTransition: number;
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

function getDistanceToLineSegment(x: number, y: number, x1: number, y1: number, x2: number, y2: number) {
    const A = x - x1;
    const B = y - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    if (lenSq !== 0)
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

function easeOutExpo(x: number): number {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

export function ParticleBackground({ isVisible }: ParticleBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const attractorsRef = useRef<Attractor[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const animationRef = useRef<number>(0);
    const dimensionsRef = useRef({ width: 0, height: 0 });
    const timeRef = useRef(0);
    const entranceTimeRef = useRef<number>(0);
    const isDarkModeRef = useRef(false);
    const resizeTimeoutRef = useRef<number | null>(null);

    const landingDistanceRef = useRef(20);

    const rippleWaveRef = useRef({
        isActive: false,
        startTime: 0,
        towardsDark: true,
    });

    const RIPPLE_WAVE_DURATION = 1200;
    const RIPPLE_WAVE_SPREAD = 0.4;
    const RIPPLE_DISPLACEMENT = 35;
    const RIPPLE_BOUNCE_AMPLITUDE = 0.7;

    const PARTICLE_SIZE = 1.2;
    const EXCLUSION_RADIUS = 150;
    const MOUSE_RADIUS = 150;

    const initParticles = useCallback((width: number, height: number) => {
        const particles: Particle[] = [];
        const newAttractors: Attractor[] = [];

        const centerX = width / 2;
        const centerY = height / 2;
        const size = Math.min(width, height) * 0.35;
        const strokeWidth = size * 0.18;


        landingDistanceRef.current = strokeWidth * 0.6;

        const getEntrancePos = () => ({
            x: centerX + (Math.random() - 0.5) * 50,
            y: centerY + (Math.random() - 0.5) * 50
        });

        //  SHAPE GENERATION 
        const addShapeParticle = (targetX: number, targetY: number, perpX: number, perpY: number, isEdge: boolean) => {
            let offset: number;
            if (isEdge) {
                offset = (Math.random() > 0.5 ? 1 : -1) * (strokeWidth * 0.4 + Math.random() * strokeWidth * 0.1);
            } else {
                offset = (Math.random() - 0.5) * strokeWidth * 0.6;
            }

            const finalX = targetX + perpX * offset;
            const finalY = targetY + perpY * offset;
            const start = getEntrancePos();

            particles.push({
                x: start.x,
                y: start.y,
                baseX: finalX,
                baseY: finalY,
                startX: start.x,
                startY: start.y,
                vx: 0,
                vy: 0,
                size: PARTICLE_SIZE,
                alpha: isEdge ? Math.random() * 0.3 + 0.6 : Math.random() * 0.2 + 0.3,
                type: 'shape',
                state: 'drifting',
                hiddenUntil: 0,
                targetX: finalX,
                targetY: finalY,
                phase: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 5,
                orbitRadius: Math.random() * 2 + 0.8,
                rippleOffset: 0,
                colorTransition: 0,
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
                const start = getEntrancePos();

                particles.push({
                    x: start.x,
                    y: start.y,
                    baseX: tx,
                    baseY: ty,
                    startX: start.x,
                    startY: start.y,
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
                    rippleOffset: 0,
                    colorTransition: 0,
                });
            }
            for (let i = 0; i < innerCount; i++) {
                const angle = startAngle + Math.random() * (endAngle - startAngle);
                const r = Math.random() * radius * 0.7;
                const tx = cx + Math.cos(angle) * r;
                const ty = cy + Math.sin(angle) * r;
                const start = getEntrancePos();

                particles.push({
                    x: start.x,
                    y: start.y,
                    baseX: tx,
                    baseY: ty,
                    startX: start.x,
                    startY: start.y,
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
                    rippleOffset: 0,
                    colorTransition: 0,
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

        // AMBIENT PARTICLES 
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
                    startX: x,
                    startY: y,
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
                    rippleOffset: 0,
                    colorTransition: 0,
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

    const easeOutBounce = (x: number): number => {
        const n1 = 7.5625;
        const d1 = 2.75;
        if (x < 1 / d1) {
            return n1 * x * x;
        } else if (x < 2 / d1) {
            return n1 * (x -= 1.5 / d1) * x + 0.75;
        } else if (x < 2.5 / d1) {
            return n1 * (x -= 2.25 / d1) * x + 0.9375;
        } else {
            return n1 * (x -= 2.625 / d1) * x + 0.984375;
        }
    };

    const getWaveProgress = (x: number, y: number, width: number, height: number, globalProgress: number): number => {
        const diagonal = ((width - x) + y) / (width + height);
        const waveStart = diagonal - RIPPLE_WAVE_SPREAD;
        const waveEnd = diagonal + RIPPLE_WAVE_SPREAD;
        if (globalProgress < waveStart || globalProgress > waveEnd) {
            return 0;
        }
        const waveCenter = diagonal;
        const distFromCenter = Math.abs(globalProgress - waveCenter);
        const intensity = 1 - (distFromCenter / RIPPLE_WAVE_SPREAD);

        return Math.max(0, intensity);
    };

    const getRippleBounce = (waveProgress: number, phase: number): number => {
        if (waveProgress <= 0) return 0;

        const bouncePhase = waveProgress * Math.PI * 2;
        const bounce = Math.sin(bouncePhase + phase * 0.5) * easeOutBounce(waveProgress) * RIPPLE_BOUNCE_AMPLITUDE;

        return bounce * RIPPLE_DISPLACEMENT * (1 - waveProgress * 0.5);
    };

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { width, height } = dimensionsRef.current;
        if (width === 0 || height === 0) {
            if (setupCanvas()) {
                entranceTimeRef.current = Date.now();
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

        const ENTRANCE_DURATION = 1500;
        const entranceElapsed = now - entranceTimeRef.current;
        const entranceProgress = Math.min(1, entranceElapsed / ENTRANCE_DURATION);
        const easedEntrance = easeOutExpo(entranceProgress);
        const isEntrancePhase = entranceProgress < 1;

        const rippleWave = rippleWaveRef.current;
        let globalWaveProgress = 0;
        let isWaveActive = false;

        if (rippleWave.isActive) {
            const waveElapsed = now - rippleWave.startTime;
            globalWaveProgress = waveElapsed / RIPPLE_WAVE_DURATION;

            if (globalWaveProgress >= 1.5) {
                rippleWave.isActive = false;
                globalWaveProgress = 0;
            } else {
                isWaveActive = true;
            }
        }

        const isDark = isDarkModeRef.current;
        const baseR = isDark ? 0 : 255;
        const baseG = isDark ? 0 : 255;
        const baseB = isDark ? 0 : 255;

        const targetR = 59;
        const targetG = 130;
        const targetB = 246;

        particlesRef.current.forEach((particle) => {
            const rotationAngle = time * particle.rotationSpeed + particle.phase;
            const orbitX = Math.cos(rotationAngle) * particle.orbitRadius;
            const orbitY = Math.sin(rotationAngle) * particle.orbitRadius;

            ctx.shadowBlur = 0;

            let repulsionVx = 0;
            let repulsionVy = 0;

            if (isMouseInCanvas && !isEntrancePhase) {
                const dx = particle.x - mouse.x;
                const dy = particle.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MOUSE_RADIUS && dist > 0) {
                    const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
                    const angle = Math.atan2(dy, dx);
                    const power = 10;
                    repulsionVx = Math.cos(angle) * force * power;
                    repulsionVy = Math.sin(angle) * force * power;
                }
            }
            let waveIntensity = 0;
            let rippleDisplacementX = 0;
            let rippleDisplacementY = 0;

            if (isWaveActive && !isEntrancePhase) {
                waveIntensity = getWaveProgress(particle.baseX, particle.baseY, width, height, globalWaveProgress);

                if (waveIntensity > 0) {
                    const displacement = getRippleBounce(waveIntensity, particle.phase);

                    const angle = (Math.PI * 0.75) + (particle.phase * 0.2);
                    rippleDisplacementX = Math.cos(angle) * displacement;
                    rippleDisplacementY = Math.sin(angle) * displacement;
                    particle.colorTransition = Math.max(particle.colorTransition, waveIntensity);
                }

                if (waveIntensity === 0 && particle.colorTransition > 0) {
                    particle.colorTransition = Math.max(0, particle.colorTransition - 0.02);
                }
            } else if (particle.colorTransition > 0) {

                particle.colorTransition = Math.max(0, particle.colorTransition - 0.02);
            }

            //  SHAPE PARTICLES 
            if (particle.type === 'shape') {
                let displayX = particle.x;
                let displayY = particle.y;

                if (isEntrancePhase) {
                    const curBaseX = particle.startX + (particle.baseX - particle.startX) * easedEntrance;
                    const curBaseY = particle.startY + (particle.baseY - particle.startY) * easedEntrance;
                    particle.x = curBaseX + orbitX;
                    particle.y = curBaseY + orbitY;
                    displayX = particle.x;
                    displayY = particle.y;
                } else {
                    const homeX = particle.baseX + orbitX;
                    const homeY = particle.baseY + orbitY;
                    const springDx = homeX - particle.x;
                    const springDy = homeY - particle.y;
                    const springStrength = 0.05;

                    particle.vx += springDx * springStrength;
                    particle.vy += springDy * springStrength;

                    particle.vx += repulsionVx;
                    particle.vy += repulsionVy;

                    particle.vx *= 0.85;
                    particle.vy *= 0.85;

                    particle.x += particle.vx;
                    particle.y += particle.vy;

                    displayX = particle.x + rippleDisplacementX;
                    displayY = particle.y + rippleDisplacementY;
                }

                const alphaPulse = Math.sin(time * 3 + particle.phase * 2) * 0.15;
                let finalAlpha = Math.max(0.1, particle.alpha + alphaPulse);

                if (waveIntensity > 0.3) {
                    ctx.shadowBlur = 8 * waveIntensity;
                    ctx.shadowColor = 'rgba(59, 130, 246, 0.6)';
                    finalAlpha = Math.min(1, finalAlpha + waveIntensity * 0.3);
                } else {
                    ctx.shadowBlur = 0;
                }

                ctx.beginPath();
                ctx.arc(displayX, displayY, particle.size * (1 + waveIntensity * 0.3), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(59, 130, 246, ${finalAlpha})`;
                ctx.fill();
                ctx.shadowBlur = 0;
                return;
            }

            //  AMBIENT PARTICLES 
            if (particle.type === 'ambient') {
                if (particle.state === 'hidden') {
                    if (now > particle.hiddenUntil) {
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

                // DRIFTING STATE
                if (particle.state === 'drifting') {
                    particle.vx += (Math.random() - 0.5) * 0.01;
                    particle.vy += (Math.random() - 0.5) * 0.01;

                    particle.vx += repulsionVx * 0.5;
                    particle.vy += repulsionVy * 0.5;

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
                // MAGNETIZED STATE
                else if (particle.state === 'magnetized') {
                    particle.vx += repulsionVx * 0.3;
                    particle.vy += repulsionVy * 0.3;

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
                // LANDING STATE
                else if (particle.state === 'landing') {
                    particle.alpha -= 0.05;
                    if (particle.alpha <= 0) {
                        particle.state = 'hidden';
                        particle.hiddenUntil = now + 1000;
                    }
                }

                if (particle.state === 'drifting') {
                    if (particle.x < 0) particle.x = width;
                    if (particle.x > width) particle.x = 0;
                    if (particle.y < 0) particle.y = height;
                    if (particle.y > height) particle.y = 0;
                }

                const alphaPulse = Math.sin(time * 2 + particle.phase) * 0.1;
                const currentAlpha = Math.min(1, Math.max(0, particle.alpha));
                let finalAlpha = Math.max(0, currentAlpha + alphaPulse);

                // ENTRANCE Fade in ambient
                if (isEntrancePhase) {
                    finalAlpha *= easedEntrance;
                }

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

                if (waveIntensity > 0.1) {
                    const flashIntensity = waveIntensity * 0.7;
                    r = r + (targetR - r) * flashIntensity;
                    g = g + (targetG - g) * flashIntensity;
                    b = b + (targetB - b) * flashIntensity;
                    shadowBlur = Math.max(shadowBlur, 12 * waveIntensity);
                    finalAlpha = Math.min(1, finalAlpha + waveIntensity * 0.4);
                }

                const displayX = particle.x + orbitX + rippleDisplacementX;
                const displayY = particle.y + orbitY + rippleDisplacementY;
                const displaySize = particle.size * (1 + waveIntensity * 0.4);

                ctx.beginPath();
                ctx.arc(displayX, displayY, displaySize, 0, Math.PI * 2);

                if (shadowBlur > 0) {
                    ctx.shadowBlur = shadowBlur;
                    ctx.shadowColor = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, 0.8)`;
                }

                ctx.fillStyle = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${finalAlpha})`;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        });

        animationRef.current = requestAnimationFrame(animate);
    }, [setupCanvas]);


    useEffect(() => {
        let previousDarkMode = document.documentElement.classList.contains('dark');

        const checkDarkMode = () => {
            const currentDarkMode = document.documentElement.classList.contains('dark');

            if (currentDarkMode !== previousDarkMode) {
                rippleWaveRef.current = {
                    isActive: true,
                    startTime: Date.now(),
                    towardsDark: currentDarkMode,
                };
                previousDarkMode = currentDarkMode;
            }

            isDarkModeRef.current = currentDarkMode;
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

        const handleResize = () => {
            if (resizeTimeoutRef.current) {
                clearTimeout(resizeTimeoutRef.current);
            }
            resizeTimeoutRef.current = setTimeout(() => {
                setupCanvas();
            }, 200);
        };

        const resizeObserver = new ResizeObserver(handleResize);
        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement);
        }

        // Initial setup
        const initTimer = setTimeout(() => {
            setupCanvas();
            entranceTimeRef.current = Date.now();
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
