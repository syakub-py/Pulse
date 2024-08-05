import {observer} from "mobx-react-lite";
import {Pressable, StyleSheet, Text} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";


interface Props{
	onClick:()=>void
}


function NoProperties(props: Props) {
	const {onClick} = props;

	return (
		<Pressable style={styles.container} onPress={onClick}>
			<Ionicons name={"add-circle-outline"} size={200} color="white"/>
			<Text style={styles.text}>Add your first property</Text>
		</Pressable>
	);
}


export default observer(NoProperties);

const styles = StyleSheet.create({
	container:{
		alignItems:"center",
		justifyContent:"center",
		height:"90%",
		opacity:0.5
	},
	text:{
		fontSize:20,
		fontWeight:"bold",
		color:"lightgray",
		marginVertical:30
	}
});
