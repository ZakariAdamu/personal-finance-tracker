import { Transaction } from "@/types/finance";

export const calculateIncome = (transactions: Transaction[]) =>
	transactions
		.filter((t) => t.type === "income")
		.reduce((sum, t) => sum + t.amount, 0);

export const calculateExpenses = (transactions: Transaction[]) =>
	transactions
		.filter((t) => t.type === "expense")
		.reduce((sum, t) => sum + t.amount, 0);

export const groupExpensesByCategory = (transactions: Transaction[]) => {
	const expenses = transactions.filter((t) => t.type === "expense");

	const grouped: Record<string, number> = {};

	expenses.forEach((t) => {
		grouped[t.category] = (grouped[t.category] || 0) + t.amount;
	});

	return grouped;
};
