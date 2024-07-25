import {createContext} from "react";
import {makeAutoObservable} from "mobx";
import {auth} from "../Utils/Firebase";
import {IMessage} from "react-native-gifted-chat";
import DataService from "../Utils/DataService";

export class AppContextClass {
	public Properties:Property[] = [];
	public Messages:IMessage[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	public async addProperty(property: Property) {
		try {
			if (auth.currentUser?.uid){
				property.PropertyId = await DataService.addProperty(auth.currentUser?.uid, property);
				this.Properties.push(property);
			}
		} catch (error) {
			console.error("Error adding property:", error);
			alert("An error occurred. Try again later.");
		}
	}

	public deleteHome(home: Property) {
		this.Properties = this.Properties.filter((h) => h.Address !== home.Address);
	}

}

export const AppContext = createContext(new AppContextClass());
