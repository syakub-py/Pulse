import {useCallback} from "react";
import _ from "lodash";
import {useAuthContext} from "../Contexts/AuthContext";
import { useApiClientContext } from "../Contexts/PulseApiClientContext";
import {useChatContext} from "@src/Contexts/ChatContext";

export default function useFetchChatMessages() {
	const authContext = useAuthContext();
	const chatContext = useChatContext();
	const apiClientContext = useApiClientContext();

	const fetchMessages = useCallback(async (chat:Chat) => {
		if (_.isNull(chatContext)) return;

		const messages = await apiClientContext.chatService.getMessages(chat.chatId);
		if (_.isUndefined(messages)) return;
		chat.Messages = messages;
		/* eslint-disable react-hooks/exhaustive-deps */
	}, [authContext.isLoggedIn]);
}
