# Guide de publication des articles — pour l'agent IA

Ce guide explique **comment publier un article de blog** sur le site Weboua.
Chaque article = **un fichier `.mdx`** déposé dans `content/blog/`. Le site se
régénère automatiquement au build/déploiement. Aucun CMS, aucune base de données.

## 1. Où créer le fichier

```
content/blog/<slug>.mdx
```

- Le **slug** devient l'URL : `content/blog/seo-local-2026.mdx` → `/blog/seo-local-2026`
- Slug en minuscules, mots séparés par des tirets, sans accents ni espaces.
- Le slug doit contenir le **mot-clé principal** ciblé (bon pour le SEO).

## 2. Frontmatter obligatoire

Chaque fichier commence par un bloc YAML entre `---` :

```yaml
---
title: "Titre de l'article (≤ 60 caractères, contient le mot-clé)"
description: "Méta-description vendeuse de 140–160 caractères, avec le mot-clé."
date: "2026-06-22"            # format AAAA-MM-JJ
author: "Weboua"
category: "SEO"               # ex : SEO, Création de sites, Acquisition B2B, Stratégie digitale
tags: ["seo local", "google", "référencement"]
draft: false                  # true = non publié (visible seulement en dev)
---
```

| Champ        | Obligatoire | Règle SEO                                            |
|--------------|-------------|-----------------------------------------------------|
| `title`      | oui         | ≤ 60 caractères, mot-clé principal au début si possible |
| `description`| oui         | 140–160 caractères, incitatif, contient le mot-clé  |
| `date`       | oui         | date de publication (tri du plus récent au plus ancien) |
| `category`   | oui         | une seule catégorie cohérente                       |
| `tags`       | recommandé  | 3 à 6 tags pertinents                               |
| `draft`      | oui         | `false` pour publier                                |

## 3. Règles de rédaction SEO

1. **Un seul `# H1`** → il est déjà généré à partir du `title`. Dans le corps, commencer aux `##` (H2).
2. **Structure claire** : H2 pour les sections, H3 pour les sous-points.
3. **Mot-clé principal** présent dans : le titre, la description, le premier paragraphe, au moins un H2.
4. **Intention de recherche** : répondre concrètement à ce que cherche l'utilisateur.
5. **Longueur** : viser 1 000–1 800 mots pour un article de fond.
6. **Maillage interne** : inclure 1 à 3 liens vers d'autres pages du site, par ex. :
   - `[audit gratuit](/audit-seo-performance)`
   - `[création de site](/creation-de-sites-internet)`
   - `[génération de leads B2B](/leads-b2b)`
   - `[contact](/contact)`
7. **CTA final** : terminer par un appel à l'action vers `/contact` ou `/audit-seo-performance`.
8. **Pas de bourrage de mots-clés** : écrire pour l'humain d'abord.

## 4. Syntaxe Markdown / MDX supportée

- Titres `##`, `###`
- Listes à puces et numérotées
- **gras**, *italique*
- Citations `>`
- Tableaux (GitHub Flavored Markdown)
- Liens `[texte](/url)`
- Blocs de code ``` ```

## 5. Cible éditoriale

Audience : **décideurs de grandes entreprises françaises** (dirigeants, DAF, directeurs
marketing). Ton : expert, direct, orienté résultats. Thèmes prioritaires :

- SEO / référencement naturel pour les entreprises
- Création de sites performants (vs WordPress)
- Génération de leads B2B, cold email, acquisition
- Performance web, Core Web Vitals
- Stratégie digitale et ROI

## 6. Publier

Déposer le fichier `.mdx`, committer et pousser. Le déploiement (Vercel/VPS)
reconstruit le site et l'article apparaît sur `/blog` et dans le `sitemap.xml`.
