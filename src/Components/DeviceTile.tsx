import {Text, View, StyleSheet} from "react-native";

interface Props{
	device:Device
}


export default function DeviceTile(props:Props){
	const {device} = props;
	return(
		<View style={styles.container}>
			<Text>{device.Name}</Text>
			<Text>{device.Type}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height:150,
		width: 150,
		backgroundColor: "transparent",
		opacity:0.7,
		borderRadius:20
	},
	text: {
		fontSize:10,

	}
});

