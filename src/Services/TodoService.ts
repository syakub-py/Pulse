import PulseHttpClient from "../Classes/PulseHTTPClient";
import _ from "lodash";

export default class TodoService {
	private readonly serviceHeader = "/todo";

	constructor(private readonly httpClient: PulseHttpClient) {
	}

	async addTodo(todoDetails: Todo): Promise<number | HTTPError> {
		const response = await this.httpClient.http.post(`${this.serviceHeader}/addTodo/`, todoDetails);
		return response.data.todo_id;
	}

	async getTodos(propertyId: number): Promise<Todo[] | HTTPError> {
		const response = await this.httpClient.http.get(`${this.serviceHeader}/getTodos/${propertyId}`);
		return response.data.data;
	}

	async deleteTodo(todoId: number): Promise<void | HTTPError> {
		const response = await this.httpClient.http.delete(`${this.serviceHeader}/deleteTodo/${todoId}`);
		if (!_.isUndefined(response.data)) return response.data;
	}

	async getRecommendations(todoId: number, propertyAddress:string): Promise<GoogleMapsPlaceResponse[]> {
		const response = await this.httpClient.http.get(`${this.serviceHeader}/getRecommendations/${todoId}/${propertyAddress}`);
		return response.data.data;
	}
};
