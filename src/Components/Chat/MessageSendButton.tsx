import { StyleSheet,TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface CustomSendButtonProps {
	onSend: () => void;
}

export default function MessageSendButton({ onSend }: CustomSendButtonProps) {

	return (
		<TouchableOpacity onPress={onSend} style={styles.sendContainer}>
			<Ionicons name="send" size={24} color="#007AFF" />
		</TouchableOpacity>
	);
}

const styles =StyleSheet.create({
	sendContainer: {
		justifyContent: "center",
		alignItems: "center",
		marginRight: 5,
		paddingRight: 10,
		paddingBottom: 5,
	},
});
