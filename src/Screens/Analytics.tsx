import {observer} from "mobx-react-lite";
import Layout from "../Components/GlobalComponents/Layout";
import Header from "../Components/GlobalComponents/Header";
import {ScrollView} from "react-native";
import SubHeader from "../Components/Analytics/SubHeader";
import useGenerateAnalytics from "@src/Hooks/useGenerateAnalytics";
import useFetchTransactions from "@src/Hooks/useFetchTransactions";
import FloatingActionButton from "@src/Components/Buttons/FloatingActionButton";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import ExpensePieChart from "@src/Components/Analytics/ExpensePieChart";
import IncomeBarGraph from "@src/Components/Analytics/IncomeBarGraph";
import TransactionList from "@src/Components/Analytics/TransactionList";

function Analytics(){
	useGenerateAnalytics();
	useFetchTransactions();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Analytics">>();
	return (
		<Layout>
			<Header title={"Your Analytics"} />
			<SubHeader title={"Transactions"} />
			<TransactionList/>
			<ScrollView>
				<SubHeader title={"Income"} />
				<IncomeBarGraph/>
				<SubHeader title={"Expense Breakdown"} />
				<ExpensePieChart/>
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
