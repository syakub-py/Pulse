import MainStack from "./Screens/MainStack";
import {useContext, useEffect} from "react";
import useGetAuthDataFromAsyncStorage from "./Hooks/useGetAuthDataFromAsyncStorage";
import {auth} from "./Utils/Firebase";
import {AuthContext} from "./Contexts/AuthContext";
import AsyncStorageClass from "../src/Classes/AsyncStorage";
import _ from "lodash";
import DataService from "./Utils/DataService";

export default function Setup() {
	const getAuthDataFromAsyncStorage = useGetAuthDataFromAsyncStorage();
	const authContext = useContext(AuthContext);

	useEffect(() => {
		const fetchData = async () =>{
			await getAuthDataFromAsyncStorage;
		};
		void fetchData();
	}, [getAuthDataFromAsyncStorage]);

	useEffect(() => {
		authContext.setProfilePicture(auth.currentUser?.photoURL || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
	}, []);

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
				await DataService.createChat(auth.currentUser?.uid);
			}
		};

		initializeChat();
	}, []);

	return <MainStack />;
}

