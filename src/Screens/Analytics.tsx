import {observer} from "mobx-react-lite";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import {LineChart, PieChart} from "react-native-chart-kit";
import {Dimensions} from "react-native";
import SubHeader from "../Components/Analytics/SubHeader";

const chartConfig = {

	backgroundColor: "transparent",
	labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
	decimalPlaces: 2,
	color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
	propsForDots: {
		r: "6",
		strokeWidth: "2",
		stroke: "#ffa726",
	},
};

const PieChartData = [
	{
		name: "Seoul",
		population: 21500000,
		color: "rgba(131, 167, 234, 1)",
		legendFontColor: "#7F7F7F",
		legendFontSize: 15,
	},
	{
		name: "Toronto",
		population: 2800000,
		color: "rgba(29, 137, 193, 1)",
		legendFontColor: "#7F7F7F",
		legendFontSize: 15,
	},
	{
		name: "Beijing",
		population: 527612,
		color: "rgba(97, 179, 131, 1)",
		legendFontColor: "#7F7F7F",
		legendFontSize: 15,
	},
	{
		name: "New York",
		population: 8537673,
		color: "rgba(204, 142, 53, 1)",
		legendFontColor: "#7F7F7F",
		legendFontSize: 15,
	},
	{
		name: "Moscow",
		population: 11920000,
		color: "rgba(179, 55, 113, 1)",
		legendFontColor: "#7F7F7F",
		legendFontSize: 15,
	},
];

const lineGraphData = {
	labels: ["January", "February", "March", "April", "May", "June"],
	datasets: [
		{
			data: [20, 45, 28, 80, 99, 43],
			color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
			strokeWidth: 4,
		},
	],
};


function Analytics(){
	return (
		<Layout>
			<Header title={"Your Analytics"}/>
			<SubHeader title={"Projected Income"}/>
			<LineChart
				data={lineGraphData}
				width={Dimensions.get("window").width}
				height={200}
				chartConfig={chartConfig}
				bezier
			/>
			<SubHeader title={"Broken Down Expenses"}/>
			<PieChart
				data={PieChartData}
				width={Dimensions.get("window").width}
				height={200}
				chartConfig={chartConfig}
				accessor="population"
				backgroundColor="transparent"
				paddingLeft="15"
				absolute
			/>
		</Layout>
	);
}

export default observer(Analytics);

