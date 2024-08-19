import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Pressable, FlatList, ViewToken, Dimensions, View, Text } from "react-native";
import { observer } from "mobx-react-lite";
import Layout from "../Components/Layout";
import BackButton from "../Components/BackButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import TrashButton from "../Components/TrashButton";
import { useAuthContext } from "../Contexts/AuthContext";
import { useAppContext } from "../Contexts/AppContext";
import _ from "lodash";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import TodoInformation from "@src/Components/Todo/TodoDetails/TodoInformation";

function TodoDetails() {
	const authContext = useAuthContext();
	const appContext = useAppContext();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "TodoDetails">>();
	const [recommendations, setRecommendations] = useState<GoogleMapsPlaceResponse[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken<Todo>[] }) => {
		if (_.isEmpty(viewableItems)) return;
		appContext.setSelectedPropertyTodo(viewableItems[0].item);
	}, [appContext]);

	const fetchRecommendations = useCallback(async () => {
		setIsLoading(true);
		if (_.isNil(appContext.SelectedTodo?.id)) return;
		try {
			const response = await appContext.getRecommendations(appContext.SelectedTodo.id);
			const fetchedRecommendations = JSON.parse(response.toString()) as GoogleMapsPlaceResponse[];
			setRecommendations(fetchedRecommendations);
		} catch (error) {
			console.error("Error fetching recommendations:", error);
			setRecommendations([]);
		}
		setIsLoading(false);
		/*eslint-disable-next-line react-hooks/exhaustive-deps*/
	}, [appContext.SelectedTodo]);

	useEffect(() => {
		void fetchRecommendations();
	}, [fetchRecommendations]);

	const handleDeleteTodo = async () => {
		if (_.isNil(appContext.SelectedTodo?.id)) {
			alert("Todo ID was empty");
			return;
		}
		await appContext.deleteTodo(appContext.SelectedTodo.id);
		navigation.goBack();
	};

	return (
		<Layout>
			<FlatList
				data={appContext.SelectedPropertyTodos}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				pagingEnabled={true}
				onViewableItemsChanged={onViewableItemsChanged}
				renderItem={({ item }) => (
					<TodoInformation
						todo={item}
						isLoading={isLoading}
						recommendations={recommendations}
					/>
				)}
			/>
			<TrashButton onPress={handleDeleteTodo} style={styles.deleteFab} />
			{authContext.username === appContext.SelectedTodo?.AddedBy && (
				<Pressable style={styles.editFab}>
					<Ionicons name="pencil-outline" size={25} color="white" />
				</Pressable>
			)}
		</Layout>
	);
}

export default observer(TodoDetails);

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		position: "absolute",
		top: 10,
		left: 10,
		zIndex: 1,
	},
	title: {
		marginLeft: 10,
		fontSize: 20,
		fontWeight: "bold",
	},
	deleteFab: {
		position: "absolute",
		bottom: 40,
		right: 20,
		backgroundColor: "black",
		padding: 10,
		borderRadius: 30,
		elevation: 5,
	},
	editFab: {
		position: "absolute",
		bottom: 40,
		left: 20,
		backgroundColor: "black",
		padding: 10,
		borderRadius: 30,
		elevation: 5,
	},
});
