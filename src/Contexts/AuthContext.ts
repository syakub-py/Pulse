import { createContext } from "react";
import {action, makeAutoObservable} from "mobx";
import _ from "lodash";
import AsyncStorageClass from "../Classes/AsyncStorage";

export class AuthContextClass {
	constructor() {
		makeAutoObservable(this);
	}
	public username: string = "";
	public profilePicture: string = "";
	public accessToken: string = "";
	public password: string = "";

	public setUsername = action((username: string) =>{
		this.username = username;
		void AsyncStorageClass.saveDataToStorage("username", username);
	});

	public setPassword = action((password: string) =>{
		this.password = password;
		void AsyncStorageClass.saveDataToStorage("password", password);
	});

	public setProfilePicture(profilePicture: string) {
		this.profilePicture = profilePicture;
	}

	public setAccessToken = action((accessToken: string) =>{
		this.accessToken = accessToken;
		void AsyncStorageClass.saveDataToStorage("accessToken", accessToken);
	});

	get isLoggedIn() {
		return !_.isEmpty(this.accessToken) && !_.isEmpty(this.username) && !_.isEmpty(this.password);
	}

	public async getAuthDataFromStorage(): Promise<void> {
		this.accessToken = await AsyncStorageClass.getDataFromStorage("accessToken");
		this.username = await AsyncStorageClass.getDataFromStorage("username");
		this.password = await AsyncStorageClass.getDataFromStorage("password");
	}

}

export const AuthContext = createContext(new AuthContextClass());
