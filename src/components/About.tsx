import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Reveal, RevealMask } from './ui/Reveal';

export default function About() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%']);

  const facts = [
    { n: '01', label: t.about.tag, value: '100%' },
    { n: '02', label: 'Slow Craft', value: '48H' },
    { n: '03', label: 'Daily', value: 'Fresh' },
  ];

  return (
    <section
      ref={ref}
      id="about"
      className="py-32 md:py-44 bg-ivory overflow-hidden"
      style={{ position: 'relative' }}
    >
      {/* Massive watermark */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute -top-10 left-1/2 -translate-x-1/2 font-serif italic text-[20vw] leading-none text-charcoal/[0.035] tracking-tighter whitespace-nowrap"
      >
        Maison
      </div>

      <div className="container mx-auto px-6 md:px-10">
        {/* Header strip */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20 md:mb-28">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
                — {t.about.tag}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[10px] uppercase tracking-[0.3em] text-charcoal/40">
              Chapter 01 / Origin
            </p>
          </Reveal>
        </div>

        {/* Editorial split */}
        <div className="grid grid-cols-12 gap-y-16 md:gap-x-10 items-start">
          {/* Image column */}
          <div className="col-span-12 lg:col-span-5">
            <Reveal y={32}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <motion.img
                  style={{ y: imgY }}
                  src="https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=90&w=1200"
                  alt="Chef preparing dessert"
                  className="w-full h-[115%] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-charcoal/5" />
              </div>
              <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-charcoal/40">
                <span>Atelier — Tashkent</span>
                <span>F.01</span>
              </div>
            </Reveal>
          </div>

          {/* Text column */}
          <div className="col-span-12 lg:col-span-7 lg:pl-10 xl:pl-20">
            <h2 className="font-serif font-light leading-[1.05] tracking-[-0.015em] text-[clamp(2.2rem,5vw,4.5rem)] text-charcoal mb-12">
              <RevealMask text={t.about.title1} as="span" className="block" />
              <RevealMask
                text={`${t.about.title2}${t.about.title3}`}
                as="span"
                className="block italic text-gold-dark"
                delay={0.2}
              />
            </h2>

            <Reveal delay={0.3} className="space-y-6 text-charcoal/70 font-light leading-relaxed max-w-xl text-base md:text-lg text-pretty">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </Reveal>

            {/* Numbered facts */}
            <div className="mt-16 pt-10 border-t border-charcoal/10 grid grid-cols-3 gap-4 md:gap-8 max-w-xl">
              {facts.map((f, i) => (
                <Reveal key={f.n} delay={0.4 + i * 0.08}>
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.3em] text-gold mb-3">
                      {f.n}
                    </span>
                    <span className="block font-serif text-3xl md:text-4xl text-charcoal number-tabular">
                      {f.value}
                    </span>
                    <span className="block text-[10px] uppercase tracking-[0.25em] text-charcoal/50 mt-2">
                      {f.label}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Signature promise */}
            <Reveal delay={0.6} className="mt-16">
              <div className="hairline w-32 mb-6" />
              <p className="font-serif italic text-2xl md:text-3xl text-charcoal text-balance">
                {t.about.promiseTitle}
              </p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-charcoal/40 mt-3">
                — {t.about.promiseSub}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
