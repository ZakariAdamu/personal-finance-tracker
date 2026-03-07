"use client";

import { useForm } from "react-hook-form";
import { FINANCE_CATEGORIES } from "@/lib/constants";
import { Budget, Category } from "@/types/finance";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function BudgetManager({
	setBudget,
}: {
	setBudget: (budget: Budget) => void;
}) {
	const { register, handleSubmit, setValue } = useForm<Budget>();

	return (
		<form
			onSubmit={handleSubmit(setBudget)}
			className="flex gap-2 items-center"
		>
			<Select
				onValueChange={(value) => setValue("category", value as Category)}
			>
				<SelectTrigger>
					<SelectValue placeholder="Category" />
				</SelectTrigger>
				<SelectContent>
					{FINANCE_CATEGORIES.map((c) => (
						<SelectItem key={c} value={c}>
							{c}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			<Input
				type="number"
				{...register("limit", { valueAsNumber: true })}
				placeholder="Budget limit"
			/>

			<Button variant={"outline"} className="hover:scale-105" type="submit">
				Set Budget
			</Button>
		</form>
	);
}
