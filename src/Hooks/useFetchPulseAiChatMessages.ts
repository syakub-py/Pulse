import {useEffect, useCallback} from "react";
import AsyncStorageClass from "../Classes/AsyncStorage";
import PulseAiChatService from "../Utils/Services/PulseAiChatService";
import {useAppContext} from "../Contexts/AppContext";
import _ from "lodash";
import {useAuthContext} from "../Contexts/AuthContext";

export default function useFetchPulseAiChatMessages() {
	const appContext = useAppContext();
	const authContext = useAuthContext();

	const fetchMessages = useCallback(async () => {
		const chatId = await AsyncStorageClass.getDataFromStorage("chatId");
		if (_.isUndefined(chatId)) return;

		const messages = await PulseAiChatService.getMessages(chatId);

		if (_.isUndefined(messages)) return;
		appContext.setPulseAiMessages(messages);
		/* eslint-disable react-hooks/exhaustive-deps */
	}, [authContext.isLoggedIn]);

	useEffect(() => {
		void fetchMessages();
	}, [fetchMessages]);
}
