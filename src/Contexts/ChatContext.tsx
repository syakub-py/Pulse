import {PulseApiClient} from "@src/Contexts/PulseApiClientContext";
import {action, makeAutoObservable} from "mobx";
import {createContext, useContext, useMemo} from "react";


class ChatContextClass {
	public Chats:Chat[] = [];
	private pulseApiClient: PulseApiClient;

	constructor(pulseApiClient: PulseApiClient) {
		makeAutoObservable(this);
		this.pulseApiClient = pulseApiClient;
	}
	public setChats = action(async (chats: Chat[]) => {
		this.Chats = chats;
	});
}

const ChatContext = createContext<ChatContextClass | null>(null);

export default function ChatContextProvider({ children, pulseApiClient }: { children: React.ReactNode, pulseApiClient: PulseApiClient }) {

	const context = useMemo(() => new ChatContextClass(pulseApiClient), [pulseApiClient]);

	return (
		<ChatContext.Provider value={context}>
			{children}
		</ChatContext.Provider>
	);
}

export const useChatContext = () => useContext(ChatContext);
