import { useState, useRef, useCallback, useEffect } from "react";
import { QUESTION_TEXTS } from "./table-topics-questions.js";
import "./table-topics.css";

/** Set to true to show the Session History panel in the UI. */
const SHOW_SESSION_HISTORY = false;

function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

function getZone(ms) {
  const sec = ms / 1000;
  if (sec < 60) return "under";
  if (sec < 90) return "okay";
  if (sec <= 120) return "perfect";
  return "over";
}

function getZoneLabel(zone) {
  return { under: "Under 1:00", okay: "1:00 – 1:30", perfect: "1:30 – 2:00", over: "Over 2:00" }[zone];
}

function getZoneColor(zone) {
  return { under: "#FF8A04", okay: "#A7E12A", perfect: "#00BC26", over: "#FF8A04" }[zone];
}

const TOTAL_BAR_DURATION = 150;

function TimerBar({ elapsed }) {
  const pct = Math.min((elapsed / 1000 / TOTAL_BAR_DURATION) * 100, 100);
  const zone60 = (60 / TOTAL_BAR_DURATION) * 100;
  const zone90 = (90 / TOTAL_BAR_DURATION) * 100;
  const zone120 = (120 / TOTAL_BAR_DURATION) * 100;
  const zone = getZone(elapsed);
  const fillColor = getZoneColor(zone);

  return (
    <div className="timer-bar">
      <div className="timer-bar-labels">
        <span>0:00</span><span>0:30</span><span>1:00</span><span>1:30</span><span>2:00</span><span>2:30</span>
      </div>
      <div className="timer-bar-track">
        {[zone60, zone90, zone120].map((z, i) => (
          <div key={i} className="timer-bar-marker" style={{ left: `${z}%` }} />
        ))}
        <div
          className="timer-bar-fill"
          style={{ width: `${pct}%`, background: fillColor }}
        />
      </div>
      <div className="timer-bar-goal">
        {zone === "perfect" ? "Goal" : "\u00A0"}
      </div>
    </div>
  );
}

function SpeakingIndicator() {
  return (
    <div className="speaking-indicator">
      <div className="speaking-indicator-bars">
        {[0, 1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="speaking-indicator-bar"
            style={{ animation: `speakBar 1.2s ease-in-out ${i * 0.15}s infinite` }}
          />
        ))}
      </div>
      <span className="speaking-indicator-label">Speaking</span>
    </div>
  );
}

