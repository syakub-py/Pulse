import {observer} from "mobx-react-lite";
import {useAnalyticContext} from "@src/Contexts/AnalyticContext";
import {BarChart} from "react-native-chart-kit";
import {Dimensions, StyleSheet, Text} from "react-native";
import _ from "lodash";

function IncomeBarGraph() {
	const analyticContext = useAnalyticContext();
	if (_.isNull(analyticContext)) return;

	if (_.isEmpty(analyticContext.IncomeAnalyticData)) {
		return(
			<Text style={styles.text}>No Income analytics for this property</Text>
		);
	}

	return(
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
			chartConfig={chartConfig}
			verticalLabelRotation={30}
		/>
	);
}

export default observer(IncomeBarGraph);

const chartConfig ={
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
};

const styles = StyleSheet.create({
	text: {
		color:"white"
	}
});
