import http from "./HttpCommon";
import {AxiosResponse} from "axios";
import AsyncStorageClass from "../Classes/AsyncStorage";
import {IMessage} from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default new class DataService {
	async getWeather(city:string, apiKey:string):Promise<AxiosResponse<WeatherResponse> | undefined> {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
		try {
			return await http.get<WeatherResponse>(url);
		} catch (error) {
			console.log(`Error retrieving weather data: ${error}`);
		}
	}

	async generateChatResponse(prompt:string):Promise<string>{
		const response = await http.get("/generateResponse/2/" + prompt);
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
			}
		}));
	}

	async createChat(userId:string):Promise<void> {
		const response = await http.get("/createChat/" + userId);
		console.log("Chat_id: " + response.data.chat_id);
		// void AsyncStorageClass.saveDataToStorage("chatId", response.data.chat_id);
	}

}();
