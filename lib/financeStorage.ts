import { Transaction, Budget } from "@/types/finance";

const TRANSACTION_KEY = "finance_transactions";
const BUDGET_KEY = "finance_budgets";
const MONTHLY_BUDGET_KEY = "finance_monthly_budget";

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

export const getMonthlyBudget = (): number => {
	if (typeof window === "undefined") return 0;

	const data = localStorage.getItem(MONTHLY_BUDGET_KEY);
	return data ? JSON.parse(data) : 0;
};

export const saveMonthlyBudget = (budget: number) => {
	localStorage.setItem(MONTHLY_BUDGET_KEY, JSON.stringify(budget));
};
