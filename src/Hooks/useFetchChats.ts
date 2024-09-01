import {useAuthContext} from "@src/Contexts/AuthContext";
import {useCallback, useEffect} from "react";
import _ from "lodash";
import { useApiClientContext } from "../Contexts/PulseApiClientContext";
import {useChatContext} from "@src/Contexts/ChatContext";

export default function useFetchChats() {
	const authContext = useAuthContext();
	const chatContext = useChatContext();
	const apiClientContext = useApiClientContext();

	const fetchChats = useCallback(async () => {
		if (_.isUndefined(authContext.uid) || _.isNull(chatContext)) return;

		const chats = await apiClientContext.chatService.getChats(authContext.uid);

		if (_.isUndefined(chats)) return;
		await chatContext.setChats(chats);
		/* eslint-disable react-hooks/exhaustive-deps */
	}, [authContext.isLoggedIn]);

	useEffect(() => {
		void fetchChats();
	}, [fetchChats, authContext.uid]);
}
