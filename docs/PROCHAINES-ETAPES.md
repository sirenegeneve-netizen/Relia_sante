# Prochaines étapes

Dans l'ordre où il est raisonnable de les aborder :

## 1. Authentification
Aujourd'hui, tout le monde avec le lien voit et modifie les données du patient de démonstration. Avant toute vraie donnée patient, il faut :
- un compte par patient (le patient ne voit que son propre dossier)
- un compte par professionnel (accès limité aux patients qu'il suit)
- Supabase propose une authentification intégrée (email/mot de passe, lien magique) qui s'appuierait directement sur les tables déjà créées.

## 2. Tableau de bord équipe (service qualité, soignants)
Cette version couvre uniquement le point de vue patient. Un second écran, réservé aux professionnels, permettrait de :
- voir tous les patients d'un service (pas un seul, comme actuellement)
- répondre aux messages depuis l'interface plutôt que côté patient uniquement
- consulter les ressentis et événements remontés, agrégés par service

## 3. Vrai stockage de documents
Actuellement seules les métadonnées sont enregistrées. Un vrai stockage de fichiers médicaux demande un hébergement conforme HDS (Hébergement de Données de Santé) — à traiter séparément, ce n'est pas qu'une question de code.

## 4. Questionnaire de satisfaction structuré
Le "ressenti" actuel est volontairement simple (3 réponses fixes). Un vrai questionnaire configurable (plusieurs questions, types de réponse variés) est possible mais mérite d'être conçu avec le service qualité, pas improvisé côté technique.

## 5. Lien avec Pulse Qualité
Voir [`LIEN-PULSE-QUALITE.md`](./LIEN-PULSE-QUALITE.md).

## 6. Migration éventuelle vers React/Vite
Si l'équipe grandit ou si plusieurs personnes doivent contribuer en parallèle, voir [`CHOIX-TECHNIQUES.md`](./CHOIX-TECHNIQUES.md) pour ce que ça impliquerait.
