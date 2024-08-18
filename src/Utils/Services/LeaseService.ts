import http from "../HttpCommon";
import _ from "lodash";


export default new class LeaseService {
	private readonly serviceHeader = "/lease";

	async addLease(propertyId: number, tenantEmail:string,leaseDetails: Lease): Promise<number | HTTPError> {
		const response =  await http.post(`${this.serviceHeader}/addLease/${tenantEmail}/${propertyId}`, leaseDetails);
		return response.data;
	}

	async getLeases(propertyId: number): Promise<Lease[] | HTTPError> {
		const response= await http.get(`${this.serviceHeader}/getLeases/${propertyId}`);
		return response.data;
	}

	async deleteLease(leaseId: number): Promise<void | HTTPError> {
		const response = await http.delete(`${this.serviceHeader}/deleteLease/${leaseId}`);
		if (!_.isUndefined(response.data)) return response.data;
	}
}();
