import {useCallback, useEffect} from "react";
import _ from "lodash";
import {useAuthContext} from "../Contexts/AuthContext";
import {usePropertyContext} from "@src/Contexts/PropertyContext";


export default function useFetchProperties() {
	const propertyContext = usePropertyContext();
	const authContext = useAuthContext();

	const fetchProperties = useCallback(async () => {
		if (_.isNull(authContext.postgres_uid) || _.isNull(propertyContext) || authContext.postgres_uid === 0) return;
		await propertyContext.getProperty(authContext.postgres_uid);
	}, [authContext.postgres_uid, propertyContext]);

	useEffect(() => {
		void fetchProperties();
	}, [fetchProperties]);
}
