import {useCallback, useEffect} from "react";
import {useAppContext} from "../Contexts/AppContext";
import _ from "lodash";
import AnalyticsService from "@src/Utils/Services/AnalyticsService";
import isHTTPError from "@src/Utils/HttpError";

export default function useGenerateAnalytics(){
	const appContext = useAppContext();
	const fetchData = useCallback(async ()=> {
		if (_.isNull(appContext.SelectedProperty) || _.isUndefined(appContext.SelectedProperty.PropertyId) || !appContext.SelectedProperty.isRental) return;
		const response = await AnalyticsService.getExpenseAnalytics(appContext.SelectedProperty.PropertyId);
		if (isHTTPError(response)){
			alert(response.message);
			return;
		}
		appContext.setExpenseAnalyticData(response as ExpenseAnalytic[]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

	useEffect(() => {
		void fetchData();
	}, [fetchData, appContext.SelectedProperty, appContext.Transactions]);
}

