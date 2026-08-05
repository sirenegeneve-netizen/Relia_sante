# Vision stratégique : le jumeau numérique du parcours patient

Cette vision remplace l'approche "accumulation de modules" (un écran par fonction : documents, messagerie, questionnaires...) par une approche centrée sur le parcours de la personne. Elle a été formalisée après le prototype v0.1/v0.2 et doit guider les prochaines évolutions.

## Le constat de départ

Un patient ne raisonne pas en modules ("je vais ouvrir le module documents"). Il raisonne en situations : *"Je vais être opéré"*, *"Je dois préparer mon admission"*, *"Je rentre chez moi"*, *"J'ai une question"*. Les informations existent déjà dans le système hospitalier, mais elles sont dispersées entre l'hôpital, les médecins externes, les spécialistes, les EMS, les soins à domicile, les assurances et les proches aidants — le patient doit répéter son histoire, chercher le bon interlocuteur, coordonner lui-même son parcours.

## Le concept central : "Mon parcours"

Relia Santé n'a plus une page d'accueil de type tableau de bord, mais une porte d'entrée unique : **Mon parcours**. C'est un "jumeau numérique" du parcours patient — une vue synthétique et évolutive qui rassemble les étapes, les événements importants, les rendez-vous, les documents, les interactions, les actions à réaliser et l'expérience exprimée par le patient. Ce n'est pas un dossier médical parallèle : c'est une représentation du vécu et de la coordination autour de la personne.

La timeline s'étend au-delà du séjour hospitalier : Avant soins → Hospitalisation → Intervention → Rééducation → Retour à domicile → Suivi externe → EMS si nécessaire.

## Quatre actions transversales, pas des modules isolés

Plutôt que des modules cloisonnés, quatre actions couvrent la majorité des usages, intégrées naturellement dans le parcours plutôt qu'accessibles comme des écrans séparés :
- **Comprendre** : visualiser les étapes, recevoir des explications, connaître les prochaines actions
- **Communiquer** : contacter le bon service, poser une question, recevoir une réponse
- **Partager** : ajouter un document, transmettre une information, partager avec les personnes autorisées
- **Participer** : répondre aux questionnaires, exprimer son ressenti, signaler un besoin

## Une source unique, plusieurs vues

La même donnée est interprétée différemment selon qui la consulte :

| Vue | Question centrale |
|---|---|
| Patient | "Que dois-je comprendre et faire maintenant ?" |
| Professionnel | "Que dois-je savoir pour accompagner cette personne ?" |
| Service hospitalier | "Quelles demandes dois-je traiter ?" |
| Direction / Qualité | "Comment améliorer le parcours ?" |

Idée forte à retenir : un **mode patient** et un **mode professionnel** s'appuyant sur la même donnée source, plutôt que deux applications séparées.

## Principes UX qui en découlent

- Langage patient, jamais technique : "Mes documents" plutôt que "Documents administratifs", "Contacter mon équipe" plutôt que "Messagerie sécurisée"
- Information contextuelle selon le moment du parcours (ne pas tout afficher en permanence)
- Statut visible à chaque étape : envoyé / reçu / en cours / terminé
- Ton rassurant et humain : *"Nous avons bien reçu votre document. Le service admission va maintenant vérifier votre prise en charge."* plutôt que *"Votre demande est enregistrée."*
- Accessibilité pensée dès le départ pour les profils les plus fragiles (voir tests utilisateurs ci-dessous)

## Tests utilisateurs à prévoir dès la conception

Trois profils, dans cet ordre de priorité :
1. **Patient autonome (~45 ans)** — facilité d'usage
2. **Patient âgé / résident EMS** — simplicité maximale
3. **Proche aidant** — accompagnement

Principe : si l'UX fonctionne pour ces trois profils, elle sera probablement adaptée aux professionnels également.

## Le lien stratégique avec Pulse Qualité

- **Relia Santé** capte le vécu terrain : compréhension, satisfaction, irritants, besoins exprimés par le patient
- **Pulse Qualité** transforme ces données en pilotage : indicateurs ANQ, analyses, tableaux de bord, plans d'amélioration

La boucle complète : *Patient → Expérience → Données → Analyse → Amélioration → Nouveau parcours amélioré.*

Exemple concret de cette boucle : un patient signale ne pas avoir compris ses consignes de sortie → Relia Santé détecte l'incompréhension → le service reçoit l'information → Pulse Qualité analyse une tendance sur plusieurs patients → l'établissement met en place une amélioration.

## Positionnement final

- **Relia Santé** : le lien numérique qui accompagne chaque personne tout au long de son parcours de santé
- **Pulse Qualité** : le moteur d'amélioration continue qui transforme l'expérience vécue en progrès organisationnel

## Pourquoi c'est pertinent pour un établissement comme le GHOL

Cette vision répond à plusieurs enjeux à la fois : expérience patient, qualité des soins, coordination ville-hôpital, lien avec les EMS, implication des proches, amélioration continue, préparation aux certifications — à partir d'une question simple que tout patient comprend : *"Est-ce que quelqu'un sait où j'en suis dans mon parcours ?"*

Voir [`EVOLUTIONS-PROPOSEES.md`](./EVOLUTIONS-PROPOSEES.md) pour la traduction de cette vision en étapes concrètes, compte tenu du calendrier serré avant présentation.
