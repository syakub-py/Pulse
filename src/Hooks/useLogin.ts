import {auth} from "../Utils/Firebase";
import {useCallback, useContext} from "react";
import {AuthContext} from "../Contexts/AuthContext";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import _ from "lodash";

export default function useLogin():(username: string, password: string)=>Promise<void>{
	const authContext = useContext(AuthContext);
	const navigation = useNavigation<StackNavigationProp<RootStackParamList,"Login">>();
	return useCallback( async (username, password)=>{
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!re.test(String(username).toLowerCase())) {
			alert("Invalid email address: " + username);
		}
		try{
			const user = await auth.signInWithEmailAndPassword(username, password);
			if (_.isNull(user.user)) return;
			console.log(username);
			authContext.setProfilePicture(user.user.photoURL || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
			authContext.setAccessToken(user.user.refreshToken);
			authContext.setUsername(username);
			navigation.navigate("BottomNavBar");
		}catch(e){
			console.log(e);
		}
	},[authContext]);
}
