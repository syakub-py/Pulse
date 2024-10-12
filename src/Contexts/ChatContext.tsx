import _ from "lodash";
import {action, makeObservable, observable, runInAction} from "mobx";
import { createContext, useContext, useMemo } from "react";
import {PulseApiClient} from "@src/Contexts/PulseApiClientContext";
import isHTTPError from "@src/Utils/HttpError";

class ChatsClass {
	public chats: Chat[] = [];

	constructor(private readonly pulseApiClient: PulseApiClient) {
		makeObservable(this, {
			chats: observable
		});
	}

	public setChats = action((chats: Chat[]): void => {
		this.chats = chats;
	});

	public getChats = action(async (postgresUserId: number) => {
		const chatsData = await this.pulseApiClient.chatService.getChats(postgresUserId);
		if (isHTTPError(chatsData)) {
			alert(chatsData.message);
			return;
		}

		if (_.isUndefined(chatsData)) return;


		this.setChats(chatsData);
	});

	public clearContext = action(() => {
		runInAction(()=>{
			this.chats = [];
		});
	});

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
