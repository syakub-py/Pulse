import {View, Text, StyleSheet} from "react-native";
import Requirement from "./Requirement";

interface Props{
	requirements:PasswordRequirement[]
}

export default function PasswordRequirementCheckBox(props: Props){
	const {requirements} = props;
	return (
		<View>
			<Text style={styles.titleText}>Password Requirements:</Text>
			{requirements.map((requirement, index) => (
				<Requirement key={index} requirement={requirement} />
			))}
		</View>
	);
}


const styles = StyleSheet.create({
	titleText:{
		marginLeft: 20,
		fontWeight: "bold",
		fontSize: 18,
		color:"white",
		marginBottom:10
	}
});

