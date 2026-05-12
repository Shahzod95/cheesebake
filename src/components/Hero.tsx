import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'motion/react';
import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Reveal, RevealMask } from './ui/Reveal';
import { Marquee } from './ui/Marquee';
import { Magnetic } from './ui/Magnetic';
import heroVideo from '@/assets/video.mp4';

export default function Hero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '18%']);
  const videoScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '-25%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.78]);

  return (
    <section
      ref={ref}
      className="min-h-screen bg-charcoal text-ivory overflow-hidden"
      style={{ position: 'relative' }}
    >
      {/* Video background with parallax */}
      <motion.div
        style={{ y: videoY, scale: videoScale }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-[112%] object-cover"
          aria-hidden
        />
      </motion.div>

      {/* Gradient overlays for text legibility */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 z-[1] bg-gradient-to-b from-charcoal/30 via-charcoal/50 to-charcoal"
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-charcoal/70 via-charcoal/20 to-transparent" />
      <div className="absolute inset-0 z-[2] grain" />

      {/* Content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 container mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-32 min-h-screen flex flex-col justify-center"
      >
        <div className="grid grid-cols-12 gap-6 items-end">
          {/* Left: editorial title */}
          <div className="col-span-12 lg:col-span-8 xl:col-span-7">
            <Reveal delay={0.2} y={20}>
              <div className="flex items-center gap-4 mb-8">
                <span className="h-px w-10 bg-gold" />
                <span className="text-[10px] uppercase tracking-[0.35em] text-ivory/70">
                  {t.hero.subtitle}
                </span>
              </div>
            </Reveal>

            <h1 className="font-serif font-light leading-[0.95] tracking-[-0.02em] text-[clamp(3rem,9vw,8.5rem)]">
              <RevealMask
                text={t.hero.title1}
                as="span"
                className="block text-ivory"
                delay={0.3}
              />
              <RevealMask
                text={t.hero.title2}
                as="span"
                className="block italic text-gold-light"
                delay={0.55}
              />
            </h1>

            <Reveal delay={0.95} y={16} className="mt-10 max-w-xl">
              <p className="text-ivory/70 font-light text-base md:text-lg leading-relaxed text-pretty">
                {t.hero.desc}
              </p>
            </Reveal>

            <Reveal delay={1.15} y={16}>
              <div className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Magnetic>
                  <a
                    href="#menu"
                    className="group inline-flex items-center justify-center gap-3 bg-gold text-charcoal px-9 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-gold-light transition-colors duration-500"
                  >
                    {t.hero.viewMenu}
                    <span className="inline-block w-4 h-px bg-charcoal transition-all duration-500 group-hover:w-8" />
                  </a>
                </Magnetic>
                <a
                  href="#delivery"
                  className="group inline-flex items-center justify-center gap-3 px-9 py-4 text-[11px] uppercase tracking-[0.3em] text-ivory border border-ivory/25 hover:border-gold hover:text-gold transition-colors duration-500"
                >
                  {t.hero.deliveryInfo}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: vertical metadata */}
          <div className="hidden lg:flex col-span-12 lg:col-span-4 xl:col-span-5 justify-end items-end">
            <Reveal delay={1} y={20}>
              <div className="flex flex-col items-end gap-8 text-right">
                <div className="text-[10px] uppercase tracking-[0.3em] text-ivory/50 [writing-mode:vertical-rl] rotate-180">
                  Maison de Pâtisserie
                </div>
                <div className="hairline-v h-24" />
                <div className="text-right">
                  <p className="font-serif italic text-2xl text-gold-light">
                    {t.about.promiseTitle}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-ivory/40 mt-2">
                    {t.about.promiseSub}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </motion.div>

      {/* Bottom marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-10 border-t border-ivory/10 bg-charcoal/40 backdrop-blur-md"
      >
        <Marquee
          className="py-4 text-[10px] uppercase tracking-[0.4em] text-ivory/50"
          speed={50}
        >
          <span className="mx-8">Handcrafted Daily</span>
          <span className="text-gold">✦</span>
          <span className="mx-8">Small Batch</span>
          <span className="text-gold">✦</span>
          <span className="mx-8">Slow Made</span>
          <span className="text-gold">✦</span>
          <span className="mx-8">Tashkent</span>
          <span className="text-gold">✦</span>
          <span className="mx-8">Since 2020</span>
          <span className="text-gold">✦</span>
          <span className="mx-8">Maison de Pâtisserie</span>
          <span className="text-gold">✦</span>
        </Marquee>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="hidden lg:flex absolute bottom-24 right-10 z-30 flex-col items-center gap-3 text-ivory/40"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-rl]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
