import {View, Text, StyleSheet} from "react-native";


interface Props {
	tenant:User;
}

export default function TenantCard(props: Props){
	const {tenant} = props;
	return(
		<View style={styles.container}>
			<Text style={styles.name}>{tenant.Name}</Text>
			<Text style={styles.dateOfBirth}>{tenant.DateOfBirth}</Text>
			<Text style={styles.income}>{tenant.AnnualIncome}</Text>
		</View>
	);
}


const styles = StyleSheet.create({
	container: {
		backgroundColor: "#333",
		padding: 20,
		borderRadius: 10,
		margin: 10,
	},
	name: {
		fontSize: 24,
		color: "#fff",
		fontWeight: "bold",
	},
	dateOfBirth: {
		fontSize: 18,
		color: "#ccc",
		marginBottom: 10,
	},
	income: {
		fontSize: 18,
		color: "#ccc",
	},
});
