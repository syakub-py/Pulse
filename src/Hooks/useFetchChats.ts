import { useAuthContext } from "@src/Contexts/AuthContext";
import { useCallback, useEffect } from "react";
import _ from "lodash";
import { useApiClientContext } from "../Contexts/PulseApiClientContext";
import { useChatContext } from "@src/Contexts/ChatContext";
import isHTTPError from "@src/Utils/HttpError";

export default function useFetchChats() {
	const authContext = useAuthContext();
	const chatContext = useChatContext();
	const apiClientContext = useApiClientContext();

	const fetchChats = useCallback(async () => {
		if (
			_.isNull(authContext.firebase_uid) ||
			_.isNull(chatContext) ||
			_.isEmpty(authContext.firebase_uid) ||
			authContext.postgres_uid === 0
		)
			return;

		const chatsData = await apiClientContext.chatService.getChats(authContext.postgres_uid);
		if (isHTTPError(chatsData)) {
			alert(chatsData.message);
			return;
		}

		if (_.isUndefined(chatsData)) return;


		chatContext.setChats(chatsData);
		/* eslint-disable react-hooks/exhaustive-deps */
	}, [authContext.isLoggedIn]);

	useEffect(() => {
		void fetchChats();
	}, [fetchChats, authContext.firebase_uid]);
}
