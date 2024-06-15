import { createContext } from "react";
import { action, makeAutoObservable } from "mobx"
import { auth } from "../Utils/Firebase";
import { useNavigation } from "@react-navigation/native";
export class AuthContextClass {
	constructor () {
		makeAutoObservable(this)
	}

	public username: string = '';
	public password: string = '';
	public profilePicture: string = '';

	getUsername () {
		return this.username
  }

	getPassword () {
		return this.password
  }

	getProfilePicture () {
		return this.profilePicture
  }

	setUsername (username: string) {
		this.username = username
  }

	setPassword (password: string) {
		this.password = password
  }

	setProfilePicture (profilePicture: string) {
		this.profilePicture = profilePicture
  }

	login () {
		const navigate = useNavigation()
    console.log(`Username: ${this.username}, Password: ${this.password}`)
    //     auth.signInWithEmailAndPassword(this.username, this.password)
    //         .catch((error) => alert(error.message));
    navigate("Home");
  }
}

export const AuthContext = createContext(new AuthContextClass())
