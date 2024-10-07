import {useCallback, useEffect} from "react";
import _ from "lodash";
import {usePropertyContext} from "@src/Contexts/PropertyContext";
import {useAnalyticContext} from "@src/Contexts/AnalyticContext";

export default function useGenerateAnalytics(){
	const propertyContext = usePropertyContext();
	const analyticContext = useAnalyticContext();

	const fetchData = useCallback(async ()=> {
		if (_.isNull(propertyContext?.SelectedProperty) || _.isNull(propertyContext) || _.isNull(analyticContext) || _.isUndefined(propertyContext.SelectedProperty.PropertyId) || !propertyContext.SelectedProperty.isRental) return;
		await analyticContext.getAnalytics(propertyContext.SelectedProperty.PropertyId);
	},[analyticContext, propertyContext]);

	useEffect(() => {
		void fetchData();
	}, [fetchData, propertyContext?.SelectedProperty, analyticContext?.Transactions]);
}

