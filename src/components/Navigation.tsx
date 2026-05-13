import { useEffect, useState } from 'react';
import { Globe, Instagram, Facebook, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'PASAGE', href: '#tour' },
    { label: 'PROVISIONS', href: '#included' },
    { label: 'CONNECT', href: '#contact' },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(el, { offset: -100 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-[clamp(24px,5vw,80px)] py-8 pointer-events-none">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          {/* Wordmark */}
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 pointer-events-auto group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-lime-accent/50 transition-colors duration-500">
              <Globe size={14} strokeWidth={1} className="text-kimono-white" />
            </div>
            <span className="text-small-caps text-kimono-white tracking-[0.3em]">JAPAN</span>
          </motion.a>

          {/* Navigation Pill (Problem 8) */}
          <motion.nav 
            className="hidden md:flex items-center gap-1 pointer-events-auto glass-panel rounded-full px-2 py-2 border-white/10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              backgroundColor: scrolled ? 'rgba(20, 20, 20, 0.8)' : 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              scale: scrolled ? 0.95 : 1,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="text-[10px] font-bold tracking-[0.2em] text-white/50 px-6 py-2 rounded-full hover:text-kimono-white hover:bg-white/5 transition-all duration-500 uppercase"
              >
                {link.label}
              </a>
            ))}
          </motion.nav>

          {/* Right Action */}
          <motion.div
            className="hidden md:block pointer-events-auto"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
              className="text-small-caps text-mist-black bg-kimono-white px-8 py-3 rounded-sm hover:bg-lime-accent transition-all duration-500"
            >
              BOOK
            </a>
          </motion.div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 pointer-events-auto cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-px bg-kimono-white transition-all duration-500 ${menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
            <span className={`w-6 h-px bg-kimono-white transition-all duration-500 ${menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="fixed inset-0 z-[45] md:hidden bg-mist-black/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="text-display text-kimono-white text-5xl tracking-tighter hover:text-lime-accent transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
              className="text-small-caps text-mist-black bg-lime-accent px-12 py-4 rounded-sm mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              BOOK NOW
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Social Sidebar */}
      <div className="hidden lg:flex fixed left-8 bottom-8 z-40 flex-col gap-6">
        <div className="h-24 w-px bg-white/10 mx-auto mb-2" />
        {[Instagram, Facebook, Send].map((Icon, i) => (
          <motion.a
            key={i}
            href="#"
            className="text-white/30 hover:text-lime-accent transition-colors duration-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + (i * 0.1) }}
          >
            <Icon size={18} strokeWidth={1} />
          </motion.a>
        ))}
      </div>
    </>
  );
}

