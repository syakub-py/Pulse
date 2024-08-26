import {StyleSheet, Text, View} from "react-native";

interface Props{
	title:string
}
export default function SubHeader(props: Props) {
	const {title} = props;
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
		</View>
	);
}



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

