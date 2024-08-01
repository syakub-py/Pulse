import {useContext, useEffect} from "react";
import {auth} from "../Utils/Firebase";
import {AuthContext} from "../Contexts/AuthContext";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import _ from "lodash";

export default function useGetAllDataFromStorage(): void {
	const authContext = useContext(AuthContext);
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	useEffect(() => {
		const determineInitialRoute = async () => {
			try {
				await authContext.getAuthDataFromStorage();
				if (!authContext.isLoggedIn) {
					authContext.isLoading = false;
					return;
				}
				const user = await auth.signInWithEmailAndPassword(authContext.username, authContext.password);
				if (_.isNull(user.user)) return;
				authContext.setUid(user.user?.uid);
				authContext.setProfilePicture(auth.currentUser?.photoURL);
			} catch (FirebaseError) {
				await authContext.logout();
				navigation.navigate("Login");
			}
		};
		void determineInitialRoute();
	}, [authContext.isLoggedIn, authContext.username, authContext.password]);
}
