import {useCallback, useEffect} from "react";
import _ from "lodash";
import {useAuthContext} from "../Contexts/AuthContext";
import {useAppContext} from "../Contexts/AppContext";
import isHTTPError from "@src/Utils/HttpError";
import { useApiClientContext } from "../Contexts/PulseApiClientContext";


export default function useFetchProperties() {
	const appContext = useAppContext();
	const authContext = useAuthContext();
	const apiClientContext = useApiClientContext();

	const fetchProperties = useCallback(async () => {
		if (_.isEmpty(authContext.uid)) return;
		const properties = await apiClientContext.propertyService.getProperty(authContext.uid);
		if (isHTTPError(properties)) {
			alert(properties.message);
			return;
		}
		appContext.setProperties(properties as Property[]);
	}, [authContext.uid]);

	useEffect(() => {
		void fetchProperties();
	}, [fetchProperties]);
}
