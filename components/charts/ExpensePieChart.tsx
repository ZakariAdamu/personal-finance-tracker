"use client";

import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { groupExpensesByCategory } from "@/lib/financeHelpers";
import { Transaction } from "@/types/finance";
import { COLORS } from "@/lib/constants";

interface Props {
	transactions: Transaction[];
}

export default function ExpensePieChart({ transactions }: Props) {
	const grouped = groupExpensesByCategory(transactions);

	const data = Object.entries(grouped).map(([key, value]) => ({
		name: key,
		value,
	}));

	return (
		<PieChart width={400} height={300}>
			<Pie
				data={data}
				dataKey="value"
				nameKey="name"
				outerRadius={120}
				fill="#8884d8"
			>
				{data.map((entry, index) => (
					<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
				))}
			</Pie>
			<Tooltip />
			<Legend />
		</PieChart>
	);
}
