import MainStack from "./MainStack";
import useGetAllDataFromStorage from "./Hooks/useGetAllDataFromStorage";
import useCreateChatIfDoesntExist from "./Hooks/useCreateChatIfDoesntExist";
import useFetchChatMessages from "./Hooks/useFetchChatMessages";
import {observer} from "mobx-react-lite";

 function Setup() {
	useGetAllDataFromStorage();
	useCreateChatIfDoesntExist();
	useFetchChatMessages();
	return <MainStack />;
}

export default observer(Setup);

