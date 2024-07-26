import {useContext, useEffect, useCallback} from "react";
import AsyncStorageClass from "../Classes/AsyncStorage";
import DataService from "../Utils/DataService";
import {AppContext} from "../Contexts/AppContext";
import _ from "lodash";


export default function useFetchChatMessages() {
	const appContext = useContext(AppContext);
	const fetchMessages = useCallback(async () => {
		const chatId = await AsyncStorageClass.getDataFromStorage("chatId");
		if (chatId) {
			const messages = await DataService.getMessages(chatId);
			if (!_.isUndefined(messages)) {
				appContext.Messages = messages;
			}
		}
	}, []);

	useEffect(() => {
		void fetchMessages();
	}, [fetchMessages]);
}

