import { LegalLayout } from '@/components/LegalLayout';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Mentions légales',
  description: `Mentions légales du site ${site.name}.`,
  path: '/mentions-legales',
});

export default function MentionsLegales() {
  return (
    <LegalLayout title="Mentions légales" updated="9 juillet 2026">
      <h2>Éditeur du site</h2>
      <p>
        Le site <strong>weboua.com</strong> est édité par <strong>{site.name}</strong> — {site.tagline}.
        <br />
        Contact : <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>

      <h2>Directeur de la publication</h2>
      <p>La direction de {site.name}.</p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina, CA 91723,
        États-Unis — <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>.
      </p>
      <p>
        Le nom de domaine et les services de messagerie sont gérés par <strong>Hostinger International Ltd</strong> —{' '}
        <a href="https://www.hostinger.fr" target="_blank" rel="noopener noreferrer">hostinger.fr</a>.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble des contenus présents sur ce site (textes, images, logos, code) est la propriété de {site.name},
        sauf mention contraire, et est protégé par le droit de la propriété intellectuelle. Toute reproduction sans
        autorisation préalable écrite est interdite.
      </p>

      <h2>Responsabilité</h2>
      <p>
        {site.name} s'efforce d'assurer l'exactitude des informations diffusées sur ce site mais ne saurait être tenue
        responsable des erreurs, omissions ou indisponibilités. Les liens externes proposés (notamment vers les sites
        de nos clients) ne sauraient engager la responsabilité de {site.name} quant à leur contenu.
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question relative au site ou à ses contenus : <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalLayout>
  );
}
