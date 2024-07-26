import {useContext, useEffect} from "react";
import AsyncStorageClass from "../Classes/AsyncStorage";
import {auth} from "../Utils/Firebase";
import DataService from "../Utils/DataService";
import _ from "lodash";
import {AuthContext} from "../Contexts/AuthContext";

export default function useCreateChatIfDoesntExist() {
	const authContext = useContext(AuthContext);
	useEffect(() => {
		const initializeChat = async () => {
			try {
				const chatId = await AsyncStorageClass.getDataFromStorage("chatId");
				if (_.isUndefined(chatId) && auth.currentUser?.uid) {
					await DataService.createChat(auth.currentUser.uid);
				}
				if (!_.isUndefined(chatId)) {
					await DataService.getMessages(chatId);
				}
			}catch(e){
				console.error(e);
			}
		};
		void initializeChat();
	}, [authContext.isLoggedIn]);
}
