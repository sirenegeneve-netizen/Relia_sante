# Lien avec Pulse Qualité (prochaine étape, pas encore fait)

Vous avez indiqué vouloir lier les deux applications plus tard : les événements remontés par les patients dans Relia Santé pourraient alimenter le module Gestion des risques de Pulse Qualité. Ce document pose les bases pour quand ce sera le bon moment.

## Le point de jonction naturel : `evenements`

Relia Santé a une table `evenements` (un patient signale une douleur, une inquiétude…). Pulse Qualité a sa propre table `evenements` (déclarée côté équipe qualité). Les deux ne sont **pas encore reliées automatiquement**.

## Deux façons de les relier, plus tard

**Option simple — lecture croisée** : le tableau de bord Pulse Qualité pourrait lire aussi la table `evenements` de Relia Santé (si les deux applications partagent le même projet Supabase, c'est une simple requête supplémentaire) et les afficher avec une étiquette "signalé par un patient".

**Option plus aboutie — un événement Relia Santé crée automatiquement un événement Pulse Qualité** : un déclencheur côté base de données (trigger PostgreSQL) qui, à chaque insertion dans `relia.evenements`, insère aussi une ligne dans `pulse_qualite.evenements` avec la gravité et le service correspondants. Demande un peu plus de configuration, mais rien d'inatteignable.

## Pourquoi ce n'est pas fait maintenant

Relier les deux prématurément aurait ajouté de la complexité avant que chacune des deux applications ait ses propres bases stables. Le bon moment est une fois que le modèle de données des deux est validé avec de vraies utilisations — cohérent avec la logique déjà posée dans la roadmap de Pulse Qualité (données réelles avant fonctionnalités avancées).
