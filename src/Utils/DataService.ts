import http from "./HttpCommon";
import {AxiosResponse} from "axios";
import AsyncStorageClass from "../Classes/AsyncStorage";
import {IMessage} from "react-native-gifted-chat";
import {auth} from "./Firebase";

export default new class DataService {
	async generateChatResponse(prompt:string):Promise<string>{
		const chatId = await AsyncStorageClass.getDataFromStorage("chatId");
		const response = await http.get("/generateResponse/"+chatId.toString()+"/" + prompt);
		return response.data.text;
	}

	async getMessages(chatId:number):Promise<IMessage[]> {
		const response: AxiosResponse<ChatMessage[]> = await http.get<ChatMessage[]>(`/getMessages/${chatId}`);
		const data: ChatMessage[] = response.data;
		return data.map(msg => ({
			_id: msg._id,
			text: msg.text,
			createdAt: new Date(msg.createdAt),
			user: {
				_id: msg.user === "user" ? 1 : 2,
				name: msg.user,
				avatar:msg.user === "user" ? auth.currentUser?.photoURL : require("../../assets/icon.png")
			}
		}));
	}

	async createChat(userId:string):Promise<void> {
		const response = await http.get("/createChat/" + userId);
		await AsyncStorageClass.saveDataToStorage("chatId", response.data.chat_id);
	}

	async addProperty(userId:string, propertyDetails:Property):Promise<number> {
		const response = await http.post("/addProperty/" + userId, propertyDetails);
		return response.data.property_id;
	}
	async getProperty(userId:string):Promise<Property[]> {
		const response = await http.get("/getProperty/" + userId);
		return JSON.parse(response.data) as Property[];
	}
	async deleteProperty(propertyId: number):Promise<void> {
		await http.delete("/deleteProperty/" + propertyId);
	}

	async addLease(propertyId:number, leaseDetails:Lease):Promise<number> {
		const response = await http.post("/addLease/" + propertyId, leaseDetails);
		return response.data.lease_id;
	}
	async getLeases(propertyId:number):Promise<Lease[]> {
		const response = await http.get("/getLeases/" + propertyId);
		return JSON.parse(response.data) as Lease[];
	}

	async deleteLease(leaseId:number):Promise<void> {
		await http.delete("/deleteLease/" + leaseId);
	}
	async addTenant(LeaseId:number, tenantDetails:Tenant ){
		const response = await http.post("/addTenant/" + LeaseId, tenantDetails);
		return response.data.tenant_id;
	}
	async getTenants(userId:string):Promise<Tenant[]> {
		const response = await http.get("/getTenants/" + userId);
		return JSON.parse(response.data) as Tenant[];
	}
}();
