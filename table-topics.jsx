import { useState, useRef, useCallback } from "react";
import "./table-topics.css";

/** Set to true to show the Session History panel in the UI. */
const SHOW_SESSION_HISTORY = false;

const QUESTIONS = [
  "What is the best piece of advice you've ever received?",
  "If you could have dinner with any historical figure, who would it be and why?",
  "What's a skill you wish you had learned earlier in life?",
  "Describe your perfect day from start to finish.",
  "If you could instantly become an expert in something, what would you choose?",
  "What's the most courageous thing you've ever done?",
  "If you could change one thing about your city, what would it be?",
  "What book has had the biggest impact on your life?",
  "Tell us about a time you failed and what you learned from it.",
  "If you could travel anywhere in the world tomorrow, where would you go?",
  "What's the most interesting thing you've read or seen this week?",
  "If you had to teach a class on any topic, what would it be?",
  "What's a popular opinion you disagree with?",
  "Describe a moment that changed your perspective on something.",
  "If you could have any superpower for a day, what would you choose?",
  "What's the best compliment you've ever received?",
  "If you could solve one global problem, which would you tackle?",
  "What's a tradition you'd like to start?",
  "Tell us about someone who inspires you and why.",
  "What would you do if you had an extra hour in every day?",
  "What's the most valuable lesson you learned from your parents?",
  "If your life were a movie, what genre would it be?",
  "What's something you're passionate about that surprises people?",
  "Describe a place that feels like home to you.",
  "If you could witness any event in history, what would it be?",
  "What do you think is the most important quality in a leader?",
  "What's the best meal you've ever had?",
  "If you could give your younger self one piece of advice, what would it be?",
  "What invention do you wish existed?",
  "Tell us about a risk that paid off.",
  "What does success mean to you?",
  "If you had unlimited resources, what project would you start?",
  "What's the strangest thing you've ever experienced?",
  "How do you handle criticism?",
  "What's a goal you've recently achieved that you're proud of?",
  "If you could live in any era, which would you choose?",
  "What's the most important thing you've learned in the last year?",
  "Describe a person who made a difference in your community.",
  "If you could master any musical instrument overnight, which one?",
  "What's one thing you'd change about the education system?",
  "Tell us about your most memorable travel experience.",
  "What quality do you most admire in others?",
  "If you were president for a day, what would you do?",
  "What's the hardest decision you've ever had to make?",
  "Describe your ideal work environment.",
  "What's an unpopular food combination you love?",
  "If you could start any business, what would it be?",
  "What motivates you to get out of bed in the morning?",
  "Tell us about a hobby you picked up recently.",
  "What does the word 'freedom' mean to you?",
  "If you could only eat one cuisine for the rest of your life, what would it be?",
  "What's the most creative solution you've come up with for a problem?",
  "Describe the best team you've ever been part of.",
  "If you could have any animal as a pet, what would you choose?",
  "What technology do you think will change the world in the next decade?",
  "What's the most thoughtful gift you've ever given or received?",
  "If you could teleport to one place right now, where would you go?",
  "What's a cause you care deeply about?",
  "Tell us about a time you stepped outside your comfort zone.",
  "What would your dream house look like?",
  "If you could switch jobs with anyone for a week, who would it be?",
  "What's the best advice you've given someone?",
  "Describe your favorite season and why you love it.",
  "What's something most people don't know about you?",
  "If you could relive one day of your life, which would it be?",
  "What does 'being a good neighbor' mean to you?",
  "Tell us about a challenge you're currently facing.",
  "If you could add a subject to every school's curriculum, what would it be?",
  "What's the funniest thing that's happened to you recently?",
  "If you could eliminate one daily annoyance, what would it be?",
  "What role does gratitude play in your life?",
  "Describe a moment when you felt truly alive.",
  "If you won the lottery, what's the first thing you'd do?",
  "What's a misconception people often have about your profession?",
  "Tell us about your favorite childhood memory.",
  "What's one habit you'd like to develop?",
  "If you could bring back one cancelled TV show, which would it be?",
  "What does work-life balance mean to you?",
  "Describe your favorite way to unwind after a long day.",
  "If you could meet any fictional character, who would it be?",
  "What's the most important quality in a friend?",
  "Tell us about a time when kindness made a difference.",
  "If you could learn any language instantly, which would you choose?",
  "What's a small thing that brings you disproportionate joy?",
  "If you could redesign one everyday object, what would it be?",
  "What's the best piece of constructive criticism you've received?",
  "Describe a cultural experience that broadened your worldview.",
  "If you had a time machine, would you visit the past or the future?",
  "What does 'community' mean to you?",
  "Tell us about a mentor who shaped your life.",
  "If you could make one rule everyone had to follow, what would it be?",
  "What's the most beautiful place you've ever seen?",
  "How do you stay motivated during difficult times?",
  "If you could be famous for one thing, what would it be?",
  "What's a tradition from another culture you'd like to adopt?",
  "Tell us about a moment of unexpected joy.",
  "If you could only keep five possessions, what would they be?",
  "What's the biggest risk you've never taken but wish you had?",
  "Describe what the world might look like in 50 years.",
  "If you could have a conversation with your future self, what would you ask?",
  "What makes a house a home?",
  "Tell us about a time you changed someone's mind.",
  "If you could create a holiday, what would it celebrate?",
  "What life lesson did you learn the hard way?",
  "If you could pick up a new hobby with no cost or time barriers, what would it be?",
  "What do you think is the key to happiness?",
  "Describe a moment when you felt truly proud of yourself.",
  "If all jobs paid the same, what would you do for a living?",
  "What's the most interesting conversation you've had recently?",
  "Tell us about something you built or created.",
  "If you could fix one thing about the internet, what would it be?",
  "What does courage look like in everyday life?",
  "If you could commission any piece of art, what would it depict?",
  "What's one thing you'd want to be remembered for?",
  "Describe a meal that tells the story of your heritage.",
  "If you had to move to a new country, where would you go?",
  "What's the most surprising thing you've learned about yourself?",
  "Tell us about an act of generosity that moved you.",
  "If you could attend any event in the future, what would it be?",
  "What's your philosophy on taking risks?",
  "If you could wake up tomorrow with a new ability, what would it be?",
  "What does it mean to live with integrity?",
  "Describe a challenge that made you stronger.",
  "If you could recommend one experience to everyone, what would it be?",
];

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
    let available = QUESTIONS.map((_, i) => i).filter(i => !usedIndices.has(i));
    if (available.length === 0) {
      setUsedIndices(new Set());
      available = QUESTIONS.map((_, i) => i);
    }
    const idx = available[Math.floor(Math.random() * available.length)];
    setUsedIndices(prev => new Set(prev).add(idx));
    setQuestion(QUESTIONS[idx]);
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
