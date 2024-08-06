import {observer} from "mobx-react-lite";
import { View, Text, Button, StyleSheet } from "react-native";
import Modal from "react-native-modal";

interface Props {
	isVisible: boolean;
	toggleModal: () => void;
	lease: Lease;
}

function LeaseDetails(props:Props){
	const {isVisible, toggleModal, lease} = props;
	return (
		<View style={styles.container}>
			<Modal
				isVisible={isVisible}
				onBackdropPress={toggleModal}
				onSwipeComplete={toggleModal}
				swipeDirection="down"
				style={styles.modal}>
				<View style={styles.modalContent}>
					<Text>Tenant: {lease.TenantName}</Text>
					<Text>Lease started: {lease.StartDate}</Text>
					<Text>Lease ends: {lease.EndDate}</Text>
					<Text>{lease.MonthlyRent}</Text>
					<Text>Document Provided: Drivers License</Text>
					<Button title="Close" onPress={toggleModal} />
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
});
