import http from "../HttpCommon";
import _ from "lodash";

export default new class TodoService {
	private readonly serviceHeader = "/todo";

	async addTodo(todoDetails: Todo): Promise<AddTodoResponse | HTTPError> {
		const response = await http.post(`${this.serviceHeader}/addTodo/`, todoDetails);
		return response.data;
	}

	async getTodos(propertyId: number): Promise<Todo[] | HTTPError> {
		const response = await http.get(`${this.serviceHeader}/getTodos/${propertyId}`);
		return response.data;
	}

	async deleteTodo(todoId: number): Promise<void | HTTPError> {
		const response = await http.delete(`${this.serviceHeader}/deleteTodo/${todoId}`);
		if (!_.isUndefined(response.data)) return response.data;
	}
};
