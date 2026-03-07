"use client";

import { useState } from "react";
import { Transaction, Budget } from "@/types/finance";
import {
	getTransactions,
	saveTransactions,
	getBudgets,
	saveBudgets,
	getMonthlyBudget,
	saveMonthlyBudget,
} from "@/lib/financeStorage";
import { toast } from "sonner";

export function useFinanceStore() {
	const [transactions, setTransactions] = useState<Transaction[]>(() =>
		getTransactions(),
	);
	const [budgets, setBudgets] = useState<Budget[]>(() => getBudgets());
	const [month, setMonth] = useState<string>("");
	const [monthlyBudget, setMonthlyBudgetState] = useState<number>(() =>
		getMonthlyBudget(),
	);

	const addTransaction = (transaction: Transaction) => {
		const updated = [...transactions, transaction];
		setTransactions(updated);
		saveTransactions(updated);
		toast("Transaction added successfully.");
	};

	const deleteTransaction = (id: string) => {
		const updated = transactions.filter((t) => t.id !== id);
		setTransactions(updated);
		saveTransactions(updated);
		toast("Transaction deleted successfully.");
	};

	const setBudget = (budget: Budget) => {
		const filtered = budgets.filter((b) => b.category !== budget.category);
		const updated = [...filtered, budget];

		setBudgets(updated);
		saveBudgets(updated);
	};

	const setMonthlyBudget = (budget: number) => {
		setMonthlyBudgetState(budget);
		saveMonthlyBudget(budget);
		toast("Monthly budget updated successfully.");
	};

	const filteredTransactions = month
		? transactions.filter((t) => t.date.startsWith(month))
		: transactions;

	return {
		transactions: filteredTransactions,
		addTransaction,
		deleteTransaction,
		budgets,
		setBudget,
		month,
		setMonth,
		monthlyBudget,
		setMonthlyBudget,
	};
}
