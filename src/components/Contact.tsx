import { motion } from 'motion/react';
import { Phone, Send, Instagram, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  
  return (
    <section id="contact" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="max-w-4xl mx-auto bg-cream-dark p-6 sm:p-8 md:p-16 rounded-sm">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">{t.contact.title}</h2>
            <p className="text-charcoal/60 font-light">
              {t.contact.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gold shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-charcoal/50 uppercase tracking-widest mb-1">{t.contact.phone}</p>
                  <a href="tel:+998901234567" className="text-lg text-charcoal hover:text-gold transition-colors">
                    +998 90 123 45 67
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gold shrink-0">
                  <Send size={20} />
                </div>
                <div>
                  <p className="text-sm text-charcoal/50 uppercase tracking-widest mb-1">{t.contact.telegram}</p>
                  <a href="#" className="text-lg text-charcoal hover:text-gold transition-colors">
                    @cheesebake_uz
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gold shrink-0">
                  <Instagram size={20} />
                </div>
                <div>
                  <p className="text-sm text-charcoal/50 uppercase tracking-widest mb-1">{t.contact.instagram}</p>
                  <a href="#" className="text-lg text-charcoal hover:text-gold transition-colors">
                    @cheesebake.uz
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gold shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-sm text-charcoal/50 uppercase tracking-widest mb-1">{t.contact.hours}</p>
                  <p className="text-lg text-charcoal">
                    {t.contact.hoursVal}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-16 text-center">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-charcoal text-cream text-sm uppercase tracking-widest hover:bg-gold transition-colors duration-300 w-full sm:w-auto"
            >
              <Send size={18} />
              {t.contact.btn}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
