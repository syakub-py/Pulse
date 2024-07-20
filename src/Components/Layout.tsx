import {View, SafeAreaView, StyleSheet, Image} from "react-native";
import React, {useContext} from "react";
import {AuthContext} from "../Contexts/AuthContext";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import Weather from "./Weather";


export default function Layout({children}: {children: React.ReactNode}) {
	const authContext = useContext(AuthContext);
	return (
		<SafeAreaView style={styles.layoutContainer}>
			<View style={styles.profileContainer}>
				<Image
					resizeMode="cover"
					source={{uri: authContext.profilePicture}}
					style={{height: 50, width: 50, borderRadius: 50}}
				/>
				{/* <Weather/> */}
				{/* <Ionicons name = "log-out-outline" style = {{paddingLeft: 25}} size = {30} color = {"gray"}/> */}
				<Image source={require("../../assets/icon.png")} style={styles.logo}/>

			</View>
			<View>
				{children}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	profileContainer:{
		flexDirection:"row",
		alignItems:"center",
		paddingHorizontal:10,
		justifyContent:"space-between",
		height:70,
	},
	logo:{
		height:50,
		width:50,
		borderRadius:30,
		marginHorizontal:10,
		elevation:5,
	},
	layoutContainer:{
		backgroundColor:"transparent",
	}
});

