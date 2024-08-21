import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Props {
	searchQuery: string;
	onSearchQueryChange: (query: string) => void;
}

function Search({ searchQuery, onSearchQueryChange }: Props) {
	return (
		<View style={styles.searchContainer}>
			<Ionicons name={"search"} size={25} color="gray" style={styles.icon} />
			<TextInput
				style={styles.searchInput}
				placeholder="Search..."
				placeholderTextColor="#888"
				value={searchQuery}
				onChangeText={onSearchQueryChange}
			/>
		</View>
	);
}

export default observer(Search);

const styles = StyleSheet.create({
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#333",
		borderRadius: 8,
		paddingHorizontal: 10,
		paddingVertical: 10,
		margin: 10,
	},
	icon: {
		paddingRight: 15,
	},
	searchInput: {
		fontSize: 16,
		color: "gray",
		flex: 1,
	},
});
