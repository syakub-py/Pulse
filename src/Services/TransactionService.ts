import PulseHttpClient from "../Classes/PulseHTTPClient";

export default class TransactionService {
	private readonly serviceHeader = "/transaction";

	constructor(private readonly httpClient: PulseHttpClient) {
	}

	async addTransaction(transaction: PropertyTransaction): Promise<number | HTTPError> {
		const response = await this.httpClient.http.post(`${this.serviceHeader}/addTransaction/`, transaction);
		return response.data;
	}

	async getTransaction(propertyId:number):Promise<PropertyTransaction[] | HTTPError> {
		const response = await this.httpClient.http.get(`${this.serviceHeader}/getTransaction/${propertyId}`);
		return JSON.parse(response.data);
	}
};
