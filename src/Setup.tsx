import MainStack from "./MainStack";
import useGetAllDataFromStorage from "./Hooks/useGetAllDataFromStorage";

export default function Setup() {
	useGetAllDataFromStorage();

	return <MainStack />;
}

