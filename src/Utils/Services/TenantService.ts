import http from "../HttpCommon";

export default new class TenantService {
	async addTenant(leaseId: number, tenantDetails: Tenant): Promise<number> {
		try {
			const response = await http.post(`/tenant/addTenant/${leaseId}`, tenantDetails);
			return response.data.tenant_id;
		} catch (error) {
			console.error("Error adding tenant:", error);
			alert("Failed to add Tenant");
			return 0;
		}
	}

	async getTenants(userId: string): Promise<Tenant[]> {
		try {
			const response = await http.get(`/tenant/getTenants/${userId}`);
			return JSON.parse(response.data) as Tenant[];
		} catch (error) {
			console.error("Error fetching tenants:", error);
			alert("Failed to fetch tenants");
			return [];
		}
	}
}();
