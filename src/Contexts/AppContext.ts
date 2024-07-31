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
	public SelectedPropertyLeases: Lease[] |null = null;

	constructor() {
		makeAutoObservable(this);
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
		try {
			if (auth.currentUser?.uid){
				property.PropertyId = await DataService.addProperty(auth.currentUser?.uid, property);
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
			this.SelectedPropertyLeases = null;
			this.Properties = this.Properties.filter((h) => toNumber(h.PropertyId) !== propertyId);
		});
	});

	public addLease = action(async (leaseDetails:Lease) => {
		try {
			if (!_.isNull(this.SelectedProperty)) {
				return await DataService.addLease(this.SelectedProperty.PropertyId, leaseDetails);
			}
		} catch (error) {
			alert("An error occurred. Try again later.");
			return 0;
		}
	});

	public deleteLease = action(async (leaseId:number) => {
		await DataService.deleteLease(leaseId);
		runInAction(() => {
			this.SelectedPropertyLeases = null;
		});
	});


}

export const AppContext = createContext(new AppContextClass());
