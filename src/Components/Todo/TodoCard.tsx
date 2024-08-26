import React, {useMemo} from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Props {
	todo: Todo;
}

export default function TodoCard(props: Props) {
	const { todo } = props;

	const getPriorityColor = (priority:string) => {
		switch (priority) {
		case "Low":
			return "green";
		case "Medium":
			return "yellow";
		case "High":
			return "darkorange";
		case "Emergency":
			return "darkred";
		default:
			return "transparent";
		}
	};
	const priorityColor = useMemo(() => getPriorityColor(todo.Priority), [todo.Priority]);

	return (
		<View style={styles.card}>
			<View style={styles.titleRow}>
				<Text style={styles.title}>{todo.Title}</Text>
				<View
					style={[
						styles.priorityView,
						{
							backgroundColor: priorityColor,
						},
					]}
				/>
			</View>
			<Text style={styles.description} numberOfLines={3}>
				{todo.Description}
			</Text>
			<Text style={styles.addedBy}>Added by: {todo.AddedBy}</Text>
			<View style={styles.statusContainer}>
				<Ionicons
					name={todo.Status === "Seen" ? "eye-outline" : "eye-off-outline"}
					size={20}
					color={"white"}
				/>
			</View>
		</View>
	);
}



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
		position: "relative",
	},
	titleRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent:"space-between",
		marginBottom: 8,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#ffffff",
		marginRight: 10,
	},
	description: {
		fontSize: 16,
		color: "#d1d1d6",
		marginBottom: 10,
	},
	priorityView: {
		width: 12,
		height: 12,
		borderRadius: 6,
	},
	addedBy: {
		marginTop: 12,
		fontSize: 13,
		color: "#9e9e9e",
	},
	statusContainer: {
		position: "absolute",
		bottom: 15,
		right: 15,
	},
});
