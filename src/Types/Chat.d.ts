import {IMessage} from "react-native-gifted-chat";

declare global {
	interface Chat{
		LastMessage:string,
		Messages:IMessage[],
		OtherUserDetails:User,
		chatId:number,
	}
	
	interface GetChatResponse{
		data:IMessage[],
		status_code:number,
	}
}

export { };
