"use client";

import { useMemo, useState } from "react";

type TrackId = "cursor" | "claude-code" | "both";

const tracks = [
  {
    id: "cursor" as const,
    title: "Track A: Cursor (Visual)",
    level: "Best for first-timers",
    audience: "Ideal for the 51 participants new to Claude Code.",
    description:
      "Use a visual editor and built-in assistant chat so you can focus on ideas, not terminal commands.",
  },
  {
    id: "claude-code" as const,
    title: "Track B: Claude Code (Terminal)",
    level: "Best for confident builders",
    audience: "Great for experienced students and fast learners.",
    description:
      "Use Claude Code in the terminal for speed and direct control while building your MVP.",
  },
  {
    id: "both" as const,
    title: "Track C: Both",
    level: "Best for advanced teams",
    audience: "Perfect for the 15 experts and hybrid workflows.",
    description:
      "Switch between Cursor for visual edits and Claude Code for rapid command-driven iteration.",
  },
];

const setupByTrack: Record<TrackId, { title: string; steps: string[]; snippets: string[] }> = {
  cursor: {
    title: "Setup for Track A (Cursor)",
    steps: [
      "Install Cursor and sign in.",
      "Redeem your Anthropic credit link before event day.",
      "Create a new folder for your hackathon project.",
      "Open the folder in Cursor and ask the assistant to scaffold your app.",
    ],
    snippets: [
      "# Optional: check Node.js version\nnode -v",
      "# Start your app after setup\nnpm install\nnpm run dev",
    ],
  },
  "claude-code": {
    title: "Setup for Track B (Claude Code)",
    steps: [
      "Install Node.js LTS and Git.",
      "Install Claude Code CLI.",
      "Redeem your Anthropic credit link before event day.",
      "Open a terminal in your project folder and start building.",
    ],
    snippets: [
      "# Install Claude Code CLI\nnpm install -g @anthropic-ai/claude-code",
      "# Start a new project folder\nmkdir my-hackathon-app && cd my-hackathon-app\nclaude",
    ],
  },
  both: {
    title: "Setup for Track C (Both)",
    steps: [
      "Install Cursor for visual editing.",
      "Install Claude Code CLI for terminal power.",
      "Redeem your Anthropic credit link before event day.",
      "Use whichever interface fits each task.",
    ],
    snippets: [
      "# Verify global CLI\nclaude --help",
      "# Typical hybrid flow\ngit init\nnpm init -y\n# open in Cursor and continue with Claude",
    ],
  },
};

const projectIdeas = [
  "Lecture Summary Buddy: paste notes, get a clean summary + quiz.",
  "Study Sprint Planner: generate a 7-day plan from exam topics.",
  "CV Bullet Improver: rewrite internship bullets with stronger impact.",
  "Email Tone Fixer: turn rough drafts into clear, polite emails.",
  "Club FAQ Bot: answer questions from a small static knowledge file.",
  "Simple Habit Coach: one daily check-in with personalized feedback.",
  "Meeting Action Extractor: pull action items from pasted notes.",
  "Idea-to-Name Generator: generate startup/app names + short taglines.",
];

const tips = [
  "Choose one feature only and make it demo-solid.",
  "Design your 30-second demo before writing code.",
  "Ship a happy path first; edge cases come later.",
  "Ask AI for tests and quick QA prompts before freeze.",
  "Use experts as setup floaters from 13:30 to 14:30.",
  "At 17:30, stop building and polish your story.",
];

const faq = [
  {
    q: "Do I need to pay for API usage?",
    a: "No. Anthropic is sponsoring credits for participants.",
  },
  {
    q: "Can beginners participate?",
    a: "Yes. Track A is designed for complete beginners with mentor support.",
  },
  {
    q: "Can I work solo?",
    a: "Yes. About 15 participants plan to go solo, and that's fully supported.",
  },
  {
    q: "When does coding actually start?",
    a: "Official hacking starts at 14:30 for everyone.",
  },
  {
    q: "What happens at code freeze?",
    a: "At 17:30, you stop adding features and focus on polish + submission prep.",
  },
  {
    q: "What if I still need a team?",
    a: "Team matching happens at 14:00 and mentors will help connect people.",
  },
];

const schedule = [
  ["13:00", "Doors open, check-in"],
  ["13:15", "Welcome + quick intros"],
  ["13:30", "Setup session - mentors help beginners"],
  ["14:00", "Team matching for solos (~40 people)"],
  ["14:30", "Hacking begins for everyone"],
  ["16:00", "Midpoint check-in"],
  ["17:30", "Code freeze - polish and prep submission"],
  ["18:00", "Submissions due"],
  ["18:00-19:00", "Judging panel reviews"],
  ["19:00", "Top 5-6 teams present"],
  ["19:30", "Winners announced"],
  ["19:30-20:00", "Networking + close"],
];

export default function HomePage() {
  const [selectedTrack, setSelectedTrack] = useState<TrackId>("cursor");
  const [copiedText, setCopiedText] = useState<string>("");

  const selectedSetup = useMemo(() => setupByTrack[selectedTrack], [selectedTrack]);

  const copySnippet = async (snippet: string) => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopiedText(snippet);
      setTimeout(() => setCopiedText(""), 1500);
    } catch {
      setCopiedText("");
    }
  };

  return (
    <main className="page">
      <section className="hero card">
        <p className="eyebrow">Erasmus AI Society x Claude Hackathon</p>
        <h1>Build with AI in 3 focused hours</h1>
        <p className="subtitle">
          Thursday, April 9, 2026 · 13:00-20:00 · Erasmus University Rotterdam
        </p>
        <p>
          Pick your comfort track, complete setup before event day, and arrive ready to build.
          Powered by Anthropic credits.
        </p>
      </section>

      <section className="card">
        <h2>Choose Your Track</h2>
        <div className="grid three">
          {tracks.map((track) => (
            <button
              key={track.id}
              className={`track ${selectedTrack === track.id ? "active" : ""}`}
              onClick={() => setSelectedTrack(track.id)}
              type="button"
            >
              <h3>{track.title}</h3>
              <p className="muted">{track.level}</p>
              <p>{track.audience}</p>
              <p>{track.description}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Setup Guide</h2>
        <p>{selectedSetup.title}</p>
        <ol>
          {selectedSetup.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <div className="grid two">
          {selectedSetup.snippets.map((snippet) => (
            <div key={snippet} className="snippetWrap">
              <pre>{snippet}</pre>
              <button onClick={() => copySnippet(snippet)} type="button">
                {copiedText === snippet ? "Copied" : "Copy"}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>How It Works</h2>
        <div className="steps">
          <span>Plan</span>
          <span>Build</span>
          <span>Preview</span>
          <span>Deploy</span>
        </div>
      </section>

      <section className="card">
        <h2>Project Ideas (Beginner Friendly)</h2>
        <ul>
          {projectIdeas.map((idea) => (
            <li key={idea}>{idea}</li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2>Quality Tips</h2>
        <ul>
          {tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2>Event Schedule</h2>
        <div className="schedule">
          {schedule.map(([time, activity]) => (
            <div key={`${time}-${activity}`} className="row">
              <strong>{time}</strong>
              <span>{activity}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>FAQ</h2>
        <div className="faqList">
          {faq.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>Erasmus AI Society x Claude Hackathon · April 9, 2026</p>
        <p>Organizer: Erasmus AI Society · Powered by Anthropic</p>
      </footer>
    </main>
  );
}
