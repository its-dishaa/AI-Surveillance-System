import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Person", value: 40 },
  { name: "Car", value: 25 },
  { name: "Bike", value: 20 },
  { name: "Bus", value: 15 },
];

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f97316",
  "#dc2626",
];

function ObjectChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="font-semibold mb-5">
        Object Distribution
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default ObjectChart;