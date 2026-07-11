import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Eyebrow, SectionHeading, CTABand, ContactBlock } from '@/components/ui';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Nos offres — Site sur-mesure, abonnement ou accompagnement premium',
  description:
    "Trois façons de travailler avec Weboua : création de site sur-mesure, abonnement tout-inclus (site + hébergement + maintenance + SEO) ou accompagnement premium. Devis gratuit.",
  path: '/offres',
  keywords: ['prix site internet', 'abonnement site web', 'tarif création site', 'agence web tarifs'],
});

const plans = [
  {
    name: 'Site sur-mesure',
    tagline: 'Votre machine à clients, livrée clé en main.',
    popular: false,
    features: [
      'Design 100 % sur-mesure, zéro template',
      'Développement codé à la main, performance maximale',
      'Optimisation vitesse & Core Web Vitals',
      'SEO technique inclus (structure, balisage, sitemap)',
      'Formulaires connectés à vos outils',
      'Formation à la prise en main',
      'Le site vous appartient intégralement',
    ],
    cta: 'Demander un devis',
    note: 'Paiement unique · propriété totale',
  },
  {
    name: 'Abonnement Croissance',
    tagline: 'Site + hébergement + maintenance + SEO. Vous ne vous occupez de rien.',
    popular: true,
    features: [
      'Tout le contenu de « Site sur-mesure »',
      'Hébergement rapide et infogéré',
      'Maintenance, sauvegardes & sécurité en continu',
      'Modifications illimitées (textes, images, sections)',
      'SEO continu : contenus et optimisations chaque mois',
      'Monitoring 24/7 et support prioritaire',
      'Rachat du site possible à tout moment',
    ],
    cta: 'Discuter de mon abonnement',
    note: 'Mensualité fixe · sans surprise',
  },
  {
    name: 'Premium',
    tagline: "L'accompagnement complet pour dominer votre marché.",
    popular: false,
    features: [
      'Tout le contenu de « Abonnement Croissance »',
      'Stratégie d’acquisition complète (SEO + leads B2B)',
      'Campagnes de prospection gérées pour vous',
      'Landing pages dédiées par campagne',
      'Reporting mensuel : trafic, leads, ROI',
      'Accès direct au fondateur',
    ],
    cta: 'Parler stratégie',
    note: 'Sur-mesure · places limitées',
  },
];

const faqs = [
  {
    q: 'À qui appartient le site ?',
    a: "En formule « Site sur-mesure », il vous appartient intégralement dès le paiement final : code, design, contenus. En abonnement, vous pouvez racheter le site à tout moment à un tarif préférentiel — vous n'êtes jamais prisonnier.",
  },
  {
    q: 'Pourquoi les prix ne sont-ils pas affichés ?',
    a: "Parce qu'un site vitrine de 5 pages et une plateforme avec espace client n'ont rien à voir. Après un premier échange (15 min), vous recevez un devis précis, détaillé ligne par ligne, sans frais cachés.",
  },
  {
    q: "Que se passe-t-il si j'arrête l'abonnement ?",
    a: "Vous récupérez vos contenus, et vous pouvez racheter le site à tarif préférentiel pour l'héberger où vous voulez. Aucune prise d'otage : notre meilleur argument de rétention, c'est le résultat.",
  },
  {
    q: 'Combien de temps pour être en ligne ?',
    a: "Un site vitrine : 3 à 6 semaines. Une plateforme plus complexe : 2 à 3 mois. Le planning précis figure dans le devis et on s'y tient.",
  },
  {
    q: "Travaillez-vous avec mon site WordPress existant ?",
    a: "Bien sûr — audit, réparation, sécurisation, maintenance, évolution : on accompagne de nombreux sites WordPress. Et selon vos objectifs, on vous conseille la meilleure approche technique, chiffres à l'appui. La décision reste chez vous.",
  },
  {
    q: "L'audit gratuit, c'est vraiment gratuit ?",
    a: "Oui, et sans engagement. C'est notre meilleure démonstration : vous repartez avec un plan d'action actionnable, que vous travailliez avec nous ou non.",
  },
];

export default function OffresPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="container-page py-16">
        <SectionHeading
          eyebrow="Nos offres"
          title="Une solution pour chaque ambition"
          intro="Un projet ponctuel ou un partenaire de croissance : choisissez la formule, on s'occupe du reste."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`card relative flex flex-col ${
                p.popular ? 'border-emerald shadow-lift ring-1 ring-emerald' : ''
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  Populaire
                </span>
              )}
              <h2 className="text-2xl">{p.name}</h2>
              <p className="mt-2 text-muted">{p.tagline}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-mint/20 text-emerald">
                      <Icon name="check" className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-forest">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/contact?src=offre-${p.name.toLowerCase().replace(/[^a-z]+/g, '-')}`}
                className={`${p.popular ? 'btn-primary' : 'btn-ghost'} mt-8 w-full`}
              >
                {p.cta}
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-center text-xs text-muted">{p.note}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted">
          <Icon name="shield" className="mr-1 inline h-4 w-4 text-emerald" />
          Chaque devis est détaillé ligne par ligne. Pas de frais cachés, pas de mauvaise surprise —{' '}
          <a className="font-medium text-emerald hover:underline" href={`mailto:${site.email}`}>
            posez-nous toutes vos questions
          </a>
          .
        </p>
      </section>

      {/* FAQ */}
      <section className="container-page py-12">
        <SectionHeading eyebrow="Questions fréquentes" title="Les réponses franches aux vraies questions" />
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-medium text-forest">
                {f.q}
                <Icon name="arrow" className="h-5 w-5 flex-none rotate-90 text-emerald transition-transform group-open:rotate-[270deg]" />
              </summary>
              <p className="mt-3 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <ContactBlock source="offres" />
      <CTABand />
    </>
  );
}
