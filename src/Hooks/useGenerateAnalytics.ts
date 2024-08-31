import {useCallback, useEffect} from "react";
import {useAppContext} from "../Contexts/AppContext";
import _ from "lodash";
import isHTTPError from "@src/Utils/HttpError";
import { useApiClientContext } from "../Contexts/PulseApiClientContext";

export default function useGenerateAnalytics(){
	const appContext = useAppContext();
	const apiClientContext = useApiClientContext();

	const fetchData = useCallback(async ()=> {
		if (_.isNull(appContext.SelectedProperty) || _.isUndefined(appContext.SelectedProperty.PropertyId) || !appContext.SelectedProperty.isRental) return;
		const expenseAnalyticResponse = await apiClientContext.analyticsDataService.getExpenseAnalytics(appContext.SelectedProperty.PropertyId);
		const incomeAnalyticResponse = await apiClientContext.analyticsDataService.getIncomeAnalytics(appContext.SelectedProperty.PropertyId);
		if (isHTTPError(expenseAnalyticResponse)) {
			alert(expenseAnalyticResponse.message);
			return;
		}
		appContext.setExpenseAnalyticData(expenseAnalyticResponse as ExpenseAnalytic[]);

		if (isHTTPError(incomeAnalyticResponse)) {
			alert(incomeAnalyticResponse.message);
			return;
		}
		appContext.setIncomeAnalyticData(incomeAnalyticResponse as IncomeAnalytic);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

	useEffect(() => {
		void fetchData();
	}, [fetchData, appContext.SelectedProperty, appContext.Transactions]);
}

