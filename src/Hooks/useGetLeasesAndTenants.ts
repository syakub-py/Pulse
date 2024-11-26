import {useCallback, useEffect} from "react";
import {useAuthContext} from "../Contexts/AuthContext";
import _ from "lodash";
import {useLeaseContext} from "@src/Contexts/LeaseContext";
import {usePropertyContext} from "@src/Contexts/PropertyContext";
import {useTenantContext} from "@src/Contexts/TenantContext";

export default function useGetLeasesAndTenants() {
	const leaseContext = useLeaseContext();
	const propertyContext = usePropertyContext();
	const tenantContext = useTenantContext();
	const authContext = useAuthContext();

	const fetchLeasesAndTenants = useCallback(async () => {
		if (_.isNull(propertyContext) || _.isNull(leaseContext) || _.isNull(tenantContext) || authContext.postgresUid === 0) return;

		try {
			if (
				_.isEmpty(authContext.firebaseUid) ||
				_.isUndefined(propertyContext.selectedProperty?.PropertyId) ||
				!propertyContext.selectedProperty.isRental
			) return;

			await leaseContext.getLeases(propertyContext.selectedProperty.PropertyId, tenantContext.tenants);
			await tenantContext.getTenants(authContext.postgresUid);

		} catch (error) {
			console.error("error retrieving tenants and leases" + error);
		} finally {
			authContext.isAuthInLoadingState = false;
		}
	}, [authContext, leaseContext, propertyContext, tenantContext]);

	useEffect(() => {
		void fetchLeasesAndTenants();
	}, [authContext.firebaseUid, propertyContext?.selectedProperty, fetchLeasesAndTenants]);

	return fetchLeasesAndTenants;
}
