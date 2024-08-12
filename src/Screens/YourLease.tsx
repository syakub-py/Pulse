import {observer} from "mobx-react-lite";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import {useAppContext} from "../Contexts/AppContext";
import SubHeader from "../Components/Analytics/SubHeader";
import {StyleSheet, Text} from "react-native";
import {useAuthContext} from "../Contexts/AuthContext";


function YourLease() {
	const appContext = useAppContext();
	const authContext = useAuthContext();
	const lease = appContext.SelectedPropertyLeases.find((lease)=>lease.TenantUid === authContext.uid);
	return(
		<Layout>
			<Header title={"Your lease"}/>
			<SubHeader title={"Lease Details"}/>
			<Text style={styles.text}>Lease started: {lease?.StartDate}</Text>
			<Text style={styles.text}>Lease ends: {lease?.EndDate}</Text>
			<Text style={styles.text}>Payments: {lease?.MonthlyRent?.toLocaleString("en-US")}</Text>
		</Layout>
	);
}

export default observer(YourLease);


const styles = StyleSheet.create({
	text:{
		color:"white",
		marginVertical:10,
	},
});
