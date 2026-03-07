import { Transaction, Budget } from "@/types/finance";

const TRANSACTION_KEY = "finance_transactions";
const BUDGET_KEY = "finance_budgets";

export const getTransactions = (): Transaction[] => {
	if (typeof window === "undefined") return [];

	const data = localStorage.getItem(TRANSACTION_KEY);
	return data ? JSON.parse(data) : [];
};

export const saveTransactions = (transactions: Transaction[]) => {
	localStorage.setItem(TRANSACTION_KEY, JSON.stringify(transactions));
};

export const getBudgets = (): Budget[] => {
	if (typeof window === "undefined") return [];

	const data = localStorage.getItem(BUDGET_KEY);
	return data ? JSON.parse(data) : [];
};

export const saveBudgets = (budgets: Budget[]) => {
	localStorage.setItem(BUDGET_KEY, JSON.stringify(budgets));
};
