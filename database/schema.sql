-- ============================================================
-- Relia Santé — schéma de base de données (Supabase / PostgreSQL)
-- Modèle : Patients, Services, Professionnels, Séjours,
--          Messages, Ressenti (questionnaire à chaud), Événements, Documents
-- ============================================================

create table patients (
  id bigint generated always as identity primary key,
  prenom text not null,
  nom text not null,
  date_naissance date,
  email text,
  avatar text default '🧑',
  created_at timestamptz default now()
);

create table services (
  id bigint generated always as identity primary key,
  nom text not null,           -- ex: 'Chirurgie Orthopédique'
  code text                    -- ex: 'GHOL — Chirurgie'
);

create table professionnels (
  id bigint generated always as identity primary key,
  nom text not null,           -- ex: 'Dr. Martin'
  role text not null,          -- ex: 'Chirurgien', 'Infirmière', 'Physiothérapeute'
  avatar text default '🧑‍⚕️',
  en_ligne boolean default false
);

create table sejours (
  id bigint generated always as identity primary key,
  patient_id bigint references patients(id) on delete cascade,
  service_id bigint references services(id),
  chambre text,
  statut text default 'actuel' check (statut in ('actuel','termine')),
  etape_actuelle text default 'admission' check (etape_actuelle in ('admission','intervention','reeducation','retour_domicile','cloture')),
  date_admission date,
  date_intervention date,
  date_reeducation date,
  date_sortie_prevue date,
  prochaine_etape text,        -- ex: 'Consultation demain 10h'
  created_at timestamptz default now()
);

-- Table de liaison : quels professionnels suivent quel séjour
create table sejour_professionnels (
  id bigint generated always as identity primary key,
  sejour_id bigint references sejours(id) on delete cascade,
  professionnel_id bigint references professionnels(id) on delete cascade
);

create table messages (
  id bigint generated always as identity primary key,
  sejour_id bigint references sejours(id) on delete cascade,
  professionnel_id bigint references professionnels(id),  -- null si le service en général
  service_nom text,             -- ex: 'Secrétariat Chirurgie'
  expediteur text not null check (expediteur in ('patient','service')),
  contenu text not null,
  created_at timestamptz default now()
);

-- Questionnaire de satisfaction "à chaud" simplifié : le check-in "Mon ressenti"
create table ressenti_reponses (
  id bigint generated always as identity primary key,
  sejour_id bigint references sejours(id) on delete cascade,
  reponse text not null check (reponse in ('ca_va','question','besoin_aide')),
  created_at timestamptz default now()
);

-- Événements remontés par le patient ou son entourage (relié à la gestion des
-- risques de Pulse Qualité dans une prochaine étape — voir docs/LIEN-PULSE-QUALITE.md)
create table evenements (
  id bigint generated always as identity primary key,
  sejour_id bigint references sejours(id) on delete cascade,
  description text not null,
  gravite text default 'green' check (gravite in ('green','orange','red')),
  created_at timestamptz default now()
);

create table documents (
  id bigint generated always as identity primary key,
  sejour_id bigint references sejours(id) on delete cascade,
  titre text not null,
  categorie text default 'Compte-rendus' check (categorie in ('Compte-rendus','Ordonnances','Résultats','Sortie')),
  taille_kb int,
  date_doc date,
  created_at timestamptz default now()
);

-- ============================================================
-- Sécurité : comme pour Pulse Qualité, pas de comptes utilisateurs
-- pour l'instant (V0.1 démonstration). Accès public en lecture/écriture
-- via la clé publique, à restreindre avant toute vraie donnée patient.
-- ============================================================
alter table patients enable row level security;
alter table services enable row level security;
alter table professionnels enable row level security;
alter table sejours enable row level security;
alter table sejour_professionnels enable row level security;
alter table messages enable row level security;
alter table ressenti_reponses enable row level security;
alter table evenements enable row level security;
alter table documents enable row level security;

create policy "public read/write patients" on patients for all using (true) with check (true);
create policy "public read/write services" on services for all using (true) with check (true);
create policy "public read/write professionnels" on professionnels for all using (true) with check (true);
create policy "public read/write sejours" on sejours for all using (true) with check (true);
create policy "public read/write sejour_professionnels" on sejour_professionnels for all using (true) with check (true);
create policy "public read/write messages" on messages for all using (true) with check (true);
create policy "public read/write ressenti_reponses" on ressenti_reponses for all using (true) with check (true);
create policy "public read/write evenements" on evenements for all using (true) with check (true);
create policy "public read/write documents" on documents for all using (true) with check (true);

-- ============================================================
-- Données de démonstration (reprennent le prototype visuel fourni)
-- ============================================================

insert into patients (prenom, nom, date_naissance, email, avatar) values
('Nathalie', 'D.', '1982-05-14', 'n.dhulster@email.com', '👩🏾');

insert into services (nom, code) values
('Chirurgie Orthopédique', 'GHOL — Chirurgie');

insert into professionnels (nom, role, avatar, en_ligne) values
('Dr. Martin', 'Chirurgien', '👨‍⚕️', true),
('Mme. Lefebvre', 'Infirmière', '👩‍⚕️', true),
('Mr. Dubois', 'Physiothérapeute', '🧑‍⚕️', false),
('Secrétariat Chirurgie', 'Secrétariat', '🧑‍💼', true);

insert into sejours (patient_id, service_id, chambre, statut, etape_actuelle, date_admission, date_intervention, date_reeducation, date_sortie_prevue, prochaine_etape) values
(1, 1, '214', 'actuel', 'reeducation', '2026-10-12', '2026-10-13', '2026-10-16', '2026-10-18', 'Consultation demain 10h');

insert into sejour_professionnels (sejour_id, professionnel_id) values
(1,1), (1,2), (1,3);

insert into messages (sejour_id, professionnel_id, service_nom, expediteur, contenu, created_at) values
(1, 4, 'Secrétariat Chirurgie', 'service', 'Votre dossier d''admission est complet.', now() - interval '2 days'),
(1, 4, 'Secrétariat Chirurgie', 'service', 'Bonjour Nathalie, avez-vous bien reçu les consignes pour votre sortie ?', now() - interval '1 day 7 hours'),
(1, 4, 'Secrétariat Chirurgie', 'patient', 'Oui, merci. J''ai une question concernant l''ordonnance.', now() - interval '1 day 6 hours 35 minutes'),
(1, 4, 'Secrétariat Chirurgie', 'service', 'Je vous envoie le document complémentaire.', now() - interval '5 hours');

insert into evenements (sejour_id, description, gravite) values
(1, 'Douleur légère persistante au niveau du pansement', 'orange');

insert into documents (sejour_id, titre, categorie, taille_kb, date_doc) values
(1, 'Lettre de sortie - Chirurgie', 'Sortie', 1200, '2026-10-15'),
(1, 'Ordonnance post-opératoire', 'Ordonnances', 450, '2026-10-14'),
(1, 'Compte-rendu opératoire', 'Compte-rendus', 2800, '2026-10-13');
