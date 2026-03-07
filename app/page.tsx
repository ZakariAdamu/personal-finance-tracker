"use client";

import { useFinanceStore } from "@/hooks/useFinanceStore";
import BudgetManager from "@/components/finance/BudgetManager";
import BudgetSummaryCard from "@/components/dashboard/BudgetSummaryCard";
import MonthlyFilter from "@/components/dashboard/MonthlyFilter";
import TransactionForm from "@/components/finance/TransactionForm";
import TransactionList from "@/components/finance/TransactionList";
import ExpensePieChart from "@/components/charts/ExpensePieChart";
import MonthlyBudgetInput from "@/components/finance/MonthlyBudgetInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
	const {
		transactions,
		addTransaction,
		deleteTransaction,
		month,
		setMonth,
		monthlyBudget,
		setMonthlyBudget,
		setBudget,
	} = useFinanceStore();

	const income = transactions
		.filter((t) => t.type === "income")
		.reduce((sum, t) => sum + t.amount, 0);

	const expenses = transactions
		.filter((t) => t.type === "expense")
		.reduce((sum, t) => sum + t.amount, 0);

	return (
		<main className="max-w-7xl mx-auto p-10 space-y-8">
			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				<BudgetSummaryCard income={income} expenses={expenses} />
				<Card>
					<CardHeader>
						<CardTitle>Monthly Budget</CardTitle>
					</CardHeader>
					<CardContent>
						<MonthlyBudgetInput
							monthlyBudget={monthlyBudget}
							setMonthlyBudget={setMonthlyBudget}
						/>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Category Budget</CardTitle>
					</CardHeader>
					<CardContent>
						<BudgetManager setBudget={setBudget} />
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-8 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Expense Breakdown</CardTitle>
					</CardHeader>
					<CardContent>
						<ExpensePieChart transactions={transactions} />
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Add New Transaction</CardTitle>
					</CardHeader>
					<CardContent>
						<TransactionForm onAdd={addTransaction} />
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Recent Transactions</CardTitle>
					<MonthlyFilter month={month} setMonth={setMonth} />
				</CardHeader>
				<CardContent>
					<TransactionList
						transactions={transactions}
						onDelete={deleteTransaction}
					/>
				</CardContent>
			</Card>
		</main>
	);
}
