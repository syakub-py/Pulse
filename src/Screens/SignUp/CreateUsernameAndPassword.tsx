import {StyleSheet, TextInput, SafeAreaView} from "react-native";
import {auth} from "../../Utils/Firebase";
import {useNavigation} from "@react-navigation/native";
import {useState} from "react";
import PasswordRequirementCheckBox from "../../Components/PasswordRequirementCheckBox";
import Button from "../../Components/Buttons/Button";

export default function CreateUsernameAndPassword() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigation= useNavigation();

	const requirements:PasswordRequirement[] = [
		{
			label: "At least 8 characters",
			fulfilled: password.length >= 8,
		},
		{
			label: "Contains at least one uppercase letter",
			fulfilled: /[A-Z]/.test(password),
		},
		{
			label: "Contains at least one lowercase letter",
			fulfilled: /[a-z]/.test(password),
		},
		{
			label: "Contains at least one number",
			fulfilled: /\d/.test(password),
		},
		{
			label: "Contains at least one special character",
			fulfilled: /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(password),
		},
	];

	const handleSignUp = (username:string, password:string, requirements:PasswordRequirement[]) => {
		// if (requirements.every((requirement) => requirement.fulfilled)) {
		// 	auth.createUserWithEmailAndPassword(username, password).then(() => {
		// 		navigation.navigate("AddHomes");
		// 	});
		// }
		navigation.navigate("AddHomes");
	};

	return (
		<SafeAreaView>
			<TextInput onChangeText={(text) => setUsername(text)} placeholder={"Username"}/>
			<TextInput onChangeText={(text) => setPassword(text)} placeholder={"Password"}/>
			<PasswordRequirementCheckBox requirements={requirements}/>
			<Button title={"Next"} containerStyle={styles.NextButton} textStyle={styles.NextButtonText} onPress={()=>handleSignUp(username, password, requirements)}/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	NextButton: {
		backgroundColor:"lightblue",
		width:"90%",
		margin:10,
		alignItems:"center",
		padding:10,
		borderRadius:15,
	},
	NextButtonText: {
		color: "white",
		fontSize:20,
	}
});

