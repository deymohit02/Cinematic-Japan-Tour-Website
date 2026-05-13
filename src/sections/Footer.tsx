import { Globe, Instagram, Facebook, Send } from 'lucide-react';

export default function Footer() {
  const navLinks = [
    { label: 'HOME', href: '#' },
    { label: 'ABOUT', href: '#about' },
    { label: 'INCLUDED', href: '#included' },
    { label: 'CONTACTS', href: '#contact' },
  ];

  const scrollTo = (href: string) => {
    if (href === '#') {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const el = document.querySelector(href);
    if (el) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(el, { offset: -100 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-mist-black border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-[clamp(24px,5vw,80px)] py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Wordmark */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); scrollTo('#'); }}
              className="flex items-center gap-2 cursor-hover"
            >
              <Globe size={16} strokeWidth={1.5} className="text-kimono-white" />
              <span className="text-small-caps text-kimono-white">JAPAN TOURS</span>
            </a>
            <span className="text-xs text-mouse-gray">
              &copy; 2024 Japan Tours. All rights reserved.
            </span>
          </div>

          {/* Center: Nav links */}
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="text-small-caps text-kimono-white nav-link-underline cursor-hover"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-kimono-white/40 hover:text-kimono-white transition-colors duration-300 cursor-hover"
              aria-label="Instagram"
            >
              <Instagram size={20} strokeWidth={1} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-kimono-white/40 hover:text-kimono-white transition-colors duration-300 cursor-hover"
              aria-label="Facebook"
            >
              <Facebook size={20} strokeWidth={1} />
            </a>
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-kimono-white/40 hover:text-kimono-white transition-colors duration-300 cursor-hover"
              aria-label="Telegram"
            >
              <Send size={20} strokeWidth={1} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
