import _ from "lodash";
import { action, makeObservable, observable } from "mobx";
import { createContext, useContext, useMemo } from "react";
import Chat from "@src/Classes/Chat";

class ChatsClass {
	public chats: Chat[] = [];

	constructor() {
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
			if (chat.otherUserDetails?.Email === username) return chat;
		}
		return undefined;
	});

	public addChat = action((chat: Chat) => {
		this.chats.push(chat);
	});

	public setChats = action((chats: Chat[]): void => {
		this.chats = chats;
	});

	private clearChatsArray = action(() => {
		this.chats = [];
	});

	public logout() {
		this.clearChatsArray();
	}
}

const ChatsContext = createContext(new ChatsClass());

export default function ChatProvider ({ children }: { children: React.ReactNode }) {
	const chatsClass = useMemo(() => new ChatsClass(), []);

	return (
		<ChatsContext.Provider value={chatsClass}>
			{children}
		</ChatsContext.Provider>
	);
}

export const useChatContext = () => useContext(ChatsContext);
