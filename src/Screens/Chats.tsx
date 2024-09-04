import {observer} from "mobx-react-lite";
import Layout from "@src/Components/Layout";
import Header from "@src/Components/Header";
import {useChatContext} from "@src/Contexts/ChatContext";
import {FlatList} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import _ from "lodash";
import ChatTile from "@src/Components/Chat/ChatTile";

function Chats(){
	const chatContext = useChatContext();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Chats">>();
	if (_.isNull(chatContext)) return;
	return(
		<Layout>
			<Header title={"Chats"}/>
			<FlatList data={chatContext.chats}
					  renderItem={({item, index}) => (
						  <ChatTile chat={item} onPress={()=>console.log(item.chatId)}/>
					  )}/>
		</Layout>
	);
}


export default observer(Chats);
