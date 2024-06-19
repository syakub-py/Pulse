import Layout from "../Components/Layout";
import DeviceTile from "../Components/DeviceTile";
import {FlatList, StyleSheet, Text, View, Dimensions} from "react-native";
import React, {useContext} from "react";
import {AppContext} from "../Contexts/AppContext";
import AddDeviceButton from "../Components/Buttons/AddDevice";

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
						<Text style={styles.homeName}>{item.Name}</Text>
						<Text style={styles.homeAddress}>{item.Address}</Text>

						<View style={styles.addDeviceContainer}>
							<Text style={styles.activeDeviceText}>Active Devices ({item.ConnectedDevices.length})</Text>
							<AddDeviceButton/>
						</View>

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
		fontSize:15,
		margin:15,
		color:"gray"
	},
	addDeviceContainer:{
		flexDirection:"row",
		justifyContent:"space-between",
	},
	activeDeviceText:{
		fontSize:20,
		fontWeight:"bold",
		marginHorizontal:20
	},
	homeName:{
		fontSize:25,
		fontWeight:"bold",
		marginHorizontal:15
	}
});
