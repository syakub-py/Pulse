import {useContext} from "react";
import {AuthContext} from "../Contexts/AuthContext";

export default async function useGetAuthDataFromAsyncStorage(){
	const authContext = useContext(AuthContext);

	return await authContext.getAuthDataFromStorage();
}

