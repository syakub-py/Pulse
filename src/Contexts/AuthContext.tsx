import { createContext, useContext, useMemo } from "react";
import { action, makeAutoObservable, runInAction} from "mobx";
import _ from "lodash";
import AsyncStorageClass from "../Classes/AsyncStorage";
import {auth} from "../Utils/Firebase";
import config from "../../env";

class AuthContextClass {
	constructor() {
		makeAutoObservable(this);
	}
	public username: string = "";
	public profilePicture: string = config.DEFAULT_PROFILE_PICTURE;
	public password: string = "";
	public firebase_uid: string = "";
	public postgres_uid: number = 0;
	private _isLoadingAuth: boolean = true;
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
		this.firebase_uid = uid;
	});

	public setPostgresUid = action((uid: number) =>{
		this.postgres_uid = uid;
		void AsyncStorageClass.saveDataToStorage("uid", uid);
	});

	public setLeaseId = action((LeaseId: number | null) =>{
		this.leaseId = LeaseId;
	});

	get isLoggedIn() {
		return !_.isEmpty(this.username) && !_.isEmpty(this.password);
	}

	get isLoadingAuth() {
		return this._isLoadingAuth;
	}

	set isLoadingAuth(isLoadingAuth: boolean) {
		this._isLoadingAuth = isLoadingAuth;
	}

	public async getAuthDataFromStorage(): Promise<void> {
		const retrievedUsername = await AsyncStorageClass.getDataFromStorage("username");
		const retrievedPassword = await AsyncStorageClass.getDataFromStorage("password");
		const retrievedUid = await AsyncStorageClass.getDataFromStorage("uid");
		runInAction(() => {
			if (!_.isUndefined(retrievedUsername)) this.username = retrievedUsername;
			if (!_.isUndefined(retrievedPassword)) this.password = retrievedPassword;
			if (!_.isUndefined(retrievedUid)) this.postgres_uid = retrievedUid;
		});
	}


	public async clearContextAndFirebaseLogout() {
		runInAction(() => {
			this.firebase_uid = "";
			this.username = "";
			this.password = "";
			this.profilePicture = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
			this.postgres_uid = 0;
		});
		try{
			await auth.signOut();
			await AsyncStorageClass.clearAllAsyncStorageData();
			this.isLoadingAuth = false;
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
