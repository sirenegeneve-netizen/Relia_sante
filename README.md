# Relia Santé

Plateforme d'expérience patient — accompagne le patient de la préadmission au retour à domicile, pour renforcer la qualité, la sécurité et la continuité des soins.

## Parcours patient

Préadmission → Admission → Hospitalisation → Sortie → Retour à domicile → Clôture

## Utilisateurs

Patient, proche aidant, secrétaire, infirmier(ère), médecin, service qualité, professionnels externes (médecin traitant, infirmier libéral, pharmacien, kinésithérapeute).

*Cette version couvre le point de vue du patient. Le tableau de bord équipe (service qualité, soignants) est une prochaine étape — voir [`docs/PROCHAINES-ETAPES.md`](./docs/PROCHAINES-ETAPES.md).*

## État d'avancement

**v0.2 — Application connectée à une vraie base de données**, avec 5 écrans patient :
- 🏠 **Accueil** : parcours de soin en un coup d'œil, accès rapide aux modules
- 🗺️ **Parcours** : timeline visuelle du séjour, équipe soignante, check-in "Mon ressenti"
- 💬 **Messages** : messagerie sécurisée avec le service (réelle, persistée en base)
- 📄 **Documents** : coffre-fort de documents (métadonnées réelles, pas de vrai fichier stocké dans cette version)
- 👤 **Profil** : informations patient, modifiables

Déclarer un ressenti, envoyer un message, ajouter un document et modifier son profil sont de vraies actions, enregistrées dans une base partagée.

## Pourquoi ce choix technique (et pas Vite + React comme prévu initialement)

Le plan initial prévoyait un frontend React avec Vite. Compte tenu d'un délai très court avant présentation, nous avons choisi la même approche que pour Pulse Qualité : un fichier HTML autonome, connecté directement à Supabase, sans étape de build ni terminal. Ça permet d'itérer vite et de publier via GitHub Pages en quelques clics. Voir [`docs/CHOIX-TECHNIQUES.md`](./docs/CHOIX-TECHNIQUES.md) pour le détail et pour ce qu'il faudrait changer avant une vraie mise en production.

## Structure du dépôt

```
relia-sante/
├── README.md
├── index.html                  → application patient, connectée à Supabase
├── database/
│   └── schema.sql               → modèle de données complet + données de démonstration
└── docs/
    ├── MODELE-DE-DONNEES.md     → détail des entités (Patients, Séjours, Services, Professionnels, Messages, Ressenti, Événements, Documents)
    ├── CHOIX-TECHNIQUES.md      → justification des choix techniques
    ├── CONFIGURATION-BASE-DE-DONNEES.md → connecter votre base, sans terminal
    ├── LIEN-PULSE-QUALITE.md    → comment lier plus tard cette application à Pulse Qualité
    ├── VISION-STRATEGIQUE.md    → le jumeau numérique du parcours patient
    ├── EVOLUTIONS-PROPOSEES.md  → traduction de la vision en étapes concrètes
    ├── BACKLOG-FONCTIONNEL.md   → statut détaillé des 9 évolutions attendues (A à I)
    └── PROCHAINES-ETAPES.md     → authentification, tableau de bord équipe, etc.
```

## Lancer l'application

Aucune installation : ouvrez `index.html` dans un navigateur, ou publiez-le via GitHub Pages (voir `docs/CONFIGURATION-BASE-DE-DONNEES.md`).
