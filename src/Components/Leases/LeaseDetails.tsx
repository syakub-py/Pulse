import {observer} from "mobx-react-lite";
import {View, Text, Button, StyleSheet, Image} from "react-native";
import Modal from "react-native-modal";
import SubHeader from "../Analytics/SubHeader";

interface Props {
	isVisible: boolean;
	toggleModal: () => void;
	lease: Lease;
	tenant?:Tenant
}

function LeaseDetails(props:Props){
	const {isVisible, toggleModal, lease, tenant} = props;
	return (
		<View style={styles.container}>
			<Modal
				isVisible={isVisible}
				onBackdropPress={toggleModal}
				onSwipeComplete={toggleModal}
				swipeDirection="down"
				style={styles.modal}>
				<View style={styles.modalContent}>
					<SubHeader title={"Lease Details"}/>
					<Text style={styles.text}>Lease started: {lease.StartDate}</Text>
					<Text style={styles.text}>Lease ends: {lease.EndDate}</Text>
					<Text style={styles.text}>Payments: {lease.MonthlyRent?.toLocaleString("en-US")}</Text>
					<SubHeader title={"Tenant Details"}/>
					<Text style={styles.text}>Name: {lease.TenantName}</Text>
					<Text style={styles.text}>Email: {tenant?.Email}</Text>
					<Text style={styles.text}>Phone Number: {tenant?.PhoneNumber}</Text>
					<Text style={styles.text}>Document Provided: Drivers License</Text>
					<Image source={{uri:"https://static01.nyt.com/images/2013/03/17/nyregion/license/license-articleLarge.jpg?year=2013&h=400&w=600&s=1c750ce48ce85651562156f35d6d9d15ac2a042e5a1a8897de7d43fa35e1e75e&k=ZQJBKqZ0VN&tw=1"}}
						   style={styles.driversLicencePicture}/>
					<Text style={styles.text}>Social Sec.: {tenant?.SocialSecurity}</Text>
					<Text style={styles.text}>Annual Income: ${tenant?.AnnualIncome.toLocaleString("en-US")}</Text>
				</View>
			</Modal>
		</View>
	);

}

export default observer(LeaseDetails);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modal: {
		justifyContent: "flex-end",
		margin: 0,
	},
	modalContent: {
		backgroundColor: "#333",
		padding: 22,
		borderTopLeftRadius: 17,
		borderTopRightRadius: 17,
		borderColor: "rgba(0, 0, 0, 0.1)",
	},
	header:{
		fontSize: 16,
		fontWeight: "bold",
	},
	text:{
		color:"white",
		marginVertical:10,
	},
	driversLicencePicture:{
		width:"100%",
		height:200,
		borderRadius:10,
		marginVertical:10
	}
});
