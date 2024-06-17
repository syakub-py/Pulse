import Layout from "../Components/Layout";
import {Text} from "react-native";
import DataService from "../Utils/DataService";
import {useEffect, useState} from "react";
import {envVariables} from "../../env";

export default function Home() {
	const [weatherData, setWeatherData] = useState<WeatherResponse>();
	useEffect(() => {
		DataService.getWeather("New York", envVariables.WEATHER_API_KEY).then((result)=>{
			setWeatherData(result?.data);
		});
	}, []);

	return (
		<Layout>
			<Text>test, bitch</Text>
		</Layout>
	);
}

// const styles = StyleSheet.create({
//
// });

