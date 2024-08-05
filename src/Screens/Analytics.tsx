import {observer} from "mobx-react-lite";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import {LineChart, PieChart} from "react-native-chart-kit";
import {Dimensions, ScrollView} from "react-native";
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
		name: "Mortgage",
		population: 40000,
		color: "rgba(131, 167, 234, 1)",
		legendFontColor: "#7F7F7F",
		legendFontSize: 15,
	},
	{
		name: "Property Taxes",
		population: 20000,
		color: "rgba(29, 137, 193, 1)",
		legendFontColor: "#7F7F7F",
		legendFontSize: 15,
	},
	{
		name: "Insurance",
		population: 15000,
		color: "rgba(97, 179, 131, 1)",
		legendFontColor: "#7F7F7F",
		legendFontSize: 15,
	},
	{
		name: "Maintenance",
		population: 10000,
		color: "rgba(204, 142, 53, 1)",
		legendFontColor: "#7F7F7F",
		legendFontSize: 15,
	},
	{
		name: "HOA Fees",
		population: 5000,
		color: "rgba(179, 55, 113, 1)",
		legendFontColor: "#7F7F7F",
		legendFontSize: 15,
	},
];

const lineGraphData = {
	labels: ["January", "February", "March", "April", "May", "June"],
	datasets: [
		{
			data: [10000, 12000, 15000, 18000, 20000, 22000],
			color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
			strokeWidth: 4,
		},
	],
};


function Analytics(){
	return (
		<Layout>
			<Header title={"Your Analytics"}/>
			<ScrollView>
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
			</ScrollView>
		</Layout>
	);
}

export default observer(Analytics);

