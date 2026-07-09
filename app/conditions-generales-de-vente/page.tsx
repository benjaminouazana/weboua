import { LegalLayout } from '@/components/LegalLayout';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Conditions générales de vente',
  description: `Conditions générales de vente des prestations de ${site.name}.`,
  path: '/conditions-generales-de-vente',
});

export default function CGV() {
  return (
    <LegalLayout title="Conditions générales de vente" updated="9 juillet 2026">
      <h2>1. Objet</h2>
      <p>
        Les présentes conditions générales de vente (CGV) définissent les conditions dans lesquelles {site.name}{' '}
        fournit ses prestations : création de sites internet, référencement naturel (SEO), génération de leads,
        campagnes d'emailing, hébergement et prestations associées.
      </p>

      <h2>2. Devis et commande</h2>
      <p>
        Toute prestation fait l'objet d'un devis détaillé et personnalisé, valable 30 jours. La commande devient ferme
        à réception du devis accepté et, le cas échéant, de l'acompte prévu au devis.
      </p>

      <h2>3. Tarifs et paiement</h2>
      <p>
        Les prix sont exprimés en euros. Les modalités de paiement (acompte, échéancier, abonnement mensuel) sont
        précisées dans chaque devis. Sauf mention contraire, les factures sont payables à réception. Tout retard de
        paiement peut entraîner la suspension des prestations en cours.
      </p>

      <h2>4. Délais</h2>
      <p>
        Les délais de livraison sont communiqués à titre indicatif. Ils dépendent notamment de la fourniture par le
        client des éléments nécessaires (contenus, accès, validations) en temps utile.
      </p>

      <h2>5. Obligations des parties</h2>
      <p>
        {site.name} s'engage à exécuter les prestations avec professionnalisme et dans les règles de l'art. Le client
        s'engage à fournir des informations exactes, les contenus et accès nécessaires, et à procéder aux validations
        dans des délais raisonnables.
      </p>

      <h2>6. Propriété et livraison</h2>
      <p>
        Le transfert de propriété des livrables (site, contenus, développements spécifiques) intervient après paiement
        intégral des sommes dues. Jusqu'au paiement complet, les livrables restent la propriété de {site.name}.
      </p>

      <h2>7. Référencement et résultats</h2>
      <p>
        Les prestations de référencement naturel constituent une obligation de moyens : les positions sur les moteurs
        de recherche dépendent d'algorithmes tiers et ne peuvent faire l'objet d'aucune garantie de résultat.
      </p>

      <h2>8. Résiliation</h2>
      <p>
        Les prestations récurrentes (hébergement, maintenance, SEO mensuel) peuvent être résiliées par chaque partie
        avec un préavis de 30 jours, sauf conditions particulières prévues au devis.
      </p>

      <h2>9. Droit applicable et litiges</h2>
      <p>
        Les présentes CGV sont soumises au droit applicable au lieu d'établissement de {site.name}. En cas de litige,
        les parties s'efforceront de trouver une solution amiable avant toute action contentieuse.
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question relative aux présentes CGV : <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalLayout>
  );
}
