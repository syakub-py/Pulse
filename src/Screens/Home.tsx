import Layout from "../Components/Layout";
import DeviceTile from "../Components/DeviceTile";
import {FlatList, StyleSheet, Text, View, Dimensions} from "react-native";
import {useContext} from "react";
import {AppContext} from "../Contexts/AppContext";

export default function Home() {
	const appContext = useContext(AppContext);
	return (
		<Layout>
			<FlatList
				data={appContext.Homes}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				pagingEnabled={true}
				renderItem={({item})=>(
					<View style={styles.houseTileContainer}>
						<Text style={styles.homeAddress}>{item.Address}</Text>
						<FlatList
							data={item.ConnectedDevices}
							numColumns={2}
							style={{width:Dimensions.get("window").width}}
							columnWrapperStyle={styles.deviceTileRow}
							renderItem={({item})=>(
								<DeviceTile device={item}/>
							)}
						/>
					</View>
				)}/>
		</Layout>
	);
}

const styles = StyleSheet.create({
	deviceTileRow: {
		justifyContent: "space-evenly",
		paddingVertical:10,
	},
	houseTileContainer:{
		justifyContent:"space-evenly",
		height:"100%"
	},
	homeAddress:{
		fontSize:20,
		fontWeight:"bold",
		margin:15
	}
});
