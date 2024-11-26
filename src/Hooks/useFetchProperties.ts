import {useCallback, useEffect} from "react";
import _ from "lodash";
import {useAuthContext} from "../Contexts/AuthContext";
import {usePropertyContext} from "@src/Contexts/PropertyContext";


export default function useFetchProperties() {
	const propertyContext = usePropertyContext();
	const authContext = useAuthContext();

	const fetchProperties = useCallback(async () => {
		if (_.isNull(authContext.postgresUid) || _.isNull(propertyContext) || authContext.postgresUid === 0) return;
		await propertyContext.getProperty(authContext.postgresUid);
	}, [authContext.postgresUid, propertyContext]);

	useEffect(() => {
		void fetchProperties();
	}, [fetchProperties]);
}
