import {observer} from "mobx-react-lite";
import Layout from "../Components/GlobalComponents/Layout";
import Header from "../Components/GlobalComponents/Header";
import FloatingActionButton from "../Components/Buttons/FloatingActionButton";
import AreLeases from "../Components/Leases/AreLeases";
import _ from "lodash";
import NoLeases from "../Components/Leases/NoLeases";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useMemo} from "react";
import {usePropertyContext} from "@src/Contexts/PropertyContext";
import {useLeaseContext} from "@src/Contexts/LeaseContext";

function Leases(){
	const propertyContext = usePropertyContext();
	const leaseContext = useLeaseContext();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Leases">>();
	const hasLeases = useMemo(() => {
		return !_.isEmpty(leaseContext?.selectedPropertyLeases);
	}, [leaseContext?.selectedPropertyLeases]);
	return (
		<Layout>
			<Header title={`${propertyContext?.selectedProperty?.Name} lease(s)`} />
			{hasLeases ? <AreLeases /> : <NoLeases />}

			{(_.isEmpty(propertyContext?.selectedProperty) || !propertyContext.selectedProperty.isRental)?null : (
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
