import {useCallback} from "react";
import _ from "lodash";
import {useAuthContext} from "../Contexts/AuthContext";
import { useApiClientContext } from "../Contexts/PulseApiClientContext";
import {useChatContext} from "@src/Contexts/ChatContext";

export default function useFetchChatMessages() {
	const authContext = useAuthContext();
	const chatContext = useChatContext();
	const apiClientContext = useApiClientContext();

	const fetchMessages = useCallback(async (chatId:number) => {
		const chat = chatContext.findChat(chatId);
		if (_.isUndefined(chat)) return;


		const messages = await apiClientContext.chatService.getMessages(chatId);
		if (_.isUndefined(messages)) return;

		chat.messages = messages;

		/* eslint-disable react-hooks/exhaustive-deps */
	}, [authContext.isLoggedIn]);
}
