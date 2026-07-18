'use client';

import { useEffect, useRef, useState } from 'react';

const STEPS = [
  {
    n: '01',
    t: 'Audit & stratégie',
    d: 'On analyse votre marché, vos concurrents et vos opportunités. On repère ce qui bloque — et ce qui va rapporter.',
  },
  {
    n: '02',
    t: 'Conception & code',
    d: 'Design sur-mesure aligné sur votre marque, développement codé à la main, pensé pour la conversion.',
  },
  {
    n: '03',
    t: 'SEO & lancement',
    d: 'Optimisation technique et sémantique, connexion à vos outils, puis mise en ligne. Google vous voit dès le premier jour.',
  },
  {
    n: '04',
    t: 'Croissance continue',
    d: 'Contenus, leads, optimisation mois après mois. Les résultats ne s’arrêtent pas au lancement, ils s’accumulent.',
  },
];

/**
 * Section "épinglée" façon Apple (MacBook Pro) : le visuel de gauche reste figé
 * pendant que les étapes défilent à droite ; l'étape au centre de l'écran devient
 * active et met à jour le grand chiffre + le titre. Sur mobile, affichage empilé simple.
 */
export function MethodePinned() {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.idx));
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const step = STEPS[active];

  return (
    <section className="container-page py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-16">
        {/* GAUCHE — figée */}
        <div className="hidden lg:flex lg:sticky lg:top-0 lg:h-screen lg:items-center">
          <div className="relative w-full overflow-hidden rounded-4xl bg-forest p-12 text-white shadow-lift">
            <div className="blob-float absolute -right-16 -top-16 h-56 w-56 rounded-full bg-mint/20 blur-3xl" />
            <p className="relative text-sm font-semibold uppercase tracking-[0.2em] text-mint">La méthode Weboua</p>
            <div key={`n${active}`} className="hero-in relative mt-6 font-display text-[7rem] font-bold leading-none text-mint/30">
              {step.n}
            </div>
            <h3 key={`t${active}`} className="hero-in relative mt-2 text-3xl font-bold">{step.t}</h3>
            <p key={`d${active}`} className="hero-in relative mt-4 max-w-md leading-relaxed text-white/75">{step.d}</p>
            <div className="relative mt-10 flex gap-2">
              {STEPS.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-10 bg-mint' : 'w-4 bg-white/25'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Titre mobile */}
        <div className="mb-6 lg:hidden">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald">La méthode Weboua</p>
        </div>

        {/* DROITE — étapes qui défilent */}
        <div>
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              data-idx={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className={`flex min-h-[52vh] flex-col justify-center border-l-2 py-8 pl-8 transition-colors duration-300 lg:min-h-[62vh] ${
                active === i ? 'border-emerald' : 'border-line'
              }`}
            >
              <span className={`font-display text-2xl font-bold transition-colors ${active === i ? 'text-emerald' : 'text-muted/40'}`}>
                {s.n}
              </span>
              <h4 className={`mt-2 text-2xl transition-colors ${active === i ? 'text-forest' : 'text-muted'}`}>{s.t}</h4>
              <p className={`mt-3 max-w-md leading-relaxed transition-colors ${active === i ? 'text-forest/80' : 'text-muted/50'}`}>
                {s.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
