import {useCallback} from "react";
import {useChatContext} from "@src/Contexts/ChatContext";
import _ from "lodash";

export default function useAddMessageToSelectedChat(): (newMessage: string) => void {
	const chatContext = useChatContext();

	return useCallback((newMessage: string) => {
		if (_.isNull(chatContext) || _.isNull(chatContext.selectedChat)) return;
		console.log(newMessage);
		chatContext.selectedChat.Messages.push(JSON.parse(newMessage));
	}, [chatContext]);
}

