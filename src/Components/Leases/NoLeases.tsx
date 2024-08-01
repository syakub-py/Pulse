import {observer} from "mobx-react-lite";
import {View, Text, StyleSheet} from "react-native";

function NoLeases() {
	return(
		<View style={styles.container}>
			<Text style={styles.text}>This property has no leases</Text>
		</View>
	);
}

export default observer(NoLeases);


const styles = StyleSheet.create({
	container:{
		alignItems:"center",
		justifyContent:"center",
		height:"90%",
	},
	text:{
		fontSize:20,
		fontWeight:"bold",
		color:"white",
		marginVertical:30
	}
});
