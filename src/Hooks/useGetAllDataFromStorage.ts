import {useContext, useEffect} from "react";
import {auth} from "../Utils/Firebase";
import {AuthContext} from "../Contexts/AuthContext";

export default function useGetAllDataFromStorage(): void {
	const authContext = useContext(AuthContext);

	useEffect(() => {
		const determineInitialRoute = async () => {
			try {
				await authContext.getAuthDataFromStorage();
				if (!authContext.isLoggedIn) return;

				await auth.signInWithEmailAndPassword(authContext.username, authContext.password);
				authContext.setProfilePicture(auth.currentUser?.photoURL);
			} catch (error) {
				console.error("Error in determineInitialRoute:", error);
			}
		};
		void determineInitialRoute();
	}, [authContext.isLoggedIn, authContext.username, authContext.password]);
}
