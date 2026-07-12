import { notFound } from 'next/navigation';
import { Icon } from '@/components/Icon';
import { Eyebrow } from '@/components/ui';
import { LivreBlancForm } from '@/components/LivreBlancForm';
import { buildMetadata } from '@/lib/seo';
import { clients, site } from '@/lib/site';
import { getLivreBlanc, getAllLivreBlancSlugs } from '@/lib/livres-blancs';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllLivreBlancSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const lb = getLivreBlanc(params.slug);
  if (!lb) return {};
  return buildMetadata({
    title: lb.metaTitle,
    description: lb.metaDescription,
    path: `/ressources/${lb.slug}`,
    keywords: lb.keywords,
  });
}

export default function RessourcePage({ params }: { params: { slug: string } }) {
  const lb = getLivreBlanc(params.slug);
  if (!lb) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: lb.title,
    description: lb.metaDescription,
    author: { '@type': 'Organization', name: site.name, url: site.url },
    publisher: { '@type': 'Organization', name: site.name, url: site.url },
    inLanguage: 'fr-FR',
    url: `${site.url}/ressources/${lb.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cream to-white" />
        <div className="absolute -right-40 -top-40 -z-10 h-96 w-96 rounded-full bg-mint/20 blur-3xl" />

        <div className="container-page grid items-start gap-12 py-12 lg:grid-cols-2 lg:py-16">
          {/* Left — pitch */}
          <div>
            <Eyebrow>{lb.eyebrow}</Eyebrow>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">{lb.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">{lb.subtitle}</p>

            <div className="mt-8 space-y-3">
              {lb.inside.map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-mint/20 text-emerald">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  <span className="text-forest">{t}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 border-t border-line pt-6">
              <p className="text-sm text-muted">Écrit par Weboua. Ils nous font confiance :</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm font-medium text-forest/70">
                {clients.slice(0, 6).map((c) => (
                  <span key={c.url}>{c.name}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — cover visual + form card */}
          <div className="lg:sticky lg:top-24">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lb.cover}
              alt={`Couverture du livre blanc « ${lb.title} »`}
              className="mx-auto mb-6 w-44 -rotate-2 rounded-xl shadow-lift ring-1 ring-black/5 sm:w-52"
            />
            <div className="rounded-4xl border border-line bg-white p-6 shadow-lift sm:p-8">
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-forest text-mint shadow-soft">
                  <Icon name="browser" className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-display font-bold text-forest">Recevez le guide</p>
                  <p className="text-sm text-muted">PDF · Gratuit · {lb.pages} pages</p>
                </div>
              </div>
              <LivreBlancForm slug={lb.slug} pdfUrl={lb.pdf} title={lb.title} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
