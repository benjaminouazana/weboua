import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { SectionHeading } from '@/components/ui';
import { buildMetadata } from '@/lib/seo';
import { livresBlancs } from '@/lib/livres-blancs';

export const metadata = buildMetadata({
  title: 'Ressources — Livres blancs gratuits pour dirigeants',
  description:
    "Nos guides gratuits pour dirigeants : refonte de site, SEO, génération de leads B2B, automatisation. Des conseils concrets, prêts à appliquer. À télécharger en PDF.",
  path: '/ressources',
  keywords: ['livre blanc', 'ressources web', 'guide dirigeant', 'refonte site', 'seo', 'leads b2b'],
});

export default function RessourcesPage() {
  const items = [...livresBlancs].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-cream to-white">
        <div className="absolute -left-32 top-0 -z-10 h-80 w-80 rounded-full bg-mint/15 blur-3xl" />
        <div className="container-page py-14">
          <div className="max-w-3xl">
            <SectionHeading eyebrow="Ressources" title="Nos livres blancs" />
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Chaque mois, on partage un guide gratuit pour aider les dirigeants à transformer leur présence en
              ligne en véritable machine à clients. Des conseils concrets, chiffrés, prêts à appliquer.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((lb) => (
            <Link
              key={lb.slug}
              href={`/ressources/${lb.slug}`}
              className="card group flex flex-col hover:-translate-y-1 hover:border-mint"
            >
              <div className="mb-5 flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-cream to-mint/10 ring-1 ring-black/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lb.cover}
                  alt={`Couverture du livre blanc « ${lb.title} »`}
                  className="h-48 -rotate-1 rounded-lg shadow-lift ring-1 ring-black/5 transition-transform duration-300 group-hover:rotate-0 group-hover:scale-[1.03]"
                />
              </div>
              <p className="text-xs font-medium uppercase tracking-wide text-emerald">{lb.eyebrow}</p>
              <h2 className="mt-2 text-xl leading-snug">{lb.title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted">{lb.subtitle}</p>
              <span className="mt-5 inline-flex items-center gap-2 font-medium text-forest group-hover:text-emerald">
                Télécharger gratuitement
                <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
