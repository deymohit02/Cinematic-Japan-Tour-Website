import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import IncludedSection from './sections/IncludedSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll (Problem 4)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    const handleResize = () => {
      lenis.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative bg-mist-black min-h-screen selection:bg-lime-accent/30 selection:text-kimono-white">
      <CustomCursor />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <IncludedSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;


