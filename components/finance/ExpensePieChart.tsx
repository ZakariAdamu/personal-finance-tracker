"use client";

import { PieChart, Pie, Tooltip } from "recharts";
import { groupExpensesByCategory } from "@/lib/financeHelpers";
import { Transaction } from "@/types/finance";

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
			<Pie data={data} dataKey="value" nameKey="name" outerRadius={120} />
			<Tooltip />
		</PieChart>
	);
}
