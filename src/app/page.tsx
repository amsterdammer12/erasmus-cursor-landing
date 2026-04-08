"use client";

import { useEffect, useMemo, useState } from "react";

type TrackId = "cursor" | "claude-code" | "both";
type OsId = "mac" | "windows";

const tracks = [
  {
    id: "cursor" as const,
    emoji: "🟢",
    title: "Track A: Cursor",
    subtitle: "I want to see everything",
    tags: ["Visual", "Beginner-friendly", "Click & see"],
    note: "Recommended default for first-time builders.",
  },
  {
    id: "claude-code" as const,
    emoji: "🟡",
    title: "Track B: Claude Code",
    subtitle: "I want the real developer experience",
    tags: ["Terminal", "Lightweight", "Pro workflow"],
    note: "Great for curious learners and faster iteration.",
  },
  {
    id: "both" as const,
    emoji: "🔴",
    title: "Track C: Both",
    subtitle: "I want full control",
    tags: ["Advanced", "Full control", "Best of both"],
    note: "Use Cursor for context and Claude Code for speed.",
  },
];

const setupByTrack: Record<TrackId, { title: string; intro: string; steps: string[] }> = {
  cursor: {
    title: "Setup for Track A (Cursor)",
    intro: "Best for complete beginners and visual learners.",
    steps: [
      "Download Cursor from cursor.com.",
      "Create a free account and sign in.",
      "Install Git and Node.js (v20+).",
      "Open Cursor -> Settings -> Models -> Anthropic API Key.",
      "Paste your key and select Sonnet 4.6.",
    ],
  },
  "claude-code": {
    title: "Setup for Track B (Claude Code)",
    intro: "Best for participants comfortable with terminal workflows.",
    steps: [
      "Open your terminal app.",
      "Install Claude Code using the command for your OS.",
      "Close and reopen terminal after install.",
      "Install Git and Node.js (v20+).",
      "Set ANTHROPIC_API_KEY and run claude.",
    ],
  },
  both: {
    title: "Setup for Track C (Both)",
    intro: "Use Cursor UI plus Claude Code in terminal for maximum control.",
    steps: [
      "Complete setup from Track A and Track B.",
      "Run Claude Code inside Cursor terminal: View -> Terminal -> claude.",
      "Switch tools based on task complexity.",
    ],
  },
};

const projectIdeas = [
  "💰 Expense Splitter - Add expenses and show who owes who",
  "📝 Meeting Notes - Paste text and get a structured summary",
  "🎯 Habit Tracker - Check off habits and track your streak",
  "🎨 Portfolio Site - Clean project cards with your work",
  "🎉 Event RSVP - Create event, share link, track RSVPs",
  "📧 Email Drafter - Describe context and get 3 options",
  "📚 Course Reviews - Submit and browse class reviews",
  "🤖 Document Q&A - Upload PDF and ask questions",
];

const tips = [
  "Start fresh conversations between features to keep AI sharp.",
  "Be specific: describe exact UI behavior and placement.",
  "Build one feature at a time, not everything at once.",
  "Commit after each working piece so rollback stays easy.",
  "Do not paste full files; AI can read your project directly.",
  "If it breaks repeatedly, start a new chat with a clearer prompt.",
];

const faq = [
  {
    q: "Do I need to know how to code?",
    a: "No. AI writes the code; you guide it with clear prompts.",
  },
  {
    q: "Which track should I choose?",
    a: "Never used terminal: Track A. Curious: Track B. Power users: Track C.",
  },
  {
    q: "What if I break something?",
    a: "Use git checkout . to revert unstaged local file changes quickly.",
  },
  {
    q: "What can I build in 3 hours?",
    a: "One core feature with a crisp 30-second demo.",
  },
  {
    q: "AI gave an error. What now?",
    a: "Start a fresh conversation and give a clearer, smaller request.",
  },
  {
    q: "How do I deploy?",
    a: "Ask your AI to deploy to Vercel; it should take only a few minutes.",
  },
  {
    q: "Do API credits cost me anything?",
    a: "No. Credits are free for participants, provided by Anthropic.",
  },
  {
    q: "Can I keep my project after the hackathon?",
    a: "Yes. It is yours to keep on GitHub and the Vercel free tier.",
  },
  {
    q: "Should I set up before event day?",
    a: "Yes. Pre-setup saves 30+ minutes and prevents day-of delays.",
  },
];

