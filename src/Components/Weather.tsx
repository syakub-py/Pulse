import {useEffect, useState} from "react";
import DataService from "../Utils/DataService";
import {envVariables} from "../../env";
import {View, Text, StyleSheet} from "react-native";

const convertToFahrenheit = (celsius:number) => {
	return Math.round((celsius * 9/5) + 32);
};

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
	const weatherIcons = {
		"01d": "☀️", // clear sky day
		"01n": "🌙", // clear sky night
		"02d": "⛅️", // few clouds day
		"02n": "🌙", // few clouds night
		"03d": "🌥", // scattered clouds day
		"03n": "🌥", // scattered clouds night
		"04d": "☁️", // broken clouds day
		"04n": "☁️", // broken clouds night
		"09d": "🌧", // shower rain day
		"09n": "🌧", // shower rain night
		"10d": "🌦", // rain day
		"10n": "🌦", // rain night
		"11d": "⛈", // thunderstorm day
		"11n": "⛈", // thunderstorm night
		"13d": "🌨", // snow day
		"13n": "🌨", // snow night
		"50d": "🌫", // mist day
		"50n": "🌫", // mist night
	};

	const iconCode = weatherData.weather[0].icon as keyof typeof weatherIcons;

	return (
		<View style={styles.container}>
			<Text style={styles.icon}>{weatherIcons[iconCode]}</Text>
			<Text style={styles.temperature}>{convertToFahrenheit(weatherData.main.temp)}°F</Text>
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
	icon:{
		fontSize: 28,
	}
});
