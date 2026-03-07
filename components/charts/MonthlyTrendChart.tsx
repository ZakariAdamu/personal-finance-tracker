"use client";

import { BarChart, Bar, XAxis, Tooltip } from "recharts";

interface MonthlyData {
	month: string;
	expenses: number;
}

export default function MonthlyTrendChart({ data }: { data: MonthlyData[] }) {
	return (
		<BarChart width={500} height={300} data={data}>
			<XAxis dataKey="month" />
			<Tooltip />
			<Bar dataKey="expenses" />
		</BarChart>
	);
}
