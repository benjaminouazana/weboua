import { Resend } from 'resend';

/**
 * Ajoute un contact à l'audience Resend (la liste de la newsletter).
 * Chaque lead — et surtout chaque téléchargement de livre blanc — y entre,
 * ce qui alimente le tunnel : cold email → livre blanc → newsletter.
 *
 * No-op (avec un warning) tant que RESEND_API_KEY et RESEND_AUDIENCE_ID
 * ne sont pas configurés, pour ne jamais faire échouer la capture du lead.
 */
export async function addContactToAudience(email: string, fullName?: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    console.warn('[newsletter] RESEND_AUDIENCE_ID non configuré — contact non ajouté à la liste.');
    return;
  }

  const firstName = (fullName || '').trim().split(/\s+/)[0] || undefined;
  const resend = new Resend(apiKey);

  await resend.contacts.create({
    audienceId,
    email,
    firstName,
    unsubscribed: false,
  });
}
