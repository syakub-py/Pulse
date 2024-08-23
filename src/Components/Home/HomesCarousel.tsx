import { Pressable, FlatList, Text, StyleSheet } from "react-native";
import { useAppContext } from "@src/Contexts/AppContext";
import { observer } from "mobx-react-lite";
import {useEffect, useRef} from "react";
import CarouselItem from "@src/Components/Home/CarouselItem";

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
			renderItem={({item, index})=>(
				<CarouselItem item={item} onPress={()=>scrollToActiveIndex(index)} index={index} selectedIndex={selectedIndex}/>
			)}
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
});

