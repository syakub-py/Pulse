declare global {
	interface ExpenseAnalytic {
		name: string;
		expenseAmount: number;
		color: string;
		legendFontColor: string;
		legendFontSize: number;
	}

	interface IncomeAnalytic {
		labels: string[];
		data: number[];
		color: string;
	}

	interface PropertyTransaction {
		id?:number
		userId?:string
		propertyId?:number;
		amount: number
		description: string
		transactionType: string
		incomeOrExpense:string
		date:string
	}
}

export { };
