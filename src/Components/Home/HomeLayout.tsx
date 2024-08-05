import {View, SafeAreaView, StyleSheet, Animated, Text, Image} from "react-native";
import React, { useContext, useState, useCallback, useEffect } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { observer } from "mobx-react-lite";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import FloatingActionButton from "../FloatingActionButton";
import { AppContext } from "../../Contexts/AppContext";
import _ from "lodash";

function HomeLayout({ children }: { children: React.ReactNode }) {
	const authContext = useContext(AuthContext);
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Home">>();
	const appContext = useContext(AppContext);
	const [imageSource, setImageSource] = useState(undefined);
	const opacity = new Animated.Value(0);

	const handlePressActionButton = () => {
		navigation.navigate("AddAProperty");
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const propertyTypeImages: { [key: string]: any } = {
		Home: require("../../../assets/DefaultPictures/houseWallpaper.jpg"),
		Condo: require("../../../assets/DefaultPictures/condoWallpaper.jpg"),
		"Vacation Home": require("../../../assets/DefaultPictures/vacationHomeWallpaper.jpg"),
		"Multi-Family":require("../../../assets/DefaultPictures/multiFamilyWallpaper.jpg"),
		"Commercial Building": require("../../../assets/DefaultPictures/commercialBuildingWallpaper.jpg"),
	};

	const updateImageSource = useCallback(() => {
		if (!_.isNil(appContext.SelectedProperty) && !_.isEmpty(appContext.Properties)) {
			setImageSource(propertyTypeImages[appContext.SelectedProperty.PropertyType]);
		}else{
			setImageSource(propertyTypeImages["Home"]);
		}
	}, [appContext.SelectedProperty, propertyTypeImages]);

	useEffect(() => {
		updateImageSource();
	}, [updateImageSource]);


	useEffect(() => {
		Animated.timing(opacity, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start();
	}, [imageSource]);

	return (
		<View style={styles.backgroundImage}>
			<Animated.Image
				source={imageSource}
				style={[
					styles.backgroundImage,
					{
						opacity: opacity,
					},
				]}
				resizeMode="cover"
			/>
			<LinearGradient
				colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.5)", "rgba(0,0,0,1)"]}
				locations={[0, 0.5, 0.6]}
				style={styles.container}
			>
				<SafeAreaView style={styles.container} >
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
					<View>
						{children}
					</View>
					{
						!_.isEmpty(appContext.Properties)?(
							<FloatingActionButton
								icon={"add"}
								styles={styles.fab}
								onPress={() => handlePressActionButton()}
							/>
						):null
					}

				</SafeAreaView>
			</LinearGradient>
		</View>
	);
}

export default observer(HomeLayout);

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		width: "100%",
		height: "100%",
		position: "absolute",
		top: 0,
		left: 0,
	},
	container: {
		flex: 1,
	},
	innerProfileContainer: {
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
	usernameText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 17,
		marginHorizontal: 7
	},
	welcomeBackContainer: {
		flexDirection: "column"
	},
	fab: {
		position: "absolute",
		bottom: 20,
		right: 20,
		backgroundColor: "transparent",
		padding: 10,
		borderRadius: 30,
		elevation: 5,
	},
});
