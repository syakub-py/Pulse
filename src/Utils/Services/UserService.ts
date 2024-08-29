import http from "@src/Utils/HttpCommon";

export default new class UserService {
	private readonly serviceHeader = "/user";
	async addUser(userDetails: User): Promise<number | HTTPError> {
		const response = await http.post(`${this.serviceHeader}/addUser/`, userDetails);
		return response.data;
	}

	async sendSignUpEmail(leaseId:number, email:string):Promise<void | HTTPError> {
		await http.get(`/api/sendEmail/${leaseId}/${email.toLowerCase()}`);
	}

	async deleteUser(userId:string):Promise<void | HTTPError> {
		await http.delete(`${this.serviceHeader}/deleteUser/${userId}`);
	}
};
