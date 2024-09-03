import {useAuthContext} from "@src/Contexts/AuthContext";
import {useCallback, useEffect} from "react";
import _ from "lodash";
import {useApiClientContext} from "../Contexts/PulseApiClientContext";
import {useChatContext} from "@src/Contexts/ChatContext";
import {IMessage} from "react-native-gifted-chat";
import Chat from "@src/Classes/Chat";
import isHTTPError from "@src/Utils/HttpError";

export default function useFetchChats() {
	const authContext = useAuthContext();
	const chatContext = useChatContext();
	const apiClientContext = useApiClientContext();

	const fetchChats = useCallback(async () => {
		if (_.isNull(authContext.firebase_uid) ||
			_.isNull(chatContext) ||
			_.isEmpty(authContext.firebase_uid) ||
			authContext.postgres_uid === 0
		) return;

		const chatsData = await apiClientContext.chatService.getChats(authContext.postgres_uid);
		if (isHTTPError(chatsData)) {
			alert(chatsData.message);
			return;
		}


		const chats = chatsData.map((chatData: Chat) => {
			const chat = new Chat();
			chat.chatId = chatData.chatId;
			chat.otherUserDetails = chatData.otherUserDetails;
			chat.lastMessage = chatData.lastMessage;
			chat.messages = chatData.messages.map((msg: IMessage) => ({
				...msg,
				createdAt: new Date(msg.createdAt),
			}));

			return chat;
		});

		chatContext.setChats(chats);
		/* eslint-disable react-hooks/exhaustive-deps */
	}, [authContext.isLoggedIn]);

	useEffect(() => {
		void fetchChats();
	}, [fetchChats, authContext.firebase_uid]);
}
