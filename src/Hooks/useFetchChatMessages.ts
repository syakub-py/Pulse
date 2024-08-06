import {useEffect, useCallback} from "react";
import AsyncStorageClass from "../Classes/AsyncStorage";
import DataService from "../Utils/DataService";
import {useAppContext} from "../Contexts/AppContext";
import _ from "lodash";
import {useAuthContext} from "../Contexts/AuthContext";

export default function useFetchChatMessages() {
	const appContext = useAppContext();
	const authContext = useAuthContext();

	const fetchMessages = useCallback(async () => {
		const chatId = await AsyncStorageClass.getDataFromStorage("chatId");
		if (_.isUndefined(chatId)) return;

		const messages = await DataService.getMessages(chatId);

		if (_.isUndefined(messages)) return;
		appContext.setMessages(messages);
	}, [authContext.isLoggedIn]);

	useEffect(() => {
		void fetchMessages();
	}, [fetchMessages]);
}
