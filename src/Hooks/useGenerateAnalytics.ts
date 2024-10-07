import {useCallback, useEffect} from "react";
import _ from "lodash";
import {usePropertyContext} from "@src/Contexts/PropertyContext";
import {useAnalyticContext} from "@src/Contexts/AnalyticContext";

export default function useGenerateAnalytics(){
	const propertyContext = usePropertyContext();
	const analyticContext = useAnalyticContext();

	const fetchData = useCallback(async ()=> {
		if (_.isNull(propertyContext?.selectedProperty) || _.isNull(propertyContext) || _.isNull(analyticContext) || _.isUndefined(propertyContext.selectedProperty.PropertyId) || !propertyContext.selectedProperty.isRental) return;
		await analyticContext.getAnalytics(propertyContext.selectedProperty.PropertyId);
	},[analyticContext, propertyContext]);

	useEffect(() => {
		void fetchData();
	}, [fetchData, propertyContext?.selectedProperty, analyticContext?.Transactions]);
}

