import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=2000"
          alt="Premium Cheesecake"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-charcoal/40" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center text-cream flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <span className="block text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 text-cream/90">
            {t.hero.subtitle}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mb-6 leading-tight">
            {t.hero.title1} <br className="hidden sm:block" />
            <span className="italic text-gold-light">{t.hero.title2}</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl font-light text-cream/80 mb-10 px-4 sm:px-0">
            {t.hero.desc}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-6 sm:px-0">
            <a
              href="#menu"
              className="px-8 py-4 bg-gold text-white text-sm uppercase tracking-widest hover:bg-white hover:text-charcoal transition-colors duration-300 w-full sm:w-auto"
            >
              {t.hero.viewMenu}
            </a>
            <a
              href="#delivery"
              className="px-8 py-4 bg-transparent border border-cream text-cream text-sm uppercase tracking-widest hover:bg-cream hover:text-charcoal transition-colors duration-300 w-full sm:w-auto"
            >
              {t.hero.deliveryInfo}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
