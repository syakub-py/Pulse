import {View, SafeAreaView, StyleSheet, Image, ImageBackground, Text} from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { observer } from "mobx-react-lite";
import { LinearGradient } from "expo-linear-gradient";
import {AppContext} from "../../Contexts/AppContext";

function HomeLayout({ children }:{ children: React.ReactNode }) {
	const authContext = useContext(AuthContext);
	// const appContext = useContext(AppContext);
	return (
		<ImageBackground
			source={require("../../../assets/houseWallpaper.jpg")}
			style={styles.backgroundImage}>
			<LinearGradient
				colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.5)", "rgba(0,0,0,1)"]}
				locations={[0, 0.5, 0.6]}
				style={styles.gradient}>
				<SafeAreaView style={styles.container}>
					<View style={styles.profileContainer}>
						<View style={styles.innerProfileContainer}>
							<Image
								resizeMode="cover"
								source={{ uri: authContext.profilePicture }}
								style={styles.profilePicture}
							/>
							<View style={styles.welcomeBackContainer}>
								<Text style={styles.usernameText}>Welcome Back,</Text>
								<Text style={styles.usernameText}>{authContext.username}</Text>
							</View>
						</View>
						<Image source={require("../../../assets/icon.png")} style={styles.logo} />
					</View>
					<View >
						{children}
					</View>
				</SafeAreaView>
			</LinearGradient>
		</ImageBackground>
	);
}

export default observer(HomeLayout);

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		width: "100%",
		height: "70%",
	},
	gradient: {
		flex: 1,
	},
	container: {
		flex: 1,
	},

	innerProfileContainer:{
		flexDirection: "row",
		alignItems: "center"
	},
	profileContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 10,
		justifyContent: "space-between",
		height: 70,
		backgroundColor: "transparent",
	},
	profilePicture: {
		height: 50,
		width: 50,
		borderRadius: 25,
	},
	logo: {
		height: 50,
		width: 50,
		borderRadius: 25,
		marginHorizontal: 10,
		elevation: 5,
	},
	usernameText:{
		color:"white",
		fontWeight:"bold",
		fontSize:17,
		marginHorizontal:7
	},
	welcomeBackContainer:{
		flexDirection: "column"
	}
});
