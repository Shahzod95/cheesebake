import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

const productImages = [
  'https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800',
];

export default function Products() {
  const { t } = useLanguage();
  
  return (
    <section id="menu" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="text-gold uppercase tracking-[0.2em] text-sm mb-4 block">{t.products.tag}</span>
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-6">
            {t.products.title}
          </h2>
          <p className="text-charcoal/60 font-light">
            {t.products.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {t.products.items.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-cream-dark">
                <img
                  src={productImages[index]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-serif text-charcoal mb-3">{product.name}</h3>
                <p className="text-charcoal/60 font-light text-sm max-w-md mx-auto">
                  {product.description || product.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
