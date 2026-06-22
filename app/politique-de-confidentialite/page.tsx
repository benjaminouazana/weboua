import { LegalLayout } from '@/components/LegalLayout';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Politique de confidentialité',
  description: `Comment ${site.name} collecte et traite vos données personnelles, conformément au RGPD.`,
  path: '/politique-de-confidentialite',
});

export default function Confidentialite() {
  return (
    <LegalLayout title="Politique de confidentialité" updated="22 juin 2026">
      <p>
        {site.name} accorde une grande importance à la protection de vos données personnelles. Cette politique explique
        quelles données nous collectons, pourquoi et comment vous pouvez exercer vos droits.
      </p>

      <h2>Données collectées</h2>
      <p>
        Via nos formulaires, nous collectons les données que vous nous transmettez volontairement : nom, email,
        téléphone, nom de votre entreprise et le message décrivant votre projet.
      </p>

      <h2>Finalité du traitement</h2>
      <p>
        Ces données sont utilisées uniquement pour répondre à votre demande, vous recontacter et, le cas échéant, vous
        fournir un devis ou un audit. Elles ne sont jamais revendues à des tiers.
      </p>

      <h2>Base légale</h2>
      <p>
        Le traitement repose sur votre consentement (envoi du formulaire) et sur notre intérêt légitime à répondre aux
        demandes commerciales.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Vos données sont conservées le temps nécessaire au traitement de votre demande et à la relation commerciale,
        puis archivées ou supprimées conformément à nos obligations légales.
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et
        d'opposition. Pour les exercer, écrivez-nous à <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Cookies</h2>
      <p>
        Ce site utilise un minimum de cookies, essentiellement à des fins de mesure d'audience. Vous pouvez configurer
        votre navigateur pour les refuser.
      </p>
    </LegalLayout>
  );
}
