import http from "../HttpCommon";

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


}
