import {useEffect} from "react";
import {auth} from "../Utils/Firebase";
import {useAuthContext} from "../Contexts/AuthContext";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import _ from "lodash";

export default function useGetAllDataFromStorage() {
	const authContext = useAuthContext();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

	useEffect(() => {
		const determineInitialRoute = async () => {
			try {
				await authContext.getAuthDataFromStorage();
				if (!authContext.isLoggedIn) {
					authContext.isLoadingAuth = false;
					return;
				}
				const user = await auth.signInWithEmailAndPassword(authContext.username, authContext.password);
				if (_.isNull(user.user)) return;
				authContext.setFirebaseUid(user.user.uid);
				authContext.setProfilePicture(auth.currentUser?.photoURL);
			} catch (FirebaseError) {
				await authContext.clearContextAndFirebaseLogout();
				navigation.navigate("Login");
			}
		};
		void determineInitialRoute();
	}, [authContext.isLoggedIn, authContext.username, authContext.password, authContext, navigation]);
}
