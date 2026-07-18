import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Eyebrow, SectionHeading, ContactBlock, CTABand } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { LeadTunnelPinned } from '@/components/LeadTunnelPinned';
import { servicesContent, getServiceContent } from '@/lib/services-content';
import { services } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(servicesContent).map((service) => ({ service }));
}

export function generateMetadata({ params }: { params: { service: string } }) {
  const c = getServiceContent(params.service);
  if (!c) return {};
  return buildMetadata({
    title: c.metaTitle,
    description: c.metaDescription,
    path: `/${c.slug}`,
    keywords: c.keywords,
  });
}

export default function ServicePage({ params }: { params: { service: string } }) {
  const c = getServiceContent(params.service);
  if (!c) notFound();

  const others = services.filter((s) => s.slug !== c.slug).slice(0, 3);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: c.hero.title,
    description: c.metaDescription,
    provider: { '@type': 'Organization', name: site.name, url: site.url },
    areaServed: site.country,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceJsonLd, faqJsonLd]) }} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream to-white">
        <div className="blob-float absolute -left-32 top-0 -z-10 h-80 w-80 rounded-full bg-mint/15 blur-3xl" />
        <div className="blob-float-slow absolute -right-24 top-24 -z-10 h-72 w-72 rounded-full bg-emerald/10 blur-3xl" />
        <div className="container-page py-14">
          <div className="max-w-3xl">
            <div className="hero-in">
              <Eyebrow>{c.hero.eyebrow}</Eyebrow>
            </div>
            <h1 className="hero-in mt-5 text-4xl font-bold leading-tight sm:text-5xl" style={{ animationDelay: '80ms' }}>{c.hero.title}</h1>
            <p className="hero-in mt-5 text-lg leading-relaxed text-muted" style={{ animationDelay: '160ms' }}>{c.hero.subtitle}</p>
            <div className="hero-in mt-8 flex flex-wrap gap-3" style={{ animationDelay: '240ms' }}>
              <Link href="/contact" className="btn-primary">
                Démarrer maintenant
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href="#faq" className="btn-ghost">
                Questions fréquentes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO + BENEFITS */}
      <section className="container-page py-10">
        <p className="mx-auto max-w-3xl text-center text-xl leading-relaxed text-forest">{c.intro}</p>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {c.benefits.map((b, i) => (
            <Reveal key={b.title} variant="up" delay={i * 90} className="h-full">
              <div className="card h-full transition-all hover:-translate-y-1 hover:border-mint hover:shadow-lift">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mint/15 text-emerald">
                  <Icon name={b.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg">{b.title}</h3>
                <p className="mt-2 text-sm text-muted">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TUNNEL DE LEADS — section épinglée, uniquement sur la page leads-b2b */}
      {c.slug === 'leads-b2b' && <LeadTunnelPinned />}

      {/* DELIVERABLES + PROCESS */}
      <section className="container-page py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="rounded-4xl border border-line bg-cream p-8 sm:p-10">
            <h2 className="text-2xl">Ce que vous obtenez</h2>
            <ul className="mt-6 space-y-3">
              {c.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-emerald text-white">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  <span className="text-forest">{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl">Notre méthode</h2>
            <ol className="mt-6 space-y-6">
              {c.process.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-forest font-display font-bold text-mint">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg">{step.title}</h3>
                    <p className="mt-1 text-muted">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container-page scroll-mt-24 py-10">
        <SectionHeading eyebrow="FAQ" title="Vos questions, nos réponses" />
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-line">
          {c.faqs.map((f) => (
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

      <ContactBlock source={c.slug} />

      {/* CROSS-SELL */}
      <section className="container-page py-10">
        <SectionHeading title="Nos autres expertises" center />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {others.map((s, i) => (
            <Reveal key={s.slug} delay={i * 90} className="h-full">
              <Link href={`/${s.slug}`} className="card group block h-full hover:-translate-y-1 hover:border-mint hover:shadow-lift">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest text-mint">
                  <Icon name={s.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.short}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}
