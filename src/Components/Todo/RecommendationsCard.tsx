import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import _ from "lodash";

export default function RecommendationsCard({ recommendation }: { recommendation: GoogleMapsPlaceResponse }) {
	return (
		<View style={styles.cardContainer}>
			<Text style={styles.name}>
				{recommendation.name}
			</Text>
			<Text style={styles.vicinity}>
				{recommendation.vicinity}
			</Text>
			{
				(_.isEqual(recommendation.rating, "N/A"))?null:(
					<View style = {styles.ratingContainer}>
						<Ionicons size = {20} name = {"star"} color = {"#ebd61e"}/>
						<Text style = {styles.rating}>{recommendation.rating.toFixed(1)}</Text>
					</View>
				)
			}
		</View>
	);
}



const styles = StyleSheet.create({
	cardContainer: {
		backgroundColor: "#2a2a2a",
		padding: 16,
		marginVertical: 10,
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5,
	},
	name: {
		fontSize: 18,
		fontWeight: "bold",
		color: "white",
		marginBottom: 4,
	},
	vicinity: {
		fontSize: 16,
		color: "#ccc",
		marginBottom: 4,
	},
	ratingContainer:{
		flexDirection: "row"
	},
	rating:{
		fontSize: 17,
		fontWeight: "bold",
		paddingLeft: 5,
		color:"white"
	}
});
