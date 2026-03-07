"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MonthlyBudgetInputProps {
	setMonthlyBudget: (budget: number) => void;
	monthlyBudget: number;
}

export default function MonthlyBudgetInput({
	setMonthlyBudget,
	monthlyBudget,
}: MonthlyBudgetInputProps) {
	const { register, handleSubmit, setValue } = useForm<{ budget: number }>();

	setValue("budget", monthlyBudget);

	const onSubmit = (data: { budget: number }) => {
		setMonthlyBudget(data.budget);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 items-center">
			<Input
				type="number"
				{...register("budget", { valueAsNumber: true })}
				placeholder="Set your monthly budget"
			/>
			<Button variant={"outline"} className="hover:scale-105 bg-pink-300" type="submit">
				Set Budget
			</Button>
		</form>
	);
}
