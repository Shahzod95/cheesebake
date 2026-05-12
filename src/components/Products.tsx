import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Reveal, RevealMask } from './ui/Reveal';
import { Berry, Chocolate, Leaf, Caramel, Nut, Sprinkle } from './ui/Ingredients';
import { ComponentType } from 'react';

const productImages = [
  'https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&q=90&w=1400',
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=90&w=1400',
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=90&w=1400',
  'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=90&w=1400',
];

const cardLayout = [
  'md:col-span-7 md:row-span-2 aspect-[4/5]',
  'md:col-span-5 aspect-[4/3]',
  'md:col-span-5 aspect-[4/3]',
  'md:col-span-7 aspect-[16/10]',
];

type Scatter = {
  Comp: ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  size: number;
  /** Final position relative to the card, in percent. */
  top: string;
  left: string;
  /** Origin offset (where the ingredient starts before flying in). */
  fromX: number;
  fromY: number;
  /** Final rotation in degrees. */
  rotate: number;
  /** Delay multiplier. */
  delay: number;
};

const scatters: Scatter[][] = [
  // Classic NY — nut + sprinkle + caramel
  [
    { Comp: Nut, size: 56, top: '-8%', left: '-6%', fromX: -120, fromY: -90, rotate: -25, delay: 0 },
    { Comp: Caramel, size: 44, top: '88%', left: '92%', fromX: 110, fromY: 80, rotate: 35, delay: 0.12 },
    { Comp: Sprinkle, size: 70, top: '6%', left: '88%', fromX: 120, fromY: -70, rotate: 25, delay: 0.06 },
  ],
  // Wild Berry — berries + leaf
  [
    { Comp: Berry, size: 50, top: '-6%', left: '70%', fromX: 100, fromY: -90, rotate: -40, delay: 0 },
    { Comp: Berry, size: 38, top: '85%', left: '8%', fromX: -110, fromY: 100, rotate: 60, delay: 0.1 },
    { Comp: Leaf, size: 64, top: '78%', left: '78%', fromX: 110, fromY: 100, rotate: 30, delay: 0.18 },
  ],
  // Chocolate Truffle — chocolate + nut
  [
    { Comp: Chocolate, size: 64, top: '-10%', left: '12%', fromX: -110, fromY: -100, rotate: -35, delay: 0 },
    { Comp: Chocolate, size: 48, top: '82%', left: '78%', fromX: 110, fromY: 90, rotate: 45, delay: 0.12 },
    { Comp: Nut, size: 48, top: '8%', left: '88%', fromX: 120, fromY: -70, rotate: 25, delay: 0.06 },
  ],
  // Caramel Pecan — caramel + nut + sprinkle
  [
    { Comp: Caramel, size: 60, top: '-8%', left: '8%', fromX: -110, fromY: -90, rotate: -30, delay: 0 },
    { Comp: Nut, size: 56, top: '6%', left: '92%', fromX: 120, fromY: -80, rotate: 20, delay: 0.08 },
    { Comp: Sprinkle, size: 70, top: '88%', left: '50%', fromX: 0, fromY: 100, rotate: -10, delay: 0.16 },
  ],
];

export default function Products() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <section id="menu" className="relative py-32 md:py-44 bg-cream overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 mb-20 md:mb-24">
          <div className="col-span-12 md:col-span-3">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                — {t.products.tag}
              </p>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-9 md:pl-10">
            <h2 className="font-serif font-light leading-[1.02] tracking-[-0.02em] text-[clamp(2.5rem,7vw,6rem)] text-charcoal">
              <RevealMask text={t.products.title} as="span" className="block" />
            </h2>
            <Reveal delay={0.3} className="max-w-xl mt-8">
              <p className="text-charcoal/60 font-light text-base md:text-lg leading-relaxed text-pretty">
                {t.products.desc}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Asymmetric bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 auto-rows-auto">
          {t.products.items.map((product, index) => (
            <motion.a
              key={index}
              href="#contact"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative block ${cardLayout[index] || 'md:col-span-6 aspect-[4/3]'}`}
            >
              {/* Scattered ingredients (outside the image, around the card) */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 md:-inset-10 z-20 overflow-visible"
              >
                {(scatters[index] || []).map((s, i) => (
                  <motion.div
                    key={i}
                    initial={
                      reduce
                        ? { opacity: 1, x: 0, y: 0, rotate: s.rotate, scale: 1 }
                        : { opacity: 0, x: s.fromX, y: s.fromY, rotate: 0, scale: 0.4 }
                    }
                    whileInView={{ opacity: 1, x: 0, y: 0, rotate: s.rotate, scale: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{
                      duration: 1.2,
                      delay: 0.25 + index * 0.05 + s.delay,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ top: s.top, left: s.left }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 will-change-transform drop-shadow-[0_8px_18px_rgba(0,0,0,0.25)]"
                  >
                    <s.Comp size={s.size} />
                  </motion.div>
                ))}
              </div>

              <div className="relative w-full h-full overflow-hidden bg-cream-dark z-10">
                <motion.img
                  src={productImages[index]}
                  alt={product.name}
                  className="w-full h-full object-cover will-change-transform"
                  initial={false}
                  whileHover={reduce ? undefined : { scale: 1.06 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  referrerPolicy="no-referrer"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Number badge */}
                <div className="absolute top-5 left-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-ivory/80">
                  <span className="text-gold-light">N°{String(index + 1).padStart(2, '0')}</span>
                  <span className="h-px w-6 bg-ivory/30" />
                </div>

                {/* Arrow hover indicator */}
                <div className="absolute top-5 right-5 w-10 h-10 rounded-full border border-ivory/30 flex items-center justify-center text-ivory/80 transition-all duration-500 group-hover:bg-gold group-hover:border-gold group-hover:text-charcoal group-hover:rotate-45">
                  <ArrowUpRight size={16} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <h3 className="font-serif text-2xl md:text-3xl text-ivory mb-2 leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-ivory/70 font-light text-sm leading-relaxed max-w-md text-pretty">
                    {product.desc}
                  </p>

                  {/* Hover hairline */}
                  <div className="mt-5 h-px w-0 bg-gold transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:w-24" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer link */}
        <Reveal delay={0.2} className="mt-20 flex items-center justify-between gap-6 border-t border-charcoal/10 pt-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-charcoal/40">
            Custom orders available — by inquiry
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-charcoal hover:text-gold transition-colors"
          >
            Request a tasting
            <span className="inline-block w-6 h-px bg-current transition-all duration-500 group-hover:w-12" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
