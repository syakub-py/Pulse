import {View, StyleSheet, Text, SafeAreaView} from "react-native";
import {useContext} from "react";
import {AuthContext} from "../../Contexts/AuthContext";
import {auth} from "../../Utils/Firebase";
import {useNavigation} from "@react-navigation/native";
import SignUpLayout from "../../Components/SignUpLayout";

export default function AddAndConfigureDevices() {
	const authContext = useContext(AuthContext);
	const navigation = useNavigation();
	// const handleSignUp = (username:string, password:string, requirements:PasswordRequirement[]) => {
	// 		auth.createUserWithEmailAndPassword(username, password).then(() => {
	// 			navigation.navigate("AddHomes");
	// 		});
	// 	navigation.navigate("AddHomes");
	// };
	return (
		<SignUpLayout>
			<View>

			</View>
		</SignUpLayout>
	);
}

const styles = StyleSheet.create({

});
