import {useCallback} from "react";
import _ from "lodash";
import {useAuthContext} from "../Contexts/AuthContext";
import {useApiClientContext} from "../Contexts/PulseApiClientContext";
import {useChatContext} from "@src/Contexts/ChatContext";

export default function useFetchChatMessages() {
	const authContext = useAuthContext();
	const chatContext = useChatContext();
	const apiClientContext = useApiClientContext();

	return useCallback(async (chat: Chat) => {
		if (_.isNull(chatContext)) return;
		try {
			const fetchedMessages = await apiClientContext.chatService.getMessages(chat.chatId);
			if (_.isUndefined(fetchedMessages)) return;

			fetchedMessages.forEach(item => {
				item.user._id = item.user.name === authContext.username ? 1 : 0;
			});

			chat.Messages = fetchedMessages.sort((a, b) =>
				new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
			);
		} catch (error) {
			console.error("Error fetching messages:", error);
		}
	}, [apiClientContext.chatService, authContext.username, chatContext]);
}
