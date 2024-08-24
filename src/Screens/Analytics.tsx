import {observer} from "mobx-react-lite";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import {LineChart, PieChart} from "react-native-chart-kit";
import {ActivityIndicator, Dimensions, ScrollView} from "react-native";
import SubHeader from "../Components/Analytics/SubHeader";
import {useAppContext} from "../Contexts/AppContext";
import useGenerateAnalytics from "@src/Hooks/useGenerateAnalytics";


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


function Analytics(){
	useGenerateAnalytics();
	const appContext = useAppContext();

	return (
		<Layout>
			<Header title={"Your Analytics"}/>
			<ScrollView>
				<SubHeader title={"Projected Income"}/>
				{/*<LineChart*/}
				{/*	data={lineGraphData}*/}
				{/*	width={Dimensions.get("window").width}*/}
				{/*	height={200}*/}
				{/*	chartConfig={chartConfig}*/}
				{/*	bezier*/}
				{/*/>*/}
				<SubHeader title={"Broken Down Expenses"}/>
				<PieChart
					data={appContext.Expenses}
					width={Dimensions.get("window").width}
					height={200}
					chartConfig={chartConfig}
					accessor="expenseAmount"
					backgroundColor="transparent"
					paddingLeft="15"
					absolute
				/>
			</ScrollView>
		</Layout>
	);
}

export default observer(Analytics);

