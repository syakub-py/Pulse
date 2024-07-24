import {createContext} from "react";
import {makeAutoObservable} from "mobx";
import {auth, storage} from "../Utils/Firebase";
import _ from "lodash";
import {IMessage} from "react-native-gifted-chat";
import DataService from "../Utils/DataService";

export class AppContextClass {
	public Properties: Property[] = [];
	public Messages:IMessage[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	public async upload (PhoneImagesArray:string[], UserId:string){
		if (_.isEmpty(PhoneImagesArray)){
			return [];
		}
		try {
			const uploadPromises = PhoneImagesArray.map(async (element) => {
				const filename = element.split("/").pop();
				const response = await fetch(element);
				const blob = await response.blob();
				const storageRef = storage.ref().child(`images/${UserId}/${filename}`);
				await storageRef.put(blob);
				return storageRef.getDownloadURL();
			});

			return await Promise.all(uploadPromises);
		} catch (error) {
			alert("The following error occurred when trying to upload images: " + error);
			return [];
		}
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
