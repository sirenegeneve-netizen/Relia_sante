# Évolutions proposées

Cette vision (le jumeau numérique du parcours) est ambitieuse — une vraie refonte de l'architecture des deux applications. Compte tenu du calendrier avant votre entretien, voici comment la traduire en étapes réalistes, classées par horizon.

## Horizon 1 — Pour l'entretien (jours), sans tout reconstruire

L'objectif ici n'est pas de reconstruire l'application, mais de montrer que la vision existe, est documentée, et qu'un premier pas concret a été fait.

**1. Le document stratégique lui-même est un livrable.** `VISION-STRATEGIQUE.md` peut être présenté comme la feuille de route produit — beaucoup de candidats montrent du code, peu montrent une vision produit structurée avec ce niveau de clarté (parcours plutôt que modules, quatre vues, quatre actions transversales). C'est un point fort à mettre en avant tel quel.

**2. Un geste concret à faible risque : un bandeau "Aujourd'hui" en tête de l'écran Parcours.** Sans toucher à la navigation existante, ajouter en haut de l'écran "Parcours" un résumé façon *"À faire" / "À savoir"*, calculé à partir des données déjà en base (prochaine étape, dernier message non lu, ressenti récent). Ça matérialise concrètement le concept sans réécrire l'architecture. Dites-moi si vous voulez que je le code maintenant — c'est faisable en une itération courte.

**3. Un vocabulaire patient plutôt que technique.** Renommer dans l'interface existante : "Documents" → garder (déjà bon), "Messagerie" → "Contacter mon équipe" (déjà proche), ajouter des messages de confirmation rassurants après chaque action ("Votre message a été transmis à l'équipe. Réponse prévue sous 48h.") au lieu du simple toast actuel. Ce sont des micro-changements de copy, pas d'architecture — rapides à faire, cohérents avec la vision.

## Horizon 2 — Après l'entretien, vraie refonte

**4. Remplacer la navigation à 5 onglets par "Mon parcours" comme porte d'entrée unique**, avec les 4 actions (Comprendre / Communiquer / Partager / Participer) intégrées de façon contextuelle plutôt qu'en écrans séparés. C'est un changement d'architecture de l'interface, pas seulement visuel — à faire une fois la vision validée avec de vrais utilisateurs.

**5. Étendre le modèle de données** avec deux tables qui manquent aujourd'hui pour vraiment incarner le "jumeau du parcours" :
   - `relia_actions` : les "Mes actions" du patient (transmettre un document, confirmer un rendez-vous), avec échéance, responsable, statut — actuellement il n'existe rien d'équivalent.
   - `relia_etapes_parcours` : une timeline plus riche que le champ `etape_actuelle` actuel (qui est un simple statut), pour couvrir la vision étendue (Avant soins → EMS si nécessaire).

**6. Mode patient / mode professionnel sur la même donnée source** : techniquement, ça veut dire ajouter un rôle (patient / professionnel / service / qualité) et faire varier la requête et l'affichage selon ce rôle, plutôt que dupliquer les tables. C'est lié à l'authentification (déjà identifiée comme prochaine étape dans `PROCHAINES-ETAPES.md`) — les deux se construisent ensemble.

## Horizon 3 — Lien concret avec Pulse Qualité

Trois idées concrètes, du plus simple au plus structurant :

**7. Lecture croisée immédiate (faisable dès maintenant, techniquement simple).** Les deux applications partagent déjà le même projet Supabase. Le module "Voix du patient" de Pulse Qualité pourrait interroger directement `relia_ressenti_reponses` et `relia_evenements` en plus de ses propres tables, avec une étiquette "remonté par Relia Santé" — sans dupliquer de saisie, sans trigger, juste une requête supplémentaire côté Pulse Qualité.

**8. Boucle automatisée (Horizon 2).** Un événement grave (`relia_evenements` avec `gravite = 'red'`) déclenche automatiquement une ligne dans `evenements` côté Pulse Qualité — via un trigger PostgreSQL. Ça incarne littéralement la boucle décrite dans la vision : *Patient → Expérience → Données → Analyse → Amélioration.*

**9. Vue "Qualité" comme quatrième vue de Relia Santé (Horizon 2/3).** Plutôt que de garder Pulse Qualité et Relia Santé complètement séparés dans l'usage, la vue "Direction / Qualité" décrite dans la vision stratégique pourrait être, à terme, un point d'entrée dans Pulse Qualité directement depuis les données de parcours de Relia Santé — les irritants et ruptures de parcours remontant naturellement vers le tableau de bord qualité.

## Ce que je recommande pour la suite immédiate

Compte tenu du temps disponible : consigner cette vision (fait), et décider ensemble d'un seul geste concret de l'Horizon 1 à coder maintenant plutôt que de disperser l'effort. Le plus impactant pour un entretien est probablement le point 2 (bandeau "Aujourd'hui") — ça rend la vision tangible en quelques minutes de démonstration, sans risque de casser ce qui fonctionne déjà.
