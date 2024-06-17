import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { firestore, storage } from "../Utils/Firebase";
import _ from "lodash";

export class AppContextClass {
	public Homes: Home[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	public getHomes() {
		return this.Homes;
	}

	public async upload(PhoneImagesArray: string[], Address: string) {
		const UrlDownloads = [];
		try {
			for (const element of PhoneImagesArray) {
				const filename = element.split("/").pop();
				const response = await fetch(element);
				const blob = await response.blob();
				const storageRef = storage.ref().child(`images/${Address}/${filename}`);
				await storageRef.put(blob);
				const url = await storageRef.getDownloadURL();
				UrlDownloads.push(url);
			}
			return UrlDownloads;
		} catch (error) {
			alert("The following error occured when trying to upload images: " + error);
			return [];
		}
	}

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
