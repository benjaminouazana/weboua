import { Eyebrow, SectionHeading, Stats, CTABand } from '@/components/ui';
import { Icon } from '@/components/Icon';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Nos succès — Résultats clients en SEO, sites & leads B2B',
  description:
    "Découvrez des exemples de résultats obtenus pour nos clients : trafic SEO multiplié, sites qui convertissent, pipelines de leads B2B remplis.",
  path: '/nos-succes',
});

// Replace with real, verifiable case studies as they become available.
const cases = [
  {
    sector: 'Services B2B',
    title: 'Trafic organique multiplié grâce au SEO',
    result: '+320 % de trafic',
    text: 'Refonte technique, stratégie de contenu et netlinking pour dominer un marché concurrentiel.',
    tags: ['SEO', 'Contenu'],
  },
  {
    sector: 'Industrie',
    title: 'Un site vitrine transformé en générateur de devis',
    result: '×4 demandes',
    text: 'Nouveau site sur-mesure orienté conversion, avec tunnels et formulaires optimisés.',
    tags: ['Site web', 'Conversion'],
  },
  {
    sector: 'SaaS',
    title: 'Pipeline B2B alimenté par le cold email',
    result: '40+ RDV / mois',
    text: 'Ciblage précis, séquences personnalisées et délivrabilité maîtrisée.',
    tags: ['Leads B2B', 'Cold email'],
  },
];

export default function SuccessPage() {
  return (
    <>
      <section className="container-page py-16">
        <SectionHeading
          eyebrow="Nos succès"
          title="Des résultats concrets, pas des promesses"
          intro="Voici quelques exemples de ce qu'on construit avec nos clients. Votre projet pourrait être le prochain."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {cases.map((c) => (
            <article key={c.title} className="card flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald">{c.sector}</span>
              <div className="mt-4 font-display text-4xl font-bold text-forest">{c.result}</div>
              <h3 className="mt-3 text-lg leading-snug">{c.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{c.text}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span key={t} className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-muted">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-20 max-w-4xl rounded-4xl bg-forest p-10 text-center">
          <h2 className="text-2xl text-white">L'impact, en chiffres</h2>
          <div className="mt-8 [&_dt]:text-mint [&_dd]:text-white/70">
            <Stats
              items={[
                { value: '150+', label: 'projets livrés' },
                { value: '~10 ans', label: "d'expérience" },
                { value: 'Top 3', label: 'positions visées' },
                { value: '24 h', label: 'délai de réponse' },
              ]}
            />
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted">
          <Icon name="shield" className="mr-1 inline h-4 w-4 text-emerald" />
          Études de cas détaillées disponibles sur demande, dans le respect de la confidentialité de nos clients.
        </p>
      </section>

      <CTABand />
    </>
  );
}
