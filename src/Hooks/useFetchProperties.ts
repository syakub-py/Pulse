import {useContext, useEffect} from "react";
import {auth} from "../Utils/Firebase";
import DataService from "../Utils/DataService";
import {AppContext} from "../Contexts/AppContext";
import _ from "lodash";

export default function useFetchProperties(){
	const appContext = useContext(AppContext);
	useEffect(() => {
		const fetchProperties = async ()=>{
			if (auth.currentUser?.uid) {
				return await DataService.getProperty(auth.currentUser.uid);
			}
		};
		fetchProperties().then((result)=>{
			if (!_.isUndefined(result)){
				appContext.Properties = result;
				console.log(result);
			}
		});
	}, [appContext.Properties]);
}
