import {observer} from "mobx-react-lite";
import Layout from "@src/Components/Layout";
import Header from "@src/Components/Header";
import {useChatContext} from "@src/Contexts/ChatContext";
import {FlatList, View, Text, Button} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

function Chats(){
	const chatContext = useChatContext();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Chats">>();
	return(
		<Layout>
			<Header title={"Chats"}/>
			<Button onPress={()=>navigation.navigate("ChatBot")} title={"Pulse Chat"}/>
			<FlatList data={chatContext.chats}
					  renderItem={({item, index}) => (
						  <View>
							  <Text>{item.otherUserDetails?.Name}</Text>
							  {/*<Text>{item.lastMessage}</Text>*/}
						  </View>
					  )}/>
		</Layout>
	);
}


export default observer(Chats);
