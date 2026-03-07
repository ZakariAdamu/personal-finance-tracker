"use client";

import TransactionForm from "@/components/finance/TransactionForm";
import ExpensePieChart from "@/components/finance/ExpensePieChart";
import MonthlySummary from "@/components/finance/MonthlySummary";
import BudgetManager from "@/components/finance/BudgetManager";
import { useFinanceStore } from "@/hooks/useFinanceStore";

export default function Home() {
	const { transactions, addTransaction, setBudget } = useFinanceStore();

	return (
		<main className="p-10 space-y-10">
			<h1 className="text-3xl font-bold">Personal Finance Tracker</h1>

			<MonthlySummary transactions={transactions} />

			<ExpensePieChart transactions={transactions} />

			<TransactionForm onAdd={addTransaction} />

			<BudgetManager setBudget={setBudget} />
		</main>
	);
}
