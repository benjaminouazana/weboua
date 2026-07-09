import { Eyebrow, SectionHeading, Stats, CTABand } from '@/components/ui';
import { Icon } from '@/components/Icon';
import { clients } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Nos succès — Ils nous font confiance',
  description:
    "Découvrez les entreprises qui font confiance à Weboua pour leur site internet, leur SEO et leur génération de leads B2B. Études de cas détaillées sur demande.",
  path: '/nos-succes',
});

export default function SuccessPage() {
  return (
    <>
      <section className="container-page py-16">
        <SectionHeading
          eyebrow="Nos succès"
          title="Ils nous font confiance"
          intro="Des entreprises de l'énergie, de l'industrie, du recrutement ou de l'environnement nous confient leur croissance en ligne. Votre projet pourrait être le prochain."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((c) => (
            <a
              key={c.url}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card group flex items-center justify-between gap-4 hover:-translate-y-1 hover:border-mint"
            >
              <div>
                <h3 className="text-lg">{c.name}</h3>
                <p className="mt-1 text-sm text-muted">{c.url.replace('https://', '')}</p>
              </div>
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-mint/15 text-emerald transition-colors group-hover:bg-emerald group-hover:text-white">
                <Icon name="arrow" className="h-5 w-5 -rotate-45" />
              </span>
            </a>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted">
          <Icon name="shield" className="mr-1 inline h-4 w-4 text-emerald" />
          Par respect de la confidentialité de nos clients, les études de cas détaillées (chiffres, stratégies,
          résultats) sont partagées uniquement sur demande, lors d'un échange.
        </p>

        <div className="mx-auto mt-16 max-w-4xl rounded-4xl bg-forest p-10 text-center">
          <h2 className="text-2xl text-white">Weboua, en bref</h2>
          <div className="mt-8 [&_dt]:text-mint [&_dd]:text-white/70">
            <Stats
              items={[
                { value: '12 ans', label: "d'expérience" },
                { value: '100%', label: 'sur-mesure' },
                { value: 'Top 3', label: 'positions visées' },
                { value: '24 h', label: 'délai de réponse' },
              ]}
            />
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
