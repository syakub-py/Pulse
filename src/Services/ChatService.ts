import {IMessage} from "react-native-gifted-chat";
import {AxiosResponse} from "axios";
import {auth} from "@src/Utils/Firebase";
import PulseHttpClient from "../Classes/PulseHTTPClient";

export default class ChatService {
	private readonly serviceHeader = "/chat";

	constructor(private readonly httpClient: PulseHttpClient) {
	}

	async getMessages(chatId: number): Promise<IMessage[]> {
		const response: AxiosResponse<GetChatResponse> = await this.httpClient.http.get<GetChatResponse>(`${this.serviceHeader}/getMessages/${chatId}`);
		const data= response.data.data;
		return data.map(msg => ({
			_id: msg._id,
			text: msg.text,
			createdAt: new Date(msg.createdAt),
			user: {
				_id: msg.username === "user" ? 1 : 2,
				name: msg.username,
				avatar: msg.username === "user" ? auth.currentUser?.photoURL : require("../../assets/icon.png")
			}
		}));
	}

	async getChats(userId: number): Promise<Chat[] | HTTPError> {
		const response = await this.httpClient.http.get(`${this.serviceHeader}/getChats/${userId}`);
		return response.data.chats;
	}
};
