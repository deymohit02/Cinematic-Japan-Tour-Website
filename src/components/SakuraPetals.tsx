import { useEffect, useState, memo } from 'react';

const PETAL_COUNT = 25;

interface Petal {
  id: number;
  x: number;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
  opacity: number;
  sway: number;
  color: string;
  rotationSpeed: number;
}

const COLORS = ['#ff69b4', '#ff1493', '#ffb6c1', '#db7093'];

const SakuraPetals = memo(() => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    // if (mediaQuery.matches) return;

    const count = window.innerWidth < 768 ? Math.floor(PETAL_COUNT * 0.4) : PETAL_COUNT;

    const newPetals = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 16 + Math.random() * 24,
      rotation: Math.random() * 360,
      duration: 6 + Math.random() * 10,
      delay: -(Math.random() * 10),
      opacity: 0.8 + Math.random() * 0.2,
      sway: (Math.random() - 0.5) * 200,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotationSpeed: (Math.random() - 0.5) * 720,
    }));

    setPetals(newPetals);
  }, []);

  if (petals.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          style={{
            position: 'absolute',
            top: 0,
            left: `${petal.x}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 0.7}px`,
            backgroundColor: petal.color,
            borderRadius: '100% 10% 90% 30%',
            opacity: petal.opacity,
            boxShadow: '0 0 15px rgba(255,184,197,0.5)',
            animationName: 'petalFall',
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDirection: 'normal',
            animationFillMode: 'both',
            willChange: 'transform',
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
});

SakuraPetals.displayName = 'SakuraPetals';

export default SakuraPetals;

