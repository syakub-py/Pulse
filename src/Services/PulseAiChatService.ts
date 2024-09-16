import PulseHttpClient from "../Classes/PulseHTTPClient";
import AsyncStorageClass from "../Classes/AsyncStorage";

export default class PulseAiChatService {
	private readonly serviceHeader = "/pulseChat";

	constructor(private readonly httpClient: PulseHttpClient) {
	}

	async generateChatResponse(prompt: string, chatId:number, senderId:number): Promise<string> {
		const response = await this.httpClient.http.get(`${this.serviceHeader}/generateResponse/${chatId}/${prompt}/${senderId}`);
		return response.data.data;
	}
};
