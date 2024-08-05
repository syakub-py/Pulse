import {Dimensions, StyleSheet, Text, View } from "react-native";
import Button from "../Buttons/Button";

interface Props {
	property: Property
}

export default function SingleProperty(props: Props) {
	const { property } = props;

	return (
		<View style={styles.houseTileContainer}>
			<Text style={styles.homeName}>{property.Name}</Text>
			<Text style={styles.homeAddress}>{property.Address}</Text>
			<View style={styles.addTodoContainer}>
				<Text style={styles.todoText}>Property todos</Text>
				<Button
					title={"Add"}
					containerStyle={styles.addTodoButton}
					textStyle={styles.addTodoButtonText}
					iconName={"add"}
				/>
			</View>
		</View>
	);
}

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
