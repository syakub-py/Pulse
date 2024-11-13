import React, { useRef, useCallback } from "react";
import { observer } from "mobx-react-lite";
import Layout from "../Components/GlobalComponents/Layout";
import Header from "../Components/GlobalComponents/Header";
import { View, StyleSheet, FlatList } from "react-native";
import useGenerateAnalytics from "@src/Hooks/useGenerateAnalytics";
import useFetchTransactions from "@src/Hooks/useFetchTransactions";
import FloatingActionButton from "@src/Components/Buttons/FloatingActionButton";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import ExpensePieChart from "@src/Components/Analytics/ExpensePieChart";
import TransactionList from "@src/Components/Analytics/TransactionList";
import { ViewToken } from "react-native";
import IncomeBarGraph from "@src/Components/Analytics/IncomeBarGraph";
import SubHeader from "@src/Components/Analytics/SubHeader";
import {ANALYTICS_TABS} from "@src/Constants/Constants";


function Analytics() {
	useGenerateAnalytics();
	useFetchTransactions();

	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Analytics">>();
	const flatListRef = useRef<FlatList>(null);

	const onScrollToIndexFailed = useCallback((info: {
		index: number;
		highestMeasuredFrameIndex: number;
		averageItemLength: number;
	}) => {
		flatListRef.current?.scrollToOffset({
			offset: info.averageItemLength * info.index,
			animated: true,
		});

		setTimeout(() => {
			if (flatListRef.current) {
				flatListRef.current.scrollToIndex({ index: info.index, animated: true });
			}
		}, 100);
	}, [flatListRef]);

	const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
		if (viewableItems.length === 0) return;
	}, []);

	const viewabilityConfig = {
		itemVisiblePercentThreshold: 50,
	};

	return (
		<Layout>
			<Header title={"Your Analytics"} />
			<FlatList
				ref={flatListRef}
				data={ANALYTICS_TABS}
				horizontal
				pagingEnabled
				renderItem={({ item }) => {
					switch (item.key) {
					case "income":
						return(
							<View style={styles.screen}>
								<SubHeader title={"Income"}/>
								<IncomeBarGraph />
								<TransactionList transactionType={"income"}/>
							</View>
						);
					case "expense":
						return (
							<View style={styles.screen}>
								<SubHeader title={"Expenses"}/>
								<ExpensePieChart />
								<TransactionList transactionType={"expense"}/>
							</View>
						);
					default:
						return null;
					}
				}}
				keyExtractor={(item) => item.key}
				onScrollToIndexFailed={onScrollToIndexFailed}
				onViewableItemsChanged={onViewableItemsChanged}
				viewabilityConfig={viewabilityConfig}
				showsHorizontalScrollIndicator={false}
			/>

			{/* Floating Action Button */}
			<FloatingActionButton
				onPress={() => navigation.navigate("AddATransaction")}
				icon={"add"}
				text={"Add Transaction"}
			/>
		</Layout>
	);
}

export default observer(Analytics);

const styles = StyleSheet.create({
	screen: {
		width: "100%",
		flex: 1,
		alignItems: "center",
	},
});
