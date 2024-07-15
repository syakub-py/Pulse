import {Text, View, StyleSheet} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Props{
	onClick?: ()=>void
	title:string
}

export default function Setting(props: Props){
	const {title} = props;
	return(
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<Ionicons name={"caret-forward-outline"} size={20}/>
		</View>
	);
}

const styles = StyleSheet.create({
	title:{
		fontSize:20,
		color:"black",
		fontWeight:"bold",
	},
	container:{
		flexDirection:"row",
		justifyContent:"space-between",
		margin:20
	}
});
