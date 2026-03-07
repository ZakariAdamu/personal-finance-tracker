"use client";

import { Input } from "@/components/ui/input";

export default function MonthlyFilter({
	month,
	setMonth,
}: {
	month: string;
	setMonth: (m: string) => void;
}) {
	return (
		<Input
			type="month"
			value={month}
			onChange={(e) => setMonth(e.target.value)}
			className="max-w-xs"
		/>
	);
}
