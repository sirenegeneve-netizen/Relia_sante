# Modèle de données

9 tables, pensées pour rester lisibles tout en couvrant les entités demandées : Patients, Séjours, Services, Professionnels, Messages, Questionnaires/Réponses, Événements, Documents.

## `patients`
Identité du patient : prénom, nom, date de naissance, email, avatar.

## `services`
Les services de l'hôpital (ex : "Chirurgie Orthopédique", code "GHOL — Chirurgie").

## `professionnels`
Les soignants : nom, rôle, statut en ligne (pour la messagerie).

## `sejours`
Le cœur du modèle. Un séjour relie un patient à un service, avec :
- `statut` (`actuel` / `termine`)
- `etape_actuelle` (`admission` / `intervention` / `reeducation` / `retour_domicile` / `cloture`) — pilote la timeline visuelle
- les dates de chaque étape
- `prochaine_etape` : texte libre affiché sur l'accueil (ex : "Consultation demain 10h")

## `sejour_professionnels`
Table de liaison many-to-many : quels professionnels suivent quel séjour. Permet à un même professionnel de suivre plusieurs patients, et à un patient d'avoir plusieurs professionnels.

## `messages`
Les échanges de la messagerie sécurisée. Un message appartient à un séjour, vient soit du patient soit du service (`expediteur`), et peut être rattaché à un professionnel précis ou à un service générique (`service_nom`).

## `ressenti_reponses`
Le "questionnaire de satisfaction à chaud" du cahier des charges, simplifié en check-in à 3 réponses (`ca_va` / `question` / `besoin_aide`). C'est volontairement plus simple qu'un vrai moteur de questionnaire à plusieurs questions — voir `PROCHAINES-ETAPES.md` pour l'évolution envisagée.

## `evenements`
Un événement signalé par le patient ou son entourage pendant le séjour (ex : douleur persistante). C'est le point de jonction naturel avec le module "Gestion des risques" de Pulse Qualité — voir `LIEN-PULSE-QUALITE.md`.

## `documents`
Métadonnées des documents du séjour (titre, catégorie, taille, date). Cette version ne stocke pas de vrais fichiers, uniquement leurs informations — voir `CHOIX-TECHNIQUES.md`.

## Ce qui manque encore, volontairement

- Pas de table `questionnaires` / `questions` génériques : le ressenti est codé en dur avec 3 réponses possibles. Un vrai moteur de questionnaire configurable est une évolution possible, mais aurait ajouté de la complexité sans bénéfice immédiat pour la V0.2.
- Pas de gestion des rôles (`patient`, `proche aidant`, `secrétaire`, etc.) au niveau base de données : tous les utilisateurs listés dans le README restent, pour l'instant, un principe d'organisation plutôt qu'un mécanisme technique. Voir `PROCHAINES-ETAPES.md`.
