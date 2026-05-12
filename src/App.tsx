import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Showcase from './components/Showcase';
import Delivery from './components/Delivery';
import Advantages from './components/Advantages';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { Atmosphere } from './components/ui/Atmosphere';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-ivory font-sans text-charcoal selection:bg-gold selection:text-ivory overflow-x-clip">
        <Atmosphere />
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Products />
          <Showcase />
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
