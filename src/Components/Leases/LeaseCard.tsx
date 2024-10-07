import {observer} from "mobx-react-lite";
import {StyleSheet, Text, View} from "react-native";
import _ from "lodash";
import {usePropertyContext} from "@src/Contexts/PropertyContext";

interface Props{
	lease:Lease,
}


function LeaseCard(props: Props) {
	const { lease } = props;
	const propertyContext = usePropertyContext();

	if (_.isNull(propertyContext)) return null;

	return (
		<View style={styles.card}>
			<Text style={[styles.text, styles.header]}>
				Current Tenant: {_.isEmpty(lease.TenantName)?"Waiting for tenant's information...": lease.TenantName}
			</Text>
			<Text style={styles.text}>
				Monthly Rent: ${lease.MonthlyRent?.toLocaleString("en-US", { style: "currency", currency: "USD" })}
			</Text>
			<Text style={styles.text}>Address: {propertyContext.SelectedProperty?.Address}</Text>
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
