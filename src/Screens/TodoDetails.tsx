import React, { useCallback, useEffect, useState } from "react";
import {View, StyleSheet, Text, Pressable, ScrollView, ActivityIndicator} from "react-native";
import { observer } from "mobx-react-lite";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import BackButton from "../Components/BackButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import TrashButton from "../Components/TrashButton";
import { useAuthContext } from "../Contexts/AuthContext";
import { useAppContext } from "../Contexts/AppContext";
import _ from "lodash";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import RecommendationsCard from "@src/Components/Todo/RecommendationsCard";
import SubHeader from "@src/Components/Analytics/SubHeader";
import FloatingActionButton from "@src/Components/FloatingActionButton";

type TodoDetailsScreenRouteProp = RouteProp<RootStackParamList, "TodoDetails">;

interface Props {
	route: TodoDetailsScreenRouteProp;
}

function TodoDetails({ route }: Props) {
	const { todo } = route.params;
	const authContext = useAuthContext();
	const appContext = useAppContext();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "TodoDetails">>();
	const [recommendations, setRecommendations] = useState<GoogleMapsPlaceResponse[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const fetchRecommendations = useCallback(async () => {
		setIsLoading(true);
		if (_.isUndefined(todo.id)) return;
		try {
			const response = await appContext.getRecommendations(todo.id);
			const fetchedRecommendations = JSON.parse(response.toString()) as GoogleMapsPlaceResponse[];
			setRecommendations(fetchedRecommendations);
		} catch (error) {
			console.error("Error fetching recommendations:", error);
			setRecommendations([]);
		}
		setIsLoading(false);
	}, [todo.id, appContext]);


	useEffect(() => {
		void fetchRecommendations();
	}, [fetchRecommendations]);

	const handleDeleteTodo = async () => {
		if (_.isNil(todo.id)) {
			alert("Todo ID was empty");
			return;
		}
		await appContext.deleteTodo(todo.id);
		navigation.goBack();
	};

	return (
		<Layout>
			<ScrollView contentContainerStyle={styles.content}>
				<View style={styles.header}>
					<BackButton />
					<Header title={todo.Title} />
				</View>

				<Text style={styles.description}>{todo.Description}</Text>
				<View style={styles.infoRow}>
					<Text style={styles.label}>Status:</Text>
					<Text style={styles.value}>{todo.Status}</Text>
				</View>
				<View style={styles.infoRow}>
					<Text style={styles.label}>Priority:</Text>
					<Text style={styles.value}>{todo.Priority}</Text>
				</View>
				<SubHeader title={"Recommendations based on description"} />
				{!isLoading ? (
					recommendations.map((item) => (
						<RecommendationsCard recommendation={item} key={item.name}/>
					))
				) : (
					<ActivityIndicator size="small" color="white"/>
				)}
				<Text style={styles.addedBy}>Added by: {todo.AddedBy}</Text>

			</ScrollView>
			<TrashButton onPress={handleDeleteTodo} style={styles.deleteFab}/>
			{authContext.username === todo.AddedBy && (
				<Pressable style={styles.editFab}>
					<Ionicons name="pencil-outline" size={25} color="white" />
				</Pressable>
			)}
		</Layout>
	);
}

export default observer(TodoDetails);

const styles = StyleSheet.create({
	headerContainer: {
		justifyContent: "space-between",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
	},
	content: {
		padding: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
		marginBottom: 16,
	},
	description: {
		fontSize: 16,
		color: "#ccc",
		marginBottom: 24,
	},
	infoRow: {
		flexDirection: "row",
		marginBottom: 8,
	},
	label: {
		fontSize: 16,
		fontWeight: "bold",
		color: "white",
		marginRight: 8,
	},
	value: {
		fontSize: 16,
		color: "#ccc",
	},
	addedBy: {
		fontSize: 14,
		color: "#aaa",
		marginTop: 20,
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
	editFab:{
		position: "absolute",
		bottom: 40,
		left: 20,
		backgroundColor: "black",
		padding: 10,
		borderRadius: 30,
		elevation: 5,
	}
});
