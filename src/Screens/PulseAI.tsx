import Layout from "../Components/Layout";
import {GiftedChat} from "react-native-gifted-chat";
import {useState} from "react";


export default function PulseAI(){
	const [messages, setMessages] = useState([]);

	return (
		<Layout>
			<GiftedChat
				messages={messages}
				messagesContainerStyle={{zIndex:1}}
				user={{
					_id: 1,
				}}
			/>
		</Layout>
	);
}
