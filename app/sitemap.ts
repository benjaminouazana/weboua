import type { MetadataRoute } from 'next';
import { site, services } from '@/lib/site';
import { getAllPosts } from '@/lib/blog';
import { livresBlancs } from '@/lib/livres-blancs';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const staticRoutes = [
    { path: '/', priority: 1 },
    { path: '/a-propos', priority: 0.7 },
    { path: '/offres', priority: 0.9 },
    { path: '/nos-succes', priority: 0.8 },
    { path: '/blog', priority: 0.8 },
    { path: '/ressources', priority: 0.8 },
    { path: '/contact', priority: 0.9 },
    { path: '/mentions-legales', priority: 0.3 },
    { path: '/politique-de-confidentialite', priority: 0.3 },
    { path: '/conditions-generales-de-vente', priority: 0.3 },
  ].map((r) => ({
    url: `${base}${r.path === '/' ? '' : r.path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: r.priority,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${base}/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const postRoutes = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const ressourceRoutes = livresBlancs.map((lb) => ({
    url: `${base}/ressources/${lb.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...postRoutes, ...ressourceRoutes];
}
