import {useCallback, useEffect} from "react";
import {useAppContext} from "../Contexts/AppContext";
import {useAuthContext} from "../Contexts/AuthContext";
import _ from "lodash";
import isHTTPError from "@src/Utils/HttpError";
import { useApiClientContext } from "../Contexts/PulseApiClientContext";
import {useLeaseContext} from "@src/Contexts/LeaseContext";
import {usePropertyContext} from "@src/Contexts/PropertyContext";
import {useUserContext} from "@src/Contexts/UserContext";

export default function useGetLeasesAndTenants() {
	const leaseContext = useLeaseContext();
	const propertyContext = usePropertyContext();
	const userContext = useUserContext();
	const authContext = useAuthContext();
	const apiClientContext = useApiClientContext();

	const fetchLeasesAndTenants = useCallback(async () => {
		if (_.isNull(propertyContext) || _.isNull(leaseContext) || _.isNull(userContext) || authContext.postgres_uid === 0) return;

		try {
			if (
				_.isEmpty(authContext.firebase_uid) ||
				_.isUndefined(propertyContext.SelectedProperty?.PropertyId) ||
				!propertyContext.SelectedProperty.isRental
			) return;

			const leaseResponse = await apiClientContext.leaseService.getLeases(propertyContext.SelectedProperty.PropertyId);
			if (isHTTPError(leaseResponse)) {
				alert(leaseResponse.message);
				return;
			}

			if (_.isEmpty(userContext.Tenants)){
				const tenantResponse= await apiClientContext.tenantService.getTenants(authContext.postgres_uid);
				if (isHTTPError(tenantResponse)){
					alert(tenantResponse.message);
					return;
				}
				userContext.setTenants(tenantResponse as User[]);
			}

			if (!_.isNil(leaseResponse)){
				const leases = JSON.parse(leaseResponse.toString()) as Lease[];
				leaseContext.setPropertyLeases(leases.map(lease => {
					const matchingTenant = userContext.Tenants.find(tenant => tenant.LeaseId === lease.LeaseId);
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
	}, [authContext.firebase_uid, propertyContext?.SelectedProperty, fetchLeasesAndTenants]);

	return fetchLeasesAndTenants;
}
