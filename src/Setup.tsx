import MainStack from "./MainStack";
import useGetAllDataFromStorage from "./Hooks/useGetAllDataFromStorage";
import {observer} from "mobx-react-lite";
import useFetchProperties from "./Hooks/useFetchProperties";
import useGetLeasesAndTenants from "./Hooks/useGetLeasesAndTenants";
import useFetchTodos from "./Hooks/useFetchTodos";
import useFetchChats from "@src/Hooks/useFetchChats";
import useWebSocketSetup from "@src/Hooks/useWebSocketSetup";

function Setup() {
	useGetAllDataFromStorage();
	useFetchProperties();
	useFetchChats();
	useFetchTodos();
	useWebSocketSetup();
	useGetLeasesAndTenants();
	return <MainStack />;
}

export default observer(Setup);
