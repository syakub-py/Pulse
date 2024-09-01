import {useCallback, useEffect} from "react";
import {useAppContext} from "../Contexts/AppContext";
import _ from "lodash";
import isHTTPError from "@src/Utils/HttpError";
import { useApiClientContext } from "../Contexts/PulseApiClientContext";
import {usePropertyContext} from "@src/Contexts/PropertyContext";
import {useAnalyticContext} from "@src/Contexts/AnalyticContext";

export default function useGenerateAnalytics(){
	const propertyContext = usePropertyContext();
	const apiClientContext = useApiClientContext();
	const analyticContext = useAnalyticContext();

	const fetchData = useCallback(async ()=> {
		if (_.isNull(propertyContext?.SelectedProperty) || _.isNull(propertyContext) || _.isNull(analyticContext) || _.isUndefined(propertyContext.SelectedProperty.PropertyId) || !propertyContext.SelectedProperty.isRental) return;

		const expenseAnalyticResponse = await apiClientContext.analyticsDataService.getExpenseAnalytics(propertyContext.SelectedProperty.PropertyId);
		const incomeAnalyticResponse = await apiClientContext.analyticsDataService.getIncomeAnalytics(propertyContext.SelectedProperty.PropertyId);
		if (isHTTPError(expenseAnalyticResponse)) {
			alert(expenseAnalyticResponse.message);
			return;
		}
		analyticContext.setExpenseAnalyticData(expenseAnalyticResponse as ExpenseAnalytic[]);

		if (isHTTPError(incomeAnalyticResponse)) {
			alert(incomeAnalyticResponse.message);
			return;
		}
		analyticContext.setIncomeAnalyticData(incomeAnalyticResponse as IncomeAnalytic);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

	useEffect(() => {
		void fetchData();
	}, [fetchData, propertyContext?.SelectedProperty, analyticContext?.Transactions]);
}

