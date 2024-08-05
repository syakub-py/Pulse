import {useCallback, useEffect} from "react";
import {useAppContext} from "../Contexts/AppContext";
import {useAuthContext} from "../Contexts/AuthContext";
import _ from "lodash";
import DataService from "../Utils/DataService";

export default function useGetLeasesAndTenants() {
	const appContext = useAppContext();
	const authContext = useAuthContext();

	const fetchLeasesAndTenants = useCallback(async () => {
		if (_.isEmpty(authContext.uid) || _.isUndefined(appContext.SelectedProperty?.PropertyId)) return;

		const [leases, tenants = appContext.Tenants] = await Promise.all([
			appContext.SelectedProperty.isRental?DataService.getLeases(appContext.SelectedProperty.PropertyId):[],
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
	}, [authContext, appContext]);

	useEffect(() => {
		void fetchLeasesAndTenants();
	}, [authContext.uid, appContext.SelectedProperty, fetchLeasesAndTenants]);
}



