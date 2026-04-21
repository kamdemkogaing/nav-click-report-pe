import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function DeviceChart({ items = [] }) {
  return (
    <div className="card">
      <h2>Geräteverteilung</h2>

      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={items}
              dataKey="clicks"
              nameKey="device_type"
              cx="50%"
              cy="50%"
              outerRadius={110}
              label
            >
              {items.map((entry, index) => (
                <Cell
                  key={entry.device_type}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
