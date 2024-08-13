import React from "react";
import {View, Text, StyleSheet, Pressable} from "react-native";
import {observer} from "mobx-react-lite";
import {useAuthContext} from "../../Contexts/AuthContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

interface Props{
	todo:Todo
}

function TodoCard(props: Props){
	const {todo} = props;
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Home">>();
	return (
		<Pressable onPress={()=>navigation.navigate("TodoDetails", {todo:todo})}>
			<View style={styles.card}>
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
			</View>
		</Pressable>
	);
}

export default observer(TodoCard);

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#2c2c2e",
		borderRadius: 12,
		padding: 20,
		marginVertical: 10,
		marginHorizontal: 16,
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowRadius: 10,
		shadowOffset: { width: 0, height: 4 },
		elevation: 5,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		color: "#ffffff",
	},
	description: {
		fontSize: 16,
		color: "#d1d1d6",
		marginBottom: 10,
	},
	infoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 6,
		color: "#d1d1d6",
	},
	label: {
		fontWeight: "600",
		color: "#d1d1d6",
	},
	value: {
		fontWeight: "400",
		color: "#ffffff",
	},
	addedBy: {
		marginTop: 12,
		fontSize: 13,
		color: "#9e9e9e",
	},
	header:{
		flexDirection:"row",
		justifyContent: "space-between",
	}
});

