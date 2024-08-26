import {observer} from "mobx-react-lite";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import {BarChart, PieChart} from "react-native-chart-kit";
import {Dimensions, ScrollView, Text, View} from "react-native";
import SubHeader from "../Components/Analytics/SubHeader";
import {useAppContext} from "../Contexts/AppContext";
import useGenerateAnalytics from "@src/Hooks/useGenerateAnalytics";
import useFetchTransactions from "@src/Hooks/useFetchTransactions";
import FloatingActionButton from "@src/Components/Buttons/FloatingActionButton";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";


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
	return (
		<Layout>
			<Header title={"Your Analytics"}/>
			<ScrollView>
				<SubHeader title={"Transactions"}/>
				{
					appContext.Transactions.map((transaction)=>(
						<View key={transaction.id}>
							<Text></Text>
						</View>
					))
				}
				<SubHeader title={"Income"}/>
				{/*<BarChart*/}
				{/*	data={data}*/}
				{/*	width={screenWidth}*/}
				{/*	height={220}*/}
				{/*	yAxisLabel="$"*/}
				{/*	chartConfig={chartConfig}*/}
				{/*	verticalLabelRotation={30}*/}
				{/*/>*/}
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

