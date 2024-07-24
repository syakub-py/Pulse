import MainStack from "./MainStack";
import useGetAllDataFromStorage from "./Hooks/useGetAllDataFromStorage";
import useCreateChatIfDoesntExist from "./Hooks/useCreateChatIfDoesntExist";
import useFetchChatMessages from "./Hooks/useFetchChatMessages";
import {observer} from "mobx-react-lite";
import useFetchProperties from "./Hooks/useFetchProperties";

 function Setup() {
	useGetAllDataFromStorage();
	useCreateChatIfDoesntExist();
	useFetchChatMessages();
	useFetchProperties();
	return <MainStack />;
}

export default observer(Setup);

