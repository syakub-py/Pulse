import { useCallback } from "react";
import { useAuthContext } from "../Contexts/AuthContext";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useApiClientContext} from "@src/Contexts/PulseApiClientContext";


export default function useLogin() {
	const authContext = useAuthContext();
	const apiClientContext = useApiClientContext();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Login">>();
	return useCallback(async (username: string, password: string) => {
		const isLoginSuccessful= await authContext.login(username, password, apiClientContext);
		if (!isLoginSuccessful) return;
		navigation.navigate("BottomNavBar");
	},[apiClientContext, authContext, navigation]);
}
