import { createContext } from "react";
import { action, makeAutoObservable, runInAction} from "mobx";
import _ from "lodash";
import AsyncStorageClass from "../Classes/AsyncStorage";
import {auth} from "../Utils/Firebase";

export class AuthContextClass {
	constructor() {
		makeAutoObservable(this);
	}
	public username: string = "";
	public profilePicture: string = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
	public password: string = "";
	public uid:string = "";
	private isLoadingAuth: boolean = true;

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

	public setUid = action((uid: string) =>{
		this.uid = uid;
	});

	get isLoggedIn() {
		return !_.isEmpty(this.username) && !_.isEmpty(this.password);
	}

	get isLoading() {
		return this.isLoadingAuth;
	}

	set isLoading(isLoadingAuth: boolean) {
		this.isLoadingAuth = isLoadingAuth;
	}

	public async getAuthDataFromStorage(): Promise<void> {
		const retrievedUsername = await AsyncStorageClass.getDataFromStorage("username");
		const retrievedPassword = await AsyncStorageClass.getDataFromStorage("password");
		runInAction(() => {
			if (!_.isUndefined(retrievedUsername)) this.username = retrievedUsername;
			if (!_.isUndefined(retrievedPassword)) this.password = retrievedPassword;
		});
	}

	public async logout() {
		runInAction(() => {
			this.uid = "";
			this.username = "";
			this.password = "";
		});
		await auth.signOut();
		await AsyncStorageClass.clearAllAsyncStorageData();
		this.isLoading = false;
	}
}

export const AuthContext = createContext(new AuthContextClass());
