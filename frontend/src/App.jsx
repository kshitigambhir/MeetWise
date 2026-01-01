import { useState } from "react";

function App() {
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const extractMinutes = async () => {
    setLoading(true);
    setResult(null);

    const res = await fetch(fetch("https://meetwise-qlpi.onrender.com/extract/final"),
{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript }),
    });

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
            <h3>Extracted Output</h3>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
