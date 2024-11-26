import _ from "lodash";
import {useCallback, useEffect} from "react";
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
			if (_.isEmpty(authContext.firebaseUid) || _.isNull(propertyContext)|| _.isNull(transactionContext) || _.isUndefined(propertyContext.selectedProperty?.PropertyId)) return;

			const response = await apiClientContext.transactionService.getTransaction(propertyContext.selectedProperty.PropertyId);
			if (isHTTPError(response)) {
				alert(response.message);
				return;
			}
			transactionContext.setTransactions(response as PropertyTransaction[]);
		} catch (error) {
			console.error("error fetching Transactions: " + error);
		}
	}, [apiClientContext.transactionService, authContext.firebaseUid, propertyContext, transactionContext]);

	useEffect(() => {
		void fetchTransactions();
	}, [propertyContext?.selectedProperty, fetchTransactions]);
}
