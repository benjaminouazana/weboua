'use client';

import { useEffect, useState } from 'react';
import { Icon } from './Icon';

type Status = 'idle' | 'loading' | 'success' | 'error';

type LivreBlancFormProps = {
  /** Slug du livre blanc — sert à tracer la source du lead (lb:<slug>). */
  slug: string;
  /** Chemin du PDF à ouvrir après capture (dans /public). */
  pdfUrl: string;
  /** Titre du livre blanc, injecté dans l'email de notification. */
  title: string;
};

/**
 * Formulaire de capture d'un livre blanc.
 * Capture nom + email (source "lb:<slug>" + campagne éventuelle ?src=),
 * puis révèle le bouton de téléchargement + note newsletter.
 */
export function LivreBlancForm({ slug, pdfUrl, title }: LivreBlancFormProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [campaign, setCampaign] = useState('');

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const src = p.get('src') || p.get('utm_campaign') || p.get('utm_source') || '';
    if (src) setCampaign(src.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 30));
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError('');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          interest: `Livre blanc — ${title}`,
          message: data.message || `Téléchargement du livre blanc « ${title} ».`,
          source: campaign ? `lb:${slug}:${campaign}` : `lb:${slug}`,
        }),
      });
      if (!res.ok) {
        const b = await res.json().catch(() => ({}));
        throw new Error(b.error || 'Une erreur est survenue.');
      }
      setStatus('success');
      // Ouvre le PDF automatiquement.
      window.open(pdfUrl, '_blank', 'noopener');
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
        <h3 className="text-xl">C'est envoyé 🎉</h3>
        <p className="mt-2 text-muted">Votre livre blanc s'ouvre dans un nouvel onglet. Sinon, cliquez ci-dessous.</p>
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5">
          Télécharger le livre blanc
          <Icon name="arrow" className="h-4 w-4" />
        </a>
        <p className="mt-4 text-xs text-muted">
          Vous recevrez aussi nos meilleurs conseils web &amp; SEO par email. Désinscription en 1 clic.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-forest">Prénom *</span>
        <input name="name" required placeholder="Votre prénom" className="lb-input" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-forest">Email professionnel *</span>
        <input name="email" type="email" required placeholder="vous@entreprise.com" className="lb-input" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-forest">Entreprise</span>
        <input name="businessName" placeholder="Nom de votre société" className="lb-input" />
      </label>

      {status === 'error' && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <button type="submit" disabled={status === 'loading'} className="btn-primary w-full disabled:opacity-60">
        {status === 'loading' ? 'Envoi…' : 'Recevoir le livre blanc gratuit'}
        {status !== 'loading' && <Icon name="arrow" className="h-4 w-4" />}
      </button>
      <p className="text-center text-xs text-muted">Gratuit · PDF · Aucune donnée revendue 🔒</p>

      <style jsx>{`
        :global(.lb-input) {
          width: 100%;
          border-radius: 0.875rem;
          border: 1px solid #e4ece8;
          background: #fff;
          padding: 0.7rem 0.95rem;
          font-size: 0.95rem;
          color: #0f1b18;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        :global(.lb-input:focus) {
          outline: none;
          border-color: #58c28e;
          box-shadow: 0 0 0 3px rgba(88, 194, 142, 0.18);
        }
      `}</style>
    </form>
  );
}
