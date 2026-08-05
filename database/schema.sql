-- ============================================================
-- Relia Santé — schéma de base de données (Supabase / PostgreSQL)
-- Modèle : Patients, Services, Professionnels, Séjours,
--          Messages, Ressenti (questionnaire à chaud), Événements, Documents
--
-- Toutes les tables sont préfixées "relia_" pour ne jamais entrer en
-- conflit avec celles de Pulse Qualité si les deux applications
-- partagent le même projet Supabase.
-- ============================================================

-- Permet de relancer ce script sans erreur si les tables existent déjà
drop table if exists relia_documents cascade;
drop table if exists relia_evenements cascade;
drop table if exists relia_ressenti_reponses cascade;
drop table if exists relia_messages cascade;
drop table if exists relia_sejour_professionnels cascade;
drop table if exists relia_sejours cascade;
drop table if exists relia_professionnels cascade;
drop table if exists relia_services cascade;
drop table if exists relia_patients cascade;

create table relia_patients (
  id bigint generated always as identity primary key,
  prenom text not null,
  nom text not null,
  date_naissance date,
  email text,
  avatar text default '🧑',
  created_at timestamptz default now()
);

create table relia_services (
  id bigint generated always as identity primary key,
  nom text not null,           -- ex: 'Chirurgie Orthopédique'
  code text                    -- ex: 'GHOL — Chirurgie'
);

create table relia_professionnels (
  id bigint generated always as identity primary key,
  nom text not null,           -- ex: 'Dr. Martin'
  role text not null,          -- ex: 'Chirurgien', 'Infirmière', 'Physiothérapeute'
  avatar text default '🧑‍⚕️',
  en_ligne boolean default false
);

create table relia_sejours (
  id bigint generated always as identity primary key,
  patient_id bigint references relia_patients(id) on delete cascade,
  service_id bigint references relia_services(id),
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

-- Table de liaison : quels relia_professionnels suivent quel séjour
create table relia_sejour_professionnels (
  id bigint generated always as identity primary key,
  sejour_id bigint references relia_sejours(id) on delete cascade,
  professionnel_id bigint references relia_professionnels(id) on delete cascade
);

create table relia_messages (
  id bigint generated always as identity primary key,
  sejour_id bigint references relia_sejours(id) on delete cascade,
  professionnel_id bigint references relia_professionnels(id),  -- null si le service en général
  service_nom text,             -- ex: 'Secrétariat Chirurgie'
  expediteur text not null check (expediteur in ('patient','service')),
  contenu text not null,
  created_at timestamptz default now()
);

-- Questionnaire de satisfaction "à chaud" simplifié : le check-in "Mon ressenti"
create table relia_ressenti_reponses (
  id bigint generated always as identity primary key,
  sejour_id bigint references relia_sejours(id) on delete cascade,
  reponse text not null check (reponse in ('ca_va','question','besoin_aide')),
  created_at timestamptz default now()
);

-- Événements remontés par le patient ou son entourage (relié à la gestion des
-- risques de Pulse Qualité dans une prochaine étape — voir docs/LIEN-PULSE-QUALITE.md)
create table relia_evenements (
  id bigint generated always as identity primary key,
  sejour_id bigint references relia_sejours(id) on delete cascade,
  description text not null,
  gravite text default 'green' check (gravite in ('green','orange','red')),
  created_at timestamptz default now()
);

create table relia_documents (
  id bigint generated always as identity primary key,
  sejour_id bigint references relia_sejours(id) on delete cascade,
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
alter table relia_patients enable row level security;
alter table relia_services enable row level security;
alter table relia_professionnels enable row level security;
alter table relia_sejours enable row level security;
alter table relia_sejour_professionnels enable row level security;
alter table relia_messages enable row level security;
alter table relia_ressenti_reponses enable row level security;
alter table relia_evenements enable row level security;
alter table relia_documents enable row level security;

create policy "public read/write relia_patients" on relia_patients for all using (true) with check (true);
create policy "public read/write relia_services" on relia_services for all using (true) with check (true);
create policy "public read/write relia_professionnels" on relia_professionnels for all using (true) with check (true);
create policy "public read/write relia_sejours" on relia_sejours for all using (true) with check (true);
create policy "public read/write relia_sejour_professionnels" on relia_sejour_professionnels for all using (true) with check (true);
create policy "public read/write relia_messages" on relia_messages for all using (true) with check (true);
create policy "public read/write relia_ressenti_reponses" on relia_ressenti_reponses for all using (true) with check (true);
create policy "public read/write relia_evenements" on relia_evenements for all using (true) with check (true);
create policy "public read/write relia_documents" on relia_documents for all using (true) with check (true);

-- ============================================================
-- Données de démonstration (reprennent le prototype visuel fourni)
-- ============================================================

insert into relia_patients (prenom, nom, date_naissance, email, avatar) values
('Nathalie', 'D.', '1982-05-14', 'n.dhulster@email.com', '👩🏾');

insert into relia_services (nom, code) values
('Chirurgie Orthopédique', 'GHOL — Chirurgie');

insert into relia_professionnels (nom, role, avatar, en_ligne) values
('Dr. Martin', 'Chirurgien', '👨‍⚕️', true),
('Mme. Lefebvre', 'Infirmière', '👩‍⚕️', true),
('Mr. Dubois', 'Physiothérapeute', '🧑‍⚕️', false),
('Secrétariat Chirurgie', 'Secrétariat', '🧑‍💼', true);

insert into relia_sejours (patient_id, service_id, chambre, statut, etape_actuelle, date_admission, date_intervention, date_reeducation, date_sortie_prevue, prochaine_etape) values
(1, 1, '214', 'actuel', 'reeducation', '2026-10-12', '2026-10-13', '2026-10-16', '2026-10-18', 'Consultation demain 10h');

insert into relia_sejour_professionnels (sejour_id, professionnel_id) values
(1,1), (1,2), (1,3);

insert into relia_messages (sejour_id, professionnel_id, service_nom, expediteur, contenu, created_at) values
(1, 4, 'Secrétariat Chirurgie', 'service', 'Votre dossier d''admission est complet.', now() - interval '2 days'),
(1, 4, 'Secrétariat Chirurgie', 'service', 'Bonjour Nathalie, avez-vous bien reçu les consignes pour votre sortie ?', now() - interval '1 day 7 hours'),
(1, 4, 'Secrétariat Chirurgie', 'patient', 'Oui, merci. J''ai une question concernant l''ordonnance.', now() - interval '1 day 6 hours 35 minutes'),
(1, 4, 'Secrétariat Chirurgie', 'service', 'Je vous envoie le document complémentaire.', now() - interval '5 hours');

insert into relia_evenements (sejour_id, description, gravite) values
(1, 'Douleur légère persistante au niveau du pansement', 'orange');

insert into relia_documents (sejour_id, titre, categorie, taille_kb, date_doc) values
(1, 'Lettre de sortie - Chirurgie', 'Sortie', 1200, '2026-10-15'),
(1, 'Ordonnance post-opératoire', 'Ordonnances', 450, '2026-10-14'),
(1, 'Compte-rendu opératoire', 'Compte-rendus', 2800, '2026-10-13');
