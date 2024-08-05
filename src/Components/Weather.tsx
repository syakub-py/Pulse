import {useEffect, useState} from "react";
import DataService from "../Utils/DataService";
import {View, Text, StyleSheet} from "react-native";
import weatherIcons from "../Utils/WeatherIcons";

const convertToFahrenheit = (celsius:number) => {
	return Math.round((celsius * 9/5) + 32);
};

export default function Weather(){
	const [weatherData, setWeatherData] = useState<WeatherResponse>();
	useEffect(() => {
		DataService.getWeather("New York", process.env.WEATHER_API_KEY).then((result)=>{
			setWeatherData(result?.data);
		});
	}, []);

	if (!weatherData) {
		return <Text>Loading...</Text>;
	}

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
