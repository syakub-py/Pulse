import { View, TextInput, Button } from "react-native";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../Utils/Firebase";

//add logic to check if email is valid before calling signInWithEmailAndPassword
const login = (username: string, password: string) => {
	auth.signInWithEmailAndPassword(username, password)
		.catch((error) => alert(error.message));
};


export default function Login() {
	const authContext = useContext(AuthContext);
	const { username, password } = authContext;
	const navigation = useNavigation();

	useEffect(() => {
		return auth.onAuthStateChanged(async (user) => {
			if (user) {
				authContext.setProfilePicture(user.photoURL || "");
				navigation.navigate("Home");
				console.log(authContext.profilePicture);
			}
		});
	}, []);

	return (
		<View style={{ flex: 1, justifyContent: "center", }}>
			<TextInput
				placeholder='Email'
				onChangeText={(email) => { authContext.setUsername(email); }}
				style={styles.input}
			/>
			<TextInput
				placeholder='Password'
				onChangeText={(password) => { authContext.setPassword(password); }}
				style={styles.input}
				secureTextEntry
			/>
			<Button title='Login' onPress={() => { login(username, password); }} />
		</View>
	);
}

const styles = {
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1
	},
};

