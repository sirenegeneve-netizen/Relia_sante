# Backlog fonctionnel : les 9 évolutions attendues

Le document stratégique détaille 9 évolutions fonctionnelles (A à I). Voici où en est chacune, pour garder une vue honnête de ce qui est fait, en cours, ou pas encore commencé.

| # | Évolution | Statut |
|---|---|---|
| A | **Mon parcours** — timeline étendue (avant soins → EMS) | ✅ Fait — étapes ajoutées dans `relia_sejours.etape_actuelle`, ligne de statut compacte sur l'accueil |
| B | **Messagerie de coordination** par service, pas patient-médecin direct | ✅ Fait |
| C | **Documents intelligents** (photo, scan, classement auto, associés au parcours) | ⏳ Pas commencé |
| D | **Agenda santé** externe (consultations, spécialistes, EMS) | ⏳ Pas commencé |
| E | **Ma voix / expérience patient** en continu | 🟡 Partiel — le ressenti à 3 réponses existe, pas encore une écoute structurée sur douleur/compréhension/inquiétudes séparément |
| F | **Mon équipe** — visibilité humaine (qui, pourquoi, comment contacter) | 🟡 Partiel — les professionnels du séjour sont affichés, mais sans les EMS ni les proches autorisés |
| G | **Mes actions** — liste personnalisée avec échéance/responsable | ✅ Fait — table `relia_actions`, checklist fonctionnelle |
| H | **Intégration EMS** (parcours de vie, pas seulement séjour hospitalier) | ⏳ Pas commencé |
| I | **Cercle de confiance** (inviter des proches, contrôler ce qui est partagé) | ⏳ Pas commencé |

## Pourquoi B, C, D, H, I ne sont pas encore commencés — et ce qu'ils coûtent chacun

**B. Messagerie par besoin, jamais par service**
Version affinée après retour : le patient ne doit jamais voir l'organisation interne de l'hôpital (pas de liste "Admission / Anesthésie / Secrétariat"). Il exprime un besoin ("J'ai une douleur", "Mon rendez-vous"...), et Relia Santé route silencieusement vers le bon service en arrière-plan. Les conversations affichées sont nommées par sujet ("Mon équipe soignante", "Préparation de mon intervention"), jamais par service. Implémenté : le routage réel reste stocké en base (`service_nom`) pour un usage futur côté vue professionnelle, mais n'est jamais montré au patient.

**C. Documents intelligents**
Le plus coûteux du lot. Suppose un vrai traitement de fichier (OCR, classification automatique) — au-delà d'un prototype de démonstration. Aujourd'hui, `relia_documents` stocke des métadonnées saisies à la main, pas de vrai fichier. À traiter après le choix d'un hébergement conforme HDS (déjà noté dans `CHOIX-TECHNIQUES.md`).

**D. Agenda santé externe**
Nouvelle table nécessaire (`relia_rendez_vous` ou similaire), avec des rendez-vous en dehors du séjour hospitalier (spécialistes, physiothérapie...). Raisonnablement simple à modéliser, mais absent du schéma actuel.

**H. Intégration EMS**
Suppose de repenser `relia_sejours` pour qu'un "séjour" en EMS ne ressemble pas à une hospitalisation classique (pas de bloc opératoire, une temporalité différente). Structurant, à ne pas improviser.

**I. Cercle de confiance**
Suppose une notion de rôle et de droits d'accès — donc dépend directement de l'authentification, déjà identifiée comme prochaine étape prioritaire dans `PROCHAINES-ETAPES.md`. Ne peut pas vraiment exister avant elle.

## Recommandation

Si vous voulez avancer encore avant l'entretien, **B (messagerie par service)** est le seul de cette liste qui soit à la fois fidèle à la vision et réalisable rapidement sans nouveau risque — les autres (C, D, H, I) demandent soit une vraie infrastructure (stockage de fichiers, authentification), soit une refonte de modèle plus large qu'il vaut mieux ne pas improviser sous contrainte de temps.
