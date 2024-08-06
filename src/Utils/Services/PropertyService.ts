import http from "../HttpCommon";

export default new class PropertyService {
	async addProperty(userId:string, propertyDetails:Property):Promise<number> {
		const response = await http.post(`/addProperty/${userId}`, propertyDetails);
		return response.data.property_id;
	}
	async getProperty(userId:string):Promise<Property[]> {
		const response = await http.get(`/getProperty/${userId}`);
		return JSON.parse(response.data) as Property[];
	}
	async deleteProperty(propertyId: number):Promise<void> {
		await http.delete(`/deleteProperty/${propertyId}`);
	}
}();
