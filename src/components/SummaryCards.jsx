export default function SummaryCards({
  totalClicks,
  topNavText,
  topNavClicks,
}) {
  return (
    <div className="stats-grid">
      <div className="card stat-card">
        <div className="stat-label">Gesamtklicks</div>
        <div className="stat-value">{totalClicks}</div>
      </div>

      <div className="card stat-card">
        <div className="stat-label">Top-Menüpunkt</div>
        <div className="stat-value stat-text">{topNavText || "-"}</div>
      </div>

      <div className="card stat-card">
        <div className="stat-label">Klicks Top-Menüpunkt</div>
        <div className="stat-value">{topNavClicks || 0}</div>
      </div>
    </div>
  );
}
