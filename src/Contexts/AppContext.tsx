import {createContext, useContext, useMemo} from "react";
import {action, makeAutoObservable, runInAction} from "mobx";
import {auth, storage} from "../Utils/Firebase";
import {IMessage} from "react-native-gifted-chat";
import PropertyService from "../Utils/Services/PropertyService";
import LeaseService from "../Utils/Services/LeaseService";
import TenantService from "../Utils/Services/TenantService";
import _, {toNumber} from "lodash";
import TodoService from "../Utils/Services/TodoService";

class AppContextClass {
	public Properties:Property[] = [];
	public Messages:IMessage[] = [];
	public SelectedProperty:Property | null = null;
	public SelectedPropertyLeases: Lease[] = [];
	public SelectedPropertyTodos:Todo[] = [];
	public Tenants:Tenant[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public isHTTPError(data: any): data is HTTPError {
		return data && (data.status_code === 500 || data.status_code === 400 || data.status_code === 409);
	}

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
		try{
			if (!auth.currentUser?.uid) return false;
			const response = await PropertyService.addProperty(auth.currentUser.uid, property);
			if (this.isHTTPError(response)) {
				alert(response.message);
				return false;
			}
			property.PropertyId = response;
			runInAction(() => {
				this.Properties.push(property);
			});
			return true;
		}catch(e){
			alert(e);
			return false;
		}

	});

	public deleteProperty = action(async (propertyId: number)=> {
		try{
			const response = await PropertyService.deleteProperty(propertyId);
			if (this.isHTTPError(response)) {
				alert(response.message);
				return false;
			}
			runInAction(() => {
				this.SelectedPropertyLeases = [];
				this.Properties = this.Properties.filter((h) => toNumber(h.PropertyId) !== propertyId);
				if (!_.isEmpty(this.Properties)) {
					this.SelectedProperty = this.Properties[this.Properties.length - 1];
					return true;
				}
				this.SelectedProperty = null;

			});
			return true;
		}catch (e){
			alert(e);
			return false;
		}
	});

	public setPropertyLeases = action((leases:Lease[])=>{
		runInAction(() => {
			this.SelectedPropertyLeases= leases;
		});
	});

	public addLease = action(async (lease:Lease, tenantEmail:string) => {
		try{
			if (_.isNull(this.SelectedProperty)) return false;
			const response = await LeaseService.addLease(this.SelectedProperty.PropertyId, tenantEmail ,lease);
			if (this.isHTTPError(response)) {
				alert(response.message);
				lease.LeaseId = 0;
				return false;
			}
			lease.LeaseId = response;
			runInAction(() => {
				this.SelectedPropertyLeases.push(lease);
			});
			alert("Sent invite to " + tenantEmail.toLowerCase());
			return true;
		}catch (e){
			alert(e);
			return false;
		}

	});

	public deleteLease = action(async (leaseId:number) => {
		try{
			const response = await LeaseService.deleteLease(leaseId);
			if (!_.isUndefined(response) && this.isHTTPError(response)) {
				alert(response.message);
				return;
			}
			runInAction(() => {
				this.SelectedPropertyLeases = this.SelectedPropertyLeases.filter((l) => toNumber(l.LeaseId) !== leaseId);
				this.Tenants = this.Tenants.filter((t)=>t.LeaseId !== leaseId);
			});
		}catch(e){
			alert(e);
			console.error(e);
		}
	});

	public addTenant = action(async (tenant:Tenant) => {
		try{
			const response = await TenantService.addTenant(tenant);
			if (this.isHTTPError(response)) {
				alert(response.message);
				return false;
			}
			tenant.TenantId = response;
			runInAction(() => {
				this.Tenants.push(tenant);
			});
			return true;
		}catch (e){
			alert(e);
			return false;
		}
	});

	public setTenants = action((tenants:Tenant[]) => {
		runInAction(()=>{
			this.Tenants = tenants;
		});
	});

	public setSelectedPropertyTodos = action((todos:Todo[])=>{
		runInAction(() => {
			this.SelectedPropertyTodos= todos;
		});
	});

	public addTodo = action(async (todo:Todo) => {
		try{
			const response = await TodoService.addTodo(todo);
			if (this.isHTTPError(response)) {
				alert(response.message);
				return false;
			}
			todo.RecommendedProfessional = response.recommendedProfessional;
			todo.id = response.todoId;
			runInAction(() => {
				this.SelectedPropertyTodos.push(todo);
			});
			return true;
		}catch (e){
			alert(e);
			return false;
		}

	});

	public deleteTodo = action(async (todoId:number) => {
		const response = await TodoService.deleteTodo(todoId);
		if (this.isHTTPError(response)) {
			alert(response.message);
			return;
		}

		runInAction(() => {
			this.SelectedPropertyTodos = this.SelectedPropertyTodos.filter((todo) => todo.id !== todoId);
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
