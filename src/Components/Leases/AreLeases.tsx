import {observer} from "mobx-react-lite";
import {Pressable, View, StyleSheet, RefreshControl} from "react-native";
import LeaseCard from "./LeaseCard";
import TrashButton from "../GlobalComponents/TrashButton";
import {SwipeListView} from "react-native-swipe-list-view";
import {useCallback, useMemo, useState} from "react";
import _ from "lodash";
import LeaseDetails from "./LeaseDetails";
import useGetLeasesAndTenants from "@src/Hooks/useGetLeasesAndTenants";
import Search from "@src/Components/GlobalComponents/Search";
import Fuse from "fuse.js";
import {useLeaseContext} from "@src/Contexts/LeaseContext";
import {useUserContext} from "@src/Contexts/UserContext";


function AreLeases(){
	const leaseContext = useLeaseContext();
	const userContext = useUserContext();
	const [isModalVisible, setModalVisible] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const fetchTenantAndLeases = useGetLeasesAndTenants();

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await fetchTenantAndLeases();
		setRefreshing(false);
	}, [fetchTenantAndLeases]);


	const toggleModal = useCallback(() => {
		setModalVisible(prevState => !prevState);
	}, []);

	const deleteLease = useCallback(async (leaseId: number | undefined) => {
		if (_.isUndefined(leaseId) || _.isNull(leaseContext) || _.isNull(userContext)) return;
		await leaseContext.deleteLease(leaseId, userContext.Tenants);
	}, [leaseContext, userContext]);

	const searchOptions = {
		keys: ["TenantName"],
		threshold: 0.3,
	};


	const fuse = new Fuse(leaseContext!.SelectedPropertyLeases, searchOptions);
	const results = useMemo(() => {
		if (_.isNull(leaseContext)) return;
		return !_.isEmpty(searchQuery)
			? fuse.search(searchQuery).map(result => result.item)
			: leaseContext.SelectedPropertyLeases;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fuse, leaseContext?.SelectedPropertyLeases]);

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
								tenant={userContext?.Tenants.find((tenant)=>tenant.LeaseId === item.LeaseId)}
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
