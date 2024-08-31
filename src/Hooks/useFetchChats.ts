import {useAuthContext} from "@src/Contexts/AuthContext";
import {useCallback, useEffect} from "react";
import _ from "lodash";
import ChatService from "@src/Utils/Services/ChatService";
import {useAppContext} from "@src/Contexts/AppContext";

export default function useFetchChats() {
	const authContext = useAuthContext();
	const appContext = useAppContext();

	const fetchChats = useCallback(async () => {
		if (_.isUndefined(authContext.uid)) return;

		const chats = await ChatService.getChats(authContext.uid);

		if (_.isUndefined(chats)) return;
		await appContext.setChats(chats);
		/* eslint-disable react-hooks/exhaustive-deps */
	}, [authContext.isLoggedIn]);

	useEffect(() => {
		void fetchChats();
	}, [fetchChats, authContext.uid]);
}
