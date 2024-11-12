import {View, Text, StyleSheet} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Props{
	requirements:PasswordRequirement[],
	password:string
}

export default function PasswordRequirementCheckBox(props: Props){
	const {requirements, password} = props;
	return (
		<View>
			<Text style={styles.titleText}>Password Requirements:</Text>
			{requirements.map((requirement, index) => (
				<View style={styles.requirementContainer} key={index}>
					<Ionicons name={requirement.fulfilled(password) ? "checkmark-circle" : "checkmark-circle-outline"} size={20} color={ requirement.fulfilled(password) ? "green" : "white"} />
					<Text style={styles.requirementText}>{requirement.label}</Text>
				</View>
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
	},
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