function HelpCircleIcon() {
  return (
    <svg
      className="about-icon-svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function AboutModal({ open, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = e => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="about-backdrop" onClick={onClose} role="presentation">
      <div
        className="about-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-title"
        onClick={e => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="about-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 id="about-title" className="about-title">
          About
        </h2>

        <div className="about-body">
          <section className="about-section">
            <h3 className="about-heading">What is Table Topics?</h3>
            <p>
              Table Topics is an impromptu speaking exercise popularized by Toastmasters
              International. You&apos;re given a random question and challenged to deliver a
              thoughtful, structured response on the spot — typically in one to two minutes. The
              goal is to practice thinking on your feet, organizing your ideas quickly, and speaking
              with clarity and confidence. With daily practice, you&apos;ll notice improvements not
              just in public speaking, but in everyday conversations, job interviews, and any
              situation where you need to articulate your thoughts under pressure.
            </p>
          </section>

          <section className="about-section">
            <h3 className="about-heading">Privacy First</h3>
            <p>
              This app does not record your voice. Your practice sessions are entirely private —
              just you and the question.
            </p>
          </section>

          <section className="about-section">
            <h3 className="about-heading">Tips for Better Responses</h3>
            <ul className="about-list">
              <li>
                <strong>Stay on topic if you can, but pivoting is okay.</strong> If you&apos;re
                drawing a blank, don&apos;t freeze — think of something related and talk about that
                instead. It&apos;s perfectly fine to shift to a slightly different angle that&apos;s
                easier to answer. The important thing is to keep speaking with confidence. Most
                listeners won&apos;t even notice the pivot.
              </li>
              <li>
                <strong>Use the OREO technique.</strong> Structure your answer as{" "}
                <em>Opinion → Reason → Example(s) → Opinion</em>. Start by stating your position,
                explain why you hold it, support it with a specific example or story, then restate
                your opinion to wrap up cleanly.
              </li>
              <li>
                <strong>Be specific.</strong> Vague answers are forgettable. Concrete details, real
                anecdotes, and vivid examples make your response more compelling and easier to follow.
              </li>
            </ul>
          </section>

          <section className="about-section">
            <h3 className="about-heading">2,000 Questions and Counting</h3>
            <p>
              This app draws from a database of 2,000 questions spanning a wide range of topics, so
              you&apos;ll rarely see the same prompt twice.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

function HistoryPanel({ history, onClear }) {
  if (history.length === 0) return null;
  return (
    <div className="history">
      <div className="history-header">
        <h3 className="history-title">Session History</h3>
        <button onClick={onClear} className="history-clear-btn">Clear</button>
      </div>
      <div className="history-list">
        {history.map((entry, i) => {
          const zone = getZone(entry.elapsed);
          const isGreen = zone === "perfect";
          return (
            <div key={i} className="history-entry">
              <span className={`history-time ${isGreen ? "history-time--highlight" : "history-time--muted"}`}>
                {formatTime(entry.elapsed)}
              </span>
              <span className="history-question">{entry.question}</span>
              <span className="history-zone">{getZoneLabel(zone)}</span>
            </div>
          );
        })}
      </div>
      <div className="history-summary">
        {history.filter(h => getZone(h.elapsed) === "perfect").length} / {history.length} in the green zone
      </div>
    </div>
  );
}

export default function TableTopics() {
  const [question, setQuestion] = useState("");
  const [state, setState] = useState("ready");
  const [elapsed, setElapsed] = useState(0);
  const [history, setHistory] = useState([]);
  const [usedIndices, setUsedIndices] = useState(new Set());
  const [aboutOpen, setAboutOpen] = useState(false);
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);

  const closeAbout = useCallback(() => setAboutOpen(false), []);

  const pickQuestion = useCallback(() => {
    let available = QUESTION_TEXTS.map((_, i) => i).filter(i => !usedIndices.has(i));
    if (available.length === 0) {
      setUsedIndices(new Set());
      available = QUESTION_TEXTS.map((_, i) => i);
    }
    const idx = available[Math.floor(Math.random() * available.length)];
    setUsedIndices(prev => new Set(prev).add(idx));
    setQuestion(QUESTION_TEXTS[idx]);
  }, [usedIndices]);

  const handleReveal = () => {
    pickQuestion();
    setState("revealed");
    setElapsed(0);
  };

  const tick = useCallback(() => {
    if (startTimeRef.current) {
      setElapsed(Date.now() - startTimeRef.current);
      rafRef.current = requestAnimationFrame(tick);
    }
  }, []);

  const handleStart = () => {
    startTimeRef.current = Date.now();
    setState("speaking");
    setElapsed(0);
    rafRef.current = requestAnimationFrame(tick);
  };

  const handleStop = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const finalElapsed = Date.now() - startTimeRef.current;
    setElapsed(finalElapsed);
    setState("done");
    setHistory(prev => [{ question, elapsed: finalElapsed }, ...prev]);
  };

  const handleNext = () => {
    setState("ready");
    setElapsed(0);
  };

  const zone = getZone(elapsed);

  return (
    <div className="app">
      <button
        type="button"
        className="about-open-btn"
        onClick={() => setAboutOpen(true)}
        aria-label="About Table Topics"
        title="About"
      >
        <HelpCircleIcon />
      </button>

      <AboutModal open={aboutOpen} onClose={closeAbout} />

      <div className="main-area">
        {/* Header */}
        <div className="header">
          <div className="header-overline">Impromptu Speaking Practice</div>
          <h1 className="header-title">Table Topics</h1>
          <div className="header-rule" />
        </div>

        {/* Main Card */}
        <div className="card">
          {state === "ready" && (
            <div className="ready-section">
              <div className="label">Ready for a topic?</div>
              <button onClick={handleReveal} className="btn btn--primary">
                Show Question
              </button>
            </div>
          )}

          {state === "revealed" && (
            <div className="revealed-section">
              <div className="label">Your Topic</div>
              <p className="question">{question}</p>
              <div className="btn-wrap">
                <button onClick={handleStart} className="btn btn--primary">
                  Begin
                </button>
              </div>
            </div>
          )}

          {state === "speaking" && (
            <div className="speaking-section">
              <div className="label">Your Topic</div>
              <p className="question">{question}</p>
              <SpeakingIndicator />
              <div className="btn-wrap">
                <button onClick={handleStop} className="btn btn--stop">
                  Stop
                </button>
              </div>
            </div>
          )}

          {state === "done" && (
            <div className="done-section">
              <p className="question question--small question--faded">{question}</p>
              <TimerBar elapsed={elapsed} />
              <div className="time-display" style={{ color: getZoneColor(zone) }}>
                {formatTime(elapsed)}
              </div>
              <div className="feedback">
                {zone === "perfect" ? "Right in the green zone." :
                 zone === "okay" ? "Good effort \u2014 aim for 1:30 next time." :
                 zone === "under" ? "A bit short \u2014 try developing your ideas more." :
                 "A bit long \u2014 practice tightening your message."}
              </div>
              <div className="btn-wrap">
                <button onClick={handleNext} className="btn btn--primary">
                  Next Question
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Zone Legend */}
        <div className={`zone-legend ${state === "speaking" ? "zone-legend--hidden" : ""}`}>
          {[["under", "< 1:00"], ["okay", "1:00\u20131:30"], ["perfect", "1:30\u20132:00"], ["over", "> 2:00"]].map(([z, label]) => (
            <div key={z} className="zone-legend-item">
              <div
                className={`zone-legend-dot ${z !== "perfect" ? "zone-legend-dot--round" : ""}`}
                style={{ background: getZoneColor(z) }}
              />
              <span className="zone-legend-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {SHOW_SESSION_HISTORY && (
        <HistoryPanel history={history} onClear={() => setHistory([])} />
      )}
    </div>
  );
}
