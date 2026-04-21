import { formatDateTime } from "../utils/formatters";

export default function DetailsTable({ items = [] }) {
  return (
    <div className="card">
      <h2>Letzte Klicks</h2>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Zeit</th>
              <th>Menüpunkt</th>
              <th>Menü-URL</th>
              <th>Seite</th>
              <th>Gerät</th>
              <th>Scope</th>
              <th>Index</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{formatDateTime(item.clicked_at)}</td>
                <td>{item.nav_text}</td>
                <td>{item.nav_url}</td>
                <td>{item.page_path}</td>
                <td>{item.device_type}</td>
                <td>{item.menu_scope}</td>
                <td>{item.nav_index ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
