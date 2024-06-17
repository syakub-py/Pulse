import {View, SafeAreaView, StyleSheet, Image} from "react-native";
import React, {useContext} from "react";
import {AuthContext} from "../Contexts/AuthContext";
import Ionicons from "react-native-vector-icons/Ionicons";


export default function Layout({children}: {children: React.ReactNode}) {
	const authContext = useContext(AuthContext);
	return (
		<SafeAreaView>
			<View style={styles.profileContainer}>
				<Image
					resizeMode="cover"
					source={{uri: authContext.profilePicture}}
					style={{height: 50, width: 50, borderRadius: 50}}
				/>

				<Ionicons name = "log-out-outline" style = {{paddingLeft: 25}} size = {30} color = {"gray"}/>
			</View>
			<View style={styles.contentContainer}>
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
	contentContainer:{
		marginHorizontal:10
	}
});

