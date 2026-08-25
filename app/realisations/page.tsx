import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Eyebrow, ContactBlock, CTABand } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { clients } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Réalisations — Des sites signés Weboua',
  description:
    "Découvrez les sites internet conçus par Weboua : énergie, industrie, beauté, formation, e-commerce… Rapides, visibles sur Google et pensés pour convertir.",
  path: '/realisations',
  keywords: ['réalisations weboua', 'portfolio agence web', 'exemples de sites internet', 'sites créés weboua'],
});

function domainOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export default function RealisationsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Réalisations Weboua',
    hasPart: clients.map((c) => ({ '@type': 'WebSite', name: c.name, url: c.url })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden bg-gradient-to-b from-cream to-white">
        <div className="blob-float absolute -left-32 top-0 -z-10 h-80 w-80 rounded-full bg-mint/15 blur-3xl" />
        <div className="container-page py-14">
          <div className="max-w-3xl">
            <Eyebrow>Réalisations</Eyebrow>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
              Des sites qu&apos;on a construits, déjà en ligne
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Énergie, industrie, beauté, formation, e-commerce, recrutement… Une sélection de sites signés
              Weboua : rapides, visibles sur Google et pensés pour convertir. Cliquez pour les visiter.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((c, i) => (
            <Reveal key={c.url} variant="up" delay={(i % 3) * 80} className="h-full">
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-all hover:-translate-y-1 hover:border-mint hover:shadow-lift"
              >
                <div className="flex items-center gap-2 border-b border-line bg-cream px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-mint" />
                  <span className="ml-2 truncate rounded-md bg-white px-3 py-1 text-xs text-muted ring-1 ring-black/5">
                    {domainOf(c.url)}
                  </span>
                </div>
                <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-forest to-pine px-6 py-14 text-center">
                  <span className="text-2xl font-bold text-white">{c.name}</span>
                </div>
                <div className="flex items-center justify-between px-5 py-4">
                  <span className="truncate text-sm text-muted">{domainOf(c.url)}</span>
                  <span className="inline-flex flex-none items-center gap-1.5 text-sm font-semibold text-emerald">
                    Visiter
                    <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <ContactBlock source="realisations" />
      <CTABand />
    </>
  );
}
