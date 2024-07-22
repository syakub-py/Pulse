import {View, TextInput, Button, Text, StyleSheet, Image, SafeAreaView} from "react-native";
import {useCallback, useState} from "react";
import { useNavigation } from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import useLogin from "../Hooks/useLogin";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Login">>();
	const login = useLogin(username, password);
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.logoContainer}>
				<Image style={styles.logo} source={require("../../assets/icon.png")} />
			</View>
			<View style={styles.inputContainer}>

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
				<Button title='Login' onPress={login} />
				<Text style={styles.registerText} onPress={()=>navigation.navigate("SignUp")}>Dont have an account? Register here</Text>
			</View>
		</SafeAreaView>
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
	container:{
		flex: 1,
		backgroundColor: "white"
	},
	inputContainer: {
		justifyContent: "center",
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
	},
	logo:{
		height:150,
		width:150,
		borderRadius:60,
	},
	logoContainer:{
		justifyContent:"center",
		alignItems:"center",
		margin:20
	}
});

