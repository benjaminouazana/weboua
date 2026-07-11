#!/usr/bin/env node
/**
 * Facteur du jeudi — envoie par email le prochain post LinkedIn "perso"
 * de la réserve (content/linkedin/posts-perso.json), puis le marque envoyé.
 *
 * Lancé par GitHub Actions chaque jeudi. Variables :
 *   RESEND_API_KEY (obligatoire)
 *   NOTIFY_EMAIL   (défaut: contact@weboua.com)
 */

import fs from 'node:fs';
import path from 'node:path';

const FILE = path.join(process.cwd(), 'content', 'linkedin', 'posts-perso.json');
const API_KEY = process.env.RESEND_API_KEY;
const TO = process.env.NOTIFY_EMAIL || 'contact@weboua.com';
const FROM = process.env.FROM_EMAIL || 'Weboua Bot <leads@weboua.com>';

function fail(msg) {
  console.error(`❌ ${msg}`);
  process.exit(1);
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

async function sendEmail(subject, html) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify({ from: FROM, to: TO, subject, html }),
  });
  if (!res.ok) fail(`Envoi email échoué (${res.status}) : ${(await res.text()).slice(0, 300)}`);
}

async function main() {
  if (!API_KEY) fail('RESEND_API_KEY manquante (secrets GitHub).');

  const posts = JSON.parse(fs.readFileSync(FILE, 'utf-8'));
  const post = posts.find((p) => p.status === 'todo');

  if (!post) {
    await sendEmail(
      '📭 Réserve de posts perso épuisée',
      `<div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:auto">
        <h2 style="color:#0C3A2E">📭 Plus de posts perso en réserve</h2>
        <p style="color:#5B6B66">Les 10 posts de démarrage ont tous été envoyés. Demande à Claude de t'en
        générer une nouvelle fournée (10 posts = ~10 semaines), ou ajoute les tiens dans
        <code>content/linkedin/posts-perso.json</code>.</p>
      </div>`,
    );
    console.log('📭 Réserve vide — email de rappel envoyé.');
    return;
  }

  const html = `
  <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:auto">
    <h2 style="color:#0C3A2E">👤 Ton post perso du jeudi</h2>
    <p style="color:#5B6B66">Post ${post.id}/10 — <strong>${esc(post.label)}</strong>.
    Copie, retouche la première ligne à ta sauce, publie. Pas de lien à mettre pour celui-ci.</p>
    <div style="background:#F6FAF8;border:1px solid #E4ECE8;border-radius:12px;padding:18px;white-space:pre-wrap;color:#0F1B18;font-size:15px;line-height:1.5">${esc(post.text)}</div>
    <p style="color:#8aa39b;font-size:12px;margin-top:14px">Rappel : meilleur créneau 8h-10h · un détail vrai à toi > tout le reste · réserve restante : ${posts.filter((p) => p.status === 'todo').length - 1} post(s).</p>
  </div>`;

  await sendEmail(`👤 Post perso du jeudi — ${post.label}`, html);

  post.status = 'done';
  post.sentAt = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(FILE, JSON.stringify(posts, null, 2) + '\n', 'utf-8');
  console.log(`📨 Post perso #${post.id} envoyé à ${TO}`);
}

main().catch((e) => fail(e.stack || e.message));
