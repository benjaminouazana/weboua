import { NextResponse } from 'next/server';
import { z } from 'zod';
import { appendLeadToSheet, emailLeadCopy, type Lead } from '@/lib/leads';
import { addContactToAudience } from '@/lib/newsletter';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  name: z.string().trim().min(2, 'Nom requis').max(120),
  email: z.string().trim().email('Email invalide').max(160),
  businessName: z.string().trim().max(160).optional().or(z.literal('')),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  interest: z.string().trim().max(80).optional().or(z.literal('')),
  budget: z.string().trim().max(40).optional().or(z.literal('')),
  message: z.string().trim().min(5, 'Message trop court').max(4000),
  source: z.string().trim().max(60).default('site'),
  // Honeypot — must stay empty
  company_website: z.string().max(0).optional(),
});

// Naive in-memory rate limit (per server instance) — 5 submissions / 10 min / IP.
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
const MAX = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX;
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Trop de tentatives. Réessayez dans quelques minutes.' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? 'Données invalides.';
    return NextResponse.json({ error: first }, { status: 422 });
  }

  // Honeypot triggered → pretend success, drop silently.
  if (parsed.data.company_website) {
    return NextResponse.json({ ok: true });
  }

  const lead: Lead = {
    name: parsed.data.name,
    email: parsed.data.email,
    businessName: parsed.data.businessName || undefined,
    phone: parsed.data.phone || undefined,
    interest: parsed.data.interest || undefined,
    budget: parsed.data.budget || undefined,
    message: parsed.data.message,
    source: parsed.data.source,
    createdAt: new Date().toISOString(),
  };

  // Persist + notify + inscription newsletter en parallèle ; on ne perd jamais
  // un lead parce qu'un canal a échoué. L'ajout à l'audience est "best effort".
  const results = await Promise.allSettled([
    appendLeadToSheet(lead),
    emailLeadCopy(lead),
    addContactToAudience(lead.email, lead.name),
  ]);
  results.forEach((r) => {
    if (r.status === 'rejected') console.error('[lead] channel failed:', r.reason);
  });

  // On considère l'enregistrement en échec seulement si Sheet ET email ont échoué
  // (l'audience newsletter est secondaire).
  if (results[0].status === 'rejected' && results[1].status === 'rejected') {
    return NextResponse.json(
      { error: "Impossible d'enregistrer votre demande pour le moment. Écrivez-nous directement." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
