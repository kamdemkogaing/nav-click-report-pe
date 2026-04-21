import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function TimelineChart({ items = [] }) {
  return (
    <div className="card">
      <h2>Klicks pro Tag</h2>

      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={items}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="clicks" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
