import {useAuthContext} from "@src/Contexts/AuthContext";
import {useEffect} from "react";
import _ from "lodash";
import {useChatContext} from "@src/Contexts/ChatContext";

export default function useWebSocketSetup(): void  {
	const authContext = useAuthContext();
	useEffect(() => {
		const socket = authContext.setSocket();
		if (_.isUndefined(socket)) return;

		socket.onmessage = (event: MessageEvent<string>): void => {
			console.log("Received message", event.data);
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
