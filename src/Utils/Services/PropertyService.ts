import http from "../HttpCommon";
import _ from "lodash";

export default new class PropertyService {
	private readonly serviceHeader = "/property";

	async addProperty(userId:string, propertyDetails:Property):Promise<number | HTTPError> {
		const response = await http.post(`${this.serviceHeader}/addProperty/${userId}`, propertyDetails);
		return response.data;
	}

	async getProperty(userId:string):Promise<Property[] | HTTPError> {
		const response = await http.get(`${this.serviceHeader}/getProperty/${userId}`);
		return JSON.parse(response.data);
	}

	async deleteProperty(propertyId: number): Promise<void | HTTPError> {
		const response = await http.delete(`${this.serviceHeader}/deleteProperty/${propertyId}`);
		if (!_.isUndefined(response.data)) return response.data;
	}
}();
