import {observer} from "mobx-react-lite";
import {View} from "react-native";
import LeaseCard from "./LeaseCard";
import TrashButton from "../TrashButton";
import {SwipeListView} from "react-native-swipe-list-view";
import React, {useCallback, useContext} from "react";
import {AppContext} from "../../Contexts/AppContext";
import _ from "lodash";

function AreLeases(){
	const appContext = useContext(AppContext);

	const deleteLease = useCallback(async (item: Lease) => {
		if (_.isUndefined(item.LeaseId)) return;
		await appContext.deleteLease(item.LeaseId);
	}, []);

	return(
		<View>
			<SwipeListView data={appContext.SelectedPropertyLeases}
				renderItem={({item})=>(<LeaseCard lease={item}/>)}
				rightOpenValue={-50}
				renderHiddenItem={({ item }) => (
					<TrashButton
						onPress={async () => deleteLease(item)}
					/>
				)}
			/>
		</View>
	);
}


export default observer(AreLeases);
