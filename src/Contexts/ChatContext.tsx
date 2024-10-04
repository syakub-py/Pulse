import _ from "lodash";
import {action, makeAutoObservable, makeObservable, observable} from "mobx";
import { createContext, useContext, useMemo } from "react";
import {PulseApiClient} from "@src/Contexts/PulseApiClientContext";

class ChatsClass {
	public chats: Chat[] = [];
	public selectedChat:Chat | null = null;

	constructor(private readonly pulseApiClient: PulseApiClient) {
		makeObservable(this, {
			chats: observable
		});
	}

	get areChatsEmpty(): boolean {
		return _.isEmpty(this.chats);
	}

	public findChat = action((chatId: number): Chat | undefined => {
		return this.chats.find(chat => chat.chatId === chatId);
	});

	public findChatByUsername = action((username: string | undefined): Chat | undefined => {
		if (_.isUndefined(username)) return undefined;
		for (const chat of this.chats) {
			if (chat.OtherUserDetails.Email === username) return chat;
		}
		return undefined;
	});

	public setSelectedChat = action((selectedChat: Chat | null): void => {
		this.selectedChat = selectedChat;
	});


	public setChats = action((chats: Chat[]): void => {
		this.chats = chats;
	});

	private clearChatsArray = action(() => {
		this.chats = [];
	});

	public logout() {
		this.clearChatsArray();
		this.setSelectedChat(null);
	}
}

const ChatsContext = createContext<null| ChatsClass>(null);

export default function ChatProvider ({ children, pulseApiClient }: { children: React.ReactNode, pulseApiClient: PulseApiClient }) {
	const chatsClass = useMemo(() => new ChatsClass(pulseApiClient), [pulseApiClient]);

	return (
		<ChatsContext.Provider value={chatsClass}>
			{children}
		</ChatsContext.Provider>
	);
}

export const useChatContext = () => useContext(ChatsContext);
