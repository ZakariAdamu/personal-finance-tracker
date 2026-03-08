export type TransactionType = "income" | "expense";

export type Category =
	| "housing"
	| "food"
	| "transport"
	| "entertainment"
	| "utilities";

export interface Transaction {
	id: string;
	amount: number;
	category: Category;
	description: string;
	date: string;
	type: TransactionType;
}

export interface Budget {
	category: Category;
	limit: number;
}
