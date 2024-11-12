import { observer } from "mobx-react-lite";
import { useAnalyticContext } from "@src/Contexts/AnalyticContext";
import { PieChart } from "react-native-chart-kit";
import { Dimensions, Text, StyleSheet, View } from "react-native";
import _ from "lodash";

function ExpensePieChart() {
	const analyticContext = useAnalyticContext();
	if (_.isNull(analyticContext)) return null; // Return null instead of nothing if context is null

	if (_.isEmpty(analyticContext.ExpenseAnalyticData)) {
		return (
			<Text style={styles.text}>No Expense analytics for this property</Text>
		);
	}

	return (
		<View style={styles.chartContainer}>
			<PieChart
				data={analyticContext.ExpenseAnalyticData}
				width={Dimensions.get("window").width}
				height={200}
				chartConfig={chartConfig}
				accessor="expenseAmount"
				hasLegend={true}
				backgroundColor="transparent"
			 	paddingLeft={(Dimensions.get("window").width/2-235).toString()}
			/>
		</View>
	);
}

export default observer(ExpensePieChart);

const chartConfig = {
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
};

const styles = StyleSheet.create({
	text: {
		color: "white",
		textAlign: "center",
		marginVertical: 20,
	},
	chartContainer: {
		alignItems: "center",
		width: Dimensions.get("window").width,
		backgroundColor: "transparent",
	},
});
