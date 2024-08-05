import {createContext} from "react";
import {action, makeAutoObservable, runInAction} from "mobx";
import {auth} from "../Utils/Firebase";
import {IMessage} from "react-native-gifted-chat";
import DataService from "../Utils/DataService";
import _, {toNumber} from "lodash";

export class AppContextClass {
	public Properties:Property[] = [];
	public Messages:IMessage[] = [];
	public SelectedProperty:Property | null = null;
	public SelectedPropertyLeases: Lease[] = [];
	public Tenants:Tenant[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	public setPropertyLeases = action((leases:Lease[])=>{
		runInAction(() => {
			this.SelectedPropertyLeases= leases;
		});
	});

	public setSelectedProperty = action((SelectedProperty: Property) =>{
		runInAction(()=>{
			this.SelectedProperty = SelectedProperty;
		});
	});

	public setProperties = action((Properties: Property[]) =>{
		runInAction(()=>{
			this.Properties = Properties;
		});
	});

	public addProperty = action(async (property: Property) => {
		try {
			if (auth.currentUser?.uid){
				property.PropertyId = await DataService.addProperty(auth.currentUser.uid, property);
				runInAction(() => {
					this.Properties.push(property);
				});
			}
		} catch (error) {
			console.error("Error adding property:", error);
			alert("An error occurred. Try again later.");
		}
	});

	public deleteProperty = action(async (propertyId: number)=> {
		await DataService.deleteProperty(propertyId);
		runInAction(() => {
			this.SelectedPropertyLeases = [];
			this.Properties = this.Properties.filter((h) => toNumber(h.PropertyId) !== propertyId);
		});
	});

	public addLease = action(async (lease:Lease ) => {
		try {
			if (!_.isNull(this.SelectedProperty)) {
				lease.LeaseId = await DataService.addLease(this.SelectedProperty.PropertyId, lease);
				runInAction(() => {
					this.SelectedPropertyLeases.push(lease);
				});
			}
		} catch (error) {
			console.error(lease);
			alert("An error occurred.");
			return 0;
		}
	});

	public deleteLease = action(async (leaseId:number) => {
		await DataService.deleteLease(leaseId);
		runInAction(() => {
			this.SelectedPropertyLeases = this.SelectedPropertyLeases.filter((l) => toNumber(l.LeaseId) !== leaseId);
			this.Tenants = this.Tenants.filter((t)=>t.LeaseId !== leaseId);
		});
	});

	public addTenant = action(async (LeaseId:number, tenant:Tenant ) => {
		tenant.TenantId = await DataService.addTenant(LeaseId, tenant);
		runInAction(() => {
			this.Tenants.push(tenant);
		});
	});

	public setTenants = action((tenants:Tenant[]) => {
		runInAction(()=>{
			this.Tenants = tenants;
		});
	});
}

export const AppContext = createContext(new AppContextClass());
