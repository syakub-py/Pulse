import { useState, useCallback, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text, LogBox, ActivityIndicator } from "react-native"; // Add ActivityIndicator for loading
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import MessageInputBar from "@src/Components/Chat/MessageInputBar";
import { observer } from "mobx-react-lite";
import { useAuthContext } from "@src/Contexts/AuthContext";
import { useApiClientContext } from "@src/Contexts/PulseApiClientContext";
import BackButton from "@src/Components/BackButton";
import { RouteProp } from "@react-navigation/native";
import _ from "lodash";
import { useChatContext } from "@src/Contexts/ChatContext";

// Temp solution to ignore logs
LogBox.ignoreLogs(["Warning: Avatar: Support for defaultProps"]);

type ChatBoxScreenRouteProp = RouteProp<RootStackParamList, "ChatBox">;

interface Props {
	route: ChatBoxScreenRouteProp;
}

function ChatBox(props: Props) {
	const selectedChat = props.route.params.selectedChat;
	const authContext = useAuthContext();
	const chatContext = useChatContext();
	const apiClientContext = useApiClientContext();

	const [messages, setMessages] = useState<IMessage[]>([]);
	const [isTyping, setIsTyping] = useState(false);
	const [loading, setLoading] = useState(true);

	const fetchMessages = useCallback(async (chat: Chat) => {
		if (_.isNull(chatContext)) return;
		try {
			const fetchedMessages = await apiClientContext.chatService.getMessages(chat.chatId);
			if (_.isUndefined(fetchedMessages)) return;

			fetchedMessages.forEach(item => {
				item.user._id = item.user.name === authContext.username ? 1 : 0;
			});
			const sortedMessages = fetchedMessages.sort((a, b) =>
				new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
			);
			console.log(sortedMessages);
			chat.Messages = sortedMessages;
			setMessages(sortedMessages);
		} catch (error) {
			console.error("Error fetching messages:", error);
		} finally {
			setLoading(false);
		}
	}, [apiClientContext.chatService, chatContext]);

	useEffect(() => {
		fetchMessages(selectedChat);
	}, [selectedChat, fetchMessages]);

	const onSend = useCallback(async (newMessages: IMessage[]) => {
		setMessages(previousMessages =>
			GiftedChat.append(previousMessages, newMessages),
		);
		const userMessage = newMessages[0].text;
		if (selectedChat.OtherUserDetails.Name === "Pulse AI") {
			setIsTyping(true);
			const responseText = await apiClientContext.pulseAiChatService.generateChatResponse(userMessage, selectedChat.chatId, authContext.postgres_uid);
			const responseMessage = {
				_id: Math.floor(Math.random() * 1000000),
				text: responseText,
				createdAt: new Date(),
				user: {
					_id: 2,
					name: "Assistant",
				},
			};
			setIsTyping(false);
			setMessages(previousMessages => GiftedChat.append(previousMessages, [responseMessage]));
		}
	}, [apiClientContext.pulseAiChatService]);

	if (loading) {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="white" />
					<Text style={styles.loadingText}>Loading messages...</Text>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.headerContainer}>
				<BackButton />
				<View style={styles.textContainer}>
					<Text style={styles.pulseText}>{selectedChat.OtherUserDetails.Name}</Text>
				</View>
			</View>
			<GiftedChat
				messages={messages}
				onSend={messages => onSend(messages)}
				alwaysShowSend
				scrollToBottom
				user={{
					_id: 1,
					name: authContext.username,
				}}
				showUserAvatar={false}
				isTyping={isTyping}
				renderInputToolbar={(props) => <MessageInputBar {...props} />}
				listViewProps={{
					style: { marginBottom: "7%" },
				}}
				renderAvatar={() => null}
				renderAvatarOnTop={false}
			/>
		</SafeAreaView>
	);
}

export default observer(ChatBox);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		height: 500,
	},
	headerContainer: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		margin: 10,
	},
	pulseImage: {
		height: 45,
		width: 45,
		borderRadius: 15,
	},
	pulseText: {
		fontWeight: "bold",
		marginHorizontal: 10,
		fontSize: 30,
		color: "white",
	},
	llamaText: {
		marginHorizontal: 10,
		fontSize: 12,
		color: "lightgray",
	},
	textContainer: {
		flexDirection: "column",
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	loadingText: {
		marginTop: 10,
		color: "white",
		fontSize: 18,
	},
});
