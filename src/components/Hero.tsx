import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { Play, Sparkles, ArrowRight } from 'lucide-react';

const ShootingStar = ({ delay, angle }: { delay: number, angle?: number }) => {
  const [pos] = useState(() => ({
    top: `${Math.random() * 80}%`, 
    left: `-10%`, 
    duration: Math.random() * 2 + 2, 
    angle: angle ?? 0
  }));

  return (
    <motion.div
      initial={{ x: "-10vw", y: 0, opacity: 0, scale: 0 }}
      animate={{ 
        x: "110vw", 
        y: 0, 
        opacity: [0, 0.4, 0.4, 0],
        scale: [0.3, 0.6, 0.5, 0.3]
      }}
      transition={{
        duration: pos.duration,
        repeat: Infinity,
        repeatDelay: 12,
        delay: delay,
        ease: "linear",
      }}
      className="absolute w-0.5 h-0.5 bg-white rounded-full z-[-10] pointer-events-none will-change-transform"
      style={{
        top: pos.top,
        left: pos.left,
        transform: `rotate(${pos.angle}deg)`
      }}
    >
      {/* The Streak/Tail - Thinner and more subtle */}
      <div 
        className="absolute top-1/2 right-0 w-[200px] h-[1px] bg-gradient-to-l from-white/40 via-white/10 to-transparent origin-right"
        style={{ transform: 'translateY(-50%)' }}
      />
      
      {/* Head Glow - Smaller and more subtle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white/10 blur-[3px] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-0.5 bg-white/40 blur-[1px] rounded-full" />
    </motion.div>
  );
};

const ShootingStarGroup = ({ delay }: { delay: number }) => {
  const [angle] = useState(() => 0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);
  
  return (
    <>
      <ShootingStar delay={delay} angle={angle} />
      {!isMobile && (
        <>
          <ShootingStar delay={delay + 0.5} angle={angle} />
          <ShootingStar delay={delay + 1.2} angle={angle} />
          <ShootingStar delay={delay + 1.8} angle={angle} />
          <ShootingStar delay={delay + 2.5} angle={angle} />
        </>
      )}
    </>
  );
};

const StarsBackground = () => {
  const [stars] = useState(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const starArray = [];
    const count = isMobile ? 60 : 150; // Reduced stars on mobile
    const beamingCount = isMobile ? 2 : Math.floor(Math.random() * 4) + 2;
    
    for (let i = 0; i < count; i++) {
      starArray.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        isBeaming: i < beamingCount,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5
      });
    }
    // Shuffle to randomize which ones are beaming
    return starArray.sort(() => Math.random() - 0.5);
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full will-change-[opacity,transform]"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
          }}
          animate={star.isBeaming ? {
            opacity: [star.opacity, 0.8, star.opacity],
            scale: [1, 1.5, 1],
          } : {}}
          transition={star.isBeaming ? {
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          } : {}}
        />
      ))}
    </div>
  );
};

function SpotlightTrail({ mouseX, mouseY }: { mouseX: any, mouseY: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<{ x: number, y: number, age: number, id: number }[]>([]);
  const lastPos = useRef({ x: 0, y: 0 });
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      // Get mouse coordinates relative to the canvas
      const rect = canvas.getBoundingClientRect();
      const x = mouseX.get() - rect.left;
      const y = mouseY.get() - rect.top;

      // Add new point only if moved significantly
      const dist = Math.hypot(x - lastPos.current.x, y - lastPos.current.y);
      if (dist > 15) {
        points.current.push({ x, y, age: 0, id: Math.random() });
        lastPos.current = { x, y };
      }

      // Limit points for performance
      if (points.current.length > 30) {
        points.current.shift();
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points.current.forEach((point) => {
        point.age += 0.02; // Slightly faster aging
        const opacity = Math.max(0, 0.4 - point.age * 0.1);
        const scale = 0.4 + point.age * 0.4;

        if (opacity <= 0) return;

        ctx.save();
        ctx.translate(point.x, point.y);
        ctx.scale(scale, scale);

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 125);
        gradient.addColorStop(0, `rgba(167, 139, 250, ${opacity})`);
        gradient.addColorStop(0.4, `rgba(139, 92, 246, ${opacity * 0.4})`);
        gradient.addColorStop(0.8, 'rgba(139, 92, 246, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, 125, 0, Math.PI * 2);
        ctx.fill();

        // Core glow
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
        ctx.fill();

        ctx.restore();
      });

      // Remove dead points
      points.current = points.current.filter(p => p.age < 5);

      frameId = requestAnimationFrame(draw);
    };

    frameId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    };
  }, [mouseX, mouseY]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-60"
      style={{ filter: 'blur(20px)' }}
    />
  );
}

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[#030303]" />
      <StarsBackground />
      
      {/* Enhanced Spotlight Trail Effect */}
      <SpotlightTrail mouseX={springX} mouseY={springY} />

      {/* Shooting Stars - Grouped bursts for a shower effect */}
      <ShootingStarGroup delay={0} />
      <ShootingStarGroup delay={8} />
      <ShootingStarGroup delay={16} />
      
      <div className="hidden md:block">
        <ShootingStarGroup delay={4} />
        <ShootingStarGroup delay={12} />
        <ShootingStarGroup delay={20} />
      </div>
      
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-purple/10 blur-[150px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-blue/15 blur-[120px] rounded-full -z-10" />
      
      {/* Additional Glows for depth */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 blur-[80px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-brand-blue/10 blur-[100px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-400 mb-4"
          >
            <Sparkles className="w-3 h-3 text-brand-purple" />
            <span>Trusted by 25+ local businesses</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1] text-white"
          >
            <span className="text-gradient">Turn your Leads</span> <br />
            into Clients
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
          >
            We build high-performance websites and AI-driven systems that help you scale your leads and maximize conversion rates.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <div className="button-glow-container w-full sm:w-auto">
              <a 
                href="#contact"
                className="relative flex items-center justify-center gap-2 md:gap-3 px-6 md:px-10 py-3 md:py-4 bg-white text-black rounded-full font-semibold text-base md:text-lg hover:bg-zinc-200 transition-all group shadow-[0_0_30px_rgba(255,255,255,0.2)] w-full sm:w-auto"
              >
                <span className="hidden sm:inline">Schedule a Free Strategy Session</span>
                <span className="sm:hidden">Free Strategy Session</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
