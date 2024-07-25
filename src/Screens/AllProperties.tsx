import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {AppContext} from "../Contexts/AppContext";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import PropertyCard from "../Components/PropertyCard";
import {SwipeListView} from "react-native-swipe-list-view";
import {Pressable} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function AllProperties() {
	const appContext = useContext(AppContext);

	const handleDeleteProperty = (propertyId:number) => {
		appContext.deleteHome(propertyId);
	};

	return(
		<Layout>
			<Header title={"Your Properties"} />
			<SwipeListView
				data={appContext.Properties}
				rightOpenValue={-50}
				renderHiddenItem={({ item }) => (
					<Pressable
						style={{
							position: "absolute",
							flexDirection: "row",
							top: 0,
							right: 0,
							bottom: 0,
							width: 70,
							alignItems: "center",
							justifyContent: "center",
						}} onPress={()=>handleDeleteProperty(item.PropertyId)}>
						<Ionicons name={"trash-outline"} size={24} color={"red"} />
					</Pressable>
				)}
				renderItem={({ item }) => (
					<PropertyCard property={item} />
				)}
			/>
		</Layout>
	);
}


export default observer(AllProperties);
