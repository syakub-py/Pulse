import _ from "lodash";
import {useCallback, useEffect} from "react";
import {useAuthContext} from "../Contexts/AuthContext";
import {usePropertyContext} from "@src/Contexts/PropertyContext";
import {useTodoContext} from "@src/Contexts/TodoContext";

export default function useFetchTodos(){
	const propertyContext = usePropertyContext();
	const todoContext = useTodoContext();
	const authContext = useAuthContext();

	const fetchTodos = useCallback(async () => {
		try {
			if (_.isEmpty(authContext.firebase_uid) || authContext.postgres_uid === 0 || _.isNull(propertyContext)  || _.isNull(todoContext)|| _.isUndefined(propertyContext.selectedProperty?.PropertyId)) return;
			await todoContext.getSelectedPropertyTodos(propertyContext.selectedProperty.PropertyId);
		} catch (error) {
			console.error("error fetching todos: " + error);
		}
	}, [authContext.firebase_uid, authContext.postgres_uid, propertyContext, todoContext]);

	useEffect(() => {
		void fetchTodos();
	}, [authContext.firebase_uid, propertyContext?.selectedProperty?.PropertyId, fetchTodos]);

	return fetchTodos;
}
