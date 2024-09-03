import PulseHttpClient from "../Classes/PulseHTTPClient";

export default class UserService {
	private readonly serviceHeader = "/user";

	constructor(private readonly httpClient: PulseHttpClient) {
	}

	async addUser(userDetails: User): Promise<number | HTTPError> {
		const response = await this.httpClient.http.post(`${this.serviceHeader}/addUser/`, userDetails);
		return response.data;
	}

	async getUid(username:string, firebase_uid:string): Promise<number | HTTPError> {
		const response = await this.httpClient.http.get(`${this.serviceHeader}/getUid/${firebase_uid}/${username}`);
		return response.data;
	}

	async sendSignUpEmail(leaseId:number, email:string):Promise<void | HTTPError> {
		await this.httpClient.http.get(`/api/sendEmail/${leaseId}/${email.toLowerCase()}`);
	}

	async deleteUser(userId:number):Promise<void | HTTPError> {
		await this.httpClient.http.delete(`${this.serviceHeader}/deleteUser/${userId}`);
	}
};
