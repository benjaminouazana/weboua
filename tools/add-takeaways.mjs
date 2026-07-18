#!/usr/bin/env node
/**
 * Backfill unique : ajoute « L'essentiel à retenir » (takeaways) aux articles
 * déjà publiés qui ne l'ont pas encore. Insère le bloc dans le frontmatter,
 * juste après la ligne `tags:`. Ne touche pas aux articles qui en ont déjà un.
 *
 * Usage : node tools/add-takeaways.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

const TAKEAWAYS = {
  'site-wordpress-lent-solutions': [
    'Chaque seconde de chargement en plus augmente le taux de rebond de 20 à 30 %.',
    'Depuis 2021, Google pénalise les pages lentes via les Core Web Vitals.',
    "L'hébergement mutualisé bas de gamme est le premier goulot : un hébergement managé ou un VPS bien configuré change tout.",
    'Au-delà de 40-50 plugins actifs, les performances se dégradent : à auditer avec Query Monitor ou GTmetrix.',
    'Le format WebP réduit le poids des images de 25 à 35 %, et le cache (WP Rocket, LiteSpeed) évite de régénérer chaque page.',
    'Passer à PHP 8.x apporte jusqu’à +30 % de performance.',
  ],
  'site-wordpress-pirate-que-faire': [
    'Signes d’alerte : redirections suspectes, alertes Search Console, suspension de l’hébergeur, pages inconnues indexées.',
    'Dans les 24 h : mettre le site hors ligne, changer tous les identifiants (WordPress, FTP, base, email), garder une copie de l’état infecté.',
    'Trois options de nettoyage : restaurer une sauvegarde saine (le plus fiable), nettoyer manuellement (Wordfence), ou confier à un expert.',
    'Après nettoyage : mises à jour systématiques, double authentification, sauvegardes quotidiennes externalisées, hébergement de qualité.',
    'Ne pas négliger le SEO : demander un réexamen dans Search Console, supprimer les pages spam résiduelles, auditer les backlinks toxiques.',
  ],
  'referencement-naturel-roi-b2b': [
    'En B2B, les cycles sont longs : mesurer au seul dernier clic sous-estime fortement l’apport du SEO — privilégier l’attribution multi-touch.',
    'Un taux de conversion du trafic organique en lead qualifié de 1 à 3 % est une référence B2B raisonnable.',
    'Une fois la stratégie mature (12-18 mois), le lead organique coûte 3 à 8 fois moins cher qu’un lead publicitaire.',
    'Les premiers résultats arrivent en 4 à 6 mois ; un ROI fiable se juge sur 12 à 24 mois.',
    'Structurer la mesure en 3 niveaux : visibilité, engagement (coût par lead), impact business (pipeline, CA).',
    'Le SEO capitalise : le contenu continue de produire des résultats sans coût supplémentaire, contrairement à la publicité.',
  ],
  'seo-grandes-entreprises-strategie-2026': [
    'Les grandes structures ont des défis propres : milliers de pages, silos organisationnels, dette technique.',
    'La fondation technique est non négociable : budget de crawl, maillage interne, Core Web Vitals, redirections.',
    'Contenu centré expertise : pages piliers thématiques, intention de recherche, données propriétaires plutôt que du générique.',
    'Backlinks qualitatifs plutôt que quantitatifs : relations avec médias et institutions du secteur, mentions transformées en liens.',
    'Relier le SEO au revenu : conversion organique, coût par lead, valeur réelle — pas seulement le trafic brut.',
    'Erreur critique en refonte : intégrer le SEO dès la conception pour ne pas effondrer le trafic acquis.',
  ],
};

const esc = (s) => String(s).replace(/"/g, '\\"');

for (const [slug, items] of Object.entries(TAKEAWAYS)) {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) {
    console.log(`⏭️  ${slug} : fichier introuvable, ignoré.`);
    continue;
  }
  const raw = fs.readFileSync(file, 'utf-8');
  if (/^takeaways:/m.test(raw)) {
    console.log(`✅ ${slug} : a déjà un "takeaways", laissé tel quel.`);
    continue;
  }
  const block = ['takeaways:', ...items.map((t) => `  - "${esc(t)}"`)].join('\n');
  // Insère juste après la ligne "tags: ..." du frontmatter.
  const updated = raw.replace(/^(tags:.*)$/m, `$1\n${block}`);
  if (updated === raw) {
    console.log(`⚠️  ${slug} : ligne "tags:" introuvable, non modifié.`);
    continue;
  }
  fs.writeFileSync(file, updated, 'utf-8');
  console.log(`✍️  ${slug} : "L'essentiel à retenir" ajouté (${items.length} points).`);
}
console.log('Terminé.');
