import {createContext} from "react";
import {makeAutoObservable} from "mobx";
import {storage} from "../Utils/Firebase";
import _ from "lodash";

export class AppContextClass {
	public Homes: Home[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	public async upload (PhoneImagesArray:string[], Address:string){
		if (_.isEmpty(PhoneImagesArray)){
			return [];
		}
		try {
			const uploadPromises = PhoneImagesArray.map(async (element) => {
				const filename = element.split("/").pop();
				const response = await fetch(element);
				const blob = await response.blob();
				const storageRef = storage.ref().child(`images/${Address}/${filename}`);
				await storageRef.put(blob);
				return storageRef.getDownloadURL();
			});

			return await Promise.all(uploadPromises);
		} catch (error) {
			alert("The following error occurred when trying to upload images: " + error);
			return [];
		}
	}

	public async addHome(home: Home) {
		this.Homes.push(home);
	}

	public deleteHome(home: Home) {
		this.Homes = this.Homes.filter((h) => h.Address !== home.Address);
	}

}

export const AppContext = createContext(new AppContextClass());
