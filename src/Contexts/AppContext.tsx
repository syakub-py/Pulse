import { createContext, useContext, useMemo } from "react";
import { action, makeAutoObservable } from "mobx";
import { auth, storage } from "../Utils/Firebase";
import _ from "lodash";
import isHTTPError from "@src/Utils/HttpError";
import {PulseApiClient} from "@src/Contexts/PulseApiClientContext";

class AppContextClass {
	private pulseApiClient: PulseApiClient;

	constructor(pulseApiClient: PulseApiClient) {
		makeAutoObservable(this);
		this.pulseApiClient = pulseApiClient;
	}

	public handleDeleteAccount = action(async (username: string, uid:number, Properties:Property[]) => {
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

}

const AppContext = createContext<null | AppContextClass>(null);

export default function AppContextProvider({ children, pulseApiClient }: { children: React.ReactNode, pulseApiClient: PulseApiClient }) {
	const appContext = useMemo(() => new AppContextClass(pulseApiClient), [pulseApiClient]);

	return (
		<AppContext.Provider value={appContext}>
			{children}
		</AppContext.Provider>
	);
}

export const useAppContext = () => useContext(AppContext);
