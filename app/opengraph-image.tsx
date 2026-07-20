import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const runtime = 'nodejs';
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Og() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '90px',
          background: 'linear-gradient(135deg, #0C3A2E 0%, #15614E 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 44, fontWeight: 700 }}>
          <span>web</span>
          <svg width="40" height="40" viewBox="0 0 64 64" style={{ margin: '0 3px' }}>
            <circle cx="32" cy="32" r="17" stroke="#58C28E" strokeWidth="4.5" fill="none" />
            <path
              d="M24.5 39.5 L37.5 26.5 M37.5 26.5 L37.5 34.5 M37.5 26.5 L29.5 26.5"
              stroke="#86D9AF"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>ua</span>
        </div>
        <div style={{ marginTop: 40, fontSize: 64, fontWeight: 800, lineHeight: 1.1, maxWidth: 900 }}>
          On construit des machines à clients.
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: '#86D9AF' }}>
          Sites internet · SEO · Leads B2B
        </div>
      </div>
    ),
    size,
  );
}
