import { useCallback, useEffect, useState } from "react";
import { FiAlertTriangle, FiInfo, FiLoader, FiRefreshCw, FiAlertCircle } from "react-icons/fi";
import { fetchAnalysis } from "../api/client.js";

const MIN_ATTEMPTS_THRESHOLD = 3;

function barClass(rate) {
  if (rate >= 70) return "bar good";
  if (rate >= 40) return "bar okay";
  return "bar bad";
}

function loadSavedHandles() {
  try {
    const saved = localStorage.getItem("algoforge_handles");
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export default function TagAnalyzer() {
  const [tagStats, setTagStats] = useState([]);
  const [weakest, setWeakest] = useState(null);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetched, setFetched] = useState(false);

  const analyze = useCallback(async () => {
    const handles = loadSavedHandles();
    if (!handles.codeforces) {
      setError("A Codeforces handle is required for tag analysis. Set it on the Dashboard first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchAnalysis({
        codeforces: handles.codeforces,
        leetcode: handles.leetcode,
      });
      setTagStats(data.tagStats ?? []);
      setWeakest(data.weakestTag ?? null);
      setMeta({
        totalSubmissions: data.totalSubmissionsAnalyzed,
        uniqueProblems: data.uniqueProblemsAnalyzed,
        growthZone: data.growthZone,
      });
      setFetched(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-fetch on mount if we have a saved CF handle
  useEffect(() => {
    const handles = loadSavedHandles();
    if (handles.codeforces) {
      analyze();
    }
  }, [analyze]);

  const sorted = [...tagStats].sort((a, b) => a.successRate - b.successRate);

  return (
    <section className="page">
      <header className="page-header">
        <h1>Weakness Analyzer</h1>
        <p>Track low-conversion topics in your growth zone and prioritize the right practice set.</p>
      </header>

      <div className="card roomy" style={{ marginBottom: "1rem" }}>
        <button className="btn-primary" type="button" onClick={analyze} disabled={loading}>
          {loading ? <FiLoader className="spin" /> : <FiRefreshCw />}
          {loading ? "Analyzing…" : "Analyze Submissions"}
        </button>
        {meta && (
          <p className="tiny" style={{ marginTop: "0.5rem" }}>
            Analyzed {meta.totalSubmissions} submissions across {meta.uniqueProblems} unique problems
            {meta.growthZone && ` · Growth zone: ${meta.growthZone.lower}–${meta.growthZone.upper}`}
          </p>
        )}
      </div>

      {error && (
        <div className="error-banner">
          <FiAlertCircle />
          <p>{error}</p>
        </div>
      )}

      {weakest && (
        <div className="warning-banner">
          <FiAlertTriangle />
          <div>
            <p>
              Weakest valid tag: <strong>{weakest.tag}</strong> ({weakest.successRate.toFixed(1)}%)
            </p>
            <p className="tiny">
              {weakest.solved}/{weakest.attempted} solved. Move to recommendations for targeted problems.
            </p>
          </div>
        </div>
      )}

      {fetched && sorted.length > 0 && (
        <div className="stack">
          {sorted.map((item) => {
            const valid = item.attempted >= MIN_ATTEMPTS_THRESHOLD;

            return (
              <article key={item.tag} className="card roomy">
                <div className="row">
                  <h3>{item.tag}</h3>
                  <p className="tiny">
                    {item.solved}/{item.attempted} solved {valid ? `· ${item.successRate.toFixed(1)}%` : "· n/a"}
                  </p>
                </div>
                {valid ? (
                  <div className="track">
                    <div className={barClass(item.successRate)} style={{ width: `${item.successRate}%` }} />
                  </div>
                ) : (
                  <p className="tiny note">
                    <FiInfo /> Not enough attempts yet for a reliable percentage.
                  </p>
                )}
              </article>
            );
          })}
        </div>
      )}

      {fetched && sorted.length === 0 && (
        <div className="empty-state">
          <p>No submissions found. Make sure your Codeforces handle is correct.</p>
        </div>
      )}

      {!fetched && !loading && (
        <div className="empty-state">
          <p>Set your Codeforces handle on the Dashboard, then come here to analyze your tag weaknesses.</p>
        </div>
      )}
    </section>
  );
}
