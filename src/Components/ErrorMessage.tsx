import {observer} from "mobx-react-lite";
import {StyleSheet, Text, View} from "react-native";
import React from "react";

interface Props{
	message:string
}

function ErrorMessage(props:Props) {
	return(
		<View style={styles.errorContainer}>
			<Text style={styles.error}>{props.message}</Text>
		</View>
	);
}

export default observer(ErrorMessage);


const styles = StyleSheet.create({
	error: {
		color: "white",
		fontSize: 17,
	},
	errorContainer: {
		backgroundColor: "red",
		borderColor: "darkred",
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	},
});
