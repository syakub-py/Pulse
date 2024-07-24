import {StyleSheet, Image, SafeAreaView, ImageBackground} from "react-native";
import React from "react";
import {LinearGradient} from "expo-linear-gradient";

export default function SignUpLayout({children}: {children: React.ReactNode}){
	return(
		<ImageBackground
			source={require("../../../assets/houseWallpaper.jpg")}
			style={styles.backgroundImage}>
			<LinearGradient
				colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.5)", "rgba(0,0,0,1)"]}
				locations={[0, 0.5, 0.9]}
				style={styles.gradient}>
				<SafeAreaView style={styles.gradient}>
					<Image source={require("../../../assets/icon.png")} style={styles.logo}/>
					{children}
				</SafeAreaView>
			</LinearGradient>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	logo:{
		height:50,
		width:50,
		borderRadius:30,
		marginHorizontal:10,
		elevation:5,
	},
	gradient: {
		flex: 1,
	},
	backgroundImage: {
		flex: 1,
		width: "100%",
		height: "100%",
	},
});
