#!/usr/bin/env node
/**
 * Nettoyeur de leads Apollo — Weboua
 * ----------------------------------
 * Prend un ou plusieurs exports CSV Apollo (peu importe le format), les fusionne,
 * dédoublonne par email, retire tes propres clients, et sort deux fichiers propres :
 *   - weboua-verifies-pret-a-envoyer.csv  (emails vérifiés → base d'envoi)
 *   - weboua-master-propre.csv            (tout le propre)
 *
 * Usage :
 *   node tools/clean-leads.mjs export1.csv export2.csv ...
 *
 * Formats reconnus automatiquement (par l'entête) :
 *   - Export API complet : id,first_name,last_name,email,email_status,title,organization_name,...
 *   - Export UI Apollo   : First Name,Last Name,Title,Company Name,...,Email,Email Status,...
 *   - Format simplifié   : Nom,Prenom,Title,Compagnie,Email,Tel_entreprise
 *
 * Aucune dépendance externe.
 */
import fs from 'node:fs';
import path from 'node:path';

// Tes clients + Groupe Optim : jamais prospectés.
const SUPPRESS = new Set([
  'groupeoptim.fr', 'optimenergie.fr', 'eden.green', 'arcontrols.fr', 'agescom.fr', 'we-search.fr',
  'monpetitparfait.fr', 'wp-sauvetage.fr', 'ade-solutions.fr', 'parisbeautyacademy.com', 'may-energie.fr',
  'puresalmonfrance.com', 'lettershop.fr', 'lesalondermo.com', 'weboua.com', 'weboua.fr',
]);
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** Parseur CSV minimal mais correct (gère guillemets, virgules et retours ligne). */
function parseCsv(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      if (field !== '' || row.length) { row.push(field); rows.push(row); row = []; field = ''; }
    } else field += c;
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  return rows;
}

const pick = (obj, ...keys) => {
  for (const k of keys) if (obj[k] != null && obj[k] !== '') return String(obj[k]).trim();
  return '';
};

function normalize(obj) {
  return {
    prenom: pick(obj, 'first_name', 'First Name', 'Prenom'),
    nom: pick(obj, 'last_name', 'Last Name', 'Nom'),
    email: pick(obj, 'email', 'Email').toLowerCase(),
    status: pick(obj, 'email_status', 'Email Status'),
    titre: pick(obj, 'title', 'Title'),
    entreprise: pick(obj, 'organization_name', 'Company Name', 'Compagnie'),
    domaine: pick(obj, 'organization_domain', 'Website'),
    ville: pick(obj, 'city', 'City'),
    linkedin: pick(obj, 'linkedin_url', 'Person Linkedin Url'),
  };
}

const files = process.argv.slice(2);
if (!files.length) {
  console.error('Usage : node tools/clean-leads.mjs <export1.csv> [export2.csv ...]');
  process.exit(1);
}

const merged = new Map();
let total = 0, suppressed = 0, invalid = 0;

for (const file of files) {
  const rows = parseCsv(fs.readFileSync(file, 'utf-8'));
  if (!rows.length) continue;
  const header = rows[0];
  for (let i = 1; i < rows.length; i++) {
    total++;
    const obj = {};
    header.forEach((h, j) => (obj[h] = rows[i][j]));
    const r = normalize(obj);
    if (!r.email || !EMAIL_RE.test(r.email)) { invalid++; continue; }
    if (SUPPRESS.has(r.email.split('@')[1])) { suppressed++; continue; }
    if (merged.has(r.email)) {
      const o = merged.get(r.email);
      if (!o.status && r.status) o.status = r.status;
      if (!o.linkedin && r.linkedin) o.linkedin = r.linkedin;
    } else merged.set(r.email, r);
  }
}

const all = [...merged.values()];
const verified = all.filter((r) => r.status.toLowerCase() === 'verified');
const cols = ['prenom', 'nom', 'entreprise', 'titre', 'email', 'status', 'ville', 'domaine', 'linkedin'];
const esc = (s) => (/[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s);
const toCsv = (data) => [cols.join(','), ...data.map((r) => cols.map((c) => esc(r[c] || '')).join(','))].join('\n') + '\n';

fs.writeFileSync('weboua-master-propre.csv', toCsv(all));
fs.writeFileSync('weboua-verifies-pret-a-envoyer.csv', toCsv(verified));

console.log(`Lignes lues            : ${total}`);
console.log(`  emails invalides     : ${invalid}`);
console.log(`  clients supprimés    : ${suppressed}`);
console.log(`UNIQUES nettoyés       : ${all.length}`);
console.log(`  ✅ vérifiés (prêts)   : ${verified.length}`);
console.log(`\n→ weboua-verifies-pret-a-envoyer.csv  (base d'envoi)`);
console.log(`→ weboua-master-propre.csv`);
