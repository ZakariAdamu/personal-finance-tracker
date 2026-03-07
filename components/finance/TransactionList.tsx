"use client";

import { Transaction } from "@/types/finance";
import { formatCurrency } from "@/utils/formatCurrency";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function TransactionList({
	transactions,
	onDelete,
}: {
	transactions: Transaction[];
	onDelete: (id: string) => void;
}) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Description</TableHead>
					<TableHead>Category</TableHead>
					<TableHead>Date</TableHead>
					<TableHead>Type</TableHead>
					<TableHead className="text-right">Amount</TableHead>
					<TableHead />
				</TableRow>
			</TableHeader>
			<TableBody>
				{transactions.map((t) => (
					<TableRow key={t.id}>
						<TableCell>{t.description}</TableCell>
						<TableCell>{t.category}</TableCell>
						<TableCell>{t.date}</TableCell>
						<TableCell>{t.type}</TableCell>
						<TableCell className="text-right">
							{formatCurrency(t.amount)}
						</TableCell>
						<TableCell>
							<Button variant="ghost" onClick={() => onDelete(t.id)}>
								Delete
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
