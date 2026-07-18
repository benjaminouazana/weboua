'use client';

import { useEffect, useState } from 'react';
import type { Heading } from '@/lib/blog';

/**
 * Sommaire latéral « Le fil de l'article » avec scroll-spy :
 * - clic → défilement doux vers le chapitre,
 * - le chapitre en cours de lecture se surligne automatiquement au scroll.
 * Bon pour le lecteur ET pour le SEO (structure claire de la page).
 */
export function ArticleToc({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>(headings[0]?.id ?? '');

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Zone d'activation : sous le header, dans le tiers haut de l'écran.
      { rootMargin: '-90px 0px -68% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="Sommaire de l'article">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-muted">Le fil de l'article</p>
      <ol className="space-y-1">
        {headings.map((h, i) => {
          const isActive = active === h.id;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`flex gap-3 rounded-xl px-3 py-2 text-sm leading-snug transition-colors ${
                  isActive ? 'bg-emerald font-semibold text-white' : 'text-muted hover:bg-cream hover:text-forest'
                }`}
              >
                <span className={`text-xs ${isActive ? 'text-white/70' : 'text-muted/60'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{h.text}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
