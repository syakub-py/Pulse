import {useCallback, useContext, useEffect} from "react";
import {auth} from "../Utils/Firebase";
import DataService from "../Utils/DataService";
import {AppContext} from "../Contexts/AppContext";
import _ from "lodash";
import {AuthContext} from "../Contexts/AuthContext";


export default function useFetchProperties() {
	const appContext = useContext(AppContext);
	const authContext = useContext(AuthContext);

	const fetchProperties = useCallback(async () => {
		if (_.isEmpty(authContext.uid)) return;
		const properties = await DataService.getProperty(authContext.uid);
		if (!_.isUndefined(properties)) {
			appContext.Properties = properties;
		}
	}, [authContext.uid]);

	useEffect(() => {
		void fetchProperties();
	}, [fetchProperties]);
}
