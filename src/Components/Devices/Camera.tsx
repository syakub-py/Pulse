import {Image, StyleSheet, View} from "react-native";

export default function Camera(){


	return(
		<View style={styles.container}>
			<Image source={{uri:"https://www.texaspoolsandpatios.com/wp-content/uploads/2022/06/TPP1-1.jpeg"}} style={{height:"100%", width:"100%" ,resizeMode:"cover", borderRadius: 20,}}/>
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
});
