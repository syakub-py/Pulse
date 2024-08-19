import http from "../HttpCommon";
import _ from "lodash";

export default new class TodoService {
	private readonly serviceHeader = "/todo";

	async addTodo(todoDetails: Todo): Promise<number | HTTPError> {
		const response = await http.post(`${this.serviceHeader}/addTodo/`, todoDetails);
		return response.data;
	}

	async getTodos(propertyId: number): Promise<Todo[] | HTTPError> {
		const response = await http.get(`${this.serviceHeader}/getTodos/${propertyId}`);
		return JSON.parse(response.data);
	}

	async deleteTodo(todoId: number): Promise<void | HTTPError> {
		const response = await http.delete(`${this.serviceHeader}/deleteTodo/${todoId}`);
		if (!_.isUndefined(response.data)) return response.data;
	}

	async getRecommendations(todoId: number): Promise<GoogleMapsPlaceResponse[]> {
		const response = await http.get(`${this.serviceHeader}/getRecommendations/${todoId}`);
		return response.data;
	}

};
