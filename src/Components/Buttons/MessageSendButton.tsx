import { StyleSheet,TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {observer} from "mobx-react-lite";

interface CustomSendButtonProps {
	onSend: () => void;
}

function MessageSendButton({ onSend }: CustomSendButtonProps) {

	return (
		<TouchableOpacity onPress={onSend} style={styles.sendContainer}>
			<Ionicons name="send" size={24} color="#007AFF" />
		</TouchableOpacity>
	);
}
export default observer(MessageSendButton);
const styles =StyleSheet.create({
	sendContainer: {
		justifyContent: "center",
		alignItems: "center",
		marginRight: 5,
		paddingRight: 10,
		paddingBottom: 5,
	},
});
