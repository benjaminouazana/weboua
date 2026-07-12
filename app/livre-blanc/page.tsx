import { Icon } from '@/components/Icon';
import { Eyebrow } from '@/components/ui';
import { LivreBlancForm } from '@/components/LivreBlancForm';
import { buildMetadata } from '@/lib/seo';
import { clients } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Livre blanc gratuit — Pourquoi refaire son site en 2026',
  description:
    "Le guide des dirigeants pour transformer un site-vitrine en machine à clients : les 7 signes qu'il faut refaire, le coût d'un site dépassé, la méthode. PDF gratuit.",
  path: '/livre-blanc',
  keywords: ['refaire son site internet', 'refonte site web', 'livre blanc site internet', 'site web 2026'],
});

const inside = [
  'Les 7 signes qui prouvent qu\'il faut refaire votre site',
  'Le coût caché (et chiffré) d\'un site dépassé',
  'Ce qu\'un site pensé pour 2026 change vraiment : vitesse, SEO, conversion, automatisation',
  'La méthode complète, de l\'audit aux résultats',
  'La checklist « Votre site est-il prêt pour 2026 ? »',
];

export default function LivreBlancPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cream to-white" />
      <div className="absolute -right-40 -top-40 -z-10 h-96 w-96 rounded-full bg-mint/20 blur-3xl" />

      <div className="container-page grid items-start gap-12 py-12 lg:grid-cols-2 lg:py-16">
        {/* Left — pitch */}
        <div>
          <Eyebrow>Livre blanc gratuit · Édition 2026</Eyebrow>
          <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
            Pourquoi refaire son site internet en 2026
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Le guide des dirigeants pour transformer un site-vitrine qui dort en une véritable machine à clients.
            Des conseils concrets, prêts à appliquer, zéro blabla.
          </p>

          <div className="mt-8 space-y-3">
            {inside.map((t) => (
              <div key={t} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-mint/20 text-emerald">
                  <Icon name="check" className="h-4 w-4" />
                </span>
                <span className="text-forest">{t}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-line pt-6">
            <p className="text-sm text-muted">Écrit par Weboua — 12 ans d'expertise. Ils nous font confiance :</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm font-medium text-forest/70">
              {clients.slice(0, 6).map((c) => (
                <span key={c.url}>{c.name}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right — cover visual + form card */}
        <div className="lg:sticky lg:top-24">
          {/* Aperçu de la couverture */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/livre-blanc-cover.jpg"
            alt="Couverture du livre blanc Weboua"
            className="mx-auto mb-6 w-44 -rotate-2 rounded-xl shadow-lift ring-1 ring-black/5 sm:w-52"
          />
          <div className="rounded-4xl border border-line bg-white p-6 shadow-lift sm:p-8">
            <div className="mb-5 flex items-center gap-4">
              <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-forest text-mint shadow-soft">
                <Icon name="browser" className="h-6 w-6" />
              </div>
              <div>
                <p className="font-display font-bold text-forest">Recevez le guide</p>
                <p className="text-sm text-muted">PDF · Gratuit · 4 pages</p>
              </div>
            </div>
            <LivreBlancForm />
          </div>
        </div>
      </div>
    </section>
  );
}
