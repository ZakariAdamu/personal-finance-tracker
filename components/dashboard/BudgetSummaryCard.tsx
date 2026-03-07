import { formatCurrency } from "@/utils/formatCurrency";
import { getBudgetStatus } from "@/utils/budgetStatus";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function BudgetSummaryCard({
	income,
	expenses,
}: {
	income: number;
	expenses: number;
}) {
	const remaining = income - expenses;
	const percent = income === 0 ? 0 : (expenses / income) * 100;
	const status = getBudgetStatus(percent);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Monthly Budget</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="text-3xl font-bold">{formatCurrency(remaining)}</div>
				<div className={`font-medium ${status.text}`}>{status.label}</div>
			</CardContent>
			<CardFooter className="flex justify-between text-sm">
				<span>Income: {formatCurrency(income)}</span>
				<span>Expenses: {formatCurrency(expenses)}</span>
			</CardFooter>
		</Card>
	);
}
