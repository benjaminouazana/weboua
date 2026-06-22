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
    <LegalLayout title="Mentions légales" updated="22 juin 2026">
      <h2>Éditeur du site</h2>
      <p>
        {/* À COMPLÉTER avec vos informations légales */}
        <strong>{site.name}</strong> — {site.tagline}.
        <br />
        Raison sociale : <em>[à compléter]</em>
        <br />
        Forme juridique : <em>[à compléter]</em>
        <br />
        Capital social : <em>[à compléter]</em>
        <br />
        Siège social : <em>[adresse à compléter]</em>
        <br />
        SIRET : <em>[à compléter]</em> — RCS : <em>[à compléter]</em>
        <br />
        N° TVA intracommunautaire : <em>[à compléter]</em>
        <br />
        Email : {site.email}
      </p>

      <h2>Directeur de la publication</h2>
      <p><em>[Nom du responsable légal à compléter]</em></p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par <em>[nom et adresse de l'hébergeur à compléter]</em>.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble des contenus présents sur ce site (textes, images, logos, code) est la propriété de {site.name},
        sauf mention contraire, et est protégé par le droit de la propriété intellectuelle. Toute reproduction sans
        autorisation est interdite.
      </p>

      <h2>Responsabilité</h2>
      <p>
        {site.name} s'efforce d'assurer l'exactitude des informations diffusées sur ce site mais ne saurait être tenue
        responsable des erreurs, omissions ou indisponibilités.
      </p>
    </LegalLayout>
  );
}
