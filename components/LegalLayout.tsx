export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <section className="container-page py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-muted">Dernière mise à jour : {updated}</p>
        <div className="prose-weboua mt-8">{children}</div>
      </div>
    </section>
  );
}
