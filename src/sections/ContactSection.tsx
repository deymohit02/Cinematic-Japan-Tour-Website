import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(formRef, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', phone: '', comment: '' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Your journey begins here. We will reach out shortly.');
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-[120dvh] flex items-center overflow-hidden bg-mist-black"
    >
      {/* Background image with subtle cinematic parallax */}
      <motion.div
        className="absolute inset-0 z-[1] scale-110"
        style={{ y: bgY }}
      >
        <img
          src="/images/contact-fuji.jpg"
          alt="Mount Fuji"
          className="w-full h-full object-cover object-center opacity-40 grayscale-[0.5] contrast-[1.1]"
        />
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-mist-black/40 to-mist-black/90" />
      </motion.div>

      <div className="max-w-[1440px] mx-auto w-full px-[clamp(24px,8vw,120px)] relative z-[2]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Atmospheric Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-small-caps text-lime-accent mb-6 block tracking-[0.4em]">CONNECT</span>
            <h2 className="text-editorial text-kimono-white italic font-light leading-[1.1] mb-8" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>
              Step into the <br />
              <span className="text-lime-accent/80">unseen Japan.</span>
            </h2>
            <p className="text-kimono-white/50 text-xl font-light leading-relaxed max-w-md">
              Spaces are intentionally limited to preserve the intimacy of the experience. Reach out to reserve your place in the next passage.
            </p>
          </motion.div>

          {/* Right: Refined Form */}
          <motion.div
            ref={formRef}
            className="glass-form rounded-2xl p-[clamp(32px,5vw,64px)] border-white/5"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              <div className="space-y-8">
                {/* Field Group */}
                <div className="relative group">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 block mb-4 group-focus-within:text-lime-accent transition-colors">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-transparent border-b border-white/10 text-kimono-white text-lg py-3 focus:outline-none focus:border-lime-accent transition-all duration-500 placeholder:text-white/10"
                    required
                  />
                </div>

                <div className="relative group">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 block mb-4 group-focus-within:text-lime-accent transition-colors">
                    CONTACT POINT
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (000) 000-0000"
                    className="w-full bg-transparent border-b border-white/10 text-kimono-white text-lg py-3 focus:outline-none focus:border-lime-accent transition-all duration-500 placeholder:text-white/10"
                    required
                  />
                </div>

                <div className="relative group">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 block mb-4 group-focus-within:text-lime-accent transition-colors">
                    INQUIRY
                  </label>
                  <textarea
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    placeholder="Special requests or questions..."
                    rows={3}
                    className="w-full bg-transparent border-b border-white/10 text-kimono-white text-lg py-3 focus:outline-none focus:border-lime-accent transition-all duration-500 resize-none placeholder:text-white/10"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                className="w-full text-small-caps text-mist-black bg-lime-accent py-5 rounded-sm font-bold tracking-[0.2em] shadow-[0_10px_30px_rgba(212,248,122,0.2)] hover:shadow-[0_15px_40px_rgba(212,248,122,0.4)] transition-all duration-500 group overflow-hidden relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">INITIATE REQUEST</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

