import AsyncStorageClass from "@src/Classes/AsyncStorage";
import http from "@src/Utils/HttpCommon";
import {IMessage} from "react-native-gifted-chat";
import {AxiosResponse} from "axios";
import {auth} from "@src/Utils/Firebase";

export default new class ChatService {
	private readonly serviceHeader = "/chat";

	async getMessages(chatId: number): Promise<IMessage[]> {
		const response: AxiosResponse<ChatMessage[]> = await http.get<ChatMessage[]>(`${this.serviceHeader}/getMessages/${chatId}`);
		const data: ChatMessage[] = response.data;
		return data.map(msg => ({
			_id: msg._id,
			text: msg.text,
			createdAt: new Date(msg.createdAt),
			user: {
				_id: msg.user === "user" ? 1 : 2,
				name: msg.user,
				avatar: msg.user === "user" ? auth.currentUser?.photoURL : require("../../../assets/icon.png")
			}
		}));

	}


	async createChat(userId: string): Promise<number | HTTPError> {
		const response = await http.get(`${this.serviceHeader}/createChat/${userId}`);
		return response.data;
	}

	async getChats(userId: string): Promise<Chat[]> {
		const response = await http.get(`${this.serviceHeader}/createChat/${userId}`);
		return response.data;
	}

}();
