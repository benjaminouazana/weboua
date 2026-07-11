#!/usr/bin/env node
/**
 * Agent de publication d'articles SEO — Weboua
 * --------------------------------------------
 * Lit la file d'attente de sujets (content/topics.json), prend le prochain
 * sujet "todo", demande à l'IA de rédiger un article SEO optimisé, écrit le
 * fichier .mdx dans content/blog/, puis marque le sujet comme publié.
 *
 * Lancé par GitHub Actions 2x/semaine. Variables d'environnement :
 *   ANTHROPIC_API_KEY  (obligatoire) — clé API Claude
 *   ARTICLE_MODEL      (optionnel)  — id du modèle, défaut: claude-sonnet-4-6
 *
 * Aucune dépendance externe : utilise fetch natif (Node 18+).
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const TOPICS_FILE = path.join(ROOT, 'content', 'topics.json');
const BLOG_DIR = path.join(ROOT, 'content', 'blog');
const MODEL = process.env.ARTICLE_MODEL || 'claude-sonnet-4-6';
const API_KEY = process.env.ANTHROPIC_API_KEY;

const INTERNAL_LINKS = {
  '/audit-seo-performance': 'audit SEO gratuit',
  '/creation-de-sites-internet': 'création de site internet',
  '/seo-referencement-naturel': 'référencement naturel',
  '/leads-b2b': 'génération de leads B2B',
  '/campagnes-email': 'campagnes email',
  '/contact': 'contact',
};

function fail(msg) {
  console.error(`❌ ${msg}`);
  process.exit(1);
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function slugify(str) {
  return str
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function buildPrompt(topic) {
  const links = Object.entries(INTERNAL_LINKS)
    .map(([href, label]) => `- [${label}](${href})`)
    .join('\n');

  return `Tu es le rédacteur SEO en chef de Weboua, une agence digitale française (création de sites, SEO, génération de leads B2B, automatisations). Tu écris pour des décideurs de grandes entreprises françaises (dirigeants, directeurs marketing, DAF). Ton style : expert, direct, orienté résultats, sans jargon inutile. Pas de "blabla", des conseils concrets.

Règle absolue : ne dénigre JAMAIS WordPress ni aucune technologie. Weboua accompagne aussi des clients WordPress (audit, réparation, maintenance, optimisation). Sur les sujets WordPress, sois utile et bienveillant : aide le lecteur à résoudre son problème, et positionne Weboua comme l'expert capable de l'aider — quelle que soit sa technologie.

Rédige un article de blog complet et optimisé SEO sur le sujet suivant :
- Titre indicatif : "${topic.title}"
- Mot-clé principal à cibler : "${topic.keyword}"
- Catégorie : "${topic.category}"

Règles SEO impératives :
1. Le mot-clé principal doit apparaître dans le titre, la méta-description, le premier paragraphe et au moins un sous-titre (H2).
2. 1000 à 1700 mots. Structure claire en sous-titres "## " (H2) et "### " (H3). NE PAS mettre de titre H1 (#) — il est généré automatiquement.
3. Écris pour l'humain d'abord : utile, précis, crédible. Pas de bourrage de mots-clés.
4. Intègre 2 à 3 liens internes naturels parmi cette liste (format markdown) :
${links}
5. Termine par un appel à l'action vers /contact ou /audit-seo-performance.
6. Markdown uniquement (listes, gras, citations >). Pas d'images.

En plus de l'article, rédige un post LinkedIn qui en fait la promotion :
- 100 à 160 mots, première ligne = accroche percutante (le "hook")
- Ton direct et expert, phrases courtes, sauts de ligne fréquents (style LinkedIn)
- Termine par une question ou un appel à lire l'article, puis 3 hashtags maximum
- N'inclus PAS le lien dans le texte (il sera ajouté automatiquement)

Réponds STRICTEMENT avec un objet JSON valide (et rien d'autre, pas de texte autour, pas de balises de code) au format :
{
  "title": "Titre final optimisé, max 60 caractères, contenant le mot-clé",
  "description": "Méta-description vendeuse de 140 à 160 caractères, contenant le mot-clé",
  "tags": ["tag1", "tag2", "tag3"],
  "body": "Le corps de l'article en Markdown, commençant directement par un paragraphe d'introduction puis des sections ## ...",
  "linkedin": "Le post LinkedIn complet"
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
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    fail(`API Claude ${res.status} : ${text.slice(0, 500)}`);
  }

  const data = await res.json();
  const text = data?.content?.map((b) => b.text || '').join('') ?? '';
  if (!text) fail('Réponse vide de l\'API.');
  return text;
}

function extractJson(text) {
  // Retire d'éventuelles balises de code, puis isole le premier objet JSON.
  const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1) fail('Aucun JSON trouvé dans la réponse.');
  try {
    return JSON.parse(cleaned.slice(start, end + 1));
  } catch (e) {
    fail(`JSON invalide : ${e.message}`);
  }
}

/**
 * Envoie le post LinkedIn prêt à copier par email (via Resend).
 * Nécessite RESEND_API_KEY dans les secrets GitHub — sinon, étape ignorée.
 */
