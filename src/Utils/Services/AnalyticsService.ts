import http from "../HttpCommon";



export default new class AnalyticsService {
	private readonly serviceHeader = "/analytics";

	async getExpenseAnalytics(propertyId: number): Promise<ExpenseAnalytic[] | HTTPError> {
		const response = await http.get(`${this.serviceHeader}/generateExpenseAnalytics/${propertyId}`);
		return response.data;
	}

	async addExpenseAnalytics(expenseDetails: ExpenseAnalytic): Promise<ExpenseAnalytic | HTTPError> {
		const response = await http.post(`${this.serviceHeader}/generateExpenseAnalytics/`);
	}
}();
