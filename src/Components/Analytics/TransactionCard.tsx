import {StyleSheet, Text, View} from "react-native";


interface Props {
	transaction:PropertyTransaction
}

export default function TransactionCard(props: Props) {
	const {transaction} = props;
	return(
		<View style={styles.container}>
			<View>
				<Text style={styles.title}>{transaction.transactionType}</Text>
				<Text style={styles.text}>{transaction.incomeOrExpense}</Text>
			</View>
			<Text style={styles.text}>${transaction.amount.toLocaleString("en-US")}</Text>
		</View>
	);
}
const styles = StyleSheet.create({
	title:{
		color:"white",
		fontWeight:"700",
		fontSize:20,
	},
	container:{
		margin:10,
		backgroundColor: "#333",
		borderRadius:5,
		padding:5,
		flexDirection:"row",
		justifyContent:"space-between",
	},
	text:{
		color:"gray",
		fontSize:15,
	},
});
