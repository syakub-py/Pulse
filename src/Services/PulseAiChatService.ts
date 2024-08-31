import PulseHttpClient from "../Classes/PulseHTTPClient";
import AsyncStorageClass from "../Classes/AsyncStorage";

export default class PulseAiChatService {
	private readonly serviceHeader = "/pulseChat";

	constructor(private readonly httpClient: PulseHttpClient) {
	}

	async generateChatResponse(prompt: string): Promise<string> {
		const chatId = await AsyncStorageClass.getDataFromStorage("chatId");
		const response = await this.httpClient.http.get(`${this.serviceHeader}/generateResponse/${chatId.toString()}/${prompt}`);
		return response.data.text;

	}

	async createPulseChat(userId: string): Promise<void> {
		const response = await this.httpClient.http.get(`chat/createChat/${userId}/PulseAI`);
		await AsyncStorageClass.saveDataToStorage("chatId", response.data.chat_id);
	}
};
