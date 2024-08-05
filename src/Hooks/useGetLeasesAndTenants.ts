import {useCallback, useContext, useEffect} from "react";
import {AppContext} from "../Contexts/AppContext";
import {AuthContext} from "../Contexts/AuthContext";
import _ from "lodash";
import DataService from "../Utils/DataService";

export default function useGetLeasesAndTenants() {
	const appContext = useContext(AppContext);
	const authContext = useContext(AuthContext);

	const fetchLeasesAndTenants = useCallback(async () => {
		if (_.isEmpty(authContext.uid) || _.isUndefined(appContext.SelectedProperty?.PropertyId)) return;

		const [leases, tenants = appContext.Tenants] = await Promise.all([
			appContext.SelectedProperty?.isRental?DataService.getLeases(appContext.SelectedProperty.PropertyId):[],
			_.isEmpty(appContext.Tenants) ? DataService.getTenants(authContext.uid) : Promise.resolve(appContext.Tenants)
		]);

		if (_.isEmpty(appContext.Tenants)) {
			appContext.setTenants(tenants);
		}
		if (!_.isUndefined(leases)) {
			appContext.setPropertyLeases(leases.map(lease => {
				const matchingTenant = tenants.find(tenant => tenant.LeaseId === lease.LeaseId);
				return !_.isUndefined(matchingTenant) ? { ...lease, TenantName: matchingTenant.Name } : lease;
			}));
		}
		authContext.isLoading = false;
	}, [authContext.uid, appContext.SelectedProperty]);

	useEffect(() => {
		void fetchLeasesAndTenants();
	}, [authContext.uid, appContext.SelectedProperty]);
}



