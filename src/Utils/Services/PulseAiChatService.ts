import AsyncStorageClass from "../../Classes/AsyncStorage";
import http from "../HttpCommon";


export default new class PulseAiChatService {
	private readonly serviceHeader = "/pulseChat";

	async generateChatResponse(prompt: string): Promise<string> {
		const chatId = await AsyncStorageClass.getDataFromStorage("chatId");
		const response = await http.get(`${this.serviceHeader}/generateResponse/${chatId.toString()}/${prompt}`);
		return response.data.text;

	}

	async createPulseChat(userId: string): Promise<void> {
		const response = await http.get(`chat/createChat/${userId}/PulseAI`);
		await AsyncStorageClass.saveDataToStorage("chatId", response.data.chat_id);
	}

}();
