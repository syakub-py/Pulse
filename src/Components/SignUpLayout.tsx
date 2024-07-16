import {Image, SafeAreaView, StyleSheet} from "react-native";
import React from "react";

export default function SignUpLayout({children}: {children: React.ReactNode}){

	return(
		<SafeAreaView>
			<Image source={require("../../assets/icon.png")} style={styles.Logo}/>
			{children}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	Logo:{
		height:50,
		width:50,
		borderRadius:30,
		marginHorizontal:10,
		elevation:5,
	}
});
