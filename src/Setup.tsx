import MainStack from "./MainStack";
import useGetAllDataFromStorage from "./Hooks/useGetAllDataFromStorage";
import useCreateChatIfDoesntExist from "./Hooks/useCreateChatIfDoesntExist";
import useFetchPulseAiChatMessages from "./Hooks/useFetchPulseAiChatMessages";
import {observer} from "mobx-react-lite";
import useFetchProperties from "./Hooks/useFetchProperties";
import useGetLeasesAndTenants from "./Hooks/useGetLeasesAndTenants";
import useFetchTodos from "./Hooks/useFetchTodos";

function Setup() {
	useGetAllDataFromStorage();
	useCreateChatIfDoesntExist();
	useFetchPulseAiChatMessages();
	useFetchProperties();
	useFetchTodos();
	useGetLeasesAndTenants();
	return <MainStack />;
}

export default observer(Setup);
