"use client";

import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { FINANCE_CATEGORIES } from "@/lib/constants";
import { Transaction } from "@/types/finance";

interface Props {
	onAdd: (transaction: Transaction) => void;
}

export default function TransactionForm({ onAdd }: Props) {
	const { register, handleSubmit, reset } = useForm<Transaction>();

	const onSubmit = (data: Transaction) => {
		onAdd({
			...data,
			id: uuid(),
			amount: Number(data.amount),
		});

		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<input
				{...register("description")}
				placeholder="Description"
				className="border p-2 w-full"
			/>

			<input
				type="number"
				{...register("amount")}
				placeholder="Amount"
				className="border p-2 w-full"
			/>

			<select {...register("category")} className="border p-2 w-full">
				{FINANCE_CATEGORIES.map((cat) => (
					<option key={cat}>{cat}</option>
				))}
			</select>

			<input type="date" {...register("date")} className="border p-2 w-full" />

			<select {...register("type")} className="border p-2 w-full">
				<option value="expense">Expense</option>
				<option value="income">Income</option>
			</select>

			<button className="bg-black text-white px-4 py-2 rounded">
				Add Transaction
			</button>
		</form>
	);
}
