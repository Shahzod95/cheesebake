import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValueEvent,
  cubicBezier,
  MotionValue,
} from 'motion/react';
import { useEffect, useRef, useState, ComponentType, CSSProperties } from 'react';
import { Berry, Chocolate, Leaf, Caramel, Nut, Sprinkle } from './ui/Ingredients';

type Orbit = {
  Comp: ComponentType<{ size?: number; className?: string }>;
  size: number;
  /** Final position relative to cake center, in vmin. */
  fx: number;
  fy: number;
  /** Scroll progress range during which the ingredient flies in. */
  range: [number, number];
  /** Total rotation in degrees applied while flying in. */
  rotate: number;
};

const orbits: Orbit[] = [
  // Phase 1 (Lentement) — top corners
  { Comp: Berry, size: 76, fx: -28, fy: -14, range: [0.0, 0.18], rotate: -180 },
  { Comp: Leaf, size: 108, fx: 28, fy: -16, range: [0.02, 0.22], rotate: 220 },
  // Phase 2 (Naturellement) — bottom corners
  { Comp: Chocolate, size: 96, fx: -30, fy: 14, range: [0.28, 0.46], rotate: -160 },
  { Comp: Caramel, size: 70, fx: 30, fy: 16, range: [0.32, 0.5], rotate: 160 },
  // Phase 3 (Parfait) — accents
  { Comp: Nut, size: 60, fx: -16, fy: -26, range: [0.62, 0.78], rotate: -110 },
  { Comp: Sprinkle, size: 90, fx: 16, fy: 26, range: [0.66, 0.82], rotate: 70 },
];

const orbitEase = cubicBezier(0.16, 1, 0.3, 1);
const orbitSpring = { stiffness: 90, damping: 28, mass: 0.4, restDelta: 0.001 };

