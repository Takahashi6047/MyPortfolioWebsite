import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  isShapeParticle: boolean;
  targetX: number;
  targetY: number;
  // Organic movement properties
  phase: number;        // Unique phase offset for each particle
  wanderAngle: number;  // Current wander direction
  wanderSpeed: number;  // How fast it wanders
}

interface ParticleBackgroundProps {
  isVisible: boolean;
}

export function ParticleBackground({ isVisible }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const timeRef = useRef(0);

  const PARTICLE_SIZE = 2; // Uniform size for all particles

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const particleCount = Math.floor((width * height) / 3000);
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: PARTICLE_SIZE,
        alpha: Math.random() * 0.3 + 0.3,
        isShapeParticle: false,
        targetX: 0,
        targetY: 0,
        phase: Math.random() * Math.PI * 2,
        wanderAngle: Math.random() * Math.PI * 2,
        wanderSpeed: Math.random() * 0.3 + 0.1,
      });
    }

    const centerX = width / 2;
    const centerY = height / 2;
    const size = Math.min(width, height) * 0.35;
    const strokeWidth = size * 0.18;
    
    // Helper to add shape particle - biased toward edges
    const addShapeParticle = (targetX: number, targetY: number, perpX: number, perpY: number, isEdge: boolean) => {
      // Bias offset toward edges - use squared random for edge concentration
      let offset: number;
      if (isEdge) {
        // Edge particles - placed at the outer boundaries
        offset = (Math.random() > 0.5 ? 1 : -1) * (strokeWidth * 0.4 + Math.random() * strokeWidth * 0.1);
      } else {
        // Inner particles - sparse, random distribution inside
        offset = (Math.random() - 0.5) * strokeWidth * 0.6;
      }
      
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: PARTICLE_SIZE,
        alpha: isEdge ? Math.random() * 0.3 + 0.6 : Math.random() * 0.2 + 0.3,
        isShapeParticle: true,
        targetX: targetX + perpX * offset,
        targetY: targetY + perpY * offset,
        phase: Math.random() * Math.PI * 2,
        wanderAngle: Math.random() * Math.PI * 2,
        wanderSpeed: Math.random() * 0.5 + 0.2,
      });
    };

    // Add particles along a thick line - more on edges, fewer inside
    const addThickLine = (x1: number, y1: number, x2: number, y2: number, edgeCount: number, innerCount: number) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.sqrt(dx * dx + dy * dy);
      const perpX = -dy / len;
      const perpY = dx / len;
      
      // Edge particles (dense)
      for (let i = 0; i < edgeCount; i++) {
        const t = Math.random();
        const targetX = x1 + dx * t;
        const targetY = y1 + dy * t;
        addShapeParticle(targetX, targetY, perpX, perpY, true);
      }
      
      // Inner particles (sparse)
      for (let i = 0; i < innerCount; i++) {
        const t = Math.random();
        const targetX = x1 + dx * t;
        const targetY = y1 + dy * t;
        addShapeParticle(targetX, targetY, perpX, perpY, false);
      }
    };

    // Add rounded corner particles - edge-biased
    const addRoundedCorner = (cx: number, cy: number, startAngle: number, endAngle: number, edgeCount: number, innerCount: number) => {
      const radius = strokeWidth * 0.5;
      
      // Edge particles at outer radius
      for (let i = 0; i < edgeCount; i++) {
        const angle = startAngle + Math.random() * (endAngle - startAngle);
        const r = radius * 0.85 + Math.random() * radius * 0.15;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseX: Math.random() * width,
          baseY: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: PARTICLE_SIZE,
          alpha: Math.random() * 0.3 + 0.6,
          isShapeParticle: true,
          targetX: cx + Math.cos(angle) * r,
          targetY: cy + Math.sin(angle) * r,
          phase: Math.random() * Math.PI * 2,
          wanderAngle: Math.random() * Math.PI * 2,
          wanderSpeed: Math.random() * 0.5 + 0.2,
        });
      }
      
      // Inner particles (sparse)
      for (let i = 0; i < innerCount; i++) {
        const angle = startAngle + Math.random() * (endAngle - startAngle);
        const r = Math.random() * radius * 0.7;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseX: Math.random() * width,
          baseY: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: PARTICLE_SIZE,
          alpha: Math.random() * 0.2 + 0.3,
          isShapeParticle: true,
          targetX: cx + Math.cos(angle) * r,
          targetY: cy + Math.sin(angle) * r,
          phase: Math.random() * Math.PI * 2,
          wanderAngle: Math.random() * Math.PI * 2,
          wanderSpeed: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const spacing = size * 0.55;
    const bracketHeight = size * 0.5;
    const bracketWidth = size * 0.35;

    // Left bracket < 
    const leftCenterX = centerX - spacing;
    const leftTipX = leftCenterX - bracketWidth;
    const leftBackX = leftCenterX + bracketWidth * 0.3;
    
    // Top arm of <
    addThickLine(leftBackX, centerY - bracketHeight, leftTipX, centerY, 100, 30);
    // Bottom arm of <
    addThickLine(leftTipX, centerY, leftBackX, centerY + bracketHeight, 100, 30);
    // Rounded tip
    addRoundedCorner(leftTipX, centerY, Math.PI * 0.5, Math.PI * 1.5, 30, 10);
    // Rounded ends
    addRoundedCorner(leftBackX, centerY - bracketHeight, -Math.PI * 0.5, Math.PI * 0.5, 20, 8);
    addRoundedCorner(leftBackX, centerY + bracketHeight, -Math.PI * 0.5, Math.PI * 0.5, 20, 8);

    // Forward slash /
    const slashWidth = size * 0.12;
    const slashHeight = size * 0.55;
    addThickLine(centerX + slashWidth, centerY - slashHeight, centerX - slashWidth, centerY + slashHeight, 80, 25);
    // Rounded ends for slash
    addRoundedCorner(centerX + slashWidth, centerY - slashHeight, 0, Math.PI * 2, 18, 6);
    addRoundedCorner(centerX - slashWidth, centerY + slashHeight, 0, Math.PI * 2, 18, 6);

    // Right bracket >
    const rightCenterX = centerX + spacing;
    const rightTipX = rightCenterX + bracketWidth;
    const rightBackX = rightCenterX - bracketWidth * 0.3;
    
    // Top arm of >
    addThickLine(rightBackX, centerY - bracketHeight, rightTipX, centerY, 100, 30);
    // Bottom arm of >
    addThickLine(rightTipX, centerY, rightBackX, centerY + bracketHeight, 100, 30);
    // Rounded tip
    addRoundedCorner(rightTipX, centerY, -Math.PI * 0.5, Math.PI * 0.5, 30, 10);
    // Rounded ends
    addRoundedCorner(rightBackX, centerY - bracketHeight, Math.PI * 0.5, Math.PI * 1.5, 20, 8);
    addRoundedCorner(rightBackX, centerY + bracketHeight, Math.PI * 0.5, Math.PI * 1.5, 20, 8);

    return particles;
  }, []);


  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return false;
    
    const parent = canvas.parentElement;
    if (!parent) return false;
    
    const rect = parent.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return false;
    
    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width;
    const height = rect.height;
    
    // Only reinitialize if dimensions actually changed
    if (dimensionsRef.current.width === width && dimensionsRef.current.height === height) {
      return true;
    }
    
    dimensionsRef.current = { width, height };
    
    // Set canvas size accounting for device pixel ratio
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
    timeRef.current += 0.016; // ~60fps time increment

    const mouse = mouseRef.current;
    const isMouseInCanvas = mouse.x > 0 && mouse.x < width && mouse.y > 0 && mouse.y < height;
    const interactionRadius = 150;

    particlesRef.current.forEach((particle) => {
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Organic wandering - slowly change direction
      particle.wanderAngle += (Math.random() - 0.5) * 0.1;
      
      // Calculate organic offset based on time and particle's unique phase
      const time = timeRef.current;
      const organicX = Math.sin(time * 0.8 + particle.phase) * 3;
      const organicY = Math.cos(time * 0.6 + particle.phase * 1.3) * 3;

      if (particle.isShapeParticle && isMouseInCanvas) {
        // Move toward target with organic wobble
        const targetDx = (particle.targetX + organicX) - particle.x;
        const targetDy = (particle.targetY + organicY) - particle.y;
        particle.x += targetDx * 0.06;
        particle.y += targetDy * 0.06;
      } else if (particle.isShapeParticle) {
        // Wander freely with organic movement
        particle.x += Math.cos(particle.wanderAngle) * particle.wanderSpeed + organicX * 0.02;
        particle.y += Math.sin(particle.wanderAngle) * particle.wanderSpeed + organicY * 0.02;
        
        // Soft bounce off edges
        if (particle.x < 20) particle.wanderAngle = Math.random() * Math.PI - Math.PI / 2;
        if (particle.x > width - 20) particle.wanderAngle = Math.random() * Math.PI + Math.PI / 2;
        if (particle.y < 20) particle.wanderAngle = Math.random() * Math.PI;
        if (particle.y > height - 20) particle.wanderAngle = -Math.random() * Math.PI;
      } else {
        // Background particles - gentle floating with mouse repulsion
        if (distance < interactionRadius && isMouseInCanvas) {
          const force = (interactionRadius - distance) / interactionRadius;
          const angle = Math.atan2(dy, dx);
          particle.x -= Math.cos(angle) * force * 2;
          particle.y -= Math.sin(angle) * force * 2;
        }
        
        // Organic floating movement
        particle.x += Math.cos(particle.wanderAngle) * particle.wanderSpeed * 0.3 + organicX * 0.01;
        particle.y += Math.sin(particle.wanderAngle) * particle.wanderSpeed * 0.3 + organicY * 0.01;
        particle.wanderAngle += (Math.random() - 0.5) * 0.05;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;
      }

      // Draw particle with subtle alpha pulsing
      const alphaPulse = Math.sin(time * 2 + particle.phase) * 0.1;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      
      if (particle.isShapeParticle && isMouseInCanvas) {
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.alpha + alphaPulse})`;
      } else {
        ctx.fillStyle = `rgba(0, 0, 0, ${(particle.alpha + alphaPulse) * 0.6})`;
      }
      ctx.fill();
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
      className={`absolute inset-0 transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ background: 'transparent' }}
    />
  );
}
