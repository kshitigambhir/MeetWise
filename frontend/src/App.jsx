import { useState } from "react";

function App() {
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const extractMinutes = async () => {
    setLoading(true);
    setResult(null);

    const res = await fetch(
      "https://meetwise-qlpi.onrender.com/extract/final",
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
    <div className="page">
      <div className="card">
        <h1>Decision Minutes Copilot</h1>
        <p className="subtitle">
          Turn meeting transcripts into clear decisions and action items.
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
            {/* DECISIONS */}
            <Section title="Decisions">
              {result.decisions.length > 0 ? (
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

            {/* ACTION ITEMS */}
            <Section title="Action Items">
              {result.action_items.length > 0 ? (
                result.action_items.map((a, i) => (
                  <Item
                    key={i}
                    text={`${a.task}`}
                    meta={`Owner: ${a.owner || "Unassigned"} • Deadline: ${
                      a.deadline || "Not specified"
                    } • Confidence: ${Math.round(a.confidence * 100)}%`}
                  />
                ))
              ) : (
                <Empty text="No clear action items found." />
              )}
            </Section>

            {/* BLOCKERS */}
            <Section title="Blockers">
              {result.blockers.length > 0 ? (
                result.blockers.map((b, i) => (
                  <Item
                    key={i}
                    text={b.text}
                    meta={`Confidence: ${Math.round(b.confidence * 100)}%`}
                  />
                ))
              ) : (
                <Empty text="No blockers identified." />
              )}
            </Section>
          </div>
        )}
      </div>
    </div>
  );
}

/* Reusable components */

function Section({ title, children }) {
  return (
    <div style={{ marginTop: "28px" }}>
      <h3 style={{ marginBottom: "12px" }}>{title}</h3>
      {children}
    </div>
  );
}

function Item({ text, meta }) {
  return (
    <div
      style={{
        background: "#f8fafc",
        padding: "14px",
        borderRadius: "10px",
        marginBottom: "10px",
        border: "1px solid #e2e8f0",
      }}
    >
      <div style={{ fontWeight: 600 }}>{text}</div>
      <div style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
        {meta}
      </div>
    </div>
  );
}

function Empty({ text }) {
  return (
    <div style={{ color: "#94a3b8", fontSize: "14px" }}>{text}</div>
  );
}

export default App;
