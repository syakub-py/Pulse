import { createContext, useContext, useMemo } from "react";
import { action, makeAutoObservable, runInAction } from "mobx";
import { auth, storage } from "../Utils/Firebase";
import _ from "lodash";
import isHTTPError from "@src/Utils/HttpError";
import {PulseApiClient, useApiClientContext} from "@src/Contexts/PulseApiClientContext";

class AppContextClass {
	private pulseApiClient: PulseApiClient;

	constructor(pulseApiClient: PulseApiClient) {
		makeAutoObservable(this);
		this.pulseApiClient = pulseApiClient;
	}

	public handleDeleteAccount = action(async (username: string, uid:string, Properties:Property[]) => {
		try {
			const response = await this.pulseApiClient.userService.deleteUser(uid);
			if (isHTTPError(response)) return false;
			const paths = [
				`/DocumentPictures/${username}`,
				`/ProfilePictures/${username}`
			];
			for (const path of paths) {
				const folderRef = storage.ref(path);
				const listResult = await folderRef.listAll();
				const deletePromises = listResult.items.map(fileRef => fileRef.delete());
				await Promise.all(deletePromises);
			}
			if (_.isEmpty(Properties)) return;
			for (const property of Properties) {
				if (_.isUndefined(property.PropertyId)) return;
				await this.pulseApiClient.propertyService.deleteProperty(property.PropertyId);
			}
			if (_.isNull(auth.currentUser)) return false;
			await auth.currentUser.delete();
			return true;
		} catch (error) {
			console.error("Error deleting account folders:", error);
		}
	});

	// public logout() {
	// 	this.Properties = [];
	// 	this.SelectedProperty = null;
	// 	this.SelectedPropertyLeases = [];
	// 	this.Tenants = [];
	// 	this.Chats = [];
	// }

	public uploadPicture = async (profilePicturePath: string, path: string) => {
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
			console.error("error uploading picture: " + error);
			return "";
		}
	};

}

const AppContext = createContext<null | AppContextClass>(null);

export default function AppContextProvider({ children }: { children: React.ReactNode }) {
	const pulseApiClient = useApiClientContext();

	const appContext = useMemo(() => new AppContextClass(pulseApiClient), [pulseApiClient]);

	return (
		<AppContext.Provider value={appContext}>
			{children}
		</AppContext.Provider>
	);
}

export const useAppContext = () => useContext(AppContext);
