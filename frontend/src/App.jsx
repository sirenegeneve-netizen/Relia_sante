import React, { useState, useRef, useEffect } from "react";
import {
  Home,
  MessageCircle,
  ClipboardList,
  Send,
  ChevronLeft,
  Paperclip,
  Bell,
  FileText,
  CalendarClock,
  TriangleAlert,
  Check,
  Smile,
  Meh,
  Frown,
} from "lucide-react";

/* ============================================================
   TOKENS
   Palette : ancré sur un contexte hospitalier — calme clinique
   (teal profond) + chaleur humaine (corail) plutôt que le
   duo crème/terracotta ou le noir/néon par défaut.
   Display : Fraunces (chaleur, caractère, mais posé)
   UI/Corps : IBM Plex Sans (clinique, lisible, data-friendly)
   Mono : IBM Plex Mono (horodatages, identifiants)
   Signature : le "fil du parcours" — une ligne continue qui
   traverse le statut du séjour, littéralement la continuité
   de soins que le produit promet.
============================================================ */

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
`;

const TOKENS = {
  bg: "#EEF3F0",
  surface: "#FFFFFF",
  ink: "#152B2A",
  inkSoft: "#4B615F",
  primary: "#2B6B63",
  primaryDeep: "#1C4A44",
  accent: "#E2734A",
  accentSoft: "#F4DCCF",
  sage: "#9FC6B4",
  line: "#DCE6E1",
  danger: "#C2543A",
};

const STAGES = [
  { key: "preadmission", label: "Préadmission" },
  { key: "admission", label: "Admission" },
  { key: "hospitalisation", label: "Hospitalisation" },
  { key: "sortie", label: "Sortie" },
  { key: "domicile", label: "Retour à domicile" },
  { key: "cloture", label: "Clôture" },
];

const CURRENT_STAGE_INDEX = 2; // "Hospitalisation" — état de démo

/* ============================================================
   FIL DU PARCOURS — signature visuelle
============================================================ */
function ParcoursThread({ currentIndex }) {
  return (
    <div style={{ padding: "18px 20px 14px" }}>
      <div
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.12em",
          color: "rgba(255,255,255,0.65)",
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        Votre parcours
      </div>
      <div style={{ position: "relative", height: 34 }}>
        <svg
          width="100%"
          height="34"
          viewBox="0 0 320 34"
          preserveAspectRatio="none"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <line
            x1="16"
            y1="17"
            x2="304"
            y2="17"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="2"
          />
          <line
            x1="16"
            y1="17"
            x2={16 + (304 - 16) * (currentIndex / (STAGES.length - 1))}
            y2="17"
            stroke={TOKENS.accent}
            strokeWidth="2"
          />
        </svg>
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          {STAGES.map((s, i) => {
            const done = i < currentIndex;
            const active = i === currentIndex;
            return (
              <div
                key={s.key}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: 18,
                }}
                title={s.label}
              >
                <div
                  style={{
                    width: active ? 14 : 10,
                    height: active ? 14 : 10,
                    borderRadius: "50%",
                    background: active
                      ? TOKENS.accent
                      : done
                      ? "rgba(255,255,255,0.9)"
                      : "rgba(255,255,255,0.35)",
                    border: active ? "3px solid rgba(226,115,74,0.35)" : "none",
                    marginTop: active ? 3 : 5,
                    boxSizing: "content-box",
                    transition: "all .2s ease",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 6,
        }}
      >
        <span
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 11,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          Admission
        </span>
        <span
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 12,
            fontWeight: 600,
            color: "#fff",
          }}
        >
          {STAGES[currentIndex].label}
        </span>
        <span
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 11,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          Domicile
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   ÉCRAN 1 — TABLEAU DE BORD PATIENT
============================================================ */
function DashboardScreen({ goTo }) {
  return (
    <div style={{ height: "100%", overflowY: "auto", background: TOKENS.bg }}>
      <div
        style={{
          background: `linear-gradient(160deg, ${TOKENS.primaryDeep}, ${TOKENS.primary})`,
          borderRadius: "0 0 22px 22px",
          paddingTop: 22,
        }}
      >
        <div style={{ padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 12,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Bonjour,
            </div>
            <div
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 24,
                fontWeight: 500,
                color: "#fff",
              }}
            >
              Élise Marchand
            </div>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                color: "rgba(255,255,255,0.55)",
                marginTop: 2,
              }}
            >
              Séjour n° 24-08123 · Chir. orthopédique
            </div>
          </div>
          <button
            aria-label="Notifications"
            style={{
              background: "rgba(255,255,255,0.14)",
              border: "none",
              borderRadius: 12,
              width: 38,
              height: 38,
              display: "grid",
              placeItems: "center",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <Bell size={17} />
          </button>
        </div>
        <ParcoursThread currentIndex={CURRENT_STAGE_INDEX} />
      </div>

      <div style={{ padding: "18px 20px 100px", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Carte alerte action requise */}
        <div
          style={{
            background: TOKENS.accentSoft,
            border: `1px solid ${TOKENS.accent}33`,
            borderRadius: 16,
            padding: "14px 16px",
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              background: TOKENS.accent,
              borderRadius: 10,
              width: 34,
              height: 34,
              flexShrink: 0,
              display: "grid",
              placeItems: "center",
            }}
          >
            <TriangleAlert size={17} color="#fff" />
          </div>
          <div>
            <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 600, fontSize: 14, color: TOKENS.ink }}>
              Consentement à signer
            </div>
            <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12.5, color: TOKENS.inkSoft, marginTop: 2 }}>
              Formulaire d'anesthésie en attente de votre validation.
            </div>
          </div>
        </div>

        <SectionLabel>Aujourd'hui</SectionLabel>

        <InfoCard
          icon={<FileText size={17} color={TOKENS.primary} />}
          title="Examen prévu — 14h30"
          subtitle="Bilan sanguin de contrôle, à jeun non requis"
        />
        <InfoCard
          icon={<CalendarClock size={17} color={TOKENS.primary} />}
          title="Passage du chirurgien"
          subtitle="Dr. Kassovitz — visite estimée entre 16h et 17h"
        />

        <SectionLabel>Actions rapides</SectionLabel>

        <div style={{ display: "flex", gap: 10 }}>
          <QuickAction
            icon={<TriangleAlert size={18} color={TOKENS.danger} />}
            label="Signaler un besoin"
            onClick={() => {}}
          />
          <QuickAction
            icon={<MessageCircle size={18} color={TOKENS.primary} />}
            label="Écrire au service"
            onClick={() => goTo("messages")}
          />
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 10.5,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: TOKENS.inkSoft,
        marginTop: 4,
      }}
    >
      {children}
    </div>
  );
}

function InfoCard({ icon, title, subtitle }) {
  return (
    <div
      style={{
        background: TOKENS.surface,
        borderRadius: 16,
        padding: "14px 16px",
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        border: `1px solid ${TOKENS.line}`,
      }}
    >
      <div
        style={{
          background: "#EAF2EF",
          borderRadius: 10,
          width: 34,
          height: 34,
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 600, fontSize: 13.5, color: TOKENS.ink }}>
          {title}
        </div>
        <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12.5, color: TOKENS.inkSoft, marginTop: 2 }}>
          {subtitle}
        </div>
      </div>
    </div>
  );
}

function QuickAction({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        background: TOKENS.surface,
        border: `1px solid ${TOKENS.line}`,
        borderRadius: 16,
        padding: "14px 10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
      }}
    >
      {icon}
      <span
        style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 11.5,
          fontWeight: 500,
          color: TOKENS.ink,
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        {label}
      </span>
    </button>
  );
}

/* ============================================================
   ÉCRAN 2 — MESSAGERIE SÉCURISÉE
============================================================ */
function MessagesScreen() {
  const [messages, setMessages] = useState([
    {
      from: "service",
      text: "Bonjour Mme Marchand, l'équipe de chirurgie orthopédique est à votre écoute. Comment vous sentez-vous ce matin ?",
      time: "08:42",
    },
    {
      from: "patient",
      text: "Bonjour, j'ai encore un peu de douleur au niveau du genou depuis cette nuit.",
      time: "08:47",
    },
    {
      from: "service",
      text: "Merci pour l'information. L'infirmière de garde passe vous voir avant 9h30 pour ajuster le traitement.",
      time: "08:49",
    },
  ]);
  const [draft, setDraft] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function send() {
    if (!draft.trim()) return;
    setMessages((m) => [
      ...m,
      { from: "patient", text: draft.trim(), time: "à l'instant" },
    ]);
    setDraft("");
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: TOKENS.bg }}>
      <div
        style={{
          background: TOKENS.surface,
          borderBottom: `1px solid ${TOKENS.line}`,
          padding: "16px 18px 14px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: TOKENS.primary,
            color: "#fff",
            display: "grid",
            placeItems: "center",
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          CO
        </div>
        <div>
          <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 600, fontSize: 14, color: TOKENS.ink }}>
            Service Chirurgie Orthopédique
          </div>
          <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 11.5, color: TOKENS.sage === "" ? "" : "#3E8F73" }}>
            ● Répond généralement sous 30 min
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 10px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div
          style={{
            alignSelf: "center",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10.5,
            color: TOKENS.inkSoft,
            background: "#E4ECE8",
            padding: "3px 10px",
            borderRadius: 20,
          }}
        >
          Aujourd'hui
        </div>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.from === "patient" ? "flex-end" : "flex-start",
              maxWidth: "78%",
            }}
          >
            <div
              style={{
                background: m.from === "patient" ? TOKENS.primary : TOKENS.surface,
                color: m.from === "patient" ? "#fff" : TOKENS.ink,
                border: m.from === "patient" ? "none" : `1px solid ${TOKENS.line}`,
                borderRadius: m.from === "patient" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                padding: "10px 13px",
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 13.5,
                lineHeight: 1.4,
              }}
            >
              {m.text}
            </div>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 10,
                color: TOKENS.inkSoft,
                marginTop: 3,
                textAlign: m.from === "patient" ? "right" : "left",
              }}
            >
              {m.time}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div
        style={{
          background: TOKENS.surface,
          borderTop: `1px solid ${TOKENS.line}`,
          padding: 12,
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}
      >
        <button
          aria-label="Joindre un fichier"
          style={{
            border: "none",
            background: "none",
            color: TOKENS.inkSoft,
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
            width: 34,
            height: 34,
          }}
        >
          <Paperclip size={18} />
        </button>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Écrire un message..."
          style={{
            flex: 1,
            border: `1px solid ${TOKENS.line}`,
            background: TOKENS.bg,
            borderRadius: 20,
            padding: "9px 15px",
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 13.5,
            color: TOKENS.ink,
            outline: "none",
          }}
        />
        <button
          onClick={send}
          aria-label="Envoyer"
          style={{
            border: "none",
            background: TOKENS.primary,
            color: "#fff",
            borderRadius: "50%",
            width: 36,
            height: 36,
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   ÉCRAN 3 — QUESTIONNAIRE DE SATISFACTION À CHAUD
============================================================ */
const QUESTIONS = [
  { key: "douleur", text: "Votre douleur a-t-elle été prise en compte rapidement ?" },
  { key: "ecoute", text: "L'équipe a-t-elle été à l'écoute de vos besoins ?" },
  { key: "confort", text: "Comment jugez-vous le confort de votre chambre ?" },
  { key: "clarte", text: "Les informations reçues étaient-elles claires ?" },
];

const MOODS = [
  { key: "bad", icon: Frown, label: "Pas satisfait", color: TOKENS.danger },
  { key: "mid", icon: Meh, label: "Moyen", color: "#D19A3D" },
  { key: "good", icon: Smile, label: "Satisfait", color: TOKENS.primary },
];

function QuestionnaireScreen() {
  const [answers, setAnswers] = useState({});
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = QUESTIONS.every((q) => answers[q.key]);

  if (submitted) {
    return (
      <div
        style={{
          height: "100%",
          background: TOKENS.bg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 30,
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 62,
            height: 62,
            borderRadius: "50%",
            background: TOKENS.primary,
            display: "grid",
            placeItems: "center",
            marginBottom: 18,
          }}
        >
          <Check size={28} color="#fff" />
        </div>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 21, color: TOKENS.ink, fontWeight: 500 }}>
          Merci pour votre retour
        </div>
        <div
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 13,
            color: TOKENS.inkSoft,
            marginTop: 8,
            maxWidth: 240,
          }}
        >
          Votre réponse a été transmise à l'équipe qualité et sera prise en compte dans l'amélioration du service.
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100%", overflowY: "auto", background: TOKENS.bg }}>
      <div style={{ padding: "20px 20px 6px" }}>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: TOKENS.primary }}>
          Évaluation à chaud
        </div>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 500, color: TOKENS.ink, marginTop: 4 }}>
          Comment se passe votre séjour ?
        </div>
        <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12.5, color: TOKENS.inkSoft, marginTop: 4 }}>
          4 questions rapides — moins d'une minute
        </div>
      </div>

      <div style={{ padding: "14px 20px 100px", display: "flex", flexDirection: "column", gap: 16 }}>
        {QUESTIONS.map((q) => (
          <div
            key={q.key}
            style={{
              background: TOKENS.surface,
              borderRadius: 16,
              padding: "16px 16px 14px",
              border: `1px solid ${TOKENS.line}`,
            }}
          >
            <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 600, fontSize: 13.5, color: TOKENS.ink, marginBottom: 12 }}>
              {q.text}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
              {MOODS.map((mood) => {
                const Icon = mood.icon;
                const selected = answers[q.key] === mood.key;
                return (
                  <button
                    key={mood.key}
                    onClick={() =>
                      setAnswers((a) => ({ ...a, [q.key]: mood.key }))
                    }
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 5,
                      padding: "9px 4px",
                      borderRadius: 12,
                      border: selected ? `1.5px solid ${mood.color}` : "1.5px solid transparent",
                      background: selected ? `${mood.color}14` : "#F5F7F5",
                      cursor: "pointer",
                    }}
                  >
                    <Icon size={20} color={selected ? mood.color : TOKENS.inkSoft} />
                    <span
                      style={{
                        fontFamily: "'IBM Plex Sans', sans-serif",
                        fontSize: 10,
                        color: selected ? mood.color : TOKENS.inkSoft,
                        fontWeight: selected ? 600 : 400,
                        textAlign: "center",
                      }}
                    >
                      {mood.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div>
          <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 600, fontSize: 13, color: TOKENS.ink, marginBottom: 8 }}>
            Un commentaire à ajouter ? (facultatif)
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Votre remarque..."
            rows={3}
            style={{
              width: "100%",
              boxSizing: "border-box",
              border: `1px solid ${TOKENS.line}`,
              borderRadius: 12,
              padding: "10px 12px",
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 13,
              color: TOKENS.ink,
              resize: "none",
              outline: "none",
              background: TOKENS.surface,
            }}
          />
        </div>

        <button
          disabled={!allAnswered}
          onClick={() => setSubmitted(true)}
          style={{
            border: "none",
            borderRadius: 14,
            padding: "14px",
            background: allAnswered ? TOKENS.primary : "#C4D2CD",
            color: "#fff",
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontWeight: 600,
            fontSize: 14,
            cursor: allAnswered ? "pointer" : "not-allowed",
          }}
        >
          Envoyer mon évaluation
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   NAVIGATION + FRAME
============================================================ */
const TABS = [
  { key: "dashboard", label: "Accueil", icon: Home },
  { key: "messages", label: "Messages", icon: MessageCircle },
  { key: "survey", label: "Avis", icon: ClipboardList },
];

export default function App() {
  const [tab, setTab] = useState("dashboard");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#DCE4DF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        fontFamily: "'IBM Plex Sans', sans-serif",
      }}
    >
      <style>{FONT_IMPORT}</style>

      <div
        style={{
          width: 380,
          height: 760,
          background: "#0B1F1D",
          borderRadius: 42,
          padding: 12,
          boxShadow: "0 30px 60px -20px rgba(11,31,29,0.45)",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: TOKENS.bg,
            borderRadius: 30,
            overflow: "hidden",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* status bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 6,
              zIndex: 5,
            }}
          />
          <div style={{ flex: 1, minHeight: 0 }}>
            {tab === "dashboard" && <DashboardScreen goTo={setTab} />}
            {tab === "messages" && <MessagesScreen />}
            {tab === "survey" && <QuestionnaireScreen />}
          </div>

          {/* bottom nav */}
          <div
            style={{
              background: TOKENS.surface,
              borderTop: `1px solid ${TOKENS.line}`,
              display: "flex",
              padding: "8px 10px 12px",
            }}
          >
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  style={{
                    flex: 1,
                    background: "none",
                    border: "none",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    padding: "6px 0",
                    cursor: "pointer",
                  }}
                >
                  <Icon
                    size={20}
                    color={active ? TOKENS.primary : TOKENS.inkSoft}
                    strokeWidth={active ? 2.4 : 1.8}
                  />
                  <span
                    style={{
                      fontSize: 10.5,
                      fontWeight: active ? 600 : 400,
                      color: active ? TOKENS.primary : TOKENS.inkSoft,
                    }}
                  >
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
