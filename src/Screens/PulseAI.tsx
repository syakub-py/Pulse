import Layout from "../Components/Layout";
import {GiftedChat, IMessage} from "react-native-gifted-chat";


export default function PulseAI() {
	const messages: IMessage[] | undefined = [];
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
