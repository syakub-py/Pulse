import { auth } from "../Utils/FirebaseConfig";
import { useCallback } from "react";
import { useAuthContext } from "../Contexts/AuthContext";
import _ from "lodash";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useApiClientContext} from "@src/Contexts/PulseApiClientContext";
import isHTTPError from "@src/Utils/HttpError";
import config from "../../env";

export default function useLogin() {
	const authContext = useAuthContext();
	const apiClientContext = useApiClientContext();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Login">>();

	return useCallback(async (username: string, password: string) => {
		if (typeof username !== "string" || typeof password !== "string") {
			alert("Invalid email address or password");
			return;
		}
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!re.test(String(username).toLowerCase())) {
			alert("Invalid email address: " + username);
			return;
		}

		try {
			const user = await auth.signInWithEmailAndPassword(username, password);
			if (_.isNull(user.user)) return;
			const uid = await apiClientContext.userService.getUid( user.user.uid);
			if (isHTTPError(uid)) {
				alert(uid.message);
				return;
			}
			authContext.setProfilePicture(user.user.photoURL || config.DEFAULT_PROFILE_PICTURE);
			authContext.setUsername(username);
			authContext.setPassword(password);
			authContext.setFirebaseUid(user.user.uid);
			authContext.setPostgresUid(uid);
			authContext.isAuthInLoadingState = false;
			navigation.navigate("BottomNavBar");
		} catch (e) {
			alert("Incorrect email or password");
			console.error("error logging in: " + e);
		}
	},[apiClientContext.userService, authContext, navigation]);
}
