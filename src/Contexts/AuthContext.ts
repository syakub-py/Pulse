import { createContext } from "react";
import { makeAutoObservable } from "mobx";

export class AuthContextClass {
	constructor() {
		makeAutoObservable(this);
	}
	public username: string = "";
	public profilePicture: string = "";


	getUsername() {
		return this.username;
	}

	getProfilePicture() {
		return this.profilePicture;
	}

	setUsername(username: string) {
		this.username = username;
	}

	setProfilePicture(profilePicture: string) {
		this.profilePicture = profilePicture;
	}
}

export const AuthContext = createContext(new AuthContextClass());
