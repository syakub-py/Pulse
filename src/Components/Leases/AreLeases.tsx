import {observer} from "mobx-react-lite";
import {View} from "react-native";
import LeaseCard from "./LeaseCard";
import TrashButton from "../TrashButton";
import {SwipeListView} from "react-native-swipe-list-view";
import React, {useContext} from "react";
import {AppContext} from "../../Contexts/AppContext";

function AreLeases(){
	const appContext = useContext(AppContext);
	return(
		<View>
			<SwipeListView data={appContext.SelectedProperty?.Leases}
				renderItem={({item, index})=>(<LeaseCard lease={item}/>)}
				rightOpenValue={-50}
				renderHiddenItem={({ item }) => (
					<TrashButton/>
				)}
			/>
		</View>
	);
}


export default observer(AreLeases);
