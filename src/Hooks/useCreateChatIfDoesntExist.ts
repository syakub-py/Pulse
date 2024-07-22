import {useEffect} from "react";
import AsyncStorageClass from "../Classes/AsyncStorage";
import {auth} from "../Utils/Firebase";
import DataService from "../Utils/DataService";

export default function useCreateChatIfDoesntExist() {
	useEffect(() => {
		const initializeChat = async () => {
			try {
				const chatId = await AsyncStorageClass.getDataFromStorage("chatId");
				if (!chatId && auth.currentUser?.uid) {
					await DataService.createChat(auth.currentUser.uid);
				}
			}catch(e){
				console.error(e);
			}
		};

		void initializeChat();
	}, []);
}
