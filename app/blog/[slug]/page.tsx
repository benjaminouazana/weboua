import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { Icon } from '@/components/Icon';
import { KeyTakeaways } from '@/components/KeyTakeaways';
import { ArticleToc } from '@/components/ArticleToc';
import { LeadForm } from '@/components/LeadForm';
import { getPost, getAllSlugs, getHeadings, formatDate } from '@/lib/blog';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.date,
    keywords: post.tags,
  });
}

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }] as [typeof rehypeAutolinkHeadings, { behavior: string }],
    ],
  },
};

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const headings = getHeadings(post.content);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    keywords: post.tags.join(', '),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="container-page py-16">
        <div className="mx-auto max-w-5xl">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald hover:underline">
            <Icon name="arrow" className="h-4 w-4 rotate-180" />
            Tous les articles
          </Link>

          <header className="mt-6 max-w-3xl">
            <span className="eyebrow">{post.category}</span>
            <h1 className="mt-4 text-3xl leading-tight sm:text-5xl">{post.title}</h1>
            <p className="mt-4 text-lg text-muted">{post.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3 border-y border-line py-4 text-sm text-muted">
              <span className="font-medium text-forest">{post.author}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingMinutes} min de lecture</span>
            </div>
          </header>

          <div className="mt-10 gap-12 lg:grid lg:grid-cols-[230px_minmax(0,1fr)]">
            {headings.length >= 2 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <ArticleToc headings={headings} />
                </div>
              </aside>
            )}

            <div className="min-w-0">
              <KeyTakeaways items={post.takeaways} />

              <div className="prose-weboua mt-10">
                <MDXRemote source={post.content} options={mdxOptions} />
              </div>

              {post.tags.length > 0 && (
                <div className="mt-12 flex flex-wrap gap-2 border-t border-line pt-8">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-muted">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </article>

      <section className="border-t border-line bg-cream/40 py-16">
        <div className="container-page">
          <div className="mx-auto max-w-2xl">
            <div className="text-center">
              <span className="eyebrow">Parlons de votre projet</span>
              <h2 className="mt-4 text-3xl sm:text-4xl">Un audit gratuit de votre site &amp; SEO</h2>
              <p className="mt-3 text-muted">
                On analyse votre site, votre référencement et votre acquisition — et on vous dit
                exactement quoi améliorer. Réponse sous 24 h ouvrées.
              </p>
            </div>
            <div className="mt-8 rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
              <LeadForm source={`blog:${post.slug}`} compact />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
