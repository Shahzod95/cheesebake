import { Phone, Send, Instagram, Clock, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Reveal, RevealMask } from './ui/Reveal';
import { Magnetic } from './ui/Magnetic';

export default function Contact() {
  const { t } = useLanguage();

  const channels = [
    { icon: Phone, label: t.contact.phone, value: '+998 90 123 45 67', href: 'tel:+998901234567' },
    { icon: Send, label: t.contact.telegram, value: '@cheesebake_uz', href: '#' },
    { icon: Instagram, label: t.contact.instagram, value: '@cheesebake.uz', href: '#' },
    { icon: Clock, label: t.contact.hours, value: t.contact.hoursVal, href: null },
  ];

  return (
    <section id="contact" className="relative py-32 md:py-44 bg-charcoal text-ivory overflow-hidden">
      {/* Watermark */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute -top-12 left-1/2 -translate-x-1/2 font-serif italic text-[18vw] leading-none text-ivory/[0.04] tracking-tighter whitespace-nowrap"
      >
        Contact
      </div>

      <div className="container mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 mb-20 md:mb-24">
          <div className="col-span-12 md:col-span-3">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">— A word with us</p>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-9 md:pl-10">
            <h2 className="font-serif font-light leading-[1.02] tracking-[-0.02em] text-[clamp(2.5rem,7vw,6rem)] text-ivory">
              <RevealMask text={t.contact.title} as="span" className="block" />
            </h2>
            <Reveal delay={0.3} className="max-w-xl mt-8">
              <p className="text-ivory/60 font-light text-base md:text-lg leading-relaxed text-pretty">
                {t.contact.desc}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-ivory/10">
          {channels.map((c, i) => {
            const Inner = (
              <div
                className={`group relative h-full px-2 py-8 md:py-10 ${
                  i < channels.length - 1 ? 'md:border-r border-ivory/10' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gold number-tabular">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {c.href && (
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.5}
                      className="text-ivory/40 transition-all duration-500 group-hover:text-gold group-hover:rotate-45"
                    />
                  )}
                </div>
                <c.icon size={22} strokeWidth={1.2} className="text-ivory/60 mb-6" />
                <p className="text-[10px] uppercase tracking-[0.3em] text-ivory/40 mb-2">
                  {c.label}
                </p>
                <p className="font-serif text-xl md:text-2xl text-ivory leading-tight text-balance">
                  {c.value}
                </p>
              </div>
            );

            return (
              <Reveal key={i} delay={i * 0.08}>
                {c.href ? (
                  <a href={c.href} className="block h-full">
                    {Inner}
                  </a>
                ) : (
                  Inner
                )}
              </Reveal>
            );
          })}
        </div>

        {/* Form */}
        <div className="mt-24 grid grid-cols-12 gap-y-12 md:gap-x-10">
          <div className="col-span-12 md:col-span-4">
            <Reveal>
              <p className="font-serif italic text-2xl md:text-3xl text-ivory/90 text-balance leading-tight">
                Send us a note — bespoke orders, tastings, or simply to say bonjour.
              </p>
              <div className="hairline mt-8 w-32" />
            </Reveal>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="col-span-12 md:col-span-8 md:pl-10 space-y-8"
          >
            <Reveal delay={0.1}>
              <Field label="Your name" placeholder="Marie Dubois" />
            </Reveal>
            <Reveal delay={0.18}>
              <Field label="Contact" placeholder="Phone or @telegram" />
            </Reveal>
            <Reveal delay={0.26}>
              <Field label="Your message" placeholder="Tell us about your occasion..." textarea />
            </Reveal>
            <Reveal delay={0.34}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 pt-2">
                <p className="text-[10px] uppercase tracking-[0.3em] text-ivory/40">
                  We respond within 12h
                </p>
                <Magnetic>
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 bg-gold text-charcoal px-10 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-gold-light transition-colors duration-500"
                  >
                    {t.contact.btn}
                    <span className="inline-block w-4 h-px bg-charcoal transition-all duration-500 group-hover:w-10" />
                  </button>
                </Magnetic>
              </div>
            </Reveal>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  placeholder,
  textarea = false,
}: {
  label: string;
  placeholder: string;
  textarea?: boolean;
}) {
  return (
    <label className="block group">
      <span className="block text-[10px] uppercase tracking-[0.3em] text-ivory/40 mb-3">
        {label}
      </span>
      {textarea ? (
        <textarea
          rows={3}
          placeholder={placeholder}
          className="w-full bg-transparent border-b border-ivory/15 pb-3 text-ivory placeholder:text-ivory/25 font-light text-lg focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          className="w-full bg-transparent border-b border-ivory/15 pb-3 text-ivory placeholder:text-ivory/25 font-light text-lg focus:outline-none focus:border-gold transition-colors duration-300"
        />
      )}
    </label>
  );
}
