import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Eyebrow, Stats, CTABand } from '@/components/ui';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'À propos — Une agence digitale obsédée par les résultats',
  description:
    "12 ans d'expertise en création de sites, SEO et acquisition B2B. Découvrez la philosophie de l'agence Weboua : pas de blabla, des résultats.",
  path: '/a-propos',
});

const values = [
  { icon: 'target', title: 'Résultats avant tout', text: 'On ne livre pas des sites jolis : on livre du trafic, des leads et du chiffre d’affaires.' },
  { icon: 'check', title: 'Transparence totale', text: 'Pas de jargon, pas de boîte noire. Vous savez ce qu’on fait et pourquoi.' },
  { icon: 'bolt', title: 'Exigence technique', text: 'Code propre, performance maximale, SEO irréprochable. Le détail fait la différence.' },
  { icon: 'shield', title: 'Engagement long terme', text: 'On construit des partenariats, pas des projets one-shot. Votre croissance est notre métrique.' },
];

export default function AboutPage() {
  return (
    <>
      <section className="container-page py-16">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>À propos de Weboua</Eyebrow>
          <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
            Une agence digitale obsédée par une seule chose : vos résultats
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Depuis 12 ans, on aide les entreprises à transformer leur présence en ligne en véritable moteur de
            croissance. Sites internet, SEO, leads B2B : on maîtrise toute la chaîne, du premier clic au client signé.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <Stats
            items={[
              { value: '12 ans', label: "d'expérience" },
              { value: '100%', label: 'sur-mesure' },
              { value: 'B2B', label: 'notre spécialité' },
              { value: 'France', label: 'entreprises accompagnées' },
            ]}
          />
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">Notre histoire</h2>
            <div className="mt-5 space-y-4 text-muted">
              <p>
                Tout a commencé par une conviction simple : trop d'entreprises payent pour des sites qui ne leur
                rapportent rien. De belles vitrines, certes, mais aucune machine à clients derrière.
              </p>
              <p>
                Alors on a choisi une autre voie. On a quitté les solutions génériques pour le code sur-mesure, on a
                fait du SEO une expertise, et on a appris à générer des leads B2B prévisibles. Aujourd'hui, on combine
                ces trois forces pour faire grandir nos clients.
              </p>
              <p className="font-medium text-forest">
                Notre promesse n'a pas changé : pas de blabla, des résultats.
              </p>
            </div>
            <Link href="/contact" className="btn-primary mt-8">
              Travailler avec nous
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="card">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mint/15 text-emerald">
                  <Icon name={v.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg">{v.title}</h3>
                <p className="mt-2 text-sm text-muted">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
