import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

interface TimelineCity {
  days: string;
  name: string;
  images: { src: string; alt: string; rotation: number; aspect: 'landscape' | 'portrait' }[];
}

const cities: TimelineCity[] = [
  {
    days: 'Days 1–3',
    name: 'OSAKA',
    images: [
      { src: '/images/osaka-castle.jpg', alt: 'Osaka Castle', rotation: -3, aspect: 'landscape' },
      { src: '/images/osaka-skyline.jpg', alt: 'Osaka Skyline', rotation: 2, aspect: 'portrait' },
    ],
  },
  {
    days: 'Days 4–6',
    name: 'KYOTO',
    images: [
      { src: '/images/kyoto-pagoda.jpg', alt: 'Kyoto Pagoda', rotation: 2, aspect: 'landscape' },
      { src: '/images/kyoto-shrine.jpg', alt: 'Kyoto Shrine', rotation: -2, aspect: 'portrait' },
    ],
  },
  {
    days: 'Days 7–10',
    name: 'TOKYO',
    images: [
      { src: '/images/tokyo-shibuya.jpg', alt: 'Tokyo Shibuya', rotation: -2, aspect: 'landscape' },
      { src: '/images/tokyo-street.jpg', alt: 'Tokyo Street', rotation: 3, aspect: 'portrait' },
    ],
  },
];

function HighlightText({ text, highlight, delay = 0 }: { text: string; highlight: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const parts = text.split(highlight);

  return (
    <span ref={ref}>
      {parts[0]}
      <motion.span
        className="inline font-medium"
        animate={{ 
          color: isInView ? '#D4F87A' : 'rgba(250, 250, 250, 0.4)',
        }}
        transition={{ duration: 1.2, delay }}
      >
        {highlight}
      </motion.span>
      {parts[1]}
    </span>
  );
}

function PhotoCluster({ images }: { images: TimelineCity['images'] }) {
  return (
    <motion.div
      className="flex gap-4 items-start cursor-pointer group mt-6"
      whileHover="hover"
      initial="rest"
    >
      {images.map((img, i) => (
        <motion.div
          key={i}
          className="overflow-hidden rounded-sm bg-mist-black"
          style={{
            width: img.aspect === 'landscape' ? 'clamp(140px, 15vw, 220px)' : 'clamp(100px, 10vw, 160px)',
            transform: `rotate(${img.rotation}deg)`,
            border: '4px solid #FAFAFA',
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          }}
          variants={{
            rest: { rotate: img.rotation, scale: 1, y: 0 },
            hover: {
              rotate: i === 0 ? img.rotation - 4 : img.rotation + 4,
              scale: 1.05,
              y: -10,
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
            loading="lazy"
            style={{ aspectRatio: img.aspect === 'landscape' ? '4/3' : '3/4' }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

function TimelineNode({ city, index }: { city: TimelineCity; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6 md:gap-12 items-start mb-16 md:mb-24 last:mb-0"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.2, // Stagger (Problem 3)
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Node dot with cinematic pulse */}
      <div className="relative flex flex-col items-center flex-shrink-0" style={{ width: '2px' }}>
        <div
          className="rounded-full bg-lime-accent absolute top-2 left-1/2 -translate-x-1/2 shadow-[0_0_15px_rgba(212,248,122,0.4)]"
          style={{ width: '8px', height: '8px' }}
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-baseline gap-4 mb-2">
          <span className="text-small-caps text-lime-accent opacity-80">{city.days}</span>
          <h3 className="text-display text-kimono-white text-4xl tracking-tight">{city.name}</h3>
        </div>
        <div className="h-px w-12 bg-white/10 mb-6" />
        <PhotoCluster images={city.images} />
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start end', 'end start'],
  });

  const lineScale = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  return (
    <section
      id="tour"
      className="relative bg-mist-black overflow-hidden"
      style={{ padding: 'clamp(100px, 15dvh, 200px) 0' }}
    >
      <div className="max-w-[1440px] mx-auto px-[clamp(24px,8vw,120px)]">
        {/* Section Heading */}
        <motion.div
          ref={headingRef}
          className="mb-32"
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-small-caps text-lime-accent mb-4 block tracking-[0.4em]">JOURNEY</span>
          <h2
            className="text-editorial text-kimono-white font-light italic leading-none"
            style={{ fontSize: 'clamp(40px, 12vw, 160px)' }}
          >
            The Itinerary.
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left Column — Text */}
          <motion.div
            className="lg:w-1/3 lg:sticky lg:top-32 h-fit"
            initial={{ opacity: 0, x: -20 }}
            animate={headingInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-editorial text-kimono-white/70 text-2xl leading-relaxed mb-8 font-light italic">
              <HighlightText
                text="A curated 10-day passage through the heart of Japan, from neon-lit Osaka to the silent shrines of Kyoto."
                highlight="Osaka to the silent shrines of Kyoto"
                delay={0.4}
              />
            </p>
            <div className="hairline-rule w-12 opacity-30 mb-8" />
            <p className="text-editorial text-kimono-white/50 text-lg leading-relaxed font-light">
              <HighlightText
                text="Forget the noise of planning. We handle the logistics so you can focus on the feeling of being elsewhere."
                highlight="being elsewhere"
                delay={0.6}
              />
            </p>
          </motion.div>

          {/* Right Column — Timeline */}
          <div className="lg:w-2/3" ref={timelineRef}>
            <div className="relative pl-8">
              {/* Vertical hairline rule */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-white/5">
                <motion.div
                  className="w-full bg-lime-accent/40 origin-top shadow-[0_0_10px_rgba(212,248,122,0.2)]"
                  style={{
                    height: '100%',
                    scaleY: lineScale,
                  }}
                />
              </div>

              {/* Timeline nodes */}
              <div className="flex flex-col">
                {cities.map((city, index) => (
                  <TimelineNode key={city.name} city={city} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

