# Synapath

Plateforme d'expérience patient — accompagne le patient de la préadmission au retour à domicile, pour renforcer la qualité, la sécurité et la continuité des soins.

## État d'avancement

**v0.1** — Prototype visuel (3 écrans, données de démonstration, pas encore connecté à un backend) :
- Tableau de bord patient (parcours de soin, actions rapides)
- Messagerie sécurisée avec le service
- Questionnaire de satisfaction à chaud

## Parcours patient

Préadmission → Admission → Hospitalisation → Sortie → Retour à domicile → Clôture

## Utilisateurs

Patient, proche aidant, secrétaire, infirmier(ère), médecin, service qualité, professionnels externes (médecin traitant, infirmier libéral, pharmacien, kinésithérapeute).

## Structure du dépôt

```
synapath/
├── frontend/     # application patient (React)
├── docs/         # modèle de données, notes, maquettes
├── backend/      # à venir — API et base de données
└── README.md
```

## Prochaines étapes

- [ ] Modèle de données (Patients, Séjours, Services, Professionnels, Messages, Questionnaires, Réponses, Événements, Documents)
- [ ] Initialisation du projet frontend (Vite + React)
- [ ] Authentification
- [ ] Backend + base de données
- [ ] Tableau de bord équipe (service qualité, soignants)
