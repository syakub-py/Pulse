import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthContextClass } from "../Contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../Utils/Firebase";

const login = (username: string, password: string, authContext: AuthContextClass) => {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!re.test(String(username).toLowerCase())) {
		alert("Invalid email address: " + username);
	}
	authContext.setUsername(username);
	auth.signInWithEmailAndPassword(username, password).catch((error) => console.log(error.message));
};

export default function Login() {
	const authContext = useContext(AuthContext);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigation = useNavigation();

	useEffect(() => {
		return auth.onAuthStateChanged(async (user) => {
			if (user) {
				authContext.setProfilePicture(user.photoURL || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
				navigation.navigate("BottomNavBar");
			}
		});
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.loginText}>Login</Text>
			<TextInput
				placeholder='Email'
				onChangeText={(email) => { setUsername(email); }}
				style={styles.input}
			/>
			<TextInput
				placeholder='Password'
				onChangeText={(password) => { setPassword(password); }}
				style={styles.input}
				secureTextEntry
			/>
			<Button title='Login' onPress={() => { login(username, password, authContext); }} />
			<Text style={styles.registerText}>Dont have an account? Register here</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	input: {
		height: 40,
		margin: 12,
		paddingHorizontal: 10,
		backgroundColor: "whitesmoke",
		borderRadius: 15,
	},
	container: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "white",
	},
	loginText: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		alignItems: "center",
		marginBottom: 20,
	},
	registerText: {
		textAlign: "center",
		marginTop: 10,
		color: "lightgray",
	}
});

