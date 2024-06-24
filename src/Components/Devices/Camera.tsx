import {Image, StyleSheet, Text, View} from "react-native";

interface Props{
	camera:Device
}

export default function Camera(props:Props){
	const {camera} = props;
	return(
		<View style={styles.container}>
			<Text>{camera.Location}</Text>
			<Text style={styles.text}>Nest camera</Text>
			<Image source={{uri:"https://www.texaspoolsandpatios.com/wp-content/uploads/2022/06/TPP1-1.jpeg"}} style={styles.image}/>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		height: 150,
		width: 150,
		backgroundColor: "transparent",
		justifyContent: "center",
		alignItems: "center"
	},
	image: {
		height: "100%",
		width: "100%",
		resizeMode: "cover",
		borderRadius: 20,
		position: "absolute",
	},
	text: {
		position: "absolute",
		top: 20,
		left: 10,
		color: "white",
		fontSize: 15,
		fontWeight: "bold",
		zIndex:1
	},
});
