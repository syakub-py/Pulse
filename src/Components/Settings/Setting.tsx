import {Text, StyleSheet, Pressable} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {observer} from "mobx-react-lite";

interface Props{
	onClick?: ()=>void
	title:string
}

function Setting(props: Props){
	const {title, onClick} = props;
	return(
		<Pressable style={styles.container} onPress={onClick}>
			<Text style={styles.title}>{title}</Text>
			<Ionicons name={"caret-forward-outline"} size={20} color="white"/>
		</Pressable>
	);
}

export default observer(Setting);

const styles = StyleSheet.create({
	title:{
		fontSize:20,
		color:"white",
		fontWeight:"bold",
	},
	container:{
		flexDirection:"row",
		justifyContent:"space-between",
		margin:20
	}
});
