import { Logo } from './Logo';
import { useLanguage } from '../context/LanguageContext';
import { Instagram, Send, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-charcoal text-cream py-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-cream/10 pb-12 mb-8">
          <div className="flex-1">
            <Logo className="text-cream items-start" />
            <p className="text-cream/50 font-light text-sm mt-6 max-w-xs">
              {t.footer.desc}
            </p>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="text-cream/70 hover:text-gold transition-colors" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-cream/70 hover:text-gold transition-colors" aria-label="Telegram">
              <Send size={20} />
            </a>
            <a href="#" className="text-cream/70 hover:text-gold transition-colors" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-cream/70 hover:text-gold transition-colors" aria-label="Youtube">
              <Youtube size={20} />
            </a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cream/40 font-light tracking-wider">
          <p>&copy; {new Date().getFullYear()} CHEESEBAKE. {t.footer.rights}</p>
          <p>{t.footer.designed}</p>
        </div>
      </div>
    </footer>
  );
}
