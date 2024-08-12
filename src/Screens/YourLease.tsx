import {observer} from "mobx-react-lite";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import {useAppContext} from "../Contexts/AppContext";
import SubHeader from "../Components/Analytics/SubHeader";
import {StyleSheet, Text} from "react-native";


function YourLease() {
	const appContext = useAppContext();
	const lease = appContext.SelectedPropertyLeases.find((lease)=>lease.PropertyId === appContext.SelectedProperty?.PropertyId);
	return(
		<Layout>
			<Header title={"Your lease"}/>
			<SubHeader title={"Lease Details"}/>
			<Text style={styles.text}>Lease started: {lease?.StartDate}</Text>
			<Text style={styles.text}>Lease ends: {lease?.EndDate}</Text>
			<Text style={styles.text}>Payments: {lease?.MonthlyRent?.toLocaleString("en-US")}</Text>
			{/*<SubHeader title={"Tenant Details"}/>*/}
			{/*<Text style={styles.text}>Name: {lease.TenantName}</Text>*/}
			{/*<Text style={styles.text}>Email: {tenant?.Email}</Text>*/}
			{/*<Text style={styles.text}>Phone Number: {tenant?.PhoneNumber}</Text>*/}
			{/*<Text style={styles.text}>Document Provided: Drivers License</Text>*/}
			{/*<Image*/}
			{/*	source={{uri:"https://static01.nyt.com/images/2013/03/17/nyregion/license/license-articleLarge.jpg?year=2013&h=400&w=600&s=1c750ce48ce85651562156f35d6d9d15ac2a042e5a1a8897de7d43fa35e1e75e&k=ZQJBKqZ0VN&tw=1"}}*/}
			{/*	style={styles.driversLicencePicture}*/}
			{/*/>*/}
			{/*<Text style={styles.text}>Social Sec.: {tenant?.SocialSecurity}</Text>*/}
			{/*<Text style={styles.text}>Annual Income: ${tenant?.AnnualIncome.toLocaleString("en-US")}</Text>*/}
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
