import { useState, useRef, useCallback } from "react";
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
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);

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
