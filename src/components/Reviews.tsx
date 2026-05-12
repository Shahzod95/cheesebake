import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Reveal, RevealMask } from './ui/Reveal';

export default function Reviews() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);

  const reviews = [
    { id: 1, text: t.reviews.r1, author: 'Malika R.', role: 'Returning patron' },
    { id: 2, text: t.reviews.r2, author: 'Timur A.', role: 'Anniversary order' },
    { id: 3, text: t.reviews.r3, author: 'Kamila S.', role: 'Corporate gifting' },
  ];

  const next = () => setActive((p) => (p + 1) % reviews.length);
  const prev = () => setActive((p) => (p - 1 + reviews.length) % reviews.length);

  return (
    <section id="reviews" className="relative py-32 md:py-44 bg-ivory-soft overflow-hidden">
      {/* Watermark */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute -top-10 -left-10 font-serif italic text-[18vw] leading-none text-charcoal/[0.035] tracking-tighter whitespace-nowrap"
      >
        Témoignages
      </div>

      <div className="container mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 mb-16 md:mb-20">
          <div className="col-span-12 md:col-span-3">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">— {t.reviews.tag}</p>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-9 md:pl-10">
            <h2 className="font-serif font-light leading-[1.02] tracking-[-0.02em] text-[clamp(2.5rem,7vw,6rem)] text-charcoal">
              <RevealMask text={t.reviews.title} as="span" className="block" />
            </h2>
          </div>
        </div>

        {/* Carousel */}
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
          <div className="col-span-12 lg:col-span-2 hidden lg:block">
            <span className="font-serif italic text-[10rem] leading-none text-gold/30">"</span>
          </div>

          <div className="col-span-12 lg:col-span-8 min-h-[260px] md:min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={reviews[active].id}
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-serif italic text-2xl md:text-4xl lg:text-[2.75rem] leading-[1.2] text-charcoal text-balance">
                  {reviews[active].text}
                </p>
                <div className="mt-10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center text-gold font-serif text-sm">
                    {reviews[active].author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-charcoal">
                      {reviews[active].author}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-charcoal/40 mt-0.5">
                      {reviews[active].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="col-span-12 lg:col-span-2 flex lg:flex-col items-center lg:items-end gap-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-charcoal/50 number-tabular">
              {String(active + 1).padStart(2, '0')}
              <span className="text-charcoal/30 mx-2">/</span>
              {String(reviews.length).padStart(2, '0')}
            </span>
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Previous"
                className="w-10 h-10 rounded-full border border-charcoal/15 flex items-center justify-center text-charcoal/60 hover:bg-charcoal hover:text-ivory hover:border-charcoal transition-colors duration-500"
              >
                <ArrowLeft size={14} strokeWidth={1.5} />
              </button>
              <button
                onClick={next}
                aria-label="Next"
                className="w-10 h-10 rounded-full border border-charcoal/15 flex items-center justify-center text-charcoal/60 hover:bg-charcoal hover:text-ivory hover:border-charcoal transition-colors duration-500"
              >
                <ArrowRight size={14} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Indicators */}
        <Reveal delay={0.2} className="mt-16 pt-10 border-t border-charcoal/10 flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[0.3em] text-charcoal/40">
            Voices from our atelier
          </p>
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Review ${i + 1}`}
                className={`h-px transition-all duration-500 ${
                  i === active ? 'w-12 bg-gold' : 'w-6 bg-charcoal/20 hover:bg-charcoal/40'
                }`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
