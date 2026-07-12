'use client';

import { useEffect, useState } from 'react';
import { Icon } from './Icon';

type Status = 'idle' | 'loading' | 'success' | 'error';

const budgets = ['< 2 000 €', '2 000 – 5 000 €', '5 000 – 15 000 €', '15 000 € +', 'Je ne sais pas'];
const interests = [
  'Création de site',
  'SEO / Référencement',
  'Leads B2B',
  'Campagnes email',
  'Hébergement / serveurs',
  'Audit gratuit',
];

export function LeadForm({ source = 'site', compact = false }: { source?: string; compact?: boolean }) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string>('');
  // Campagne d'origine (ex: ?src=ecommerce depuis un cold email) — tracée avec le lead.
  const [campaign, setCampaign] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const src = params.get('src') || params.get('utm_campaign') || params.get('utm_source') || '';
    if (src) setCampaign(src.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 30));
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError('');

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (String(data.phone || '').trim().length < 6) {
      setStatus('error');
      setError('Merci d’indiquer un numéro de téléphone.');
      return;
    }

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: campaign ? `${source}:${campaign}` : source }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Une erreur est survenue.');
      }
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-3xl border border-mint/40 bg-mint/10 p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald text-white">
          <Icon name="check" className="h-6 w-6" />
        </div>
        <h3 className="text-xl">Message bien reçu 🎉</h3>
        <p className="mt-2 text-muted">
          Merci ! On revient vers vous sous 24 h ouvrées avec une première analyse de votre projet.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      {/* Honeypot anti-spam */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nom complet *">
          <input name="name" required placeholder="Jean Dupont" className="input" />
        </Field>
        <Field label="Email professionnel *">
          <input name="email" type="email" required placeholder="jean@entreprise.com" className="input" />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Entreprise">
          <input name="businessName" placeholder="Nom de la société" className="input" />
        </Field>
        <Field label="Téléphone *">
          <input name="phone" type="tel" required placeholder="06 12 34 56 78" className="input" />
        </Field>
      </div>

      {!compact && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Votre besoin">
            <select name="interest" className="input" defaultValue="">
              <option value="" disabled>
                Sélectionnez…
              </option>
              {interests.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </Field>
          <Field label="Budget estimé">
            <select name="budget" className="input" defaultValue="">
              <option value="" disabled>
                Sélectionnez…
              </option>
              {budgets.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </Field>
        </div>
      )}

      <Field label="Votre projet en quelques mots *">
        <textarea
          name="message"
          required
          rows={compact ? 3 : 4}
          placeholder="Décrivez votre objectif, votre activité, vos délais…"
          className="input resize-none"
        />
      </Field>

      {status === 'error' && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <button type="submit" disabled={status === 'loading'} className="btn-primary w-full disabled:opacity-60">
        {status === 'loading' ? 'Envoi…' : 'Recevoir mon analyse gratuite'}
        {status !== 'loading' && <Icon name="arrow" className="h-4 w-4" />}
      </button>
      <p className="text-center text-xs text-muted">
        Réponse sous 24 h ouvrées. Aucune donnée revendue. 🔒
      </p>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          border-radius: 0.875rem;
          border: 1px solid #e4ece8;
          background: #fff;
          padding: 0.7rem 0.95rem;
          font-size: 0.95rem;
          color: #0f1b18;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        :global(.input:focus) {
          outline: none;
          border-color: #58c28e;
          box-shadow: 0 0 0 3px rgba(88, 194, 142, 0.18);
        }
      `}</style>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-forest">{label}</span>
      {children}
    </label>
  );
}
