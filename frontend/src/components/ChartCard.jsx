import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";

const COLORS = [
    "#2563eb",
    "#16a34a",
    "#ea580c",
    "#9333ea",
    "#dc2626",
    "#0891b2"
];

function ChartCard({
    title,
    type,
    data
}) {

    return (

        <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-lg font-semibold mb-4">

                {title}

            </h2>

            <div className="h-80">

                <ResponsiveContainer>

                    {

                        type === "pie"

                        ?

                        <PieChart>

                            <Pie

                                data={data}

                                dataKey="value"

                                nameKey="name"

                                outerRadius={110}

                                label

                            >

                                {

                                    data.map((entry,index)=>(

                                        <Cell

                                            key={index}

                                            fill={COLORS[index % COLORS.length]}

                                        />

                                    ))

                                }

                            </Pie>

                            <Tooltip/>

                            <Legend/>

                        </PieChart>

                        :

                        <LineChart data={data}>

                            <CartesianGrid strokeDasharray="3 3"/>

                            <XAxis dataKey="hour"/>

                            <YAxis/>

                            <Tooltip/>

                            <Line

                                type="monotone"

                                dataKey="count"

                                stroke="#2563eb"

                                strokeWidth={3}

                            />

                        </LineChart>

                    }

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default ChartCard;