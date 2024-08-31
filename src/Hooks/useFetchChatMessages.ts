import {useEffect, useCallback} from "react";
import AsyncStorageClass from "../Classes/AsyncStorage";
import {useAppContext} from "../Contexts/AppContext";
import _ from "lodash";
import {useAuthContext} from "../Contexts/AuthContext";
import ChatService from "@src/Utils/Services/ChatService";

export default function useFetchChatMessages() {
	const authContext = useAuthContext();

	const fetchMessages = useCallback(async () => {
		const chatId = await AsyncStorageClass.getDataFromStorage("chatId");
		if (_.isUndefined(chatId)) return;

		const messages = await ChatService.getMessages(chatId);

		if (_.isUndefined(messages)) return;
		/* eslint-disable react-hooks/exhaustive-deps */
	}, [authContext.isLoggedIn]);

	useEffect(() => {
		void fetchMessages();
	}, [fetchMessages]);
}
