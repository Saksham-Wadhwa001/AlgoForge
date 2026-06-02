import { FiTarget, FiUsers } from "react-icons/fi";
import { MIN_ATTEMPTS_THRESHOLD, RECOMMENDATIONS, TAG_STATS } from "../data/mockData";

const platformLabel = {
  codeforces: "Codeforces",
  leetcode: "LeetCode",
  atcoder: "AtCoder",
};

export default function Recommendations() {
  const weakest = TAG_STATS.filter((item) => item.attempted >= MIN_ATTEMPTS_THRESHOLD).sort(
    (a, b) => a.successRate - b.successRate
  )[0];

  return (
    <section className="page">
      <header className="page-header">
        <h1>Smart Recommendations</h1>
        <p>Problems selected for your weakest tag, with practical difficulty and high community solve volume.</p>
      </header>

      <div className="target-pill">
        <FiTarget />
        <span>
          Targeting <strong>{weakest.tag}</strong> ({weakest.successRate.toFixed(1)}% success)
        </span>
      </div>

      <div className="recommend-grid">
        {RECOMMENDATIONS.map((problem, index) => (
          <a key={problem.id} href={problem.url} target="_blank" rel="noreferrer" className="card roomy rec-card">
            <div className="row">
              <p className="tiny">#{index + 1}</p>
              <p className="tiny">{platformLabel[problem.platform]}</p>
            </div>
            <h3>{problem.name}</h3>
            <div className="row">
              <span className="tag">
                {problem.tags[0]} · {problem.rating}
              </span>
              <span className="tiny users">
                <FiUsers /> {problem.solveCount.toLocaleString()}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
