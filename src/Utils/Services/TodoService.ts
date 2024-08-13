import http from "../HttpCommon";
import _ from "lodash";

export default new class TodoService {
	private readonly serviceHeader = "/todo";

	async addTodo(todoDetails: Todo): Promise<AddTodoResponse> {
		try {
			const response = await http.post(`${this.serviceHeader}/addTodo/`, todoDetails);
			return response.data;
		} catch (error) {
			console.error("Error adding Todo:", error);
			alert("Failed to add Todo");
			return {todoId:0, recommendedProfessional:""};
		}
	}

	async getTodos(propertyId: number): Promise<Todo[]> {
		try {
			const response = await http.get(`${this.serviceHeader}/getTodos/${propertyId}`);

			if (_.isEmpty(response.data)) return [];

			return JSON.parse(response.data) as Todo[];

		} catch (error) {
			console.error("Error getting Todos:", error);
			alert("Error getting Todos");
			return [];
		}
	}


}
