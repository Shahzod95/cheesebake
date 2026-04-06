import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 text-white',
        isScrolled ? 'bg-charcoal/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#" className="relative z-10">
          <Logo className={isScrolled ? 'scale-90 origin-left transition-transform' : 'transition-transform'} />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm uppercase tracking-widest text-white/80 hover:text-gold transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#menu"
            className="px-6 py-2.5 bg-white text-charcoal text-sm uppercase tracking-widest hover:bg-gold hover:text-white transition-colors"
          >
            {t.nav.order}
          </a>
          
          {/* Language Switcher */}
          <div className="flex items-center gap-3 ml-2 xl:ml-4 border-l border-white/20 pl-4 xl:pl-6">
            {(['ru', 'uz', 'en'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={cn(
                  "text-xs font-medium uppercase tracking-wider transition-colors",
                  language === l ? "text-gold" : "text-white/50 hover:text-white"
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile Menu Toggle & Lang */}
        <div className="lg:hidden flex items-center gap-2 sm:gap-4 relative z-10">
          <div className="flex items-center gap-1 sm:gap-2 mr-1 sm:mr-2">
            {(['ru', 'uz', 'en'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={cn(
                  "text-[10px] sm:text-xs font-medium uppercase tracking-wider transition-colors px-1",
                  language === l ? "text-gold" : "text-white/50 hover:text-white"
                )}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            className="text-white p-1 sm:p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-charcoal shadow-lg border-t border-white/10 p-6 flex flex-col gap-6 lg:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg uppercase tracking-widest text-white hover:text-gold text-center transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-4 bg-white text-charcoal text-sm uppercase tracking-widest text-center hover:bg-gold hover:text-white transition-colors"
            >
              {t.nav.order}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
