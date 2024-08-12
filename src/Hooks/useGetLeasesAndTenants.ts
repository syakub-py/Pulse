import {useCallback, useEffect} from "react";
import {useAppContext} from "../Contexts/AppContext";
import {useAuthContext} from "../Contexts/AuthContext";
import _ from "lodash";
import LeaseService from "../Utils/Services/LeaseService";
import TenantService from "../Utils/Services/TenantService";

export default function useGetLeasesAndTenants() {
	const appContext = useAppContext();
	const authContext = useAuthContext();

	const fetchLeasesAndTenants = useCallback(async () => {
		if (_.isEmpty(authContext.uid) || _.isUndefined(appContext.SelectedProperty?.PropertyId)) return;

		const [leases, tenants = appContext.Tenants] = await Promise.all([
			appContext.SelectedProperty.isRental ? LeaseService.getLeases(appContext.SelectedProperty.PropertyId):[],
			_.isEmpty(appContext.Tenants) ? TenantService.getTenants(authContext.uid) : Promise.resolve(appContext.Tenants)
		]);

		appContext.setTenants(tenants);
		if (_.isUndefined(leases)) return;

		appContext.setPropertyLeases(leases.map(lease => {
			const matchingTenant = tenants.find(tenant => tenant.LeaseId === lease.LeaseId);
			return !_.isUndefined(matchingTenant) ? { ...lease, TenantName: matchingTenant.Name } : lease;
		}));

		authContext.isLoading = false;
		/* eslint-disable react-hooks/exhaustive-deps */
	}, [authContext.uid, appContext.SelectedProperty]);

	useEffect(() => {
		void fetchLeasesAndTenants();
	}, [authContext.uid, appContext.SelectedProperty, fetchLeasesAndTenants]);
}



