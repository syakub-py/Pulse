import {observer} from "mobx-react-lite";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import {FlatList, StyleSheet, View, Text} from "react-native";
import {useContext} from "react";
import {AppContext} from "../Contexts/AppContext";

function Leases(){
	const appContext = useContext(AppContext);
	return (
		<Layout>
			<Header title={"Your Leases"}/>
			<FlatList data={appContext.Leases} renderItem={({item, index})=>(
				<View style={styles.card} key={index}>
					<Text style={[styles.text, styles.header]}>Lease ID: {item.LeaseId}</Text>
					<Text style={styles.text}>Start Date: {item.StartDate.toDateString()}</Text>
					<Text style={styles.text}>End Date: {item.EndDate.toDateString()}</Text>
					<Text style={styles.text}>Monthly Rent: ${item.MonthlyRent}</Text>
					<Text style={styles.activeStatus}>Status: {item.IsActive() ? "Active" : "Inactive"}</Text>
				</View>
			)}/>
		</Layout>
	);
}

export default observer(Leases);
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
		color:"white"
	},
	tenant: {
		marginLeft: 10,
	},
	activeStatus: {
		marginTop: 10,
		fontWeight: "bold",
		color:"white"
	},
	text: {
		color: '#fff',
	},
});
