import {useCallback, useEffect} from "react";
import {useAppContext} from "../Contexts/AppContext";
import {useAuthContext} from "../Contexts/AuthContext";
import _ from "lodash";
import isHTTPError from "@src/Utils/HttpError";
import { useApiClientContext } from "../Contexts/PulseApiClientContext";

export default function useGetLeasesAndTenants() {
	const appContext = useAppContext();
	const authContext = useAuthContext();
	const apiClientContext = useApiClientContext();

	const fetchLeasesAndTenants = useCallback(async () => {
		try {
			if (
				_.isEmpty(authContext.uid) ||
				_.isUndefined(appContext.SelectedProperty?.PropertyId) ||
				!appContext.SelectedProperty.isRental
			) return;

			const leaseResponse = await apiClientContext.leaseService.getLeases(appContext.SelectedProperty.PropertyId);
			if (isHTTPError(leaseResponse)) {
				alert(leaseResponse.message);
				return;
			}

			if (_.isEmpty(appContext.Tenants)){
				const tenantResponse= await apiClientContext.tenantService.getTenants(authContext.uid);
				if (isHTTPError(tenantResponse)){
					alert(tenantResponse.message);
					return;
				}
				appContext.setTenants(tenantResponse as User[]);
			}

			if (!_.isNil(leaseResponse)){
				const leases = JSON.parse(leaseResponse.toString()) as Lease[];
				appContext.setPropertyLeases(leases.map(lease => {
					const matchingTenant = appContext.Tenants.find(tenant => tenant.LeaseId === lease.LeaseId);
					return !_.isUndefined(matchingTenant) ? { ...lease, TenantName: matchingTenant.Name } : lease;
				}));
			}
		} catch (error) {
			console.error("error retrieving tenants and leases" + error);
		} finally {
			authContext.isLoadingAuth = false;
		}
		/* eslint-disable react-hooks/exhaustive-deps */
	}, []);

	useEffect(() => {
		void fetchLeasesAndTenants();
	}, [authContext.uid, appContext.SelectedProperty, fetchLeasesAndTenants]);
	return fetchLeasesAndTenants;
}
