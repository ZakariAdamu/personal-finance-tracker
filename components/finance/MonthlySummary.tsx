import { Transaction } from "@/types/finance";
import { calculateIncome, calculateExpenses } from "@/lib/financeHelpers";

export default function MonthlySummary({
	transactions,
}: {
	transactions: Transaction[];
}) {
	const income = calculateIncome(transactions);
	const expenses = calculateExpenses(transactions);

	return (
		<div className="grid grid-cols-2 gap-4">
			<div className="p-4 border">
				<h3>Income</h3>
				<p>${income}</p>
			</div>

			<div className="p-4 border">
				<h3>Expenses</h3>
				<p>${expenses}</p>
			</div>
		</div>
	);
}