function OrbitItem({
  progress,
  orbit,
}: {
  progress: MotionValue<number>;
  orbit: Orbit;
}) {
  const { Comp, size, fx, fy, range, rotate } = orbit;
  const startScale = 1.7;

  // Eased raw transforms (numbers, not strings, so they can be spring-smoothed)
  const rawX = useTransform(progress, range, [fx * startScale, fx], { ease: orbitEase });
  const rawY = useTransform(progress, range, [fy * startScale, fy], { ease: orbitEase });
  const rawR = useTransform(progress, range, [0, rotate], { ease: orbitEase });
  const rawScale = useTransform(progress, range, [0.6, 1], { ease: orbitEase });

  // Opacity fades in over ~35% of the orbit's range — smooth, not abrupt.
  const span = range[1] - range[0];
  const fadeMid = range[0] + span * 0.35;
  const opacity = useTransform(
    progress,
    [range[0], fadeMid, range[1]],
    [0, 1, 1],
    { ease: orbitEase }
  );

  // Spring smoothing so scroll-tied motion feels natural, not mechanical.
  const sX = useSpring(rawX, orbitSpring);
  const sY = useSpring(rawY, orbitSpring);
  const sR = useSpring(rawR, orbitSpring);
  const sScale = useSpring(rawScale, orbitSpring);

  // Convert smoothed numbers back to vmin strings for CSS.
  const x = useTransform(sX, (v) => `${v}vmin`);
  const y = useTransform(sY, (v) => `${v}vmin`);

  return (
    <motion.div
      style={{ x, y, rotate: sR, opacity, scale: sScale }}
      initial={{ opacity: 0 }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
    >
      <Comp size={size} className="drop-shadow-[0_10px_24px_rgba(0,0,0,0.45)]" />
    </motion.div>
  );
}

type Scene = {
  word: string;
  sub: string;
  visibleFrom: number;
  visibleTo: number;
  image: string;
};

const scenes: Scene[] = [
  {
    word: 'Lentement.',
    sub: 'Slow-made, never rushed.',
    visibleFrom: 0,
    visibleTo: 0.3,
    image:
      'https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&q=90&w=1200',
  },
  {
    word: 'Naturellement.',
    sub: 'Wholesome ingredients, nothing else.',
    visibleFrom: 0.34,
    visibleTo: 0.62,
    image:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=90&w=1200',
  },
  {
    word: 'Parfait.',
    sub: 'Crafted to the smallest detail.',
    visibleFrom: 0.66,
    visibleTo: 1,
    image:
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=90&w=1200',
  },
];

const fadeWindow = 0.04;

function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function interpolate(progress: number, keys: number[], values: number[]) {
  if (progress <= keys[0]) return values[0];

  for (let i = 1; i < keys.length; i += 1) {
    if (progress <= keys[i]) {
      const span = keys[i] - keys[i - 1];
      const t = span === 0 ? 1 : (progress - keys[i - 1]) / span;
      return values[i - 1] + (values[i] - values[i - 1]) * t;
    }
  }

  return values[values.length - 1];
}

function toProgressPct(value: number) {
  return Math.max(0, Math.min(100, Math.round(value * 100)));
}

function sceneKeys(visibleFrom: number, visibleTo: number, isFirst: boolean, isLast: boolean) {
  return isFirst
    ? [0, visibleTo, Math.min(1, visibleTo + fadeWindow)]
    : isLast
    ? [Math.max(0, visibleFrom - fadeWindow), visibleFrom, 1]
    : [
        Math.max(0, visibleFrom - fadeWindow),
        visibleFrom,
        visibleTo,
        Math.min(1, visibleTo + fadeWindow),
      ];
}

function Phrase({
  progress,
  word,
  sub,
  visibleFrom,
  visibleTo,
  isFirst,
  isLast,
}: {
  progress: number;
  word: string;
  sub: string;
  visibleFrom: number;
  visibleTo: number;
  isFirst: boolean;
  isLast: boolean;
}) {
  const keys = sceneKeys(visibleFrom, visibleTo, isFirst, isLast);

  const opacityValues = isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0];
  const yValues = isFirst ? [0, 0, -16] : isLast ? [16, 0, 0] : [16, 0, 0, -16];
  const blurValues = isFirst ? [0, 0, 16] : isLast ? [16, 0, 0] : [16, 0, 0, 16];
  const opacity = interpolate(progress, keys, opacityValues);
  const y = interpolate(progress, keys, yValues);
  const blur = interpolate(progress, keys, blurValues);
  const style: CSSProperties = {
    opacity,
    transform: `translateY(${y}px)`,
    filter: `blur(${blur}px)`,
  };

  return (
    <div style={style} className="absolute inset-x-0 text-center">
      <p className="font-serif italic font-light text-ivory text-[clamp(2.5rem,7.5vw,6.5rem)] leading-[0.95] tracking-[-0.03em]">
        {word}
      </p>
      <p className="mt-4 md:mt-5 text-[10px] uppercase tracking-[0.4em] text-ivory/55">
        {sub}
      </p>
    </div>
  );
}

function StagedImage({
  progress,
  src,
  visibleFrom,
  visibleTo,
  isFirst,
  isLast,
}: {
  progress: number;
  src: string;
  visibleFrom: number;
  visibleTo: number;
  isFirst: boolean;
  isLast: boolean;
}) {
  const keys = sceneKeys(visibleFrom, visibleTo, isFirst, isLast);

  const opacityValues = isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0];
  const blurValues = isFirst ? [0, 0, 10] : isLast ? [10, 0, 0] : [10, 0, 0, 10];
  const scaleValues = isFirst ? [1, 1.04, 1.06] : isLast ? [0.96, 1, 1.04] : [0.96, 1, 1.04, 1.06];

  const opacity = interpolate(progress, keys, opacityValues);
  const blur = interpolate(progress, keys, blurValues);
  const scale = interpolate(progress, keys, scaleValues);

  const style: CSSProperties = {
    opacity,
    filter: `blur(${blur}px)`,
    transform: `scale(${scale})`,
  };

  return (
    <div style={style} className="absolute inset-0 will-change-transform">
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
    </div>
  );
}

