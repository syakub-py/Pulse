import {observer} from "mobx-react-lite";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Alert, Pressable, StyleSheet, ViewStyle} from "react-native";

interface Props{
	onPress?:() => void;
	style?: ViewStyle;
}

function TrashButton(props:Props) {

	const confirmDelete = () => {
		Alert.alert(
			"Confirm Deletion",
			"Are you sure you want to delete this item?",
			[
				{
					text: "Cancel",
					style: "cancel"
				},
				{
					text: "Delete",
					onPress: props.onPress,
					style: "destructive"
				}
			],
			{ cancelable: true }
		);
	};

	return (
		<Pressable
			style={props.style || styles.trashButton}
			onPress={confirmDelete}>
			<Ionicons name={"trash-outline"} size={24} color={"red"} />
		</Pressable>
	);
}

export default observer(TrashButton);

const styles = StyleSheet.create({
	trashButton: {
		position: "absolute",
		flexDirection: "row",
		top: 0,
		right: 0,
		bottom: 0,
		width: 70,
		alignItems: "center",
		justifyContent: "center",
	},
});
