import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Reviews() {
  const { t } = useLanguage();
  
  const reviews = [
    {
      id: 1,
      text: t.reviews.r1,
      author: "Malika R.",
    },
    {
      id: 2,
      text: t.reviews.r2,
      author: "Timur A.",
    },
    {
      id: 3,
      text: t.reviews.r3,
      author: "Kamila S.",
    },
  ];

  return (
    <section id="reviews" className="py-24 md:py-32 bg-cream-dark">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.2em] text-sm mb-4 block">{t.reviews.tag}</span>
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal">
            {t.reviews.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-8 rounded-sm shadow-sm relative"
            >
              <Quote className="text-gold/20 absolute top-6 left-6" size={48} />
              <div className="relative z-10 pt-8">
                <p className="text-charcoal/80 font-light italic mb-6 leading-relaxed">
                  "{review.text}"
                </p>
                <p className="text-charcoal font-medium uppercase tracking-wider text-sm">
                  — {review.author}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
