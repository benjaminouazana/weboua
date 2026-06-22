# Weboua — Agence Digitale Performance

Site de l'agence Weboua : création de sites internet, SEO et génération de leads B2B.
Codé sur-mesure, sans WordPress. Rapide, sécurisé, optimisé pour le référencement.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (design system maison)
- **Blog en MDX** (`content/blog/*.mdx`) — pensé pour la publication automatisée par un agent IA
- **Leads** : API route → **Google Sheets** + copie **email** (Resend)
- SEO natif : sitemap dynamique, robots, JSON-LD (Organization, Service, FAQ, BlogPosting), Open Graph généré en code

## Démarrer en local

```bash
npm install
cp .env.example .env.local   # puis remplir les valeurs
npm run dev                  # http://localhost:3000
```

## Scripts

```bash
npm run dev        # serveur de développement
npm run build      # build de production
npm run start      # serveur de production
npm run lint       # ESLint
npm run typecheck  # vérification TypeScript
```

## Structure

```
app/
  page.tsx                       # accueil
  [service]/page.tsx             # pages services (contenu dans lib/services-content.ts)
  blog/                          # liste + articles MDX
  contact/ a-propos/ nos-succes/ # pages
  mentions-legales/ ...          # pages légales
  api/lead/route.ts              # réception des leads
  sitemap.ts  robots.ts  opengraph-image.tsx
components/                      # Header, Footer, LeadForm, UI, Icônes
content/blog/*.mdx               # articles (voir CONTENT_GUIDE.md)
lib/                             # site config, SEO, leads, blog, contenus services
```

## Ajouter / modifier

- **Un service** : éditer `lib/services-content.ts` (+ `lib/site.ts` pour la nav).
- **Un article** : créer un `.mdx` dans `content/blog/` — voir **`CONTENT_GUIDE.md`**.
- **Infos agence / contact / nav** : `lib/site.ts`.

## Leads

Le formulaire poste sur `/api/lead`, qui :
1. ajoute une ligne dans le **Google Sheet** configuré ;
2. envoie une **copie email** de chaque lead.

Les deux canaux sont indépendants (un échec ne bloque pas l'autre). Configurez les
variables dans `.env.local` (voir `.env.example`). Sans configuration, le formulaire
fonctionne mais les leads ne sont que journalisés (dev).

## Déploiement

Recommandé : **Vercel** (zéro config pour Next.js). Sinon VPS :

```bash
npm run build && npm run start   # ou via pm2
```

Pensez à définir les variables d'environnement de production et `NEXT_PUBLIC_SITE_URL`.
Avant la mise en ligne, compléter les pages légales (`app/mentions-legales`, CGV, etc.).
