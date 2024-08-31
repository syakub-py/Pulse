import MainStack from "./MainStack";
import useGetAllDataFromStorage from "./Hooks/useGetAllDataFromStorage";
import usePulseCreateChatIfDoesntExist from "./Hooks/usePulseCreateChatIfDoesntExist";
import useFetchChatMessages from "./Hooks/useFetchChatMessages";
import {observer} from "mobx-react-lite";
import useFetchProperties from "./Hooks/useFetchProperties";
import useGetLeasesAndTenants from "./Hooks/useGetLeasesAndTenants";
import useFetchTodos from "./Hooks/useFetchTodos";
import useFetchChats from "@src/Hooks/useFetchChats";

function Setup() {
	useGetAllDataFromStorage();
	useFetchProperties();
	// useFetchChats();
	useFetchTodos();
	useGetLeasesAndTenants();
	return <MainStack />;
}

export default observer(Setup);
