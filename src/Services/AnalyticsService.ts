import PulseHttpClient from "../Classes/PulseHTTPClient";

export default class AnalyticsService {
	private readonly serviceHeader = "/analytics";

	constructor(private readonly httpClient: PulseHttpClient) {
	}

	async getExpenseAnalytics(propertyId: number): Promise<ExpenseAnalytic[] | HTTPError> {
		const response = await this.httpClient.http.get(`${this.serviceHeader}/generateExpenseAnalytics/${propertyId}`);
		return response.data.data;
	}

	async getIncomeAnalytics(propertyId: number): Promise<IncomeAnalytic | HTTPError> {
		const response = await this.httpClient.http.get(`${this.serviceHeader}/generateIncomeAnalytics/${propertyId}`);
		return response.data.data;
	}
};
