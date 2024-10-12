
declare global {
	interface Property {
		PropertyId?: number,
		Name:string,
		Address: string;
		PropertyType: string;
		isRental:boolean;
		PurchasePrice:string,
		Taxes:string,
		MortgagePayment:string,
		OperatingExpenses:string,
		isCurrentUserTenant?:boolean;
	}
}

export { };
