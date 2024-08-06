import {observer} from "mobx-react-lite";
import {View} from "react-native";
import LeaseCard from "./LeaseCard";
import TrashButton from "../TrashButton";
import {SwipeListView} from "react-native-swipe-list-view";
import {useCallback} from "react";
import {useAppContext} from "../../Contexts/AppContext";
import _ from "lodash";
import DataService from "../../Utils/DataService";

function AreLeases(){
	const appContext = useAppContext();

	const deleteLease = useCallback(async (leaseId: number) => {
		if (_.isUndefined(leaseId)) return;
		await appContext.deleteLease(leaseId);
	}, [appContext]);

	return(
		<View>
			<SwipeListView data={appContext.SelectedPropertyLeases}
				renderItem={({item})=>(<LeaseCard lease={item}/>)}
				rightOpenValue={-50}
				renderHiddenItem={({ item }) => (
					<TrashButton onPress={async () => deleteLease(item.LeaseId)} />
				)}
			/>
		</View>
	);
}


export default observer(AreLeases);
