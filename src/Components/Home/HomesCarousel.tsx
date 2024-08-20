import { Pressable, FlatList, Text, StyleSheet } from "react-native";
import { useAppContext } from "@src/Contexts/AppContext";
import { observer } from "mobx-react-lite";
import {useEffect, useRef} from "react";

interface Props{
	selectedIndex: number;
	scrollToActiveIndex:(index:number) => void;
}

function HomesCarousel(props:Props) {
	const {selectedIndex, scrollToActiveIndex} = props;
	const appContext = useAppContext();
	const flatListRef = useRef<FlatList<Property>>(null);

	useEffect(()=>{
		flatListRef.current?.scrollToIndex({
			index: selectedIndex,
			animated: true,
			viewPosition: 0.5,
		});
	}, [selectedIndex]);

	return (
		<FlatList
			data={appContext.Properties}
			horizontal={true}
			style = {styles.container}
			contentContainerStyle={styles.contentContainer}
			showsHorizontalScrollIndicator={false}
			ref = {flatListRef}
			bounces={false}
			initialScrollIndex={selectedIndex}
			renderItem={({item, index})=>{
				return (
					<Pressable key={index} onPress={()=>scrollToActiveIndex(index)} style={selectedIndex === index ? styles.selectedButton : styles.button}>
						<Text style={selectedIndex === index ? styles.selectedText : styles.text}>
							{item.Name}
						</Text>
					</Pressable>
				);
			}}
		/>

	);
}
export default observer(HomesCarousel);

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 15,
		paddingTop: 10,
		paddingBottom: 10,
		height: 50,
	},
	contentContainer: {
		paddingRight: 15,
	},
	button: {
		backgroundColor: "whitesmoke",
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
		color: "black",
		fontSize: 15,
		fontWeight: "500"
	},
	selectedText: {
		color: "white",
		fontSize: 15,
		fontWeight: "500"
	}
});

