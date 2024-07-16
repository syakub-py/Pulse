import {View, StyleSheet} from "react-native";
import {auth} from "../../Utils/Firebase";
import {useNavigation} from "@react-navigation/native";

const areAllRequirementsFulfilled = (password:string) => {
	const requirements = [
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
	return requirements.every((requirement) => requirement.fulfilled);
};
const handleSignUp = (username:string, password:string) => {
	if (areAllRequirementsFulfilled(password)) {
		auth
			.createUserWithEmailAndPassword(username, password)
			.then(() => {

			});
	}
};

export default function CreateUsernameAndPassword() {
	const navigation= useNavigation();
	return (
		<View>

		</View>
	);
}

const styles = StyleSheet.create({

});

