# Connecter votre base de données (sans terminal)

Même méthode que pour Pulse Qualité.

## Étape 1 — Créer les tables

**Option A — même projet Supabase que Pulse Qualité** (recommandé pour l'instant, plus simple à gérer, et prépare le lien futur entre les deux applications) : dans votre projet Supabase existant, **SQL Editor → New query**, collez le contenu de [`database/schema.sql`](../database/schema.sql), **Run**.

**Option B — un projet Supabase séparé** : créez un nouveau projet sur supabase.com, puis même procédure.

## Étape 2 — Récupérer vos clés

**Project Settings → API** → copiez **Project URL** et **Publishable key** (anciennement "anon key").

⚠️ Si vous utilisez le même projet Supabase que Pulse Qualité, ce sont **les mêmes clés** que celles déjà utilisées dans `pulse-qualite/index.html`.

## Étape 3 — Les coller dans le code

Sur GitHub, `index.html` → crayon ✏️ → tout en haut du `<script>` :

```js
const SUPABASE_URL = 'VOTRE_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'VOTRE_SUPABASE_ANON_KEY';
```

Remplacez les deux valeurs, en gardant les guillemets. **Commit changes**.

## Vérifier

En bas de la barre latérale (ou, sur téléphone, l'indicateur reste visible via le bandeau d'alerte en haut de l'écran) :
- 🟢 **"Connecté à Supabase"** → tout fonctionne
- 🔴 → un bandeau orange explique ce qui manque

## Test d'écriture réelle

1. Allez dans **Parcours**, cliquez sur un des 3 boutons "Mon ressenti"
2. Rafraîchissez la page → si la dernière réponse s'affiche toujours sous les boutons, l'écriture en base fonctionne.
