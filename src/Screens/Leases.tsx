import {observer} from "mobx-react-lite";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import {StyleSheet, View} from "react-native";
import React, {useContext} from "react";
import {AppContext} from "../Contexts/AppContext";
import FloatingActionButton from "../Components/FloatingActionButton";
import AreLeases from "../Components/Leases/AreLeases";
import _ from "lodash";
import NoLeases from "../Components/Leases/NoLeases";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

function Leases(){
	const appContext = useContext(AppContext);
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Leases">>();
	const hasLeases = !_.isEmpty(appContext.SelectedPropertyLeases);

	return (
		<Layout>
			<View>
				<View style={styles.headerContainer}>
					<Header title={`${appContext.SelectedProperty?.Name} lease(s)`} />
					{
						(!_.isEmpty(appContext.SelectedProperty) && appContext.SelectedProperty.isRental)?(
							<FloatingActionButton
								icon={"add"}
								styles={styles.fab}
								onPress={() => navigation.navigate("AddALease")}
							/>
						):null
					}

				</View>
				{hasLeases ? <AreLeases /> : <NoLeases />}
			</View>
		</Layout>
	);
}

export default observer(Leases);
const styles = StyleSheet.create({
	fab: {
		position: "absolute",
		bottom: 20,
		right: 20,
		backgroundColor: "transparent",
		padding: 10,
		borderRadius: 30,
		elevation: 5,
	},
	headerContainer:{
		flexDirection:"row",
		justifyContent:"space-between",
	}
});
