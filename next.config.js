/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // L'ancienne LP unique pointe désormais vers sa fiche dans la bibliothèque.
      { source: '/livre-blanc', destination: '/ressources/refaire-son-site-en-2026', permanent: true },

      // --- Anciennes URL WordPress (avant refonte) → 301 vers le nouveau site.
      // Évite les 404 remontées par la Search Console et préserve le jus SEO.
      { source: '/contactez-nous', destination: '/contact', permanent: true },
      { source: '/nos-realisations', destination: '/nos-succes', permanent: true },
      { source: '/blog/3', destination: '/blog', permanent: true },
      { source: '/blog/5', destination: '/blog', permanent: true },
      { source: '/blog/6', destination: '/blog', permanent: true },

      // Anciens articles à thème « site / SEO » → pages de service pertinentes.
      { source: '/8-erreurs-seo-a-eviter-lors-dune-refonte-de-site-web', destination: '/seo-referencement-naturel', permanent: true },
      { source: '/optimisation-mobile-et-ux-les-cles-pour-un-site-internet-au-top-sur-tous-les-ecrans', destination: '/creation-de-sites-internet', permanent: true },
      { source: '/les-10-fonctionnalites-incontournables-pour-un-site-web-performant', destination: '/creation-de-sites-internet', permanent: true },

      // Ancienne page « agence » fourre-tout → accueil.
      { source: '/agence-weboua-votre-partenaire-pour-la-creation-de-site-internet-referencement-seo-sea-et-generation-de-leads-b2b', destination: '/', permanent: true },

      // Vieux articles hors sujet (iPhone, iOS, Instagram, Black Friday…) → le blog.
      { source: '/recapitulatif-des-avancees-technologiques-de-2023', destination: '/blog', permanent: true },
      { source: '/le-black-friday-la-date-a-ne-pas-manquer-pour-les-bonnes-affaires', destination: '/blog', permanent: true },
      { source: '/est-ce-que-le-black-friday-vaut-vraiment-le-coup', destination: '/blog', permanent: true },
      { source: '/call-to-action-sur-instagram-definition-et-25-exemples', destination: '/blog', permanent: true },
      { source: '/comment-faire-revivre-une-story-instagram-sur-votre-profil', destination: '/blog', permanent: true },
      { source: '/decouvrez-les-dernieres-avancees-iphone-15-et-iphone-15-pro', destination: '/blog', permanent: true },
      { source: '/decouvrez-les-nouvelles-fonctionnalites-passionnantes-dios-17', destination: '/blog', permanent: true },
      { source: '/les-nouveautes-passionnantes-prevues-pour-wordpress-en-janvier-2024', destination: '/blog', permanent: true },

      // Reliquat technique WordPress/Elementor.
      { source: '/wp-json/elementskit/v1', destination: '/', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
