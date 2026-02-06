import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function App() {
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const extractMinutes = async () => {
    setLoading(true);
    setResult(null);

    const res = await fetch(
      "http://127.0.0.1:8000/extract/final",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      }
    );

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <h2>MeetWise</h2>
        <div className="icons">
          <a
            href="https://github.com/kshitigambhir"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/kshiti-gambhir-bb5b8827b/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
          </a>
        </div>
      </header>

      {/* MAIN */}
      <main className="page">
        <div className="card">
          <h1>Turn meetings into clear decisions</h1>
          <p className="subtitle">
            Paste a meeting transcript and get decisions, action items, and blockers.
          </p>

          <label>Meeting Transcript</label>
          <textarea
            placeholder="Paste meeting transcript here..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />

          <button onClick={extractMinutes} disabled={loading || !transcript}>
            {loading ? "Extracting..." : "Extract Action Items"}
          </button>

          {result && (
            <div className="output">
              <Section title="Decisions">
                {result.decisions.length ? (
                  result.decisions.map((d, i) => (
                    <Item
                      key={i}
                      text={d.text}
                      meta={`Confidence: ${Math.round(d.confidence * 100)}%`}
                    />
                  ))
                ) : (
                  <Empty text="No high-confidence decisions found." />
                )}
              </Section>

              <Section title="Action Items">
                {result.action_items.length ? (
                  result.action_items.map((a, i) => (
                    <Item
                      key={i}
                      text={a.task}
                      meta={`Owner: ${a.owner || "Unassigned"} • Deadline: ${
                        a.deadline || "N/A"
                      }`}
                    />
                  ))
                ) : (
                  <Empty text="No action items found." />
                )}
              </Section>

              <Section title="Blockers">
                {result.blockers.length ? (
                  result.blockers.map((b, i) => (
                    <Item key={i} text={b.text} />
                  ))
                ) : (
                  <Empty text="No blockers identified." />
                )}
              </Section>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        Built with ❤️ using React & FastAPI
      </footer>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="section">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function Item({ text, meta }) {
  return (
    <div className="item">
      <strong>{text}</strong>
      {meta && <div className="meta">{meta}</div>}
    </div>
  );
}

function Empty({ text }) {
  return <div className="empty">{text}</div>;
}

export default App;
