import React, {useState, useCallback, useContext, useEffect} from "react";
import {SafeAreaView, StyleSheet, View, Image, Text} from "react-native";
import {GiftedChat, IMessage} from "react-native-gifted-chat";
import DataService from "../Utils/DataService";
import {AuthContext} from "../Contexts/AuthContext";
import AsyncStorageClass from "../Classes/AsyncStorage";
import MessageInputBar from "../Components/MessageInputBar";

export default function PulseAI() {
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [isTyping, setIsTyping] = useState(false);
	const authContext = useContext(AuthContext);

	useEffect(() => {
		const fetchMessages = async ()=>{
			const chatId = await AsyncStorageClass.getDataFromStorage("chatId");
			if (chatId){
				return await DataService.getMessages(chatId);
			}
			return [];
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
			<View style = {styles.headerContainer}>
				<Image style = {styles.pulseImage} source = {require("../../assets/icon.png")}/>
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
				inverted={false}
				user={{
					_id: 1,
					name: authContext.username,
					avatar:authContext.profilePicture
				}}
				showUserAvatar={true}
				isTyping={isTyping}
				renderInputToolbar = {(props)=><MessageInputBar {...props} />}
				listViewProps={{
					style: { marginBottom: "16%"},
				}}
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
	headerContainer: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center"
	},
	pulseImage:{
		height: 45,
		width: 45,
		borderRadius: 15
	},
	pulseText:{
		fontWeight: "bold",
		marginHorizontal: 10,
		fontSize: 16
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
