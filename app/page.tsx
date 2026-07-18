import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Eyebrow, SectionHeading, Stats, CTABand, ContactBlock } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { MethodePinned } from '@/components/MethodePinned';
import { services } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Weboua — Agence Digitale Performance | Sites, SEO & Leads B2B',
  description:
    "Agence web spécialisée en création de sites internet sur-mesure, SEO et génération de leads B2B. On ne fait pas de simples sites vitrines : on construit des machines à clients.",
  keywords: [
    'agence web',
    'création site internet',
    'agence SEO',
    'référencement naturel',
    'génération de leads B2B',
    'agence digitale France',
  ],
});

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cream to-white" />
        <div className="blob-float absolute -right-40 -top-40 -z-10 h-96 w-96 rounded-full bg-mint/20 blur-3xl" />
        <div className="blob-float-slow absolute -left-32 top-40 -z-10 h-80 w-80 rounded-full bg-emerald/10 blur-3xl" />
        <div className="container-page py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="hero-in">
              <Eyebrow>Agence Digitale Performance · 12 ans d'expertise</Eyebrow>
            </div>
            <h1 className="hero-in mt-6 text-4xl font-bold leading-[1.05] sm:text-6xl" style={{ animationDelay: '80ms' }}>
              On ne fait pas de simples sites vitrines.
              <span className="block text-emerald">On construit des machines à clients.</span>
            </h1>
            <p className="hero-in mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted" style={{ animationDelay: '160ms' }}>
              On code chaque site à la main : il charge en moins d'une seconde, il grimpe sur Google, et il
              transforme vos visiteurs en demandes de devis. Pas une brochure en ligne — un commercial qui
              travaille pour vous 24/7.
            </p>
            <div className="hero-in mt-9 flex flex-wrap justify-center gap-3" style={{ animationDelay: '240ms' }}>
              <Link href="/contact" className="btn-primary">
                Lancer mon projet
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href="/audit-seo-performance" className="btn-ghost">
                Demander un audit gratuit
              </Link>
            </div>
          </div>

          <div className="hero-in mx-auto mt-16 max-w-4xl" style={{ animationDelay: '340ms' }}>
            <Stats
              items={[
                { value: '12 ans', label: 'de métier, du site au SEO' },
                { value: '100%', label: 'codé à la main, zéro template' },
                { value: '< 1 s', label: 'de chargement, mobile compris' },
                { value: '15+', label: 'entreprises accompagnées' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="container-page scroll-mt-24 py-12">
        <Reveal>
          <SectionHeading
            eyebrow="Nos services"
            title="Une chaîne complète, de la première visite au client signé"
            intro="Site, référencement, prospection : chaque brique est pensée pour générer du chiffre d'affaires, pas juste du trafic."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} variant="up" delay={i * 90}>
              <Link
                href={`/${s.slug}`}
                className="card group block h-full hover:-translate-y-2 hover:border-mint hover:shadow-lift"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest text-mint transition-colors group-hover:bg-emerald group-hover:text-white">
                  <Icon name={s.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl">{s.title}</h3>
                <p className="mt-2 text-muted">{s.short}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald">
                  En savoir plus
                  <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="container-page py-12">
        <Reveal>
          <SectionHeading
            eyebrow="Pourquoi Weboua"
            title="Le SEO et la conversion dans le code, dès la première ligne"
            intro="Nos sites sont codés à la main : ultra-rapides, sécurisés, parfaitement structurés pour Google. Vous montez dans les résultats, et vous convertissez plus."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: 'bolt',
              title: 'Performance brute',
              text: 'Chargement sous la seconde, Core Web Vitals au vert. Google vous remonte, et vos visiteurs ne partent plus avant d’avoir vu votre offre.',
            },
            {
              icon: 'search',
              title: 'SEO natif',
              text: 'Structure sémantique et balisage schema.org écrits dans le code, pas rajoutés après coup par un plugin. Vous ciblez les requêtes qui rapportent.',
            },
            {
              icon: 'shield',
              title: 'Fiabilité totale',
              text: 'Hébergement infogéré, sauvegardes automatiques, monitoring. Si quelque chose bouge, on le voit avant vous.',
            },
          ].map((f, i) => (
            <Reveal key={f.title} variant="up" delay={i * 100} className="h-full">
              <div className="card h-full transition-all hover:-translate-y-1 hover:border-mint hover:shadow-lift">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mint/15 text-emerald">
                  <Icon name={f.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg">{f.title}</h3>
                <p className="mt-2 text-muted">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MÉTHODE — section épinglée (scrollytelling façon Apple) */}
      <MethodePinned />

      {/* RÉALISATIONS — preuve réelle, sans dévoiler de noms */}
      <section className="container-page py-12">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-4xl border border-line bg-gradient-to-br from-cream to-mint/10 p-10 text-center sm:p-14">
            <div className="blob-float absolute -right-24 -top-24 -z-0 h-64 w-64 rounded-full bg-mint/20 blur-3xl" />
            <div className="relative">
              <Eyebrow>Réalisations</Eyebrow>
              <h2 className="mx-auto mt-4 max-w-2xl text-3xl sm:text-4xl">Nos sites sont déjà en ligne, dans tous les secteurs</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
                Énergie, industrie, beauté, formation, e-commerce, recrutement… Plus de 15 entreprises tournent
                avec un site signé Weboua. La meilleure preuve, ce n’est pas une capture d’écran : c’est d’aller
                les voir tourner.
              </p>
              <Link href="/nos-succes" className="btn-primary mt-8">
                Voir nos réalisations
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <ContactBlock source="home" />
      <CTABand />
    </>
  );
}
