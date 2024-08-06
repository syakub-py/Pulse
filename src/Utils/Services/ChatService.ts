import AsyncStorageClass from "../../Classes/AsyncStorage";
import http from "../HttpCommon";
import {IMessage} from "react-native-gifted-chat";
import {AxiosResponse} from "axios";
import {auth} from "../Firebase";

export default new class ChatService {
	async generateChatResponse(prompt:string):Promise<string>{
		const chatId = await AsyncStorageClass.getDataFromStorage("chatId");
		const response = await http.get(`/chat/generateResponse/${chatId.toString()}/${prompt}`);
		return response.data.text;
	}

	async getMessages(chatId:number):Promise<IMessage[]> {
		const response: AxiosResponse<ChatMessage[]> = await http.get<ChatMessage[]>(`/chat/getMessages/${chatId}`);
		const data: ChatMessage[] = response.data;
		return data.map(msg => ({
			_id: msg._id,
			text: msg.text,
			createdAt: new Date(msg.createdAt),
			user: {
				_id: msg.user === "user" ? 1 : 2,
				name: msg.user,
				avatar:msg.user === "user" ? auth.currentUser?.photoURL : require("../../../assets/icon.png")
			}
		}));
	}

	async createChat(userId:string):Promise<void> {
		const response = await http.get(`/chat/createChat/${userId}`);
		await AsyncStorageClass.saveDataToStorage("chatId", response.data.chat_id);
	}
}();
