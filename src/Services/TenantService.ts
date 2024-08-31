import PulseHttpClient from "../Classes/PulseHTTPClient";

export default class TenantService {
	private readonly serviceHeader = "/tenant";

	constructor(private readonly httpClient: PulseHttpClient) {
	}

	async getTenants(userId: string): Promise<User[] | HTTPError> {
		const response = await this.httpClient.http.get(`${this.serviceHeader}/getTenants/${userId}`);
		return JSON.parse(response.data);
	}

	async isCodeValid(code: string): Promise<CodeValidationResponse | HTTPError> {
		const response = await this.httpClient.http.get(`${this.serviceHeader}/checkTenantCode/${code}`);
		return response.data;
	}
};
