import {Pressable, StyleSheet, Text} from "react-native";

interface Props{
	item:Property
	onPress:(index:number)=>void
	index:number
	selectedIndex:number
}


export default function CarouselItem(props:Props){
	const {item, onPress, selectedIndex, index} = props;
	return (
		<Pressable  onPress={()=>onPress(index)} style={selectedIndex === index ? styles.selectedButton : styles.button}>
			<Text style={selectedIndex === index ? styles.selectedText : styles.text}>
				{item.Name}
			</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "rgba(255, 255, 255, 0.5)",
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 5,
		marginRight: 10,
	},
	selectedButton: {
		backgroundColor: "#333",
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 5,
		marginRight: 10
	},
	text: {
		color: "white",
		fontSize: 15,
		fontWeight: "500"
	},
	selectedText: {
		color: "white",
		fontSize: 15,
		fontWeight: "700"
	}
});

