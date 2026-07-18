/**
 * Encadré « L'essentiel à retenir » — en tête d'article.
 * Crucial pour le SEO/GEO : c'est ce que les IA (ChatGPT, Google) citent en priorité.
 * Ne s'affiche que si l'article a un champ `takeaways` dans son frontmatter.
 */
export function KeyTakeaways({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <aside className="not-prose rounded-3xl bg-forest p-7 text-white shadow-lift sm:p-9">
      <p className="text-sm font-bold uppercase tracking-[0.15em] text-mint">L'essentiel à retenir</p>
      <ul className="mt-6 space-y-4">
        {items.map((t, i) => (
          <li key={i} className="flex gap-4">
            <span className="mt-[0.65rem] h-0.5 w-4 flex-none rounded bg-mint" aria-hidden />
            <span className="leading-relaxed text-white/90">{t}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
