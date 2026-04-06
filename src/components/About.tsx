import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="py-24 md:py-32 bg-cream">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] w-full max-w-md md:max-w-lg mx-auto lg:mx-0">
              <img
                src="https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=1000"
                alt="Chef preparing dessert"
                className="w-full h-full object-cover rounded-sm"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-cream-dark -z-10 hidden md:block" />
              <div className="absolute -top-8 -left-8 w-32 h-32 border border-gold/30 -z-10 hidden md:block" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 flex flex-col justify-center"
          >
            <span className="text-gold uppercase tracking-[0.2em] text-sm mb-4 block">{t.about.tag}</span>
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-8 leading-tight">
              {t.about.title1} <br /> <span className="italic">{t.about.title2}</span>{t.about.title3}
            </h2>
            <div className="space-y-6 text-charcoal/70 font-light leading-relaxed">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>
            
            <div className="mt-10 pt-10 border-t border-cream-dark">
              <p className="font-serif text-2xl italic text-charcoal">
                {t.about.promiseTitle}
              </p>
              <p className="text-sm uppercase tracking-widest text-charcoal/50 mt-2">
                {t.about.promiseSub}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
