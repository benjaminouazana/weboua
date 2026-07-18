'use client';

import { useEffect, useRef, useState } from 'react';

type Variant = 'up' | 'scale' | 'left' | 'right';

const HIDDEN: Record<Variant, string> = {
  up: 'translate-y-8 opacity-0',
  scale: 'scale-95 opacity-0',
  left: '-translate-x-8 opacity-0',
  right: 'translate-x-8 opacity-0',
};

/**
 * Révèle son contenu en douceur quand il entre dans l'écran (style "Apple").
 * `variant` choisit le mouvement, `delay` permet de décaler (effet en cascade).
 * Sans dépendance (IntersectionObserver) et respecte prefers-reduced-motion.
 */
export function Reveal({
  children,
  variant = 'up',
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // Accessibilité : si l'utilisateur réduit les animations, on affiche direct.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[800ms] ease-out will-change-transform ${
        shown ? 'translate-x-0 translate-y-0 scale-100 opacity-100' : HIDDEN[variant]
      } ${className}`}
    >
      {children}
    </div>
  );
}
