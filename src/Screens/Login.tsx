import {View, TextInput, Button, Text, StyleSheet, Image, SafeAreaView, ImageBackground} from "react-native";
import {useCallback, useState} from "react";
import useLogin from "../Hooks/useLogin";
import {observer} from "mobx-react-lite";
import {LinearGradient} from "expo-linear-gradient";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const login = useLogin();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Login">>();

	const loginCallback = useCallback(async () => {
		await login(username, password);
	}, [login, password, username]);

	return (
		<ImageBackground
			source={require("../../assets/DefaultPictures/houseWallpaper.jpg")}
			style={styles.backgroundImage}>
			<LinearGradient
				colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.5)", "rgba(0,0,0,1)"]}
				locations={[0, 0.5, 0.9]}
				style={styles.container}>
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
						<Button title='Login' onPress={loginCallback} />
						<Text style={styles.registerText} onPress={()=>navigation.navigate("CreateUsernameAndPassword")}>Dont have an account? Register here</Text>
					</View>
				</SafeAreaView>
			</LinearGradient>
		</ImageBackground>
	);
}

export default observer(Login);

const styles = StyleSheet.create({
	input: {
		height: 40,
		margin: 12,
		paddingHorizontal: 10,
		backgroundColor: "white",
		borderRadius: 15,
	},
	container:{
		flex: 1,
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
		color:"white"
	},
	registerText: {
		textAlign: "center",
		marginTop: 10,
		color: "lightgray",
	},
	logo:{
		height:150,
		width:150,
		borderRadius:100,
	},
	logoContainer:{
		justifyContent:"center",
		alignItems:"center",
		margin:20
	},
	backgroundImage: {
		flex: 1,
		width: "100%",
		height: "100%",
	},
});

