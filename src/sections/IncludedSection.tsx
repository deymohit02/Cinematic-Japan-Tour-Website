import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Plane, Bus, Hotel } from 'lucide-react';

const cards = [
  {
    icon: Users,
    title: 'Expert Curation',
    subtitle: 'GUIDES',
    description: 'Two dedicated guides with deep local knowledge will accompany you throughout the journey.',
  },
  {
    icon: Plane,
    title: 'Seamless Travel',
    subtitle: 'FLIGHTS',
    description: 'Round-trip airfare included from major hubs to Osaka and returning from Tokyo.',
  },
  {
    icon: Bus,
    title: 'Private Transit',
    subtitle: 'TRANSFERS',
    description: 'All internal transport, from airport greetings to city-to-city transfers, is fully handled.',
  },
  {
    icon: Hotel,
    title: 'Refined Living',
    subtitle: 'ACCOMMODATION',
    description: 'Hand-picked boutique hotels and traditional Ryokans with breakfast included daily.',
  },
];

function BentoCard({
  card,
  index,
}: {
  card: (typeof cards)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = card.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="h-full"
    >
      <motion.div
        className="glass-panel rounded-lg p-10 h-full border-white/5 flex flex-col group transition-colors duration-700 hover:border-lime-accent/20"
        whileHover={{
          y: -5,
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        }}
      >
        <div className="flex justify-between items-start mb-12">
          <div className="p-3 rounded-full bg-white/5 border border-white/10 text-lime-accent group-hover:scale-110 transition-transform duration-500">
            <Icon size={20} strokeWidth={1.5} />
          </div>
          <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase font-bold">{card.subtitle}</span>
        </div>
        
        <h3 className="text-editorial text-2xl text-kimono-white mb-4 italic font-light">{card.title}</h3>
        <p className="text-kimono-white/40 leading-relaxed font-light text-sm group-hover:text-kimono-white/60 transition-colors duration-500">
          {card.description}
        </p>
        
        <div className="mt-auto pt-8">
          <div className="h-px w-0 bg-lime-accent/40 group-hover:w-full transition-all duration-700 ease-out" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function IncludedSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-100px' });

  return (
    <section
      id="included"
      className="relative bg-mist-black overflow-hidden"
      style={{ padding: 'clamp(100px, 15dvh, 200px) 0' }}
    >
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lime-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-[clamp(24px,8vw,120px)] relative z-10">
        {/* Section Heading */}
        <motion.div
          ref={headingRef}
          className="mb-20 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={headingInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-small-caps text-lime-accent mb-4 block tracking-[0.4em]">PROVISIONS</span>
          <h2
            className="text-editorial text-kimono-white italic font-light"
            style={{ fontSize: 'clamp(32px, 8vw, 100px)' }}
          >
            Included in your journey.
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <BentoCard key={card.title} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

