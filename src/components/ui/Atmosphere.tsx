import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'motion/react';
import { useEffect, useMemo } from 'react';

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rise: number;
};

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 5,
    duration: 18 + Math.random() * 22,
    delay: Math.random() * 12,
    drift: (Math.random() - 0.5) * 18,
    rise: -(20 + Math.random() * 30),
  }));
}

export function Atmosphere() {
  const reduce = useReducedMotion();
  const particles = useMemo(() => createParticles(reduce ? 0 : 9), [reduce]);

  // Mouse position (0–1 across viewport)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 45, damping: 22, mass: 0.6 });
  const smoothY = useSpring(mouseY, { stiffness: 45, damping: 22, mass: 0.6 });

  // Scroll-tied vertical parallax
  const { scrollY } = useScroll();
  const blob1Y = useTransform(scrollY, [0, 6000], reduce ? [0, 0] : [0, -480]);
  const blob2Y = useTransform(scrollY, [0, 6000], reduce ? [0, 0] : [0, 280]);
  const blob3Y = useTransform(scrollY, [0, 6000], reduce ? [0, 0] : [0, -640]);

  // Mouse-tied horizontal drift (depth illusion)
  const blob1X = useTransform(smoothX, (v) => (reduce ? 0 : (v - 0.5) * 90));
  const blob2X = useTransform(smoothX, (v) => (reduce ? 0 : -(v - 0.5) * 120));
  const blob3X = useTransform(smoothX, (v) => (reduce ? 0 : (v - 0.5) * 60));

  // Cursor spotlight position (top-left corner of a 700px element so its center sits on cursor)
  const cursorLeft = useTransform(smoothX, (v) => `calc(${v * 100}vw - 350px)`);
  const cursorTop = useTransform(smoothY, (v) => `calc(${v * 100}vh - 350px)`);

  useEffect(() => {
    if (reduce) return;
    const handle = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handle, { passive: true });
    return () => window.removeEventListener('mousemove', handle);
  }, [mouseX, mouseY, reduce]);

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[2] pointer-events-none overflow-hidden"
      style={{ mixBlendMode: 'screen' }}
    >
      {/* Mesh blob 1 — top-left, gold */}
      <motion.div
        style={{ x: blob1X, y: blob1Y }}
        className="absolute -top-48 -left-48 w-[720px] h-[720px] rounded-full bg-gold/[0.09] blur-[120px] will-change-transform"
      />

      {/* Mesh blob 2 — middle-right, gold-light */}
      <motion.div
        style={{ x: blob2X, y: blob2Y }}
        className="absolute top-1/3 -right-56 w-[820px] h-[820px] rounded-full bg-gold-light/[0.07] blur-[140px] will-change-transform"
      />

      {/* Mesh blob 3 — bottom-center, caramel */}
      <motion.div
        style={{ x: blob3X, y: blob3Y }}
        className="absolute -bottom-40 left-1/4 w-[620px] h-[620px] rounded-full bg-caramel/[0.08] blur-[120px] will-change-transform"
      />

      {/* Cursor spotlight */}
      {!reduce && (
        <motion.div
          style={{ left: cursorLeft, top: cursorTop }}
          className="absolute w-[700px] h-[700px] rounded-full bg-gold/[0.05] blur-[100px] will-change-transform"
        />
      )}

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0 }}
          animate={{
            x: [`${p.x}vw`, `${p.x + p.drift}vw`, `${p.x}vw`],
            y: [`${p.y}vh`, `${p.y + p.rise}vh`, `${p.y}vh`],
            opacity: [0, 0.55, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute rounded-full bg-gold-light will-change-transform"
          style={{
            width: p.size,
            height: p.size,
            filter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  );
}
