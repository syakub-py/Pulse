import { createContext, useContext, useMemo } from "react";
import { action, makeAutoObservable, runInAction} from "mobx";
import _ from "lodash";
import AsyncStorageClass from "../Classes/AsyncStorage";
import {auth} from "../Utils/FirebaseConfig";
import config from "../../env";

class AuthContextClass {

	constructor() {
		makeAutoObservable(this);
	}

	public username: string = "";
	public profilePicture: string = config.DEFAULT_PROFILE_PICTURE;
	public password: string = "";
	public firebaseUid: string = "";
	public postgresUid: number = 0;
	public isAuthInLoadingState: boolean = true;
	public leaseId: number | null = null;

	public setUsername = action((username: string) =>{
		this.username = username;
		void AsyncStorageClass.saveDataToStorage("username", username);
	});

	public setPassword = action((password: string) =>{
		this.password = password;
		void AsyncStorageClass.saveDataToStorage("password", password);
	});

	public setProfilePicture = action((profilePicture: string | null | undefined): void => {
		if (_.isNil((profilePicture))) return;
		this.profilePicture = profilePicture;
	});

	public setFirebaseUid = action((uid: string) =>{
		this.firebaseUid = uid;
	});

	public setPostgresUid = action((uid: number) =>{
		this.postgresUid = uid;
		void AsyncStorageClass.saveDataToStorage("uid", uid);
	});

	public setLeaseId = action((LeaseId: number | null) =>{
		this.leaseId = LeaseId;
	});

	get isLoggedIn() {
		return !_.isEmpty(this.username) && !_.isEmpty(this.password);
	}

	public async getAuthDataFromStorage(): Promise<void> {
		const retrievedUsername = await AsyncStorageClass.getDataFromStorage("username");
		const retrievedPassword = await AsyncStorageClass.getDataFromStorage("password");
		const retrievedUid = await AsyncStorageClass.getDataFromStorage("uid");
		runInAction(() => {
			if (!_.isUndefined(retrievedUsername)) this.username = retrievedUsername;
			if (!_.isUndefined(retrievedPassword)) this.password = retrievedPassword;
			if (!_.isUndefined(retrievedUid)) this.postgresUid = retrievedUid;
		});
	}

	public async clearContextAndFirebaseLogout() {
		runInAction(() => {
			this.firebaseUid = "";
			this.username = "";
			this.password = "";
			this.profilePicture = config.DEFAULT_PROFILE_PICTURE;
			this.postgresUid = 0;
		});
		try{
			await auth.signOut();
			await AsyncStorageClass.clearAllAsyncStorageData();
			this.isAuthInLoadingState = false;
		}catch (e){
			alert("Error logging out");
			return;
		}
	}
}

const AuthContext = createContext(new AuthContextClass());

export default function AuthContextProvider ({ children }: { children: React.ReactNode }) {
	const authContext = useMemo(() => new AuthContextClass(), []);

	return (
		<AuthContext.Provider value={authContext}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuthContext = () => useContext(AuthContext);
