import {useCallback, useEffect} from "react";
import {useAppContext} from "../Contexts/AppContext";
import _ from "lodash";
import AnalyticsService from "@src/Utils/Services/AnalyticsService";
import isHTTPError from "@src/Utils/HttpError";
import {useAuthContext} from "@src/Contexts/AuthContext";

export default function useGenerateAnalytics(){
	const appContext = useAppContext();
	const fetchData = useCallback(async ()=> {
		if (_.isNull(appContext.SelectedProperty) || _.isUndefined(appContext.SelectedProperty.PropertyId) || !appContext.SelectedProperty.isRental) return;
		const response = await AnalyticsService.getExpenseAnalytics(appContext.SelectedProperty.PropertyId);
		if (isHTTPError(response)){
			alert(response.message);
			return;
		}
		appContext.setExpenses(response as ExpenseAnalytic[]);
	},[]);

	useEffect(() => {
		void fetchData();
	}, [fetchData, appContext.SelectedProperty]);
}

