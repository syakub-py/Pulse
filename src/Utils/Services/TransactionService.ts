import http from "../HttpCommon";


export default new class TransactionService {
	private readonly serviceHeader = "/transaction";
	async addTransaction(transaction: PropertyTransaction): Promise<number | HTTPError> {
		const response = await http.post(`${this.serviceHeader}/addTransaction/`, transaction);
		return response.data;
	}

	async getTransaction(propertyId:number):Promise<PropertyTransaction[] | HTTPError> {
		const response = await http.get(`${this.serviceHeader}/getTransactions/${propertyId}`);
		return JSON.parse(response.data);
	}
}();
