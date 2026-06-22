import { Eyebrow } from '@/components/ui';
import { Icon } from '@/components/Icon';
import { LeadForm } from '@/components/LeadForm';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Contact — Parlons de votre projet',
  description:
    "Contactez l'agence Weboua pour votre projet de site, de SEO ou de génération de leads B2B. Réponse sous 24 h ouvrées.",
  path: '/contact',
});

export default function ContactPage() {
  return (
    <section className="container-page py-16">
      <div className="grid items-start gap-14 lg:grid-cols-2">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">Discutons de votre croissance</h1>
          <p className="mt-5 text-lg text-muted">
            Un projet de site, une ambition SEO, un besoin de leads ? Décrivez votre objectif : on revient vers vous
            sous 24 h ouvrées avec une première analyse — gratuite et sans engagement.
          </p>

          <div className="mt-10 space-y-5">
            <a href={`mailto:${site.email}`} className="flex items-center gap-4 text-forest hover:text-emerald">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mint/15 text-emerald">
                <Icon name="mail" className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm text-muted">Email</span>
                <span className="font-medium">{site.email}</span>
              </span>
            </a>
            <div className="flex items-center gap-4 text-forest">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mint/15 text-emerald">
                <Icon name="bolt" className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm text-muted">Délai de réponse</span>
                <span className="font-medium">Sous 24 h ouvrées</span>
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-4xl border border-line bg-cream p-6 shadow-soft sm:p-8">
          <LeadForm source="contact" />
        </div>
      </div>
    </section>
  );
}
