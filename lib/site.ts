/**
 * Single source of truth for site-wide metadata, navigation and contact info.
 * Update once here — header, footer, sitemap and structured data all read from this.
 */

export const site = {
  name: 'Weboua',
  legalName: 'Weboua',
  tagline: 'Agence Digitale Performance',
  description:
    "Agence web spécialisée dans la création de sites internet sur-mesure, le SEO et la génération de leads B2B. Nous construisons des machines à clients pour les entreprises ambitieuses.",
  // Production URL — override via NEXT_PUBLIC_SITE_URL
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://weboua.com',
  email: 'contact@weboua.com',
  locale: 'fr_FR',
  country: 'France',
  foundedYear: 2014,
  social: {
    // Ajoute ici tes vrais profils (ils alimentent le schema.org sameAs).
    // Ex : linkedin: 'https://www.linkedin.com/company/ton-entreprise',
  } as Record<string, string>,
} as const;

/** Références clients affichées sur le site (liens sortants). */
export const clients: { name: string; url: string }[] = [
  { name: 'Groupe Optim', url: 'https://groupeoptim.fr' },
  { name: 'Optim Énergie', url: 'https://optimenergie.fr' },
  { name: 'Eden Green', url: 'https://eden.green' },
  { name: 'AR Controls', url: 'https://arcontrols.fr' },
  { name: 'Agescom', url: 'https://agescom.fr' },
  { name: 'We-Search', url: 'https://we-search.fr' },
  { name: 'CV We-Search', url: 'https://cv.we-search.fr' },
  { name: 'Mon Petit Parfait', url: 'https://monpetitparfait.fr' },
  { name: 'WP Sauvetage', url: 'https://wp-sauvetage.fr' },
  { name: 'ADE Solutions', url: 'https://ade-solutions.fr' },
  { name: 'Paris Beauty Academy', url: 'https://parisbeautyacademy.com' },
  { name: 'May Énergie', url: 'https://may-energie.fr' },
  { name: 'Pure Salmon France', url: 'https://puresalmonfrance.com' },
  { name: 'Lettershop', url: 'https://www.lettershop.fr' },
  { name: 'Le Salon Dermo', url: 'https://lesalondermo.com' },
];

export type NavItem = { label: string; href: string };

export const services: {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: string;
}[] = [
  {
    slug: 'creation-de-sites-internet',
    title: 'Création de sites internet',
    short: 'Des sites pensés pour convertir, pas pour décorer.',
    description:
      "Sites vitrines qui convertissent, landing pages et plateformes sur-mesure codés à la main : rapides, sécurisés et pensés pour transformer vos visiteurs en clients.",
    icon: 'browser',
  },
  {
    slug: 'seo-referencement-naturel',
    title: 'SEO & Référencement naturel',
    short: 'Atteignez le top des résultats Google.',
    description:
      "Stratégie SEO complète : audit technique, sémantique, netlinking et contenus optimisés pour positionner votre site sur les requêtes qui génèrent du chiffre.",
    icon: 'search',
  },
  {
    slug: 'leads-b2b',
    title: 'Génération de leads B2B',
    short: 'Un flux constant de prospects qualifiés.',
    description:
      "Campagnes de prospection ciblées et tunnels de conversion pour alimenter votre commercial en rendez-vous qualifiés, mois après mois.",
    icon: 'target',
  },
  {
    slug: 'campagnes-email',
    title: 'Campagnes de mailing',
    short: 'Des emails qui ouvrent des portes.',
    description:
      "Cold emailing et email marketing : séquences, délivrabilité, segmentation et copywriting pour décrocher des réponses et des opportunités.",
    icon: 'mail',
  },
  {
    slug: 'hebergement-serveurs',
    title: 'Hébergement & Serveurs',
    short: 'Une infrastructure rapide et fiable.',
    description:
      "Hébergement infogéré, serveurs performants, sauvegardes et monitoring. Votre site reste rapide, sécurisé et disponible 24/7.",
    icon: 'server',
  },
  {
    slug: 'audit-seo-performance',
    title: 'Audit SEO & Performance',
    short: 'Diagnostic gratuit de votre potentiel.',
    description:
      "Analyse complète de votre présence en ligne : technique, vitesse, mots-clés et concurrence. Repartez avec un plan d'action concret.",
    icon: 'gauge',
  },
];

export const mainNav: NavItem[] = [
  { label: 'Services', href: '/#services' },
  { label: 'Offres', href: '/offres' },
  { label: 'Nos succès', href: '/nos-succes' },
  { label: 'Ressources', href: '/ressources' },
  { label: 'Blog', href: '/blog' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Audit gratuit', href: '/audit-seo-performance' },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: 'Services',
    items: services.map((s) => ({ label: s.title, href: `/${s.slug}` })),
  },
  {
    title: 'Agence',
    items: [
      { label: 'À propos', href: '/a-propos' },
      { label: 'Nos succès', href: '/nos-succes' },
      { label: 'Ressources', href: '/ressources' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Légal',
    items: [
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'Politique de confidentialité', href: '/politique-de-confidentialite' },
      { label: 'CGV', href: '/conditions-generales-de-vente' },
    ],
  },
];
