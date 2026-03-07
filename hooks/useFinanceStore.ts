"use client";

import { useEffect, useState } from "react";
import { Transaction, Budget } from "@/types/finance";
import {
	getTransactions,
	saveTransactions,
	getBudgets,
	saveBudgets,
} from "@/lib/financeStorage";

export function useFinanceStore() {
	const [transactions, setTransactions] = useState<Transaction[]>(() =>
		getTransactions(),
	);
	const [budgets, setBudgets] = useState<Budget[]>(() => getBudgets());

	const addTransaction = (transaction: Transaction) => {
		const updated = [...transactions, transaction];
		setTransactions(updated);
		saveTransactions(updated);
	};

	const setBudget = (budget: Budget) => {
		const filtered = budgets.filter((b) => b.category !== budget.category);
		const updated = [...filtered, budget];

		setBudgets(updated);
		saveBudgets(updated);
	};

	return {
		transactions,
		budgets,
		addTransaction,
		setBudget,
	};
}
