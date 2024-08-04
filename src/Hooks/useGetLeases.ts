import {useCallback, useContext, useEffect} from "react";
import {AppContext} from "../Contexts/AppContext";
import DataService from "../Utils/DataService";
import _ from "lodash";
import {AuthContext} from "../Contexts/AuthContext";

export default function useGetLeases() {
	const appContext = useContext(AppContext);
	const fetchLeaseData = useCallback( async ()=>{
		if (!_.isUndefined(appContext.SelectedProperty?.PropertyId)){
			appContext.setPropertyLeases(await DataService.getLeases(appContext.SelectedProperty.PropertyId));
		}
	},[appContext.SelectedProperty]);

	useEffect(() => {
		void fetchLeaseData();
	}, [appContext.SelectedProperty]);
}

