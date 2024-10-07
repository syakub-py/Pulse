import {observer} from "mobx-react-lite";
import Layout from "../Components/GlobalComponents/Layout";
import Header from "../Components/GlobalComponents/Header";
import {PieChart, BarChart} from "react-native-chart-kit";
import {Dimensions, FlatList, ScrollView} from "react-native";
import SubHeader from "../Components/Analytics/SubHeader";
import useGenerateAnalytics from "@src/Hooks/useGenerateAnalytics";
import useFetchTransactions from "@src/Hooks/useFetchTransactions";
import FloatingActionButton from "@src/Components/Buttons/FloatingActionButton";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import TransactionCard from "@src/Components/Analytics/TransactionCard";
import _ from "lodash";
import {useAnalyticContext} from "@src/Contexts/AnalyticContext";


function Analytics(){
	useGenerateAnalytics();
	useFetchTransactions();
	const analyticContext = useAnalyticContext();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Analytics">>();
	if (_.isNull(analyticContext) || _.isNull(analyticContext.IncomeAnalyticData)) return;
	return (
		<Layout>
			<Header title={"Your Analytics"} />
			<SubHeader title={"Transactions"} />
			<FlatList
				data={analyticContext.Transactions}
				renderItem={({item, index}) => (
					<TransactionCard key={index} transaction={item} />
				)}
			/>
			<ScrollView>
				<SubHeader title={"Income"} />
				<BarChart
					data={{
						labels: analyticContext.IncomeAnalyticData.labels,
						datasets: [
							{
								data: analyticContext.IncomeAnalyticData.data,
								color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
								strokeWidth: 4,
							},
						],
					}}
					width={Dimensions.get("window").width - 16}
					height={300}
					fromZero={true}
					yAxisLabel="$"
					yAxisSuffix="k"
					chartConfig={{
						backgroundGradientFrom: "#1e1e1e",
						backgroundGradientTo: "#1e1e1e",
						decimalPlaces: 2,
						color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
						labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						style: {
							borderRadius: 16,
						},
						propsForDots: {
							r: "6",
							strokeWidth: "2",
							stroke: "#ffa726",
						},
					}}
					verticalLabelRotation={30}
				/>

				<SubHeader title={"Expense Breakdown"} />
				<PieChart
					data={analyticContext.ExpenseAnalyticData}
					width={Dimensions.get("window").width}
					height={200}
					chartConfig={{
						backgroundColor: "#1e1e1e",
						backgroundGradientFrom: "#1e1e1e",
						backgroundGradientTo: "#1e1e1e",
						labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						decimalPlaces: 2,
						color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
						propsForDots: {
							r: "6",
							strokeWidth: "2",
							stroke: "#ffa726",
						},
					}}
					accessor="expenseAmount"
					backgroundColor="transparent"
					paddingLeft="15"
					absolute
				/>
			</ScrollView>
			<FloatingActionButton
				onPress={() => navigation.navigate("AddATransaction")}
				icon={"add"}
				text={"Add Transaction"}
			/>
		</Layout>
	);
}

export default observer(Analytics);
