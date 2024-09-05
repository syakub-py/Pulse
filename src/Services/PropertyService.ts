import _ from "lodash";
import PulseHttpClient from "../Classes/PulseHTTPClient";

export default class PropertyService {
	private readonly serviceHeader = "/property";

	constructor(private readonly httpClient: PulseHttpClient) {
	}

	async addProperty(postgresUserId:number,firebaseUserId:string, propertyDetails:Property):Promise<number | HTTPError> {
		const response = await this.httpClient.http.post(`${this.serviceHeader}/addProperty/${postgresUserId}/${firebaseUserId}`, propertyDetails);
		console.log(response.data.property_id);
		return response.data.property_id;
	}

	async getProperty(userId:number):Promise<Property[] | HTTPError> {
		const response = await this.httpClient.http.get(`${this.serviceHeader}/getProperty/${userId}`);
		return JSON.parse(response.data);
	}

	async deleteProperty(propertyId: number): Promise<void | HTTPError> {
		const response = await this.httpClient.http.delete(`${this.serviceHeader}/deleteProperty/${propertyId}`);
		if (!_.isUndefined(response.data)) return response.data;
	}
};
