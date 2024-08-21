import http from "../HttpCommon";

export default new class TenantService {
	private readonly serviceHeader = "/tenant";

	async getTenants(userId: string): Promise<User[]> {
		const response = await http.get(`${this.serviceHeader}/getTenants/${userId}`);
		return JSON.parse(response.data) as User[];
	}

	async isCodeValid(code: string): Promise<CodeValidationResponse | HTTPError> {
		const response = await http.get(`${this.serviceHeader}/checkTenantCode/${code}`);
		return response.data;
	}
}();
