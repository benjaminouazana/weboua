'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Anime la partie numérique d'une valeur (0 → N) quand elle entre à l'écran.
 * Conserve le préfixe/suffixe : "< 1 s", "100 %", "12 ans", "15+"…
 * Respecte prefers-reduced-motion (affiche directement la valeur finale).
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const m = value.match(/^([^\d]*)(\d+(?:[.,]\d+)?)(.*)$/s);
    if (!m) {
      setDisplay(value);
      return;
    }
    const [, prefix, numStr, suffix] = m;
    const target = parseFloat(numStr.replace(',', '.'));
    const decimals = (numStr.split(/[.,]/)[1] || '').length;

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }

    const zero = decimals ? `0,${'0'.repeat(decimals)}` : '0';
    setDisplay(`${prefix}${zero}${suffix}`);

    const el = ref.current;
    if (!el) return;
    let done = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done) return;
        done = true;
        io.disconnect();
        const duration = 1200;
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
          const cur = target * eased;
          const shown = decimals ? cur.toFixed(decimals).replace('.', ',') : Math.round(cur).toString();
          setDisplay(`${prefix}${shown}${suffix}`);
          if (p < 1) requestAnimationFrame(step);
          else setDisplay(value);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return <span ref={ref}>{display}</span>;
}
