import {useCallback, useEffect} from "react";
import AsyncStorageClass from "../Classes/AsyncStorage";
import _ from "lodash";
import {useAuthContext} from "../Contexts/AuthContext";
import { useApiClientContext } from "../Contexts/PulseApiClientContext";

export default function usePulseCreateChatIfDoesntExist() {
	const authContext = useAuthContext();
	const apiClientContext = useApiClientContext();

	const initializeChat = useCallback(async () => {
		try {
			const chatId = await AsyncStorageClass.getDataFromStorage("chatId");
			if (_.isUndefined(chatId) || _.isEmpty(authContext.firebase_uid)) return;
			await apiClientContext.pulseAiChatService.createPulseChat(authContext.firebase_uid);
		}catch(e){
			console.error("error creating chat: " + e);
		}
	}, [apiClientContext.pulseAiChatService, authContext.firebase_uid]);

	useEffect(() => {
		void initializeChat();
	}, [authContext.isLoggedIn, initializeChat]);
}
