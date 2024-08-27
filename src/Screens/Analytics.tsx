import {observer} from "mobx-react-lite";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import {PieChart, BarChart} from "react-native-chart-kit";
import {Dimensions, FlatList, ScrollView} from "react-native";
import SubHeader from "../Components/Analytics/SubHeader";
import {useAppContext} from "../Contexts/AppContext";
import useGenerateAnalytics from "@src/Hooks/useGenerateAnalytics";
import useFetchTransactions from "@src/Hooks/useFetchTransactions";
import FloatingActionButton from "@src/Components/Buttons/FloatingActionButton";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import TransactionCard from "@src/Components/Analytics/TransactionCard";
import _ from "lodash";


const chartConfig = {
	backgroundColor: "#333",
	labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
	decimalPlaces: 2,
	color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
	propsForDots: {
		r: "6",
		strokeWidth: "2",
		stroke: "#ffa726",
	},
};


function Analytics(){
	useGenerateAnalytics();
	useFetchTransactions();
	const appContext = useAppContext();
	const navigation =useNavigation<StackNavigationProp<RootStackParamList, "Analytics">>();
	if (_.isNull(appContext.IncomeAnalyticData)) return;

	const barChartData = {
		labels: appContext.IncomeAnalyticData.labels,
		datasets: [
			{
				data: appContext.IncomeAnalyticData.data,
				color: (opacity = 1) => appContext.IncomeAnalyticData!.color,
				strokeWidth: 4,
			},
		],
	};

	return (
		<Layout>
			<Header title={"Your Analytics"}/>
			<SubHeader title={"Transactions"}/>
			<FlatList data={appContext.Transactions}
					  renderItem={({item, index})=>(
						  <TransactionCard key={index} transaction={item}/>
					  )}/>
			<ScrollView>
				<SubHeader title={"Income"}/>
				<BarChart
					data={barChartData}
					width={Dimensions.get("window").width - 16}
					height={300}
					fromZero={true}
					yAxisLabel="$"
					yAxisSuffix="k"
					chartConfig={{
						backgroundGradientFrom: "white",
						backgroundGradientTo: "white",
						decimalPlaces: 2,
						color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
						labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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

				<SubHeader title={"Expense Break down"}/>
				<PieChart
					data={appContext.ExpenseAnalyticData}
					width={Dimensions.get("window").width}
					height={200}
					chartConfig={chartConfig}
					accessor="expenseAmount"
					backgroundColor="transparent"
					paddingLeft="15"
					absolute
				/>
			</ScrollView>
			<FloatingActionButton onPress={()=>navigation.navigate("AddATransaction")} icon={"add"} text={"Add Transaction"} />
		</Layout>
	);
}

export default observer(Analytics);

