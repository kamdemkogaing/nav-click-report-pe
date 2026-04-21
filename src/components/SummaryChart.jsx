import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function SummaryChart({ items = [] }) {
  const chartData = items.slice(0, 10);

  return (
    <div className="card">
      <h2>Klicks pro Menüpunkt</h2>

      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={420}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 10, right: 20, left: 50, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="nav_text" width={180} />
            <Tooltip />
            <Bar dataKey="clicks" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
