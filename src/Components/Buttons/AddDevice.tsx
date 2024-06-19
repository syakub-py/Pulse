import {Text, View, StyleSheet, Pressable} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Props {
	onPress?: () => void;
}


export default function AddDeviceButton(props:Props){
	return(
		<Pressable onPress={props.onPress}>
			<View style={styles.addDeviceButton}>
				<Ionicons name={"add"} size={15} color="white"/>
				<Text style={styles.addDeviceButtonText}>Add</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	addDeviceButton:{
		justifyContent:"center",
		alignItems:"center",
		backgroundColor:"black",
		height:40,
		width:70,
		opacity:0.7,
		marginHorizontal:20,
		borderRadius:20,
		flexDirection:"row",
	},
	addDeviceButtonText:{
		fontSize:15,
		fontWeight:"bold",
		color:"white",
	}
});
