import _ from "lodash";
import {useCallback, useContext, useEffect} from "react";
import {useAppContext} from "../Contexts/AppContext";
import {useAuthContext} from "../Contexts/AuthContext";
import isHTTPError from "@src/Utils/HttpError";
import { useApiClientContext } from "../Contexts/PulseApiClientContext";
import {usePropertyContext} from "@src/Contexts/PropertyContext";
import {useAnalyticContext} from "@src/Contexts/AnalyticContext";

export default function useFetchTransactions(){
	const propertyContext = usePropertyContext();
	const transactionContext = useAnalyticContext();
	const authContext = useAuthContext();
	const apiClientContext = useApiClientContext();

	const fetchTransactions = useCallback(async () => {
		try {
			if (_.isEmpty(authContext.uid) || _.isNull(propertyContext)|| _.isNull(transactionContext) || _.isUndefined(propertyContext.SelectedProperty?.PropertyId)) return;

			const response = await apiClientContext.transactionService.getTransaction(propertyContext.SelectedProperty.PropertyId);
			if (isHTTPError(response)) {
				alert(response.message);
				return;
			}

			transactionContext.setTransactions(response as PropertyTransaction[]);
		} catch (error) {
			console.error("error fetching Transactions: " + error);
		}
		/* eslint-disable react-hooks/exhaustive-deps */
	}, []);

	useEffect(() => {
		void fetchTransactions();
	}, [propertyContext?.SelectedProperty, fetchTransactions]);
}
