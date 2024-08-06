import http from "../HttpCommon";

export default new class PropertyService {
	async addProperty(userId:string, propertyDetails:Property):Promise<number> {
		try {
			const response = await http.post(`/property/addProperty/${userId}`, propertyDetails);
			return response.data.property_id;
		} catch (error) {
			console.log(error);
			alert("An error occurred while adding property");
			return 0;
		}
	}
	async getProperty(userId:string):Promise<Property[]> {
		try {
			const response = await http.get(`/property/getProperty/${userId}`);
			return JSON.parse(response.data) as Property[];
		} catch (error) {
			console.log(error);
			alert("An error occurred while getting property");
			return [];
		}
	}
	async deleteProperty(propertyId: number): Promise<void> {
		try {
			await http.delete(`/property/deleteProperty/${propertyId}`);
		} catch (error) {
			console.log(error);
			alert("An error occurred while deleting property");
		}
	}
}();
