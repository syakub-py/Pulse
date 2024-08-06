import http from "../HttpCommon";

export default new class PropertyService {
	async addProperty(userId:string, propertyDetails:Property):Promise<number> {
		const response = await http.post(`/property/addProperty/${userId}`, propertyDetails);
		return response.data.property_id;
	}
	async getProperty(userId:string):Promise<Property[]> {
		const response = await http.get(`/property/getProperty/${userId}`);
		return JSON.parse(response.data) as Property[];
	}
	async deleteProperty(propertyId: number):Promise<void> {
		await http.delete(`/property/deleteProperty/${propertyId}`);
	}
}();
