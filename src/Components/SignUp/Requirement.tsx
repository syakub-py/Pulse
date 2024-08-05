import React, {useEffect, useState} from "react";
import {Text, View, StyleSheet} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {observer} from "mobx-react-lite";

interface Props{
	requirement:PasswordRequirement
}

function Requirement(props:Props) {
	const [iconName, setIconName] = useState("checkmark-circle-outline");
	const [color, setColor] = useState("gray");
	const {requirement} = props;

	useEffect(() => {
		const newIconName = requirement.fulfilled ? "checkmark-circle" : "checkmark-circle-outline";
		const newColor = requirement.fulfilled ? "green" : "white";

		setIconName(newIconName);
		setColor(newColor);
	}, [requirement.fulfilled]);

	return (
		<View style={styles.requirementContainer}>
			<Ionicons name={iconName} size={20} color={color} />
			<Text style={styles.requirementText}>{requirement.label}</Text>
		</View>
	);
}
export default observer(Requirement);
const styles = StyleSheet.create({
	requirementContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 40,
		marginBottom: 4,
	},
	requirementText: {
		marginLeft: 8,
		color:"white"
	}
});

