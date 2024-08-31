import _ from "lodash";
import {useCallback, useEffect} from "react";
import {useAppContext} from "../Contexts/AppContext";
import {useAuthContext} from "../Contexts/AuthContext";
import isHTTPError from "@src/Utils/HttpError";
import { useApiClientContext } from "../Contexts/PulseApiClientContext";

export default function useFetchTodos(){
	const appContext = useAppContext();
	const authContext = useAuthContext();
	const apiClientContext = useApiClientContext();

	const fetchTodos = useCallback(async () => {
		try {
			if (_.isEmpty(authContext.uid) || _.isUndefined(appContext.SelectedProperty?.PropertyId)) return;

			const response = await apiClientContext.todoService.getTodos(appContext.SelectedProperty.PropertyId);
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
