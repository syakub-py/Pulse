import {action, makeAutoObservable, runInAction} from "mobx";
import _, {toNumber} from "lodash";
import isHTTPError from "@src/Utils/HttpError";
import {PulseApiClient} from "@src/Contexts/PulseApiClientContext";
import {createContext, useContext, useMemo} from "react";


class LeaseContextClass {
	private pulseApiClient: PulseApiClient;
	public selectedPropertyLeases: Lease[] = [];

	constructor(pulseApiClient: PulseApiClient) {
		makeAutoObservable(this);
		this.pulseApiClient = pulseApiClient;
	}
	public setPropertyLeases = action((leases: Lease[]) => {
		runInAction(() => {
			this.selectedPropertyLeases = leases;
		});
	});

	public getLeases = action(async (propertyId:number, tenantArray:User[]) => {
		const leaseResponse = await this.pulseApiClient.leaseService.getLeases(propertyId);
		if (isHTTPError(leaseResponse)) {
			alert(leaseResponse.message);
			return;
		}
		const leases = leaseResponse as Lease[];
		this.setPropertyLeases(leases.map(lease => {
			const matchingTenant = tenantArray.find(tenant => tenant.leaseId === lease.LeaseId);
			return !_.isUndefined(matchingTenant) ? { ...lease, TenantName: matchingTenant.Name } : lease;
		}));
	});

	public addLease = action(async (lease: Lease, tenantEmail: string, SelectedProperty:Property) => {
		try {
			if (_.isNull(SelectedProperty) || _.isUndefined(SelectedProperty.PropertyId)) return false;
			const response = await this.pulseApiClient.leaseService.addLease(SelectedProperty.PropertyId, lease);
			if (isHTTPError(response)) {
				alert(response.message);
				lease.LeaseId = 0;
				return false;
			}
			lease.LeaseId = response;
			const sendEmailResponse = await this.pulseApiClient.userService.sendSignUpEmail(lease.LeaseId, tenantEmail);
			if (isHTTPError(sendEmailResponse)) {
				alert(sendEmailResponse.message);
				return false;
			}
			runInAction(() => {
				this.selectedPropertyLeases.push(lease);
			});
			alert("Sent invite to " + tenantEmail.toLowerCase());
			lease.LeaseId = 0;
			return true;
		} catch (e) {
			alert(e);
			return false;
		}

	});

	public deleteLease = action(async (leaseId: number, Tenants:User[]) => {
		try {
			const response = await this.pulseApiClient.leaseService.deleteLease(leaseId);
			if (!_.isUndefined(response) && isHTTPError(response)) {
				alert(response.message);
				return;
			}
			runInAction(() => {
				this.selectedPropertyLeases = this.selectedPropertyLeases.filter((l) => toNumber(l.LeaseId) !== leaseId);
				Tenants = Tenants.filter((t) => t.leaseId !== leaseId);
			});
		} catch (e) {
			alert(e);
			console.error("Error deleting lease: " + e);
		}
	});

	public clearContext = action(()=>{
		runInAction(()=>{
			this.selectedPropertyLeases = [];
		});
	});
}

const LeaseContext = createContext<LeaseContextClass | null>(null);

export default function LeaseContextProvider({ children, pulseApiClient }: { children: React.ReactNode, pulseApiClient: PulseApiClient }) {

	const context = useMemo(() => new LeaseContextClass(pulseApiClient), [pulseApiClient]);

	return (
		<LeaseContext.Provider value={context}>
			{children}
		</LeaseContext.Provider>
	);
}

export const useLeaseContext = () => useContext(LeaseContext);
