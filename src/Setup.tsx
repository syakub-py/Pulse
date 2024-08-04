import MainStack from "./MainStack";
import useGetAllDataFromStorage from "./Hooks/useGetAllDataFromStorage";
import useCreateChatIfDoesntExist from "./Hooks/useCreateChatIfDoesntExist";
import useFetchChatMessages from "./Hooks/useFetchChatMessages";
import {observer} from "mobx-react-lite";
import useFetchProperties from "./Hooks/useFetchProperties";
import useGetLeases from "./Hooks/useGetLeases";
import useGetTenants from "./Hooks/useGetTenants";

function Setup() {
	useGetAllDataFromStorage();
	useCreateChatIfDoesntExist();
	useFetchChatMessages();
	useFetchProperties();
	useGetLeases();
	useGetTenants();
	return <MainStack />;
}

export default observer(Setup);
