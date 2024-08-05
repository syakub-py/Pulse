import {useCallback, useEffect} from "react";
import DataService from "../Utils/DataService";
import {useAppContext} from "../Contexts/AppContext";
import _ from "lodash";
import {useAuthContext} from "../Contexts/AuthContext";

export default function useFetchProperties() {
	const appContext = useAppContext();
	const authContext = useAuthContext();

	const fetchProperties = useCallback(async () => {
		if (_.isEmpty(authContext.uid)) return;
		const properties = await DataService.getProperty(authContext.uid);
		if (_.isUndefined(properties)) return;
	
		if (!_.isUndefined(properties)) {
			appContext.setProperties(properties);
			authContext.isLoading = false;
		}
	}, [authContext.uid]);

	useEffect(() => {
		void fetchProperties();
	}, [fetchProperties]);
}
