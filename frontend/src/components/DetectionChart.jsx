import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { hour: "10", detections: 20 },
  { hour: "11", detections: 34 },
  { hour: "12", detections: 18 },
  { hour: "13", detections: 42 },
  { hour: "14", detections: 28 },
];

function DetectionChart() {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="font-semibold mb-5">
        Detection Timeline
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <LineChart data={data}>

          <XAxis dataKey="hour" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="detections"
            stroke="#2563eb"
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default DetectionChart;