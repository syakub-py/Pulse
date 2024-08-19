import { observer } from "mobx-react-lite";
import { FlatList, ViewToken } from "react-native";
import { useCallback } from "react";
import { useAppContext } from "@src/Contexts/AppContext";
import _ from "lodash";
import SelectedProperty from "@src/Components/Home/SelectedProperty";

function Properties() {
	const appContext = useAppContext();

	const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken<Property>[], changed: ViewToken<Property>[] }) => {
		if (_.isEmpty(viewableItems)) return;
		appContext.setSelectedProperty(viewableItems[0].item);
	}, [appContext]);

	return (
		<FlatList
			data={appContext.Properties}
			horizontal={true}
			showsHorizontalScrollIndicator={false}
			pagingEnabled={true}
			onViewableItemsChanged={onViewableItemsChanged}
			viewabilityConfig={{
				itemVisiblePercentThreshold: 50,
			}}
			renderItem={({ item }) => (
				<SelectedProperty property={item} />
			)}
		/>
	);
}

export default observer(Properties);
