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

function Leases(){
	const appContext = useContext(AppContext);
	return (
		<Layout>
			<View style={styles.headerContainer}>
				<Header title={"Your Leases"}/>
				<FloatingActionButton
					icon={"add"}
					styles={styles.fab}
					onPress={() => console.log("pressed")}
				/>
			</View>
			{
				(!_.isEmpty(appContext.SelectedProperty?.Leases))?(
					<AreLeases/>
				):(
					<NoLeases/>
				)
			}
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
