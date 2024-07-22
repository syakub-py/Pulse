import MainStack from "./MainStack";
import useGetAllDataFromStorage from "./Hooks/useGetAllDataFromStorage";
import useCreateChatIfDoesntExist from "./Hooks/useCreateChatIfDoesntExist";

export default function Setup() {
	useGetAllDataFromStorage();
	useCreateChatIfDoesntExist();
	return <MainStack />;
}

