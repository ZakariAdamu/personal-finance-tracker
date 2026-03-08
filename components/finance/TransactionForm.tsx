"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { FINANCE_CATEGORIES } from "@/lib/constants";
import { Transaction } from "@/types/finance";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface Props {
	onAdd: (transaction: Transaction) => void;
}

export default function TransactionForm({ onAdd }: Props) {
	const { register, handleSubmit, reset, setValue } = useForm<Transaction>();
	const dateInputRef = React.useRef<HTMLInputElement | null>(null);
	const dateField = register("date");

	const openDatePicker = () => {
		const input = dateInputRef.current as
			| (HTMLInputElement & {
					showPicker?: () => void;
			  })
			| null;

		if (input?.showPicker) {
			input.showPicker();
		}
	};

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
			<Input {...register("description")} placeholder="Description" />

			<Input type="number" {...register("amount")} placeholder="Amount" />

			<div className="relative isolate w-full">
				<Select
					onValueChange={(value) =>
						setValue("category", value as Transaction["category"])
					}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Category" />
					</SelectTrigger>
					<SelectContent
						position="popper"
						sideOffset={8}
						className="z-[60] w-[--radix-select-trigger-width] border border-border bg-white shadow-xl supports-[backdrop-filter]:bg-popover/90"
					>
						{FINANCE_CATEGORIES.map((cat) => (
							<SelectItem className="hover:bg-gray-200" key={cat} value={cat}>
								{cat}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<Input
				type="date"
				{...dateField}
				ref={(element) => {
					dateField.ref(element);
					dateInputRef.current = element;
				}}
				onClick={openDatePicker}
				onFocus={openDatePicker}
			/>

			<div className="relative isolate w-full">
				<Select
					onValueChange={(value) =>
						setValue("type", value as Transaction["type"])
					}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Type" />
					</SelectTrigger>
					<SelectContent
						position="popper"
						sideOffset={8}
						className="z-[60] w-[--radix-select-trigger-width] border border-border bg-white shadow-xl supports-backdrop-filter:bg-popover/90"
					>
						<SelectItem className="hover:bg-gray-200" value="expense">
							Expense
						</SelectItem>
						<SelectItem className="hover:bg-gray-200" value="income">
							Income
						</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<Button
				variant={"outline"}
				className="bg-black text-white/90 hover:bg-gray-800 hover:text-white"
				type="submit"
			>
				Add Transaction
			</Button>
		</form>
	);
}
