import {useAppContext} from "../Contexts/AppContext";
import {useAuthContext} from "../Contexts/AuthContext";
import {useCallback, useEffect} from "react";
import _ from "lodash";
import isHTTPError from "@src/Utils/HttpError";
import TransactionService from "@src/Utils/Services/TransactionService";

export default function useFetchTransactions(){
	const appContext = useAppContext();
	const authContext = useAuthContext();

	const fetchTransactions = useCallback(async () => {
		try {
			if (_.isEmpty(authContext.uid) || _.isUndefined(appContext.SelectedProperty?.PropertyId)) return;

			const response = await TransactionService.getTransaction(appContext.SelectedProperty.PropertyId);
			if (isHTTPError(response)) {
				alert(response.message);
				return;
			}

			appContext.setTransactions(response as PropertyTransaction[]);
		} catch (error) {
			console.error("error fetching Transactions: " + error);
		}
		/* eslint-disable react-hooks/exhaustive-deps */
	}, []);

	useEffect(() => {
		void fetchTransactions();
	}, [appContext.SelectedProperty, fetchTransactions]);
}
