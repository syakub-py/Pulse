import {useCallback, useContext, useEffect} from "react";
import {AppContext} from "../Contexts/AppContext";
import {AuthContext} from "../Contexts/AuthContext";
import _ from "lodash";
import DataService from "../Utils/DataService";

export default function useGetLeasesAndTenants() {
	const appContext = useContext(AppContext);
	const authContext = useContext(AuthContext);

	const fetchTenants = useCallback(async () => {
		if (_.isEmpty(authContext.uid) || _.isUndefined(appContext.SelectedProperty?.PropertyId)) return;
		const [leases, tenants] = await Promise.all([
			DataService.getLeases(appContext.SelectedProperty.PropertyId),
			DataService.getTenants(authContext.uid)
		]);
		appContext.setTenants(tenants);
		const leasesWithTenants = leases.map(lease => {
			const matchingTenant = tenants.find(tenant => tenant.LeaseId === lease.LeaseId);
			return !_.isUndefined(matchingTenant) ? { ...lease, TenantName: matchingTenant.Name } : lease;
		});
		appContext.setPropertyLeases(leasesWithTenants);
		authContext.isLoading = false;

	}, [authContext.uid, appContext.SelectedProperty]);

	useEffect(() => {
		void fetchTenants();
	}, [authContext.uid, appContext.SelectedProperty]);
}



