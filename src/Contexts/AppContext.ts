import {createContext} from "react";
import {makeAutoObservable} from "mobx";
import {firestore, storage} from "../Utils/Firebase";
import _ from "lodash";

export class AppContextClass {
	public Homes: Home[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	public getHomes() {
		return this.Homes;
	}

	public upload = async (PhoneImagesArray:string[], Address:string) => {
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
	};

	public async addHome(home: Home) {
		this.Homes.push(home);
		if (!_.isEmpty(home.ImageUrls) && !_.isUndefined(home.ImageUrls)) {
			home.ImageUrls = await this.upload(home.ImageUrls, home.Address);
		}
		firestore.collection("homes").doc(home.Address).set(home).then(() => {
			alert("Document written with ID: " + home.Address);
		}).catch((error) => {
			alert("Error adding document: " + error);
		});
	}

	public deleteHome(home: Home) {
		this.Homes = this.Homes.filter((h) => h.Address !== home.Address);
		firestore.collection("homes").doc(home.Address).delete().then(() => {
			if (!_.isEmpty(home.ImageUrls) && !_.isUndefined(home.ImageUrls)) {
				home.ImageUrls!.forEach((picture) => {
					const picRef = storage.refFromURL(picture);
					picRef.getMetadata()
						.then(() => {
							picRef.delete().catch((error) => alert("Error deleting picture:" + error));
						}).catch((error) => {
							alert("Picture does not exist:" + error);
						});
				});
			}
			alert("Home deleted!");
		}).catch((error) => {
			alert("Error removing document: " + error);
		});
	}

}

export const AppContext = createContext(new AppContextClass());
