import {ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View} from "react-native";
import Header from "@src/Components/Header";
import SubHeader from "@src/Components/Analytics/SubHeader";
import RecommendationsCard from "@src/Components/Todo/RecommendationsCard";
import React from "react";
import BackButton from "@src/Components/BackButton";

interface Props {
	todo: Todo;
	isLoading:boolean,
	recommendations: GoogleMapsPlaceResponse[]
}

export default function TodoInformation(props: Props) {
	const {todo, isLoading, recommendations} = props;
	return (
		<ScrollView contentContainerStyle={styles.content}>
			<View style={styles.header}>
				<BackButton/>
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
			<SubHeader title={"Professionals in your area: "} />
			{isLoading ? (
				<ActivityIndicator size="small" color="white"/>
			) : (
				recommendations.map((todo) => (
					<RecommendationsCard recommendation={todo} key={todo.name}/>
				))
			)}
			<Text style={styles.addedBy}>Added by: {todo.AddedBy}</Text>

		</ScrollView>
	);
}



const styles = StyleSheet.create({
	headerContainer: {
		justifyContent: "space-between",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
	},
	content: {
		width: Dimensions.get("window").width
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
