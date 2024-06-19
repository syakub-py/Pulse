import {createContext} from "react";
import {makeAutoObservable} from "mobx";
import {firestore, storage} from "../Utils/Firebase";
import _ from "lodash";

export class AppContextClass {
	public Homes: Home[] = [
		{
			Uid: "1",
			Hid: "1001",
			Address: "123 Main St, Anytown, USA",
			Calendar: "Home Calendar 1",
			Description: "A beautiful single-family home.",
			ConnectedDevices: [
				{
					Name: "Smart Light Bulb",
					Type: "Light",
					ApiKey: "abc123",
					Status: "On",
					Hid: "001"
				},
				{
					Name: "Smart Thermostat",
					Type: "Thermostat",
					ApiKey: "def456",
					Status: "Off",
					Hid: "002"
				},
				{
					Name: "Smart Lock",
					Type: "Lock",
					ApiKey: "ghi789",
					Status: "Locked",
					Hid: "003"
				},
				{
					Name: "Smart Camera",
					Type: "Camera",
					ApiKey: "jkl012",
					Status: "Online",
					Hid: "004"
				}
			],
		},
		{
			Uid: "2",
			Hid: "1002",
			Address: "456 Oak St, Sometown, USA",
			Calendar: "Home Calendar 2",
			Description: "A charming two-bedroom apartment.",
			ConnectedDevices: [
				{
					Name: "Smart Light Bulb",
					Type: "Light",
					ApiKey: "abc123",
					Status: "On",
					Hid: "001"
				},
				{
					Name: "Smart Thermostat",
					Type: "Thermostat",
					ApiKey: "def456",
					Status: "Off",
					Hid: "002"
				},
				{
					Name: "Smart Lock",
					Type: "Lock",
					ApiKey: "ghi789",
					Status: "Locked",
					Hid: "003"
				},
				{
					Name: "Smart Camera",
					Type: "Camera",
					ApiKey: "jkl012",
					Status: "Online",
					Hid: "004"
				}
			],
		},
	];

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
