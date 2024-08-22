import {useCallback, useEffect} from "react";
import PropertyService from "../Utils/Services/PropertyService";
import _ from "lodash";
import {useAuthContext} from "../Contexts/AuthContext";
import {useAppContext} from "../Contexts/AppContext";

export default function useFetchProperties() {
	const appContext = useAppContext();
	const authContext = useAuthContext();

	const fetchProperties = useCallback(async () => {
		if (_.isEmpty(authContext.uid)) return;
		const properties = await PropertyService.getProperty(authContext.uid);
		if (appContext.isHTTPError(properties)) {
			alert(properties.message);
			return;
		}
		appContext.setProperties(properties as Property[]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authContext.uid]);

	useEffect(() => {
		void fetchProperties();
	}, [fetchProperties]);
}
