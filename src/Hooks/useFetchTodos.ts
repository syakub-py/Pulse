import {useAppContext} from "../Contexts/AppContext";
import {useAuthContext} from "../Contexts/AuthContext";
import {useCallback, useEffect} from "react";
import _ from "lodash";
import TodoService from "../Utils/Services/TodoService";


export default function useFetchTodos(){
	const appContext = useAppContext();
	const authContext = useAuthContext();

	const fetchTodos = useCallback(async () => {
		try {
			if (_.isEmpty(authContext.uid) || _.isUndefined(appContext.SelectedProperty?.PropertyId)) return;

			const response = await TodoService.getTodos(appContext.SelectedProperty.PropertyId);

			if (appContext.isHTTPError(response)) {
				alert(response.message);
				return;
			}

			appContext.setSelectedPropertyTodos(response as Todo[]);
		} catch (error) {
			console.error(error);
		}
		/* eslint-disable react-hooks/exhaustive-deps */
	}, [authContext.uid, appContext.SelectedProperty]);

	useEffect(() => {
		void fetchTodos();
	}, [authContext.uid, appContext.SelectedProperty, fetchTodos]);
}
