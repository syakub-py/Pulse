import {useContext, useEffect} from "react";
import {auth} from "../Utils/Firebase";
import {AuthContext} from "../Contexts/AuthContext";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

export default function useGetAllDataFromStorage(): void {
	const authContext = useContext(AuthContext);
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	useEffect(() => {
		const determineInitialRoute = async () => {
			try {
				await authContext.getAuthDataFromStorage();
				if (!authContext.isLoggedIn) return;

				await auth.signInWithEmailAndPassword(authContext.username, authContext.password);
				authContext.setProfilePicture(auth.currentUser?.photoURL);
			} catch (error) {
				await authContext.logout();
				navigation.navigate("Login");
				console.error("Error in determineInitialRoute:", error);
			}
		};
		void determineInitialRoute();
	}, [authContext.isLoggedIn, authContext.username, authContext.password]);
}
