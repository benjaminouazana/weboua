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
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 40, fontWeight: 700 }}>
          web<span style={{ color: '#58C28E' }}>◯</span>ua
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
