import {observer} from "mobx-react-lite";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Pressable, StyleSheet} from "react-native";
import React from "react";

interface Props{
	onPress?:() => void;
}

function TrashButton(props:Props){

	return(
		<Pressable
			style={styles.trashButton} onPress={props.onPress}>
			<Ionicons name={"trash-outline"} size={24} color={"red"} />
		</Pressable>
	)
}

export default observer(TrashButton);

const styles = StyleSheet.create({
	trashButton: {
		position: "absolute",
		flexDirection: "row",
		top: 0,
		right: 0,
		bottom: 0,
		width: 70,
		alignItems: "center",
		justifyContent: "center",
	},
})
