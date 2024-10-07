
declare global {
	interface User {
		id?:number;
		LeaseId: number | null;
		UserId: string;
		Name:string;
		PhoneNumber:string;
		Email:string;
		AnnualIncome:number;
		DateOfBirth:string;
		DocumentType:string;
		DocumentProvidedUrl:string;
		SocialSecurity:string;
	}

	interface CodeValidationResponse {
		isValid: boolean;
		lease_id: number;
	}

}

export { };
