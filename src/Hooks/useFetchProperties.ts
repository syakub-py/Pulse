import {useCallback, useEffect} from "react";
import PropertyService from "../Utils/Services/PropertyService";
import {useAppContext} from "../Contexts/AppContext";
import _ from "lodash";
import {useAuthContext} from "../Contexts/AuthContext";

export default function useFetchProperties() {
	const appContext = useAppContext();
	const authContext = useAuthContext();

	const fetchProperties = useCallback(async () => {
		if (_.isEmpty(authContext.uid)) return;
		const properties = await PropertyService.getProperty(authContext.uid);
		if (_.isUndefined(properties)) return;
		appContext.setProperties(properties);
		authContext.isLoading = false;

	}, [authContext.uid]);

	useEffect(() => {
		void fetchProperties();
	}, [fetchProperties]);
}
