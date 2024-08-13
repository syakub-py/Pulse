import http from "../HttpCommon";

export default new class TenantService {
	private readonly serviceHeader = "/tenant";

	async addTenant(tenantDetails: Tenant): Promise<number> {
		try {
			const response = await http.post(`${this.serviceHeader}/addTenant/`, tenantDetails);
			return response.data.tenant_id;
		} catch (error) {
			console.error("Error adding tenant:", error);
			alert("Failed to add Tenant");
			return 0;
		}
	}

	async getTenants(userId: string): Promise<Tenant[]> {
		try {
			const response = await http.get(`${this.serviceHeader}/getTenants/${userId}`);
			return JSON.parse(response.data) as Tenant[];
		} catch (error) {
			console.error("Error fetching tenants:", error);
			alert("Failed to fetch tenants");
			return [];
		}
	}

	async startTenantSignUp(LeaseId: string, tenantEmail: string): Promise<void> {
		try{
			await http.get(`${this.serviceHeader}/startTenantSignUp/${LeaseId}/${tenantEmail}`);
		}catch (error){
			alert("Failed to send tenant invite");
			console.error("Error creating tenant:", error);
		}
	}

	async isCodeValid(code: string): Promise<CodeValidationResponse > {
		try {
			const response = await http.get(`${this.serviceHeader}/checkTenantCode/${code}`);
			return response.data;
		} catch (error) {
			return {isValid:false, lease_id:0};
		}
	}

}();
