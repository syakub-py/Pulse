import { useCallback } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Alert, Pressable, StyleSheet, ViewStyle } from "react-native";

interface Props {
	onPress?: () => void;
	style?: ViewStyle;
}

export default function TrashButton({ onPress, style }: Props) {
	const confirmDelete = useCallback(() => {
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
					onPress: onPress,
					style: "destructive"
				}
			],
			{ cancelable: true }
		);
	}, [onPress]);

	return (
		<Pressable
			style={style || styles.trashButton}
			onPress={confirmDelete}>
			<Ionicons name={"trash-outline"} size={24} color={"red"} />
		</Pressable>
	);
}



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
