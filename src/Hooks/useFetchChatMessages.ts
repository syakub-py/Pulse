import {useContext, useEffect} from "react";
import AsyncStorageClass from "../Classes/AsyncStorage";
import DataService from "../Utils/DataService";
import {AppContext} from "../Contexts/AppContext";
import _ from "lodash";


export default function useFetchChatMessages(){
	const appContext = useContext(AppContext);
	useEffect(() => {
		const fetchMessages = async ()=>{
			const chatId = await AsyncStorageClass.getDataFromStorage("chatId");
			if (chatId){
				return await DataService.getMessages(chatId);
			}
			return [];
		};
		if (_.isEmpty(appContext.Messages)){
			fetchMessages().then((result)=>{
				appContext.Messages = result;
			});
		}
	}, []);
}

