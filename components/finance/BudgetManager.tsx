"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { FINANCE_CATEGORIES } from "@/lib/constants";
import { Budget, Category, Transaction } from "@/types/finance";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/formatCurrency";
import { COLORS } from "@/lib/constants";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface BudgetManagerProps {
	transactions: Transaction[];
	budgets: Budget[];
	setBudget: (budget: Budget) => void;
	monthlyBudget: number;
	setMonthlyBudget: (budget: number, options?: { silent?: boolean }) => void;
}

export default function BudgetManager({
	transactions,
	budgets,
	setBudget,
	monthlyBudget,
	setMonthlyBudget,
}: BudgetManagerProps) {
	const { register, handleSubmit, setValue } = useForm<Budget>();

	const categoryColors = FINANCE_CATEGORIES.reduce<Record<Category, string>>(
		(acc, category, index) => {
			acc[category] = COLORS[index % COLORS.length];
			return acc;
		},
		{} as Record<Category, string>,
	);

	const expensesByCategory = transactions
		.filter((transaction) => transaction.type === "expense")
		.reduce<Record<Category, number>>(
			(acc, transaction) => {
				acc[transaction.category] =
					(acc[transaction.category] ?? 0) + transaction.amount;
				return acc;
			},
			{} as Record<Category, number>,
		);

	const calculatedMonthlyBudget =
		budgets.length > 0
			? budgets.reduce((sum, budget) => sum + Number(budget.limit), 0)
			: 0;

	React.useEffect(() => {
		if (monthlyBudget !== calculatedMonthlyBudget) {
			setMonthlyBudget(calculatedMonthlyBudget, { silent: true });
		}
	}, [calculatedMonthlyBudget, monthlyBudget, setMonthlyBudget]);

	const onSubmit = (budget: Budget) => {
		const updatedBudget = {
			...budget,
			limit: Number(budget.limit),
		};

		if (
			!updatedBudget.category ||
			!Number.isFinite(updatedBudget.limit) ||
			updatedBudget.limit <= 0
		) {
			return;
		}

		setBudget(updatedBudget);
	};

	const validBudgets = budgets.filter(
		(budget) =>
			FINANCE_CATEGORIES.includes(budget.category) &&
			Number.isFinite(budget.limit) &&
			budget.limit > 0,
	);

	const sortedBudgets = [...validBudgets].sort(
		(a, b) =>
			FINANCE_CATEGORIES.indexOf(a.category) -
			FINANCE_CATEGORIES.indexOf(b.category),
	);

	return (
		<div className="space-y-5">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="grid grid-cols-1 gap-3 md:grid-cols-3"
			>
				<input type="hidden" {...register("category")} />

				<Select
					onValueChange={(value) => setValue("category", value as Category)}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Category" />
					</SelectTrigger>
					<SelectContent
						position="popper"
						sideOffset={8}
						className="z-[60] w-[--radix-select-trigger-width] border border-border bg-white shadow-xl supports-[backdrop-filter]:bg-popover"
					>
						{FINANCE_CATEGORIES.map((category) => (
							<SelectItem className="hover:bg-gray-200" key={category} value={category}>
								{category}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Input
					type="number"
					{...register("limit", { valueAsNumber: true })}
					placeholder="Category budget limit"
				/>

				<Button
					variant="outline"
					className="bg-black text-white/90 hover:bg-gray-800 hover:text-white"
					type="submit"
				>
					Add Category Budget
				</Button>
			</form>

			<div className="rounded-lg border p-3 text-sm">
				<div className="flex items-center justify-between">
					<span className="text-muted-foreground">
						Monthly Budget (calculated)
					</span>
					<span className="font-semibold">
						{formatCurrency(calculatedMonthlyBudget)}
					</span>
				</div>
			</div>

			<div className="space-y-4">
				{sortedBudgets.map((budget, index) => {
					const spent = expensesByCategory[budget.category] ?? 0;
					const remaining = budget.limit - spent;
					const remainingPercentRaw =
						budget.limit > 0 ? (remaining / budget.limit) * 100 : 0;
					const remainingPercent = Math.max(
						0,
						Math.min(100, remainingPercentRaw),
					);

					const isCritical = remainingPercentRaw < 30;
					const isWarning = remainingPercentRaw < 40;

					const progressStyle = isCritical
						? "bg-red-500"
						: isWarning
							? "bg-orange-500"
							: "";

					const warningTextClass =
						remaining <= 0
							? "text-red-600 dark:text-red-400"
							: isCritical
								? "text-red-600 dark:text-red-400"
								: isWarning
									? "text-orange-600 dark:text-orange-400"
									: "text-green-600 dark:text-green-400";

					return (
						<div key={budget.category + index} className="space-y-1.5">
							<div className="flex items-center justify-between text-sm">
								<span className="font-medium capitalize">
									{budget.category}
								</span>
								<span className="text-muted-foreground">
									{formatCurrency(spent)} / {formatCurrency(budget.limit)}
								</span>
							</div>

							<div className="h-3 w-full overflow-hidden rounded-full bg-muted">
								<div
									className={`h-full rounded-full transition-all ${progressStyle}`}
									style={{
										width: `${remainingPercent}%`,
										backgroundColor:
											progressStyle.length > 0
												? undefined
												: categoryColors[budget.category],
									}}
								/>
							</div>

							<p className={`text-xs ${warningTextClass}`}>
								{remaining < 0
									? `You have overdrawn your budget by -${formatCurrency(Math.abs(remaining))} on ${budget.category}.`
									: `You have ${Math.round(remainingPercentRaw)}% left on ${budget.category}.`}
							</p>
						</div>
					);
				})}

				{sortedBudgets.length === 0 ? (
					<p className="text-sm text-muted-foreground">
						No category budget set yet.
					</p>
				) : null}
			</div>
		</div>
	);
}
