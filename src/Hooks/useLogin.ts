import { auth } from "../Utils/Firebase";
import { useCallback, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import _ from "lodash";

export default function useLogin() {
	const authContext = useContext(AuthContext);
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Login">>();

	return useCallback(
		async (username: string, password: string) => {
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
				authContext.setProfilePicture(user.user.photoURL || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
				authContext.setUsername(username);
				authContext.setPassword(password);
				authContext.setUid(user.user.uid);
				navigation.navigate("BottomNavBar");
				authContext.isLoading = false;
			} catch (e) {
				console.log(e);
			}
		},
		[authContext, navigation]
	);
}
