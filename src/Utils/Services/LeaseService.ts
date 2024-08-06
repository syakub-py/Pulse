import http from "../HttpCommon";

export default new class LeaseService {

	async addLease(propertyId:number, leaseDetails:Lease):Promise<number> {
		const response = await http.post(`/lease/addLease/${propertyId}`, leaseDetails);
		return response.data.lease_id;
	}
	async getLeases(propertyId:number):Promise<Lease[]> {
		const response = await http.get(`/lease/getLeases/${propertyId}`);
		return JSON.parse(response.data) as Lease[];
	}

	async deleteLease(leaseId:number):Promise<void> {
		await http.delete(`/lease/deleteLease/${leaseId}`);
	}
}();
