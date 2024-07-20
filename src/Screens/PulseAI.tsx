import React, {useState, useCallback, useContext, useEffect} from "react";
import {SafeAreaView, StyleSheet} from "react-native";
import {GiftedChat, IMessage} from "react-native-gifted-chat";
import DataService from "../Utils/DataService";
import {AuthContext} from "../Contexts/AuthContext";

export default function PulseAI() {
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [isTyping, setIsTyping] = useState(false);
	const authContext = useContext(AuthContext);

	useEffect(() => {
		const fetchMessages = async ()=>{
			return await DataService.getMessages(2);
		};
		fetchMessages().then((result)=>{
			setMessages(result);
		});
	}, []);

	const onSend = useCallback(async (newMessages:IMessage[]) => {
		setMessages(previousMessages =>
			GiftedChat.append(previousMessages, newMessages),
		);
		const userMessage = newMessages[0].text;
		setIsTyping(true);
		const responseText = await DataService.generateChatResponse(userMessage);
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
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<GiftedChat
				messages={messages}
				onSend={messages => onSend(messages)}
				user={{_id: 1, name: authContext.username, avatar:authContext.profilePicture}}
				showUserAvatar={true}
				isTyping={isTyping}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		height:500
	},
	chat: {
		// Add custom styles for the GiftedChat component if needed
	},
});
