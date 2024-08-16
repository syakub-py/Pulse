import {observer} from "mobx-react-lite";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import {View, StyleSheet, Text, ScrollView, Pressable} from "react-native";
import BackButton from "../Components/BackButton";
import {RouteProp, useNavigation} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import {useAuthContext} from "../Contexts/AuthContext";
import TrashButton from "../Components/TrashButton";
import { useAppContext } from "../Contexts/AppContext";
import _ from "lodash";
import {StackNavigationProp} from "@react-navigation/stack";


type TodoDetailsScreenRouteProp = RouteProp<RootStackParamList, "TodoDetails">;

interface Props {
	route: TodoDetailsScreenRouteProp;
}

function TodoDetails({route}:Props){
	const {todo} = route.params;
	const authContext = useAuthContext();
	const appContext = useAppContext();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "TodoDetails">>();
	const handleDeleteTodo = async () =>{
		if (_.isNil(todo.id)) {
			alert("todo id was empty");
			return;
		}
		await appContext.deleteTodo(todo.id);
		navigation.goBack();
	};

	return(
		<Layout>
			<View style={[styles.headerContainer, styles.header]}>
				<View style={styles.header}>
					<BackButton />
					<Header title="Todo Details"/>
				</View>
				<View>
					<View style={styles.buttonContainer}>
						<TrashButton onPress={() => handleDeleteTodo()} />
						{
							(authContext.username !== todo.AddedBy) ? null : (
								<Pressable>
									<Ionicons name={"pencil-outline"} size={25} color="white"/>
								</Pressable>
							)
						}
					</View>

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
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});


