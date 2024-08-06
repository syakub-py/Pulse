import http from "../HttpCommon";

export default new class LeaseService {
	async addLease(propertyId: number, leaseDetails: Lease): Promise<number> {
		try {
			const response = await http.post(`/lease/addLease/${propertyId}`, leaseDetails);
			return response.data.lease_id;
		} catch (error) {
			console.error("Error adding lease:", error);
			alert("There an internal error occurred while adding a Lease");
			return 0;
		}
	}

	async getLeases(propertyId: number): Promise<Lease[]> {
		try {
			const response = await http.get(`/lease/getLeases/${propertyId}`);
			return JSON.parse(response.data) as Lease[];
		} catch (error) {
			console.error("Error fetching leases:", error);
			alert("There an internal error occurred while trying to get leases");
			return [];
		}
	}

	async deleteLease(leaseId: number): Promise<void> {
		try {
			await http.delete(`/lease/deleteLease/${leaseId}`);
		} catch (error) {
			console.error("Error deleting lease:", error);
			alert("There an internal error occurred while trying to delete leases");
		}
	}
}();
