import {createContext} from "react";
import {makeAutoObservable} from "mobx";
import {firestore, storage} from "../Utils/Firebase";
import _ from "lodash";

export class AppContextClass {
	public Homes: Home[] = [
		{
			Name: "Primary Home",
			Address: "123 Main St, Anytown, USA",
			Calendar: "Home Calendar 1",
			Description: "A beautiful single-family home.",
			ConnectedDevices: [
				{
					Name: "Smart Light Bulb",
					Type: "Light",
					ApiKey: "abc123",
					Status: "On",
					Location:"Living Room"
				},
				{
					Name: "Smart Thermostat",
					Type: "Thermostat",
					ApiKey: "def456",
					Status: "Off",
					Location:"Master bedroom"
				},
				{
					Name: "Smart Lock",
					Type: "Lock",
					ApiKey: "ghi789",
					Status: "Locked",
					Location:"Front door"
				},
				{
					Name: "Smart Camera",
					Type: "Camera",
					ApiKey: "jkl012",
					Status: "Online",
					Location:"Porch Camera #1",
				}
			],
		},
		{
			Name: "Vacation Home",
			Address: "456 Oak St, Sometown, USA",
			Calendar: "Home Calendar 2",
			Description: "A charming two-bedroom apartment.",
			ConnectedDevices: [
				{
					Name: "Smart Light Bulb",
					Type: "Light",
					ApiKey: "abc123",
					Status: "On",
					Location:"Living Room"
				},
				{
					Name: "Smart Thermostat",
					Type: "Thermostat",
					ApiKey: "def456",
					Status: "Off",
					Location:"Master bedroom"
				},
				{
					Name: "Smart Lock",
					Type: "Lock",
					ApiKey: "ghi789",
					Status: "Locked",
					Location:"Front door"
				},
				{
					Name: "Smart Camera",
					Type: "Camera",
					ApiKey: "jkl012",
					Status: "Online",
					Location:"Porch Camera #1",
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
