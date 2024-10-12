import { useState, useCallback, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text, LogBox } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import MessageInputBar from "@src/Components/Chat/MessageInputBar";
import { observer } from "mobx-react-lite";
import { useAuthContext } from "@src/Contexts/AuthContext";
import { useApiClientContext } from "@src/Contexts/PulseApiClientContext";
import BackButton from "@src/Components/GlobalComponents/BackButton";
import { RouteProp } from "@react-navigation/native";
import _ from "lodash";
import { useChatContext } from "@src/Contexts/ChatContext";
import useFetchChatMessages from "@src/Hooks/useFetchChatMessages";
import MessagesLoading from "@src/Components/Chat/MessagesLoading";

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
	const fetchChatMessages = useFetchChatMessages();
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [isTyping, setIsTyping] = useState(false);
	const [loading, setLoading] = useState(true);
	const [webSocket, setWebSocket] = useState<WebSocket | null>(null); // Store WebSocket in state

	useEffect(() => {
		const initChat = async () => {
			setLoading(true);

			await fetchChatMessages(selectedChat);

			setMessages(selectedChat.Messages);
			setLoading(false);

			if (_.isNull(chatContext) || _.isUndefined(selectedChat.OtherUserDetails.id) || selectedChat.OtherUserDetails.Name === "Pulse AI") return;
			const ws = new WebSocket(`ws://127.0.0.1:8000/ws/?senderUserToken=${authContext.postgres_uid}&receiverUserToken=${selectedChat.OtherUserDetails.id}`);

			ws.onopen = () => {
				console.info("WebSocket connection established.");
			};

			ws.onmessage = (event) => {
				const messageData = JSON.parse(event.data) as IMessage;
				setMessages((prevMessages) => GiftedChat.append(prevMessages, [messageData]));
				const selectedChatInContext = chatContext.chats.find((chat)=>selectedChat.chatId = chat.chatId);
				if (_.isUndefined(selectedChatInContext)) return;
				selectedChatInContext.LastMessage = messageData.text;
			};

			ws.onclose = () => {
				console.info("WebSocket connection closed");
			};

			ws.onerror = (error) => {
				console.error("WebSocket error:", error);
			};

			setWebSocket(ws);

			return () => {
				ws.close();
			};
		};
		void initChat();
	}, [selectedChat, chatContext, authContext, fetchChatMessages]);

	const onSend = useCallback(async (newMessages: IMessage[]) => {
		setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
		const userMessage = newMessages[0];

		if (selectedChat.OtherUserDetails.Name === "Pulse AI") {
			setIsTyping(true);
			const responseText = await apiClientContext.pulseAiChatService.generateChatResponse(userMessage.text, selectedChat.chatId, authContext.postgres_uid);
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
		} else {
			if (webSocket && webSocket.readyState === WebSocket.OPEN) {
				userMessage.createdAt = new Date();
				webSocket.send(JSON.stringify({
					chat_id: selectedChat.chatId,
					details: userMessage,
				}));
			} else {
				console.error("WebSocket connection not established.");
			}
		}
	}, [apiClientContext.pulseAiChatService, authContext, selectedChat, webSocket]);

	if (loading) {
		return <MessagesLoading/>;
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
				inverted={false}
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
	pulseText: {
		fontWeight: "bold",
		marginHorizontal: 10,
		fontSize: 30,
		color: "white",
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
