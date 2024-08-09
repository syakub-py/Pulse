import {observer} from "mobx-react-lite";
import {StyleSheet, Text, View} from "react-native";
import {useAppContext} from "../../Contexts/AppContext";

interface Props{
	lease:Lease
}


function LeaseCard(props: Props) {
	const { lease } = props;
	const appContext = useAppContext();
	return (
		<View style={styles.card}>
			<Text style={[styles.text, styles.header]}>Current Tenant: {lease.TenantName}</Text>
			<Text style={styles.text}>Monthly Rent: {lease.MonthlyRent?.toLocaleString("en-US", { style: "currency", currency: "USD" })}</Text>
			<Text style={styles.text}>Address: {appContext.SelectedProperty?.Address}</Text>
			{/*<Text style={styles.text}>Status: {lease.Status}</Text>*/}
			{/*<Text style={styles.text}>Next Payment Due: {lease.NextPaymentDue}</Text>*/}
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
		shadowOffset: { width: 0, height: 2 },
		elevation: 5,
	},
	header: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
		color: "white",
	},
	text: {
		color: "#fff",
		marginBottom: 5,
	},
});
