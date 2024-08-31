import {useAuthContext} from "@src/Contexts/AuthContext";
import {useCallback, useEffect} from "react";
import _ from "lodash";
import {useAppContext} from "@src/Contexts/AppContext";
import { useApiClientContext } from "../Contexts/PulseApiClientContext";

export default function useFetchChats() {
	const authContext = useAuthContext();
	const appContext = useAppContext();
	const apiClientContext = useApiClientContext();

	const fetchChats = useCallback(async () => {
		if (_.isUndefined(authContext.uid)) return;

		const chats = await apiClientContext.chatService.getChats(authContext.uid);

		if (_.isUndefined(chats)) return;
		await appContext.setChats(chats);
		/* eslint-disable react-hooks/exhaustive-deps */
	}, [authContext.isLoggedIn]);

	useEffect(() => {
		void fetchChats();
	}, [fetchChats, authContext.uid]);
}
