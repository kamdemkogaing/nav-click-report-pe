import { formatPercent } from "../utils/formatters";

export default function SummaryTable({ items = [] }) {
  return (
    <div className="card">
      <h2>Zusammenfassung</h2>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Menüpunkt</th>
              <th>Klicks</th>
              <th>Anteil</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.nav_text}>
                <td>{item.nav_text}</td>
                <td>{item.clicks}</td>
                <td>{formatPercent(item.percentage)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
