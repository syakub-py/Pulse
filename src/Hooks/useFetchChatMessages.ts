import {useEffect, useCallback} from "react";
import AsyncStorageClass from "../Classes/AsyncStorage";
import DataService from "../Utils/DataService";
import {useAppContext} from "../Contexts/AppContext";
import _ from "lodash";

export default function useFetchChatMessages() {
	const appContext = useAppContext();
	
	const fetchMessages = useCallback(async () => {
		const chatId = await AsyncStorageClass.getDataFromStorage("chatId");
		if (_.isUndefined(chatId)) return;
		
		const messages = await DataService.getMessages(chatId);

		if (_.isUndefined(messages)) return;
		appContext.setMessages(messages);
	}, [appContext]);

	useEffect(() => {
		void fetchMessages();
	}, [fetchMessages]);
}
