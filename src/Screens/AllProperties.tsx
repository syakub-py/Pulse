import {observer} from "mobx-react-lite";
import {useCallback} from "react";
import {useAppContext} from "../Contexts/AppContext";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import PropertyCard from "../Components/AllProperties/PropertyCard";
import {SwipeListView} from "react-native-swipe-list-view";
import { View, StyleSheet} from "react-native";
import BackButton from "../Components/BackButton";
import TrashButton from "../Components/TrashButton";

function AllProperties() {
	const appContext = useAppContext();

	const handleDeleteProperty = useCallback(async (propertyId:number) => {
		await appContext.deleteProperty(propertyId);
	}, [appContext]);

	return(
		<Layout>
			<View style={styles.header}>
				<BackButton/>
				<Header title={"Your Properties"} />
			</View>
			<SwipeListView
				data={appContext.Properties}
				rightOpenValue={-50}
				renderHiddenItem={({ item, index }) => {
					if (appContext.Properties[index].isTenant) return null;
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
