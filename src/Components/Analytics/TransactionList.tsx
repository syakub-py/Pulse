import {observer} from "mobx-react-lite";
import {useAnalyticContext} from "@src/Contexts/AnalyticContext";
import {FlatList, Text, View, StyleSheet} from "react-native";
import _ from "lodash";
import TransactionCard from "@src/Components/Analytics/TransactionCard";
import SubHeader from "@src/Components/Analytics/SubHeader";

function TransactionList() {
	const analyticContext = useAnalyticContext();
	if (_.isNull(analyticContext)) return;

	if (_.isEmpty(analyticContext.Transactions)) {
		return(
			<Text style={styles.text}>No transactions yet</Text>
		);
	}

	return(
		<View style={styles.container}>
			<SubHeader title={"Transactions"} />
			<FlatList
				data={analyticContext.Transactions}
				renderItem={({item, index}) => (
					<TransactionCard key={index} transaction={item} />
				)}
			/>
		</View>
	);
}

export default observer(TransactionList);

const styles =StyleSheet.create({
	container:{
		flexDirection:"column",
		zIndex:1
	},
	text:{
		color:"white",
		fontSize:16,
		fontWeight:"bold",
	}
});

