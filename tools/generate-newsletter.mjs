#!/usr/bin/env node
/**
 * Agent newsletter — Weboua
 * -------------------------
 * Rédige une newsletter éditoriale à partir des derniers articles du blog,
 * la met en page (HTML de marque), puis crée une "broadcast" Resend adressée
 * à l'audience (la liste alimentée par les téléchargements de livres blancs).
 *
 * Par sécurité, la broadcast est créée en BROUILLON : tu la relis dans Resend
 * puis tu cliques « Send ». Pour un envoi 100 % automatique, mets
 * NEWSLETTER_AUTOSEND=true (l'agent enverra directement).
 *
 * Lancé par GitHub Actions (1ᵉʳ et 15 du mois). Variables d'environnement :
 *   ANTHROPIC_API_KEY   (obligatoire) — clé API Claude
 *   RESEND_API_KEY      (obligatoire) — clé API Resend
 *   RESEND_AUDIENCE_ID  (obligatoire) — id de l'audience newsletter
 *   NEWSLETTER_FROM     (optionnel)  — expéditeur, défaut "Weboua <hello@weboua.com>"
 *   NEWSLETTER_MODEL    (optionnel)  — id du modèle, défaut claude-sonnet-4-6
 *   NEWSLETTER_AUTOSEND (optionnel)  — "true" pour envoyer sans relecture
 *   NOTIFY_EMAIL        (optionnel)  — où prévenir que le brouillon est prêt
 *
 * Aucune dépendance externe : fetch natif (Node 18+).
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, 'content', 'blog');
const MODEL = process.env.NEWSLETTER_MODEL || 'claude-sonnet-4-6';
const API_KEY = process.env.ANTHROPIC_API_KEY;
const RESEND_KEY = process.env.RESEND_API_KEY;
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;
const FROM = process.env.NEWSLETTER_FROM || 'Weboua <hello@weboua.com>';
const SITE = 'https://weboua.com';

function fail(msg) {
  console.error(`❌ ${msg}`);
  process.exit(1);
}

const esc = (s) =>
  String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Lit les articles du blog, renvoie les plus récents (frontmatter simple). */
function recentPosts(limit = 4) {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const posts = [];
  for (const file of fs.readdirSync(BLOG_DIR)) {
    if (!file.endsWith('.mdx')) continue;
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    const fm = raw.match(/^---\n([\s\S]*?)\n---/);
    if (!fm) continue;
    const get = (k) => (fm[1].match(new RegExp(`^${k}:\\s*"?(.*?)"?\\s*$`, 'm')) || [])[1] || '';
    if (get('draft') === 'true') continue;
    posts.push({
      slug: file.replace(/\.mdx$/, ''),
      title: get('title'),
      description: get('description'),
      date: get('date'),
    });
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, limit);
}

function buildPrompt(posts) {
  const list = posts.map((p) => `- "${p.title}" — ${p.description}`).join('\n');
  return `Tu es Benjamin, fondateur de Weboua (agence digitale française : sites internet, SEO, génération de leads B2B, automatisations). Tu écris la newsletter de l'agence pour des dirigeants et directeurs de PME/ETI françaises. Ton : humain, direct, expert, jamais corporate. Tu apportes de la valeur avant de vendre.

Règle absolue : ne dénigre JAMAIS WordPress ni aucune technologie.

Voici les derniers articles publiés sur le blog (tu peux t'en inspirer mais tu n'es pas obligé de tous les citer) :
${list}

Rédige le contenu éditorial d'une newsletter courte. Réponds STRICTEMENT avec un objet JSON valide (rien d'autre, pas de balises de code) :
{
  "subject": "Objet de l'email, court et donnant envie d'ouvrir, max 55 caractères, sans emoji racoleur",
  "preheader": "Phrase d'aperçu affichée après l'objet dans la boîte mail, max 90 caractères",
  "intro": "2 à 3 phrases d'accroche, ton personnel (je/vous), qui donnent le fil rouge de cette édition",
  "tip": "Un conseil express, concret et actionnable en 2-3 phrases, que le lecteur peut appliquer aujourd'hui",
  "signoff": "Une phrase de clôture chaleureuse signée Benjamin"
}`;
}

async function callClaude(prompt) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({ model: MODEL, max_tokens: 1500, messages: [{ role: 'user', content: prompt }] }),
  });
  if (!res.ok) fail(`API Claude ${res.status} : ${(await res.text()).slice(0, 500)}`);
  const data = await res.json();
  const text = data?.content?.map((b) => b.text || '').join('') ?? '';
  if (!text) fail('Réponse vide de l\'API Claude.');
  const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
  const s = cleaned.indexOf('{');
  const e = cleaned.lastIndexOf('}');
  if (s === -1 || e === -1) fail('Aucun JSON dans la réponse Claude.');
  return JSON.parse(cleaned.slice(s, e + 1));
}

