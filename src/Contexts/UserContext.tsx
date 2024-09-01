import {PulseApiClient} from "@src/Contexts/PulseApiClientContext";
import {action, makeAutoObservable, runInAction} from "mobx";
import isHTTPError from "@src/Utils/HttpError";
import _ from "lodash";
import {createContext, useContext, useMemo} from "react";
import {storage} from "@src/Utils/Firebase";


class UserContextClass {
	private pulseApiClient: PulseApiClient;
	public Tenants: User[] = [];

	constructor(pulseApiClient: PulseApiClient) {
		makeAutoObservable(this);
		this.pulseApiClient = pulseApiClient;
	}
	public addUser = action(async (user: User) => {
		try {
			const response = await this.pulseApiClient.userService.addUser(user);
			if (isHTTPError(response)) {
				alert(response.message);
				return false;
			}
			user.id = response;
			if (_.isNull(user.LeaseId)) return true;
			runInAction(() => {
				this.Tenants.push(user);
			});
			return true;
		} catch (e) {
			alert(e);
			return false;
		}
	});

	public setTenants = action((tenants: User[]) => {
		runInAction(() => {
			this.Tenants = tenants;
		});
	});

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
const UserContext = createContext<UserContextClass | null>(null);

export default function UserContextProvider({ children, pulseApiClient }: { children: React.ReactNode, pulseApiClient: PulseApiClient }) {
	const context = useMemo(() => new UserContextClass(pulseApiClient), [pulseApiClient]);

	return (
		<UserContext.Provider value={context}>
			{children}
		</UserContext.Provider>
	);
}

export const useUserContext = () => useContext(UserContext);
