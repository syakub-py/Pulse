import {createContext, useContext, useMemo} from "react";
import {action, makeAutoObservable, runInAction} from "mobx";
import {auth} from "../Utils/Firebase";
import {IMessage} from "react-native-gifted-chat";
import DataService from "../Utils/DataService";
import _, {toNumber} from "lodash";

class AppContextClass {
	public Properties:Property[] = [];
	public Messages:IMessage[] = [];
	public SelectedProperty:Property | null = null;
	public SelectedPropertyLeases: Lease[] = [];
	public Tenants:Tenant[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	public setPropertyLeases = action((leases:Lease[])=>{
		this.SelectedPropertyLeases = leases;
	});

	public setSelectedProperty = action((SelectedProperty: Property) =>{
		this.SelectedProperty = SelectedProperty;
	});

	public setProperties = action((Properties: Property[]) =>{
		this.Properties = Properties;
		this.setSelectedProperty(Properties[0]);
	});

	public addProperty = action(async (property: Property) => {
		try {
			if (_.isUndefined(auth.currentUser?.uid)) return;
			property.PropertyId = await DataService.addProperty(auth.currentUser.uid, property);
			this.Properties.push(property);
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
				this.SelectedPropertyLeases.push(lease);
			}
		} catch (error) {
			console.error(lease);
			alert("An error occurred.");
			return 0;
		}
	});

	public deleteLease = action((leaseId:number) => {
		runInAction(() => {
			this.SelectedPropertyLeases = this.SelectedPropertyLeases.filter((l) => toNumber(l.LeaseId) !== leaseId);
			this.Tenants = this.Tenants.filter((t)=>t.LeaseId !== leaseId);
		});
	});

	public addTenant = action(async (LeaseId:number, tenant:Tenant ) => {
		tenant.TenantId = await DataService.addTenant(LeaseId, tenant);
		this.Tenants.push(tenant);
	});

	public setTenants = action((tenants:Tenant[]) => {
		this.Tenants = tenants;
	});

	public setMessages = action((messages: IMessage[]) => {
		this.Messages = messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
	});

	public logout() {
		this.Properties = [];
		this.Messages = [];
		this.SelectedProperty = null;
		this.SelectedPropertyLeases = [];
		this.Tenants = [];
	}
}

const AppContext = createContext(new AppContextClass());

export default function AppContextProvider ({ children }: { children: React.ReactNode }) {
	const appContext = useMemo(() => new AppContextClass(), []);

	return (
		<AppContext.Provider value={appContext}>
			{children}
		</AppContext.Provider>
	);
}

export const useAppContext = () => useContext(AppContext);
