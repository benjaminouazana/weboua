import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Eyebrow, SectionHeading, Stats, CTABand, ContactBlock } from '@/components/ui';
import { services } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Weboua — Agence Digitale Performance | Sites, SEO & Leads B2B',
  description:
    "Agence web spécialisée en création de sites internet sur-mesure, SEO et génération de leads B2B. On ne fait pas de sites vitrines : on construit des machines à clients.",
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
        <div className="absolute -right-40 -top-40 -z-10 h-96 w-96 rounded-full bg-mint/20 blur-3xl" />
        <div className="container-page py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Agence Digitale Performance · depuis 2016</Eyebrow>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-6xl">
              On ne fait pas de sites vitrines.
              <span className="block text-emerald">On construit des machines à clients.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Sites internet codés sur-mesure, SEO qui domine Google et campagnes de leads B2B. Tout ce qu'il faut
              pour remplir votre agenda de prospects qualifiés. Sans blabla — des résultats.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-primary">
                Lancer mon projet
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href="/audit-seo-performance" className="btn-ghost">
                Demander un audit gratuit
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-4xl">
            <Stats
              items={[
                { value: '~10 ans', label: "d'expérience web & SEO" },
                { value: '150+', label: 'projets livrés' },
                { value: 'Top 3', label: 'positions Google visées' },
                { value: '24 h', label: 'délai de réponse' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="container-page scroll-mt-24 py-12">
        <SectionHeading
          eyebrow="Nos services"
          title="Une chaîne complète, de la première visite au client signé"
          intro="Site, référencement, prospection : chaque brique est pensée pour générer du chiffre d'affaires, pas juste du trafic."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link key={s.slug} href={`/${s.slug}`} className="card group hover:-translate-y-1 hover:border-mint">
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
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="container-page py-20">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Eyebrow>Pourquoi Weboua</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl">Le SEO et la conversion dans le code, dès la première ligne</h2>
            <p className="mt-4 text-lg text-muted">
              On a quitté WordPress et les usines à gaz. Nos sites sont codés à la main : ultra-rapides, sécurisés,
              parfaitement structurés pour Google. Résultat : vous montez dans les résultats et vous convertissez plus.
            </p>
            <div className="mt-8 space-y-5">
              {[
                { icon: 'bolt', title: 'Performance brute', text: 'Temps de chargement éclair, Core Web Vitals au vert. Google adore, vos visiteurs aussi.' },
                { icon: 'search', title: 'SEO natif', text: 'Structure sémantique, balisage schema.org, contenus optimisés. Le référencement est intégré, pas ajouté après.' },
                { icon: 'shield', title: 'Fiabilité totale', text: 'Hébergement infogéré, sauvegardes, monitoring. Votre site tourne, vous dormez.' },
              ].map((f) => (
                <div key={f.title} className="flex gap-4">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-mint/15 text-emerald">
                    <Icon name={f.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg">{f.title}</h3>
                    <p className="mt-1 text-muted">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-4xl bg-forest p-8 text-white shadow-lift sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-mint">La méthode Weboua</p>
              <ol className="mt-6 space-y-6">
                {[
                  { n: '01', t: 'Audit & stratégie', d: 'On analyse votre marché, vos concurrents et vos opportunités.' },
                  { n: '02', t: 'Conception & code', d: 'Design sur-mesure et développement orientés conversion.' },
                  { n: '03', t: 'SEO & lancement', d: 'Optimisation technique et sémantique, puis mise en ligne.' },
                  { n: '04', t: 'Croissance', d: 'Contenus, leads et optimisation continue. Les résultats s’accumulent.' },
                ].map((step) => (
                  <li key={step.n} className="flex gap-4">
                    <span className="font-display text-2xl font-bold text-mint/60">{step.n}</span>
                    <div>
                      <h4 className="text-white">{step.t}</h4>
                      <p className="mt-1 text-sm text-white/70">{step.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <ContactBlock source="home" />
      <CTABand />
    </>
  );
}
