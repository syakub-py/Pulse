import {observer} from "mobx-react-lite";
import {Pressable, View} from "react-native";
import LeaseCard from "./LeaseCard";
import TrashButton from "../TrashButton";
import {SwipeListView} from "react-native-swipe-list-view";
import {useCallback, useState} from "react";
import {useAppContext} from "../../Contexts/AppContext";
import _ from "lodash";
import LeaseDetails from "./LeaseDetails";

function AreLeases(){
	const appContext = useAppContext();
	const [isModalVisible, setModalVisible] = useState(false);

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

	const deleteLease = useCallback(async (leaseId: number) => {
		if (_.isUndefined(leaseId)) return;
		await appContext.deleteLease(leaseId);
	}, [appContext]);

	return(
		<View>
			<SwipeListView data={appContext.SelectedPropertyLeases}
			   renderItem={({ item }) => {
				   if (isModalVisible) {
					   return (
						   <LeaseDetails toggleModal={toggleModal} isVisible={isModalVisible} lease={item} />
					   );
				   } else {
					   return (
						   <Pressable onPress={toggleModal}>
							   <LeaseCard lease={item} />
						   </Pressable>
					   );
				   }
			   }}
			   rightOpenValue={-50}
			   renderHiddenItem={({ item }) => (
				   <TrashButton onPress={async () => deleteLease(item.LeaseId)} />
			   )}
			/>
		</View>
	);
}


export default observer(AreLeases);
