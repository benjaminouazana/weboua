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
    <LegalLayout title="Conditions générales de vente" updated="22 juin 2026">
      <p>
        Les présentes conditions générales de vente (CGV) régissent les prestations fournies par {site.name}. Elles
        sont à compléter et à valider par un conseil juridique avant mise en ligne.
      </p>

      <h2>1. Objet</h2>
      <p>
        Les CGV définissent les conditions dans lesquelles {site.name} fournit ses prestations de création de sites
        internet, de référencement, de génération de leads, d'emailing et d'hébergement.
      </p>

      <h2>2. Devis et commande</h2>
      <p>
        Toute prestation fait l'objet d'un devis détaillé. La commande est ferme à réception du devis signé et, le cas
        échéant, de l'acompte prévu.
      </p>

      <h2>3. Tarifs et paiement</h2>
      <p>
        Les prix sont indiqués en euros. Les modalités de paiement (acompte, échéancier, abonnement) sont précisées
        dans le devis. <em>[Détails à compléter]</em>
      </p>

      <h2>4. Délais</h2>
      <p>
        Les délais sont communiqués à titre indicatif et dépendent notamment de la fourniture des éléments par le
        client.
      </p>

      <h2>5. Obligations des parties</h2>
      <p>
        {site.name} s'engage à fournir les prestations avec professionnalisme. Le client s'engage à fournir les
        informations et contenus nécessaires en temps utile.
      </p>

      <h2>6. Propriété et livraison</h2>
      <p>
        Le transfert de propriété des livrables intervient après paiement intégral. <em>[À préciser selon vos
        modalités]</em>
      </p>

      <h2>7. Droit applicable</h2>
      <p>
        Les présentes CGV sont soumises au droit français. Tout litige relève des tribunaux compétents.
      </p>
    </LegalLayout>
  );
}
