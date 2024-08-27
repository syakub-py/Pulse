import {useCallback, useEffect} from "react";
import {useAppContext} from "../Contexts/AppContext";
import _ from "lodash";
import AnalyticsService from "@src/Utils/Services/AnalyticsService";
import isHTTPError from "@src/Utils/HttpError";

export default function useGenerateAnalytics(){
	const appContext = useAppContext();
	const fetchData = useCallback(async ()=> {
		if (_.isNull(appContext.SelectedProperty) || _.isUndefined(appContext.SelectedProperty.PropertyId) || !appContext.SelectedProperty.isRental) return;
		const expenseAnalyticResponse = await AnalyticsService.getExpenseAnalytics(appContext.SelectedProperty.PropertyId);
		const incomeAnalyticResponse = await AnalyticsService.getIncomeAnalytics(appContext.SelectedProperty.PropertyId);
		if (isHTTPError(expenseAnalyticResponse)) {
			alert(expenseAnalyticResponse.message);
			return;
		}

		if (isHTTPError(incomeAnalyticResponse)) {
			alert(incomeAnalyticResponse.message);
			return;
		}
		appContext.setExpenseAnalyticData(expenseAnalyticResponse as ExpenseAnalytic[]);
		appContext.setIncomeAnalyticData(incomeAnalyticResponse as IncomeAnalytic);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

	useEffect(() => {
		void fetchData();
	}, [fetchData, appContext.SelectedProperty, appContext.Transactions]);
}

