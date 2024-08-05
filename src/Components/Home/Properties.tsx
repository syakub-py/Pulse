import { observer } from "mobx-react-lite";
import {Dimensions, FlatList, StyleSheet, Text, View, ViewToken} from "react-native";
import Button from "../Buttons/Button";
import { useCallback } from "react";
import { useAppContext } from "../../Contexts/AppContext";
import _ from "lodash";

function Properties() {
	const appContext = useAppContext();

	const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken<Property>[], changed: ViewToken<Property>[] }) => {
		if (_.isEmpty(viewableItems)) return;
		appContext.setSelectedProperty(viewableItems[0].item);
	}, []);

	return (
		<FlatList
			data={appContext.Properties}
			horizontal={true}
			showsHorizontalScrollIndicator={false}
			pagingEnabled={true}
			onViewableItemsChanged={onViewableItemsChanged}
			viewabilityConfig={{
				itemVisiblePercentThreshold: 50,
			}}
			renderItem={({ item }) => (
				<View style={styles.houseTileContainer}>
					<Text style={styles.homeName}>{item.Name}</Text>
					<Text style={styles.homeAddress}>{item.Address}</Text>
					<View style={styles.addTodoContainer}>
						<Text style={styles.todoText}>Property todos</Text>
						<Button title={"Add"} containerStyle={styles.addTodoButton} textStyle={styles.addTodoButtonText} iconName={"add"}/>
					</View>
				</View>
			)}
		/>
	);
}

export default observer(Properties);

const styles = StyleSheet.create({
	homeAddress: {
		fontSize: 15,
		margin: 15,
		color: "white",
	},
	addTodoContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	todoText: {
		fontSize: 20,
		fontWeight: "bold",
		marginHorizontal: 15,
		color: "white",
	},
	homeName: {
		fontSize: 25,
		fontWeight: "bold",
		marginHorizontal: 15,
		color: "white",
	},
	addTodoButton: {
		justifyContent: "center",
		alignItems: "center",
		height: 40,
		width: 70,
		opacity: 0.7,
		marginHorizontal: 20,
		borderRadius: 20,
		flexDirection: "row",
	},
	addTodoButtonText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "white",
	},
	houseTileContainer: {
		marginVertical:30,
		width:Dimensions.get("window").width,
		height: "100%",
	},
});
