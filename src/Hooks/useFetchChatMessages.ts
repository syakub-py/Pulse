import {useCallback} from "react";
import _ from "lodash";
import {useAuthContext} from "../Contexts/AuthContext";
import { useApiClientContext } from "../Contexts/PulseApiClientContext";
import {useChatContext} from "@src/Contexts/ChatContext";

export default function useFetchChatMessages() {
	const authContext = useAuthContext();
	const chatContext = useChatContext();
	const apiClientContext = useApiClientContext();


}
