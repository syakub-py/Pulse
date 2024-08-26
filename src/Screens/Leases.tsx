import {observer} from "mobx-react-lite";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import FloatingActionButton from "../Components/Buttons/FloatingActionButton";
import AreLeases from "../Components/Leases/AreLeases";
import _ from "lodash";
import NoLeases from "../Components/Leases/NoLeases";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import { useAppContext } from "../Contexts/AppContext";
import {useMemo} from "react";

function Leases(){
	const appContext = useAppContext();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Leases">>();
	const hasLeases = useMemo(() => {
		return !_.isEmpty(appContext.SelectedPropertyLeases);
	}, [appContext.SelectedPropertyLeases]);
	return (
		<Layout>
			<Header title={`${appContext.SelectedProperty?.Name} lease(s)`} />
			{hasLeases ? <AreLeases /> : <NoLeases />}

			{(_.isEmpty(appContext.SelectedProperty) || !appContext.SelectedProperty.isRental)?null : (
				<FloatingActionButton
					icon={"add"}
					onPress={() => navigation.navigate("AddALease")}
					text={"Add Lease"}
				/>
			)}
		</Layout>
	);
}

export default observer(Leases);