export default function Showcase() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setProgress(clamp(v));
  });

  useEffect(() => {
    setProgress(clamp(scrollYProgress.get()));

    const frame = window.requestAnimationFrame(() => {
      setProgress(clamp(scrollYProgress.get()));
    });

    return () => window.cancelAnimationFrame(frame);
  }, [scrollYProgress]);

  const progressPct = toProgressPct(progress);

  const cakeScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduce ? [1, 1, 1] : [0.92, 1.04, 0.95]
  );
  const cakeRotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-5, 5]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.4]);
  const ringScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.06]);
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 0.05, 0.05, 0.02]);

  return (
    <section
      ref={ref}
      aria-label="Atelier showcase"
      className="bg-graphite text-ivory"
      style={{ position: 'relative', height: reduce ? '100vh' : '200vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-graphite to-charcoal" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,transparent_0%,rgba(0,0,0,0.55)_75%)]" />
        <div className="absolute inset-0 grain" />

        {/* Massive watermark */}
        <motion.div
          style={{ opacity: watermarkOpacity }}
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
        >
          <span className="font-serif italic font-light text-ivory text-[26vw] leading-none tracking-tighter whitespace-nowrap">
            Atelier
          </span>
        </motion.div>

        {/* Top meta strip */}
        <div className="absolute top-24 md:top-28 left-0 right-0 flex items-center justify-between px-6 md:px-10 text-[10px] uppercase tracking-[0.3em] text-ivory/40 number-tabular z-40">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-gold/60" />
            <span>Atelier</span>
          </div>
          <span>{String(progressPct).padStart(2, '0')} / 100</span>
        </div>

        {/* Phrase block — positioned above cake */}
        <div className="absolute top-[20vh] md:top-[22vh] left-0 right-0 z-30 pointer-events-none min-h-[160px] md:min-h-[200px] px-6">
          {scenes.map((s, i) => (
            <Phrase
              key={i}
              progress={progress}
              word={s.word}
              sub={s.sub}
              visibleFrom={s.visibleFrom}
              visibleTo={s.visibleTo}
              isFirst={i === 0}
              isLast={i === scenes.length - 1}
            />
          ))}
        </div>

        {/* Cake + anchored orbit hub */}
        <div className="absolute top-[62%] md:top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div
            style={{ scale: cakeScale, rotate: cakeRotate }}
            className="relative w-[42vmin] h-[42vmin] max-w-[440px] max-h-[440px] min-w-[260px] min-h-[260px]"
          >
            <div className="absolute inset-0 rounded-full overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] bg-charcoal">
              {scenes.map((s, i) => (
                <StagedImage
                  key={i}
                  progress={progress}
                  src={s.image}
                  visibleFrom={s.visibleFrom}
                  visibleTo={s.visibleTo}
                  isFirst={i === 0}
                  isLast={i === scenes.length - 1}
                />
              ))}
            </div>
            <motion.div
              style={{ opacity: ringOpacity, scale: ringScale }}
              className="absolute -inset-3 rounded-full border border-gold/40 pointer-events-none"
            />
            <motion.div
              style={{ opacity: ringOpacity, scale: ringScale }}
              className="absolute -inset-8 rounded-full border border-gold/15 pointer-events-none"
            />
          </motion.div>

          {/* Orbit hub anchored to cake center */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="relative w-1 h-1">
              {orbits.map((orbit, i) => (
                <OrbitItem key={i} progress={scrollYProgress} orbit={orbit} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom meta */}
        <div className="absolute bottom-6 md:bottom-8 left-0 right-0 flex items-center justify-between px-6 md:px-10 text-[10px] uppercase tracking-[0.3em] text-ivory/30 z-40">
          <span>N° 03 / Atelier</span>
          <span className="hidden md:inline font-serif italic text-ivory/40">avec patience</span>
        </div>
      </div>
    </section>
  );
}