const schedule = [
  ["13:00", "Doors open, check-in"],
  ["13:15", "Welcome + quick intros"],
  ["13:30", "Setup session (mentors help beginners; ready teams start)"],
  ["14:00", "Team matching for solos"],
  ["14:30", "Hacking begins"],
  ["16:00", "Midpoint check-in"],
  ["17:30", "Code freeze - polish and prep demo"],
  ["18:00", "Submissions due"],
  ["18:00-19:00", "Judging panel review"],
  ["19:00", "Top 5-6 teams present"],
  ["19:30", "Winners announced"],
  ["19:30-20:00", "Networking"],
];

export default function HomePage() {
  const [selectedTrack, setSelectedTrack] = useState<TrackId>("cursor");
  const [selectedOs, setSelectedOs] = useState<OsId>("mac");
  const [openFaq, setOpenFaq] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [copiedText, setCopiedText] = useState<string>("");

  const selectedSetup = useMemo(() => setupByTrack[selectedTrack], [selectedTrack]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copySnippet = async (snippet: string) => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopiedText(snippet);
      setTimeout(() => setCopiedText(""), 1500);
    } catch {
      setCopiedText("");
    }
  };

  const snippetByTrack = {
    cursor: [
      {
        key: "git-check",
        label: "Check Git + Node",
        code:
          selectedOs === "mac"
            ? "git --version\nnode --version"
            : "git --version\nnode --version",
      },
    ],
    "claude-code": [
      {
        key: "claude-install",
        label: "Install Claude Code",
        code:
          selectedOs === "mac"
            ? "curl -fsSL https://claude.ai/install.sh | bash"
            : "irm https://claude.ai/install.ps1 | iex",
      },
      {
        key: "set-key",
        label: "Set API Key",
        code:
          selectedOs === "mac"
            ? 'export ANTHROPIC_API_KEY="sk-ant-your-key-here"'
            : '$env:ANTHROPIC_API_KEY="sk-ant-your-key-here"',
      },
    ],
    both: [
      {
        key: "hybrid-tip",
        label: "Run inside Cursor terminal",
        code: "claude",
      },
    ],
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const selectTrack = (trackId: TrackId) => {
    setSelectedTrack(trackId);
    scrollTo("setup");
  };

  return (
    <main className="page">
      <nav className={`topNav ${isScrolled ? "solid" : ""}`}>
        <button type="button" onClick={() => scrollTo("tracks")}>
          Tracks
        </button>
        <button type="button" onClick={() => scrollTo("setup")}>
          Setup
        </button>
        <button type="button" onClick={() => scrollTo("how")}>
          How It Works
        </button>
        <button type="button" onClick={() => scrollTo("ideas")}>
          Ideas
        </button>
        <button type="button" onClick={() => scrollTo("schedule")}>
          Schedule
        </button>
        <button type="button" onClick={() => scrollTo("faq")}>
          FAQ
        </button>
      </nav>

      <section className="hero card" id="hero">
        <p className="eyebrow">Erasmus AI Society x Claude Hackathon</p>
        <h1>Build real products with AI - no coding experience required</h1>
        <p className="subtitle">
          Thursday, April 9 · 13:00-20:00 · Erasmus University Rotterdam
        </p>
        <p>
          123 participants, three comfort tracks, one goal: everyone starts building by 14:30.
        </p>
        <div className="heroCtas">
          <button type="button" onClick={() => scrollTo("tracks")}>
            Choose Your Track
          </button>
          <a className="secondaryCta" href="#">
            Redeem Your Credits
          </a>
        </div>
        <p className="badge">Powered by Anthropic</p>
      </section>

      <section className="card" id="tracks">
        <h2>Choose Your Track</h2>
        <p className="muted">Not sure? Start with Track A. You can always switch.</p>
        <div className="grid three">
          {tracks.map((track) => (
            <article key={track.id} className={`track ${selectedTrack === track.id ? "active" : ""}`}>
              <h3>{track.title}</h3>
              <p className="muted">{track.emoji} {track.subtitle}</p>
              <p>{track.note}</p>
              <div className="tagRow">
                {track.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <button onClick={() => selectTrack(track.id)} type="button">
                Open setup tab
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="card" id="setup">
        <h2>Setup Guide</h2>
        <div className="tabRow">
          {tracks.map((track) => (
            <button
              key={track.id}
              type="button"
              className={selectedTrack === track.id ? "tab activeTab" : "tab"}
              onClick={() => setSelectedTrack(track.id)}
            >
              {track.title.replace(": ", " ")}
            </button>
          ))}
        </div>
        <div className="osRow">
          <span>OS:</span>
          <button
            type="button"
            className={selectedOs === "mac" ? "tab activeTab" : "tab"}
            onClick={() => setSelectedOs("mac")}
          >
            macOS
          </button>
          <button
            type="button"
            className={selectedOs === "windows" ? "tab activeTab" : "tab"}
            onClick={() => setSelectedOs("windows")}
          >
            Windows
          </button>
        </div>
        <p>{selectedSetup.title}</p>
        <p className="muted">{selectedSetup.intro}</p>
        <ol>
          {selectedSetup.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <div className="grid two">
          {snippetByTrack[selectedTrack].map((snippet) => (
            <div key={snippet.key} className="snippetWrap">
              <p className="snippetLabel">{snippet.label}</p>
              <pre>{snippet.code}</pre>
              <button onClick={() => copySnippet(snippet.code)} type="button">
                {copiedText === snippet.code ? "Copied" : "Copy"}
              </button>
            </div>
          ))}
        </div>
        <p className="linksLine">
          Docs:{" "}
          <a href="https://code.claude.com/docs/en/terminal-guide" target="_blank" rel="noreferrer">
            Claude Code Terminal Guide
          </a>{" "}
          ·{" "}
          <a href="https://cursor.com/docs" target="_blank" rel="noreferrer">
            Cursor Docs
          </a>
        </p>
      </section>

      <section className="card" id="how">
        <h2>How It Works</h2>
        <div className="steps flow">
          <span>1. PLAN</span>
          <span className="arrow">→</span>
          <span>2. BUILD</span>
          <span className="arrow">→</span>
          <span>3. PREVIEW</span>
          <span className="arrow">→</span>
          <span>4. DEPLOY</span>
        </div>
        <p className="muted">
          You have 3 hours. Build ONE feature. Polish it. Ship it.
        </p>
      </section>

      <section className="card" id="ideas">
        <h2>Project Ideas (Beginner Friendly)</h2>
        <ul>
          {projectIdeas.map((idea) => (
            <li key={idea}>{idea}</li>
          ))}
        </ul>
        <p className="muted">Do not see your idea? Build what you need.</p>
      </section>

      <section className="card">
        <h2>Get Better Results from AI</h2>
        <ul>
          {tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>

      <section className="card" id="schedule">
        <h2>Event Schedule</h2>
        <div className="schedule">
          {schedule.map(([time, activity]) => (
            <div
              key={`${time}-${activity}`}
              className={`row ${time === "14:30" || time === "17:30" ? "highlight" : ""}`}
            >
              <strong>{time}</strong>
              <span>{activity}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="card" id="faq">
        <h2>FAQ</h2>
        <div className="faqList">
          {faq.map((item, idx) => (
            <div key={item.q} className="faqItem">
              <button
                type="button"
                className="faqButton"
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
              >
                {item.q}
              </button>
              {openFaq === idx ? <p>{item.a}</p> : null}
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>Organized by Erasmus AI Society</p>
        <p>Powered by Anthropic</p>
        <p>
          <a href="#">Redeem credits</a> ·{" "}
          <a href="https://code.claude.com/docs/en/terminal-guide" target="_blank" rel="noreferrer">
            Claude Code docs
          </a>{" "}
          ·{" "}
          <a href="https://cursor.com/docs" target="_blank" rel="noreferrer">
            Cursor docs
          </a>
        </p>
        <p>Contact: hello@erasmusaisociety.nl · Built with Claude Code</p>
      </footer>
    </main>
  );
}