async function emailLinkedInPost({ title, slug, linkedin }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !linkedin) {
    if (!apiKey) console.warn('⚠️  RESEND_API_KEY absente — email non envoyé (le post reste sur GitHub).');
    return;
  }
  const to = process.env.NOTIFY_EMAIL || 'contact@weboua.com';
  const articleUrl = `https://weboua.com/blog/${slug}`;
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const html = `
  <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:auto">
    <h2 style="color:#0C3A2E">📝 Ton post LinkedIn est prêt</h2>
    <p style="color:#5B6B66">L'article « <strong>${esc(title)}</strong> » vient d'être publié sur le blog.
    Voici le post à copier-coller (pense à retoucher la première ligne à ta sauce 😉) :</p>
    <div style="background:#F6FAF8;border:1px solid #E4ECE8;border-radius:12px;padding:18px;white-space:pre-wrap;color:#0F1B18;font-size:15px;line-height:1.5">${esc(linkedin)}</div>
    <p style="margin-top:16px;color:#5B6B66"><strong>À mettre en 1er commentaire</strong> (pas dans le post) :</p>
    <p style="background:#F6FAF8;border-radius:8px;padding:10px;color:#1F8A6B">👉 ${articleUrl}</p>
    <p style="color:#8aa39b;font-size:12px">Rappel : copie le post → colle sur LinkedIn → publie → colle le lien en commentaire. 5 minutes.</p>
  </div>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from: process.env.FROM_EMAIL || 'Weboua Bot <leads@weboua.com>',
      to,
      subject: `📝 Post LinkedIn prêt — ${title}`,
      html,
    }),
  });
  if (!res.ok) {
    console.warn(`⚠️  Envoi email échoué (${res.status}) — le post reste disponible sur GitHub.`);
  } else {
    console.log(`📨 Post LinkedIn envoyé par email à ${to}`);
  }
}

function frontmatter(fields) {
  const esc = (s) => String(s).replace(/"/g, '\\"');
  return [
    '---',
    `title: "${esc(fields.title)}"`,
    `description: "${esc(fields.description)}"`,
    `date: "${fields.date}"`,
    `author: "Weboua"`,
    `category: "${esc(fields.category)}"`,
    `tags: [${(fields.tags || []).map((t) => `"${esc(t)}"`).join(', ')}]`,
    `draft: false`,
    '---',
    '',
  ].join('\n');
}

async function main() {
  if (!API_KEY) fail('ANTHROPIC_API_KEY manquante (ajoute-la dans les secrets GitHub).');

  const topics = JSON.parse(fs.readFileSync(TOPICS_FILE, 'utf-8'));
  const topic = topics.find((t) => t.status === 'todo');
  if (!topic) {
    console.log('✅ Aucun sujet "todo" restant. Ajoute des sujets dans content/topics.json.');
    process.exit(0);
  }

  console.log(`✍️  Rédaction : "${topic.title}" (modèle ${MODEL})`);
  const raw = await callClaude(buildPrompt(topic));
  const article = extractJson(raw);

  const slug = topic.slug || slugify(article.title);
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (fs.existsSync(file)) fail(`L'article existe déjà : ${slug}.mdx`);

  fs.mkdirSync(BLOG_DIR, { recursive: true });
  const content =
    frontmatter({
      title: article.title,
      description: article.description,
      date: todayISO(),
      category: topic.category,
      tags: article.tags,
    }) + String(article.body).trim() + '\n';

  fs.writeFileSync(file, content, 'utf-8');

  // Post LinkedIn prêt à copier-coller (généré avec l'article).
  if (article.linkedin) {
    const liDir = path.join(ROOT, 'content', 'linkedin');
    fs.mkdirSync(liDir, { recursive: true });
    const liPost = `${String(article.linkedin).trim()}\n\n👉 https://weboua.com/blog/${slug}\n`;
    fs.writeFileSync(path.join(liDir, `${slug}.md`), liPost, 'utf-8');
  }

  topic.status = 'done';
  topic.publishedAt = todayISO();
  topic.publishedSlug = slug;
  fs.writeFileSync(TOPICS_FILE, JSON.stringify(topics, null, 2) + '\n', 'utf-8');

  // Notification email avec le post LinkedIn prêt à copier.
  await emailLinkedInPost({ title: article.title, slug, linkedin: article.linkedin });

  console.log(`✅ Article créé : content/blog/${slug}.mdx`);
  // Expose le slug pour le workflow (message de commit)
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `slug=${slug}\ntitle=${article.title}\n`);
  }
}

main().catch((e) => fail(e.stack || e.message));
