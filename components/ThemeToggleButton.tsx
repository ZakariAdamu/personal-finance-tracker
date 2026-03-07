"use client";

import * as React from "react";
import { Check, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggleButton() {
	const { theme, resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	const activeTheme = theme === "system" ? resolvedTheme : theme;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					{mounted && activeTheme === "dark" ? (
						<Moon className="h-[1.2rem] w-[1.2rem]" />
					) : (
						<Sun className="h-[1.2rem] w-[1.2rem]" />
					)}
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme("light")}>
					<Check
						className={`mr-2 h-4 w-4 ${theme === "light" ? "opacity-100" : "opacity-0"}`}
					/>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					<Check
						className={`mr-2 h-4 w-4 ${theme === "dark" ? "opacity-100" : "opacity-0"}`}
					/>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>
					<Check
						className={`mr-2 h-4 w-4 ${theme === "system" ? "opacity-100" : "opacity-0"}`}
					/>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
