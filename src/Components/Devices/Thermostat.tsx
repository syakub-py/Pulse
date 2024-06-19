import {View, StyleSheet, Text} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Slider from "@react-native-community/slider";
import {useState} from "react";

export default function Thermostat() {

	return (
		<View style={styles.container}>
			<Text style={styles.temperatureText}>72°F</Text>
			<View style={styles.buttonContainer}>
				<View style={{height:30, width:30, alignItems:"center",justifyContent:"center", backgroundColor:"lightblue", borderRadius:20}}>
					<Ionicons name={"snow-outline"} color={"black"} size={20}/>
				</View>
				<View style={{height:30, width:30, alignItems:"center",justifyContent:"center", backgroundColor:"orange", borderRadius:20}}>
					<Ionicons name={"flame-outline"} color={"black"} size={20}/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height:150,
		width: 150,
		backgroundColor: "black",
		opacity:0.7,
		borderRadius:20,
		justifyContent:"center",
		alignItems:"center"
	},
	buttonContainer: {
		flexDirection: "row",
		height:"30%",
		width:"87%",
		justifyContent:"space-between",
		marginHorizontal:10,
		position:"absolute",
		bottom:0,
	},
	temperatureText:{
		fontSize:40,
		color:"white",
	},
});

