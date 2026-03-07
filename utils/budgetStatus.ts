export function getBudgetStatus(percent: number) {
	if (percent >= 60) {
		return {
			color: "bg-green-500",
			text: "text-green-600",
			label: "Healthy spending",
		};
	}

	if (percent >= 40) {
		return {
			color: "bg-yellow-500",
			text: "text-yellow-600",
			label: "Budget getting tight",
		};
	}

	return {
		color: "bg-red-500",
		text: "text-red-600",
		label: "Budget exhausted",
	};
}
