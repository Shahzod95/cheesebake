import { useLanguage } from '../context/LanguageContext';
import { Instagram, Send, Facebook, Youtube } from 'lucide-react';
import { Reveal } from './ui/Reveal';

export default function Footer() {
  const { t } = useLanguage();

  const cols = [
    {
      title: 'Maison',
      links: [
        { label: t.nav.about, href: '#about' },
        { label: t.nav.menu, href: '#menu' },
        { label: t.nav.delivery, href: '#delivery' },
      ],
    },
    {
      title: 'Reach',
      links: [
        { label: 'Telegram', href: '#' },
        { label: 'Instagram', href: '#' },
        { label: '+998 90 123 45 67', href: 'tel:+998901234567' },
      ],
    },
    {
      title: 'Atelier',
      links: [
        { label: 'Tashkent', href: '#contact' },
        { label: 'Mon — Sun · 09–22', href: '#contact' },
        { label: 'By appointment', href: '#contact' },
      ],
    },
  ];

  return (
    <footer className="relative bg-graphite text-ivory pt-24 pb-10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        {/* Top: cols */}
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-10 pb-16 border-b border-ivory/10">
          <div className="col-span-12 md:col-span-5">
            <Reveal>
              <p className="font-serif italic text-2xl md:text-3xl text-ivory/90 leading-tight max-w-md text-balance">
                Cheesecake, slow-made — in the spirit of a Parisian maison.
              </p>
              <div className="hairline mt-8 w-32" />
              <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-ivory/40 max-w-xs">
                {t.footer.desc}
              </p>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-7 grid grid-cols-3 gap-6 md:gap-10">
            {cols.map((col, i) => (
              <Reveal key={col.title} delay={i * 0.06}>
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold mb-6">
                  — {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="group inline-flex items-baseline gap-2 text-sm text-ivory/70 hover:text-ivory transition-colors"
                      >
                        <span className="relative">
                          {l.label}
                          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Massive wordmark */}
        <Reveal y={0} delay={0.1} className="pt-14 pb-10">
          <div className="overflow-hidden">
            <h2
              aria-hidden
              className="font-serif italic font-light text-center leading-[0.85] tracking-[-0.04em] text-ivory whitespace-nowrap"
              style={{ fontSize: 'clamp(4rem, 18vw, 22rem)' }}
            >
              Cheesebake
            </h2>
          </div>
        </Reveal>

        {/* Bottom strip */}
        <div className="border-t border-ivory/10 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[10px] uppercase tracking-[0.3em] text-ivory/40">
          <p>&copy; {new Date().getFullYear()} Cheesebake — {t.footer.rights}</p>
          <div className="flex items-center gap-5">
            <a href="#" aria-label="Instagram" className="hover:text-gold transition-colors">
              <Instagram size={16} strokeWidth={1.5} />
            </a>
            <a href="#" aria-label="Telegram" className="hover:text-gold transition-colors">
              <Send size={16} strokeWidth={1.5} />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-gold transition-colors">
              <Facebook size={16} strokeWidth={1.5} />
            </a>
            <a href="#" aria-label="Youtube" className="hover:text-gold transition-colors">
              <Youtube size={16} strokeWidth={1.5} />
            </a>
          </div>
          <p>{t.footer.designed}</p>
        </div>
      </div>
    </footer>
  );
}
