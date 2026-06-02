import { useMemo, useState } from "react";
import { FiAward, FiCheckCircle, FiRefreshCw, FiTrendingUp } from "react-icons/fi";
import { PROFILE } from "../data/mockData";

const platformMeta = {
  codeforces: { title: "Codeforces", accent: "cf" },
  leetcode: { title: "LeetCode", accent: "lc" },
  atcoder: { title: "AtCoder", accent: "ac" },
};

export default function Dashboard() {
  const [handles, setHandles] = useState(PROFILE.handles);

  const bestPlatform = useMemo(() => {
    return Object.entries(PROFILE.platforms).reduce((best, [key, value]) => {
      if (!best || value.maxRating > best.value.maxRating) return { key, value };
      return best;
    }, null);
  }, []);

  return (
    <section className="page">
      <header className="page-header">
        <h1>Progress Dashboard</h1>
        <p>One clean view of your handles, ratings, solved counts, and strongest platform.</p>
      </header>

      <div className="card roomy">
        <div className="input-grid">
          {Object.keys(handles).map((key) => (
            <label key={key} className="field">
              <span>{key} handle</span>
              <input
                value={handles[key]}
                onChange={(event) => setHandles((prev) => ({ ...prev, [key]: event.target.value }))}
              />
            </label>
          ))}
        </div>
        <button className="btn-primary" type="button">
          <FiRefreshCw />
          Refresh
        </button>
      </div>

      <div className="stats-grid">
        {Object.entries(PROFILE.platforms).map(([key, value]) => (
          <article key={key} className={`card roomy stat-card ${platformMeta[key].accent}`}>
            <div className="card-head">
              <h3>{platformMeta[key].title}</h3>
              <span className="tag">{value.rank}</span>
            </div>
            <p className="tiny mono">@{handles[key]}</p>
            <div className="stat-line">
              <span>
                <FiTrendingUp /> Current
              </span>
              <strong>{value.currentRating}</strong>
            </div>
            <div className="stat-line">
              <span>
                <FiAward /> Max
              </span>
              <strong>{value.maxRating}</strong>
            </div>
            <div className="stat-line">
              <span>
                <FiCheckCircle /> Solved
              </span>
              <strong>{value.solved}</strong>
            </div>
          </article>
        ))}
      </div>

      <div className="summary-grid">
        <article className="card roomy">
          <p className="tiny">Total solved</p>
          <p className="big-number">{PROFILE.totalSolved.toLocaleString()}</p>
        </article>
        <article className="card roomy">
          <p className="tiny">Peak rating</p>
          <p className="big-number">{PROFILE.peakRating}</p>
        </article>
        <article className="card roomy">
          <p className="tiny">Strongest platform</p>
          <p className="insight">{platformMeta[bestPlatform.key].title}</p>
          <p className="tiny">max {bestPlatform.value.maxRating}</p>
        </article>
      </div>
    </section>
  );
}
