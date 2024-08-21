import { observer } from "mobx-react-lite";
import {FlatList, ViewToken, View, Animated, NativeSyntheticEvent, NativeScrollEvent} from "react-native";
import {useCallback, useRef, useState} from "react";
import { useAppContext } from "@src/Contexts/AppContext";
import _ from "lodash";
import SelectedProperty from "@src/Components/Home/SelectedProperty";
import HomesCarousel from "@src/Components/Home/HomesCarousel";

function Properties() {
	const appContext = useAppContext();
	const [selectedIndex, setSelectedIndex] = useState(0);
	const propertiesFlatList = useRef<FlatList<Property>>(null);
	const scrollX = useRef(new Animated.Value(0)).current;

	const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken<Property>[], changed: ViewToken<Property>[] }) => {
		if (_.isEmpty(viewableItems)) return;
		appContext.setSelectedProperty(viewableItems[0].item);
	}, [appContext]);


	const changeIndex = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
		const slide = Math.floor(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
		if (slide >= 0) {
			setSelectedIndex(slide);
		}
	};
	const scrollToActiveIndex = (index:number) =>{
		propertiesFlatList.current?.scrollToIndex({
			index: index,
			animated: true,
			viewPosition: 0.8,
		});
		setSelectedIndex(index);
	};

	return (
		<View>
			{
				(appContext.Properties.length>1)?(
					<HomesCarousel selectedIndex={selectedIndex} scrollToActiveIndex={scrollToActiveIndex}/>
				):null
			}
			<Animated.FlatList
				data={appContext.Properties}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				ref = {propertiesFlatList}
				pagingEnabled={true}
				onViewableItemsChanged={onViewableItemsChanged}
				onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
					useNativeDriver: true,
					listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
						changeIndex(event);
					},
				})}
				viewabilityConfig={{
					itemVisiblePercentThreshold: 50,
				}}
				renderItem={({ item }) => (
					<SelectedProperty property={item} />
				)}
			/>
		</View>
	);
}

export default observer(Properties);
