import {observer} from "mobx-react-lite";
import {Pressable, View, StyleSheet} from "react-native";
import LeaseCard from "./LeaseCard";
import TrashButton from "../TrashButton";
import {SwipeListView} from "react-native-swipe-list-view";
import {useCallback, useState} from "react";
import {useAppContext} from "@src/Contexts/AppContext";
import _ from "lodash";
import LeaseDetails from "./LeaseDetails";

function AreLeases(){
	const appContext = useAppContext();
	const [isModalVisible, setModalVisible] = useState(false);

	const toggleModal = useCallback(() => {
		setModalVisible(prevState => !prevState);
	}, []);

	const deleteLease = useCallback(async (leaseId: number) => {
		if (_.isUndefined(leaseId)) return;
		await appContext.deleteLease(leaseId);
	}, [appContext]);

	return(
		<View>
			<SwipeListView
				data={appContext.SelectedPropertyLeases}
				renderItem={({ item }) => (
					<View style={styles.container}>
						<Pressable onPress={toggleModal}>
							<LeaseCard lease={item} />
						</Pressable>
						{isModalVisible && (
							<LeaseDetails
								toggleModal={toggleModal}
								lease={item}
								tenant={appContext.Tenants.find((tenant)=>tenant.LeaseId === item.LeaseId)}
							/>
						)}
					</View>
				)}
				rightOpenValue={-50}
				renderHiddenItem={({ item }) => (
					<TrashButton onPress={async () => deleteLease(item.LeaseId)} />
				)}
			/>
		</View>
	);
}

export default observer(AreLeases);


const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
	},
});
