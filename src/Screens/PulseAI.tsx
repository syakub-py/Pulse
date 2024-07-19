import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import DataService from "../Utils/DataService";

export default function PulseAI() {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		DataService.generateChatResponse();
		setMessages([]);
	}, []);

	const onSend = useCallback((messages = []) => {
		setMessages(previousMessages =>
			GiftedChat.append(previousMessages, messages),
		);
	}, []);

	return (
		<View style={styles.container}>
			<GiftedChat
				messages={messages}
				// onSend={messages => onSend(messages)}
				user={{
					_id: 1,
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	chat: {
		// Add custom styles for the GiftedChat component if needed
	},
});
