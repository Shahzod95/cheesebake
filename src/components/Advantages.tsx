import { motion } from 'motion/react';
import { Leaf, HandHeart, Truck, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Advantages() {
  const { t } = useLanguage();
  
  const advantages = [
    {
      icon: Leaf,
      title: t.advantages.a1Title,
      description: t.advantages.a1Desc,
    },
    {
      icon: HandHeart,
      title: t.advantages.a2Title,
      description: t.advantages.a2Desc,
    },
    {
      icon: Truck,
      title: t.advantages.a3Title,
      description: t.advantages.a3Desc,
    },
    {
      icon: Star,
      title: t.advantages.a4Title,
      description: t.advantages.a4Desc,
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {advantages.map((adv, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-gold">
                <adv.icon size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-serif text-charcoal mb-3">{adv.title}</h3>
              <p className="text-charcoal/60 font-light text-sm">
                {adv.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
