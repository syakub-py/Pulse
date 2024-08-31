import {useEffect, useCallback} from "react";
import AsyncStorageClass from "../Classes/AsyncStorage";
import _ from "lodash";
import {useAuthContext} from "../Contexts/AuthContext";
import { useApiClientContext } from "../Contexts/PulseApiClientContext";

export default function useFetchChatMessages() {
	const authContext = useAuthContext();
	const apiClientContext = useApiClientContext();

	const fetchMessages = useCallback(async () => {
		const chatId = await AsyncStorageClass.getDataFromStorage("chatId");
		if (_.isUndefined(chatId)) return;

		const messages = await apiClientContext.chatService.getMessages(chatId);

		if (_.isUndefined(messages)) return;
		/* eslint-disable react-hooks/exhaustive-deps */
	}, [authContext.isLoggedIn]);

	useEffect(() => {
		void fetchMessages();
	}, [fetchMessages]);
}
