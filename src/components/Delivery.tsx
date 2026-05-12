import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { Clock, MapPin, PackageCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Reveal, RevealMask } from './ui/Reveal';

export default function Delivery() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-10%', '10%']);

  const steps = [
    { n: '01', icon: Clock, title: t.delivery.f1Title, desc: t.delivery.f1Desc },
    { n: '02', icon: MapPin, title: t.delivery.f2Title, desc: t.delivery.f2Desc },
    { n: '03', icon: PackageCheck, title: t.delivery.f3Title, desc: t.delivery.f3Desc },
  ];

  return (
    <section
      ref={ref}
      id="delivery"
      className="py-32 md:py-44 bg-charcoal text-ivory overflow-hidden"
      style={{ position: 'relative' }}
    >
      {/* Watermark */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute -bottom-16 -right-10 font-serif italic text-[18vw] leading-none text-ivory/[0.03] tracking-tighter whitespace-nowrap"
      >
        Livraison
      </div>

      <div className="container mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 mb-20 md:mb-28">
          <div className="col-span-12 md:col-span-3">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                — {t.delivery.tag}
              </p>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-9 md:pl-10">
            <h2 className="font-serif font-light leading-[1.02] tracking-[-0.02em] text-[clamp(2.5rem,7vw,6rem)] text-ivory">
              <RevealMask text={t.delivery.title} as="span" className="block" />
            </h2>
            <Reveal delay={0.3} className="max-w-xl mt-8">
              <p className="text-ivory/60 font-light text-base md:text-lg leading-relaxed text-pretty">
                {t.delivery.desc}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Split: image left, timeline right */}
        <div className="grid grid-cols-12 gap-y-16 md:gap-x-10 items-start">
          {/* Image */}
          <div className="col-span-12 lg:col-span-5">
            <Reveal y={28}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <motion.img
                  style={{ y: imgY }}
                  src="https://images.unsplash.com/photo-1620189507195-68309c04c4d0?auto=format&fit=crop&q=90&w=1200"
                  alt="Premium packaging"
                  className="w-full h-[115%] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-charcoal/20" />
                <div className="absolute inset-4 border border-gold/30 pointer-events-none" />
              </div>
              <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-ivory/40">
                <span>Signature Box</span>
                <span>F.02</span>
              </div>
            </Reveal>
          </div>

          {/* Timeline */}
          <div className="col-span-12 lg:col-span-7 lg:pl-10 xl:pl-20">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[14px] top-2 bottom-2 w-px bg-ivory/10" />

              <div className="space-y-12 md:space-y-16">
                {steps.map((step, i) => (
                  <Reveal key={step.n} delay={i * 0.12} y={20}>
                    <div className="relative pl-14">
                      {/* Dot */}
                      <div className="absolute left-0 top-1.5 w-[30px] h-[30px] rounded-full border border-gold flex items-center justify-center bg-charcoal">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      </div>

                      <div className="flex items-baseline gap-4 mb-4">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-gold number-tabular">
                          {step.n}
                        </span>
                        <span className="h-px w-10 bg-gold/40 translate-y-[-2px]" />
                        <step.icon size={16} strokeWidth={1.5} className="text-gold/70" />
                      </div>

                      <h3 className="font-serif text-2xl md:text-3xl text-ivory mb-3 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-ivory/60 font-light leading-relaxed max-w-md text-pretty">
                        {step.desc}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Closing note */}
            <Reveal delay={0.4} className="mt-16 pt-10 border-t border-ivory/10">
              <div className="flex items-center justify-between gap-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-ivory/40">
                  Tashkent — same day before 18:00
                </p>
                <span className="font-serif italic text-gold text-lg">avec soin</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
