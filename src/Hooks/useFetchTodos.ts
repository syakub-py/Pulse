import _ from "lodash";
import {useCallback, useEffect} from "react";
import {useAuthContext} from "../Contexts/AuthContext";
import isHTTPError from "@src/Utils/HttpError";
import { useApiClientContext } from "../Contexts/PulseApiClientContext";
import {usePropertyContext} from "@src/Contexts/PropertyContext";
import {useTodoContext} from "@src/Contexts/TodoContext";

export default function useFetchTodos(){
	const propertyContext = usePropertyContext();
	const todoContext = useTodoContext();
	const authContext = useAuthContext();
	const apiClientContext = useApiClientContext();

	const fetchTodos = useCallback(async () => {
		try {
			if (_.isEmpty(authContext.firebase_uid) || _.isNull(propertyContext)  || _.isNull(todoContext)|| _.isUndefined(propertyContext.SelectedProperty?.PropertyId)) return;
			const response = await apiClientContext.todoService.getTodos(propertyContext.SelectedProperty.PropertyId);
			if (isHTTPError(response)) {
				alert(response.message);
				return;
			}

			todoContext.setSelectedPropertyTodos(response as Todo[]);
		} catch (error) {
			console.error("error fetching todos: " + error);
		}
		/* eslint-disable react-hooks/exhaustive-deps */
	}, []);

	useEffect(() => {
		void fetchTodos();
	}, [authContext.firebase_uid, propertyContext?.SelectedProperty, fetchTodos]);

	return fetchTodos;
}
