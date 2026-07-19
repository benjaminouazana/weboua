# Le système d'acquisition Weboua — récap complet

Objectif : transformer des dirigeants qui ne te connaissent pas en clients, de façon **prévisible et
automatisée**. Voici les 4 blocs, comment ils s'emboîtent, ce qui tourne tout seul, et ce que tu fais toi.

---

## 🗺️ Vue d'ensemble : le tunnel

```
   SORTANT (tu vas les chercher)                 ENTRANT (ils viennent)
   ┌─────────────────────────────┐
   │  LinkedIn manuel (gratuit)   │
   │  + Cold email (plus tard)    │
   └──────────────┬──────────────┘
                  │  clic
                  ▼
        ┌───────────────────────┐
        │   LIVRE BLANC (aimant) │  ← la raison de lever la main
        │   /ressources/...      │
        └──────────┬────────────┘
                   │  formulaire
                   ▼
     ┌─────────────────────────────────┐
     │  CAPTURE : prénom + email + TÉL  │ → Google Sheet + email de notif + audience newsletter
     └──────────┬───────────────┬──────┘
                │               │
        ┌───────▼──────┐  ┌─────▼───────────┐
        │ Calendly      │  │ TU rappelles    │
        │ (il réserve)  │  │ sous 48 h       │
        └───────┬──────┘  └─────┬───────────┘
                │               │
                ▼               ▼
              RENDEZ-VOUS  →  CLIENT
                   ▲
                   │  (les pas-prêts)
        ┌──────────┴───────────┐
        │  NEWSLETTER (auto)    │  ← réchauffe pendant des mois, ramène de l'inbound
        └──────────────────────┘
```

**La règle d'or :** 90 % des prospects ne sont pas prêts aujourd'hui. Le sortant capte les 10 % chauds ;
la newsletter transforme les 90 % « pas maintenant » en clients plus tard. C'est ça, « des clients de partout ».

---

## 1️⃣ Site + 4 livres blancs + bibliothèque /ressources

**Le site** (weboua.com) : Next.js, rapide, SEO, codé sur-mesure. Pages services, offres, nos succès, blog, à propos.

**La bibliothèque `/ressources`** : chaque livre blanc a sa page dédiée avec une URL propre. Scalable :
pour en ajouter un, tu déposes le PDF + une couverture et tu ajoutes une ligne dans `lib/livres-blancs.ts`.

**Les 4 livres blancs (aimants), chacun aligné sur un besoin :**
| Livre blanc | URL | Sert à attaquer |
|---|---|---|
| Refaire son site en 2026 | /ressources/refaire-son-site-en-2026 | les sites datés |
| Visible sur Google ET ChatGPT | /ressources/visible-google-et-chatgpt-2026 | la visibilité / SEO |
| 10 tâches à automatiser | /ressources/10-taches-a-automatiser | le gain de temps |
| Le rendez-vous qualifié | /ressources/rendez-vous-qualifies-b2b | la prospection B2B |

Chaque PDF fait 4 pages, coloré, avec un CTA vers un audit gratuit. **Discrétion** : aucun nom de client affiché.

---

## 2️⃣ Formulaires : téléphone obligatoire + bouton Calendly

- **Téléphone obligatoire** sur le formulaire de contact ET sur tous les formulaires de livres blancs
  → tu peux rappeler chaque lead (l'action la plus rentable du système).
- **Bouton « Réserver un appel gratuit »** (Calendly `ben-weboua/30min`) sur l'écran de confirmation après
  téléchargement + après le formulaire de contact → les plus chauds réservent seuls.
- Chaque lead atterrit **en 3 endroits** : Google Sheet (avec la source, ex. `lb:...:linkedin`), un email de
  notification, et l'audience de la newsletter.

---

## 3️⃣ Blog auto + newsletter auto

**Blog (robot rédacteur SEO)** — `tools/generate-article.mjs` :
- Tourne **2×/semaine** (mardi + vendredi, GitHub Actions).
- Rédige un article SEO complet + un post LinkedIn, publie sur le blog, t'envoie le post LinkedIn par email.
- File de sujets dans `content/topics.json`.

**Newsletter (robot + Resend)** — `tools/generate-newsletter.mjs` :
- Tourne **le 1er et le 15 du mois**.
- Rédige la newsletter à partir de tes derniers articles, la prépare en **brouillon** dans Resend (tu relis, tu envoies).
- **Chaque téléchargement de livre blanc inscrit automatiquement le lead** dans l'audience.
- ⚙️ *À configurer une fois :* créer une audience dans Resend et coller son `RESEND_AUDIENCE_ID`
  (voir `content/newsletter/GUIDE_NEWSLETTER.md`).

---

## 4️⃣ Data + LinkedIn + cold email

**La data (nettoyée par toi + moi)** :
- **56 424** contacts uniques, **46 898 emails vérifiés**, 100 % pro, tes clients retirés, dédupliqués.
- **46 984** ont un profil LinkedIn (83 %).
- Fichiers : `weboua-verifies-pret-a-envoyer.csv`, `weboua-master-propre.csv`, niche maintenance (499).
- Script `tools/clean-leads.mjs` : tu le relances sur n'importe quel futur export Apollo → il nettoie tout seul.

**LinkedIn (ton canal sortant gratuit, à lancer)** — `content/linkedin/PROSPECTION_LINKEDIN.md` :
- 46 984 contacts triés par priorité (secteurs où tu as des références en premier).
- Séquence : connexion → message soft → livre blanc → CTA appel.
- Rythme : **20-25 connexions/jour**. Jamais de nom de client dans les messages.

**Cold email (prêt, pour plus tard)** — `content/cold-emails/` :
- 3 séquences multicanales rédigées (site / gagner du temps / rendez-vous), tracées par livre blanc.
- Se lance quand tu auras des boîtes mail dédiées (~12-46 €/mois). Pas nécessaire pour démarrer.

---

## ✅ En ligne / ⚙️ à configurer

| Élément | État |
|---|---|
| Site + /ressources + 4 livres blancs | ✅ en ligne |
| Téléphone obligatoire + Calendly | ✅ en ligne |
| Blog auto (2×/sem) | ✅ actif (clés API dans GitHub) |
| Newsletter auto | ⚙️ à activer : créer l'audience Resend + `RESEND_AUDIENCE_ID` |
| Data + fichiers LinkedIn/cold email | ✅ prêts (sur ton ordi) |
| Prospection LinkedIn | ▶️ à LANCER (c'est toi) |

## 💶 Coûts
- **Aujourd'hui : 0 €** (LinkedIn manuel + newsletter Resend gratuite).
- **Plus tard (optionnel) :** cold email = ~12 €/mois (Apollo + 2 boîtes) à ~46 €/mois (Emelia).

## 📅 Ta routine (le seul truc qui reste = la régularité)
- **Chaque jour :** 20 connexions LinkedIn (Priorité 1 d'abord) + répondre aux réponses sous 24 h + rappeler les nouveaux leads.
- **Automatique (tu ne fais rien) :** articles de blog, inscription newsletter, capture des leads.
- **2×/mois :** relire et envoyer la newsletter préparée par le robot.

## 🎯 La seule chose entre toi et tes premiers clients
Lancer tes 20 connexions LinkedIn par jour. Tout le reste est prêt.
