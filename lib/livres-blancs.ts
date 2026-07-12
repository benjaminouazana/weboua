/**
 * Catalogue des livres blancs.
 * Pour en ajouter un : dépose le PDF + une image de couverture dans /public,
 * puis ajoute une entrée ici. Sa landing page (/ressources/<slug>) et sa carte
 * dans la bibliothèque sont générées automatiquement.
 */

export type LivreBlanc = {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  pdf: string; // chemin dans /public
  cover: string; // chemin dans /public
  pages: number;
  publishedAt: string; // AAAA-MM
  inside: string[];
};

export const livresBlancs: LivreBlanc[] = [
  {
    slug: 'refaire-son-site-en-2026',
    eyebrow: 'Livre blanc gratuit · Édition 2026',
    title: 'Pourquoi refaire son site internet en 2026',
    subtitle:
      "Le guide des dirigeants pour transformer un site-vitrine qui dort en une véritable machine à clients. Des conseils concrets, prêts à appliquer, zéro blabla.",
    metaTitle: 'Livre blanc gratuit — Pourquoi refaire son site en 2026',
    metaDescription:
      "Le guide des dirigeants pour transformer un site-vitrine en machine à clients : les 7 signes qu'il faut refaire, le coût d'un site dépassé, la méthode. PDF gratuit.",
    keywords: ['refaire son site internet', 'refonte site web', 'livre blanc site internet', 'site web 2026'],
    pdf: '/livre-blanc-weboua-refaire-son-site-2026.pdf',
    cover: '/livre-blanc-cover.jpg',
    pages: 4,
    publishedAt: '2026-07',
    inside: [
      "Les 7 signes qui prouvent qu'il faut refaire votre site",
      "Le coût caché (et chiffré) d'un site dépassé",
      "Ce qu'un site pensé pour 2026 change vraiment : vitesse, SEO, conversion, automatisation",
      "La méthode complète, de l'audit aux résultats",
      "La checklist « Votre site est-il prêt pour 2026 ? »",
    ],
  },
  {
    slug: 'visible-google-et-chatgpt-2026',
    eyebrow: 'Livre blanc gratuit · SEO & IA · 2026',
    title: 'Être visible sur Google et sur ChatGPT en 2026',
    subtitle:
      "Le guide des dirigeants pour rester trouvable quand vos clients cherchent — sur Google comme dans les réponses de l'IA. SEO + GEO, sans jargon.",
    metaTitle: 'Livre blanc gratuit — Être visible sur Google et sur ChatGPT en 2026',
    metaDescription:
      "Le SEO ne suffit plus : apprenez à apparaître dans les réponses de ChatGPT, Perplexity et Google (GEO). Le test ChatGPT, les 4 leviers, la méthode. PDF gratuit.",
    keywords: ['seo 2026', 'geo', 'référencement ia', 'visible sur chatgpt', 'generative engine optimization'],
    pdf: '/livre-blanc-weboua-visible-google-chatgpt-2026.pdf',
    cover: '/livre-blanc-cover-visible-google-chatgpt.jpg',
    pages: 4,
    publishedAt: '2026-08',
    inside: [
      'Pourquoi le SEO seul ne suffit plus en 2026',
      'Le test ChatGPT : votre entreprise est-elle citée ?',
      'SEO + GEO : être trouvé sur Google ET dans les réponses IA',
      "Les 4 leviers pour devenir la source que l'IA cite",
      'La checklist « Prêt pour la recherche 2026 ? »',
    ],
  },
  {
    slug: '10-taches-a-automatiser',
    eyebrow: 'Livre blanc gratuit · Automatisation · 2026',
    title: '10 tâches que vous faites encore à la main',
    subtitle:
      "Le guide des dirigeants pour récupérer une journée par semaine — et arrêter de perdre des clients par simple oubli.",
    metaTitle: 'Livre blanc gratuit — 10 tâches à automatiser dans votre entreprise',
    metaDescription:
      "Relances, devis, factures, avis, reporting : découvrez les 10 tâches qui devraient tourner toutes seules, ce que l'oubli vous coûte, et la méthode. PDF gratuit.",
    keywords: ['automatisation entreprise', 'automatiser pme', 'gagner du temps', 'automatisation relances', 'reporting automatique'],
    pdf: '/livre-blanc-weboua-10-taches-a-automatiser.pdf',
    cover: '/livre-blanc-cover-10-taches.jpg',
    pages: 4,
    publishedAt: '2026-09',
    inside: [
      'Les 10 tâches qui devraient tourner toutes seules',
      'Le test du post-it : combien d\'heures récupérables ?',
      "Ce que l'oubli d'une relance vous coûte vraiment",
      'La méthode pour automatiser sans y penser',
      'La checklist « Votre entreprise tourne-t-elle sans vous ? »',
    ],
  },
  {
    slug: 'rendez-vous-qualifies-b2b',
    eyebrow: 'Livre blanc gratuit · Leads B2B · 2026',
    title: 'Le guide du rendez-vous qualifié',
    subtitle:
      "Arrêter de dépendre du bouche-à-oreille : la méthode pour un flux prévisible de prospects B2B qui répondent.",
    metaTitle: 'Livre blanc gratuit — Le guide du rendez-vous qualifié B2B',
    metaDescription:
      "Ne dépendez plus du bouche-à-oreille : ciblage, cold email, aimants à leads et nurturing. Les 4 piliers d'un flux de rendez-vous B2B prévisible. PDF gratuit.",
    keywords: ['leads b2b', 'rendez-vous qualifiés', 'prospection b2b', 'cold email', 'génération de leads'],
    pdf: '/livre-blanc-weboua-rendez-vous-qualifies-b2b.pdf',
    cover: '/livre-blanc-cover-rendez-vous-qualifies.jpg',
    pages: 4,
    publishedAt: '2026-10',
    inside: [
      'Pourquoi le bouche-à-oreille ne suffit plus',
      "Les 6 signes d'une acquisition fragile",
      "Les 4 piliers d'un flux de RDV prévisible",
      'De zéro fichier au rendez-vous : la méthode',
      'La checklist « Votre acquisition est-elle sous contrôle ? »',
    ],
  },
];

export function getLivreBlanc(slug: string): LivreBlanc | null {
  return livresBlancs.find((l) => l.slug === slug) ?? null;
}

export function getAllLivreBlancSlugs(): string[] {
  return livresBlancs.map((l) => l.slug);
}
