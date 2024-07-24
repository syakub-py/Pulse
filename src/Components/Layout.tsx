import {SafeAreaView, StyleSheet} from "react-native";
import React from "react";
import { observer } from "mobx-react-lite";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

function Layout({ children }:{ children: React.ReactNode }) {
	// const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
	return (
		<SafeAreaView style={styles.container}>
			{children}
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
