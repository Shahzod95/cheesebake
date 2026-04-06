import { motion } from 'motion/react';
import { Clock, MapPin, PackageCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Delivery() {
  const { t } = useLanguage();
  
  return (
    <section id="delivery" className="py-24 md:py-32 bg-charcoal text-cream">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold uppercase tracking-[0.2em] text-sm mb-4 block">{t.delivery.tag}</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
              {t.delivery.title}
            </h2>
            <p className="text-cream/70 font-light leading-relaxed mb-10 text-lg">
              {t.delivery.desc}
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                  <Clock className="text-gold" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-serif mb-2">{t.delivery.f1Title}</h4>
                  <p className="text-cream/60 font-light text-sm">{t.delivery.f1Desc}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                  <MapPin className="text-gold" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-serif mb-2">{t.delivery.f2Title}</h4>
                  <p className="text-cream/60 font-light text-sm">{t.delivery.f2Desc}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                  <PackageCheck className="text-gold" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-serif mb-2">{t.delivery.f3Title}</h4>
                  <p className="text-cream/60 font-light text-sm">{t.delivery.f3Desc}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[600px] mt-8 lg:mt-0"
          >
            <img
              src="https://images.unsplash.com/photo-1620189507195-68309c04c4d0?auto=format&fit=crop&q=80&w=1000"
              alt="Premium packaging"
              className="absolute inset-0 w-full h-full object-cover rounded-sm opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 border border-gold/30 m-4 sm:m-6 rounded-sm pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
