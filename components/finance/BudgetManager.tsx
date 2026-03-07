"use client";

import { useForm } from "react-hook-form";
import { FINANCE_CATEGORIES } from "@/lib/constants";
import { Budget } from "@/types/finance";

export default function BudgetManager({
	setBudget,
}: {
	setBudget: (budget: Budget) => void;
}) {
	const { register, handleSubmit } = useForm<Budget>();

	return (
		<form onSubmit={handleSubmit(setBudget)} className="space-y-2">
			<select {...register("category")}>
				{FINANCE_CATEGORIES.map((c) => (
					<option key={c}>{c}</option>
				))}
			</select>

			<input type="number" {...register("limit")} placeholder="Budget limit" />

			<button className="bg-blue-600 text-white px-3 py-2">Set Budget</button>
		</form>
	);
}
