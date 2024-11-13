import { createContext, useContext, useMemo } from "react";
import { action, makeAutoObservable, runInAction} from "mobx";
import _ from "lodash";
import AsyncStorageClass from "../Classes/AsyncStorage";
import {auth, storage} from "../Utils/FirebaseConfig";
import config from "../../env";
import {updateProfile} from "firebase/auth";
import {FirebaseError} from "firebase/app";
import isHTTPError from "@src/Utils/HttpError";
import {PulseApiClient} from "@src/Contexts/PulseApiClientContext";

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

	public async signUp(username:string, password:string): Promise<boolean> {
		try {
			const user = await auth.createUserWithEmailAndPassword(username, password);
			if (_.isEmpty(user.user) && _.isNull(user.user) ) return false;
			if (!_.isEmpty(this.profilePicture)) {
				const profilePictureUrl = await this.uploadPicture(this.profilePicture, `ProfilePictures/${username}/`);
				this.setProfilePicture(profilePictureUrl);
				await updateProfile(user.user, {photoURL: profilePictureUrl});
			} else {
				this.setProfilePicture(config.DEFAULT_PROFILE_PICTURE);
			}
			this.setFirebaseUid(user.user.uid);
			this.setUsername(username);
			this.setPassword(password);
			return true;
		}catch (error) {
			if (error instanceof FirebaseError) {
				console.error("Firebase Error:", error);
				alert(error.message);
				return false;
			}else{
				console.error("General Error:", error);
				this.setProfilePicture(config.DEFAULT_PROFILE_PICTURE);
				alert(error);
				return false;
			}
		}
	}

	public async login(username:string, password:string, apiClientContext:PulseApiClient): Promise<boolean> {
		if (typeof username !== "string" || typeof password !== "string") {
			alert("Invalid email address or password");
			return false;
		}
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!re.test(String(username).toLowerCase())) {
			alert("Invalid email address: " + username);
			return false;
		}

		try {
			const user = await auth.signInWithEmailAndPassword(username, password);
			if (_.isNull(user.user)) return false;
			const uid = await apiClientContext.userService.getUid(user.user.uid);
			if (isHTTPError(uid)) {
				alert(uid.message);
				return false;
			}
			this.setProfilePicture(user.user.photoURL || config.DEFAULT_PROFILE_PICTURE);
			this.setUsername(username);
			this.setPassword(password);
			this.setFirebaseUid(user.user.uid);
			this.setPostgresUid(uid);
			this.isAuthInLoadingState = false;
			return true;
		} catch (e) {
			alert("Incorrect email or password");
			console.error("error logging in: " + e);
			return false;
		}
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
