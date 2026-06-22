/**
 * Long-form, SEO-oriented content for each service page.
 * Keyed by the same slug used in lib/site.ts → services.
 */

export type ServiceContent = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  hero: { eyebrow: string; title: string; subtitle: string };
  intro: string;
  benefits: { icon: string; title: string; text: string }[];
  deliverables: string[];
  process: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
};

export const servicesContent: Record<string, ServiceContent> = {
  'creation-de-sites-internet': {
    slug: 'creation-de-sites-internet',
    metaTitle: 'Création de site internet sur-mesure — Agence web',
    metaDescription:
      "Création de sites internet codés sur-mesure : rapides, sécurisés et optimisés pour convertir vos visiteurs en clients. Vitrine, landing page, plateforme.",
    keywords: ['création site internet', 'agence web', 'site sur-mesure', 'développement web', 'site vitrine'],
    hero: {
      eyebrow: 'Création de sites internet',
      title: 'Un site qui travaille pour vous, 24 h/24',
      subtitle:
        "On conçoit et on code des sites sur-mesure, pensés pour la performance et la conversion. Pas un catalogue en ligne : un véritable outil commercial.",
    },
    intro:
      "Votre site est souvent le premier contact avec un prospect. En quelques secondes, il décide s'il vous fait confiance. On construit des sites rapides, clairs et persuasifs, qui transforment ces secondes en opportunités.",
    benefits: [
      { icon: 'bolt', title: 'Ultra-rapide', text: 'Code léger, hébergement optimisé, chargement éclair. Google et vos visiteurs adorent.' },
      { icon: 'target', title: 'Orienté conversion', text: 'Chaque page est pensée pour guider le visiteur vers l’action : appel, devis, achat.' },
      { icon: 'search', title: 'SEO intégré', text: 'Structure sémantique et balisage propres dès la première ligne de code.' },
      { icon: 'shield', title: 'Sécurisé & fiable', text: 'Pas de plugins vulnérables, sauvegardes et monitoring inclus.' },
    ],
    deliverables: [
      'Design sur-mesure aligné sur votre image de marque',
      'Développement responsive (mobile, tablette, desktop)',
      'Optimisation des performances et des Core Web Vitals',
      'Référencement technique de base inclus',
      'Formulaires de contact et tracking des conversions',
      'Formation à la prise en main et accompagnement',
    ],
    process: [
      { title: 'Cadrage', text: 'On définit vos objectifs, votre cible et l’arborescence du site.' },
      { title: 'Design', text: 'Maquettes sur-mesure, validées avec vous avant le moindre développement.' },
      { title: 'Développement', text: 'Code propre, performant et optimisé pour le référencement.' },
      { title: 'Lancement', text: 'Mise en ligne, tests, et accompagnement post-lancement.' },
    ],
    faqs: [
      { q: 'Combien de temps pour créer mon site ?', a: 'Un site vitrine prend généralement 3 à 6 semaines selon la complexité et la réactivité sur les contenus.' },
      { q: 'Pourrai-je modifier mon site moi-même ?', a: 'Oui. On met en place une interface de gestion simple et on vous forme à son utilisation.' },
      { q: 'Le référencement est-il inclus ?', a: 'Le SEO technique de base est inclus. Pour une stratégie de positionnement complète, voyez notre offre SEO.' },
    ],
  },

  'seo-referencement-naturel': {
    slug: 'seo-referencement-naturel',
    metaTitle: 'Agence SEO — Référencement naturel & positionnement Google',
    metaDescription:
      "Stratégie SEO complète : audit technique, sémantique, contenus et netlinking pour positionner votre site dans le top des résultats Google.",
    keywords: ['agence SEO', 'référencement naturel', 'positionnement Google', 'audit SEO', 'stratégie de contenu'],
    hero: {
      eyebrow: 'SEO & Référencement naturel',
      title: 'Dominez Google sur les requêtes qui rapportent',
      subtitle:
        "Le SEO est l'investissement marketing le plus rentable sur la durée. On vous positionne là où vos clients cherchent, pour un trafic qualifié qui ne s'arrête jamais.",
    },
    intro:
      "Être en première page de Google, ce n'est pas une question de chance. C'est une méthode : un site techniquement irréprochable, des contenus qui répondent aux intentions de recherche, et une autorité construite dans le temps.",
    benefits: [
      { icon: 'gauge', title: 'Audit complet', text: 'Technique, sémantique, concurrence : on identifie tout ce qui freine votre positionnement.' },
      { icon: 'search', title: 'Stratégie de mots-clés', text: 'On cible les requêtes à fort potentiel commercial, pas juste celles qui font du volume.' },
      { icon: 'browser', title: 'Contenus optimisés', text: 'Des articles et pages qui se positionnent et qui convertissent.' },
      { icon: 'trophy', title: 'Résultats mesurables', text: 'Suivi des positions, du trafic et des leads générés, en toute transparence.' },
    ],
    deliverables: [
      'Audit SEO technique et sémantique complet',
      'Recherche et cartographie des mots-clés',
      'Optimisation on-page (titres, structure, maillage)',
      'Stratégie de contenu et calendrier éditorial',
      'Netlinking et acquisition d’autorité',
      'Reporting mensuel des positions et du trafic',
    ],
    process: [
      { title: 'Audit', text: 'État des lieux complet de votre visibilité et de vos concurrents.' },
      { title: 'Stratégie', text: 'Plan d’action priorisé selon l’impact business attendu.' },
      { title: 'Exécution', text: 'Optimisations techniques, contenus et netlinking.' },
      { title: 'Croissance', text: 'Suivi des résultats et optimisation continue.' },
    ],
    faqs: [
      { q: 'En combien de temps voit-on des résultats ?', a: 'Les premiers effets apparaissent souvent en 2 à 4 mois ; les résultats significatifs en 6 à 12 mois. Le SEO est un investissement de fond.' },
      { q: 'Garantissez-vous la première place ?', a: 'Personne ne peut garantir une position : Google décide. On garantit en revanche une méthode rigoureuse et des progrès mesurables.' },
      { q: 'Travaillez-vous avec mon site actuel ?', a: 'Oui, on commence toujours par auditer l’existant avant de recommander quoi que ce soit.' },
    ],
  },

  'leads-b2b': {
    slug: 'leads-b2b',
    metaTitle: 'Génération de leads B2B — Prospects qualifiés en continu',
    metaDescription:
      "Campagnes de prospection B2B et tunnels de conversion pour alimenter vos commerciaux en rendez-vous qualifiés, chaque mois.",
    keywords: ['génération de leads B2B', 'prospection commerciale', 'lead generation', 'acquisition client', 'rendez-vous qualifiés'],
    hero: {
      eyebrow: 'Génération de leads B2B',
      title: 'Un agenda commercial toujours plein',
      subtitle:
        "On met en place une machine d'acquisition qui transforme votre présence en ligne en flux régulier de prospects B2B qualifiés.",
    },
    intro:
      "Le meilleur produit du monde ne sert à rien sans clients à qui le vendre. On combine site, SEO et prospection directe pour vous apporter des décideurs prêts à discuter — mois après mois.",
    benefits: [
      { icon: 'target', title: 'Ciblage précis', text: 'On identifie les entreprises et décideurs qui correspondent exactement à votre client idéal.' },
      { icon: 'mail', title: 'Prospection multicanal', text: 'Cold email, LinkedIn, landing pages : on active les bons canaux pour votre marché.' },
      { icon: 'browser', title: 'Tunnels qui convertissent', text: 'Pages d’atterrissage et formulaires optimisés pour maximiser le taux de transformation.' },
      { icon: 'gauge', title: 'Pilotage par la donnée', text: 'Coût par lead, taux de réponse, transformation : on optimise en continu.' },
    ],
    deliverables: [
      'Définition de votre client idéal (ICP)',
      'Construction de bases de prospects qualifiées',
      'Séquences de prospection et copywriting',
      'Landing pages et formulaires de capture',
      'Mise en place du suivi et du CRM',
      'Reporting des leads et opportunités générés',
    ],
    process: [
      { title: 'Stratégie', text: 'On définit votre cible, votre offre et vos canaux prioritaires.' },
      { title: 'Mise en place', text: 'Outils, bases de données, séquences et pages de capture.' },
      { title: 'Campagnes', text: 'Lancement, tests et optimisation des messages.' },
      { title: 'Optimisation', text: 'On amplifie ce qui marche et on améliore le coût par lead.' },
    ],
    faqs: [
      { q: 'Quel volume de leads puis-je espérer ?', a: 'Cela dépend de votre marché et de votre offre. On fixe ensemble des objectifs réalistes après une première analyse.' },
      { q: 'Le cold email est-il légal ?', a: 'En B2B, la prospection par email est encadrée mais autorisée si elle respecte le RGPD (intérêt légitime, désinscription, etc.). On s’assure de la conformité.' },
      { q: 'Faut-il déjà avoir un site ?', a: 'Idéalement oui, mais on peut commencer avec des landing pages dédiées que l’on crée pour vous.' },
    ],
  },

  'campagnes-email': {
    slug: 'campagnes-email',
    metaTitle: 'Campagnes de mailing & cold email — Délivrabilité et résultats',
    metaDescription:
      "Cold emailing et email marketing : séquences, délivrabilité, segmentation et copywriting pour décrocher des réponses et des opportunités B2B.",
    keywords: ['campagne email', 'cold email', 'email marketing', 'délivrabilité', 'prospection email'],
    hero: {
      eyebrow: 'Campagnes de mailing',
      title: 'Des emails qui ouvrent des portes',
      subtitle:
        "De la délivrabilité au copywriting, on conçoit des campagnes email qui atterrissent dans la boîte de réception et qui génèrent des réponses.",
    },
    intro:
      "L'email reste l'un des canaux les plus rentables du B2B — à condition de bien le maîtriser. Mauvaise délivrabilité, messages génériques, ciblage approximatif : les pièges sont nombreux. On s'en occupe.",
    benefits: [
      { icon: 'shield', title: 'Délivrabilité maîtrisée', text: 'Réchauffement des domaines, SPF/DKIM/DMARC : vos emails arrivent vraiment.' },
      { icon: 'target', title: 'Segmentation fine', text: 'Le bon message à la bonne personne au bon moment.' },
      { icon: 'mail', title: 'Copywriting qui répond', text: 'Des messages courts, personnalisés et centrés sur le destinataire.' },
      { icon: 'gauge', title: 'Optimisation continue', text: 'Tests A/B sur les objets, les messages et les relances.' },
    ],
    deliverables: [
      'Configuration technique de la délivrabilité',
      'Segmentation et préparation des listes',
      'Rédaction des séquences et relances',
      'Mise en place de l’outil d’envoi',
      'Tests A/B et optimisation',
      'Reporting des ouvertures, réponses et rendez-vous',
    ],
    process: [
      { title: 'Préparation', text: 'Domaines, authentification et réchauffement pour une délivrabilité maximale.' },
      { title: 'Ciblage', text: 'Construction et segmentation de listes qualifiées.' },
      { title: 'Rédaction', text: 'Séquences personnalisées qui donnent envie de répondre.' },
      { title: 'Envoi & suivi', text: 'Lancement, mesure et optimisation des performances.' },
    ],
    faqs: [
      { q: 'Quel taux de réponse peut-on viser ?', a: 'Une bonne campagne B2B obtient souvent 5 à 15 % de réponses, selon la qualité du ciblage et du message.' },
      { q: 'Mes emails risquent-ils d’être marqués comme spam ?', a: 'C’est tout l’enjeu de la délivrabilité, qu’on prépare soigneusement (authentification, réchauffement, volumes progressifs).' },
      { q: 'Fournissez-vous les contacts ?', a: 'Oui, on peut construire des bases de prospects qualifiées selon votre cible.' },
    ],
  },

  'hebergement-serveurs': {
    slug: 'hebergement-serveurs',
    metaTitle: 'Hébergement web infogéré & serveurs performants',
    metaDescription:
      "Hébergement infogéré, serveurs rapides, sauvegardes et monitoring 24/7. Votre site reste rapide, sécurisé et toujours disponible.",
    keywords: ['hébergement web', 'serveur infogéré', 'hébergement infogéré', 'monitoring', 'sauvegarde site'],
    hero: {
      eyebrow: 'Hébergement & Serveurs',
      title: 'Une infrastructure qui ne vous lâche jamais',
      subtitle:
        "Hébergement infogéré et serveurs optimisés pour la vitesse et la fiabilité. On s'occupe de la technique, vous vous concentrez sur votre business.",
    },
    intro:
      "Un site rapide et toujours disponible, c'est un prérequis — pour vos clients comme pour Google. On gère l'hébergement, la sécurité, les sauvegardes et le monitoring pour que vous n'ayez jamais à y penser.",
    benefits: [
      { icon: 'bolt', title: 'Vitesse', text: 'Serveurs optimisés et mise en cache pour des temps de réponse minimaux.' },
      { icon: 'shield', title: 'Sécurité', text: 'Certificats SSL, pare-feu, mises à jour et surveillance continue.' },
      { icon: 'server', title: 'Sauvegardes', text: 'Sauvegardes régulières et restauration rapide en cas de besoin.' },
      { icon: 'gauge', title: 'Monitoring 24/7', text: 'On détecte et corrige les incidents avant que vous ne les remarquiez.' },
    ],
    deliverables: [
      'Hébergement infogéré adapté à votre trafic',
      'Certificat SSL et configuration sécurisée',
      'Sauvegardes automatiques et restauration',
      'Monitoring de disponibilité et de performance',
      'Mises à jour et maintenance technique',
      'Support réactif en cas d’incident',
    ],
    process: [
      { title: 'Audit', text: 'On évalue vos besoins en performance et en disponibilité.' },
      { title: 'Migration', text: 'Transfert sans interruption de service.' },
      { title: 'Optimisation', text: 'Configuration serveur et cache pour la vitesse maximale.' },
      { title: 'Supervision', text: 'Monitoring et maintenance en continu.' },
    ],
    faqs: [
      { q: 'Pouvez-vous reprendre mon hébergement actuel ?', a: 'Oui, on migre votre site sans coupure et on reprend la gestion technique.' },
      { q: 'Que se passe-t-il en cas de panne ?', a: 'Notre monitoring nous alerte immédiatement et on intervient. Les sauvegardes permettent une restauration rapide.' },
      { q: 'L’hébergement est-il adapté à la montée en charge ?', a: 'Oui, on dimensionne l’infrastructure selon votre trafic et on l’ajuste à mesure que vous grandissez.' },
    ],
  },

  'audit-seo-performance': {
    slug: 'audit-seo-performance',
    metaTitle: 'Audit SEO & Performance gratuit — Diagnostic de votre site',
    metaDescription:
      "Recevez un audit SEO et performance gratuit de votre site : technique, vitesse, mots-clés et concurrence. Repartez avec un plan d'action concret.",
    keywords: ['audit SEO gratuit', 'audit site web', 'analyse SEO', 'audit performance', 'diagnostic site internet'],
    hero: {
      eyebrow: 'Audit SEO & Performance',
      title: 'Découvrez le vrai potentiel de votre site',
      subtitle:
        "Un diagnostic complet et gratuit : on analyse votre site, votre SEO et vos concurrents, puis on vous remet un plan d'action concret.",
    },
    intro:
      "Avant d'investir, mieux vaut savoir où vous en êtes. Notre audit gratuit met en lumière vos points forts, vos freins et vos opportunités de croissance — sans engagement.",
    benefits: [
      { icon: 'gauge', title: 'Analyse technique', text: 'Vitesse, Core Web Vitals, indexation, erreurs : tout est passé au crible.' },
      { icon: 'search', title: 'Audit SEO', text: 'Positionnement actuel, mots-clés et opportunités manquées.' },
      { icon: 'target', title: 'Étude concurrentielle', text: 'On compare votre visibilité à celle de vos concurrents directs.' },
      { icon: 'browser', title: 'Plan d’action', text: 'Des recommandations priorisées et actionnables, pas du jargon.' },
    ],
    deliverables: [
      'Analyse technique et performance du site',
      'État des lieux de votre référencement',
      'Comparatif avec vos principaux concurrents',
      'Liste priorisée des optimisations à mener',
      'Estimation du potentiel de trafic et de leads',
    ],
    process: [
      { title: 'Demande', text: 'Vous remplissez le formulaire avec l’URL de votre site.' },
      { title: 'Analyse', text: 'On audite votre site et votre marché.' },
      { title: 'Restitution', text: 'On vous présente les résultats et le plan d’action.' },
      { title: 'Décision', text: 'Vous décidez de la suite, sans aucune obligation.' },
    ],
    faqs: [
      { q: 'L’audit est-il vraiment gratuit ?', a: 'Oui, totalement et sans engagement. C’est notre façon de vous montrer notre valeur avant toute collaboration.' },
      { q: 'Combien de temps pour recevoir mon audit ?', a: 'Comptez quelques jours ouvrés après réception de votre demande.' },
      { q: 'Dois-je avoir un gros site ?', a: 'Non, l’audit est utile pour tout site, du plus simple au plus complexe.' },
    ],
  },
};

export function getServiceContent(slug: string): ServiceContent | null {
  return servicesContent[slug] ?? null;
}
