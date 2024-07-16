import React from "react";
import {View, Text} from "react-native";
import Requirement from "./Requirement";


interface Props{
	requirements:PasswordRequirement[]
}

export default function PasswordRequirementCheckBox(props: Props){
	const {requirements} = props;
	return (
		<View>
			<Text style={{marginLeft: 20, fontWeight: "bold", fontSize: 18}}>Password Requirements:</Text>
			{
				requirements.map((requirement, index) => (
					<Requirement key={index} requirement={requirement} />
				))
			}
		</View>
	);
}
