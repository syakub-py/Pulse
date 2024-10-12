import {observer} from "mobx-react-lite";
import Layout from "@src/Components/GlobalComponents/Layout";
import Header from "@src/Components/GlobalComponents/Header";
import {useChatContext} from "@src/Contexts/ChatContext";
import {FlatList} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import _ from "lodash";
import ChatTile from "@src/Components/Chat/ChatTile";
import {useEffect} from "react";

function Chats(){
	const chatContext = useChatContext();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Chats">>();

	if (!chatContext) return null;

	return(
		<Layout>
			<Header title={"Chats"}/>
			<FlatList data={chatContext.chats}
					  renderItem={({item, index}) => (
						  <ChatTile chat={item} onPress={()=>navigation.navigate("ChatBox", {selectedChat:item})}/>
					  )}/>
		</Layout>
	);
}


export default observer(Chats);
