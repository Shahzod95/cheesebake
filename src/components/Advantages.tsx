import { Leaf, HandHeart, Truck, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Reveal } from './ui/Reveal';

export default function Advantages() {
  const { t } = useLanguage();

  const advantages = [
    { n: '01', icon: Leaf, title: t.advantages.a1Title, description: t.advantages.a1Desc },
    { n: '02', icon: HandHeart, title: t.advantages.a2Title, description: t.advantages.a2Desc },
    { n: '03', icon: Truck, title: t.advantages.a3Title, description: t.advantages.a3Desc },
    { n: '04', icon: Star, title: t.advantages.a4Title, description: t.advantages.a4Desc },
  ];

  return (
    <section className="relative py-28 md:py-36 bg-ivory">
      <div className="container mx-auto px-6 md:px-10">
        <Reveal>
          <div className="flex items-center justify-center gap-4 mb-16 md:mb-20">
            <span className="h-px w-12 bg-gold/40" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
              The Maison Standard
            </span>
            <span className="h-px w-12 bg-gold/40" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {advantages.map((adv, i) => (
            <Reveal key={adv.n} delay={i * 0.08} className="group">
              <div
                className={`relative h-full px-6 py-10 md:px-8 md:py-12 ${
                  i < advantages.length - 1 ? 'lg:border-r border-charcoal/10' : ''
                } ${i % 2 === 0 ? 'md:border-r md:border-charcoal/10 lg:border-r' : ''}`}
              >
                {/* Top number + hairline */}
                <div className="flex items-center gap-4 mb-10">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gold number-tabular">
                    N°{adv.n}
                  </span>
                  <span className="h-px flex-1 bg-charcoal/10 transition-all duration-700 group-hover:bg-gold" />
                </div>

                {/* Icon */}
                <div className="mb-6 text-charcoal/70 transition-colors duration-500 group-hover:text-gold">
                  <adv.icon size={32} strokeWidth={1} />
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl text-charcoal mb-4 leading-tight text-balance">
                  {adv.title}
                </h3>

                {/* Description */}
                <p className="text-charcoal/55 font-light text-sm leading-relaxed text-pretty">
                  {adv.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
