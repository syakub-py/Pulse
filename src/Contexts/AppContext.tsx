import {createContext, useContext, useMemo} from "react";
import {action, makeAutoObservable, runInAction} from "mobx";
import {auth, storage} from "../Utils/Firebase";
import {IMessage} from "react-native-gifted-chat";
import PropertyService from "../Utils/Services/PropertyService";
import LeaseService from "../Utils/Services/LeaseService";
import TenantService from "../Utils/Services/TenantService";
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
				property.PropertyId = await PropertyService.addProperty(auth.currentUser.uid, property);
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
		// TODO: Everywhere a service is called must be wrapped in a try-catch.
		await PropertyService.deleteProperty(propertyId);
		runInAction(() => {
			this.SelectedPropertyLeases = [];
			this.Properties = this.Properties.filter((h) => toNumber(h.PropertyId) !== propertyId);
		});
	});

	public addLease = action(async (lease:Lease ) => {
		try {
			if (!_.isNull(this.SelectedProperty)) {
				lease.LeaseId = await LeaseService.addLease(this.SelectedProperty.PropertyId, lease);
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
		await LeaseService.deleteLease(leaseId);
		runInAction(() => {
			this.SelectedPropertyLeases = this.SelectedPropertyLeases.filter((l) => toNumber(l.LeaseId) !== leaseId);
			this.Tenants = this.Tenants.filter((t)=>t.LeaseId !== leaseId);
		});
	});

	public addTenant = action(async ( tenant:Tenant, code:string ) => {
		tenant.TenantId = await TenantService.addTenant(tenant, code);
		runInAction(() => {
			this.Tenants.push(tenant);
		});
	});

	public setTenants = action((tenants:Tenant[]) => {
		runInAction(()=>{
			this.Tenants = tenants;
		});
	});

	public setMessages = action((messages: IMessage[]) => {
		runInAction(()=> {
			this.Messages = messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
		});
	});

	public logout() {
		this.Properties = [];
		this.Messages = [];
		this.SelectedProperty = null;
		this.SelectedPropertyLeases = [];
		this.Tenants = [];
	}
	public uploadPicture = async (profilePicturePath:string, username:string, path:string) => {
		if (_.isEmpty(profilePicturePath)) {
			return "";
		}
		try {
			const filename = profilePicturePath.split("/").pop();
			const response = await fetch(profilePicturePath);
			const blob = await response.blob();
			const storageRef = storage.ref().child(path + `${filename}`);
			await storageRef.put(blob);
			return await storageRef.getDownloadURL();
		} catch (error) {
			console.error(error);
			return "";
		}
	};
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
