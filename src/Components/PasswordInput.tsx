import {StyleSheet, TextInput, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useState} from "react";

interface Props{
	setPassword:(string:string) => void;
}

export default function PasswordInput(props:Props){
	const {setPassword} = props;
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	return (
		<View style={styles.passwordContainer}>
			<TextInput onChangeText={(text) => setPassword(text)} placeholder={"Password"} style={styles.textInput} secureTextEntry={!isPasswordVisible}/>
			<Ionicons name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={20} color={"black"} style={styles.eyeIcon} onPress={() => setIsPasswordVisible(!isPasswordVisible)}/>
		</View>
	);
}

const styles = StyleSheet.create({
	passwordContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "whitesmoke",
		borderRadius: 15,
		margin: 12,
		height:40,
		width:"90%"
	},
	eyeIcon:{
		position:"absolute",
		right:20
	},
	textInput: {
		height: 40,
		margin: 12,
		paddingHorizontal: 10,
		backgroundColor: "whitesmoke",
		borderRadius: 15,
		width:"90%"
	},
});
