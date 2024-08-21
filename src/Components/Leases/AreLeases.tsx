import {observer} from "mobx-react-lite";
import {Pressable, View, StyleSheet, RefreshControl} from "react-native";
import LeaseCard from "./LeaseCard";
import TrashButton from "../TrashButton";
import {SwipeListView} from "react-native-swipe-list-view";
import {useCallback, useState} from "react";
import {useAppContext} from "@src/Contexts/AppContext";
import _ from "lodash";
import LeaseDetails from "./LeaseDetails";
import useGetLeasesAndTenants from "@src/Hooks/useGetLeasesAndTenants";
import Search from "@src/Components/Search";
import Fuse from "fuse.js";


function AreLeases(){
	const appContext = useAppContext();
	const [isModalVisible, setModalVisible] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const fetchTenantAndLeases = useGetLeasesAndTenants();

	const options = {
		keys: ["TenantName"],
		threshold: 0.3,
	};

	const onRefresh = async () => {
		setRefreshing(true);
		await fetchTenantAndLeases();
		setRefreshing(false);
	};

	const toggleModal = useCallback(() => {
		setModalVisible(prevState => !prevState);
	}, []);

	const deleteLease = useCallback(async (leaseId: number) => {
		if (_.isUndefined(leaseId)) return;
		await appContext.deleteLease(leaseId);
	}, [appContext]);

	const fuse = new Fuse(appContext.SelectedPropertyLeases, options);
	const results = !_.isEmpty(searchQuery)?fuse.search(searchQuery).map(result => result.item):appContext.SelectedPropertyLeases;

	return(
		<View>
			<SwipeListView
				data={results}
				ListHeaderComponent={<Search searchQuery={searchQuery} onSearchQueryChange={setSearchQuery}/>}
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
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
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
