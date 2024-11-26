import { observer } from "mobx-react-lite";
import { useAnalyticContext } from "@src/Contexts/AnalyticContext";
import { Text, View, StyleSheet } from "react-native";
import _ from "lodash";
import TransactionCard from "@src/Components/Analytics/TransactionCard";
import SubHeader from "@src/Components/Analytics/SubHeader";
import { useEffect } from "react";

interface Props {
	transactionType: string;
}

const TransactionList = (props:Props) => {
	const analyticContext = useAnalyticContext();

	useEffect(() => {
		if (_.isNull(analyticContext)) return;
		analyticContext.setTransactions(
			analyticContext.Transactions.filter(
				(transaction) => transaction.incomeOrExpense === props.transactionType
			)
		);

	}, [analyticContext, props.transactionType]);

	if (_.isNull(analyticContext)) {
		return null;
	}

	if (_.isEmpty(analyticContext.Transactions)) {
		return <Text style={styles.text}>No transactions yet</Text>;
	}

	return (
		<View style={styles.container}>
			<SubHeader title="Transactions" />
			{analyticContext.Transactions.map((transaction, index) => (
				<TransactionCard key={index} transaction={transaction} />
			))}
		</View>
	);
};

export default observer(TransactionList);

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		width: "100%",
	},
	text: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
});
