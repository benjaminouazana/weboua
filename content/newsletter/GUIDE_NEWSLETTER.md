# Newsletter Weboua — mode d'emploi

La newsletter est le 2ᵉ étage du tunnel : elle **réchauffe** les prospects qui ont téléchargé
un livre blanc mais ne sont pas encore prêts à acheter.

```
Cold email → livre blanc (aimant) → formulaire → lead + inscription auto à l'audience → newsletter
```

## Comment ça marche

1. **Chaque lead entre tout seul dans la liste.** Dès qu'un prospect télécharge un livre blanc
   (ou remplit un formulaire), son email est ajouté à l'**audience Resend** — voir `lib/newsletter.ts`,
   branché sur `/api/lead`. Zéro action manuelle.
2. **Le robot rédige la newsletter** tous les 1ᵉʳ et 15 du mois (`tools/generate-newsletter.mjs`,
   déclenché par `.github/workflows/newsletter.yml`). Il s'appuie sur les derniers articles du blog.
3. **Tu gardes la main.** Par défaut la newsletter est créée en **brouillon** dans Resend et tu reçois
   un email « brouillon prêt ». Tu relis, tu cliques *Send*. (Pour automatiser à 100 %, voir plus bas.)

## Réglage initial (une seule fois)

1. Dans **Resend → Audiences**, crée une audience (ex. « Newsletter Weboua »). Copie son **Audience ID**.
2. Ajoute les secrets/variables :

| Où | Nom | Valeur |
|----|-----|--------|
| Vercel (Environment Variables) | `RESEND_AUDIENCE_ID` | l'id de l'audience |
| GitHub (Secrets) | `RESEND_AUDIENCE_ID` | le même id |
| GitHub (Variables) | `NEWSLETTER_FROM` | ex. `Benjamin de Weboua <hello@weboua.com>` *(domaine vérifié)* |
| GitHub (Variables) | `NOTIFY_EMAIL` | ton email pour l'alerte « brouillon prêt » |

> `RESEND_API_KEY` et `ANTHROPIC_API_KEY` existent déjà (partagés avec les leads et l'agent articles).

## Passer en envoi 100 % automatique

Quand tu es en confiance, ajoute la **variable GitHub** `NEWSLETTER_AUTOSEND = true`.
Le robot enverra alors directement, sans brouillon.

## Bon à savoir

- Le lien de désinscription est géré par Resend (`{{{RESEND_UNSUBSCRIBE_URL}}}` dans le template) — conforme RGPD.
- Le domaine d'envoi doit être **vérifié dans Resend** (SPF/DKIM) pour la délivrabilité.
- Fréquence : 2×/mois par défaut. Modifiable dans le `cron` du workflow.
