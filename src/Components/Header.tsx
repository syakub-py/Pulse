import {StyleSheet, Text, View} from "react-native";


interface Props{
	title:string
}


export default function Header(props: Props) {
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
		fontWeight:"bold",
		fontSize:30,
	},
	container:{
		margin:10
	},
});

