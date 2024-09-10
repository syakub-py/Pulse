import _ from "lodash";
import PulseHttpClient from "../Classes/PulseHTTPClient";

export default class LeaseService {
	private readonly serviceHeader = "/lease";

	constructor(private readonly httpClient: PulseHttpClient) {
	}

	async addLease(propertyId: number, leaseDetails: Lease): Promise<number | HTTPError> {
		const response =  await this.httpClient.http.post(`${this.serviceHeader}/addLease/${propertyId}`, leaseDetails);
		return response.data.lease_id;
	}

	async getLeases(propertyId: number): Promise<Lease[] | HTTPError> {
		const response= await this.httpClient.http.get(`${this.serviceHeader}/getLeases/${propertyId}`);
		return response.data.data;
	}

	async deleteLease(leaseId: number): Promise<void | HTTPError> {
		const response = await this.httpClient.http.delete(`${this.serviceHeader}/deleteLease/${leaseId}`);
		if (!_.isUndefined(response.data)) return response.data;
	}
};
