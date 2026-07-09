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

  return `Tu es le rédacteur SEO en chef de Weboua, une agence digitale française (création de sites, SEO, génération de leads B2B). Tu écris pour des décideurs de grandes entreprises françaises (dirigeants, directeurs marketing, DAF). Ton style : expert, direct, orienté résultats, sans jargon inutile. Pas de "blabla", des conseils concrets.

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

Réponds STRICTEMENT avec un objet JSON valide (et rien d'autre, pas de texte autour, pas de balises de code) au format :
{
  "title": "Titre final optimisé, max 60 caractères, contenant le mot-clé",
  "description": "Méta-description vendeuse de 140 à 160 caractères, contenant le mot-clé",
  "tags": ["tag1", "tag2", "tag3"],
  "body": "Le corps de l'article en Markdown, commençant directement par un paragraphe d'introduction puis des sections ## ..."
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

  topic.status = 'done';
  topic.publishedAt = todayISO();
  topic.publishedSlug = slug;
  fs.writeFileSync(TOPICS_FILE, JSON.stringify(topics, null, 2) + '\n', 'utf-8');

  console.log(`✅ Article créé : content/blog/${slug}.mdx`);
  // Expose le slug pour le workflow (message de commit)
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `slug=${slug}\ntitle=${article.title}\n`);
  }
}

main().catch((e) => fail(e.stack || e.message));
