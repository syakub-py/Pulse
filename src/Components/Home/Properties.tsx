import {observer} from "mobx-react-lite";
import {Dimensions, FlatList, StyleSheet, Text, View} from "react-native";
import Button from "../Buttons/Button";
import DeviceTile from "../DeviceTile";
import React, {useContext} from "react";
import {AppContext} from "../../Contexts/AppContext";


function Properties(){
	const appContext = useContext(AppContext);

	return (
		<FlatList
			data={appContext.Properties}
			horizontal={true}
			showsHorizontalScrollIndicator={false}
			pagingEnabled={true}
			renderItem={({item})=>(
				<View style={styles.houseTileContainer}>
					<Text style={styles.homeName}>{item.Name}</Text>
					<Text style={styles.homeAddress}>{item.Address}</Text>
					<View style={styles.addDeviceContainer}>
						{/*<Text style={styles.activeDeviceText}>Active Devices ({item.ConnectedDevices.length})</Text>*/}
						<Button title={"Add"} containerStyle={styles.addDeviceButton} textStyle={styles.addDeviceButtonText} iconName={"add"}/>
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
	);
}

export default observer(Properties);

const styles = StyleSheet.create({
	deviceTileRow: {
		justifyContent: "space-evenly",
		paddingVertical:10,
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
	},
	addDeviceButton:{
		justifyContent:"center",
		alignItems:"center",
		backgroundColor:"black",
		height:40,
		width:70,
		opacity:0.7,
		marginHorizontal:20,
		borderRadius:20,
		flexDirection:"row",
	},
	addDeviceButtonText:{
		fontSize:15,
		fontWeight:"bold",
		color:"white",
	},
	houseTileContainer:{
		justifyContent:"space-evenly",
		height:"100%"
	},
});
