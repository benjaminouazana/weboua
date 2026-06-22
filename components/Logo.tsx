import Link from 'next/link';

/**
 * Inline SVG wordmark — "web" + mint upward arrow (growth) + "ua".
 * Renders crisp at any size and needs no asset request.
 */
export function Logo({ className = '', dark = false }: { className?: string; dark?: boolean }) {
  const text = dark ? '#FFFFFF' : '#0C3A2E';
  return (
    <Link href="/" aria-label="Weboua — accueil" className={`inline-flex items-center ${className}`}>
      <svg width="132" height="32" viewBox="0 0 132 32" fill="none" role="img" aria-label="Weboua">
        <text
          x="0"
          y="24"
          fontFamily="Sora, system-ui, sans-serif"
          fontSize="26"
          fontWeight="700"
          letterSpacing="-0.5"
          fill={text}
        >
          web
        </text>
        {/* growth arrow forming the "o" */}
        <g transform="translate(52 4)">
          <circle cx="12" cy="12" r="11" stroke="#58C28E" strokeWidth="2.5" fill="none" />
          <path
            d="M6 16 L14 8 M14 8 L14 13 M14 8 L9 8"
            stroke="#1F8A6B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <text
          x="78"
          y="24"
          fontFamily="Sora, system-ui, sans-serif"
          fontSize="26"
          fontWeight="700"
          letterSpacing="-0.5"
          fill={text}
        >
          ua
        </text>
      </svg>
    </Link>
  );
}
