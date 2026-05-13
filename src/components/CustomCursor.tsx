import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide on mobile/touch (Problem 5)
    if (window.innerWidth < 768 || window.matchMedia('(hover: none)').matches) {
      return;
    }

    setIsVisible(true);
    document.body.style.cursor = 'none';

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    const onMouseEnterInteractive = () => {
      isHoveringRef.current = true;
    };

    const onMouseLeaveInteractive = () => {
      isHoveringRef.current = false;
    };

    const addListeners = () => {
      const elements = document.querySelectorAll('a, button, .cursor-pointer, [role="button"], input, textarea');
      elements.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
      return elements;
    };

    let interactiveElements = addListeners();

    // Re-bind listeners on DOM changes
    const observer = new MutationObserver(() => {
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
      interactiveElements = addListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('mousemove', onMouseMove);

    let rafId: number;
    const render = () => {
      // Lerp for smooth movement (Problem 5)
      const lerp = 0.15;
      posRef.current.x += (targetRef.current.x - posRef.current.x) * lerp;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * lerp;

      if (cursorRef.current) {
        const size = isHoveringRef.current ? 32 : 8;
        const borderWidth = isHoveringRef.current ? 1 : 0;
        const opacity = isHoveringRef.current ? 0.8 : 1;

        cursorRef.current.style.transform = `translate3d(${posRef.current.x - size / 2}px, ${posRef.current.y - size / 2}px, 0)`;
        cursorRef.current.style.width = `${size}px`;
        cursorRef.current.style.height = `${size}px`;
        cursorRef.current.style.borderWidth = `${borderWidth}px`;
        cursorRef.current.style.opacity = `${opacity}`;
      }
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
      document.body.style.cursor = 'auto';
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference border-kimono-white bg-kimono-white transition-[width,height,border-width,opacity] duration-300 ease-out"
      style={{
        width: '8px',
        height: '8px',
        willChange: 'transform, width, height',
      }}
    />
  );
}

