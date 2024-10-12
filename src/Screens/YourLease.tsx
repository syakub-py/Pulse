import {observer} from "mobx-react-lite";
import Layout from "../Components/GlobalComponents/Layout";
import Header from "../Components/GlobalComponents/Header";
import SubHeader from "../Components/Analytics/SubHeader";
import {StyleSheet, Text} from "react-native";
import {useAuthContext} from "../Contexts/AuthContext";
import {useLeaseContext} from "@src/Contexts/LeaseContext";
import _ from "lodash";


function YourLease() {
	const leaseContext = useLeaseContext();
	const authContext = useAuthContext();

	if (_.isNull(leaseContext)) return;

	const lease = leaseContext.selectedPropertyLeases.find((lease)=>lease.TenantUid === authContext.firebase_uid);

	if (_.isUndefined(lease)) return;

	return(
		<Layout>
			<Header title={"Your lease"}/>
			<SubHeader title={"Lease Details"}/>
			<Text style={styles.text}>Lease started: {lease.StartDate}</Text>
			<Text style={styles.text}>Lease ends: {lease.EndDate}</Text>
			<Text style={styles.text}>Payments: {lease.MonthlyRent?.toLocaleString("en-US")}</Text>
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
