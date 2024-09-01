import {observer} from "mobx-react-lite";
import {useCallback} from "react";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import PropertyCard from "../Components/AllProperties/PropertyCard";
import {SwipeListView} from "react-native-swipe-list-view";
import { View, StyleSheet} from "react-native";
import BackButton from "../Components/BackButton";
import TrashButton from "../Components/TrashButton";
import _ from "lodash";
import {usePropertyContext} from "@src/Contexts/PropertyContext";
import {useLeaseContext} from "@src/Contexts/LeaseContext";

function AllProperties() {
	const propertyContext = usePropertyContext();
	const leaseContext = useLeaseContext();

	const handleDeleteProperty = useCallback(async (propertyId?:number) => {
		if (_.isUndefined(propertyId) || _.isNull(propertyContext) || _.isNull(leaseContext)) return;
		await propertyContext.deleteProperty(propertyId, leaseContext.SelectedPropertyLeases);
	}, [propertyContext]);

	return(
		<Layout>
			<View style={styles.header}>
				<BackButton/>
				<Header title={"Your Properties"} />
			</View>
			<SwipeListView
				data={propertyContext?.Properties}
				rightOpenValue={-50}
				renderHiddenItem={({ item, index }) => {
					if (propertyContext?.Properties[index].isCurrentUserTenant) return null;
					return (
						<TrashButton onPress={() => handleDeleteProperty(item.PropertyId)} />
					);
				}}
				renderItem={({ item }) => (
					<PropertyCard property={item} />
				)}
			/>
		</Layout>
	);
}

export default observer(AllProperties);

const styles = StyleSheet.create({
	header:{
		flexDirection: "row",
		alignItems: "center",
	}
});
