import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n/translations';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  const navLinks = [
    { name: t.nav.about, href: '#about' },
    { name: t.nav.menu, href: '#menu' },
    { name: t.nav.delivery, href: '#delivery' },
    { name: t.nav.reviews, href: '#reviews' },
    { name: t.nav.contact, href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 text-ivory transition-[padding,background-color,backdrop-filter,border-color] duration-700',
        isScrolled
          ? 'bg-charcoal/80 backdrop-blur-xl border-b border-ivory/5 py-3'
          : 'bg-transparent py-5 md:py-6'
      )}
    >
      <div className="container mx-auto px-6 md:px-10 flex items-center justify-between gap-6">
        {/* LEFT — brand mark */}
        <a href="#" className="group inline-flex flex-col leading-none">
          <span className="font-serif italic text-[9px] tracking-[0.35em] uppercase text-ivory/55 mb-1 transition-colors duration-500 group-hover:text-gold-light">
            Maison
          </span>
          <span
            className={cn(
              'font-serif tracking-[0.22em] uppercase text-ivory leading-none transition-[font-size] duration-500',
              isScrolled ? 'text-base md:text-lg' : 'text-lg md:text-xl'
            )}
          >
            Cheesebake
          </span>
          <span
            className={cn(
              'font-light tracking-[0.35em] uppercase text-ivory/55 transition-[opacity,margin,max-height,font-size] duration-500 overflow-hidden',
              isScrolled
                ? 'opacity-0 max-h-0 mt-0 text-[0px]'
                : 'opacity-100 max-h-3 mt-1.5 text-[9px]'
            )}
          >
            {t.logoTagline}
          </span>
        </a>

        {/* RIGHT — nav + lang + CTA (desktop) */}
        <div className="hidden lg:flex items-center gap-9 xl:gap-12">
          <nav className="flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group relative text-[11px] uppercase tracking-[0.25em] text-ivory/70 hover:text-ivory transition-colors duration-500"
              >
                <span className="relative">
                  {link.name}
                  <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-gold transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:w-full" />
                </span>
              </a>
            ))}
          </nav>

          {/* Language pill */}
          <div className="flex items-center gap-2 pl-5 xl:pl-7 border-l border-ivory/15">
            {(['ru', 'uz', 'en'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={cn(
                  'text-[10px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 px-1',
                  language === l ? 'text-gold' : 'text-ivory/40 hover:text-ivory'
                )}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Order CTA */}
          <a
            href="#menu"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-[10px] uppercase tracking-[0.3em] text-ivory border border-ivory/30 hover:border-gold hover:text-charcoal transition-colors duration-500 overflow-hidden"
          >
            <span className="relative z-10">{t.nav.order}</span>
            <span className="relative z-10 inline-block w-3 h-px bg-current transition-all duration-500 group-hover:w-6" />
            <span className="absolute inset-0 bg-gold translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0" />
          </a>
        </div>

        {/* MOBILE — lang + hamburger */}
        <div className="lg:hidden flex items-center gap-3">
          <div className="flex items-center gap-2 mr-1">
            {(['ru', 'uz', 'en'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={cn(
                  'text-[10px] font-medium uppercase tracking-[0.2em] transition-colors px-1',
                  language === l ? 'text-gold' : 'text-ivory/40'
                )}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            className="p-2 -mr-2 text-ivory hover:text-gold transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </motion.header>

    {/* Mobile fullscreen overlay — rendered OUTSIDE motion.header so `position: fixed` is viewport-anchored */}
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[70] bg-charcoal text-ivory lg:hidden"
        >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-ivory/50">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 -mr-2 text-ivory hover:text-gold transition-colors"
                aria-label="Close menu"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="px-6 mt-12 flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="block font-serif text-4xl tracking-tight text-ivory hover:text-gold transition-colors"
                >
                  <span className="text-gold/50 text-xs align-top mr-3 font-sans tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {link.name}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute bottom-10 left-6 right-6"
            >
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center bg-gold text-charcoal py-4 text-[11px] uppercase tracking-[0.3em] mb-8 hover:bg-gold-light transition-colors"
              >
                {t.nav.order}
              </a>
              <div className="hairline mb-6" />
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-ivory/40">
                <span>Tashkent</span>
                <span>+998 90 123 45 67</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
