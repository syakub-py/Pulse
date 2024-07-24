import React from "react";
import {View, Text, StyleSheet} from "react-native";
import Requirement from "./Requirement";
import {observer} from "mobx-react-lite";


interface Props{
	requirements:PasswordRequirement[]
}

function PasswordRequirementCheckBox(props: Props){
	const {requirements} = props;
	return (
		<View>
			<Text style={styles.titleText}>Password Requirements:</Text>
			{
				requirements.map((requirement, index) => (
					<Requirement key={index} requirement={requirement} />
				))
			}
		</View>
	);
}

export default observer(PasswordRequirementCheckBox);

const styles = StyleSheet.create({
	titleText:{
		marginLeft: 20,
		fontWeight: "bold",
		fontSize: 18,
		color:"white",
		marginBottom:10
	}
});

