
declare global {
	interface Lease {
		LeaseId?: number;
		TenantName: string;
		StartDate: string;
		EndDate: string;
		MonthlyRent: number | null;
		Terms:string;
		isLeaseExpired: boolean;
		isTenantCodeExpired?: boolean;
		TenantUid?:string;
	}
}

export { };
