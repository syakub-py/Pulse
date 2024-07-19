import { createContext } from "react";
import { makeAutoObservable } from "mobx";

export class AuthContextClass {
	constructor() {
		makeAutoObservable(this);
	}
	public username: string = "";
	public profilePicture: string = "";
	public uid: string = "";
	public password: string = "";


	getUsername() {
		return this.username;
	}

	getProfilePicture() {
		return this.profilePicture;
	}

	getuid(){
		return this.uid;
	}

	setUsername(username: string) {
		this.username = username;
	}

	setProfilePicture(profilePicture: string) {
		this.profilePicture = profilePicture;
	}

	setUid(uid: string) {
		this.uid = uid;
	}

}

export const AuthContext = createContext(new AuthContextClass());
