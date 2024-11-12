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
			height={300}
			yAxisLabel="$"
			yAxisSuffix=""
			fromZero={true}
			width={Dimensions.get("window").width}
			chartConfig={chartConfig}
			verticalLabelRotation={0}
			style={styles.chartStyle}
		/>
	);
}

export default observer(IncomeBarGraph);

const chartConfig = {
	backgroundGradientFrom: "#1e1e1e",
	backgroundGradientTo: "#1e1e1e",
	decimalPlaces: 0,
	color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
	labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
	propsForLabels: { fontSize: 10 }  // Reduce label font size
};

const styles = StyleSheet.create({
	text: {
		color:"white"
	},
	chartStyle:{
		paddingRight:40,
		width:Dimensions.get("window").width,
	}
});
