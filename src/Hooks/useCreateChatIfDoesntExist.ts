import {useContext, useEffect} from "react";
import AsyncStorageClass from "../Classes/AsyncStorage";
import DataService from "../Utils/DataService";
import _ from "lodash";
import {AuthContext} from "../Contexts/AuthContext";

export default function useCreateChatIfDoesntExist() {
	const authContext = useContext(AuthContext);
	useEffect(() => {
		const initializeChat = async () => {
			try {
				const chatId = await AsyncStorageClass.getDataFromStorage("chatId");
				if (_.isUndefined(chatId) && authContext.uid) {
					await DataService.createChat(authContext.uid);
				}
			}catch(e){
				console.error(e);
			}
		};
		void initializeChat();
	}, [authContext.isLoggedIn]);
}
