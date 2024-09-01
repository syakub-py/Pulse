import {action, makeAutoObservable, runInAction} from "mobx";
import isHTTPError from "@src/Utils/HttpError";
import _ from "lodash";
import {PulseApiClient, useApiClientContext} from "@src/Contexts/PulseApiClientContext";
import {createContext, useContext, useMemo} from "react";


class TodoContextClass {
	public SelectedTodo: Todo | null = null;
	public SelectedPropertyTodos: Todo[] = [];
	private pulseApiClient: PulseApiClient;

	constructor(pulseApiClient: PulseApiClient) {
		makeAutoObservable(this);
		this.pulseApiClient = pulseApiClient;
	}
	public setSelectedPropertyTodos = action((todos: Todo[]) => {
		runInAction(() => {
			this.SelectedPropertyTodos = todos;
		});
	});

	public addTodo = action(async (todo: Todo) => {
		try {
			const response = await this.pulseApiClient.todoService.addTodo(todo);
			if (isHTTPError(response)) {
				alert(response.message);
				return false;
			}
			todo.id = response;
			runInAction(() => {
				this.SelectedPropertyTodos.push(todo);
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
			this.SelectedPropertyTodos = this.SelectedPropertyTodos.filter((todo) => todo.id !== todoId);
		});
	});

	public setSelectedPropertyTodo = action((todo: Todo) => {
		runInAction(() => {
			this.SelectedTodo = todo;
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
