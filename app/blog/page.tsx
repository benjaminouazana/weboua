import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { SectionHeading, CTABand } from '@/components/ui';
import { getAllPosts, formatDate } from '@/lib/blog';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Blog — Stratégies web, SEO & acquisition B2B',
  description:
    "Conseils concrets sur le SEO, la création de sites qui convertissent et la génération de leads B2B. Par l'agence Weboua.",
  path: '/blog',
});

export default function BlogIndex() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="container-page py-16">
        <SectionHeading
          eyebrow="Le blog Weboua"
          title="Stratégies web, SEO & acquisition B2B"
          intro="Des méthodes éprouvées pour gagner des positions sur Google et transformer votre site en moteur de croissance."
        />

        {posts.length === 0 && (
          <p className="mt-16 text-center text-muted">Les premiers articles arrivent très bientôt. 🌱</p>
        )}

        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group mt-14 block overflow-hidden rounded-4xl border border-line bg-cream shadow-soft transition-all hover:shadow-lift"
          >
            <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="eyebrow">À la une · {featured.category}</span>
                <h2 className="mt-4 text-2xl sm:text-3xl">{featured.title}</h2>
                <p className="mt-3 text-muted">{featured.description}</p>
                <div className="mt-5 flex items-center gap-3 text-sm text-muted">
                  <span>{formatDate(featured.date)}</span>
                  <span aria-hidden>·</span>
                  <span>{featured.readingMinutes} min de lecture</span>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-emerald">
                  Lire l'article
                  <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
              <div className="hidden aspect-[4/3] rounded-3xl bg-forest lg:flex lg:items-center lg:justify-center">
                <span className="font-display text-6xl text-mint/40">W</span>
              </div>
            </div>
          </Link>
        )}

        {rest.length > 0 && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card group flex flex-col hover:-translate-y-1 hover:border-mint">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald">{post.category}</span>
                <h3 className="mt-3 text-lg leading-snug">{post.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{post.description}</p>
                <div className="mt-5 flex items-center gap-2 text-xs text-muted">
                  <span>{formatDate(post.date)}</span>
                  <span aria-hidden>·</span>
                  <span>{post.readingMinutes} min</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <CTABand />
    </>
  );
}
