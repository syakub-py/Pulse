import http from "../HttpCommon";

export default new class TenantService {
	private readonly serviceHeader = "/tenant";

	async addTenant(tenantDetails: Tenant): Promise<number | HTTPError> {
		const response = await http.post(`${this.serviceHeader}/addTenant/`, tenantDetails);
		return response.data;
	}

	async getTenants(userId: string): Promise<Tenant[]> {
		const response = await http.get(`${this.serviceHeader}/getTenants/${userId}`);
		return JSON.parse(response.data) as Tenant[];

	}

	async isCodeValid(code: string): Promise<CodeValidationResponse> {
		const response = await http.get(`${this.serviceHeader}/checkTenantCode/${code}`);
		return response.data;
	}
}();
