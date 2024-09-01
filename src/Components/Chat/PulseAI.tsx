import {useState, useCallback} from "react";
import {SafeAreaView, StyleSheet, View, Text,  LogBox} from "react-native";
import {GiftedChat, IMessage} from "react-native-gifted-chat";
import MessageInputBar from "@src/Components/Chat/MessageInputBar";
import {observer} from "mobx-react-lite";
import { useAuthContext } from "@src/Contexts/AuthContext";
import { useApiClientContext } from "../../Contexts/PulseApiClientContext";

//temp solution
LogBox.ignoreLogs(["Warning: Avatar: Support for defaultProps"]);

function PulseAI() {
	const authContext = useAuthContext();
	const apiClientContext = useApiClientContext();
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [isTyping, setIsTyping] = useState(false);

	const onSend = useCallback(async (newMessages:IMessage[]) => {
		setMessages(previousMessages =>
			GiftedChat.append(previousMessages, newMessages),
		);
		const userMessage = newMessages[0].text;
		setIsTyping(true);
		const responseText = await apiClientContext.pulseAiChatService.generateChatResponse(userMessage);
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
	}, [apiClientContext.pulseAiChatService]);

	return (
		<SafeAreaView style={styles.container}>
			<View style = {styles.headerContainer}>
				<View style={styles.textContainer}>
					<Text style = {styles.pulseText}>Pulse AI</Text>
					<Text style={styles.llamaText}>Powered by Llama3</Text>
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


export default observer(PulseAI);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		height:500
	},
	headerContainer: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		margin: 10,
	},
	pulseImage:{
		height: 45,
		width: 45,
		borderRadius: 15
	},
	pulseText:{
		fontWeight: "bold",
		marginHorizontal: 10,
		fontSize: 30,
		color: "white",
	},
	llamaText:{
		marginHorizontal: 10,
		fontSize: 12,
		color:"lightgray"
	},
	textContainer:{
		flexDirection: "column",
	},
});
