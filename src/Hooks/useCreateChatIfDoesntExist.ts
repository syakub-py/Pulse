import {useCallback, useEffect} from "react";
import AsyncStorageClass from "../Classes/AsyncStorage";
import ChatService from "../Utils/Services/ChatService";
import _ from "lodash";
import {useAuthContext} from "../Contexts/AuthContext";

export default function useCreateChatIfDoesntExist() {
	const authContext = useAuthContext();

	const initializeChat = useCallback(async () => {
		try {
			const chatId = await AsyncStorageClass.getDataFromStorage("chatId");
			if (!_.isUndefined(chatId) || _.isEmpty(authContext.uid)) return;
			await ChatService.createChat(authContext.uid);
		}catch(e){
			console.error(e);
		}
	}, [authContext.uid]);

	useEffect(() => {
		void initializeChat();
	}, [authContext.isLoggedIn, initializeChat]);
}
