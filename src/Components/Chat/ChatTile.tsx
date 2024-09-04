import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

interface Props {
	chat: Chat;
	onPress: () => void;
}

function ChatTile({ chat, onPress }: Props) {
	const { chatId, LastMessage, OtherUserDetails } = chat;
	return (
		<TouchableOpacity style={styles.container} onPress={() => onPress()}>
			<Image
				source={{ uri: "https://via.placeholder.com/50" }}
				style={styles.avatar}
			/>
			<View style={styles.textContainer}>
				<Text style={styles.name}>{OtherUserDetails.Name}</Text>
				<Text style={styles.lastMessage} numberOfLines={1}>
					{LastMessage || "No messages yet"}
				</Text>
			</View>
		</TouchableOpacity>
	);
}

export default ChatTile;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		backgroundColor: "#333",
		borderBottomWidth: 1,
		marginHorizontal: 10,
		borderRadius:10
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 25,
		marginRight: 10,
	},
	textContainer: {
		flex: 1,
	},
	name: {
		fontSize: 16,
		fontWeight: "bold",
		color: "white",
	},
	lastMessage: {
		fontSize: 14,
		color: "white",
		marginTop: 2,
	},
});
