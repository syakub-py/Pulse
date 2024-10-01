import {IMessage} from "react-native-gifted-chat";
import {AxiosResponse} from "axios";
import PulseHttpClient from "../Classes/PulseHTTPClient";

export default class ChatService {
	private readonly serviceHeader = "/chat";

	constructor(private readonly httpClient: PulseHttpClient) {
	}

	async getMessages(chatId: number): Promise<IMessage[]> {
		const response: AxiosResponse<GetChatResponse> = await this.httpClient.http.get<GetChatResponse>(`${this.serviceHeader}/getMessages/${chatId}`);
		return response.data.data;
	}

	async getChats(userId: number): Promise<Chat[] | HTTPError> {
		const response = await this.httpClient.http.get(`${this.serviceHeader}/getChats/${userId}`);
		return response.data.chats;
	}
};
