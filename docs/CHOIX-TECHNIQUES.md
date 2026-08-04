# Choix techniques

## Écart assumé par rapport au plan initial (Vite + React)

Le README d'origine prévoyait `frontend/` en React avec Vite. Ce projet utilise à la place un fichier HTML/CSS/JavaScript autonome, comme Pulse Qualité. Raison : un délai très court avant présentation, et le besoin de publier sans terminal ni étape de build, directement via GitHub Pages.

**Ce que ça coûte** : pas de composants réutilisables, pas de typage, un seul (gros) fichier plutôt qu'une arborescence de composants — moins adapté si l'équipe grandit ou si plusieurs personnes doivent contribuer en parallèle.

**Ce que ça a permis** : livrer une application connectée à une vraie base de données, testable en quelques minutes, sans installation, pendant les jours qui précédaient un entretien.

Migrer vers React/Vite reste tout à fait possible ensuite, une fois le modèle de données et les écrans validés avec de vrais utilisateurs — voir `PROCHAINES-ETAPES.md`.

## Pas de vrai stockage de fichiers

Le module Documents enregistre uniquement des métadonnées (titre, catégorie, taille déclarée, date) — pas de vrai fichier. Stocker de vrais documents médicaux suppose un espace de stockage chiffré, conforme HDS (Hébergement de Données de Santé), ce qui dépasse le cadre d'un prototype de démonstration.

## Pas de comptes utilisateurs

Comme pour Pulse Qualité, il n'y a pas encore d'authentification : n'importe qui avec le lien et les clés voit et modifie les données du patient de démonstration. **Ce point est bloquant avant toute vraie donnée patient réelle** — voir `PROCHAINES-ETAPES.md`, l'authentification y est explicitement en premier.

## Structure du dépôt

```
relia-sante/
├── README.md
├── index.html
├── database/schema.sql
└── docs/
    ├── MODELE-DE-DONNEES.md
    ├── CHOIX-TECHNIQUES.md
    ├── CONFIGURATION-BASE-DE-DONNEES.md
    ├── LIEN-PULSE-QUALITE.md
    └── PROCHAINES-ETAPES.md
```
