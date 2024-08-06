import {observer} from "mobx-react-lite";
import {StyleSheet, Text, View} from "react-native";

interface Props{
	lease:Lease
}


function LeaseCard(props:Props){
	const {lease} = props;
	return (
		<View style={styles.card} key={lease.LeaseId}>
			<Text style={[styles.text, styles.header]}>Current tenant: {lease.TenantName}</Text>
			<Text style={styles.text}>Start Date: {lease.StartDate}</Text>
			<Text style={styles.text}>End Date: {lease.EndDate}</Text>
			<Text style={styles.text}>Monthly Rent: ${lease.MonthlyRent?.toLocaleString("en-us")}</Text>
		</View>
	);
}


export default observer(LeaseCard);
const styles = StyleSheet.create({
	card: {
		padding: 20,
		margin: 10,
		backgroundColor: "#333",
		borderRadius: 10,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 10,
		shadowOffset: {width: 0, height: 2},
		elevation: 5,
	},
	header: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
		color: "white"
	},
	text: {
		color: "#fff",
	},
});
