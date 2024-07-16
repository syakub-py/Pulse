import React, {useEffect, useState} from "react";
import {Text, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Props{
	requirement:PasswordRequirement
}

export default function Requirement(props:Props) {
	const [iconName, setIconName] = useState("checkmark-circle-outline");
	const [color, setColor] = useState("black");
	const {requirement} = props;
	
	useEffect(() => {
		const newIconName = requirement.fulfilled ? "checkmark-circle" : "checkmark-circle-outline";
		const newColor = requirement.fulfilled ? "green" : "black";

		setIconName(newIconName);
		setColor(newColor);
	}, [requirement.fulfilled]);

	return (
		<View style={{flexDirection: "row", alignItems: "center", marginLeft: 40, marginBottom: 4}}>
			<Ionicons name={iconName} size={20} color={color} />
			<Text style={{marginLeft: 8}}>{requirement.label}</Text>
		</View>
	);
}
