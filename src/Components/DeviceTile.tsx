import {Text, View, StyleSheet} from "react-native";
import Thermostat from "./Devices/Thermostat";
import Light from "./Devices/Light";
import Lock from "./Devices/Lock";
interface Props{
	device:Device
}


export default function DeviceTile(props:Props){
	const {device} = props;
	if (device.Type == "Thermostat") {
		return <Thermostat/>;
	}else if (device.Type == "Light"){
		return <Light/>;
	}else if (device.Type == "Lock") {
		return <Lock/>;
	} else{
		return(
			<View style={styles.container}>
				<Text style={styles.deviceTitle}>{device.Name}</Text>
				<Text>{device.Type}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height:150,
		width: 150,
		backgroundColor: "lightgray",
		opacity:0.7,
		borderRadius:20
	},
	deviceTitle: {
		fontSize:15,
		fontWeight: "bold",
		textAlign: "center",
		margin:10
	}
});

