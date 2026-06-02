import { FiAlertTriangle, FiInfo } from "react-icons/fi";
import { MIN_ATTEMPTS_THRESHOLD, TAG_STATS } from "../data/mockData";

function barClass(rate) {
  if (rate >= 70) return "bar good";
  if (rate >= 40) return "bar okay";
  return "bar bad";
}

export default function TagAnalyzer() {
  const sorted = [...TAG_STATS].sort((a, b) => a.successRate - b.successRate);
  const weakest = sorted.find((item) => item.attempted >= MIN_ATTEMPTS_THRESHOLD);

  return (
    <section className="page">
      <header className="page-header">
        <h1>Weakness Analyzer</h1>
        <p>Track low-conversion topics in your growth zone and prioritize the right practice set.</p>
      </header>

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
    </section>
  );
}
