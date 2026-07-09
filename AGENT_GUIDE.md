# Agent de publication d'articles SEO 🤖

Cet agent rédige et publie **automatiquement des articles SEO** sur le blog,
**2 fois par semaine** (mardi et vendredi), sans aucune intervention.

## Comment ça marche

```
GitHub Actions (cron 2x/sem)
   └─ tools/generate-article.mjs
        ├─ prend le prochain sujet "todo" dans content/topics.json
        ├─ demande à Claude (API) de rédiger un article SEO optimisé
        ├─ écrit content/blog/<slug>.mdx
        └─ marque le sujet comme "done"
   └─ valide que le site compile (npm run build)  ← filet de sécurité
   └─ commit + push  →  Vercel redéploie automatiquement
```

Un article mal formé ne peut **pas** casser le site : si le build échoue, rien n'est publié.

## Mise en route (à faire une seule fois)

### 1. Obtenir une clé API Claude
- Va sur **https://console.anthropic.com** → crée un compte
- **API Keys** → **Create Key** → copie la clé (`sk-ant-...`)
- Ajoute un peu de crédit (quelques euros suffisent pour des mois)

### 2. Ajouter la clé dans GitHub
- Repo `weboua` → **Settings** → **Secrets and variables** → **Actions**
- **New repository secret**
  - Name : `ANTHROPIC_API_KEY`
  - Secret : ta clé `sk-ant-...`

### 3. Autoriser l'agent à publier
- Repo → **Settings** → **Actions** → **General**
- Section **Workflow permissions** → coche **Read and write permissions** → **Save**

### 4. Tester tout de suite (sans attendre mardi)
- Onglet **Actions** → workflow **« Publier un article SEO »** → **Run workflow**
- En ~1-2 min, un nouvel article apparaît dans `content/blog/`, le site se redéploie,
  et l'article est visible sur `/blog`. 🎉

## Piloter le contenu

- **Ajouter des sujets** : édite `content/topics.json` (ajoute des objets `{ slug, title, keyword, category, status: "todo" }`).
  L'agent les traite dans l'ordre. Quand il n'y a plus de `todo`, il s'arrête (sans erreur).
- **Catégories utilisées** : SEO, Création de sites, Acquisition B2B, Performance, Hébergement, Stratégie digitale.
- **Changer de modèle** (optionnel) : repo → Settings → Secrets and variables → Actions → onglet **Variables** → `ARTICLE_MODEL` (défaut : `claude-sonnet-4-6`).
- **Changer la fréquence** : modifie la ligne `cron` dans `.github/workflows/publish-article.yml`
  (`0 8 * * 2,5` = mardi & vendredi 8h UTC).

## Bon à savoir

- Les articles respectent les règles SEO de `CONTENT_GUIDE.md` (mot-clé, structure, liens internes, CTA).
- Relis de temps en temps : l'IA est excellente mais une relecture humaine reste un plus pour la crédibilité.
- Coût indicatif : ~quelques centimes par article.
