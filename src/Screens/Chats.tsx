import {observer} from "mobx-react-lite";
import Layout from "@src/Components/Layout";
import Header from "@src/Components/Header";
import {useChatContext} from "@src/Contexts/ChatContext";
import {FlatList, View} from "react-native";

function Chats(){
	const chatContext = useChatContext();

	return(
		<Layout>
			<Header title={"Chats"}/>
			<FlatList data={chatContext.chats}
					  renderItem={({item, index}) => (
						  <View></View>
					  )}/>
		</Layout>
	);
}


export default observer(Chats);
