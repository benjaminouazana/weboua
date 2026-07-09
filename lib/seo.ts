import type { Metadata } from 'next';
import { site } from './site';

/**
 * Build per-page metadata with sane SEO + Open Graph defaults.
 * Pass a relative `path` (e.g. "/seo-referencement-naturel").
 */
export function buildMetadata({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  publishedTime,
  keywords,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  keywords?: string[];
}): Metadata {
  const url = `${site.url}${path === '/' ? '' : path}`;
  const fullTitle = path === '/' ? title : `${title} | ${site.name}`;

  return {
    title: fullTitle,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type,
      ...(publishedTime ? { publishedTime } : {}),
      // When no explicit image is given, Next falls back to the
      // dynamic app/opengraph-image.tsx (branded card generated in code).
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

/** Organization / professional service structured data for the site root. */
export function organizationJsonLd() {
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.name,
    description: site.description,
    url: site.url,
    email: site.email,
    foundingDate: String(site.foundedYear),
    areaServed: site.country,
    serviceType: [
      'Création de sites internet',
      'SEO / Référencement naturel',
      'Génération de leads B2B',
      'Campagnes de mailing',
      'Hébergement & serveurs',
    ],
    // N'inclure sameAs que si des profils sociaux sont renseignés.
    ...(sameAs.length ? { sameAs } : {}),
  };
}
