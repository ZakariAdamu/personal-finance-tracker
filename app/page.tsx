"use client";

import { useFinanceStore } from "@/hooks/useFinanceStore";
import BudgetManager from "@/components/finance/BudgetManager";
import BudgetSummaryCard from "@/components/dashboard/BudgetSummaryCard";
import MonthlyFilter from "@/components/dashboard/MonthlyFilter";
import TransactionForm from "@/components/finance/TransactionForm";
import TransactionList from "@/components/finance/TransactionList";
import ExpensePieChart from "@/components/charts/ExpensePieChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import BudgetProgress from "@/components/dashboard/BudgetProgress";

export default function Page() {
	const {
		transactions,
		addTransaction,
		deleteTransaction,
		month,
		setMonth,
		monthlyBudget,
		setMonthlyBudget,
		budgets,
		setBudget,
	} = useFinanceStore();

	const income = transactions
		.filter((t) => t.type === "income")
		.reduce((sum, t) => sum + t.amount, 0);

	const expenses = transactions
		.filter((t) => t.type === "expense")
		.reduce((sum, t) => sum + t.amount, 0);

	return (
		<main className="max-w-4xl mx-auto p-10 space-y-8">
			{/* <div className="grid lg:grid-cols-4 gap-8"> */}
			{/* Budget Summary Card */}
			<div className="grid lg:col-span-2">
				<BudgetSummaryCard
					monthlyBudget={monthlyBudget}
					income={income}
					expenses={expenses}
				/>
			</div>

			{/* Budget Manager */}
			<Card className="grid lg:col-span-2">
				<CardHeader>
					<CardTitle>Budget Manager</CardTitle>
				</CardHeader>
				<CardContent>
					<BudgetManager
						transactions={transactions}
						budgets={budgets}
						setBudget={setBudget}
						monthlyBudget={monthlyBudget}
						setMonthlyBudget={setMonthlyBudget}
					/>
				</CardContent>
			</Card>
			{/* </div> */}

			{/* <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"> */}
			{/* Expense Breakdown/piechart */}
			{/* <Card className="">
					<CardHeader>
						<CardTitle>Expense Breakdown</CardTitle>
					</CardHeader>
					<CardContent>
						<ExpensePieChart transactions={transactions} />
					</CardContent>
				</Card>
			</div> */}

			<div className="grid gap-8 md:grid-cols-2">
				{/* Expense Breakdown/piechart */}
				<Card>
					<CardHeader>
						<CardTitle>Expense Breakdown</CardTitle>
					</CardHeader>
					<CardContent>
						<ExpensePieChart transactions={transactions} />
					</CardContent>
				</Card>
				{/* Add Transactions form */}
				<Card className="">
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
					<CardTitle>Monthly Transactions</CardTitle>
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
