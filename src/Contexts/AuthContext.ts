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

	public setUsername(username: string) {
		this.username = username;
	}

	public setProfilePicture(profilePicture: string) {
		this.profilePicture = profilePicture;
	}

	public setAccessToken = action((accessToken: string) =>{
		this.accessToken = accessToken;
		void AsyncStorageClass.saveDataToStorage("accessToken", accessToken);
	});

	get isLoggedIn() {
		return !_.isEmpty(this.accessToken);
	}

	public async getAuthDataFromStorage(): Promise<void> {
		this.accessToken = await AsyncStorageClass.getDataFromStorage("accessToken");
	}

}

export const AuthContext = createContext(new AuthContextClass());
