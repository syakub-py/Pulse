import {View, StyleSheet, Switch, Text} from "react-native";
import {useState} from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Props{
	light:Device
}

export default function Light(props:Props){
	const [isOn, setIsOn] = useState(false);
	const {light} = props;
	const toggleSwitch = () => {
		setIsOn(previousState => !previousState);
	};

	return(
		<View style={[styles.container, {backgroundColor:isOn?"white":"black"}]}>
			<Ionicons name={"bulb-outline"} size={70} color={isOn?"black":"white"}/>
			<View style={{position:"absolute", bottom:10, left:10}}>
				<Switch
					trackColor={{ false: "#767577", true: "#81b0ff" }}
					thumbColor={isOn ? "#f5dd4b" : "#f4f3f4"}
					ios_backgroundColor="#3e3e3e"
					onValueChange={toggleSwitch}
					value={isOn}
				/>
			</View>
			<Text>{light.Name}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height:150,
		width: 150,
		opacity:0.7,
		borderRadius:20,
		justifyContent:"center",
		alignItems:"center"
	},
});
