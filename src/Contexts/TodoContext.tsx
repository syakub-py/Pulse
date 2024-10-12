import {action, makeAutoObservable, runInAction} from "mobx";
import isHTTPError from "@src/Utils/HttpError";
import _ from "lodash";
import {PulseApiClient} from "@src/Contexts/PulseApiClientContext";
import {createContext, useContext, useMemo} from "react";


class TodoContextClass {
	public selectedTodo: Todo | null = null;
	public selectedPropertyTodos: Todo[] = [];
	private pulseApiClient: PulseApiClient;

	constructor(pulseApiClient: PulseApiClient) {
		makeAutoObservable(this);
		this.pulseApiClient = pulseApiClient;
	}

	public setSelectedPropertyTodos = action((todos: Todo[]) => {
		runInAction(() => {
			this.selectedPropertyTodos = todos;
		});
	});

	public getSelectedPropertyTodos = action(async (propertyId:number) => {
		const response = await this.pulseApiClient.todoService.getTodos(propertyId);
		if (isHTTPError(response)) {
			alert(response.message);
			return;
		}
		this.setSelectedPropertyTodos(response as Todo[]);
	});

	public addTodo = action(async (todo: Todo) => {
		try {
			if (_.isUndefined(this.selectedPropertyTodos)) {
				this.selectedPropertyTodos = [];
			}
			const response = await this.pulseApiClient.todoService.addTodo(todo);
			if (isHTTPError(response)) {
				alert(response.message);
				return false;
			}
			todo.id = response;
			runInAction(() => {
				this.selectedPropertyTodos.push(todo);
			});
			return true;
		} catch (e) {
			alert(e);
			return false;
		}

	});

	public deleteTodo = action(async (todoId: number) => {
		const response = await this.pulseApiClient.todoService.deleteTodo(todoId);
		if (isHTTPError(response)) {
			alert(response.message);
			return;
		}

		runInAction(() => {
			this.selectedPropertyTodos = this.selectedPropertyTodos.filter((todo) => todo.id !== todoId);
		});
	});

	public setSelectedPropertyTodo = action((todo: Todo) => {
		runInAction(() => {
			this.selectedTodo = todo;
		});
	});

	public getRecommendations = action(async (todoId: number, SelectedProperty:Property) => {
		try {
			if (_.isNil(SelectedProperty)) return [];
			const response = await this.pulseApiClient.todoService.getRecommendations(todoId, SelectedProperty.Address);
			if (isHTTPError(response)) {
				alert(response.message);
				return [];
			}
			return response;
		} catch (error) {
			console.error("Error fetching recommendations:", error);
			return [];
		}
	});

	public clearContext = action( () => {
		runInAction(()=>{
			this.setSelectedPropertyTodos([]);
			this.selectedTodo = null;
		});
	});
}

const TodoContext = createContext<null | TodoContextClass>(null);

export default function TodoContextProvider({ children, pulseApiClient }: { children: React.ReactNode, pulseApiClient: PulseApiClient }) {
	const context = useMemo(() => new TodoContextClass(pulseApiClient), [pulseApiClient]);

	return (
		<TodoContext.Provider value={context}>
			{children}
		</TodoContext.Provider>
	);
}

export const useTodoContext = () => useContext(TodoContext);
