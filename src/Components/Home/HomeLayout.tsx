import {View, SafeAreaView, StyleSheet, Animated, Image} from "react-native";
import { useState, useCallback, useEffect } from "react";
import { useAuthContext } from "@src/Contexts/AuthContext";
import { observer } from "mobx-react-lite";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import FloatingActionButton from "../Buttons/FloatingActionButton";
import _ from "lodash";
import {usePropertyContext} from "@src/Contexts/PropertyContext";

function HomeLayout({ children }: { children: React.ReactNode }) {
	const authContext = useAuthContext();
	const propertyContext = usePropertyContext();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Home">>();
	const [imageSource, setImageSource] = useState(undefined);
	/* eslint-disable react-hooks/exhaustive-deps */
	const opacity =  new Animated.Value(0);

	const handlePressActionButton = useCallback(() => {
		navigation.navigate("AddAProperty");
	}, [navigation]);

	const updateImageSource = useCallback(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const propertyTypeImages: { [key: string]: any } = {
			Home: require("../../../assets/DefaultPictures/houseWallpaper.jpg"),
			Condo: require("../../../assets/DefaultPictures/condoWallpaper.jpg"),
			"Vacation Home": require("../../../assets/DefaultPictures/vacationHomeWallpaper.jpg"),
			"Multi-Family":require("../../../assets/DefaultPictures/multiFamilyWallpaper.jpg"),
			"Commercial Building": require("../../../assets/DefaultPictures/commercialBuildingWallpaper.jpg"),
		};
		if ( !_.isNull(propertyContext)&& !_.isNil(propertyContext.SelectedProperty) && !_.isEmpty(propertyContext.Properties)) {
			setImageSource(propertyTypeImages[propertyContext.SelectedProperty.PropertyType]);
		}else{
			setImageSource(propertyTypeImages["Home"]);
		}
	}, [propertyContext?.Properties, propertyContext?.SelectedProperty]);

	useEffect(() => {
		updateImageSource();
	}, [updateImageSource]);


	useEffect(() => {
		Animated.timing(opacity, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start();
	}, [imageSource, opacity]);

	return (
		<View style={styles.backgroundImage}>
			<Animated.Image
				source={imageSource}
				style={[
					styles.backgroundImage,
					{ opacity },
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
						</View>
						<Image source={require("../../../assets/icon.png")} style={styles.logo} />
					</View>
					<View>
						{children}
					</View>
					{_.isEmpty(propertyContext?.Properties)? null: (
						<FloatingActionButton
							onPress={handlePressActionButton}
							icon={"add"}
							text={"Add Property"}
						/>
					)}

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
		marginHorizontal: 10,
		elevation: 5,
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
	fabContainer: {
		position: "absolute",
		bottom: 20,
		right: 20,
		backgroundColor: "#333",
		padding: 15,
		borderRadius: 15,
		elevation: 5,
		flexDirection: "row",
		alignItems:"center",
	},
	fabText:{
		color: "white",
		fontWeight: "semibold",
		paddingLeft:7,
		fontSize:15
	}
});
