'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';

const STEPS = [
  {
    n: '01',
    icon: 'target',
    t: 'On va chercher le prospect',
    d: 'LinkedIn et cold email ciblés touchent les bons décideurs, là où ils sont. Pas d’attente : on provoque la rencontre.',
  },
  {
    n: '02',
    icon: 'browser',
    t: "L'aimant : le livre blanc",
    d: 'Un guide gratuit à forte valeur donne au prospect une vraie raison de lever la main — sans se sentir « vendu ».',
  },
  {
    n: '03',
    icon: 'target',
    t: 'Le lead est capturé',
    d: 'Nom, email et téléphone tombent automatiquement dans vos outils, triés et notifiés. Aucune saisie, aucun oubli.',
  },
  {
    n: '04',
    icon: 'mail',
    t: 'La newsletter réchauffe',
    d: 'Les 90 % pas encore prêts sont entretenus automatiquement, mois après mois. On reste présent jusqu’au bon moment.',
  },
  {
    n: '05',
    icon: 'check',
    t: 'Le rendez-vous',
    d: 'Les plus chauds réservent un appel eux-mêmes, les autres vous les rappelez. Un flux de RDV prévisible, pas de la chance.',
  },
];

/**
 * Tunnel de génération de leads en scrollytelling épinglé (même effet que "La méthode").
 * Le visuel de gauche reste figé pendant que les étapes défilent à droite.
 * Responsive : sur mobile, étapes empilées avec surlignage au scroll (scroll-spy).
 */
export function LeadTunnelPinned() {
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
      <div className="mb-10 text-center lg:mb-0 lg:hidden">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald">Votre machine à clients</p>
        <h2 className="mt-3 text-3xl">Comment on remplit votre agenda</h2>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-16">
        {/* GAUCHE — figée */}
        <div className="hidden lg:flex lg:sticky lg:top-0 lg:h-screen lg:items-center">
          <div className="relative w-full overflow-hidden rounded-4xl bg-gradient-to-br from-forest to-pine p-12 text-white shadow-lift">
            <div className="blob-float absolute -right-16 -top-16 h-56 w-56 rounded-full bg-mint/20 blur-3xl" />
            <p className="relative text-sm font-semibold uppercase tracking-[0.2em] text-mint">Votre machine à clients</p>
            <div key={`i${active}`} className="hero-in relative mt-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-mint/15 text-mint">
              <Icon name={step.icon} className="h-8 w-8" />
            </div>
            <div key={`n${active}`} className="hero-in relative mt-6 font-display text-6xl font-bold leading-none text-mint/30">
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

        {/* DROITE — étapes qui défilent */}
        <div>
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              data-idx={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className={`flex min-h-[44vh] flex-col justify-center border-l-2 py-8 pl-8 transition-all duration-300 lg:min-h-[58vh] ${
                active === i ? 'border-emerald' : 'border-line'
              }`}
            >
              <div className="mb-3 flex items-center gap-3 lg:hidden">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-colors ${
                    active === i ? 'bg-emerald text-white' : 'bg-mint/15 text-emerald'
                  }`}
                >
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <span className={`font-display text-2xl font-bold ${active === i ? 'text-emerald' : 'text-muted/40'}`}>{s.n}</span>
              </div>
              <span className={`hidden font-display text-2xl font-bold transition-colors lg:block ${active === i ? 'text-emerald' : 'text-muted/40'}`}>
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
