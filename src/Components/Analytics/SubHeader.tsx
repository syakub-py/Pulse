import {observer} from "mobx-react-lite";
import {StyleSheet, Text, View} from "react-native";

interface Props{
	title:string
}
function SubHeader(props: Props) {
	const {title} = props;
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
		</View>
	);
}

export default observer(SubHeader);


const styles = StyleSheet.create({
	title:{
		color:"white",
		fontWeight:"700",
		fontSize:25,
	},
	container:{
		marginVertical:10,
	},
});

