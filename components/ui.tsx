import Link from 'next/link';
import { Icon } from './Icon';
import { LeadForm } from './LeadForm';

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="eyebrow">
      <span className="h-1.5 w-1.5 rounded-full bg-mint" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 text-3xl sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}

export function Stats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
      {items.map((s) => (
        <div key={s.label}>
          <dt className="font-display text-4xl font-bold text-emerald sm:text-5xl">{s.value}</dt>
          <dd className="mt-1 text-sm text-muted">{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Conversion band reused at the bottom of most pages. */
export function CTABand({
  title = 'Prêt à transformer votre site en machine à clients ?',
  subtitle = 'Audit gratuit, sans engagement. On vous montre concrètement comment gagner des positions et des leads.',
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="container-page my-16">
      <div className="overflow-hidden rounded-4xl bg-forest px-6 py-14 text-center sm:px-12">
        <h2 className="mx-auto max-w-2xl text-3xl text-white sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/70">{subtitle}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn-light">
            Demander mon audit gratuit
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
          <Link href="/nos-succes" className="btn border border-white/30 text-white hover:bg-white/10">
            Voir nos résultats
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Standard contact block: copy on the left, lead form on the right. */
export function ContactBlock({ source }: { source: string }) {
  return (
    <section className="container-page my-16">
      <div className="grid items-start gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>Parlons de votre projet</Eyebrow>
          <h2 className="mt-4 text-3xl sm:text-4xl">Recevez une analyse gratuite sous 24 h</h2>
          <p className="mt-4 text-lg text-muted">
            Décrivez votre projet : on revient vers vous avec une première lecture de votre marché, de votre
            concurrence et des leviers de croissance — gratuitement et sans engagement.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              'Un interlocuteur unique, pas de jargon',
              'Un site rapide, sécurisé et pensé pour convertir',
              'Des résultats mesurables : trafic, leads, CA',
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-mint/20 text-emerald">
                  <Icon name="check" className="h-4 w-4" />
                </span>
                <span className="text-forest">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-4xl border border-line bg-cream p-6 shadow-soft sm:p-8">
          <LeadForm source={source} />
        </div>
      </div>
    </section>
  );
}
