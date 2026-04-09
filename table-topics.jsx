import { useState, useEffect, useRef, useCallback } from "react";

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
  return { under: "Under 1:00", okay: "1:00 – 1:30", perfect: "1:30 – 2:00 ★", over: "Over 2:00" }[zone];
}

function getZoneColor(zone) {
  return { under: "#d44055", okay: "#c48a12", perfect: "#1a9d55", over: "#d44055" }[zone];
}

function getZoneBg(zone) {
  return { under: "rgba(212,64,85,0.08)", okay: "rgba(196,138,18,0.08)", perfect: "rgba(26,157,85,0.08)", over: "rgba(212,64,85,0.08)" }[zone];
}

const TOTAL_BAR_DURATION = 150;

function TimerBar({ elapsed }) {
  const pct = Math.min((elapsed / 1000 / TOTAL_BAR_DURATION) * 100, 100);
  const zone60 = (60 / TOTAL_BAR_DURATION) * 100;
  const zone90 = (90 / TOTAL_BAR_DURATION) * 100;
  const zone120 = (120 / TOTAL_BAR_DURATION) * 100;
  const zone = getZone(elapsed);

  return (
    <div style={{ width: "100%", marginTop: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: "#9a9aaa", marginBottom: 6, padding: "0 2px" }}>
        <span>0:00</span><span>0:30</span><span>1:00</span><span>1:30</span><span>2:00</span><span>2:30</span>
      </div>
      <div style={{ position: "relative", width: "100%", height: 28, borderRadius: 6, overflow: "hidden", background: "#edeef2" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${zone60}%`, background: "rgba(212,64,85,0.06)" }} />
        <div style={{ position: "absolute", left: `${zone60}%`, top: 0, bottom: 0, width: `${zone90 - zone60}%`, background: "rgba(196,138,18,0.06)" }} />
        <div style={{ position: "absolute", left: `${zone90}%`, top: 0, bottom: 0, width: `${zone120 - zone90}%`, background: "rgba(26,157,85,0.1)" }} />
        <div style={{ position: "absolute", left: `${zone120}%`, top: 0, bottom: 0, right: 0, background: "rgba(212,64,85,0.06)" }} />
        {[zone60, zone90, zone120].map((z, i) => (
          <div key={i} style={{ position: "absolute", left: `${z}%`, top: 0, bottom: 0, width: 1, background: "rgba(0,0,0,0.08)" }} />
        ))}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: `${pct}%`, borderRadius: 6,
          background: getZoneColor(zone),
          transition: "width 0.2s ease-out",
        }} />
        <div style={{
          position: "absolute", left: `${zone90}%`, right: `${100 - zone120}%`,
          top: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 8, fontFamily: "'JetBrains Mono', monospace", color: "rgba(26,157,85,0.5)",
          letterSpacing: 1.5, textTransform: "uppercase", pointerEvents: "none", fontWeight: 600,
        }}>GOAL</div>
      </div>
    </div>
  );
}

function SpeakingIndicator() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, marginTop: 36, marginBottom: 12 }}>
      <div style={{ display: "flex", gap: 6, alignItems: "center", height: 32 }}>
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} style={{
            width: 4, borderRadius: 2, background: "#4a5ae8",
            animation: `speakBar 1.2s ease-in-out ${i * 0.15}s infinite`,
          }} />
        ))}
      </div>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#8a8a9a",
        letterSpacing: 1.5, textTransform: "uppercase",
      }}>Speaking…</span>
    </div>
  );
}

function HistoryPanel({ history, onClear }) {
  if (history.length === 0) return null;
  return (
    <div style={{ marginTop: 48, width: "100%", maxWidth: 600 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h3 style={{ margin: 0, fontFamily: "'Source Serif 4', serif", fontSize: 18, color: "#3a3a4a", fontWeight: 600 }}>Session History</h3>
        <button onClick={onClear} style={{
          background: "none", border: "1px solid #dcdce4", borderRadius: 6,
          color: "#8a8a9a", fontSize: 11, padding: "4px 12px", cursor: "pointer",
          fontFamily: "'JetBrains Mono', monospace",
        }}>Clear</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {history.map((entry, i) => {
          const zone = getZone(entry.elapsed);
          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
              background: getZoneBg(zone), borderRadius: 8, borderLeft: `3px solid ${getZoneColor(zone)}`,
            }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 15, color: getZoneColor(zone),
                fontWeight: 600, minWidth: 48,
              }}>{formatTime(entry.elapsed)}</span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#5a5a6a",
                flex: 1, lineHeight: 1.4,
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>{entry.question}</span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: getZoneColor(zone),
                opacity: 0.8, textTransform: "uppercase", letterSpacing: 0.5, flexShrink: 0,
              }}>{getZoneLabel(zone)}</span>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 14, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#8a8a9a", textAlign: "center" }}>
        {history.filter(h => getZone(h.elapsed) === "perfect").length} / {history.length} in the green zone
      </div>
    </div>
  );
}

export default function TableTopics() {
  const [question, setQuestion] = useState("");
  const [state, setState] = useState("ready"); // ready -> revealed -> speaking -> done
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

  const btnBase = {
    padding: "14px 44px", borderRadius: 10, cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600,
    letterSpacing: 0.3, transition: "transform 0.15s ease",
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "flex-start", padding: "48px 24px",
      background: "linear-gradient(170deg, #f7f7fb 0%, #eef0f5 50%, #f7f7fb 100%)",
      color: "#2a2a3a", fontFamily: "'DM Sans', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h1 style={{
          fontFamily: "'Source Serif 4', serif", fontSize: 38, fontWeight: 700,
          margin: 0, letterSpacing: -0.5, color: "#1a1a2e",
        }}>Table Topics</h1>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#8a8a9a", marginTop: 6, letterSpacing: 1.5, textTransform: "uppercase" }}>
          Impromptu Speaking Practice
        </p>
      </div>

      {/* Main Card */}
      <div style={{
        width: "100%", maxWidth: 600, padding: "40px 36px", borderRadius: 16,
        background: "#fff", border: "1px solid rgba(0,0,0,0.06)", textAlign: "center",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 30px rgba(0,0,0,0.04)",
        minHeight: 220, display: "flex", flexDirection: "column", justifyContent: "center",
      }}>

        {state === "ready" && (
          <div style={{ padding: "20px 0" }}>
            <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: "#9a9aaa", textTransform: "uppercase", letterSpacing: 2, marginBottom: 24 }}>
              Ready for a topic?
            </div>
            <button onClick={handleReveal} style={{
              ...btnBase, border: "none",
              background: "#1a1a2e", color: "#fff",
              boxShadow: "0 2px 12px rgba(26,26,46,0.18)",
            }}
              onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
              onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
            >Show Question</button>
          </div>
        )}

        {state === "revealed" && (
          <>
            <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: "#9a9aaa", textTransform: "uppercase", letterSpacing: 2, marginBottom: 18 }}>
              Your Topic
            </div>
            <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: 22, lineHeight: 1.55, color: "#1a1a2e", margin: 0, fontWeight: 500 }}>
              {question}
            </p>
            <div style={{ marginTop: 32 }}>
              <button onClick={handleStart} style={{
                ...btnBase, border: "none",
                background: "linear-gradient(135deg, #4a5ae8, #5a6af0)", color: "#fff",
                boxShadow: "0 4px 20px rgba(74,90,232,0.25)",
              }}
                onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
                onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
              >Start Speaking</button>
            </div>
          </>
        )}

        {state === "speaking" && (
          <>
            <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: "#9a9aaa", textTransform: "uppercase", letterSpacing: 2, marginBottom: 18 }}>
              Your Topic
            </div>
            <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: 22, lineHeight: 1.55, color: "#1a1a2e", margin: 0, fontWeight: 500 }}>
              {question}
            </p>
            <SpeakingIndicator />
            <div style={{ marginTop: 8 }}>
              <button onClick={handleStop} style={{
                ...btnBase, background: "rgba(212,64,85,0.05)",
                border: "2px solid #d44055", color: "#d44055",
                animation: "pulse 2s ease-in-out infinite",
              }}>Stop</button>
            </div>
          </>
        )}

        {state === "done" && (
          <>
            <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: "#9a9aaa", textTransform: "uppercase", letterSpacing: 2, marginBottom: 18 }}>
              Your Topic
            </div>
            <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: 20, lineHeight: 1.55, color: "#1a1a2e", margin: 0, fontWeight: 500, opacity: 0.5 }}>
              {question}
            </p>
            <TimerBar elapsed={elapsed} />
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 54, fontWeight: 600,
              color: getZoneColor(zone), marginTop: 24, letterSpacing: 2,
            }}>{formatTime(elapsed)}</div>
            <div style={{
              marginTop: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
              color: getZoneColor(zone), opacity: 0.85,
            }}>
              {zone === "perfect" ? "Perfect! Right in the green zone." :
               zone === "okay" ? "Good effort — aim for 1:30 next time." :
               zone === "under" ? "A bit short — try developing your ideas more." :
               "A bit long — practice tightening your message."}
            </div>
            <div style={{ marginTop: 28 }}>
              <button onClick={handleNext} style={{
                ...btnBase, border: "none",
                background: "linear-gradient(135deg, #4a5ae8, #5a6af0)", color: "#fff",
                boxShadow: "0 4px 20px rgba(74,90,232,0.25)",
              }}>Next Question</button>
            </div>
          </>
        )}
      </div>

      {/* Zone Legend */}
      {state !== "speaking" && (
        <div style={{ display: "flex", gap: 16, marginTop: 24, flexWrap: "wrap", justifyContent: "center" }}>
          {[["under", "< 1:00"], ["okay", "1:00–1:30"], ["perfect", "1:30–2:00 ★"], ["over", "> 2:00"]].map(([z, label]) => (
            <div key={z} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: getZoneColor(z) }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#8a8a9a" }}>{label}</span>
            </div>
          ))}
        </div>
      )}

      <HistoryPanel history={history} onClear={() => setHistory([])} />

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,64,85,0.25); }
          50% { box-shadow: 0 0 0 10px rgba(212,64,85,0); }
        }
        @keyframes speakBar {
          0%, 100% { height: 6px; }
          50% { height: 28px; }
        }
      `}</style>
    </div>
  );
}
