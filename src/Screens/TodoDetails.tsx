import React, {useCallback, useEffect, useRef, useState} from "react";
import { StyleSheet, Pressable, FlatList, ViewToken} from "react-native";
import { observer } from "mobx-react-lite";
import Layout from "../Components/GlobalComponents/Layout";
import Ionicons from "react-native-vector-icons/Ionicons";
import TrashButton from "../Components/GlobalComponents/TrashButton";
import { useAuthContext } from "../Contexts/AuthContext";
import _ from "lodash";
import {RouteProp, useNavigation} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import TodoInformation from "@src/Components/Todo/TodoDetails/TodoInformation";
import {useTodoContext} from "@src/Contexts/TodoContext";
import {usePropertyContext} from "@src/Contexts/PropertyContext";

type TodoDetailsScreenRouteProp = RouteProp<RootStackParamList, "TodoDetails">;

interface Props {
	route: TodoDetailsScreenRouteProp;
}

function TodoDetails({ route }: Props) {
	const authContext = useAuthContext();
	const todoContext = useTodoContext();
	const propertyContext = usePropertyContext();
	const {selectedTodoIndex} = route.params;
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "TodoDetails">>();
	const [recommendations, setRecommendations] = useState<GoogleMapsPlaceResponse[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const flatListRef = useRef<FlatList<Todo>>(null);

	const onScrollToIndexFailed = useCallback((info: {
		index: number;
		highestMeasuredFrameIndex: number;
		averageItemLength: number;
	}) => {
		flatListRef.current?.scrollToOffset({
			offset: info.averageItemLength * info.index,
			animated: true,
		});

		setTimeout(() => {
			if (flatListRef.current) {
				flatListRef.current.scrollToIndex({ index: info.index, animated: true });
			}
		}, 100);
	}, [flatListRef]);



	const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken<Todo>[] }) => {
		if (_.isEmpty(viewableItems) || _.isNull(todoContext)) return;
		todoContext.setSelectedPropertyTodo(viewableItems[0].item);
	}, [todoContext]);

	const fetchRecommendations = useCallback(async () => {
		setIsLoading(true);
		if ( _.isNull(propertyContext) || _.isNull(todoContext) || _.isNil(todoContext.SelectedTodo?.id) || _.isNull(propertyContext.SelectedProperty)) return;
		try {
			const response = await todoContext.getRecommendations(todoContext.SelectedTodo.id, propertyContext.SelectedProperty);
			const fetchedRecommendations = response as GoogleMapsPlaceResponse[];
			setRecommendations(fetchedRecommendations);
		} catch (error) {
			console.error("Error fetching recommendations:", error);
			setRecommendations([]);
		}
		setIsLoading(false);
		/*eslint-disable-next-line react-hooks/exhaustive-deps*/
	}, [todoContext?.SelectedTodo]);

	useEffect(() => {
		if (propertyContext?.SelectedProperty?.isCurrentUserTenant) return;
		void fetchRecommendations();
	}, [propertyContext?.SelectedProperty?.isCurrentUserTenant, fetchRecommendations]);

	useEffect(() => {
		if (!flatListRef.current) return;
		flatListRef.current.scrollToIndex({
			index: selectedTodoIndex,
			animated: true,
		});
	}, [selectedTodoIndex]);

	const handleDeleteTodo = useCallback(async () => {
		if (_.isNull(todoContext)) return;
		if ( _.isNil(todoContext.SelectedTodo?.id) ) {
			alert("Todo ID was empty");
			return;
		}

		await todoContext.deleteTodo(todoContext.SelectedTodo.id);
		navigation.goBack();
	}, [todoContext, navigation]);

	return (
		<Layout>
			<FlatList
				data={todoContext?.SelectedPropertyTodos}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				pagingEnabled={true}
				ref={flatListRef}
				onViewableItemsChanged={onViewableItemsChanged}
				renderItem={({item}) => (
					<TodoInformation
						todo={item}
						isLoading={isLoading}
						recommendations={recommendations}
					/>
				)}
				onScrollToIndexFailed={onScrollToIndexFailed}
			/>
			<TrashButton onPress={handleDeleteTodo} style={styles.deleteFab} />
			{authContext.username === todoContext?.SelectedTodo?.AddedBy && (
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
