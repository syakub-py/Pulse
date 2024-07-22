import {View} from "react-native";
import {auth} from "../../Utils/Firebase";
import {useNavigation} from "@react-navigation/native";
import SignUpLayout from "../../Components/SignUpLayout";
import Button from "../../Components/Buttons/Button";
import { StackNavigationProp } from "@react-navigation/stack";
import {useContext} from "react";
import {AuthContext} from "../../Contexts/AuthContext";

export default function AddAndConfigureDevices() {
	// const navigation = useNavigation<StackNavigationProp<"AddAndConfigureDevices">();
	// const authContext = useContext(AuthContext);
	// const handleSignUp = (username:string, password:string) => {
	// 	auth.createUserWithEmailAndPassword(username, password).then(() => {
	// 		navigation.navigate("AddHomes");
	// 	});
	// };

	return (
		<SignUpLayout>
			<View>
				{/*<Button title={"Sign Up"} onPress={()=>handleSignUp(authContext.username, authContext.password)}/>*/}

			</View>
		</SignUpLayout>
	);
}
