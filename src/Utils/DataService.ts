import { AxiosResponse } from "axios";
import http from "./HttpCommon";

export default new class DataService {
	async getAllEvents(): Promise<AxiosResponse<string[]>> {
		return await http.get<string[]>("");
	}
}();
