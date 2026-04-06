import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Delivery from './components/Delivery';
import Advantages from './components/Advantages';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-cream font-sans text-charcoal selection:bg-gold selection:text-white overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Products />
          <Delivery />
          <Advantages />
          <Reviews />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
