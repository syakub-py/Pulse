import _ from "lodash";
import {useEffect} from "react";
import AsyncStorageClass from "../Classes/AsyncStorage";
import {auth} from "../Utils/Firebase";
import DataService from "../Utils/DataService";

export default function useFetchChat() {
	useEffect(() => {
		const fetchChatId = async () => {
			try {
				return await AsyncStorageClass.getDataFromStorage("chatId");
			} catch (error) {
				console.error("Error fetching chatId:", error);
				return null;
			}
		};

		const initializeChat = async () => {
			const chatId = await fetchChatId();
			if (_.isUndefined(chatId) && auth.currentUser?.uid) {
				await DataService.createChat(auth.currentUser.uid);
			}
		};

		void initializeChat();
	}, []);
}
