import { useCallback, useEffect, useMemo, useState } from "react";
import { FiAward, FiCheckCircle, FiLoader, FiRefreshCw, FiTrendingUp, FiAlertCircle } from "react-icons/fi";
import { fetchAllProfiles } from "../api/client.js";

const platformMeta = {
  codeforces: { title: "Codeforces", accent: "cf" },
  leetcode: { title: "LeetCode", accent: "lc" },
  atcoder: { title: "AtCoder", accent: "ac" },
};

const DEFAULT_HANDLES = {
  codeforces: "",
  leetcode: "",
  atcoder: "",
};

function loadSavedHandles() {
  try {
    const saved = localStorage.getItem("algoforge_handles");
    return saved ? JSON.parse(saved) : DEFAULT_HANDLES;
  } catch {
    return DEFAULT_HANDLES;
  }
}

export default function Dashboard() {
  const [handles, setHandles] = useState(loadSavedHandles);
  const [platforms, setPlatforms] = useState({});
  const [totalSolved, setTotalSolved] = useState(0);
  const [peakRating, setPeakRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiErrors, setApiErrors] = useState(null);
  const [fetched, setFetched] = useState(false);

  // Persist handles to localStorage
  useEffect(() => {
    localStorage.setItem("algoforge_handles", JSON.stringify(handles));
  }, [handles]);

  const handleRefresh = useCallback(async () => {
    const activeHandles = {};
    for (const [key, value] of Object.entries(handles)) {
      if (value.trim()) activeHandles[key] = value.trim();
    }

    if (Object.keys(activeHandles).length === 0) {
      setError("Enter at least one platform handle to fetch data.");
      return;
    }

    setLoading(true);
    setError(null);
    setApiErrors(null);

    try {
      const data = await fetchAllProfiles(activeHandles);
      setPlatforms(data.platforms ?? {});
      setTotalSolved(data.totalSolved ?? 0);
      setPeakRating(data.peakRating ?? 0);
      setApiErrors(data.errors ?? null);
      setFetched(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [handles]);

  const bestPlatform = useMemo(() => {
    const entries = Object.entries(platforms);
    if (entries.length === 0) return null;
    return entries.reduce((best, [key, value]) => {
      if (!best || (value.maxRating ?? 0) > (best.value.maxRating ?? 0))
        return { key, value };
      return best;
    }, null);
  }, [platforms]);

  return (
    <section className="page">
      <header className="page-header">
        <h1>Progress Dashboard</h1>
        <p>Enter your handles, hit Refresh, and see live ratings, solved counts, and your strongest platform.</p>
      </header>

      <div className="card roomy">
        <div className="input-grid">
          {Object.keys(handles).map((key) => (
            <label key={key} className="field">
              <span>{key} handle</span>
              <input
                placeholder={`your ${key} username`}
                value={handles[key]}
                onChange={(event) =>
                  setHandles((prev) => ({ ...prev, [key]: event.target.value }))
                }
              />
            </label>
          ))}
        </div>
        <button
          className="btn-primary"
          type="button"
          onClick={handleRefresh}
          disabled={loading}
        >
          {loading ? <FiLoader className="spin" /> : <FiRefreshCw />}
          {loading ? "Fetching…" : "Refresh"}
        </button>
      </div>

      {error && (
        <div className="error-banner">
          <FiAlertCircle />
          <p>{error}</p>
        </div>
      )}

      {apiErrors && (
        <div className="warning-banner">
          <FiAlertCircle />
          <div>
            <p>Some platforms returned errors:</p>
            {Object.entries(apiErrors).map(([platform, msg]) => (
              <p key={platform} className="tiny">{platformMeta[platform]?.title ?? platform}: {msg}</p>
            ))}
          </div>
        </div>
      )}

      {fetched && Object.keys(platforms).length > 0 && (
        <>
          <div className="stats-grid">
            {Object.entries(platforms).map(([key, value]) => (
              <article key={key} className={`card roomy stat-card ${platformMeta[key]?.accent ?? ""}`}>
                <div className="card-head">
                  <h3>{platformMeta[key]?.title ?? key}</h3>
                  <span className="tag">{value.rank ?? "Unrated"}</span>
                </div>
                <p className="tiny mono">@{value.handle ?? handles[key]}</p>
                <div className="stat-line">
                  <span>
                    <FiTrendingUp /> Current
                  </span>
                  <strong>{value.currentRating ?? 0}</strong>
                </div>
                <div className="stat-line">
                  <span>
                    <FiAward /> Max
                  </span>
                  <strong>{value.maxRating ?? 0}</strong>
                </div>
                <div className="stat-line">
                  <span>
                    <FiCheckCircle /> Solved
                  </span>
                  <strong>{value.solved ?? 0}</strong>
                </div>
              </article>
            ))}
          </div>

          <div className="summary-grid">
            <article className="card roomy">
              <p className="tiny">Total solved</p>
              <p className="big-number">{totalSolved.toLocaleString()}</p>
            </article>
            <article className="card roomy">
              <p className="tiny">Peak rating</p>
              <p className="big-number">{peakRating}</p>
            </article>
            {bestPlatform && (
              <article className="card roomy">
                <p className="tiny">Strongest platform</p>
                <p className="insight">{platformMeta[bestPlatform.key]?.title ?? bestPlatform.key}</p>
                <p className="tiny">max {bestPlatform.value.maxRating ?? 0}</p>
              </article>
            )}
          </div>
        </>
      )}

      {!fetched && !loading && (
        <div className="empty-state">
          <p>Enter your competitive programming handles above and click <strong>Refresh</strong> to see your stats.</p>
        </div>
      )}
    </section>
  );
}
