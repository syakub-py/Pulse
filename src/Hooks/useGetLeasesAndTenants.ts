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
		if (_.isNull(propertyContext) || _.isNull(leaseContext) || _.isNull(tenantContext) || authContext.postgres_uid === 0) return;

		try {
			if (
				_.isEmpty(authContext.firebase_uid) ||
				_.isUndefined(propertyContext.selectedProperty?.PropertyId) ||
				!propertyContext.selectedProperty.isRental
			) return;

			await leaseContext.getLeases(propertyContext.selectedProperty.PropertyId, tenantContext.tenants);
			await tenantContext.getTenants(authContext.postgres_uid);

		} catch (error) {
			console.error("error retrieving tenants and leases" + error);
		} finally {
			authContext.isLoadingAuth = false;
		}
	}, [authContext, leaseContext, propertyContext, tenantContext]);

	useEffect(() => {
		void fetchLeasesAndTenants();
	}, [authContext.firebase_uid, propertyContext?.selectedProperty, fetchLeasesAndTenants]);

	return fetchLeasesAndTenants;
}