/** Met en page la newsletter (HTML inline, compatible boîtes mail). */
function renderHtml(nl, posts) {
  const articles = posts
    .map(
      (p) => `
      <tr><td style="padding:10px 0;border-bottom:1px solid #E4ECE8">
        <a href="${SITE}/blog/${p.slug}?src=newsletter" style="color:#0C3A2E;font-size:16px;font-weight:700;text-decoration:none">${esc(p.title)}</a>
        <div style="color:#5B6B66;font-size:14px;line-height:1.5;margin-top:4px">${esc(p.description)}</div>
      </td></tr>`,
    )
    .join('');

  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;background:#F6FAF8;font-family:Helvetica,Arial,sans-serif;color:#0F1B18">
  <span style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(nl.preheader)}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6FAF8;padding:24px 0">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:16px;overflow:hidden">
        <tr><td style="background:linear-gradient(135deg,#0C3A2E,#1F8A6B);padding:26px 32px">
          <span style="color:#fff;font-size:24px;font-weight:800;letter-spacing:-0.5px">web<span style="color:#86D9AF">◍</span>ua</span>
          <div style="color:rgba(255,255,255,0.8);font-size:13px;margin-top:4px">La lettre des dirigeants qui veulent un web qui rapporte</div>
        </td></tr>
        <tr><td style="padding:28px 32px 8px">
          <p style="font-size:16px;line-height:1.6;color:#0F1B18;margin:0 0 18px">${esc(nl.intro)}</p>
        </td></tr>
        <tr><td style="padding:0 32px">
          <div style="font-size:13px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:#1F8A6B">📖 À lire sur le blog</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:6px">${articles}</table>
        </td></tr>
        <tr><td style="padding:22px 32px 0">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EAF8F1;border-radius:14px">
            <tr><td style="padding:18px 20px">
              <div style="font-size:13px;font-weight:800;color:#15614E">💡 Le conseil express</div>
              <p style="font-size:15px;line-height:1.55;color:#0C3A2E;margin:8px 0 0">${esc(nl.tip)}</p>
            </td></tr>
          </table>
        </td></tr>
        <tr><td align="center" style="padding:26px 32px 8px">
          <a href="${SITE}/ressources?src=newsletter" style="display:inline-block;background:#1F8A6B;color:#fff;font-weight:700;font-size:15px;text-decoration:none;padding:13px 28px;border-radius:999px">📚 Nos livres blancs gratuits</a>
        </td></tr>
        <tr><td style="padding:18px 32px 4px">
          <p style="font-size:15px;line-height:1.6;color:#0F1B18;margin:0">${esc(nl.signoff)}</p>
          <p style="font-size:15px;color:#0C3A2E;font-weight:700;margin:6px 0 0">Benjamin — Weboua</p>
        </td></tr>
        <tr><td style="padding:22px 32px 28px">
          <div style="border-top:1px solid #E4ECE8;padding-top:14px;font-size:12px;color:#8aa39b;line-height:1.6">
            Vous recevez cet email car vous avez téléchargé un guide Weboua ou pris contact avec nous.<br>
            <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#8aa39b;text-decoration:underline">Se désinscrire</a> · <a href="${SITE}" style="color:#8aa39b;text-decoration:underline">weboua.com</a>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

async function resend(pathname, body) {
  const res = await fetch(`https://api.resend.com${pathname}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${RESEND_KEY}` },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) fail(`Resend ${pathname} → ${res.status} : ${JSON.stringify(json).slice(0, 400)}`);
  return json;
}

async function notifyDraftReady(subject, broadcastId) {
  const to = process.env.NOTIFY_EMAIL || 'contact@weboua.com';
  const html = `<div style="font-family:Helvetica,Arial,sans-serif;max-width:560px;margin:auto">
    <h2 style="color:#0C3A2E">📬 Ta newsletter est prête (brouillon)</h2>
    <p style="color:#5B6B66">Objet : <strong>${esc(subject)}</strong></p>
    <p style="color:#5B6B66">Le brouillon a été créé dans Resend. Relis-le et clique « Send » quand tu es prêt :</p>
    <p><a href="https://resend.com/broadcasts/${broadcastId}" style="color:#1F8A6B">Ouvrir le brouillon dans Resend →</a></p>
    <p style="color:#8aa39b;font-size:12px">Astuce : pour un envoi automatique à l'avenir, mets NEWSLETTER_AUTOSEND=true.</p>
  </div>`;
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${RESEND_KEY}` },
    body: JSON.stringify({ from: FROM, to, subject: `📬 Newsletter prête — ${subject}`, html }),
  }).catch(() => {});
}

async function main() {
  // Newsletter en veille tant qu'elle n'est pas configurée : on s'arrête SANS erreur
  // (pas d'email d'échec). Dès que les 3 variables sont là, le robot se réactive seul.
  const skip = (v) => {
    console.log(`ℹ️  Newsletter en pause : ${v} non configuré. Aucune erreur — ajoute le secret pour l'activer.`);
    process.exit(0);
  };
  if (!API_KEY) skip('ANTHROPIC_API_KEY');
  if (!RESEND_KEY) skip('RESEND_API_KEY');
  if (!AUDIENCE_ID) skip('RESEND_AUDIENCE_ID');

  const posts = recentPosts(4);
  if (!posts.length) fail('Aucun article publié dans content/blog — rien à mettre en newsletter.');

  console.log(`✍️  Rédaction de la newsletter (modèle ${MODEL})…`);
  const nl = await callClaude(buildPrompt(posts));
  const html = renderHtml(nl, posts);

  console.log(`📝 Création de la broadcast Resend : « ${nl.subject} »`);
  const broadcast = await resend('/broadcasts', {
    audience_id: AUDIENCE_ID,
    from: FROM,
    subject: nl.subject,
    html,
    name: `Newsletter — ${nl.subject}`,
  });

  const autosend = process.env.NEWSLETTER_AUTOSEND === 'true';
  if (autosend) {
    await resend(`/broadcasts/${broadcast.id}/send`, {});
    console.log(`🚀 Newsletter ENVOYÉE à l'audience (${broadcast.id}).`);
  } else {
    await notifyDraftReady(nl.subject, broadcast.id);
    console.log(`✅ Brouillon prêt dans Resend (${broadcast.id}). Relis puis envoie depuis Resend.`);
  }
}

main().catch((e) => fail(e.stack || e.message));
