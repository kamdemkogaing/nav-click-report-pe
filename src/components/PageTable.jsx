import { formatPercent } from "../utils/formatters";

export default function PageTable({ items = [] }) {
  return (
    <div className="card">
      <h2>Klicks nach Seitenpfad</h2>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Seitenpfad</th>
              <th>Klicks</th>
              <th>Anteil</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.page_path}>
                <td>{item.page_path}</td>
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
