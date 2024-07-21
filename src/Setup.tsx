import MainStack from "./MainStack";
import useGetAllDataFromStorage from "./Hooks/useGetAllDataFromStorage";
import useFetchChat from "./Hooks/useFetchChat";

export default function Setup() {
	useGetAllDataFromStorage();

	return <MainStack />;
}

