import {useAuthContext} from "@src/Contexts/AuthContext";
import {useEffect} from "react";
import _ from "lodash";
import useAddMessageToSelectedChat from "@src/Hooks/useAddMessageToSelectedChat";

export default function useWebSocketSetup(): void  {
	const authContext = useAuthContext();
	const addMessageToSelectedChat = useAddMessageToSelectedChat();
	useEffect(() => {
		const socket = authContext.setSocket();
		if (_.isUndefined(socket)) return;

		socket.onmessage = (event: MessageEvent<string>): void => {
			const messageData = event.data;
			console.log("Received message", messageData);
			addMessageToSelectedChat(messageData);
		};

		socket.onclose = (): void => {
			console.info("WebSocket connection closed");
		};

		socket.onerror = (error): void => {
			console.error("WebSocket error:", error);
		};

		return (): void => {
			socket.close();
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authContext.isLoggedIn]);
}
