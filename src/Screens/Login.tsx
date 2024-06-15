import { Text, View, TextInput, Button } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

export default function Login () {
	const authContext = useContext(AuthContext)
  return (
		<View style={styles.containar}>
			<TextInput
				placeholder="Email"
				onChangeText={(email) => { authContext.setUsername(email) }}
				style={styles.input}
			/>
			<TextInput
				placeholder="Password"
				onChangeText={(password) => { authContext.setPassword(password) }}
				style={styles.input}
				secureTextEntry
			/>
			<Button title="Login" onPress={() => { authContext.login() }} />
		</View>
	)
}

const styles = {
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1
  },
	containar: {
		flex: 1,
		justifyContent: "center",
	}
}
