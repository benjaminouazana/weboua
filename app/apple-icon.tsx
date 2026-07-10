import { ImageResponse } from 'next/og';

// Icône iOS (écran d'accueil) — même marque que app/icon.svg.
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0C3A2E',
        }}
      >
        <svg width="120" height="120" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="17" stroke="#58C28E" strokeWidth="4.5" fill="none" />
          <path
            d="M24.5 39.5 L37.5 26.5 M37.5 26.5 L37.5 34.5 M37.5 26.5 L29.5 26.5"
            stroke="#86D9AF"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
