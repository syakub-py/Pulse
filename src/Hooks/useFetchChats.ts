import { useAuthContext } from "@src/Contexts/AuthContext";
import { useCallback, useEffect } from "react";
import _ from "lodash";
import { useChatContext } from "@src/Contexts/ChatContext";

export default function useFetchChats() {
	const authContext = useAuthContext();
	const chatContext = useChatContext();

	const fetchChats = useCallback(async () => {
		if (
			_.isNull(authContext.firebase_uid) ||
			_.isNull(chatContext) ||
			_.isEmpty(authContext.firebase_uid) ||
			authContext.postgres_uid === 0
		)return;
		await chatContext.getChats(authContext.postgres_uid);
		/* eslint-disable react-hooks/exhaustive-deps */
	}, [authContext.isLoggedIn]);

	useEffect(() => {
		void fetchChats();
	}, [fetchChats, authContext.firebase_uid]);
}
