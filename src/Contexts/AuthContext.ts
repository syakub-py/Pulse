import { createContext } from "react";
import { makeAutoObservable } from "mobx";

export class AuthContextClass {
	constructor() {
		makeAutoObservable(this);
	}
	public username: string = "";
	public password: string = "";
	public profilePicture: string = "";

	getUsername() {
		return this.username;
	}

	getPassword() {
		return this.password;
	}

	getProfilePicture() {
		return this.profilePicture;
	}

	setUsername(username: string) {
		this.username = username;
	}

	setPassword(password: string) {
		this.password = password;
	}

	setProfilePicture(profilePicture: string) {
		this.profilePicture = profilePicture;
	}
}

export const AuthContext = createContext(new AuthContextClass());
