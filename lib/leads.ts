import { google } from 'googleapis';
import { Resend } from 'resend';
import { site } from './site';

export type Lead = {
  name: string;
  email: string;
  businessName?: string;
  phone?: string;
  interest?: string;
  budget?: string;
  message: string;
  source: string;
  createdAt: string;
};

/**
 * Append a lead as a row in the configured Google Sheet.
 * Requires GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY and GOOGLE_SHEET_ID.
 * No-ops (with a warning) when not configured so local dev still works.
 */
export async function appendLeadToSheet(lead: Lead): Promise<void> {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!clientEmail || !privateKey || !sheetId) {
    console.warn('[leads] Google Sheets non configuré — lead non enregistré dans le sheet.');
    return;
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: process.env.GOOGLE_SHEET_RANGE || 'Leads!A:I',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [
        [
          lead.createdAt,
          lead.name,
          lead.email,
          lead.businessName || '',
          lead.phone || '',
          lead.interest || '',
          lead.budget || '',
          lead.source,
          lead.message,
        ],
      ],
    },
  });
}

/**
 * Email a copy of every incoming lead to the agency inbox.
 * Requires RESEND_API_KEY and LEAD_NOTIFY_EMAIL. No-ops with a warning otherwise.
 */
export async function emailLeadCopy(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL || site.email;
  const from = process.env.LEAD_FROM_EMAIL || 'Weboua <leads@weboua.com>';

  if (!apiKey) {
    console.warn('[leads] RESEND_API_KEY non configuré — email non envoyé.');
    return;
  }

  const resend = new Resend(apiKey);

  const rows: [string, string][] = [
    ['Nom', lead.name],
    ['Email', lead.email],
    ['Entreprise', lead.businessName || '—'],
    ['Téléphone', lead.phone || '—'],
    ['Besoin', lead.interest || '—'],
    ['Budget', lead.budget || '—'],
    ['Source', lead.source],
    ['Reçu le', new Date(lead.createdAt).toLocaleString('fr-FR')],
  ];

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:auto">
      <h2 style="color:#0C3A2E">🚀 Nouveau lead — ${escapeHtml(lead.name)}</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 10px;color:#5B6B66;width:120px">${k}</td><td style="padding:6px 10px;color:#0F1B18;font-weight:600">${escapeHtml(
                v,
              )}</td></tr>`,
          )
          .join('')}
      </table>
      <h3 style="color:#0C3A2E;margin-top:20px">Message</h3>
      <p style="white-space:pre-wrap;color:#0F1B18;background:#F6FAF8;padding:14px;border-radius:12px">${escapeHtml(
        lead.message,
      )}</p>
    </div>`;

  await resend.emails.send({
    from,
    to,
    replyTo: lead.email,
    subject: `Nouveau lead — ${lead.name}${lead.businessName ? ` (${lead.businessName})` : ''}`,
    html,
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
