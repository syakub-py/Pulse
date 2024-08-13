import {useAppContext} from "../Contexts/AppContext";
import {useAuthContext} from "../Contexts/AuthContext";
import {useCallback, useEffect} from "react";
import _ from "lodash";
import TodoService from "../Utils/Services/TodoService";


export default function useFetchTodos(){
	const appContext = useAppContext();
	const authContext = useAuthContext();

	const fetchTodos = useCallback(async () => {
		if (_.isEmpty(authContext.uid) || _.isUndefined(appContext.SelectedProperty?.PropertyId)) return;

		const todos = await TodoService.getTodos(appContext.SelectedProperty.PropertyId);

		if (_.isUndefined(todos)) return;

		appContext.setSelectedPropertyTodos(todos);

		/* eslint-disable react-hooks/exhaustive-deps */
	}, [authContext.uid, appContext.SelectedProperty]);

	useEffect(() => {
		void fetchTodos();
	}, [authContext.uid, appContext.SelectedProperty, fetchTodos]);

}
