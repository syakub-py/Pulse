import MainStack from "./MainStack";
import useGetAllDataFromStorage from "./Hooks/useGetAllDataFromStorage";
import useCreateChatIfDoesntExist from "./Hooks/useCreateChatIfDoesntExist";
import useFetchChatMessages from "./Hooks/useFetchChatMessages";

export default function Setup() {
	useGetAllDataFromStorage();
	useCreateChatIfDoesntExist();
	useFetchChatMessages();
	return <MainStack />;
}

