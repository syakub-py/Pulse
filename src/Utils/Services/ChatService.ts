import AsyncStorageClass from "../../Classes/AsyncStorage";
import http from "../HttpCommon";
import {IMessage} from "react-native-gifted-chat";
import {AxiosResponse} from "axios";
import {auth} from "../Firebase";

export default new class ChatService {
	private readonly serviceHeader = "/chat";

	async generateChatResponse(prompt: string): Promise<string> {
		try {
			const chatId = await AsyncStorageClass.getDataFromStorage("chatId");
			const response = await http.get(`${this.serviceHeader}/generateResponse/${chatId.toString()}/${prompt}`);
			return response.data.text;
		} catch (error) {
			console.error("Error generating chat response:", error);
			alert("Failed to generate chat");
			return "";
		}
	}

	async getMessages(chatId: number): Promise<IMessage[]> {
		try {
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
		} catch (error) {
			console.error("Error fetching messages:", error);
			alert("Failed to getting messages");
			return [];
		}
	}

	async createChat(userId: string): Promise<void> {
		try {
			const response = await http.get(`${this.serviceHeader}/createChat/${userId}`);
			await AsyncStorageClass.saveDataToStorage("chatId", response.data.chat_id);
		} catch (error) {
			console.error("Error creating chat:", error);
			alert("Failed to create chat");
		}
	}
}();
