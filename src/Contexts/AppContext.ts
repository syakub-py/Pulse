import {createContext} from "react";
import {action, makeAutoObservable, runInAction} from "mobx";
import {auth} from "../Utils/Firebase";
import {IMessage} from "react-native-gifted-chat";
import DataService from "../Utils/DataService";
import {toNumber} from "lodash";

export class AppContextClass {
	public Properties:Property[] = [];
	public Messages:IMessage[] = [];
	public SelectedProperty:Property | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	public setSelectedProperty = action((SelectedProperty: Property) =>{
		this.SelectedProperty = SelectedProperty;
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

	public deleteHome = action(async (propertyId: number)=> {
		await DataService.deleteProperty(propertyId);
		runInAction(() => {
			this.Properties = this.Properties.filter((h) => toNumber(h.PropertyId) !== propertyId);
		});
	});

}

export const AppContext = createContext(new AppContextClass());
