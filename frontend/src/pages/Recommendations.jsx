import { useCallback, useEffect, useState } from "react";
import { FiTarget, FiUsers, FiLoader, FiAlertCircle, FiRefreshCw } from "react-icons/fi";
import { fetchAnalysis, fetchRecommendations } from "../api/client.js";

const platformLabel = {
  codeforces: "Codeforces",
  leetcode: "LeetCode",
  atcoder: "AtCoder",
};

function loadSavedHandles() {
  try {
    const saved = localStorage.getItem("algoforge_handles");
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [targetTag, setTargetTag] = useState(null);
  const [totalMatches, setTotalMatches] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetched, setFetched] = useState(false);

  const loadRecommendations = useCallback(async () => {
    const handles = loadSavedHandles();
    if (!handles.codeforces) {
      setError("A Codeforces handle is required. Set it on the Dashboard first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // First, analyze to get weakest tag and growth zone
      const analysis = await fetchAnalysis({ codeforces: handles.codeforces });

      if (!analysis.weakestTag) {
        setError("No valid weak tags found. You need more submissions with enough attempts per tag (≥3).");
        setLoading(false);
        return;
      }

      // Then fetch recommendations based on the analysis
      const data = await fetchRecommendations(
        analysis.weakestTag.tag,
        analysis.growthZone,
        6
      );

      setTargetTag({
        tag: analysis.weakestTag.tag,
        successRate: analysis.weakestTag.successRate,
      });
      setRecommendations(data.recommendations ?? []);
      setTotalMatches(data.totalMatches ?? 0);
      setFetched(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-fetch on mount
  useEffect(() => {
    const handles = loadSavedHandles();
    if (handles.codeforces) {
      loadRecommendations();
    }
  }, [loadRecommendations]);

  return (
    <section className="page">
      <header className="page-header">
        <h1>Smart Recommendations</h1>
        <p>Problems selected for your weakest tag, with practical difficulty and high community solve volume.</p>
      </header>

      <div className="card roomy" style={{ marginBottom: "1rem" }}>
        <button className="btn-primary" type="button" onClick={loadRecommendations} disabled={loading}>
          {loading ? <FiLoader className="spin" /> : <FiRefreshCw />}
          {loading ? "Finding problems…" : "Get Recommendations"}
        </button>
      </div>

      {error && (
        <div className="error-banner">
          <FiAlertCircle />
          <p>{error}</p>
        </div>
      )}

      {targetTag && (
        <div className="target-pill">
          <FiTarget />
          <span>
            Targeting <strong>{targetTag.tag}</strong> ({targetTag.successRate.toFixed(1)}% success)
            {totalMatches > 0 && <span className="tiny"> · {totalMatches} problems in range</span>}
          </span>
        </div>
      )}

      {fetched && recommendations.length > 0 && (
        <div className="recommend-grid">
          {recommendations.map((problem, index) => (
            <a
              key={problem.id}
              href={problem.url}
              target="_blank"
              rel="noreferrer"
              className="card roomy rec-card"
            >
              <div className="row">
                <p className="tiny">#{index + 1}</p>
                <p className="tiny">{platformLabel[problem.platform] ?? problem.platform}</p>
              </div>
              <h3>{problem.name}</h3>
              <div className="row">
                <span className="tag">
                  {problem.tags?.[0] ?? targetTag.tag} · {problem.rating}
                </span>
                <span className="tiny users">
                  <FiUsers /> {(problem.solvedCount ?? 0).toLocaleString()}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}

      {fetched && recommendations.length === 0 && (
        <div className="empty-state">
          <p>No problems found in your growth zone for this tag. Try solving more problems to widen the analysis.</p>
        </div>
      )}

      {!fetched && !loading && (
        <div className="empty-state">
          <p>Set your Codeforces handle on the Dashboard, then come here for targeted problem recommendations.</p>
        </div>
      )}
    </section>
  );
}
