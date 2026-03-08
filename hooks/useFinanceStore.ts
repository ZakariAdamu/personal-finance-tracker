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
import { FINANCE_CATEGORIES } from "@/lib/constants";

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
		const hasValidCategory = FINANCE_CATEGORIES.includes(budget.category);
		const hasValidLimit =
			Number.isFinite(budget.limit) && Number(budget.limit) > 0;

		if (!hasValidCategory || !hasValidLimit) {
			return;
		}

		const filtered = budgets.filter((b) => b.category !== budget.category);
		const updated = [...filtered, { ...budget, limit: Number(budget.limit) }];

		setBudgets(updated);
		saveBudgets(updated);
	};

	const setMonthlyBudget = (budget: number, options?: { silent?: boolean }) => {
		setMonthlyBudgetState(budget);
		saveMonthlyBudget(budget);

		if (!options?.silent) {
			toast("Monthly budget updated successfully.");
		}
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
