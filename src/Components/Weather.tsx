import {useEffect, useState} from "react";
import DataService from "../Utils/DataService";
import {envVariables} from "../../env";
import {View, Text, StyleSheet} from "react-native";

export default function Weather(){
	const [weatherData, setWeatherData] = useState<WeatherResponse>();

	useEffect(() => {
		DataService.getWeather("New York", envVariables.WEATHER_API_KEY).then((result)=>{
			setWeatherData(result?.data);
		});
	}, []);

	if (!weatherData) {
		return <Text>Loading...</Text>;
	}

	return (
		<View style={styles.container}>
			<Text style={styles.temperature}>{weatherData.main.temp}°C</Text>
			<Text style={styles.description}>{weatherData.weather[0].description}</Text>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		height: 40,
		width: 80,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "whitesmoke",
	},
	temperature: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	description: {
		fontSize: 16,
	},
});
