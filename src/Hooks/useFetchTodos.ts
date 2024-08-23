import {useAppContext} from "../Contexts/AppContext";
import {useAuthContext} from "../Contexts/AuthContext";
import {useCallback, useEffect} from "react";
import _ from "lodash";
import TodoService from "../Utils/Services/TodoService";
import isHTTPError from "@src/Utils/HttpError";

export default function useFetchTodos(){
	const appContext = useAppContext();
	const authContext = useAuthContext();

	const fetchTodos = useCallback(async () => {
		try {
			if (_.isEmpty(authContext.uid) || _.isUndefined(appContext.SelectedProperty?.PropertyId)) return;

			const response = await TodoService.getTodos(appContext.SelectedProperty.PropertyId);
			if (isHTTPError(response)) {
				alert(response.message);
				return;
			}

			appContext.setSelectedPropertyTodos(response as Todo[]);
		} catch (error) {
			console.error("error fetching todos: " + error);
		}
		/* eslint-disable react-hooks/exhaustive-deps */
	}, []);

	useEffect(() => {
		void fetchTodos();
	}, [authContext.uid, appContext.SelectedProperty, fetchTodos]);

	return fetchTodos;
}
