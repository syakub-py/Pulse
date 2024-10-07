import {ActivityIndicator, SafeAreaView, StyleSheet, Text, View} from "react-native";

export default function MessagesLoading(){
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="white" />
				<Text style={styles.loadingText}>Loading messages...</Text>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		height: 500,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	loadingText: {
		marginTop: 10,
		color: "white",
		fontSize: 18,
	},
});
