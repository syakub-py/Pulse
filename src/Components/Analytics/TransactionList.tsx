import {observer} from "mobx-react-lite";
import {useAnalyticContext} from "@src/Contexts/AnalyticContext";
import {FlatList, Text} from "react-native";
import _ from "lodash";
import TransactionCard from "@src/Components/Analytics/TransactionCard";

function TransactionList() {
	const analyticContext = useAnalyticContext();
	if (_.isNull(analyticContext)) return;

	if (_.isEmpty(analyticContext.Transactions)) {
		return(
			<Text>No transactions yet</Text>
		);
	}

	return(
		<FlatList
			data={analyticContext.Transactions}
			renderItem={({item, index}) => (
				<TransactionCard key={index} transaction={item} />
			)}
		/>
	);
}

export default observer(TransactionList);


