import {action, makeObservable} from "mobx";
import {IMessage} from "react-native-gifted-chat";


class Chat{
	public messages:IMessage[] = [];
	public lastMessage:IMessage | null = null;
	public otherUserDetails:User | null = null;
	public draftMessage: string = "";
	public chatId: number = 0;

	constructor() {
		makeObservable(this);
	}

	public addMessageToChat = action((messageData: IMessage, setLatestMessage: boolean): void => {
		this.messages.push(messageData);

		this.messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

		if (!setLatestMessage) return;
		this.setLastMessage(messageData);
	});

	private setLastMessage(lastMessageData: IMessage): void {
		this.lastMessage = lastMessageData;
	}

	private setDraftMessage(draftMessageData: string): void {
		this.draftMessage = draftMessageData;
	}
}
