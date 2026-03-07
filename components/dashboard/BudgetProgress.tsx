import { getBudgetStatus } from "@/utils/budgetStatus";

export default function BudgetProgress({
	spent,
	limit,
	category,
}: {
	spent: number;
	limit: number;
	category: string;
}) {
	const percent = (spent / limit) * 100;

	const status = getBudgetStatus(percent);

	return (
		<div className="space-y-1">
			<div className="flex justify-between text-sm">
				<span>{category}</span>
				<span>
					{spent} / {limit}
				</span>
			</div>

			<div className="w-full bg-gray-200 h-3 rounded">
				<div
					className={`${status.color} h-3 rounded`}
					style={{ width: `${Math.min(percent, 100)}%` }}
				/>
			</div>
		</div>
	);
}
