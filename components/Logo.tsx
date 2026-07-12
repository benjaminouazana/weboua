import Link from 'next/link';

/**
 * Wordmark "weboua" — le "o" est un cercle avec une flèche de croissance (mint).
 * Rendu en HTML + police de marque (Sora via font-display) pour une cohérence
 * parfaite avec le reste du site, et un "o" crisp à toute taille.
 */
export function Logo({ className = '', dark = false }: { className?: string; dark?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Weboua — accueil"
      className={`inline-flex items-center font-display text-2xl font-extrabold leading-none tracking-tight ${
        dark ? 'text-white' : 'text-forest'
      } ${className}`}
    >
      <span>web</span>
      <span className="inline-flex items-center justify-center" aria-hidden>
        <svg width="0.78em" height="0.78em" viewBox="0 0 24 24" className="mx-[0.5px] translate-y-[0.09em]">
          <circle cx="12" cy="12" r="9.4" fill="none" stroke="#58C28E" strokeWidth="2.7" />
          <path
            d="M8.4 15.6 L15.2 8.8 M15.2 8.8 L15.2 13 M15.2 8.8 L11 8.8"
            fill="none"
            stroke="#1F8A6B"
            strokeWidth="2.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>ua</span>
    </Link>
  );
}
