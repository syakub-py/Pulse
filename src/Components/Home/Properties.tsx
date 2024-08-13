import { observer } from "mobx-react-lite";
import {FlatList, ViewToken} from "react-native";
import { useCallback } from "react";
import { useAppContext } from "../../Contexts/AppContext";
import _ from "lodash";
import Property from "./Property";

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
				<Property property={item} />
			)}
		/>
	);
}

export default observer(Properties);
