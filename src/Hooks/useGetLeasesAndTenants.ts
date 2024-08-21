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
		try {
			if (
				_.isEmpty(authContext.uid) ||
				_.isUndefined(appContext.SelectedProperty?.PropertyId) ||
				!appContext.SelectedProperty.isRental
			) return;

			const response = await LeaseService.getLeases(appContext.SelectedProperty.PropertyId);
			if (appContext.isHTTPError(response)) {
				alert(response.message);
				return;
			}

			if (_.isEmpty(appContext.Tenants)){
				const tenants= await TenantService.getTenants(authContext.uid);
				appContext.setTenants(tenants);
			}

			if (!_.isNil(response)){
				const leases = JSON.parse(response.toString()) as Lease[];
				appContext.setPropertyLeases(leases.map(lease => {
					const matchingTenant = appContext.Tenants.find(tenant => tenant.LeaseId === lease.LeaseId);
					return !_.isUndefined(matchingTenant) ? { ...lease, TenantName: matchingTenant.Name } : lease;
				}));
			}
		} catch (error) {
			console.error(error);
		} finally {
			authContext.isLoading = false;
		}
		/* eslint-disable react-hooks/exhaustive-deps */
	}, []);

	useEffect(() => {
		void fetchLeasesAndTenants();
	}, [authContext.uid, appContext.SelectedProperty, fetchLeasesAndTenants]);
	return fetchLeasesAndTenants;
}
