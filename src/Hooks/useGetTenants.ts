import {useCallback, useContext, useEffect} from "react";
import {AppContext} from "../Contexts/AppContext";
import {AuthContext} from "../Contexts/AuthContext";
import _ from "lodash";
import DataService from "../Utils/DataService";

export default function useGetTenants() {
	const appContext = useContext(AppContext);
	const authContext = useContext(AuthContext);

	const fetchTenants = useCallback(async () => {
		if (_.isEmpty(authContext.uid)) return;
		const Tenants = await DataService.getTenants(authContext.uid);
		if (!_.isEmpty(appContext.SelectedPropertyLeases)) {
			appContext.setTenants(Tenants);
			authContext.isLoading = false;
		}
	}, [authContext.uid]);

	useEffect(() => {
		void fetchTenants();
	}, [authContext.uid]);
}



