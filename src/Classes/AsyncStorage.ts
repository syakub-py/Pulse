/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AsyncStorageClass {
	static async saveDataToStorage(key: string, whatToSave: any): Promise<void> {
		try {
			await AsyncStorage.setItem(key, JSON.stringify(whatToSave));
		} catch (error) {
			if (__DEV__) console.error("Error Saving Data to Storage",error);
		}
	}

	static async getDataFromStorage(key: string): Promise<undefined | any> {
		try {
			const data = await AsyncStorage.getItem(key);
			if (_.isNull(data)) return undefined;
			return JSON.parse(data);
		} catch (error) {
			if (__DEV__) console.error("Error Getting Data from Storage",error);
			return undefined;
		}
	}

	static async clearAllAsyncStorageData(): Promise<void> {
		try {
			await AsyncStorage.clear();
		} catch (error) {
			if (__DEV__) console.error("Error clearing AsyncStorage:", error);
		}
	}
}
