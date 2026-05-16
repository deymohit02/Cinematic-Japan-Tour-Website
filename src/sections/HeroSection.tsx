import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SakuraPetals from '../components/SakuraPetals';

const polaroidCards = [
  { video: '/videos/polaroid-1.mp4', caption: '3 cities in Japan', rotation: -3 },
  { video: '/videos/polaroid-2.mp4', caption: '10 days', rotation: -1 },
  { video: '/videos/polaroid-3.mp4', caption: 'gigabytes of photos', rotation: 0 },
  { video: '/videos/polaroid-4.mp4', caption: 'eat ramen', rotation: 1 },
  { video: '/videos/polaroid-5.mp4', caption: 'enjoy the vibe', rotation: 3 },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Parallax Speeds
  const mountainY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const typographyY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const polaroidX = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);

  const handlePolaroidHover = (index: number, isHovering: boolean) => {
    const video = videoRefs.current[index];
    if (video) {
      if (isHovering) {
        video.play().catch(() => { });
      } else {
        video.pause();
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-[#0A0A0A]"
    >
      {/* Background (z-1) */}
      <motion.div
        className="absolute inset-0 z-[1]"
        style={{ y: mountainY, willChange: 'transform' }}
      >
        <motion.img
          src="/images/hero-background.jpg"
          alt="Misty Japanese mountains"
          className="w-full h-full object-cover object-center"
          style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={loaded ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/20 to-[#0A0A0A]/40" />
      </motion.div>

      {/* Deep Sakura Layer (z-2) - Behind Typography */}
      <div className="absolute inset-0 z-[2] pointer-events-none opacity-40">
        <SakuraPetals />
      </div>

      {/* Typography (z-3) */}
      <motion.div
        className="absolute inset-0 z-[3] flex items-center justify-center pointer-events-none"
        style={{
          y: typographyY,
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        <motion.h1
          className="text-editorial text-kimono-white select-none w-full text-center tracking-tighter"
          style={{
            fontSize: 'clamp(70px, 22vw, 420px)',
            lineHeight: 0.8,
            fontWeight: 700,
            marginTop: '-10dvh'
          }}
          initial={{ opacity: 0, y: 100 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          JAPAN
        </motion.h1>
      </motion.div>

      {/* Mid Sakura Layer (z-4) - In front of Typography, behind Mountains */}
      <div className="absolute inset-0 z-[4] pointer-events-none opacity-60">
        <SakuraPetals />
      </div>

      {/* Mountains (z-5) */}
      <motion.div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{ y: mountainY, willChange: 'transform' }}
      >
        <motion.img
          src="/images/hero-background.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 40%, black 60%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 40%, black 60%, black 100%)',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={loaded ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>

      {/* Kimono (z-6) */}
      <motion.div
        className="absolute bottom-0 z-[6] pointer-events-none right-[5%] h-[85dvh] md:h-[90dvh]"
        initial={{ opacity: 0, x: 50 }}
        animate={loaded ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src="/images/hero-kimono.png"
          alt="Woman in floral kimono"
          className="h-full w-auto object-contain object-bottom"
          loading="eager"
        />
      </motion.div>

      {/* Foreground Sakura Layer (z-20) - On top of everything except UI */}
      <div className="absolute inset-0 z-[20] pointer-events-none">
        <SakuraPetals />
      </div>

      {/* Polaroids (z-25) */}
      <motion.div
        className="absolute z-[25] flex items-end w-full"
        style={{
          bottom: 'clamp(20px, 6dvh, 100px)',
          left: 0,
          paddingLeft: 'clamp(24px, 5vw, 80px)',
          paddingRight: 'clamp(24px, 5vw, 80px)',
          x: polaroidX,
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-0 items-end">
          {polaroidCards.map((card, index) => (
            <motion.div
              key={index}
              className="relative bg-kimono-white rounded flex-shrink-0 cursor-pointer overflow-hidden group [--negative-margin:-15px] md:[--negative-margin:-15px] max-md:[--negative-margin:0px]"
              style={{
                width: 'clamp(100px, 11vw, 150px)',
                height: 'clamp(130px, 14vw, 190px)',
                padding: '8px 8px 20px 8px',
                marginLeft: index > 0 ? 'var(--negative-margin, -15px)' : '0',
                rotate: card.rotation,
                boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                zIndex: index,
              }}
              whileHover={{
                y: -12,
                scale: 1.05,
                rotate: card.rotation * 0.5,
                boxShadow: '0 20px 40px rgba(255, 184, 197, 0.3)',
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              }}
              onHoverStart={() => handlePolaroidHover(index, true)}
              onHoverEnd={() => handlePolaroidHover(index, false)}
            >
              <div className="w-full h-[75%] overflow-hidden rounded-sm bg-mist-black">
                <video
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={card.video}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="mt-3">
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-mist-black/60 block text-center">
                  {card.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Button (z-30) */}
      <motion.div
        className="absolute bottom-12 right-12 z-[30]"
        initial={{ opacity: 0.5 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
      >
        <a
          href="#tour"
          className="text-small-caps text-kimono-white border border-kimono-white/20 px-8 py-3 rounded-full hover:bg-kimono-white hover:text-mist-black transition-colors duration-500"
        >
          Explore Tour
        </a>
      </motion.div>
    </section>
  );
}



