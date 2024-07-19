import http from "./HttpCommon";
import {AxiosResponse} from "axios";

export default new class DataService {
	async getWeather(city:string, apiKey:string):Promise<AxiosResponse<WeatherResponse> | undefined> {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
		try {
			return await http.get<WeatherResponse>(url);
		} catch (error) {
			console.log(`Error retrieving weather data: ${error}`);
		}
	}
	async generateChatResponse(){
		const response = await http.get("http://127.0.0.1:8000/generateResponse/who%20are%20you?");
		console.log(response.data.response);
	}
}();
