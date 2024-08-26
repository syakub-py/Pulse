import {TouchableOpacity, Text, StyleSheet} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Props{
	onPress:()=>void,
	icon:string,
	text:string,
}

export default function FloatingActionButton (props:Props) {
	const {onPress, icon, text} = props;
	return (
		<TouchableOpacity onPress={onPress} style={styles.fabContainer}>
			<Ionicons name={icon} size={30} color="white" />
			<Text style={styles.fabText}>{text}</Text>
		</TouchableOpacity>

	);
};


const styles = StyleSheet.create({
	fabContainer: {
		position: "absolute",
		bottom: 20,
		right: 20,
		backgroundColor: "#333",
		padding: 15,
		borderRadius: 15,
		elevation: 5,
		flexDirection: "row",
		alignItems:"center",
	},
	fabText:{
		color: "white",
		fontWeight: "semibold",
		paddingLeft:7,
		fontSize:15
	}
});
