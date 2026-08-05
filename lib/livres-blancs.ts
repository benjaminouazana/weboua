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
    slug: 'entreprise-qui-tourne-sans-vous',
    eyebrow: 'Livre blanc gratuit · Automatisation · 2026',
    title: "L'entreprise qui tourne sans vous",
    subtitle:
      "Le guide des dirigeants pour déléguer les tâches répétitives à des systèmes automatiques — récupérer du temps, sans embaucher.",
    metaTitle: "Livre blanc gratuit — L'entreprise qui tourne sans vous",
    metaDescription:
      "Déléguez les tâches répétitives à des systèmes automatiques : les signes que ça vous concerne, les systèmes à automatiser en premier, la méthode. PDF gratuit.",
    keywords: ['automatisation entreprise', 'automatiser sa pme', 'gagner du temps', 'déléguer les tâches', 'workflow automation'],
    pdf: '/livre-blanc-weboua-automatisation-entreprise-tourne-sans-vous.pdf',
    cover: '/livre-blanc-cover-automatisation-entreprise-tourne-sans-vous.jpg',
    pages: 4,
    publishedAt: '2027-06',
    inside: [
      'Les 5 signes que vous perdez du temps sur des tâches automatisables',
      'Le coût réel des tâches manuelles dans une entreprise',
      'Les systèmes à automatiser en premier : relances, données, RDV, reporting',
      'La méthode pour démarrer sans usine à gaz',
      'La checklist de démarrage',
    ],
  },
  {
    slug: 'automatiser-relances-devis-factures',
    eyebrow: 'Livre blanc gratuit · Automatisation · 2026',
    title: 'Zéro relance oubliée',
    subtitle:
      "Relances, devis, factures : la méthode pour ne plus jamais laisser d'argent sur la table par simple oubli.",
    metaTitle: 'Livre blanc gratuit — Zéro relance oubliée (relances, devis, factures)',
    metaDescription:
      "Ne perdez plus d'argent par oubli : automatisez la relance de devis, le suivi de factures et l'après-vente. La méthode complète. PDF gratuit.",
    keywords: ['relance client automatique', 'automatiser devis factures', 'relance devis', 'facture impayée', 'automatisation commerciale'],
    pdf: '/livre-blanc-weboua-automatisation-relances-devis-factures.pdf',
    cover: '/livre-blanc-cover-automatisation-relances-devis-factures.jpg',
    pages: 4,
    publishedAt: '2027-05',
    inside: [
      'Ce que les oublis de relance vous coûtent vraiment',
      "Les 5 signes d'un suivi commercial qui fuit",
      'La relance de devis et le suivi de factures automatisés',
      'La génération de devis et factures sans ressaisie',
      'La checklist « zéro oubli »',
    ],
  },
  {
    slug: 'agent-ia-entreprise',
    eyebrow: 'Livre blanc gratuit · Automatisation & IA · 2026',
    title: 'Un agent IA dans votre entreprise',
    subtitle:
      "Ce qu'un agent IA peut vraiment faire pour une PME — les cas d'usage concrets, et comment le mettre en place sans risque.",
    metaTitle: "Livre blanc gratuit — Un agent IA dans votre entreprise",
    metaDescription:
      "Au-delà du buzz : ce qu'un agent IA change concrètement pour une PME. Les cas d'usage réels (réponse, tri, rédaction, qualification) et la méthode. PDF gratuit.",
    keywords: ['agent IA entreprise', 'IA pour PME', 'automatiser service client IA', "cas d'usage IA entreprise", 'assistant IA'],
    pdf: '/livre-blanc-weboua-automatisation-agent-ia-entreprise.pdf',
    cover: '/livre-blanc-cover-automatisation-agent-ia-entreprise.jpg',
    pages: 4,
    publishedAt: '2027-04',
    inside: [
      "Ce qu'est (et n'est pas) un agent IA",
      'Là où un agent IA vous fait gagner du temps',
      "Les 4 cas d'usage concrets pour une PME",
      'Comment le déployer sans risque, avec un humain dans la boucle',
      'La checklist de mise en place',
    ],
  },
  {
    slug: 'automatiser-rdv-service-client',
    eyebrow: 'Livre blanc gratuit · Automatisation · 2026',
    title: 'Votre agenda se remplit tout seul',
    subtitle:
      "Prise de rendez-vous et réponses clients 24/7 : capter et servir vos prospects sans y passer vos journées.",
    metaTitle: 'Livre blanc gratuit — Votre agenda se remplit tout seul',
    metaDescription:
      "Ne perdez plus un prospect faute de réponse : prise de RDV autonome, réponses 24/7, qualification et suivi automatiques. La méthode. PDF gratuit.",
    keywords: ['automatiser prise de rendez-vous', 'prise de rdv en ligne', 'réponse client automatique', 'chatbot rendez-vous', 'qualification leads automatique'],
    pdf: '/livre-blanc-weboua-automatisation-rdv-service-client.pdf',
    cover: '/livre-blanc-cover-automatisation-rdv-service-client.jpg',
    pages: 4,
    publishedAt: '2027-03',
    inside: [
      'Ce que la lenteur de réponse vous coûte en ventes',
      'Les 5 signes que des prospects vous filent entre les doigts',
      'La prise de RDV autonome et la réponse instantanée 24/7',
      'La qualification et le suivi automatiques des demandes',
      'La checklist « agenda plein »',
    ],
  },
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
    pdf: '/livre-blanc-weboua-refaire-son-site-2026-v2.pdf',
    cover: '/livre-blanc-cover-refaire-v2.jpg',
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
    pdf: '/livre-blanc-weboua-visible-google-chatgpt-2026-v2.pdf',
    cover: '/livre-blanc-cover-visible-google-chatgpt-v2.jpg',
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
    pdf: '/livre-blanc-weboua-10-taches-a-automatiser-v2.pdf',
    cover: '/livre-blanc-cover-10-taches-v2.jpg',
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
    pdf: '/livre-blanc-weboua-rendez-vous-qualifies-b2b-v2.pdf',
    cover: '/livre-blanc-cover-rendez-vous-qualifies-v2.jpg',
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
  {
    slug: 'cout-page-2-google',
    eyebrow: 'Livre blanc gratuit · SEO · 2026',
    title: 'Combien vous coûte la page 2 de Google',
    subtitle:
      "Personne ne va en page 2. Le trafic — et le chiffre d'affaires — que vous laissez à vos concurrents, et comment le récupérer.",
    metaTitle: 'Livre blanc gratuit — Combien vous coûte la page 2 de Google',
    metaDescription:
      "Être en page 2 de Google, c'est être invisible. Découvrez le trafic et le CA que vous perdez, et la méthode pour passer en page 1. PDF gratuit.",
    keywords: ['seo', 'page 2 google', 'référencement page 1', 'trafic organique', 'positionnement google'],
    pdf: '/livre-blanc-weboua-cout-page-2-google.pdf',
    cover: '/livre-blanc-cover-page-2-google.jpg',
    pages: 4,
    publishedAt: '2026-11',
    inside: [
      'Pourquoi la page 2 = invisible',
      'Le trafic (et le CA) que vous laissez aux concurrents',
      'Les 4 leviers pour passer en page 1',
      "La méthode, de l'audit au suivi des positions",
      'La checklist « Où en êtes-vous ? »',
    ],
  },
  {
    slug: 'seo-local-numero-1-ville',
    eyebrow: 'Livre blanc gratuit · SEO local · 2026',
    title: 'SEO local : devenir le n°1 de votre ville',
    subtitle:
      "Vos clients cherchent « votre métier + votre ville ». Le guide pour truster le pack local de Google et Google Maps sur votre zone.",
    metaTitle: 'Livre blanc gratuit — SEO local : devenir le n°1 de votre ville',
    metaDescription:
      "46 % des recherches Google sont locales. Le guide pour apparaître dans le pack local, optimiser votre fiche Google et vos avis. PDF gratuit.",
    keywords: ['seo local', 'référencement local', 'google my business', 'pack local', 'fiche google'],
    pdf: '/livre-blanc-weboua-seo-local.pdf',
    cover: '/livre-blanc-cover-seo-local.jpg',
    pages: 4,
    publishedAt: '2026-12',
    inside: [
      'Le pack local : là où tout se joue',
      'Les 6 signes que le local vous échappe',
      'Fiche Google, avis, pages locales : les leviers',
      'La méthode pour dominer votre zone',
      'La checklist « Êtes-vous visible en local ? »',
    ],
  },
  {
    slug: 'cold-email-anti-spam-2026',
    eyebrow: 'Livre blanc gratuit · Prospection · 2026',
    title: "Le cold email qui n'atterrit pas en spam",
    subtitle:
      "Vos emails de prospection finissent en spam ? La technique et le RGPD pour être lu, obtenir des réponses, sans griller votre domaine.",
    metaTitle: "Livre blanc gratuit — Le cold email qui n'atterrit pas en spam",
    metaDescription:
      "Délivrabilité, SPF/DKIM/DMARC, warm-up, RGPD : le guide pour que vos cold emails arrivent en boîte de réception et obtiennent des réponses. PDF gratuit.",
    keywords: ['cold email', 'délivrabilité email', 'spf dkim dmarc', 'prospection email', 'email en spam'],
    pdf: '/livre-blanc-weboua-cold-email-anti-spam.pdf',
    cover: '/livre-blanc-cover-cold-email.jpg',
    pages: 4,
    publishedAt: '2027-01',
    inside: [
      'Pourquoi vos emails tombent en spam',
      'Les 6 erreurs qui grillent votre domaine',
      'SPF, DKIM, DMARC, warm-up : les fondations',
      "La méthode d'envoi qui obtient des réponses",
      'La checklist « Votre cold email est-il prêt ? »',
    ],
  },
  {
    slug: 'hebergement-securite-site',
    eyebrow: 'Livre blanc gratuit · Hébergement · 2026',
    title: 'Le guide du site qui ne tombe jamais',
    subtitle:
      "Vitesse, sauvegardes, sécurité : ce qu'un dirigeant doit vérifier pour un site rapide, fiable et à l'abri des piratages.",
    metaTitle: 'Livre blanc gratuit — Hébergement & sécurité : le site qui ne tombe jamais',
    metaDescription:
      "Hébergement, sauvegardes, HTTPS, monitoring : le guide du dirigeant pour un site rapide, fiable et protégé contre les piratages. PDF gratuit.",
    keywords: ['hébergement site', 'sécurité site web', 'sauvegarde site', 'site rapide', 'maintenance site'],
    pdf: '/livre-blanc-weboua-hebergement-securite.pdf',
    cover: '/livre-blanc-cover-hebergement.jpg',
    pages: 4,
    publishedAt: '2027-02',
    inside: [
      'Pourquoi un site en ligne reste fragile',
      'Les 6 signes que votre site est exposé',
      'Vitesse, sauvegardes, sécurité, monitoring',
      'La méthode pour un site fiable 24/7',
      "La checklist « Votre site est-il à l'abri ? »",
    ],
  },
];

export function getLivreBlanc(slug: string): LivreBlanc | null {
  return livresBlancs.find((l) => l.slug === slug) ?? null;
}

export function getAllLivreBlancSlugs(): string[] {
  return livresBlancs.map((l) => l.slug);
}
