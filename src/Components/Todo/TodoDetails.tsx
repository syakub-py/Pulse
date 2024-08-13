import {observer} from "mobx-react-lite";
import Layout from "../Layout";
import Header from "../Header";
import {View, StyleSheet, Text, ScrollView, Pressable} from "react-native";
import BackButton from "../BackButton";
import {RouteProp} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import {useAuthContext} from "../../Contexts/AuthContext";


type TodoDetailsScreenRouteProp = RouteProp<RootStackParamList, "TodoDetails">;

interface Props {
	route: TodoDetailsScreenRouteProp;
}

function TodoDetails({route}:Props){
	const {todo} = route.params;
	const authContext = useAuthContext();
	return(
		<Layout>
			<View style={[styles.headerContainer, styles.header]}>
				<View style={styles.header}>
					<BackButton />
					<Header title="Todo Details" />
				</View>
				<View>
					{
						(authContext.username !== todo.AddedBy)?null:(
							<Pressable>
								<Ionicons name={"pencil-outline"} size={25} color="white"/>
							</Pressable>
						)
					}
				</View>
			</View>
			<ScrollView contentContainerStyle={styles.content}>
				<Text style={styles.title}>{todo.Title}</Text>
				<Text style={styles.description}>{todo.Description}</Text>
				<View style={styles.infoRow}>
					<Text style={styles.label}>Status:</Text>
					<Text style={styles.value}>{todo.Status}</Text>
				</View>
				<View style={styles.infoRow}>
					<Text style={styles.label}>Priority:</Text>
					<Text style={styles.value}>{todo.Priority}</Text>
				</View>
				<Text style={styles.addedBy}>Added by: {todo.AddedBy}</Text>
			</ScrollView>
		</Layout>
	);
}

export default observer(TodoDetails);

const styles = StyleSheet.create({
	headerContainer: {
		justifyContent:"space-between"
	},
	header:{
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
});


