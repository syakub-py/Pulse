import http from "../HttpCommon";

export default new class PropertyService {
	private readonly serviceHeader = "/property";

	async addProperty(userId:string, propertyDetails:Property):Promise<number> {
		try {
			const response = await http.post(`${this.serviceHeader}/addProperty/${userId}`, propertyDetails);
			return response.data.property_id;
		} catch (error) {
			console.log(error);
			alert("An error occurred while adding property");
			return 0;
		}
	}
	async getProperty(userId:string):Promise<Property[]> {
		try {
			const response = await http.get(`${this.serviceHeader}/getProperty/${userId}`);
			return JSON.parse(response.data) as Property[];
		} catch (error) {
			console.log(error);
			alert("An error occurred while getting property");
			return [];
		}
	}
	async deleteProperty(propertyId: number): Promise<void> {
		try {
			await http.delete(`${this.serviceHeader}/deleteProperty/${propertyId}`);
		} catch (error) {
			console.log(error);
			alert("An error occurred while deleting property");
		}
	}
}();
