import {SafeAreaView, ScrollView, StyleSheet} from "react-native";
import React from "react";
import { observer } from "mobx-react-lite";


function Layout({ children }:{ children: React.ReactNode }) {

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				{children}
			</ScrollView>
		</SafeAreaView>
	);
}

export default observer(Layout);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:"black"
	},
});
