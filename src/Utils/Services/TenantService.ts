import http from "../HttpCommon";
import _ from "lodash";

export default new class TenantService {
	async addTenant(tenantDetails: Tenant): Promise<number> {
		try {
			const response = await http.post("/tenant/addTenant/", tenantDetails);
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

	async startTenantSignUp(LeaseId: string, tenantEmail: string): Promise<void> {
		try{
			await http.get(`/tenant/startTenantSignUp/${LeaseId}/${tenantEmail}`);
		}catch (error){
			alert("Failed to send tenant invite");
			console.error("Error creating tenant:", error);
		}
	}

	async isCodeValid(code: string): Promise<boolean> {
		try {
			const response = await http.get(`/tenant/checkTenantCode/${code}`);
			return !_.isUndefined(response.data);
		} catch (error) {
			return false;
		}
	}

}();
