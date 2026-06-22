import Link from 'next/link';
import { Logo } from './Logo';
import { footerNav, site } from '@/lib/site';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-forest text-white/80">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo dark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            {site.tagline}. On ne fait pas de simples sites vitrines — on construit des machines à clients.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 inline-block text-sm font-medium text-mint hover:text-mint-light"
          >
            {site.email}
          </a>
        </div>

        {footerNav.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/70 transition-colors hover:text-mint">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.legalName}. Tous droits réservés.</p>
          <p>Fait avec exigence en {site.country}.</p>
        </div>
      </div>
    </footer>
  );
}
