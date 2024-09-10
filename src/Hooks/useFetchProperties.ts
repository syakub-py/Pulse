import {useCallback, useEffect} from "react";
import _ from "lodash";
import {useAuthContext} from "../Contexts/AuthContext";
import isHTTPError from "@src/Utils/HttpError";
import { useApiClientContext } from "../Contexts/PulseApiClientContext";
import {usePropertyContext} from "@src/Contexts/PropertyContext";


export default function useFetchProperties() {
	const propertyContext = usePropertyContext();
	const authContext = useAuthContext();
	const apiClientContext = useApiClientContext();

	const fetchProperties = useCallback(async () => {
		if (_.isNull(authContext.postgres_uid) || _.isNull(propertyContext)) return;
		const properties = await apiClientContext.propertyService.getProperty(authContext.postgres_uid);
		if (isHTTPError(properties)) {
			alert(properties.message);
			return;
		}
		if (_.isNull(properties)) propertyContext.setProperties([]);
		propertyContext.setProperties(properties as Property[]);
	}, [authContext.postgres_uid]);

	useEffect(() => {
		void fetchProperties();
	}, [fetchProperties]);
}
